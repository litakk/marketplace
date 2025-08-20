// /app/api/admin/products/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
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
