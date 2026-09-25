"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBlogPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    image: "",
    author: "Pushpam",
    status: "Published",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // =========================
  // IMAGE UPLOAD
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setMessage("");
    setError("");

    // Image check
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    // 2 MB limit
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.onerror = () => {
      setError("Failed to read image.");
    };

    reader.readAsDataURL(file);
  };

  // =========================
  // REMOVE IMAGE
  // =========================
  const removeImage = () => {
    setForm((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // =========================
  // CREATE BLOG
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (!form.title.trim()) {
        throw new Error("Please enter blog title.");
      }

      if (!form.slug.trim()) {
        throw new Error("Please enter blog slug.");
      }

      if (!form.description.trim()) {
        throw new Error("Please enter blog description.");
      }

      if (!form.content.trim()) {
        throw new Error("Please enter blog content.");
      }

      if (!form.image) {
        throw new Error("Please select a blog image.");
      }

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create blog"
        );
      }

      setMessage("Blog created successfully!");

      setForm({
        title: "",
        slug: "",
        description: "",
        content: "",
        image: "",
        author: "Pushpam",
        status: "Published",
      });

      setTimeout(() => {
        router.push("/admin/blogs");
        router.refresh();
      }, 1000);
    } catch (err) {
      console.error("CREATE BLOG ERROR:", err);
      setError(
        err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">

        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Blog Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Add Blog
          </h1>

          <p className="mt-2 text-slate-500">
            Create a new blog post for your website.
          </p>
        </div>

        {/* =========================
            SUCCESS MESSAGE
        ========================= */}
        {message && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {message}
          </div>
        )}

        {/* =========================
            ERROR MESSAGE
        ========================= */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* =========================
            FORM
        ========================= */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          {/* TITLE */}
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Title
            </label>

            <input
              id="title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* SLUG */}
          <div className="mb-5">
            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Slug
            </label>

            <input
              id="slug"
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="etelligens-company"
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-xs text-slate-400">
              Enter a unique slug for this blog.
            </p>
          </div>

          {/* IMAGE */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Blog Image
            </label>

            {!form.image ? (
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 transition hover:border-blue-400 hover:bg-blue-50">

                <div className="mb-3 text-4xl">
                  🖼️
                </div>

                <p className="text-sm font-semibold text-slate-700">
                  Choose Image
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  JPG, JPEG, PNG or WEBP
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Maximum size: 2 MB
                </p>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />

              </label>
            ) : (
              <div className="relative overflow-hidden rounded-xl border border-slate-200">

                <img
                  src={form.image}
                  alt="Blog preview"
                  className="h-72 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-3 top-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
                >
                  Remove
                </button>

              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="mb-5">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description of the blog"
              rows={4}
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* CONTENT */}
          <div className="mb-5">
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Content
            </label>

            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your complete blog content..."
              rows={10}
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* AUTHOR + STATUS */}
          <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* AUTHOR */}
            <div>
              <label
                htmlFor="author"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Author
              </label>

              <input
                id="author"
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* STATUS */}
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Status
              </label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Published">
                  Published
                </option>

                <option value="Draft">
                  Draft
                </option>
              </select>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 border-t border-slate-200 pt-5">

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Blog"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}