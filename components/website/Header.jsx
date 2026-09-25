import { Suspense } from "react";
import SearchBox from "./SearchBox";

function SearchBoxFallback() {
  return (
    <input
      type="search"
      placeholder="Search here ..."
      className="w-80 rounded-md bg-gray-100 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400"
    />
  );
}

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <nav className="flex items-center gap-7">
          <a
            href="/"
            className="text-xl font-bold text-teal-700"
          >
            Vredeburg
          </a>

          <a
            href="/about"
            className="font-medium text-gray-700 hover:text-teal-700"
          >
            About
          </a>

          <a
            href="/tags"
            className="font-medium text-gray-700 hover:text-teal-700"
          >
            Tag List
          </a>

          <a
            href="#"
            className="font-medium text-gray-700 hover:text-teal-700"
          >
            GitHub
          </a>
        </nav>

        <div className="hidden sm:block">
          <Suspense fallback={<SearchBoxFallback />}>
            <SearchBox />
          </Suspense>
        </div>
      </div>
    </header>
  );
}