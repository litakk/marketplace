// /app/api/admin/products/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== "ADMIN") return null;
  return user;
}

export async function POST(req: NextRequest) {
  try {
    const admin = await assertAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await req.json();
    const { name, description, categoryId, variants } = body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        categoryId,
        variants: {
          create: variants.map((v: any) => ({
            price: v.price,
            stock: v.stock,
            imageUrl: v.imageUrl,
            color: v.color,
            size: v.size,
          })),
        },
      },
      include: {
        variants: true,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("❌ Ошибка при создании товара:", error);
    return NextResponse.json(
      { error: "Ошибка при создании товара" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const admin = await assertAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true, variants: true },
    });
    return NextResponse.json(products);
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = await assertAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    if (!id) return NextResponse.json({ error: "Bad request" }, { status: 400 });
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
