"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/website/Footer";

export default function UserDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        setUser(data.user);
      } catch (error) {
        console.error("FETCH USER ERROR:", error);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] p-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-gray-500">Loading user...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] p-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-bold text-red-600">
              User not found
            </h1>

            <p className="mt-2 text-gray-500">
              {error || "This user does not exist."}
            </p>

            <Link
              href="/admin/users"
              className="mt-5 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Back to Users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb]">

      <main className="p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">

          {/* HEADER */}
          <div className="mb-8">
            <p className="text-sm font-medium text-gray-500">
              Management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              User Details
            </h1>

            <p className="mt-2 text-gray-500">
              View user profile and account information.
            </p>
          </div>

          {/* PROFILE CARD */}
          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-100 p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                {/* AVATAR */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white">
                  {getInitials(user.name)}
                </div>

                {/* NAME */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.name}
                  </h2>

                  <p className="mt-1 text-gray-500">
                    {user.email}
                  </p>
                </div>

                {/* STATUS */}
                <span className="inline-flex w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
                  {user.status || "Active"}
                </span>

              </div>
            </div>

            {/* ACCOUNT INFORMATION */}
            <div className="p-8">

              <h3 className="mb-6 text-lg font-bold text-gray-900">
                Account Information
              </h3>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                <div>
                  <p className="text-sm text-gray-400">
                    Full Name
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {user.name || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {user.email || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Role
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {user.role || "Viewer"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Team
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {user.team || "General"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Status
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {user.status || "Active"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Joined
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {formatDate(user.joined || user.createdAt)}
                  </p>
                </div>

              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 p-6 sm:flex-row sm:justify-end">

              <Link
                href="/admin/users"
                className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                Back to Users
              </Link>

              <Link
                href={`/admin/user/edit?id=${user._id}`}
                className="rounded-lg bg-gray-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800"
              >
                Edit User
              </Link>

            </div>

          </section>

        </div>
      </main>

      

    </div>
  );
}