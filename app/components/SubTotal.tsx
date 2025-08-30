"use client";

import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";

type SubTotalAsideProps = {
  order: { id: number; totalPrice: number };
  shipping: number;
  total: number;
};

const SubTotalAside: React.FC<SubTotalAsideProps> = ({
  order,
  shipping,
  total,
}: {
  order: { id: number; totalPrice: number };
  shipping: number;
  total: number;
}) => {
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {};

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (!stripe || !elements) return;

      const res = await fetch(`/api/order/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id }),
      });

      const data = await res.json();

      if (res.ok) {
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `http://localhost:3000/checkout/success?orderId=${order.id}`,
          },
        });
        if (error) setErrorMessage(error.message ?? "Ошибка оплаты");

        /*                 router.push(`/checkout/success?orderId=${order.id}`);
         */
      } else {
        console.error("Ошибка подтверждения заказа", data);
        alert("Ошибка подтверждения заказа");
      }
      setLoading(false);
    } catch (err) {
      console.error("Ошибка сети", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <aside className="lg:col-span-1">
        <div className="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-5 shadow-sm sticky top-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-3">
            Сводка заказа
          </h3>

          {/* Предметы — макет */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Товары:</span>
              <span className="font-medium">
                {order?.totalPrice.toLocaleString("ru-RU")}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Доставка:</span>
              <span className="font-medium">
                {shipping.toLocaleString("ru-RU")}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Скидка</span>
              <span className="font-medium">0</span>
            </div>
            <div className="h-px bg-neutral-200" />
            <div className="flex items-center justify-between text-base">
              <span className="font-semibold">Итого:</span>
              <span className="font-semibold text-[#8A6E61]">
                {(order.totalPrice + shipping).toLocaleString("ru-RU")} сум
              </span>
            </div>
          </div>

          {/* Промокод */}
          <div className="mb-4">
            <label className="block text-sm text-neutral-600 mb-1">
              Промокод
            </label>
            <div className="flex gap-2">
              <Input placeholder="SAVE10" />
              <Button
                type="button"
                variant="secondary"
                className="whitespace-nowrap"
              >
                <Tag className="h-4 w-4 mr-1" />
                Применить
              </Button>
            </div>
          </div>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <Button
            onClick={handleConfirm}
            type="submit"
            disabled={!stripe || loading}
            className="
                        bg-blue-600 hover:bg-blue-700
                        text-white font-semibold
                        py-2 px-6 rounded-lg
                        shadow-md hover:shadow-lg
                        transition duration-300 ease-in-out
                        disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {!loading
              ? `Оплатить ${order.totalPrice + shipping}`
              : "Процесс..."}
          </Button>

          <p className="mt-3 text-xs text-neutral-500">
            Нажимая “Оплатить”, вы соглашаетесь с условиями сервиса. Списание
            произойдёт при успешной авторизации платежа.
          </p>
        </div>
      </aside>
    </>
  );
};

export default SubTotalAside;
