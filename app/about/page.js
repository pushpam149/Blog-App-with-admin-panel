import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <article className="rounded-md bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">
            About Vredeburg
          </h1>

          <p className="mb-5 text-base leading-7 text-gray-600">
            Welcome to Vredeburg, a simple and clean blogging website
            where you can discover interesting articles and stories.
          </p>

          <p className="mb-5 text-base leading-7 text-gray-600">
            This website is designed to provide a simple reading
            experience with organized posts, categories and useful
            navigation.
          </p>

          <p className="text-base leading-7 text-gray-600">
            Explore our latest posts and find something interesting
            to read.
          </p>
        </article>
      </main>

      <Footer />
    </>
  );
}