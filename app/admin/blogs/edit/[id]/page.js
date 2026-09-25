"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBlogPage() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // FETCH BLOG
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch blog");
        }

        const blog = data.blog;

        setForm({
          title: blog.title || "",
          slug: blog.slug || "",
          description: blog.description || "",
          content: blog.content || "",
          image: blog.image || "",
          author: blog.author || "Pushpam",
          status: blog.status || "Published",
        });
      } catch (error) {
        console.error(error);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE BLOG
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update blog");
      }

      setMessage("Blog updated successfully!");

      setTimeout(() => {
        router.push("/admin/blogs");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f7fb] p-6 lg:p-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-slate-500">Loading blog...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            Blog Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#071a36]">
            Edit Blog
          </h1>

          <p className="mt-1 text-slate-500">
            Update your blog post.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          {/* TITLE */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* SLUG */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* IMAGE */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* CONTENT */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Content
            </label>

            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={8}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* AUTHOR + STATUS */}
          <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Author
              </label>

              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

          </div>

          {/* MESSAGE */}
          {message && (
            <div className="mb-5 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {message}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-3 border-t border-slate-200 pt-5">

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Updating..." : "Update Blog"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/blogs")}
              className="rounded-lg border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}