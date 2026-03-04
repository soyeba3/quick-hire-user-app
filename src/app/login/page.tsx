"use client";

import { login } from "@/app/actions/auth-action";
import { useAuth } from "@/lib/auth/use-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "./schemas/login.schema";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await login(data);

      if (response.status === "success") {
        setAuth(response.data.user, response.data.token);
        router.push("/admin");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid credentials. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-20 min-h-screen bg-bg-light">
      <div className="p-12 w-full max-w-lg bg-white border shadow-2xl border-border-base">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-text-dark">
            Welcome Back Admin
          </h1>
          <p className="text-lg text-text-gray">
            Enter your details to access the dashboard
          </p>
        </div>

        {error && (
          <div className="px-4 py-3 mb-6 text-red-600 bg-red-50 rounded border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 font-bold text-text-dark">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="admin@quickhire.com"
              className={`w-full px-4 py-4 border focus:outline-none focus:border-primary text-lg ${
                errors.email ? "border-red-500" : "border-border-base"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-bold text-text-dark">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={`w-full px-4 py-4 border focus:outline-none focus:border-primary text-lg ${
                errors.password ? "border-red-500" : "border-border-base"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <label className="flex gap-2 items-center cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-primary" />
              <span className="text-text-gray">Remember me</span>
            </label>
            <button
              type="button"
              className="font-bold text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="py-4 w-full text-xl font-bold text-white shadow-lg transition-all bg-primary hover:bg-opacity-90 disabled:opacity-50 shadow-primary/20"
          >
            {isLoading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>

        <div className="pt-8 mt-10 text-center border-t border-border-base">
          <p className="text-text-gray">
            Fixed credentials for preview: <br />
            <span className="font-bold text-text-dark">
              admin@quickhire.com
            </span>{" "}
            / <span className="font-bold text-text-dark">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
