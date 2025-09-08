import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    const terms = q
      .split(" ")
      .map((t) => t.replace(/\$/g, "").trim())
      .filter(Boolean);

    const products = await prisma.product.findMany({
      where: {
        AND: terms.map((term) => ({
          OR: [
            { name: { contains: term, mode: "insensitive" } },
            { description: { contains: term, mode: "insensitive" } },
            { category: { name: { contains: term, mode: "insensitive" } } },
            ...(Number(term)
              ? [{ variants: { some: { price: Number(term) } } }]
              : []),
          ],
        })),
      },
      include: { category: true, variants: true },
      take: 20,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка поиска" }, { status: 500 });
  }
}
