import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/data/products";

type Props = {
  products: Product[];
};

export default function RelatedProducts({ products }: Props) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-[#eadfcb] py-12 sm:py-16 lg:py-20">

      {/* Section Header */}
      <div className="mb-7 sm:mb-9">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A227] sm:text-xs">
          Discover More
        </span>

        <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#5A1020] sm:text-3xl lg:text-4xl">
          Related Products
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
          Explore more premium silver designs from the same collection.
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">

        {products.map((item) => {
          const image = item.images[0];
          const firstVariant = item.variants[0];

          const weightText =
            firstVariant?.weightMin !== undefined &&
            firstVariant?.weightMax !== undefined
              ? `${firstVariant.weightMin}–${firstVariant.weightMax} g`
              : firstVariant?.weight !== undefined
              ? `${firstVariant.weight} g`
              : null;

          return (
            <Link
              key={item.sku}
              href={`/products/${item.slug}`}
              className="group w-full max-w-[390px] overflow-hidden rounded-2xl border border-[#eadfcb] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A227]/70 hover:shadow-[0_14px_35px_rgba(90,16,32,0.10)] sm:rounded-[22px]"
            >

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f8f5f0]">

                {image && (
                  <Image
                    src={image.url}
                    alt={image.alt || item.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 390px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                  />
                )}

                {/* Material */}
                <span className="absolute left-2 top-2 rounded-full border border-white/70 bg-white/90 px-2 py-1 text-[8px] font-bold text-[#5A1020] shadow-sm backdrop-blur sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px]">
                  {item.material}
                </span>

                {/* Label */}
                {item.labels[0] && (
                  <span className="absolute right-2 top-2 rounded-full bg-[#5A1020] px-2 py-1 text-[7px] font-bold uppercase tracking-wide text-white shadow-sm sm:right-3 sm:top-3 sm:px-2.5 sm:text-[9px]">
                    {item.labels[0]}
                  </span>
                )}

              </div>

              {/* Details */}
              <div className="p-3 sm:p-4">

                <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-gray-400 sm:text-[10px]">
                  {item.sku}
                </span>

                <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-[#5A1020] sm:text-lg">
                  {item.name}
                </h3>

                <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-gray-500 sm:mt-1.5 sm:text-xs sm:leading-5">
                  {item.shortDescription}
                </p>

                {/* Specs */}
                {(firstVariant?.height !== undefined || weightText) && (
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-[#eadfcb] pt-2.5 text-[9px] text-gray-500 sm:text-[11px]">

                    {firstVariant?.height !== undefined && (
                      <span>
                        <strong className="text-[#5A1020]">
                          Size:
                        </strong>{" "}
                        {firstVariant.height} Inch
                      </span>
                    )}

                    {weightText && (
                      <span>
                        <strong className="text-[#5A1020]">
                          Weight:
                        </strong>{" "}
                        {weightText}
                      </span>
                    )}

                  </div>
                )}

                {/* Action */}
                <div className="mt-3 flex items-center justify-between">

                  <span className="text-[10px] font-bold text-[#5A1020] sm:text-xs">
                    View Details
                  </span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5A1020] text-sm text-white transition-all duration-300 group-hover:bg-[#C9A227] group-hover:text-[#5A1020] sm:h-8 sm:w-8">
                    →
                  </span>

                </div>

              </div>

            </Link>
          );
        })}

      </div>

    </section>
  );
}