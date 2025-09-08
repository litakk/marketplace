import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== "ADMIN") return null;
  return user;
}

export async function GET() {
  try {
    const admin = await assertAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    });
    return NextResponse.json(orders);
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await assertAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { id, status } = await req.json();
    const updated = await prisma.order.update({ where: { id: Number(id) }, data: { status } });
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


