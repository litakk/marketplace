import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await prisma.cartItem.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(
      { message: "Удалено успешно", deleted },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Ошибка при удалении:", error);
    // Вернем детальную ошибку для отладки
    return NextResponse.json(
      { error: error.message, code: error.code, meta: error.meta },
      { status: 500 }
    );
  }
}
