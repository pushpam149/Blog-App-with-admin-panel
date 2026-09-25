import Header from "@/components/website/Header";
import PostCard from "@/components/website/PostCard";
import Footer from "@/components/website/Footer";

const posts = [
  {
    slug: "typography",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
    title: "Typography",
    date: "21 June 2020 08:04 AM",
    description:
      "Lid est laborum et dolorum fuga. Et harum quidem rerum facilis est et expeditasi distincti...",
    tags: ["typography"],
  },
  {
    slug: "getting-started-with-traveling-ultralight",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    title: "Getting Started with Traveling Ultralight",
    date: "23 April 2020 07:00 PM",
    description:
      "Start by getting a small backpack and then just travel with what fits in that.",
    tags: ["travel"],
  },
  {
    slug: "untitled",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
    title: "Untitled",
    date: "20 April 2020 06:30 PM",
    description:
      "Example of post without a title.",
    tags: ["lifestyle"],
  },
  {
    slug: "when-you-have-too-much-to-do",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
    title: "When You Have Too Much to Do",
    date: "3 March 2020 05:51 PM",
    description:
      "You have a to-do list that scrolls on for days. You are managing multiple projects, getting things done...",
    tags: ["lifestyle"],
  },
  {
    slug: "7-things-you-should-know-about-running-a-small-business",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80",
    title: "7 Things You Should Know About Running a Small Business",
    date: "23 February 2020 02:33 AM",
    description:
      "When you start your small business, you quickly become aware that there are many other...",
    tags: ["business"],
  },
  {
    slug: "stop-comparing-yourself-to-others",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80",
    title: "Stop Comparing Yourself to Others #SelfLove",
    date: "11 February 2020 05:30 PM",
    description:
      "Far quitting dwelling graceful the likewise received building. An fact so to that show am...",
    tags: ["self-love"],
  },
];

export default async function TagPage({ params }) {
  const { tag } = await params;

  const decodedTag = decodeURIComponent(tag).toLowerCase();

  const filteredPosts = posts.filter((post) =>
    post.tags.includes(decodedTag)
  );

  const tagName = decodedTag
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <a
            href="/tags"
            className="text-sm text-gray-500 hover:text-teal-700"
          >
            ← Back to Tag List
          </a>

          <h1 className="mt-5 text-3xl font-bold text-gray-800">
            {tagName}
          </h1>

          <p className="mt-2 text-gray-500">
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {filteredPosts.length > 0 ? (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </section>
        ) : (
          <div className="rounded-md bg-white py-20 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800">
              No posts found
            </h2>

            <p className="mt-2 text-gray-500">
              There are no posts with this tag.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}