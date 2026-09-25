"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      window.location.href = "/admin";
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative z-0 flex min-h-screen items-center justify-center bg-[#f4f7fb] px-6">
      <div className="relative z-10 w-full max-w-md">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#071a36]">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to access your admin panel.
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="relative z-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          {/* ERROR */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {/* FORGOT PASSWORD */}
              <div className="relative z-50 mt-3 text-right">
                <Link
                  href="/admin/forgot-password"
                  className="relative z-50 inline-block cursor-pointer text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="relative z-10 w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
            {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}