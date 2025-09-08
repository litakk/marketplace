"use client";

import { useEffect, useState } from "react";

type Category = { id: number; name: string; imageUrl?: string | null };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories/all", { cache: "no-store" });
      const data = await res.json();
      setCategories(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!name.trim()) return;
    const res = await fetch("/api/admin/add-categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setName("");
      load();
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Удалить категорию?")) return;
    const res = await fetch(`/api/admin/add-categories?id=${id}`, { method: "DELETE" });
    if (res.ok) load();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Категории</h2>
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Новая категория"
          className="border rounded px-3 py-2"
        />
        <button onClick={add} className="px-4 py-2 rounded bg-blue-600 text-white">Добавить</button>
      </div>

      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600">{error}</div>}

      <div className="grid gap-2">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center justify-between bg-white border rounded p-3">
            <div className="font-medium">{c.name}</div>
            <button onClick={() => remove(c.id)} className="px-3 py-1 text-sm rounded bg-red-600 text-white">
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


