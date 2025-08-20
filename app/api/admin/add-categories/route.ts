import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, imageUrl } = body;

    const categories = await prisma.category.create({
      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.log("Ошибка при создании категории:", error);
    return NextResponse.json(
      { error: "Ошибка при создании категории" },
      { status: 500 }
    );
  }
}
