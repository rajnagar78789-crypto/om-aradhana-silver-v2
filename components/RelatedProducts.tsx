import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type Props = {
  products: Product[];
};

export default function RelatedProducts({ products }: Props) {
  return (
    <section className="pt-20 pb-24">

      <div className="mb-12">

        <h2 className="text-4xl font-bold text-[#5A1020]">
          Related Products
        </h2>

        <p className="mt-3 text-gray-600">
          Explore more premium silver collections from Om Aradhana Silver.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {products.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.slug}`}
            className="group overflow-hidden rounded-[30px] border border-[#eadfcb] bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A227] hover:shadow-2xl"
          >

            <div className="relative aspect-square overflow-hidden">

              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            </div>

            <div className="p-6">

              <span className="inline-flex rounded-full bg-[#C9A227]/20 px-3 py-1 text-xs font-semibold text-[#5A1020]">
                {item.category}
              </span>

              <h3 className="mt-4 text-2xl font-bold text-[#5A1020]">
                {item.name}
              </h3>

              <p className="mt-3 line-clamp-2 text-gray-600">
                {item.shortDescription}
              </p>

              <div className="mt-6 flex items-center justify-between">

                <span className="font-semibold text-[#5A1020] transition group-hover:text-[#74192f]">
                  View Details
                </span>

                <span className="text-2xl text-[#C9A227] transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>

              </div>

            </div>

          </Link>
        ))}

      </div>

    </section>
  );
}