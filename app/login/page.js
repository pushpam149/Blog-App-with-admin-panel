"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-6 py-12">
      <div className="w-full max-w-md">

        {/* LOGO / TITLE */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#071a36]">
            adminHMD
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to your admin panel
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            Admin Login
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter your account details to continue.
          </p>

          <form onSubmit={handleLogin} className="mt-6">

            {/* EMAIL */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="mb-5 mt-2 text-right">
              <a
                href="/admin/forgot-password"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          adminHMD Admin Panel
        </p>
      </div>
    </main>
  );
}