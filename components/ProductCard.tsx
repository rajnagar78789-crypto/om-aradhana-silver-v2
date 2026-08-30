import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const primaryImage = product.images[0];
  
  // 🚀 SMART WEIGHT EXTRACTOR (Sanity ya Offline, dono se weight pakdega)
  const rawWeight = (product as any).weight || (product.variants && product.variants[0]?.weight);
  const finalWeight = rawWeight ? (String(rawWeight).toLowerCase().includes('g') ? rawWeight : `${rawWeight}g`) : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block w-full max-w-[340px] mx-auto overflow-hidden rounded-[34px] bg-[#1a1115] border border-[#d4af37]/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] hover:border-[#d4af37]/50"
    >
      <div className="relative aspect-square overflow-hidden bg-black/40">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1115] via-transparent to-transparent z-10 pointer-events-none opacity-80" />
        
        <Image
          src={primaryImage?.url || "/images/subcollections/ganesh-ka931-transparent.webp"}
          alt={primaryImage?.alt || "Om Aradhana VIP Idol"}
          fill
          className="object-contain p-2 object-center transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:brightness-110"
        />
      </div>

      <div className="p-6 bg-[#1a1115] relative z-20">
        
        {/* Category / Code Tag (Gold) */}
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
          {product.tags && product.tags[0]}
        </p>

        {/* Title (White & Serif) - EKDUM CLEAN, NO CUTS */}
        <h3 className="mt-3 text-2xl font-serif leading-tight text-white line-clamp-2 drop-shadow-md">
          {product.name}
        </h3>

        {/* 🔥 WEIGHT KA VIP SEPARATE SECTION 🔥 */}
        {finalWeight && (
          <div className="mt-4 inline-flex items-center rounded bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1.5 shadow-[0_0_10px_rgba(212,175,55,0.05)]">
            <span className="text-[11px] font-bold tracking-[0.15em] text-[#d4af37] uppercase">
              Weight: {finalWeight}
            </span>
          </div>
        )}

        {/* Material & Finish (Light Grey) */}
        <p className="mt-4 text-xs text-gray-400 font-light tracking-wide">
          {product.material} <span className="text-[#d4af37] mx-1">✦</span> {product.finish}
        </p>

        <div className="mt-6 border-t border-[#d4af37]/20 pt-4 flex justify-end">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] transition-all duration-300 group-hover:text-white">
            <span>Explore Masterpiece</span>
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              &rarr;
            </span>
          </div>
        </div>
        
      </div>
    </Link>
  );
}