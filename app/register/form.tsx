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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-sm mx-auto p-4 border rounded-xl shadow-md"
    >
      <input
        {...register("name", { required: "Enter your name" })}
        type="text"
        placeholder="Имя"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <input
        {...register("email", { required: "Enter your email" })}
        type="email"
        placeholder="Email"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        {...register("password", { required: "Enter your password" })}
        type="password"
        placeholder="Пароль"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      {loginError && <p className="text-red-600 text-sm">{loginError}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        {loading ? "Загрузка..." : "Зарегистрироваться"}
      </button>

      <div className="text-center">или</div>

      <button
        type="button"
        onClick={handleGoogleRegister}
        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
      >
        Зарегистрироваться через Google
      </button>
    </form>
  );
}