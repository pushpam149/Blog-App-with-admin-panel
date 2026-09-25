import Header from "@/components/website/Header";
import PostCard from "@/components/website/PostCard";
import Footer from "@/components/website/Footer";

async function getBlogs() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

    const response = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    return data.blogs || [];
  } catch (error) {
    console.error("FETCH BLOGS ERROR:", error);
    return [];
  }
}

export default async function Home({ searchParams }) {
  const params = await searchParams;

  const query = params?.q?.toLowerCase() || "";
  const currentPage = Number(params?.page) || 1;

  // MongoDB se live blogs
  const blogs = await getBlogs();

  // SEARCH
  const filteredBlogs = blogs.filter((blog) => {
    return (
      blog.title?.toLowerCase().includes(query) ||
      blog.description?.toLowerCase().includes(query)
    );
  });

  // 6 cards per page
  const postsPerPage = 6;

  const totalPages = Math.ceil(
    filteredBlogs.length / postsPerPage
  );

  const safeTotalPages = Math.max(totalPages, 1);

  const page = Math.min(
    Math.max(currentPage, 1),
    safeTotalPages
  );

  const startIndex = (page - 1) * postsPerPage;

  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + postsPerPage
  );

  // Previous
  const previousUrl =
    page > 1
      ? `/?page=${page - 1}${
          query
            ? `&q=${encodeURIComponent(query)}`
            : ""
        }`
      : "#";

  // Next
  const nextUrl =
    page < safeTotalPages
      ? `/?page=${page + 1}${
          query
            ? `&q=${encodeURIComponent(query)}`
            : ""
        }`
      : "#";

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-12">

        {/* BLOGS */}
        {currentBlogs.length > 0 ? (
          <>
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {currentBlogs.map((blog) => (
                <PostCard
                  key={blog._id}
                  image={blog.image}
                  title={blog.title}
                  description={blog.description}
                  slug={blog.slug}
                  date={
                    blog.createdAt
                      ? new Date(
                          blog.createdAt
                        ).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""
                  }
                />
              ))}
            </section>

            {/* PAGINATION */}
            <div className="mt-10 flex items-center justify-between">

              {/* PREVIOUS */}
              {page > 1 ? (
                <a
                  href={previousUrl}
                  className="rounded-md border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-600 shadow-sm hover:bg-gray-50"
                >
                  Previous
                </a>
              ) : (
                <button
                  disabled
                  className="cursor-not-allowed rounded-md border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-400 shadow-sm"
                >
                  Previous
                </button>
              )}

              {/* PAGE NUMBER */}
              <span className="text-sm text-gray-500">
                Page {page} of {safeTotalPages}
              </span>

              {/* NEXT */}
              {page < safeTotalPages ? (
                <a
                  href={nextUrl}
                  className="rounded-md border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-600 shadow-sm hover:bg-gray-50"
                >
                  Next
                </a>
              ) : (
                <button
                  disabled
                  className="cursor-not-allowed rounded-md border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-400 shadow-sm"
                >
                  Next
                </button>
              )}

            </div>
          </>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              No posts found
            </h2>

            <p className="mt-2 text-gray-500">
              Try another keyword.
            </p>
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}