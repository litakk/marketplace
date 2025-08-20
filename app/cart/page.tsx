"use client";

import { Button } from "@/components/ui/button";
import { div } from "framer-motion/client";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

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
        console.log(data);
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

  return (
    <div>
      <div className="pt-2 pr-2 pl-2 md:px-3 lg:px-5 xl:px-7 mb-5">
        <div className="w-[55%] flex justify-between mb-5 lg:hidden">
          <IoMdArrowBack size={20} />
          <p className="font-bold">Cart</p>
        </div>
              <p className="hidden xl:flex font-bold text-[32px] mt-5 mb-10">
                Shopping Cart
              </p>
        <div className="xl:flex xl:flex-row">
          <div className="xl:w-2/3">
            {cartProducts.map((cart) => (
              <div
                className="flex justify-between xl:w-[90%] mb-5 lg:mt-5"
                key={cart.id}
              >
                <div className="flex gap-3">
                  <div>
                    <img
                      className="w-[86px] h-[86px]"
                      src={cart.variant.imageUrl || cart.product.imageUrl}
                      alt={cart.product.name}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[16px]">
                      {cart.product.name}
                    </p>
                    <p>{cart.product.description}</p>
                    <p className="text-sm text-gray-500">
                      {cart.variant.color} {cart.variant.size}
                    </p>
                    <p className="font-normal text-[#61828A]">
                      ${cart.variant.price}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={decQuantity}
                    className="flex items-center bg-[#F0F5F5] p-2 rounded-full w-7 h-7 "
                  >
                    -
                  </button>
                  <p>{cart.quantity}</p>
                  <button
                    onClick={addQuantity}
                    className="flex items-center bg-[#F0F5F5] p-2 rounded-full w-7 h-7 "
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="xl:w-1/3  mt-5">
            <p className="font-bold text-[18px]">Order Summary</p>

            <div>
              <div className="flex justify-between mt-10">
                <p className="font-normal text-[#61828A] text-[14px] mb-5">
                  Subtotal
                </p>
                <p>$36.96</p>
              </div>
              <div className="flex justify-between">
                <p className="font-normal text-[#61828A] text-[14px] mb-5">
                  Shipping
                </p>
                <p>Free</p>
              </div>
              <div className="flex justify-between">
                <p className="font-normal text-[#61828A] text-[14px] mb-5">
                  Total
                </p>
                <p>$36.96</p>
              </div>
              <div className="text-center md:text-start">
                <Button className="w-[95%] h-[48px] bg-[#12BFEB] text-black md:w-[40%]">
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
