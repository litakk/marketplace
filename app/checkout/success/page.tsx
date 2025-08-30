// app/checkout/success/page.tsx
import prisma from "@/lib/prisma";
import { CheckCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  if (!orderId) redirect("/");

  const session = await getServerSession();
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
