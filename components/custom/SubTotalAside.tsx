"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";

type SubTotalAsideProps = {
  order: { id: number; totalPrice: number };
  shipping: number;
  total: number;
  handleSubmit: (
    callback: (data: any) => void
  ) => (e?: React.BaseSyntheticEvent) => void;
  onSubmit: (data: any) => void;
};

const SubTotalAside: React.FC<SubTotalAsideProps> = ({
  order,
  shipping,
  total,
  handleSubmit,
  onSubmit,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePay = async () => {
    setLoading(true);
    setErrorMessage(null);
    if (!stripe || !elements) {
      setErrorMessage("Платёжная система недоступна");
      setLoading(false);
      return;
    }
    try {
      // 1) валидируем и сохраняем адрес через форму родителя
      await new Promise<void>((resolve, reject) => {
        const runner = handleSubmit(async (data: any) => {
          try {
            await onSubmit(data);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
        // запускаем без события
        // @ts-ignore
        runner();
      });

      // 2) подтверждаем платёж и редиректим на success
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${origin}/checkout/success?orderId=${order.id}`,
        },
      });
    } catch (err: any) {
      setErrorMessage(err?.message || "Ошибка сети");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="lg:col-span-1">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-6 sticky top-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Сводка заказа
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Товары</span>
            <span className="font-medium">
              {order.totalPrice.toLocaleString("ru-RU")} USD
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Доставка</span>
            <span className="font-medium">
              {shipping.toLocaleString("ru-RU")} USD
            </span>
          </div>
          <div className="h-px bg-gray-200" /> 
          <div className="flex justify-between text-base font-semibold">
            <span>Итого</span>
            <span className="text-blue-600">
              {(order.totalPrice + shipping).toLocaleString("ru-RU")} USD
            </span>
          </div>
        </div>

        {errorMessage && (
          <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
        )}

        <Button
          disabled={!stripe || loading}
          type="button"
          onClick={handlePay}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition disabled:bg-gray-400"
        >
          {!loading
            ? `Оплатить ${(order.totalPrice + shipping).toLocaleString(
                "ru-RU"
              )} USD`
            : "Процесс..."}
        </Button>

        <p className="mt-3 text-xs text-gray-500">
          Нажимая “Оплатить”, вы соглашаетесь с условиями сервиса и политикой
          конфиденциальности
        </p>
      </div>
    </aside>
  );
};

export default SubTotalAside;
