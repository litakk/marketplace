"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  name?: string | null;
  role: "USER" | "ADMIN";
  isBlocked: boolean;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      if (!res.ok) throw new Error("Не удалось загрузить пользователей");
      const data = await res.json();
      setUsers(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleBlock = async (id: number, isBlocked: boolean) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isBlocked }),
    });
    if (res.ok) load();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Пользователи</h2>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid gap-2">
        {users.map((u) => (
          <div key={u.id} className="bg-white border rounded p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{u.email}</div>
              <div className="text-xs text-gray-500">{new Date(u.createdAt).toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${u.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                {u.isBlocked ? "Заблокирован" : "Активен"}
              </span>
              <button
                onClick={() => toggleBlock(u.id, !u.isBlocked)}
                className="px-3 py-1 text-sm rounded bg-gray-100"
              >
                {u.isBlocked ? "Разблокировать" : "Заблокировать"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


