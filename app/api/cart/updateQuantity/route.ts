import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, quantity } = (await req.json()) as {
    id: number;
    quantity: number;
  };

  if (!id || quantity < 1) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const updated = await prisma.cartItem.update({
    where: { id },
    data: { quantity },
  });

  return NextResponse.json({ ok: true, item: updated });
}
