"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion"; // 🔥 Smooth fade-in ke liye add kiya hai

import type {
  Product,
  ProductVariant,
} from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants[0] ?? null
  );

  const getWeight = (variant: ProductVariant | null) => {
    if (!variant) return "Contact for details";
    if (variant.weightMin !== undefined && variant.weightMax !== undefined) {
      return `${variant.weightMin}–${variant.weightMax} g`;
    }
    if (variant.weight !== undefined) {
      return `${variant.weight} g`;
    }
    return "Contact for details";
  };

  const whatsappMessage = `
Hello Om Aradhana Silver,

I am interested in:
Product: ${product.name}
Model No.: ${product.sku}
Weight: ${getWeight(selectedVariant)}

Please share wholesale price and more details.
Thank you.
`;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full text-white" // 🔥 Text ko white kar diya
    >

      {/* Breadcrumb - Sleek look */}
      <div className="flex items-center gap-2 text-xs font-light uppercase tracking-widest text-gray-500">
        <Link href="/" className="transition hover:text-[#d4af37]">Home</Link>
        <span className="text-[#d4af37]/50">/</span>
        <span>Products</span>
        <span className="text-[#d4af37]/50">/</span>
        <span className="font-semibold text-[#d4af37]">{product.name}</span>
      </div>

      {/* Wholesale Badge - Minimalist Gold Border */}
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
        Wholesale Only
      </div>

      {/* Title - Royal Serif */}
      <h1 className="mt-6 font-serif text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight drop-shadow-xl text-white">
        {product.name}
      </h1>

      {/* Short Info */}
      <p className="mt-6 text-base md:text-lg font-light leading-relaxed text-[#e5e5e5]/70 max-w-xl">
        {product.shortDescription}
      </p>

      {/* Product Identity (Grid) */}
      <div className="mt-10 grid grid-cols-2 border-y border-[#d4af37]/20">
        <div className="py-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">Product Code</p>
          <p className="mt-2 text-xl font-medium tracking-wide text-white">{product.sku}</p>
        </div>
        <div className="border-l border-[#d4af37]/20 py-6 pl-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">Material</p>
          <p className="mt-2 text-xl font-medium tracking-wide text-white">{product.material}</p>
        </div>
      </div>

      {/* Size Selector */}
      {product.variants.length > 0 && (
        <div className="mt-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] mb-4">Select Variant</p>
          
          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => {
              const active = selectedVariant?.sku === variant.sku;
              return (
                <button
                  key={variant.sku}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`rounded-full border px-8 py-3 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "border-[#d4af37] bg-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]" // VIP Active State
                      : "border-[#d4af37]/30 bg-transparent text-gray-300 hover:border-[#d4af37] hover:text-white"
                  }`}
                >
                  {variant.height ? `${variant.height} Inch` : variant.sku}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Variant Details - Dark Premium Glassmorphism */}
      {selectedVariant && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-black/30 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
          <div className="grid grid-cols-2">
            <div className="px-6 py-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">Approx Weight</p>
              <p className="mt-2 text-2xl font-serif text-white">{getWeight(selectedVariant)}</p>
            </div>
            <div className="border-l border-[#d4af37]/20 px-6 py-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">Availability</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${product.status === "Active" ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500"}`} />
                <span className="text-xl font-serif text-white">
                  {product.status === "Active" ? "In Stock" : "Unavailable"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wholesale Benefits - Clean & Subtle */}
      <div className="mt-8 grid grid-cols-3 rounded-xl border border-[#d4af37]/20 bg-[#150d11]">
        <div className="px-2 py-4 text-center text-xs font-light uppercase tracking-wider text-gray-300">
          <span className="text-[#d4af37] mr-1">✦</span> Wholesale Only
        </div>
        <div className="border-x border-[#d4af37]/20 px-2 py-4 text-center text-xs font-light uppercase tracking-wider text-gray-300">
          <span className="text-[#d4af37] mr-1">✦</span> GST Billing
        </div>
        <div className="px-2 py-4 text-center text-xs font-light uppercase tracking-wider text-gray-300">
          <span className="text-[#d4af37] mr-1">✦</span> PAN India
        </div>
      </div>

      {/* VIP WhatsApp CTA (Ghost Button Style) */}
      <a
        href={`https://wa.me/918879528201?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 flex items-center justify-between rounded-2xl border border-[#d4af37] bg-[#d4af37]/5 px-8 py-5 text-white backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-[#d4af37] hover:text-black hover:shadow-[0_15px_40px_rgba(212,175,55,0.25)]"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-black/70 text-[#d4af37]">
            Direct Factory Outlet
          </p>
          <p className="mt-1 text-2xl font-serif tracking-wide">
            Enquire on WhatsApp
          </p>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/30 bg-transparent transition-all duration-500 group-hover:bg-black group-hover:text-[#d4af37]">
          <svg className="h-5 w-5 translate-x-0 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </a>

      {/* Back Button - Minimal */}
      <Link
        href={`/collections/${product.collectionId}/${product.subCollectionId}`}
        className="mt-6 flex w-full items-center justify-center rounded-xl border border-transparent py-4 text-xs uppercase tracking-widest text-gray-500 transition-all hover:border-[#d4af37]/30 hover:text-[#d4af37]"
      >
        ← Back to Collection
      </Link>
    </motion.div>
  );
}