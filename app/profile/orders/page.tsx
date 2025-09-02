"use client";
// app/profile/orders/page.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export interface OrderAddress {
  fullName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  region: string;
  postalCode?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
}

export interface ProductVariant {
  id: number;
  label?: string | null;
  color?: string | null;
  size?: string | null;
  imageUrl?: string | null;
  price: number;
  stock: number;
  product: Product;
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  variant: ProductVariant;
}

export interface Order {
  id: number;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  address?: OrderAddress | null;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetch("/api/order/getOrders/");
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 mb-40">
      <h1 className="text-4xl font-serif uppercase tracking-widest mb-10 text-center">
        Мои заказы
      </h1>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="flex justify-center space-x-8 border-b border-black/10 mb-12">
          <TabsTrigger
            value="active"
            className="uppercase tracking-wide text-lg font-light data-[state=active]:font-semibold"
          >
            Активные
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="uppercase tracking-wide text-lg font-light data-[state=active]:font-semibold"
          >
            Все заказы
          </TabsTrigger>
        </TabsList>

        {/* Активные */}
        <TabsContent value="active" className="space-y-8">
          {orders
            .filter((order) => order.status === "PROCESSING")
            .map((order) => (
              <Card
                key={order.id}
                className="border border-black/20 rounded-none shadow-none hover:shadow-md transition"
              >
                <CardHeader className="flex justify-between items-center border-b border-black/10 pb-4">
                  <span className="text-xl font-medium uppercase">
                    Заказ #{order.id}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </CardHeader>
                <CardContent className="py-6 space-y-4">
                  <div className="flex justify-between text-sm uppercase">
                    <span>Статус</span>
                    <span className="font-medium">В обработке</span>
                  </div>
                  <div className="flex justify-between text-sm uppercase">
                    <span>Сумма</span>
                    <span className="font-semibold">${order.totalPrice}</span>
                  </div>

                  {order.address && (
                    <div className="pt-4 border-t border-black/10 text-sm leading-relaxed">
                      <p>Fullname: {order.address.fullName}</p>
                      <p>
                        City: {order.address.city}, Region:{" "}
                        {order.address.region}
                      </p>
                      <p>Address: {order.address.address}</p>
                      <p>Postal Code: {order.address.postalCode}</p>
                      <p>Email: {order.address.email}</p>
                      <p>Phone number: {order.address.phone}</p>
                    </div>
                  )}

                  {order.items.length > 0 && (
                    <div className="pt-6 border-t border-black/10 space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center space-x-4">
                            {item.variant.imageUrl && (
                              <img
                                src={item.variant.imageUrl}
                                alt={item.variant.product.name}
                                className="w-20 h-16 object-cover border border-black/10"
                              />
                            )}
                            <div>
                              <p className="font-medium">
                                {item.variant.product.name}
                              </p>
                              {item.variant.size && (
                                <p>Размер: {item.variant.size}</p>
                              )}
                              {item.variant.color && (
                                <p>Цвет: {item.variant.color}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p>${item.price}</p>
                            <p className="text-gray-500">x{item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        {/* Все */}
        <TabsContent value="all" className="space-y-8">
          {orders
            .filter((order) => order.status === "COMPLETED" || order.status === "CANCELLEND")
            .map((order) => (
              <Card
                key={order.id}
                className="border border-black/20 rounded-none shadow-none hover:shadow-md transition"
              >
                <CardHeader className="flex justify-between items-center border-b border-black/10 pb-4">
                  <span className="text-xl font-medium uppercase">
                    Заказ #{order.id}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </CardHeader>
                <CardContent className="py-6 space-y-4">
                  <div className="flex justify-between text-sm uppercase">
                    <span>Статус</span>
                    <span className="font-medium">{order.status}</span>
                  </div>
                  <div className="flex justify-between text-sm uppercase">
                    <span>Сумма</span>
                    <span className="font-semibold">${order.totalPrice}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
