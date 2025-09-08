"use client";

import { useEffect, useState } from "react";

type Order = {
  id: number;
  status: "NEW" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  totalPrice: number;
  user: { id: number; email: string | null };
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      if (!res.ok) throw new Error("Не удалось загрузить заказы");
      const data = await res.json();
      setOrders(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: number, status: Order["status"]) => {
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) load();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Заказы</h2>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid gap-2">
        {orders.map((o) => (
          <div key={o.id} className="bg-white border rounded p-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="font-medium">Заказ #{o.id}</div>
              <div className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleString()}</div>
            </div>
            <div className="text-sm text-gray-600">Покупатель: {o.user?.email || "-"}</div>
            <div className="text-sm text-gray-600">Сумма: {o.totalPrice.toFixed(2)}</div>
            <div className="flex items-center gap-2 mt-2">
              <select
                value={o.status}
                onChange={(e) => updateStatus(o.id, e.target.value as Order["status"])}
                className="border rounded px-2 py-1"
              >
                <option value="NEW">Новый</option>
                <option value="PROCESSING">Обработан</option>
                <option value="COMPLETED">Выполнен</option>
                <option value="CANCELLED">Отменен</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


