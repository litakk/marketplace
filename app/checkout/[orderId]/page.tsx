import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import OrderGoods from "@/components/custom/OrderGoods";

export const runtime = "nodejs";

export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const id = Number(orderId);

  if (isNaN(id)) {
    return <div className="p-6">Некорректный номер заказа</div>;
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/login");
  }

  const order = (await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
    },
  })) as any;

  if (!order) return <div className="p-6">Заказ не найден</div>;

  if (order.user.email !== session.user.email) {
    redirect("/"); // запрещаем доступ к чужим заказам
  }

  if (order.status !== "NEW") {
    redirect("/orders"); // заказ уже оплачен или отменён
  }

  // Получаем items отдельно
  const orderItems = await prisma.orderItem.findMany({
    where: { orderId: order.id },
    include: {
      variant: {
        include: {
          product: true,
        },
      },
    },
  });

  const shipping = 10_000;
  const total = order.totalPrice + shipping;

  return (
    <OrderGoods
      order={{
        id: order.id,
        totalPrice: order.totalPrice,
        items: orderItems.map((i: any) => {
          console.log(`Mapping item ${i.id}:`, {
            itemProductId: i.productId,
            itemVariantId: i.variantId,
            foundProduct: i.variant?.product,
            foundVariant: i.variant,
          });

          return {
            id: i.id,
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
            product: i.variant?.product
              ? {
                  id: i.variant.product.id,
                  name: i.variant.product.name,
                  imageUrl: i.variant.product.imageUrl ?? "",
                }
              : {
                  id: 0,
                  name: "Товар не найден",
                  imageUrl: "",
                },
            variant: i.variant
              ? {
                  id: i.variant.id,
                  label:
                    i.variant.label ||
                    `${i.variant.color || ""} ${i.variant.size || ""}`.trim() ||
                    "Вариант",
                  imageUrl: i.variant.imageUrl ?? "",
                }
              : {
                  id: 0,
                  label: "Вариант не найден",
                  imageUrl: "",
                },
          };
        }),
      }}
      shipping={shipping}
      total={total}
    />
  );
}