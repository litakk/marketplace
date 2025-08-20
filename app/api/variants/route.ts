import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productIdParam = searchParams.get("productId");

  if (!productIdParam) {
    return NextResponse.json(
      { error: "productId параметр обязателен" },
      { status: 400 }
    );
  }

  const productId = parseInt(productIdParam);

  if (isNaN(productId)) {
    return NextResponse.json(
      { error: "Некорректный productId" },
      { status: 400 }
    );
  }

  try {
    console.log("productId:", productId);

    const variants = await prisma.productVariant.findMany({
      where: { productId },
    });

    return NextResponse.json(variants);
  } catch (error) {
    console.error("Ошибка при получении вариантов:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Ошибка сервера" },
      { status: 500 }
    );
  }
}
