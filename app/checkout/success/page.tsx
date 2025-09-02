import prisma from "@/lib/prisma";
import { CheckCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  if (!orderId) redirect("/");

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  // Подтверждаем заказ и чистим корзину сервер-сайд (надёжнее, чем внутренний fetch)
  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (user) {
      await prisma.order.update({
        where: { id: Number(orderId), userId: user.id },
        data: { status: "PROCESSING" },
      });

      await prisma.cartItem.deleteMany({ where: { userId: user.id } });
    }
  } catch (_) {
    // игнорируем сбои подтверждения, страница успеха всё равно отобразится
  }

  const order = await prisma.order.findUnique({
    where: { id: Number(orderId) },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-2xl font-bold">Заказ успешно оформлен!</h1>
      {orderId && (
        <p className="mt-2 text-neutral-600">Номер заказа: #{orderId}</p>
      )}
      <p className="mt-4 text-neutral-500">
        Спасибо за ваш заказ. Мы свяжемся с вами для подтверждения.
      </p>
    </div>
  );
}