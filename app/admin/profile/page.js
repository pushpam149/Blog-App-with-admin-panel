
"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    role: "",
    team: "",
    status: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // LOAD PROFILE
  // =========================
  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/auth/me", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load profile"
        );
      }

      setProfile({
        name: data.user?.name || "",
        email: data.user?.email || "",
        bio: data.user?.bio || "",
        role: data.user?.role || "",
        team: data.user?.team || "",
        status: data.user?.status || "",
        avatar: data.user?.avatar || "",
      });
    } catch (err) {
      console.error("PROFILE ERROR:", err);
      setError(
        err.message || "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // HANDLE INPUT
  // =========================
  function handleChange(e) {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setError("");
  }

  // =========================
  // SAVE PROFILE
  // =========================
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await fetch("/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          bio: profile.bio,
          avatar: profile.avatar,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update profile"
        );
      }

      setProfile({
        name: data.user?.name || "",
        email: data.user?.email || "",
        bio: data.user?.bio || "",
        role: data.user?.role || "",
        team: data.user?.team || "",
        status: data.user?.status || "",
        avatar: data.user?.avatar || "",
      });

      setMessage("Profile saved successfully.");
    } catch (err) {
      console.error(
        "PROFILE UPDATE ERROR:",
        err
      );

      setError(
        err.message || "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================
  // INITIALS
  // =========================
  const initials =
    profile.name
      ?.trim()
      ?.split(/\s+/)
      ?.map((word) => word.charAt(0))
      ?.join("")
      ?.slice(0, 2)
      ?.toUpperCase() || "U";

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <main className="p-6">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-gray-500">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">

      {/* HEADER */}
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-500">
          Account
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Profile
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your personal details, bio, and account information.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* SUCCESS */}
      {message && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {message}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-3">

        {/* =========================
            PROFILE CARD
        ========================= */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col items-center text-center">

            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-3xl font-bold text-white">

              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}

            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              {profile.name || "User"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {profile.role}
            </p>

            <span className="mt-4 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              {profile.status}
            </span>

          </div>

          <div className="mt-8 space-y-5 border-t border-gray-100 pt-6">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Email
              </p>

              <p className="mt-1 break-all text-sm font-medium text-gray-800">
                {profile.email}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Role
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {profile.role}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Team
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {profile.team}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Status
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {profile.status}
              </p>
            </div>

          </div>
        </section>

        {/* =========================
            SETTINGS
        ========================= */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">

          <div className="mb-7">
            <h2 className="text-xl font-bold text-gray-900">
              Profile Settings
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update your account profile and contact details.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* BIO */}
            <div>
              <label
                htmlFor="bio"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Bio
              </label>

              <textarea
                id="bio"
                name="bio"
                rows={5}
                value={profile.bio}
                onChange={handleChange}
                placeholder="Write something about yourself..."
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* AVATAR */}
            <div>
              <label
                htmlFor="avatar"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Avatar URL
              </label>

              <input
                id="avatar"
                name="avatar"
                type="url"
                value={profile.avatar}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* SAVE */}
            <div className="border-t border-gray-100 pt-6">

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Profile"}
              </button>

            </div>

          </form>
        </section>
      </div>
    </main>
  );
}