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

    const { productId, variantId, quantity } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Ищем, есть ли уже такой товар в корзине
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: user.id,
        productId,
        variantId: variantId,
      },
    });

    let item;
    if (existingItem) {
      // Если есть — увеличиваем количество
      item = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: quantity ?? 1 } },
      });
    } else {
      // Если нет — создаём новую запись
      item = await prisma.cartItem.create({
        data: {
          userId: user.id,
          productId,
          variantId: variantId ?? null,
          quantity: quantity ?? 1,
        },
      });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("❌ Ошибка в /api/cart:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
