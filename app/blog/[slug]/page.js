import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";

async function getBlog(slug) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

    const response = await fetch(
      `${baseUrl}/api/blogs/slug/${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data.blog || null;
  } catch (error) {
    console.error("BLOG DETAIL ERROR:", error);
    return null;
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <>
        <Header />

        <main className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Post Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            The post you are looking for does not exist.
          </p>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-16">
        {blog.image && (
          <div className="overflow-hidden rounded-xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <h1 className="mt-8 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
          {blog.title}
        </h1>

        <div className="mt-4 text-sm text-gray-500">
          By{" "}
          <span className="font-semibold text-emerald-600">
            {blog.author || "Pushpam"}
          </span>

          {blog.createdAt && (
            <>
              {" • "}
              {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </>
          )}
        </div>

        <p className="mt-8 text-lg leading-8 text-gray-600">
          {blog.description}
        </p>

        {blog.content && (
          <article className="mt-8 whitespace-pre-line text-base leading-8 text-gray-700">
            {blog.content}
          </article>
        )}
      </main>

      <Footer />
    </>
  );
}