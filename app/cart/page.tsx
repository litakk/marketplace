"use client";

import { Button } from "@/components/ui/button";
import { Item } from "@radix-ui/react-dropdown-menu";
import { div } from "framer-motion/client";
import Link from "next/link";
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
  };
  variant: {
    id: number;
    color: string | null;
    size: string | null;
    imageUrl: string | null;
    price: number;
  };
}

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const getCartProducts = async () => {
      try {
        const res = await fetch("/api/getCart");
        const data = await res.json();
        setCartProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCartProducts();
  }, []);

  function addQuantity() {
    setTotalQuantity(totalQuantity + 1);
  }

  function decQuantity() {
    setTotalQuantity(totalQuantity - 1);
  }

  const deleteProd = async (id: number) => {
    try {
      const res = await fetch(`/api/deleteCartProd/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCartProducts((prev) => prev.filter((item) => item.id !== id));
      } else {
        await res.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = (id: number, type: "inc" | "dec") => {
    setCartProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1, // минимально 1
            }
          : item
      )
    );
  };

  const subtotal = cartProducts.reduce((total, item) => {
    return total + item.variant.price * item.quantity;
  }, 0);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href={"/"}>
              <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
                <IoMdArrowBack size={24} />
              </button>
            </Link>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>
          </div>

          {cartProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link href={"/"}>
                <Button className="bg-[#12BFEB] text-black hover:bg-[#0EA5D9]">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Список товаров */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Items ({cartProducts.length})
                    </h2>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {cartProducts.map((cart) => (
                      <div key={cart.id} className="p-6">
                        <div className="flex gap-4">
                          {/* Изображение товара */}
                          <div className="flex-shrink-0">
                            <img
                              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                              src={
                                cart.variant.imageUrl || cart.product.imageUrl
                              }
                              alt={cart.product.name}
                            />
                          </div>

                          {/* Информация о товаре */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-900 mb-1">
                                  {cart.product.name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">
                                  {cart.product.description}
                                </p>
                                {cart.variant.color || cart.variant.size ? (
                                  <p className="text-sm text-gray-600 mb-2">
                                    {cart.variant.color && (
                                      <span className="mr-2">
                                        Color: {cart.variant.color}
                                      </span>
                                    )}
                                    {cart.variant.size && (
                                      <span>Size: {cart.variant.size}</span>
                                    )}
                                  </p>
                                ) : null}
                                <p className="text-lg font-semibold text-[#12BFEB]">
                                  ${cart.variant.price.toFixed(2)}
                                </p>
                              </div>

                              {/* Кнопка удаления */}
                              <button
                                onClick={() => deleteProd(cart.id)}
                                className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                              >
                                <IoTrashOutline size={20} />
                              </button>
                            </div>

                            {/* Управление количеством */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(cart.id, "dec")}
                                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors rounded-l-lg cursor-pointer"
                                  disabled={cart.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center">
                                  {cart.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(cart.id, "inc")}
                                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors rounded-r-lg cursor-pointer"
                                >
                                  +
                                </button>
                              </div>

                              <div className="text-right">
                                <p className="text-lg font-semibold text-gray-900">
                                  $
                                  {(cart.variant.price * cart.quantity).toFixed(
                                    2
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Сводка заказа */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    {shipping > 0 && (
                      <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                        Add ${(50 - subtotal).toFixed(2)} more for free shipping
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Including all taxes
                      </p>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-[#12BFEB] text-black hover:bg-[#0EA5D9] h-12 text-base font-medium">
                    Proceed to Checkout
                  </Button>

                  <div className="mt-4 text-center">
                    <button className="text-sm text-[#12BFEB] hover:underline">
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
