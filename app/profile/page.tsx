// app/profile/page.tsx
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Logout from "../logout";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-4xl mx-auto p-6 mb-[300px]">
      <h1 className="text-2xl font-bold mb-6">Профиль</h1>

      <div className="space-y-6">
        {/* Карточка приветствия */}
        <div className="border rounded-xl p-6 shadow-sm bg-white">
          {session?.user?.name ? (
            <h2 className="text-lg font-semibold">
              Добро пожаловать, {session.user.name}!
            </h2>
          ) : (
            <h2 className="text-lg font-semibold">Войдите в аккаунт</h2>
          )}
        </div>

        {/* Карточка действий */}
        <div className="border rounded-xl p-6 shadow-sm bg-white flex items-center justify-between">
          {session ? (
            <Logout />
          ) : (
            <Link href="/login">
              <Button className="hover:cursor-pointer">Войти</Button>
            </Link>
          )}

          <Link href="/profile/orders">
            <Button variant="outline">Мои заказы</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
