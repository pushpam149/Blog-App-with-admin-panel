"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/blogs", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch blogs");
      }

      setBlogs(data.blogs || []);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete blog");
      }

      setBlogs((prev) => prev.filter((blog) => blog._id !== id));

      setMessage("Blog deleted successfully.");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
              Blog Management
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#071a36]">
              Blogs
            </h1>

            <p className="mt-1 text-slate-500">
              Manage all blog posts from your database.
            </p>
          </div>

          <Link
            href="/admin/add-blog"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + Add Blog
          </Link>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="mb-5 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
            {message}
          </div>
        )}

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          {loading ? (
            <div className="p-10 text-center text-slate-500">
              Loading blogs...
            </div>
          ) : blogs.length === 0 ? (
            <div className="p-10 text-center">
              <h2 className="text-xl font-semibold text-[#071a36]">
                No blogs found
              </h2>

              <p className="mt-2 text-slate-500">
                Create your first blog post.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">

                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Blog
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Author
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {blogs.map((blog) => (
                    <tr
                      key={blog._id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* BLOG */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">

                          {blog.image ? (
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="h-14 w-20 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400">
                              No Image
                            </div>
                          )}

                          <div className="max-w-md">
                            <p className="font-semibold text-[#071a36]">
                              {blog.title}
                            </p>

                            <p className="mt-1 truncate text-sm text-slate-500">
                              {blog.description}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* AUTHOR */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {blog.author || "Pushpam"}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            blog.status === "Published"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-5 text-sm text-slate-500">
                        {blog.createdAt
                          ? new Date(
                              blog.createdAt
                            ).toLocaleDateString("en-IN")
                          : "-"}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">

                          <Link
                            href={`/admin/blogs/edit/${blog._id}`}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => deleteBlog(blog._id)}
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}