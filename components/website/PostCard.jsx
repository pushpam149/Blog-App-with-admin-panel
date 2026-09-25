import Link from "next/link";

export default function PostCard({
  image,
  title,
  date,
  description,
  slug,
}) {
  return (
    <article className="overflow-hidden rounded-md bg-white shadow-md">
      
      {/* IMAGE */}
      <Link href={`/blog/${slug}`} className="block overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title || "Blog post"}
            className="h-54 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-54 w-full items-center justify-center bg-gray-200 text-xl text-gray-500">
            No Image
          </div>
        )}
      </Link>

      {/* CONTENT */}
      <div className="p-7">

        {/* TITLE */}
        {title && (
          <h2 className="mb-3 text-xl font-bold leading-7 text-gray-900 text-center">
            <Link
              href={`/blog/${slug}`}
              className="hover:text-teal-700"
            >
              {title}
            </Link>
          </h2>
        )}

        {/* DATE */}
        <p className="mb-3 text-base text-gray-500">
          {date}
        </p>

        {/* DESCRIPTION */}
        <p className="text-base leading-6 text-gray-800">
          {description}
        </p>

        {/* READ MORE */}
        <Link
          href={`/blog/${slug}`}
          className="mt-5 inline-block text-base font-semibold text-teal-700 hover:underline"
        >
          Read More →
        </Link>

      </div>
    </article>
  );
}