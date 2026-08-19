"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FilteredSanityGrid({ items }: { items: any[] }) {
  // 👑 3-TIER STATE SYSTEM (Naya Weight Filter add kiya)
  const [activeAudience, setActiveAudience] = useState("All"); // Tier 1: Men/Women/Kids
  const [activeTab, setActiveTab] = useState("All");           // Tier 2: Bangles/Kada
  const [weightFilter, setWeightFilter] = useState("All Weights"); // ⚖️ Tier 3: Weight Filter

  // 🧠 SMART FILTERING LOGIC
  
  // Step 1: Pehle Audience ke hisaab se filter karo
  const audienceFilteredItems = activeAudience === "All"
    ? items
    : items.filter((item) => {
        const aud = item.audience ? item.audience.toLowerCase() : "womens";
        if (aud === "unisex") return true; 
        return aud === activeAudience.toLowerCase();
      });

  // Step 2: Jo Audience select hui hai, SIRF USI ki sub-categories nikalo
  const availableCategories = Array.from(
    new Set(audienceFilteredItems.map((item) => item.subCategory).filter(Boolean))
  );

  // Step 3: SubCategory Filter
  const categoryFilteredItems = activeTab === "All" 
    ? audienceFilteredItems 
    : audienceFilteredItems.filter((item) => item.subCategory === activeTab);

  // ⚖️ Step 4: Weight Filter Logic (Smart Range Detector)
  const getMinWeight = (weightStr: string) => {
    if (!weightStr) return 0;
    const match = weightStr.match(/\d+/); // Text me se pehla number nikalega
    return match ? parseInt(match[0], 10) : 0;
  };

  const finalFilteredItems = categoryFilteredItems.filter((item) => {
    if (weightFilter === "All Weights") return true;
    
    const w = getMinWeight(item.weight);
    if (w === 0) return false; // Agar kisi me weight nahi dala hai to hide karega
    
    if (weightFilter === "Under 20g") return w < 20;
    if (weightFilter === "20g - 40g") return w >= 20 && w <= 40;
    if (weightFilter === "40g - 60g") return w > 40 && w <= 60;
    if (weightFilter === "60g+") return w > 60;
    
    return true;
  });

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
                setActiveTab("All"); 
                setWeightFilter("All Weights"); // Audience change pe baki sab reset hoga
              }}
              className={`px-6 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                activeAudience === aud
                  ? "bg-[#24050D] text-[#C9A227] shadow-md"
                  : "text-[#6B5B52] hover:text-[#24050D] bg-transparent"
              }`}
            >
              {aud}
            </button>
          ))}
        </div>
      </div>

      {/* ⚪ TIER 2 & 3: CATEGORY TABS & WEIGHT DROPDOWN */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-5">
        
        {/* Categories (Golden Buttons) */}
        {availableCategories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3">
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

        {/* ⚖️ TIER 3: WEIGHT FILTER DROPDOWN (Sleek B2B Design) */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#C9A227] uppercase tracking-wider bg-[#C9A227]/10 px-3 py-1.5 rounded-full">Filter by Weight:</span>
          <select
            value={weightFilter}
            onChange={(e) => setWeightFilter(e.target.value)}
            className="px-4 py-2 rounded-full border border-[#E6DEC9] text-[#24050D] bg-white text-[11px] font-bold uppercase tracking-[0.1em] focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] cursor-pointer shadow-sm transition-all"
          >
            <option value="All Weights">⚖️ All Weights</option>
            <option value="Under 20g">Under 20g</option>
            <option value="20g - 40g">20g - 40g</option>
            <option value="40g - 60g">40g - 60g</option>
            <option value="60g+">60g+</option>
          </select>
        </div>

      </div>

      {/* 🛍️ PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
        {finalFilteredItems.length > 0 ? (
          finalFilteredItems.map((item: any) => (
            <Link 
              key={item._id} 
              href={`/products/${item._id}`}
              className="group rounded-2xl bg-white border border-[#E6DEC9] overflow-hidden shadow-[0_10px_30px_rgba(36,5,13,0.04)] hover:shadow-xl transition-all duration-300 block"
            >
              {item.imageUrl ? (
                <div className="relative w-full h-72 bg-[#FAF7F2] overflow-hidden">
                  <Image
                    src={`${item.imageUrl}${item.imageUrl.includes('?') ? '&' : '?'}w=1200&q=100&auto=format`}
                    alt={item.title}
                    fill
                    unoptimized={true}
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
          ))
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-[#E6DEC9]">
             <span className="text-4xl mb-3">⚖️</span>
             <p className="text-[#24050D] font-serif text-xl">No products in this weight range</p>
             <p className="text-[#6B5B52] text-xs mt-2">Try selecting a different weight or category.</p>
          </div>
        )}
      </div>
      
    </div>
  );
}