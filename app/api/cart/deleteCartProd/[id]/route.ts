import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const deleted = await prisma.cartItem.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Удалено успешно", deleted },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Ошибка при удалении:", error);
    return NextResponse.json(
      { error: error.message, code: error.code, meta: error.meta },
      { status: 500 }
    );
  }
}
