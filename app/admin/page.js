
"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
  });

  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("/api/dashboard", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load dashboard");
        }

        setData(result.stats || {});
        setRecentBlogs(result.recentBlogs || []);
        setRecentUsers(result.recentUsers || []);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-8">

        {/* OVERVIEW */}
        <div className="mb-7">
          <p className="text-sm font-medium text-slate-500">
            Overview
          </p>

          <div className="mt-1 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-bold text-[#071a36]">
                Dashboard
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Monitor users, blogs, and activity from one clean workspace.
              </p>
            </div>

            <div className="flex gap-3">
              <button className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                Export
              </button>

              <button className="rounded-lg bg-[#111827] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                Create Report
              </button>
            </div>
          </div>
        </div>

        {/* STAT CARDS */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Users"
            value={loading ? "..." : data.totalUsers}
            text="Registered users"
          />

          <StatCard
            title="Total Blogs"
            value={loading ? "..." : data.totalBlogs}
            text="All blog posts"
          />

          <StatCard
            title="Published"
            value={loading ? "..." : data.publishedBlogs}
            text="Published blogs"
            valueClass="text-emerald-600"
          />

          <StatCard
            title="Drafts"
            value={loading ? "..." : data.draftBlogs}
            text="Unpublished blogs"
            valueClass="text-amber-500"
          />

        </section>

        {/* SALES PERFORMANCE / BLOG PERFORMANCE */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-[#071a36]">
                Blog Performance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Overview of your website content and publishing activity.
              </p>
            </div>

            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              View Details
            </button>
          </div>

          <div className="px-6 py-7">

            <div className="flex h-56 items-end gap-4 sm:gap-8">

              {[35, 55, 42, 70, 58, 82].map((height, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 flex-col justify-end"
                >
                  <div
                    className="rounded-t-lg bg-blue-500/80 transition-all hover:bg-blue-600"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}

            </div>

            <div className="mt-4 grid grid-cols-6 text-center text-xs text-slate-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>

          </div>
        </section>

        {/* TEAM ACTIVITY */}
        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-lg font-bold text-[#071a36]">
                Team Activity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Recent operational updates.
              </p>
            </div>

            <div className="divide-y divide-slate-100">

              <Activity
                title="New blog published"
                text="A new blog post was published successfully."
              />

              <Activity
                title="New user registered"
                text="A new user joined the workspace."
              />

              <Activity
                title="Content updated"
                text="Blog content was recently updated."
              />

            </div>
          </div>

          {/* RECENT BLOGS */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-lg font-bold text-[#071a36]">
                Recent Blogs
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest posts added to your website.
              </p>
            </div>

            {loading ? (
              <div className="p-8 text-center text-sm text-slate-500">
                Loading...
              </div>
            ) : recentBlogs.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No blogs found.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">

                {recentBlogs.slice(0, 3).map((blog) => (
                  <div
                    key={blog._id}
                    className="flex items-center gap-4 px-6 py-4"
                  >

                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title || "Blog"}
                        className="h-12 w-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400">
                        No Image
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-[#071a36]">
                        {blog.title || "Untitled"}
                      </h3>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {blog.description || "No description"}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                      {blog.status || "Published"}
                    </span>

                  </div>
                ))}

              </div>
            )}

          </div>

        </section>

        {/* RECENT USERS */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-[#071a36]">
                Recent Users
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest account activity across the workspace.
              </p>
            </div>

            <a
              href="/admin/users"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Manage Users
            </a>
          </div>

          {recentUsers.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No users found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Team</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {recentUsers.slice(0, 5).map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50">

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111827] text-sm font-bold text-white">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          <div>
                            <p className="font-semibold text-[#071a36]">
                              {user.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {user.email}
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.role || "Viewer"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.team || "General"}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
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

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {user.joined
                          ? new Date(user.joined).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </td>

                      <td className="px-6 py-4">
                        <a
                          href={`/admin/users/${user._id}`}
                          className="text-sm font-semibold text-[#071a36] hover:text-blue-600"
                        >
                          View
                        </a>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </div>
    </main>
  );
}


/* =========================
   STAT CARD
========================= */

function StatCard({
  title,
  value,
  text,
  valueClass = "text-[#071a36]",
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2 className={`mt-3 text-3xl font-bold ${valueClass}`}>
        {value}
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        {text}
      </p>
    </div>
  );
}


/* =========================
   ACTIVITY
========================= */

function Activity({ title, text }) {
  return (
    <div className="flex gap-4 px-6 py-5">

      <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />

      <div>
        <h3 className="text-sm font-semibold text-[#071a36]">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {text}
        </p>
      </div>

    </div>
  );
}