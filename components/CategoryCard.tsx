import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/data/categories";

type Props = {
  category: Category;
};

export default function CategoryCard({ category }: Props) {
  return (
    <Link
      href="#"
      className="group block overflow-hidden rounded-[30px] border border-[#eadfcb] bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-[#C9A227] hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden">

        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,25vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Premium Badge */}
        <div className="absolute left-5 top-5 rounded-full bg-[#C9A227] px-4 py-2 text-sm font-bold text-[#5A1020] shadow-lg">
          Premium Collection
        </div>

        {/* Category */}
        <div className="absolute bottom-6 left-6 right-6">

          <h3 className="text-3xl font-bold text-white">
            {category.title}
          </h3>

        </div>

      </div>

      {/* Content */}

      <div className="p-7">

        <p className="leading-7 text-gray-600">
          Premium quality silver collection crafted especially for retail
          jewellery showrooms across India.
        </p>

        <div className="mt-8 flex items-center justify-between">

          <span className="font-semibold text-[#5A1020] transition group-hover:text-[#74192f]">
            Explore Collection
          </span>

          <span className="text-2xl text-[#C9A227] transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>

        </div>

      </div>

    </Link>
  );
}