// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import ProductSpecsV2 from "./ProductSpecsV2";

type Props = {
  product: Product | any;
  whatsappNumber?: string;
};

export default function ProductInfoV2({
  product,
  whatsappNumber = "918879528201",
}: Props) {
  const [selectedRequirement, setSelectedRequirement] = useState("Showroom Stock (10+ Pcs)");
  const requirements = [
    "Sample Piece (1 Pc)",
    "Showroom Stock (10+ Pcs)",
    "Bulk Order (25+ Pcs)",
    "Custom / Multi-Store",
  ];

  const whatsappMessage = encodeURIComponent(
    `Hello, I am a showroom owner interested in wholesale inquiry for ${product.name} (Requirement Type: ${selectedRequirement}). Please share B2B pricing & catalogue.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // 🧠 SUPER SMART CHECKER: Check Category to define properties
  const cat = (product.collectionId || "").toLowerCase();
  
  let displayMaterial = product.material || "999 Pure Silver";
  let displayFinish = product.finish || "Antique Finish";
  let purityBadgeText = "999 Pure Silver";

  if (cat.includes("antique") || cat.includes("92")) {
    displayMaterial = "92.5 Silver";
    displayFinish = "Oxidized";
    purityBadgeText = "92.5 Silver";
  } else if (cat.includes("fusion")) {
    displayMaterial = "92.5 Silver with Stones/Kundan";
    displayFinish = "Dual Tone / Premium Polish";
    purityBadgeText = "92.5 Silver";
  } else if (cat.includes("sterling")) {
    displayMaterial = "92.5 Sterling Silver";
    displayFinish = "Rhodium / High Polish";
    purityBadgeText = "92.5 Silver";
  }

  const displayCategory = product.collectionId?.replace(/-/g, " ") || product.tags?.[0] || "Silver Collection";

  const keyDetails = [
    { label: "Material", value: displayMaterial },
    { label: "Finish", value: displayFinish },
    { label: "Category", value: displayCategory },
  ];

  const benefits = [
    "Wholesale Only Order",
    "100% GST Billing",
    "PAN India Supply",
    "Secure & Insured Packaging",
  ];

  return (
    <div className="w-full space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-light tracking-wide text-[#6B5B52]">
        <Link href="/" className="transition-colors hover:text-[#C9A227]">Home</Link>
        <span>/</span>
        <Link href="/collections" className="transition-colors hover:text-[#C9A227]">Collections</Link>
        <span>/</span>
        <span className="font-medium text-[#24050D]">{product.name}</span>
      </nav>

      {/* Title & Badge */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6D18] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227] animate-pulse" />
          Trusted by 2000+ RETAIL PARTNERS
        </div>
        
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#24050D] leading-[1.1]">
          {product.name}
        </h1>

        {/* Luxury Trust & Purity Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6DEC9] bg-[#FAF7F2] px-3 py-1 text-[11px] font-semibold text-[#5A1020]">
            <span className="text-[#C9A227]">✨</span> {purityBadgeText}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6DEC9] bg-[#FAF7F2] px-3 py-1 text-[11px] font-semibold text-[#5A1020]">
            <span className="text-[#C9A227]">🛡️</span> 100% Hallmarked
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6DEC9] bg-[#FAF7F2] px-3 py-1 text-[11px] font-semibold text-[#5A1020]">
            <span className="text-[#C9A227]">🏭</span> Direct Manufacturer
          </span>
        </div>

        <p className="text-sm sm:text-base font-light leading-relaxed text-[#6B5B52]">
          {product.shortDescription}
        </p>
      </div>

      {/* Key Details Card */}
      <div className="rounded-2xl border border-[#E6DEC9] bg-white p-6 shadow-[0_10px_30px_rgba(36,5,13,0.02)]">
        <dl className="divide-y divide-[#E6DEC9]/50">
          {keyDetails.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-3 text-sm">
              <dt className="font-bold uppercase tracking-[0.15em] text-[#A4821E] text-[10px]">
                {label}
              </dt>
              <dd className="font-medium text-[#24050D] capitalize">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Dynamic Specs */}
      <ProductSpecsV2 product={product} />

      {/* B2B Requirement Selector */}
      <div className="rounded-2xl border border-[#E6DEC9] bg-white p-6 shadow-[0_10px_30px_rgba(36,5,13,0.02)] space-y-3">
        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#A4821E]">
          Select Showroom Requirement Type:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {requirements.map((req) => (
            <button
              key={req}
              type="button"
              onClick={() => setSelectedRequirement(req)}
              className={`rounded-xl border py-3 px-4 text-xs font-bold transition-all duration-300 text-left flex items-center justify-between ${
                selectedRequirement === req
                  ? "border-[#C9A227] bg-[#5A1020] text-white shadow-[0_4px_15px_rgba(90,16,32,0.3)] scale-[1.01]"
                  : "border-[#E6DEC9] bg-[#FAF7F2] text-[#5A1020] hover:border-[#C9A227]/60"
              }`}
            >
              <span>{req}</span>
              <span className={`h-2 w-2 rounded-full ${selectedRequirement === req ? "bg-[#C9A227]" : "bg-[#E6DEC9]"}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="rounded-2xl border border-[#E6DEC9] bg-white p-6 shadow-[0_10px_30px_rgba(36,5,13,0.02)]">
        <h3 className="font-serif text-xl font-normal text-[#24050D]">Product Details</h3>
        <p className="mt-3 text-sm font-light leading-relaxed text-[#6B5B52]">
          {product.description}
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits.map((benefit) => (
          <div
            key={benefit}
            className="flex items-center gap-3 rounded-xl border border-[#E6DEC9] bg-white px-4 py-3 text-xs font-medium tracking-wide text-[#24050D] transition-colors hover:border-[#C9A227]/40"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FAF7F2] border border-[#C9A227]/30 text-[#C9A227]">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      {/* WhatsApp CTA */}
      <div className="pt-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#DFBA4E] to-[#C9A227] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#24050D] shadow-[0_0_25px_rgba(201,162,39,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(201,162,39,0.6)]"
        >
          <svg className="h-5 w-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
          </svg>
          <span>Get Showroom Price • {selectedRequirement}</span>
        </a>
      </div>
    </div>
  );
}