"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Category = { id: number; name: string };

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params?.id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`/api/admin/products/${id}`, { cache: "no-store" }),
          fetch(`/api/categories/all`, { cache: "no-store" }),
        ]);
        if (!pRes.ok) throw new Error("Не удалось загрузить товар");
        if (!cRes.ok) throw new Error("Не удалось загрузить категории");
        const product = await pRes.json();
        const cats = await cRes.json();
        setCategories(cats);
        setName(product.name || "");
        setDescription(product.description || "");
        setCategoryId(product.categoryId ?? null);
        setImageUrl(product.imageUrl || "");
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, categoryId, imageUrl }),
    });
    if (res.ok) router.push("/admin/products");
  };

  if (loading) return <div className="p-4">Загрузка...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-2xl font-semibold">Редактировать товар</h2>
      <form onSubmit={save} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Название</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm mb-1">Описание</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded px-3 py-2 w-full" rows={4} />
        </div>
        <div>
          <label className="block text-sm mb-1">Категория</label>
          <select
            value={categoryId ?? ""}
            onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Без категории</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Картинка (URL)</label>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Сохранить</button>
          <button type="button" onClick={() => router.push("/admin/products")} className="px-4 py-2 rounded bg-gray-100">Отмена</button>
        </div>
      </form>
    </div>
  );
}


