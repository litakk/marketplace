"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

import { toast } from "react-toastify";

import SubTotalAside from "./SubTotalAside";

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
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
    console.log(data);

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
      .then((data) => {
        console.log("PaymentIntent response:", data);
        setClientSecret(data.clientSecret);
      });
  }, [amount]);

  // Ждём clientSecret перед рендером Elements
  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="min-h-screen  from-neutral-50 via-white to-neutral-50">
        <div className="pt-6 px-3 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
            {/* Левая часть */}
            <form /* onSubmit={onSubmit} */ className="lg:col-span-2 space-y-6">
              {/* Контакты */}
              <section className="rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Контактная информация
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-neutral-600 mb-1">
                      Email
                    </label>
                    <Input
                      {...register("email", { required: "Email обезателный" })}
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={errors.email && "border-red-700"}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-neutral-600 mb-1">
                      Телефон (опционально)
                    </label>
                    <Input
                      {...register("phone", {
                        required: "Телефоон обезателный",
                      })}
                      type="tel"
                      placeholder="+1 415 555 0000"
                      className={errors.phone && "border-red-700"}
                    />
                  </div>
                </div>
              </section>

              {/* Адрес доставки */}
              <section className="rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Адрес доставки
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-neutral-600 mb-1">
                      Полное имя
                    </label>
                    <Input
                      {...register("fullName", {
                        required: "Телефоон обезателный",
                      })}
                      placeholder="Feruz Aliev"
                      required
                      className={errors.fullName && "border-red-700"}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-600 mb-1">
                      Страна
                    </label>
                    <select
                      {...register("country", {
                        required: "Страна обязательна",
                      })}
                      className="w-full h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm"
                      value={country}
                      onChange={(e) => setCountry(e.currentTarget.value)}
                    >
                      <option value="UZB">Uzbekistan</option>
                      <option value="US">United States</option>
                    </select>
                  </div>
                  {country === "US" ? (
                    <div>
                      <label className="block text-sm text-neutral-600 mb-1">
                        Штат (State)
                      </label>
                      <select
                        {...register("region", {
                          required: "Выберите область",
                        })}
                        className="w-full h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm"
                        autoComplete="address-level1"
                        required
                        defaultValue="CA"
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
                      <label className="block text-sm text-neutral-600 mb-1">
                        Область{" "}
                      </label>
                      <select
                        {...register("region", {
                          required: "Выберите область",
                        })}
                        className="w-full h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm"
                        autoComplete="address-level1"
                        required
                        defaultValue="CA"
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
                    <label className="block text-sm text-neutral-600 mb-1">
                      Адрес, строка 1
                    </label>
                    <Input
                      {...register("address", {
                        required: "Телефоон обезателный",
                      })}
                      placeholder="Amit Temur ko`chasi"
                      className={errors.address && "border-red-700"}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-neutral-600 mb-1">
                      Адрес, строка 2 (опц.)
                    </label>
                    <Input
                      {...register("address", {
                        required: "Телефоон обезателный",
                      })}
                      className={errors.address && "border-red-700"}
                      placeholder="Amit Temur ko`chasi 32-B"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-600 mb-1">
                      Город
                    </label>
                    <Input
                      {...register("city", {
                        required: "Телефоон обезателный",
                      })}
                      className={errors.city && "border-red-700"}
                      placeholder="San Francisco"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-600 mb-1">
                      Почтовый индекс
                    </label>
                    <Input
                      {...register("postalCode", {
                        required: "postalCode обезателный",
                      })}
                      className={errors.postalCode && "border-red-700"}
                      placeholder="94107"
                    />
                  </div>
                </div>
              </section>

              {/* Адрес оплаты (billing) */}
              <section className="rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-neutral-900">
                    Адрес оплаты{" "}
                  </h2>
                  <label className="flex items-center gap-2 text-sm text-neutral-700 select-none">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[#8A6E61]"
                      checked={sameAsShipping}
                      onChange={(e) => setSameAsShipping(e.target.checked)}
                    />
                    Совпадает с адресом доставки
                  </label>
                </div>

                {!sameAsShipping && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm text-neutral-600 mb-1">
                        Полное имя
                      </label>
                      <Input placeholder="John Doe" autoComplete="cc-name" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-neutral-600 mb-1">
                        Адрес, строка 1
                      </label>
                      <Input
                        autoComplete="billing address-line1"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-neutral-600 mb-1">
                        Адрес, строка 2 (опц.)
                      </label>
                      <Input
                        autoComplete="billing address-line2"
                        placeholder="Apt, suite"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-600 mb-1">
                        Город
                      </label>
                      <Input
                        autoComplete="billing address-level2"
                        placeholder="San Francisco"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-600 mb-1">
                        Штат
                      </label>
                      <select
                        className="w-full h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm"
                        autoComplete="billing address-level1"
                        defaultValue="CA"
                      >
                        {US_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-600 mb-1">
                        Почтовый индекс
                      </label>
                      <Input
                        autoComplete="billing postal-code"
                        placeholder="94107"
                      />
                    </div>
                  </div>
                )}
              </section>

              {/* Оплата */}
              <section className="rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur p-5 shadow-sm">
                <PaymentElement />
              </section>

              {/* Согласие */}
              <section className="rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur p-5 shadow-sm">
                <label className="flex items-start gap-3 text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-[#8A6E61]"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>
                    Я соглашаюсь с условиями сервиса и политикой
                    конфиденциальности, а также на списание средств согласно
                    итоговой сумме.
                  </span>
                </label>
              </section>

              <section className="rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-neutral-900 mb-2">
                  Товары в заказе - {order.items.length} шт
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {order.items.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex flex-col sm:flex-row items-center bg-white rounded-md shadow p-2 relative"
                    >
                      <p className="top-[1%] absolute right-[1%] rounded-2xl text-sm text-black  p-1 ">
                        {prod.quantity} шт
                      </p>
                      <img
                        src={
                          prod.variant
                            ? prod.variant.imageUrl
                            : prod.product.imageUrl
                        }
                        alt={prod.product.name}
                        className="w-20 h-20 object-cover rounded-md mb-1 sm:mb-0 sm:mr-2"
                      />
                      <div className="text-center sm:text-left">
                        <p className="font-semibold text-sm">
                          {prod.product.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {prod.variant ? prod.variant.label : "Стандарт"}
                        </p>
                        <p className="text-black font-bold text-sm mt-1">
                          {prod.price.toLocaleString("ru-RU")} сум
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </form>

            {/* Правая колонка — сводка */}
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
