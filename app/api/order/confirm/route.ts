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

    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // ищем юзера
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // подтверждаем заказ (меняем статус)
    const order = await prisma.order.update({
      where: { id: orderId, userId: user.id }, // проверка что заказ принадлежит этому юзеру
      data: { status: "PROCESSING" },
    });

    // чистим корзину юзера
    await prisma.cartItem.deleteMany({
      where: { userId: user.id },
    });

    return NextResponse.json({ success: true, order });
  } catch (e) {
    console.error("CONFIRM ORDER ERROR:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
