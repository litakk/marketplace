import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoryIdNum = Number(params.id);
    if (!Number.isFinite(categoryIdNum)) {
      return NextResponse.json({ error: "Invalid category id" }, { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: { categoryId: categoryIdNum },
      include: {
        category: true,
        variants: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const productsWithMinPrice = products.map((product) => ({
      ...product,
      price: Math.min(...product.variants.map((v) => v.price ?? 0)),
    }));

    return NextResponse.json(productsWithMinPrice);
  } catch (error) {
    console.error("Ошибка при получении товаров по категории:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}


