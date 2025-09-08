"use client";

// import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Form() {
  const [loginError, setLoginError] = useState("");

  const route = useRouter();

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const res = await signIn("credentials", {
  //     redirect: false,
  //     email: formData.get("email"),
  //     password: formData.get("password"),
  //   });

  //   if (!res?.error) {
  //     route.push("/");
  //     route.refresh();
  //   }
  //   console.log("signIn result:", { res });
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const res = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (!res?.error) {
          setLoginError("");
          route.push("/");
          route.refresh();
        }

        if (res?.error) {
          setLoginError("Incorrect login or password");
        }
      })}
      className="space-y-7"
    >
        <button
          type="button"
          onClick={() => signIn("google")}
          className="w-full h-11 rounded-lg border border-black/10 bg-white text-gray-900 hover:bg-gray-50 transition dark:border-white/10 dark:bg-neutral-900 dark:text-white"
        >
          Google
        </button>

      <div className="relative text-center">
        <span className="px-3 text-xs text-muted-foreground bg-card relative z-10">
          или продолжить с email
        </span>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-black/10 dark:border-white/10" />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Email</label>
        <input
          {...register("email", { required: "Enter your email" })}
          type="email"
          className="w-full bg-transparent border-0 border-b border-black/15 focus:border-black/80 dark:border-white/20 dark:focus:border-white/80 h-11 px-0 outline-none transition"
          placeholder="you@example.com"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="text-sm text-red-600">Incorrect Email, try again</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium">Пароль</label>
          <button
            type="button"
            className="text-xs text-primary hover:underline"
          >
            Забыли пароль?
          </button>
        </div>
        <input
          {...register("password", { required: "Enter your password" })}
          type="password"
          className="w-full bg-transparent border-0 border-b border-black/15 focus:border-black/80 dark:border-white/20 dark:focus:border-white/80 h-11 px-0 outline-none transition"
          placeholder="••••••••"
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="text-sm text-red-600">Incorrect Password, try again</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-black/20 dark:border-white/30"
          />
          Запомнить меня
        </label>
      </div>

      {loginError && (
        <div className="rounded-md border border-red-300/60 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {loginError}
        </div>
      )}

      <div className="grid gap-3">
        <button
          type="submit"
          className="h-11 rounded-none bg-black text-white font-medium tracking-wide hover:bg-neutral-900 transition dark:bg-white dark:text-black"
        >
          Войти
        </button>
      </div>
    </form>
  );
}
