"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("q") || "";

  const handleChange = (e) => {
    const value = e.target.value;

    if (value.trim()) {
      router.push(`/?q=${encodeURIComponent(value)}`);
    } else {
      router.push("/");
    }
  };

  return (
    <input
      type="search"
      value={currentQuery}
      onChange={handleChange}
      placeholder="Search here ..."
      className="w-80 rounded-md bg-gray-100 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-200"
    />
  );
}