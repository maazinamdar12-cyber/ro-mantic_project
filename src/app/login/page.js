"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation/loginSchema";

import { useToast } from '@/hooks/useToast'
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { loading, dismiss, error, success } = useToast();
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const toastId = loading("Log in....")
    try {

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }
      dismiss(toastId);
      success(result.message);

      login(result.user);

      router.push(
        result.user.role === "admin" ? "/admin" : "/"
      );

    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md rounded-xl border  p-8 shadow-sm">

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-500">
            Login to manage your orders and services.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Email */}
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full rounded border px-3 py-2"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>


          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full rounded border px-3 py-2"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>


          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-[var(--accent)] px-6 py-3 text-white disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </main>
  );
}