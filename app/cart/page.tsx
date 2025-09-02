"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    stock: number;
  };
  variant: {
    id: number;
    color: string | null;
    size: string | null;
    imageUrl: string | null;
    price: number;
    stock: number;
  };
}

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getCartProducts = async () => {
      try {
        const res = await fetch("/api/cart/");
        const data = await res.json();
        setCartProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCartProducts();
  }, []);

  const deleteProd = async (id: number) => {
    try {
      const res = await fetch(`/api/cart/deleteCartProd/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCartProducts((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (id: number, type: "inc" | "dec") => {
    setCartProducts((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const stock = item.variant ? item.variant.stock : item.product.stock;
        return {
          ...item,
          quantity:
            type === "inc"
              ? Math.min(item.quantity + 1, stock)
              : Math.max(item.quantity - 1, 1),
        };
      })
    );

    const current = cartProducts.find((i) => i.id === id);
    if (!current) return;
    const stock = current.variant
      ? current.variant.stock
      : current.product.stock;
    const nextQty =
      type === "inc"
        ? Math.min(current.quantity + 1, stock)
        : Math.max(current.quantity - 1, 1);

    try {
      await fetch(`/api/cart/updateQuantity`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantity: nextQty }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const subtotal = cartProducts.reduce(
    (total, item) => total + item.variant.price * item.quantity,
    0
  );

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/order/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts.map((item) => ({
            productId: item.product.id,
            variantId: item.variant.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (data.orderId) {
        router.push(`/checkout/${data.orderId}`);
      }
    } catch (err) {
      console.error("Ошибка при инициализации заказа", err);
    }
  };

  return ( 
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Заголовок */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={"/"}>
            <button className="lg:hidden p-2 hover:bg-neutral-100 rounded-full transition">
              <IoMdArrowBack size={24} />
            </button>
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
            Shopping Cart
          </h1>
        </div>

        {cartProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-neutral-200">
            <div className="text-neutral-400 mb-6">
              <svg
                className="mx-auto h-24 w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-neutral-500 mb-6">
              Looks like you haven&apos;t added any items yet.
            </p>
            <Link href={"/"}>
              <Button className="h-11 px-6 rounded-full bg-black text-white hover:bg-neutral-900">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Список товаров */}
            <div className="lg:col-span-2 space-y-6">
              {cartProducts.map((cart) => (
                <div
                  key={cart.id}
                  className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-5 flex gap-5"
                >
                  {/* Картинка */}
                  <div className="w-28 h-36 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-200">
                    <img
                      className="w-full h-full object-cover"
                      src={cart.variant.imageUrl || cart.product.imageUrl}
                      alt={cart.product.name}
                    />
                  </div>

                  {/* Контент */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-neutral-900">
                            {cart.product.name}
                          </h3>
                          <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                            {cart.product.description}
                          </p>
                          {(cart.variant.color || cart.variant.size) && (
                            <p className="text-sm text-neutral-600 mt-2">
                              {cart.variant.color && (
                                <span className="mr-2">
                                  Color: {cart.variant.color}
                                </span>
                              )}
                              {cart.variant.size && (
                                <span>Size: {cart.variant.size}</span>
                              )}
                            </p>
                          )}
                        </div>

                        {/* Удалить */}
                        <button
                          onClick={() => deleteProd(cart.id)}
                          className="ml-4 text-neutral-400 hover:text-red-500 transition"
                        >
                          <IoTrashOutline size={20} />
                        </button>
                      </div>
                      <p className="text-lg font-semibold text-neutral-900 mt-3">
                        ${cart.variant.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Кол-во и сумма */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-neutral-300 rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(cart.id, "dec")}
                          className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 transition disabled:opacity-40"
                          disabled={cart.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-neutral-900 font-medium">
                          {cart.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(cart.id, "inc")}
                          className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 transition"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-semibold text-neutral-900">
                        ${(cart.variant.price * cart.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Сводка заказа */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md border border-neutral-200 p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-neutral-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className="text-xs text-neutral-500 bg-neutral-50 p-3 rounded-xl">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping
                    </div>
                  )}

                  <div className="border-t border-neutral-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      Including all taxes
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full mt-6 h-11 rounded-full bg-black text-white hover:bg-neutral-900 text-sm uppercase tracking-wide"
                >
                  Proceed to Checkout
                </Button>

                <div className="mt-4 text-center">
                  <Link
                    href={"/"}
                    className="text-sm text-neutral-600 hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;