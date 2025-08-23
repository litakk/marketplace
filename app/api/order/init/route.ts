import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items } = await req.json(); // [{ productId, variantId, quantity }]
    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // достаём товары вместе с вариантами
    const productIds = items.map((i: any) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { variants: true },
    });

    let totalPrice = 0;
    const orderItemsData = items.map((item: any) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);

      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) throw new Error(`Variant ${item.variantId} not found`);

      const price = variant.price;
      totalPrice += price * item.quantity;

      return {
        variantId: item.variantId, // ✔ только variantId
        quantity: item.quantity,
        price, // фиксируем цену на момент заказа
      };
    });

    const order = await prisma.order.create({
      data: {
        user: { connect: { email: session.user.email } },
        totalPrice,
        items: {
          create: orderItemsData,
        },
      },
    });

    return NextResponse.json({ orderId: order.id });
  } catch (e) {
    console.error("INIT ORDER ERROR:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
