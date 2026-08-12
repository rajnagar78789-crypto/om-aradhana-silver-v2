import Image from "next/image";
import Link from "next/link";
import type { SubCollection } from "@/data/subCollections";

type Props = {
  collectionSlug: string;
  item: SubCollection;
};

export default function SubCollectionCard({
  collectionSlug,
  item,
}: Props) {
  return (
    <Link
      href={`/collections/${collectionSlug}/${item.slug}`}
      className="group block w-full h-full"
    >
      {/* Main Luxury Card Container */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-[#E6DEC9] transition-all duration-500 hover:border-[#C9A227]/60 hover:shadow-[0_20px_40px_rgba(36,5,13,0.08)] hover:-translate-y-1">
        
        {/* Image Section (Mobile ke liye relative container height fix ki hai) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF7F2]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          
          {/* Subtle Dark Gradient overlay on hover for premium feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#24050D]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* Text Content Section (Mobile par padding compact ki hai) */}
        <div className="flex flex-grow flex-col justify-between p-4 sm:p-6 lg:p-8">
          <div>
            <h3 className="font-serif text-lg sm:text-2xl font-normal text-[#24050D] transition-colors duration-300 group-hover:text-[#A4821E] line-clamp-1">
              {item.title}
            </h3>
          </div>
          
          {/* Bottom Action Area (with Round Floating Arrow) */}
          <div className="mt-4 sm:mt-8 flex items-center justify-between border-t border-[#E6DEC9]/50 pt-3 sm:pt-5">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#24050D] transition-colors duration-300 group-hover:text-[#A4821E]">
              Explore
            </span>
            
            {/* Round Arrow Button */}
            <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[#E6DEC9] bg-[#FAF7F2] text-[#24050D] transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#C9A227] group-hover:bg-[#C9A227] group-hover:text-white group-hover:shadow-[0_0_10px_rgba(201,162,39,0.4)]">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
} 