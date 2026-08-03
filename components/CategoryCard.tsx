import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/data/categories";
import { ArrowRight } from "lucide-react";

type Props = {
  category: Category;
};

export default function CategoryCard({ category }: Props) {
  return (
    <Link
      href={`/collections/${category.slug}`}
className="group relative block overflow-hidden rounded-[34px] border border-[#E8DCC3] bg-white transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-3 hover:border-[#C9A227] hover:shadow-[0_28px_70px_rgba(90,16,32,0.18)]"    >
      {/* Image */}
      <div className="relative h-[390px] overflow-hidden rounded-t-[34px]">

        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,25vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:brightness-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
        {/* Luxury Shine */}
<div className="absolute inset-0 overflow-hidden">

  <div className="absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-white/10 blur-xl transition-transform duration-1000 group-hover:translate-x-[450%]" />

</div>


        {/* Category */}
        <div className="absolute bottom-8 left-6 right-6">

          <h3 className="flex min-h-[96px] items-end text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white drop-shadow-lg">
            {category.title}
          </h3>

        </div>

      </div>

      {/* Content */}

      <div className="flex flex-1 flex-col p-7">

        <p className="mt-3 min-h-[48px] text-center text-[15px] leading-6 text-[#666666]">
  {category.description}
</p>

      

  <div className="mt-5 border-t border-[#F3E7D3] pt-5">

  <div className="flex w-full items-center justify-center gap-3 text-[13px] font-bold tracking-[0.08em] uppercase text-[#4A0D1F] transition-all duration-300 group-hover:text-[#C9A227]">

    <span>Explore Designs</span>

    <ArrowRight
      size={18}
      className="transition-transform duration-300 group-hover:translate-x-1"
    />

  </div>

</div>
</div>
    

    </Link>
  );
}