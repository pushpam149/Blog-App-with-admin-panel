"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function EditUserPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Viewer",
    team: "General",
    status: "Active",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // GET USER
  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setError("User ID not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/users?id=${id}`, {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user");
        }

        const user = data.user;

        setForm({
          name: user.name || "",
          email: user.email || "",
          role: user.role || "Viewer",
          team: user.team || "General",
          status: user.status || "Active",
        });
      } catch (error) {
        console.error("FETCH USER ERROR:", error);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const response = await fetch(`/api/users?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      alert("User updated successfully");

      router.push(`/admin/user?id=${id}`);
    } catch (error) {
      console.error("UPDATE USER ERROR:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f7fb] p-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-gray-500">Loading user...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500">
            Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Edit User
          </h1>

          <p className="mt-2 text-gray-500">
            Update user account information.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">

            {/* NAME */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Role
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              >
                <option value="Viewer">Viewer</option>
                <option value="Editor">Editor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* TEAM */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Team
              </label>

              <input
                type="text"
                name="team"
                value={form.team}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* STATUS */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 p-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => router.push(`/admin/user?id=${id}`)}
              className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>
        </form>

      </div>
    </main>
  );
}