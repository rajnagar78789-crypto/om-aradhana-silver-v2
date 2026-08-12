"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

import type { Product } from "@/data/products";

type Props = {
  product: Product | any;
};

export default function ProductGalleryV2({ product }: Props) {
  const { images, name } = product;
  const [selectedImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  if (!images?.length) {
    return null;
  }

  const activeImage = images[selectedImage];

  // Smart Extractor: Sanity (string) aur Local (object) dono ko perfectly handle karega
  const imageUrl = typeof activeImage === "string" 
    ? activeImage 
    : activeImage?.url || "";

  const imageAlt = typeof activeImage === "object" && activeImage?.alt 
    ? activeImage.alt 
    : name;

  if (!imageUrl) return null;

  return (
    <div className="w-full max-w-full">
      {/* Main Gallery Card (Strictly Image & Badge Only) */}
      <div className="relative overflow-hidden rounded-[32px] border border-[#E8DCC3] bg-white shadow-[0_25px_70px_rgba(90,16,32,0.08)]">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227]/10 blur-[100px]" />

        {/* Trusted Badge (Top-Left Corner) */}
        <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-[#C9A227]/40 bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#5A1020] shadow-md backdrop-blur-md sm:left-6 sm:top-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227] animate-pulse" />
          Trusted by 1100+ Showrooms
        </div>

        {/* Zoom Button (Top-Right Corner) */}
        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#E8DCC3] bg-white text-[#5A1020] shadow-md transition-all duration-300 hover:scale-105 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
          title="Click to Zoom"
        >
          <ZoomIn size={18} />
        </button>

        {/* Responsive Main Image Box */}
        <div 
          className="relative aspect-square w-full min-h-[380px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#F1E8DA] sm:min-h-[480px] lg:min-h-[520px] cursor-zoom-in flex items-center justify-center"
          onClick={() => setIsZoomOpen(true)}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-contain p-8 transition-all duration-700 hover:scale-[1.03] sm:p-12 lg:p-14"
          />

          {/* Bottom Gold Glow */}
          <div className="pointer-events-none absolute bottom-8 left-1/2 h-16 w-60 -translate-x-1/2 rounded-full bg-[#C9A227]/25 blur-2xl" />
        </div>
      </div>

      {/* Full-Screen Zoom Lightbox Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#120306]/95 p-4 backdrop-blur-xl">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            className="absolute right-6 top-6 z-[10000] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#C9A227] hover:text-[#24050D]"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Zoomed Image Container */}
          <div className="relative h-[90vh] w-[90vw] max-w-5xl flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}