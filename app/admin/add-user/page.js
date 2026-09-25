"use client";

import { useState } from "react";
import Footer from "@/components/website/Footer";

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Viewer",
    team: "General",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // HANDLE INPUT
  // =========================
  function handleChange(e) {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  // =========================
  // CREATE USER
  // =========================
  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setError("");

    // NAME
    if (!formData.name.trim()) {
      setError("Please enter the user's name.");
      return;
    }

    // EMAIL
    if (!formData.email.trim()) {
      setError("Please enter the user's email.");
      return;
    }

    // PASSWORD
    if (!formData.password) {
      setError("Please enter a password.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // CONFIRM PASSWORD
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
  name: formData.name,
  email: formData.email,
  password: formData.password,
  role: formData.role,
  team: formData.team,
  status: formData.status,
}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create user"
        );
      }

      setMessage("User created successfully.");

      // RESET FORM
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Viewer",
        team: "General",
        status: "Active",
      });
    } catch (err) {
      console.error("CREATE USER ERROR:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] px-30">

      <main className="p-6">

        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500">
            Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Add User
          </h1>

          <p className="mt-2 text-gray-500">
            Create a new user account for your workspace.
          </p>
        </div>

        {/* =========================
            SUCCESS MESSAGE
        ========================= */}
        {message && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {message}
          </div>
        )}

        {/* =========================
            ERROR MESSAGE
        ========================= */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* =========================
            FORM CARD
        ========================= */}
        <section className="max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* =========================
                NAME + EMAIL
            ========================= */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
              </div>

            </div>

            {/* =========================
                PASSWORD
            ========================= */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Minimum 6 characters
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
              </div>

            </div>

            {/* =========================
                ROLE + TEAM
            ========================= */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Role
                </label>

                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="team"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Team
                </label>

                <select
                  id="team"
                  value={formData.team}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400"
                >
                  <option value="General">General</option>
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                  <option value="Content">Content</option>
                  <option value="Finance">Finance</option>
                  <option value="Data">Data</option>
                </select>
              </div>

            </div>

            {/* =========================
                STATUS
            ========================= */}
            <div>

              <label
                htmlFor="status"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Status
              </label>

              <select
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 md:w-1/2"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>

            </div>

            {/* =========================
                BUTTONS
            ========================= */}
            <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-6">

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create User"}
              </button>

              <a
                href="/admin/users"
                className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </a>

            </div>

          </form>

        </section>

      </main>

    

    </div>
  );
}