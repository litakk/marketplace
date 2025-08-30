// @ts-nocheck

"use client";

import { useEffect, useState } from "react";

export default function OrderSummary({
  subtotal,
  shipping,
  total,
}: {
  subtotal: number;
  shipping: number;
  total: number;
}) {
  const [loading, setLoading] = useState(false);

  const [setClientSecret] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    useEffect(() => {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, [total]);

    return;
  };
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-5 shadow-sm sticky top-6">
      <h3 className="text-base font-semibold text-neutral-900 mb-3">
        Сводка заказа
      </h3>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="h-px bg-neutral-200" />
        <div className="flex items-center justify-between text-base">
          <span className="font-semibold">Итого</span>
          <span className="font-semibold text-[#8A6E61]">
            ${total.toFixed(2)}
          </span>
          <button onClick={() => handleSubmit}>Оплатить</button>
        </div>
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        Нажимая “Оплатить”, вы соглашаетесь с условиями сервиса. Списание
        произойдёт при успешной авторизации платежа.
      </p>
    </div>
  );
}
