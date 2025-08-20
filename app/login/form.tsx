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
      className="flex flex-col gap-4 w-full max-w-sm mx-auto p-4 border rounded-xl shadow-md"
    >
      <input
        {...register("email", { required: "Enter your email" })}
        type="email"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter email"
      />
      {errors.email && (
        <p className="text-red-500">Incorrect Email, try again</p>
      )}
      <input
        {...register("password", { required: "Enter your password" })}
        type="password"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Введите текст"
      />
      {errors.password && (
        <p className="text-red-500">Incorrect Password, try again</p>
      )}
      {loginError && <p className="text-red-500">{loginError}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        Войти
      </button>
      <button
        type="button"
        onClick={() => signIn("google")}
        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
      >
        Войти через Google
      </button>
    </form>
  );
}
