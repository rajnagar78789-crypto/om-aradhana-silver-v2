"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FilteredSanityGrid({ items }: { items: any[] }) {
  // 👑 NAYA: 2-Tier State System
  const [activeAudience, setActiveAudience] = useState("All"); // Tier 1: Men/Women/Kids
  const [activeTab, setActiveTab] = useState("All"); // Tier 2: Bangles/Kada etc.

  // 🧠 SMART FILTERING LOGIC
  
  // Step 1: Pehle Audience ke hisaab se filter karo
  const audienceFilteredItems = activeAudience === "All"
    ? items
    : items.filter((item) => {
        // Agar purane products mein audience nahi hai, toh unhe default 'womens' manega taaki gayab na ho
        const aud = item.audience ? item.audience.toLowerCase() : "womens";
        // Unisex products sabhi tabs (Men/Women/Kids) mein dikhenge!
        if (aud === "unisex") return true; 
        return aud === activeAudience.toLowerCase();
      });

  // Step 2: Jo Audience select hui hai, SIRF USI ki sub-categories nikal kar Tier-2 mein dikhao!
  const availableCategories = Array.from(
    new Set(audienceFilteredItems.map((item) => item.subCategory).filter(Boolean))
  );

  // Step 3: Final filter (Audience + SubCategory)
  const filteredItems = activeTab === "All" 
    ? audienceFilteredItems 
    : audienceFilteredItems.filter((item) => item.subCategory === activeTab);

  if (items.length === 0) return null;

  return (
    <div className="space-y-8 sm:space-y-10">
      
      {/* 👑 TIER 1: MASTER AUDIENCE SWITCH */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center bg-white border border-[#E6DEC9] p-1.5 rounded-full shadow-sm">
          {["All", "Womens", "Mens", "Kids"].map((aud) => (
            <button
              key={aud}
              onClick={() => {
                setActiveAudience(aud);
                setActiveTab("All"); // Jab bhi Men/Women change ho, sub-category reset ho jaye!
              }}
              className={`px-6 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                activeAudience === aud
                  ? "bg-[#24050D] text-[#C9A227] shadow-md" // Dark Maroon & Gold
                  : "text-[#6B5B52] hover:text-[#24050D] bg-transparent"
              }`}
            >
              {aud}
            </button>
          ))}
        </div>
      </div>

      {/* ⚪ TIER 2: CATEGORY FILTER TABS (Golden Buttons) */}
      {availableCategories.length > 0 && (
        <div className="relative z-20 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab("All")}
            className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
              activeTab === "All" 
                ? "bg-[#C9A227] text-[#24050D] shadow-[0_4px_20px_rgba(201,162,39,0.3)] scale-105" 
                : "bg-white border border-[#E6DEC9] text-[#6B5B52] hover:border-[#C9A227] hover:text-[#C9A227]"
            }`}
          >
            All {activeAudience !== "All" ? activeAudience : "Designs"}
          </button>
          
          {availableCategories.map((cat: any) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 capitalize ${
                activeTab === cat 
                  ? "bg-[#C9A227] text-[#24050D] shadow-[0_4px_20px_rgba(201,162,39,0.3)] scale-105" 
                  : "bg-white border border-[#E6DEC9] text-[#6B5B52] hover:border-[#C9A227] hover:text-[#C9A227]"
              }`}
            >
              {cat.replace(/-/g, " ")}
            </button>
          ))}
        </div>
      )}

      {/* 🛍️ PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
        {filteredItems.map((item: any) => (
          <Link 
            key={item._id} 
            href={`/products/${item._id}`}
            className="group rounded-2xl bg-white border border-[#E6DEC9] overflow-hidden shadow-[0_10px_30px_rgba(36,5,13,0.04)] hover:shadow-xl transition-all duration-300 block"
          >
            {item.imageUrl ? (
              <div className="relative w-full h-72 bg-[#FAF7F2] overflow-hidden">
                <Image
                  /* 👇 MOBILE ULTRA-HD FIX: Width 1200 aur Quality 100 👇 */
                  src={`${item.imageUrl}${item.imageUrl.includes('?') ? '&' : '?'}w=1200&q=100&auto=format`}
                  alt={item.title}
                  fill
                  unoptimized={true} /* Next.js Bypass */
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="w-full h-72 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                No Image Available
              </div>
            )}
            
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A227] bg-[#C9A227]/10 px-2.5 py-1 rounded-full">
                  Code: {item.code}
                </span>
                {item.weight && (
                  <span className="text-xs font-medium text-[#6B5B52]">
                    {item.weight}
                  </span>
                )}
              </div>
              
              <h3 className="font-serif text-lg font-medium text-[#24050D] line-clamp-1 group-hover:text-[#5A1020] transition-colors">
                {item.title}
              </h3>

              {item.description && (
                <p className="mt-2 text-xs font-light text-[#6B5B52] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
}