import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, context: any) {
  try {
    const { id } = context.params; // context.params приходит автоматически

    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        items: {
          include: {
            variant: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
