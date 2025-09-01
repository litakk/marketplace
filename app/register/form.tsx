"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        setLoginError(err.error || "Ошибка регистрации");
        return;
      }

      await new Promise((res) => setTimeout(res, 2500));

      const loginResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!loginResult?.error) {
        router.push("/");
        router.refresh();
      } else {
        setLoginError("Ошибка входа после регистрации");
      }
    } catch (error) {
      console.error(error);
      setLoginError("Системная ошибка");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    signIn("google", {
      callbackUrl: "/",
      prompt: "select_account",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="h-11 rounded-lg border border-black/10 bg-white text-gray-900 hover:bg-gray-50 transition dark:border-white/10 dark:bg-neutral-900 dark:text-white"
        >
          Google
        </button>
        <button
          type="button"
          className="h-11 rounded-lg border border-black/10 bg-black text-white hover:bg-neutral-900 transition dark:bg-white dark:text-black dark:hover:bg-neutral-100"
        >
          Apple
        </button>
      </div>

      <div className="relative text-center">
        <span className="px-3 text-xs text-muted-foreground bg-card relative z-10">
          или заполните форму
        </span>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-black/10 dark:border-white/10" />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Имя</label>
        <input
          {...register("name", { required: "Enter your name" })}
          type="text"
          placeholder="Иван Иванов"
          className="w-full bg-transparent border-0 border-b border-black/15 focus:border-black/80 dark:border-white/20 dark:focus:border-white/80 h-11 px-0 outline-none transition"
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Email</label>
        <input
          {...register("email", { required: "Enter your email" })}
          type="email"
          placeholder="you@example.com"
          className="w-full bg-transparent border-0 border-b border-black/15 focus:border-black/80 dark:border-white/20 dark:focus:border-white/80 h-11 px-0 outline-none transition"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Пароль</label>
        <input
          {...register("password", { required: "Enter your password" })}
          type="password"
          placeholder="••••••••"
          className="w-full bg-transparent border-0 border-b border-black/15 focus:border-black/80 dark:border-white/20 dark:focus:border-white/80 h-11 px-0 outline-none transition"
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {loginError && (
        <div className="rounded-md border border-red-300/60 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {loginError}
        </div>
      )}

      <div className="grid gap-3">
        <button
          type="submit"
          disabled={loading}
          className="h-11 rounded-none bg-black text-white font-medium tracking-wide hover:bg-neutral-900 transition dark:bg-white dark:text-black"
        >
          {loading ? "Загрузка..." : "Зарегистрироваться"}
        </button>
      </div>
    </form>
  );
}
