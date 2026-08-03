"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { products } from "@/data/products";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const searchTerm = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!searchTerm) {
      return [];
    }

    return products.filter((product) => {
      if (product.status !== "Active") {
        return false;
      }

      const searchableText = [
        product.name,
        product.sku,
        product.material,
        product.finish,
        product.shortDescription,
        product.description,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }, [searchTerm]);

  return (
    <main className="min-h-screen bg-[#faf7f2]">

      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
            Om Aradhana Silver
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#5A1020] sm:text-4xl lg:text-5xl">
            Search Products
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            Search by product name, product code, material or design.
          </p>
        </div>

        {/* Search Input */}
        <div className="mx-auto mt-8 max-w-3xl sm:mt-10">

          <div className="flex items-center overflow-hidden rounded-2xl border border-[#dfd3c0] bg-white shadow-sm transition focus-within:border-[#C9A227] focus-within:shadow-md">

            <div className="pl-5 text-xl text-gray-400">
              ⌕
            </div>

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search LG001, Laxmi Ganesh, 999 Silver..."
              autoFocus
              className="w-full bg-transparent px-4 py-4 text-base text-[#5A1020] outline-none placeholder:text-gray-400 sm:py-5 sm:text-lg"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4eee5] text-sm font-bold text-gray-500 transition hover:bg-[#5A1020] hover:text-white"
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </div>

        </div>

        {/* Empty Initial State */}
        {!searchTerm && (
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[#eadfcb] bg-white p-8 text-center sm:p-10">

            <p className="text-sm font-semibold text-[#5A1020] sm:text-base">
              Find a silver design quickly
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Try searching for “LG001”, “Laxmi Ganesh” or “999 Silver”.
            </p>

          </div>
        )}

        {/* Result Count */}
        {searchTerm && (
          <div className="mt-10 flex items-center justify-between border-b border-[#eadfcb] pb-4">

            <div>
              <p className="text-sm text-gray-500">
                Search results for
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#5A1020]">
                “{query.trim()}”
              </h2>
            </div>

            <span className="rounded-full bg-[#5A1020] px-3 py-1.5 text-xs font-bold text-white">
              {results.length}{" "}
              {results.length === 1 ? "Product" : "Products"}
            </span>

          </div>
        )}

        {/* Results */}
        {searchTerm && results.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

            {results.map((product) => {
              const image = product.images[0];

              return (
                <Link
                  key={product.sku}
                  href={`/products/${product.slug}`}
                  className="group overflow-hidden rounded-2xl border border-[#eadfcb] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A227] hover:shadow-[0_15px_40px_rgba(90,16,32,0.10)]"
                >

                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-[#f8f5f0]">

                    {image && (
                      <Image
                        src={image.url}
                        alt={image.alt || product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    )}

                    <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[9px] font-bold text-[#5A1020] shadow-sm backdrop-blur sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
                      {product.material}
                    </span>

                  </div>

                  {/* Information */}
                  <div className="p-3 sm:p-4">

                    <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-400 sm:text-[10px]">
                      {product.sku}
                    </span>

                    <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-[#5A1020] sm:text-lg">
                      {product.name}
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-[10px] leading-4 text-gray-500 sm:text-xs sm:leading-5">
                      {product.shortDescription}
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-[#eadfcb] pt-3">

                      <span className="text-[10px] font-bold text-[#5A1020] sm:text-xs">
                        View Product
                      </span>

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5A1020] text-sm text-white transition group-hover:bg-[#C9A227] group-hover:text-[#5A1020]">
                        →
                      </span>

                    </div>

                  </div>

                </Link>
              );
            })}

          </div>
        )}

        {/* No Results */}
        {searchTerm && results.length === 0 && (
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-[#eadfcb] bg-white p-8 text-center sm:p-12">

            <div className="text-3xl">
              ⌕
            </div>

            <h2 className="mt-3 text-xl font-bold text-[#5A1020]">
              No Products Found
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Try another product name, product code or material.
            </p>

            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-5 rounded-xl bg-[#5A1020] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#74192f]"
            >
              Clear Search
            </button>

          </div>
        )}

      </section>

    </main>
  );
}