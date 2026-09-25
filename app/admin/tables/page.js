
"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Footer from "@/components/website/Footer";

export default function TablesPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/users", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data.users || []);
    } catch (err) {
      console.error("TABLE USERS ERROR:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <AdminSidebar />

      <div className="lg:ml-64">
        <AdminTopbar />

        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-medium text-gray-500">
              Components
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Tables
            </h1>

            <p className="mt-2 text-gray-500">
              Organize and review workspace data in clean tables.
            </p>
          </div>

          {/* Table */}
          <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Table Header */}
            <div className="flex flex-col gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Users Table
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  View users, roles, teams, and account status.
                </p>
              </div>

              <a
                href="/admin/add-user"
                className="rounded-lg bg-gray-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800"
              >
                Add User
              </a>
            </div>

            {/* Loading */}
            {loading && (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-gray-500">
                  Loading users...
                </p>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="px-6 py-12 text-center">
                <p className="text-sm font-medium text-red-600">
                  {error}
                </p>

                <button
                  onClick={fetchUsers}
                  className="mt-4 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && users.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-gray-500">
                  No users found.
                </p>
              </div>
            )}

            {/* Table */}
            {!loading && !error && users.length > 0 && (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] text-left">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                          User
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Role
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Team
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Status
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Joined
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {users.map((user) => {
                        const initials =
                          user.name
                            ?.split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase() || "U";

                        return (
                          <tr
                            key={user._id}
                            className="transition hover:bg-gray-50"
                          >
                            {/* User */}
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                                  {initials}
                                </div>

                                <div>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {user.name}
                                  </p>

                                  <p className="mt-1 text-xs text-gray-500">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Role */}
                            <td className="px-6 py-5 text-sm text-gray-700">
                              {user.role || "Viewer"}
                            </td>

                            {/* Team */}
                            <td className="px-6 py-5 text-sm text-gray-700">
                              {user.team || "General"}
                            </td>

                            {/* Status */}
                            <td className="px-6 py-5">
                              <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                {user.status || "Active"}
                              </span>
                            </td>

                            {/* Joined */}
                            <td className="px-6 py-5 text-sm text-gray-600">
                              {formatDate(user.joined || user.createdAt)}
                            </td>

                            {/* Action */}
                            <td className="px-6 py-5">
                              <a
                                href={`/admin/user?id=${user._id}`}
                                className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-6 py-5">
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-semibold text-gray-700">
                      1
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-gray-700">
                      {users.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-700">
                      {users.length}
                    </span>{" "}
                    users
                  </p>
                </div>
              </>
            )}
          </section>
        </main>
        <Footer/>
      </div>
    </div>
  );
}

