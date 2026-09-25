import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";

const tags = [
  {
    name: "Typography",
    count: 1,
  },
  {
    name: "Travel",
    count: 1,
  },
  {
    name: "Lifestyle",
    count: 2,
  },
  {
    name: "Business",
    count: 1,
  },
  {
    name: "Self Love",
    count: 1,
  },
];

export default function TagsPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Tag List
          </h1>

          <p className="mt-3 text-gray-500">
            Browse posts by their tags.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tags.map((tag) => (
            <a
              key={tag.name}
              href={`/tags/${tag.name
                .toLowerCase()
                .replaceAll(" ", "-")}`}
              className="rounded-md bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">
                  {tag.name}
                </h2>

                <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
                  {tag.count}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {tag.count === 1 ? "1 post" : `${tag.count} posts`}
              </p>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}