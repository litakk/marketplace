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

    const { orderId, address } = await req.json();

    if (!orderId || !address) {
      return NextResponse.json({ error: "Missing orderId or address" }, { status: 400 });
    }

    // находим пользователя
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // проверяем что заказ принадлежит юзеру
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: user.id },
    });

    
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // сохраняем адрес (если был — обновляем, если нет — создаём)
    const orderAddress = await prisma.orderAddress.upsert({
      where: { orderId: order.id },
      update: {
        fullName: address.fullName,
        email: address.email,
        phone: address.phone,
        address: address.address,
        city: address.city,
        region: address.region,
        postalCode: address.postalCode,
      },
      create: {
        orderId: order.id,
        fullName: address.fullName,
        email: address.email,
        phone: address.phone,
        address: address.address,
        city: address.city,
        region: address.region,
        postalCode: address.postalCode,
      },
    });

    return NextResponse.json({ success: true, orderAddress });
  } catch (e) {
    console.error("SAVE ADDRESS ERROR:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
