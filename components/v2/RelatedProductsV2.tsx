"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type Props = {
  products: Product[];
};

export default function RelatedProductsV2({ products }: Props) {
  if (!products.length) return null;

  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A227]">
          Explore More
        </p>
        <h2 className="mt-1 text-2xl font-black text-[#5A1020] sm:text-3xl lg:text-4xl">
          Related Products
        </h2>
        <p className="mt-2 text-sm text-[#7A6B58]">
          Discover more handcrafted wholesale silver items from this collection.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => {
          const img = item.images?.[0]?.url || "/placeholder.jpg";
          return (
            <Link
              key={item.sku}
              href={`/products/${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-[24px] border border-[#E8DCC3] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(90,16,32,0.12)]"
            >
              {/* Product Image Box */}
              <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-[#FFFDF9] to-[#F1E8DA]">
                <span className="absolute left-4 top-4 z-10 rounded-full bg-[#5A1020] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Wholesale
                </span>
                <Image
                  src={img}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Card Content */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-lg font-bold text-[#5A1020] transition-colors group-hover:text-[#C9A227]">
                    {item.name}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-xs text-[#7A6B58]">
                    {item.material} • {item.finish}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#F2E8D8] pt-3 text-xs font-bold text-[#5A1020]">
                  <span>View Details</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}