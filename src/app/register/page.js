"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation/registerSchema";
import {useToast} from '@/hooks/useToast'


export default function RegisterPage() {
  const {dismiss,error,loading,success} = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {

  const toastId = loading("Creating account...");

  try {

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Registration failed");
    }

    dismiss(toastId);
    success(result.message);

    router.push("/login");

  } catch (err) {

    dismiss(toastId);
    error(err.message);

  }
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md rounded-xl border  p-8 shadow-sm">

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-sm text-gray-500">
            Register to book services and track your orders.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Full Name
            </label>

            <input
              {...register("name")}
              placeholder="John Doe"
              className="w-full rounded border px-3 py-2 focus:border-[var(--accent)] focus:outline-none"
            />

            {errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>


          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              {...register("email")}
              placeholder="john@example.com"
              className="w-full rounded border px-3 py-2 focus:border-[var(--accent)] focus:outline-none"
            />

            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>


          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Phone Number
            </label>

            <input
              {...register("phone")}
              placeholder="9876543210"
              className="w-full rounded border px-3 py-2 focus:border-[var(--accent)] focus:outline-none"
            />

            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>


          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full rounded border px-3 py-2 focus:border-[var(--accent)] focus:outline-none"
            />

            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>


          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-[var(--accent)] px-6 py-3 font-medium text-white hover:opacity-90 disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </main>
  );
}