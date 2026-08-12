import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const primaryImage = product.images[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block w-[340px] overflow-hidden rounded-[34px] shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#FBF8F3] to-[#F2EBDF]">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          className="object-contain p-6 object-center transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:brightness-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-6 bg-white">
        <p className="text-sm font-semibold tracking-wide text-[#C9A227]">
          {product.tags[0]}
        </p>

        <h3 className="mt-2 text-xl font-bold leading-tight text-[#5A1020] line-clamp-1">
          {product.name}
        </h3>

        <p className="mt-3 text-sm text-gray-600">
          {product.material} • {product.finish}
        </p>

        {/* BOTTOM SECTION: Only Explore Button */}
        <div className="mt-5 border-t border-[#E8DCC3] pt-4 flex justify-end">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#5A1020] transition-all duration-300 group-hover:text-[#C9A227]">
            <span>Explore</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}