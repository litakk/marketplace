"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  imageUrl?: string | null;
  category?: { id: number; name: string };
  variants?: { id: number; price: number; stock: number }[];
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error("Не удалось загрузить товары");
        const data = await res.json();
        setProducts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const remove = async (id: number) => {
    if (!confirm("Удалить товар?")) return;
    const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    if (res.ok) setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Товары</h2>
        <Link
          href="/admin/add-product"
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Добавить товар
        </Link>
      </div>

      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600">{error}</div>}

      <div className="grid gap-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between bg-white border rounded p-3">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.imageUrl && (
                <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-cover rounded" />
              )}
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-gray-500">
                  Категория: {p.category?.name || "-"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/products/${p.id}`} className="px-3 py-1 text-sm rounded bg-gray-100">
                Редактировать
              </Link>
              <button onClick={() => remove(p.id)} className="px-3 py-1 text-sm rounded bg-red-600 text-white">
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


