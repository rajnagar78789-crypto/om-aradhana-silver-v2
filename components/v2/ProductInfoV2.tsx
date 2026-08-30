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
    <div className="w-full space-y-8 rounded-3xl bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
      
      {/* Breadcrumb - Clean Light Theme */}
      <nav className="flex items-center gap-2 text-xs font-medium tracking-wide text-gray-400">
        <Link href="/" className="transition-colors hover:text-[#D4AF37]">Home</Link>
        <span>/</span>
        <Link href="/collections" className="transition-colors hover:text-[#D4AF37]">Collections</Link>
        <span>/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="space-y-4">
        {/* Trusted Badge - Soft Gold on White */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#FDFBF7] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8922B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          Trusted by 2000+ Retail Partners
        </div>
        
        {/* Title - Deep Charcoal (Very Premium) */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1A1A1A] leading-[1.1]">
          {product.name}
        </h1>

        {/* Minimal Tags - Soft backgrounds, elegant text */}
        <div className="flex flex-wrap gap-3 pt-2 text-[11px] font-semibold tracking-wide text-[#4A4A4A]">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-50 px-2.5 py-1.5 border border-gray-100">
            <span className="text-[#D4AF37] text-sm">✦</span> {purityBadgeText}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-50 px-2.5 py-1.5 border border-gray-100">
            <span className="text-[#D4AF37] text-sm">✦</span> 100% Hallmarked
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-50 px-2.5 py-1.5 border border-gray-100">
            <span className="text-[#D4AF37] text-sm">✦</span> Direct Manufacturer
          </span>
        </div>

        <p className="text-sm sm:text-base font-light leading-relaxed text-gray-500 max-w-2xl pt-2">
          {product.shortDescription || "Discover the finest craftsmanship with our exclusive pure silver collection, handcrafted for premium retail showrooms."}
        </p>
      </div>

      {/* Key Details Card - Pure White with very soft shadow */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <dl className="divide-y divide-gray-100">
          {keyDetails.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-3.5 text-sm">
              <dt className="font-semibold uppercase tracking-[0.15em] text-gray-400 text-[10px]">
                {label}
              </dt>
              <dd className="font-medium text-gray-800 capitalize">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ProductSpecsV2 product={product} />

      {/* B2B Requirement Selector - Light Theme Gold Highlight */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          Select Showroom Requirement:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {requirements.map((req) => (
            <button
              key={req}
              type="button"
              onClick={() => setSelectedRequirement(req)}
              className={`rounded-xl border px-5 py-4 text-xs font-semibold transition-all duration-300 text-left flex items-center justify-between ${
                selectedRequirement === req
                  ? "border-[#D4AF37] bg-[#FDFBF7] text-[#1A1A1A] shadow-[0_4px_15px_rgba(212,175,55,0.1)] scale-[1.01]"
                  : "border-gray-200 bg-white text-gray-500 hover:border-[#D4AF37]/50 hover:text-gray-800"
              }`}
            >
              <span>{req}</span>
              <span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${selectedRequirement === req ? "bg-[#D4AF37]" : "bg-transparent border border-gray-300"}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Benefits - Clean, Light Grey boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {benefits.map((benefit) => (
          <div
            key={benefit}
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5 text-xs font-medium tracking-wide text-gray-600"
          >
            <span className="flex h-5 w-5 items-center justify-center text-[#D4AF37]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      {/* WhatsApp CTA - Solid Premium Gold */}
      <div className="pt-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#DFBA4E] to-[#D4AF37] px-6 py-4.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] shadow-[0_8px_25px_rgba(212,175,55,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(212,175,55,0.4)]"
        >
          <svg className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
          </svg>
          <span className="py-1">Enquire on WhatsApp • {selectedRequirement}</span>
        </a>
      </div>
    </div>
  );
}