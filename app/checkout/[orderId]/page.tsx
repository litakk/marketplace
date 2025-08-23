"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Lock, CreditCard, Smartphone, Tag } from "lucide-react";
import { useParams } from "next/navigation";

export type Variant = {
  id: number;
  imageUrl: string;
  color?: string;
  size?: string;
  label?: string | null;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  variantId: number;
  price: number;
  quantity: number;
  variant?: Variant;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: number;
  userId: number;
  status: string; // "NEW", "PAID" и т.д.
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
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

export default function CheckoutPageUS() {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [agree, setAgree] = useState(false);

  const [order, setOrder] = useState<Order | null>(null);

  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    async function getOrders() {
      const res = await fetch(`/api/order/${orderId}`);
      const data = await res.json();
      setOrder(data);
      console.log(data);
    }

    getOrders();
  }, []);

  // Заглушки по суммам
  const subtotal = 129_00; // $129.00
  const shipping = 12_00; // $12.00
  const tax = Math.round(subtotal * 0.0825); // ~8.25%
  const total = subtotal + shipping + tax;

  const fmtUSD = (cents: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      toast.warn("Поставьте галочку согласия с условиями");
      return;
    }
    toast.info("Макет: здесь будет создание и подтверждение платежа Stripe");
  };

  const stepItems = useMemo(
    () => [
      { key: "cart", label: "Cart" },
      { key: "details", label: "Details" },
      { key: "payment", label: "Payment" },
      { key: "review", label: "Review" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50">
      <div className="pt-6 px-3 md:px-6 lg:px-8">
        {/* Верхняя панель шагов */}
        <div className="max-w-6xl mx-auto mb-6">
          <nav className="flex items-center justify-center gap-6 text-sm text-neutral-600">
            {stepItems.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={`h-6 w-6 rounded-full grid place-items-center text-xs ${
                    s.key === "payment"
                      ? "bg-[#8A6E61] text-white"
                      : "bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={
                    s.key === "payment" ? "font-semibold text-neutral-900" : ""
                  }
                >
                  {s.label}
                </span>
                {i < stepItems.length - 1 && (
                  <div className="mx-2 h-px w-8 bg-neutral-200" />
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
          {/* Левая часть */}
          <form onSubmit={onSubmit} className="lg:col-span-2 space-y-6">
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
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-neutral-600 mb-1">
                    Телефон (опционально)
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 415 555 0000"
                    autoComplete="tel"
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
                  <Input placeholder="John Doe" autoComplete="name" required />
                </div>

                <div>
                  <label className="block text-sm text-neutral-600 mb-1">
                    Страна
                  </label>
                  <select
                    className="w-full h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm"
                    value="US"
                    disabled
                  >
                    <option value="US">United States</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-neutral-600 mb-1">
                    Штат (State)
                  </label>
                  <select
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

                <div className="md:col-span-2">
                  <label className="block text-sm text-neutral-600 mb-1">
                    Адрес, строка 1
                  </label>
                  <Input
                    placeholder="123 Main St"
                    autoComplete="address-line1"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-neutral-600 mb-1">
                    Адрес, строка 2 (опц.)
                  </label>
                  <Input
                    placeholder="Apt, suite, etc."
                    autoComplete="address-line2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-neutral-600 mb-1">
                    Город
                  </label>
                  <Input
                    placeholder="San Francisco"
                    autoComplete="address-level2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-neutral-600 mb-1">
                    Почтовый индекс
                  </label>
                  <Input
                    placeholder="94107"
                    autoComplete="postal-code"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Адрес оплаты (billing) */}
            <section className="rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-900">
                  Адрес оплаты (billing)
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
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-5 w-5 text-[#8A6E61]" />
                <h2 className="text-lg font-semibold text-neutral-900">
                  Оплата
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">
                    Имя на карте
                  </label>
                  <Input placeholder="John Doe" autoComplete="cc-name" />
                </div>

                <div>
                  <label className="block text-sm text-neutral-600 mb-1">
                    Данные карты (Stripe)
                  </label>
                  <div className="rounded-xl border border-neutral-200 bg-white p-4">
                    <div className="rounded-lg border border-dashed p-6 text-sm text-neutral-500">
                      Здесь будет Stripe Card Element
                    </div>
                    <p className="mt-2 text-xs text-neutral-500">
                      Тест: 4242 4242 4242 4242 · 12/34 · 123 · ZIP 94107
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    type="button"
                    disabled
                    className="w-full bg-black/90 text-white hover:bg-black disabled:opacity-60"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    Apple Pay (скоро)
                  </Button>
                  <Button
                    type="button"
                    disabled
                    className="w-full bg-[#0F9D58]/90 text-white hover:bg-[#0F9D58] disabled:opacity-60"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    Google Pay (скоро)
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Lock className="h-4 w-4" />
                  <span>
                    Оплата защищена по стандарту PCI DSS. Принимаем Visa,
                    Mastercard, Amex.
                  </span>
                </div>
              </div>
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
          </form>

          {/* Правая колонка — сводка */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-5 shadow-sm sticky top-6">
              <h3 className="text-base font-semibold text-neutral-900 mb-3">
                Сводка заказа
              </h3>

              {/* Предметы — макет */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">{fmtUSD(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium">{fmtUSD(shipping)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Tax</span>
                  <span className="font-medium">{fmtUSD(tax)}</span>
                </div>
                <div className="h-px bg-neutral-200" />
                <div className="flex items-center justify-between text-base">
                  <span className="font-semibold">Итого</span>
                  <span className="font-semibold text-[#8A6E61]">
                    {fmtUSD(total)}
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

              <Button
                type="submit"
                className="w-full bg-[#8A6E61] text-white hover:bg-[#6c5247]"
              >
                Оплатить {fmtUSD(total)}
              </Button>

              <p className="mt-3 text-xs text-neutral-500">
                Нажимая “Оплатить”, вы соглашаетесь с условиями сервиса.
                Списание произойдёт при успешной авторизации платежа.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-neutral-700 mt-5">
                Товары ({order && order.items.length})
              </h4>
              <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
                {order && order.items.length > 0 ? (
                  order.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex gap-2 sm:gap-3 p-2 sm:p-3 bg-neutral-50 rounded-lg"
                    >
                      {/* Изображение товара */}
                      <div className="flex-shrink-0">
                        <img
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md border border-neutral-200"
                          src={item.variant?.imageUrl || "/placeholder.svg"}
                          alt="Товар"
                        />
                      </div>

                      {/* Информация о товаре */}
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs sm:text-sm font-medium text-neutral-900 mb-1 truncate">
                          Shoes Product 3
                        </h5>
                        {item.variant?.color || item.variant?.size ? (
                          <p className="text-xs text-neutral-600 mb-1">
                            {item.variant.color && (
                              <span className="mr-2">
                                Color: {item.variant.color}
                              </span>
                            )}
                            {item.variant.size && (
                              <span>Size: {item.variant.size}</span>
                            )}
                          </p>
                        ) : null}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-semibold text-[#8A6E61]">
                              ${(item.price || 0).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-500">
                              за {item.quantity || 1} шт
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-neutral-900">
                              $
                              {(
                                (item.price || 0) * (item.quantity || 1)
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-xs sm:text-sm text-neutral-500">
                    Загрузка товаров...
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
