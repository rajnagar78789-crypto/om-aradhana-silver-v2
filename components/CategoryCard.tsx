import Image from "next/image";
import type { Category } from "@/data/categories";

type Props = {
  category: Category;
};

export default function CategoryCard({ category }: Props) {
  return (
    <div className="group overflow-hidden rounded-[28px] bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

      {/* Image */}
      <div className="relative h-80 overflow-hidden">

        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Badge */}
        <div className="absolute left-5 top-5 rounded-full bg-[#C9A227] px-4 py-2 text-sm font-semibold text-[#5A1020] shadow-lg">
          Premium
        </div>

        {/* Title on Image */}
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-3xl font-bold text-white drop-shadow-lg">
            {category.title}
          </h3>
        </div>

      </div>

      {/* Content */}
      <div className="p-6">

        <p className="text-center text-gray-600 leading-7">
          Premium quality silver collection specially crafted for
          wholesalers, retailers and jewellery showrooms across India.
        </p>

        <button className="mt-6 w-full rounded-xl bg-[#5A1020] py-4 text-lg font-semibold text-white transition duration-300 hover:bg-[#74192f] hover:shadow-xl">
          Explore Collection
        </button>

      </div>

    </div>
  );
}