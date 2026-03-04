"use client";

import { useAxios } from "@/hooks/use-axios";
import { useAuth } from "@/lib/auth/use-auth";
import { ApiResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { setAuth } = useAuth();
  const axios = useAxios();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await axios.post<
        ApiResponse<{ token: string; user: { email: string; role: string } }>
      >("/auth/login", { email, password });

      if (data.status === "success") {
        setAuth(data.data.user, data.data.token);
        router.push("/admin");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center px-4 py-20">
      <div className="bg-white p-12 shadow-2xl border border-border-base max-w-lg w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-text-dark mb-4">
            Welcome Back Admin
          </h1>
          <p className="text-text-gray text-lg">
            Enter your details to access the dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 mb-6 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-text-dark font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="admin@quickhire.com"
              className="w-full px-4 py-4 border border-border-base focus:outline-none focus:border-primary text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-text-dark font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-4 border border-border-base focus:outline-none focus:border-primary text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-primary" />
              <span className="text-text-gray">Remember me</span>
            </label>
            <button
              type="button"
              className="text-primary font-bold hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white font-bold py-4 text-xl transition-all hover:bg-opacity-90 disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            {isLoading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-border-base text-center">
          <p className="text-text-gray">
            Fixed credentials for preview: <br />
            <span className="text-text-dark font-bold">
              admin@quickhire.com
            </span>{" "}
            / <span className="text-text-dark font-bold">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
