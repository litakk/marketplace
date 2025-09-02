"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import SubTotalAside from "./SubTotalAside";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";

type OrderItemUI = {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: { id: number; name: string; imageUrl: string };
  variant: { id: number; imageUrl: string; label: string };
};

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
  "DC",
];
const UZ_REGION = [
  "Ташкентская область",
  "Андижанская область",
  "Бухарская область",
  "Джизакская область",
  "Кашкадарьинская область",
  "Навоийская область",
  "Наманганская область",
  "Самаркандская область",
  "Сурхандарьинская область",
  "Сырдарьинская область",
  "Ферганская область",
  "Хорезмская область",
];

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function OrderGoods({
  order,
  shipping,
  total,
}: {
  order: { id: number; totalPrice: number; items: OrderItemUI[] };
  shipping: number;
  total: number;
}) {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [agree, setAgree] = useState(false);
  const [country, setCountry] = useState<string>("UZB");
  const [amount] = useState<number>(order.totalPrice + shipping);
  const [clientSecret, setClientSecret] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    if (!agree) {
      toast.warn("Поставьте галочку согласия с условиями");
      return;
    }
    toast.info("Макет: здесь будет создание и подтверждение платежа Stripe");
  };

  useEffect(() => {
    fetch("/api/create-payment-intent/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total: amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50">
        <div className="px-3 md:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Форма */}
            <form className="lg:col-span-2 space-y-6">
              {/* Контактные данные */}
              <section className="rounded-2xl border border-gray-200 bg-white shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Контактная информация
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      Email
                    </label>
                    <Input
                      {...register("email", { required: "Email обязателен" })}
                      type="email"
                      placeholder="you@example.com"
                      className={errors.email && "border-red-500"}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      Телефон
                    </label>
                    <Input
                      {...register("phone", { required: "Телефон обязателен" })}
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      className={errors.phone && "border-red-500"}
                    />
                  </div>
                </div>
              </section>

              {/* Адрес доставки */}
              <section className="rounded-2xl border border-gray-200 bg-white shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Адрес доставки
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      Полное имя
                    </label>
                    <Input
                      {...register("fullName", { required: true })}
                      placeholder="Feruz Aliev"
                      className={errors.fullName && "border-red-500"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Страна
                    </label>
                    <select
                      {...register("country", { required: true })}
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full h-10 rounded-lg border-gray-300 bg-white px-3 text-sm"
                    >
                      <option value="UZB">Uzbekistan</option>
                      <option value="US">United States</option>
                    </select>
                  </div>
                  {country === "US" ? (
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Штат
                      </label>
                      <select
                        {...register("region")}
                        className="w-full h-10 rounded-lg border-gray-300 bg-white px-3 text-sm"
                      >
                        {US_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Область
                      </label>
                      <select
                        {...register("region")}
                        className="w-full h-10 rounded-lg border-gray-300 bg-white px-3 text-sm"
                      >
                        {UZ_REGION.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      Адрес
                    </label>
                    <Input
                      {...register("address", { required: true })}
                      placeholder="Amir Temur 32B"
                      className={errors.address && "border-red-500"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Город
                    </label>
                    <Input
                      {...register("city", { required: true })}
                      placeholder="Tashkent"
                      className={errors.city && "border-red-500"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Почтовый индекс
                    </label>
                    <Input
                      {...register("postalCode", { required: true })}
                      placeholder="100100"
                      className={errors.postalCode && "border-red-500"}
                    />
                  </div>
                </div>
              </section>

              {/* Платёж */}
              <section className="rounded-2xl border border-gray-200 bg-white shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Оплата
                </h2>
                <PaymentElement />
              </section>

              {/* Согласие */}
              <section className="rounded-2xl border border-gray-200 bg-white shadow-md p-6">
                <label className="flex items-start gap-3 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-blue-600"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>
                    Я соглашаюсь с условиями сервиса и политикой
                    конфиденциальности
                  </span>
                </label>
              </section>

              {/* Список товаров */}
              <section className="rounded-2xl border border-gray-200 bg-white shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Товары в заказе ({order.items.length})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {order.items.map((prod) => (
                    <div
                      key={prod.id}
                      className="relative flex flex-col bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all"
                    >
                      {/* Бейдж количества */}
                      <span className="absolute top-2 right-2 text-xs font-medium bg-blue-600 text-white px-2 py-0.5 rounded-full shadow">
                        {prod.quantity} шт
                      </span>

                      {/* Картинка */}
                      <div className="w-full h-48 sm:h-56 md:h-60 lg:h-48 overflow-hidden rounded-t-xl">
                        <img
                          src={
                            prod.variant
                              ? prod.variant.imageUrl
                              : prod.product.imageUrl
                          }
                          alt={prod.product.name}
                          className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                        />
                      </div>

                      {/* Контент */}
                      <div className="flex flex-col flex-1 p-4">
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg line-clamp-2">
                          {prod.product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {prod.variant ? prod.variant.label : "Стандарт"}
                        </p>
                        <p className="text-gray-900 font-bold text-lg mt-auto">
                          {prod.price.toLocaleString("ru-RU")} USD
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </form>

            {/* Правая колонка */}
            <SubTotalAside
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              order={order}
              shipping={shipping}
              total={total}
            />
          </div>
        </div>
      </div>
    </Elements>
  );
}
