"use client";

import { useEffect, useState } from "react";

import Footer from "@/components/website/Footer";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // =========================
  // GET USERS
  // =========================
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
    } catch (error) {
      console.error("FETCH USERS ERROR:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // DELETE USER
  // =========================
  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name || "this user"}?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(`/api/users?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      // Remove user from table immediately
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user._id !== id)
      );

      alert("User deleted successfully");
    } catch (error) {
      console.error("DELETE USER ERROR:", error);
      setError(error.message || "Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // SEARCH
  // =========================
  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value) ||
      user.role?.toLowerCase().includes(value) ||
      user.team?.toLowerCase().includes(value) ||
      user.status?.toLowerCase().includes(value)
    );
  });

  // =========================
  // DATE FORMAT
  // =========================
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // =========================
  // INITIALS
  // =========================
  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb]">

      <main className="p-6">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-medium text-gray-500">
              Management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Users
            </h1>

            <p className="mt-2 text-gray-500">
              Manage users, roles, teams, and account status.
            </p>
          </div>

          <a
            href="/admin/add-user"
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Add User
          </a>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-5 py-4">

            <p className="text-sm font-medium text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchUsers}
              className="rounded-md bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800"
            >
              Try Again
            </button>

          </div>
        )}

        {/* TABLE CARD */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* TOP */}
          <div className="flex flex-col gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Users
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {filteredUsers.length} of {users.length} users
              </p>
            </div>

            {/* SEARCH */}
            <div className="w-full sm:w-80">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
            </div>

          </div>

          {/* LOADING */}
          {loading && (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-500">
                Loading users...
              </p>
            </div>
          )}

          {/* TABLE */}
          {!loading && (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                      User
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Role
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Team
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Joined
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredUsers.length === 0 ? (

                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center"
                      >
                        <p className="text-sm text-gray-500">
                          No users found.
                        </p>
                      </td>
                    </tr>

                  ) : (

                    filteredUsers.map((user) => (

                      <tr
                        key={user._id}
                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                      >

                        {/* USER */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                              {getInitials(user.name)}
                            </div>

                            <div className="min-w-0">

                              <p className="font-semibold text-gray-900">
                                {user.name}
                              </p>

                              <p className="mt-1 text-sm text-gray-500">
                                {user.email}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* ROLE */}
                        <td className="px-6 py-5 text-sm text-gray-700">
                          {user.role || "Viewer"}
                        </td>

                        {/* TEAM */}
                        <td className="px-6 py-5 text-sm text-gray-700">
                          {user.team || "General"}
                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              user.status === "Active"
                                ? "bg-emerald-50 text-emerald-600"
                                : user.status === "Pending"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {user.status || "Active"}
                          </span>

                        </td>

                        {/* JOINED */}
                        <td className="px-6 py-5 text-sm text-gray-700">
                          {formatDate(
                            user.joined || user.createdAt
                          )}
                        </td>

                        {/* ACTION */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-4">

                            {/* VIEW */}
                            <a
                              href={`/admin/user?id=${user._id}`}
                              className="font-semibold text-gray-900 hover:underline"
                            >
                              View
                            </a>

                            {/* EDIT */}
                            <a
                              href={`/admin/user/edit?id=${user._id}`}
                              className="font-semibold text-blue-600 hover:underline"
                            >
                              Edit
                            </a>

                            {/* DELETE */}
                            <button
                              type="button"
                              disabled={deletingId === user._id}
                              onClick={() =>
                                handleDelete(
                                  user._id,
                                  user.name
                                )
                              }
                              className="font-semibold text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingId === user._id
                                ? "Deleting..."
                                : "Delete"}
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>
          )}

          {/* BOTTOM */}
          {!loading && filteredUsers.length > 0 && (

            <div className="border-t border-gray-100 px-6 py-4">

              <p className="text-sm text-gray-500">

                Showing{" "}

                <span className="font-semibold text-gray-700">
                  {filteredUsers.length}
                </span>{" "}

                of{" "}

                <span className="font-semibold text-gray-700">
                  {users.length}
                </span>{" "}

                users

              </p>

            </div>

          )}

        </section>

      </main>

      

    </div>
  );
}