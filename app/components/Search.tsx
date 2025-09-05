"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.trim().length > 0) {
        const res = await fetch(`/api/products/search?q=${query}`);
        const data = await res.json();
        setResults(data);
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 z-50">
      <input
        className="w-full border-b border-black bg-white px-4 py-3 text-base sm:text-lg md:text-xl tracking-wide placeholder-gray-400 focus:outline-none focus:border-black"
        type="text"
        placeholder="What are you looking for?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md border border-gray-200 max-h-96 overflow-y-auto">
          {results.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition"
            >
              <Link
                href={`/product/${p.id}`}
                className="flex w-full items-center gap-4 px-4 py-3 no-underline text-inherit hover:bg-gray-50 transition"
                onClick={() => {
                  setQuery("");
                  setResults([]);
                }}
              >
                <img
                  src={p.imageUrl || "/placeholder.png"}
                  alt={p.name}
                  className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-md flex-shrink-0"
                />

                <div className="flex flex-col min-w-0">
                  <span className="text-sm sm:text-base md:text-lg font-semibold tracking-wide text-gray-900 truncate">
                    {p.name}
                  </span>
                  <span className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 truncate">
                    {p.category?.name}
                  </span>
                  <span className="mt-1 text-sm sm:text-base font-medium text-gray-800">
                    ${p.variants?.[0]?.price ?? "—"}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
