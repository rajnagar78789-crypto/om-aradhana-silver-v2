import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const whatsappMessage = `Hello Om Aradhana Silver,

I am interested in the following product:

Product: ${product.name}
Category: ${product.category}

Please share wholesale price and catalogue.

Thank You.`;

  return (
    <div className="group overflow-hidden rounded-[28px] bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

      {/* Product Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden cursor-pointer">

          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 rounded-full bg-[#C9A227] px-4 py-2 text-sm font-semibold text-[#5A1020] shadow-lg">
            {product.category}
          </div>

        </div>
      </Link>

      {/* Content */}
      <div className="flex min-h-[250px] flex-col p-6">

        <h3 className="text-2xl font-bold text-[#5A1020]">
          {product.name}
        </h3>

        <p className="mt-3 text-base leading-7 text-gray-600">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {product.features.slice(0, 2).map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-[#f7f1e6] px-3 py-1 text-xs font-semibold text-[#5A1020]"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">

          <Link
            href={`/products/${product.slug}`}
            className="rounded-xl bg-[#5A1020] py-3 text-center font-semibold text-white transition duration-300 hover:bg-[#74192f]"
          >
            View Details
          </Link>

          <a
            href={`https://wa.me/918879528201?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#C9A227] py-3 text-center font-semibold text-[#5A1020] transition duration-300 hover:bg-[#d8b53a]"
          >
            WhatsApp
          </a>

        </div>

      </div>
    </div>
  );
}