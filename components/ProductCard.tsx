import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-[30px] border border-[#eadfcb] bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-[#C9A227] hover:shadow-2xl"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <span className="absolute left-5 top-5 rounded-full bg-[#C9A227] px-4 py-2 text-sm font-bold text-[#5A1020] shadow-lg">
          {product.category}
        </span>

      </div>

      {/* Content */}

      <div className="p-7">

        <h3 className="text-2xl font-bold text-[#5A1020] transition group-hover:text-[#74192f]">
          {product.name}
        </h3>

        <p className="mt-4 line-clamp-2 leading-7 text-gray-600">
          {product.shortDescription}
        </p>

        <div className="mt-8 flex items-center justify-between">

          <span className="font-semibold text-[#5A1020] transition group-hover:text-[#74192f]">
            View Details
          </span>

          <span className="text-2xl text-[#C9A227] transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>

        </div>

      </div>
    </Link>
  );
}