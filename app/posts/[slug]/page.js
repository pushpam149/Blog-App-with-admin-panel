const posts = {
  "typography": {
    title: "Typography",
    date: "21 June 2020 08:04 AM",
    description:
      "Lid est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    content:
      "Typography is an important part of a website. Good typography makes content easier to read and gives the website a clean and professional appearance.",
  },

  "getting-started-with-traveling-ultralight": {
    title: "Getting Started with Traveling Ultralight",
    date: "23 April 2020 07:00 PM",
    description:
      "Start by getting a small backpack and then just travel with what fits in that.",
    content:
      "Traveling ultralight means carrying only the things that you really need. A smaller backpack makes traveling easier, faster and more comfortable.",
  },

  "untitled": {
    title: "Untitled",
    date: "20 April 2020 06:30 PM",
    description: "Example of post without a title.",
    content:
      "This is an example post without a title. Content can be managed later from the admin panel.",
  },

  "when-you-have-too-much-to-do": {
    title: "When You Have Too Much to Do",
    date: "3 March 2020 05:51 PM",
    description:
      "You have a to-do list that scrolls on for days.",
    content:
      "When you have too many tasks, it is important to prioritize them and focus on one thing at a time.",
  },
};

export default async function PostPage({ params }) {
  const { slug } = await params;

  const post = posts[slug];

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-3xl font-bold">Post Not Found</h1>

        <a
          href="/"
          className="mt-6 inline-block text-teal-700 hover:underline"
        >
          ← Back to Home
        </a>
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <a
          href="/"
          className="mb-10 inline-block text-sm text-gray-500 hover:text-teal-700"
        >
          ← Back to posts
        </a>

        <article>
          <p className="mb-3 text-sm text-gray-500">
            {post.date}
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900">
            {post.title}
          </h1>

          <p className="mb-10 text-lg leading-8 text-gray-600">
            {post.description}
          </p>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-base leading-8 text-gray-700">
              {post.content}
            </p>
          </div>
        </article>
      </main>
    </>
  );
}