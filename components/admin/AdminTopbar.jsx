"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminTopbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  // =========================
  // GET CURRENT USER
  // =========================
  useEffect(() => {
    async function getCurrentUser() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("GET CURRENT USER ERROR:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    getCurrentUser();
  }, []);

  // =========================
  // LOGOUT
  // =========================
  async function handleLogout() {
    try {
      setLoggingOut(true);

      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Logout failed");
      }

      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
      alert(error.message || "Logout failed");
      setLoggingOut(false);
    }
  }

  // =========================
  // USER INITIAL
  // =========================
  const initial =
    user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <div className="flex h-20 items-center justify-between px-6">

        {/* =========================
            WORKSPACE
        ========================= */}
        <div>
          <p className="text-sm text-gray-500">
            Active Workspace
          </p>

          <h2 className="font-semibold text-gray-900">
            {loading ? "Loading..." : user?.name || "User"}
          </h2>
        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}
        <div className="flex items-center gap-5">

          {/* Notifications */}
          <button
            type="button"
            className="relative text-sm text-gray-600 hover:text-gray-900"
          >
            Notifications

            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              3
            </span>
          </button>

          {/* =========================
              USER PROFILE
          ========================= */}
          <div className="flex items-center gap-3">

            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200 font-semibold text-gray-700">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                initial
              )}
            </div>

            {/* User Details */}
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">
                {loading
                  ? "Loading..."
                  : user?.name || "User"}
              </p>

              <p className="text-xs text-gray-500">
                {user?.role || "Viewer"}
              </p>
            </div>
          </div>

          {/* =========================
              LOGOUT
          ========================= */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>

        </div>
      </div>
    </header>
  );
}