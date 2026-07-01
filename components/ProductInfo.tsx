import Link from "next/link";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const whatsappMessage = `Hello Om Aradhana Silver,

I am interested in:

Product: ${product.name}
Category: ${product.category}

Please share wholesale price, catalogue and more details.

Thank you.`;

  return (
    <div className="flex flex-col justify-center">

      <span className="inline-flex w-fit rounded-full bg-[#C9A227]/20 px-4 py-2 text-sm font-semibold text-[#5A1020]">
        {product.category}
      </span>

      <h1 className="mt-6 text-5xl font-bold leading-tight text-[#5A1020]">
        {product.name}
      </h1>

      <p className="mt-6 text-lg leading-8 text-gray-600">
        {product.description}
      </p>

      <div className="mt-10">

        <h2 className="text-2xl font-bold text-[#5A1020]">
          Product Features
        </h2>

        <div className="mt-6 space-y-4">

          {product.features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-4 rounded-2xl border border-[#eadfcb] bg-white p-4 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A227] font-bold text-[#5A1020]">
                ✓
              </div>

              <span>{feature}</span>
            </div>
          ))}

        </div>

      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">

        <a
          href={`https://wa.me/918879528201?text=${encodeURIComponent(
            whatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-2xl bg-[#5A1020] px-8 py-4 text-center text-lg font-semibold text-white transition hover:bg-[#74192f]"
        >
          📲 Get Wholesale Price
        </a>

        <Link
          href="/"
          className="flex-1 rounded-2xl border-2 border-[#5A1020] px-8 py-4 text-center text-lg font-semibold text-[#5A1020] transition hover:bg-[#5A1020] hover:text-white"
        >
          ← Back to Collection
        </Link>

      </div>

    </div>
  );
}