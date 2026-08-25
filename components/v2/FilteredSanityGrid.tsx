"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FilteredSanityGrid({ items, activeCategory = "All" }: { items: any[], activeCategory?: string }) {
  
  // 'Necklace Set' ko block kiya
  const safeItems = items.filter((item) => {
    if (!item.subCategory) return true;
    const catName = item.subCategory.toLowerCase().replace(/-/g, " ");
    return catName !== "necklace set"; 
  });

  const [activeAudience, setActiveAudience] = useState("All"); 
  const [activeTab, setActiveTab] = useState(activeCategory);          
  const [weightFilter, setWeightFilter] = useState("All Weights"); 

  const audienceFilteredItems = activeAudience === "All"
    ? safeItems
    : safeItems.filter((item) => {
        const aud = item.audience ? item.audience.toLowerCase() : "womens";
        if (aud === "unisex") return true; 
        return aud === activeAudience.toLowerCase();
      });

  // 👇 YAHAN JADOO HAI: "Juda", "juda", "Juda " sabko ek jaisa banake duplicate hata diya
  const availableCategories = Array.from(
    new Set(
      audienceFilteredItems
        .map((item) => item.subCategory ? item.subCategory.trim().toLowerCase() : "")
        .filter(Boolean)
    )
  );

  const categoryFilteredItems = activeTab.toLowerCase() === "all" 
    ? audienceFilteredItems 
    : audienceFilteredItems.filter((item) => {
        if (!item.subCategory) return false;
        const normalizedSanityCat = item.subCategory.toLowerCase().replace(/-/g, " ");
        const normalizedActiveTab = activeTab.toLowerCase().replace(/-/g, " ");
        return normalizedSanityCat === normalizedActiveTab;
      });

  const getMinWeight = (weightStr: string) => {
    if (!weightStr) return 0;
    const match = weightStr.match(/\d+/); 
    return match ? parseInt(match[0], 10) : 0;
  };

  const finalFilteredItems = categoryFilteredItems.filter((item) => {
    if (weightFilter === "All Weights") return true;
    
    const w = getMinWeight(item.weight);
    if (w === 0) return false; 
    
    if (weightFilter === "Under 20g") return w < 20;
    if (weightFilter === "20g - 40g") return w >= 20 && w <= 40;
    if (weightFilter === "40g - 60g") return w > 40 && w <= 60;
    if (weightFilter === "60g+") return w > 60;
    
    return true;
  });

  if (safeItems.length === 0) return null;

  return (
    <div className="space-y-8 sm:space-y-10">
      
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center bg-white border border-[#E6DEC9] p-1.5 rounded-full shadow-sm">
          {["All", "Womens", "Mens", "Kids"].map((aud) => (
            <button
              key={aud}
              onClick={() => {
                setActiveAudience(aud);
                setActiveTab("All"); 
                setWeightFilter("All Weights");
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

      <div className="relative z-20 flex flex-col items-center justify-center gap-5">
        
        {availableCategories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab("All")}
              className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                activeTab.toLowerCase() === "all" 
                  ? "bg-[#C9A227] text-[#24050D] shadow-[0_4px_20px_rgba(201,162,39,0.3)] scale-105" 
                  : "bg-white border border-[#E6DEC9] text-[#6B5B52] hover:border-[#C9A227] hover:text-[#C9A227]"
              }`}
            >
              All {activeAudience !== "All" ? activeAudience : "Designs"}
            </button>
            
            {availableCategories.map((cat: any) => {
              const normalizedCat = cat.toLowerCase().replace(/-/g, " ");
              const normalizedActiveTab = activeTab.toLowerCase().replace(/-/g, " ");
              const isActive = normalizedCat === normalizedActiveTab;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 capitalize ${
                    isActive 
                      ? "bg-[#C9A227] text-[#24050D] shadow-[0_4px_20px_rgba(201,162,39,0.3)] scale-105" 
                      : "bg-white border border-[#E6DEC9] text-[#6B5B52] hover:border-[#C9A227] hover:text-[#C9A227]"
                  }`}
                >
                  {cat.replace(/-/g, " ")}
                </button>
              );
            })}
          </div>
        )}

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
        {finalFilteredItems.length > 0 ? (
          finalFilteredItems.map((item: any) => (
            <Link 
              key={item._id} 
              href={`/products/${item._id}`}
              className="group relative rounded-2xl bg-gradient-to-b from-white to-[#FAF7F2] border border-[#E6DEC9] overflow-hidden shadow-[0_4px_15px_rgba(36,5,13,0.03)] hover:shadow-[0_15px_35px_rgba(201,162,39,0.15)] hover:border-[#C9A227]/60 transition-all duration-500 block"
            >
              <div className="relative w-full h-72 bg-[#FAF7F2] overflow-hidden">
                <Image
                  src={`${item.imageUrl}${item.imageUrl.includes('?') ? '&' : '?'}w=1000&q=100&auto=format&fm=webp&dpr=2&sharp=15`}
                  alt={item.title}
                  fill
                  quality={100}
                  unoptimized={true}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                
                <div className="absolute inset-0 bg-[#24050D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white/95 text-[#24050D] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                    View Details
                  </div>
                </div>
              </div>
              
              <div className="p-5 relative">
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent"></div>
                
                <div className="flex items-center justify-between mb-3.5 mt-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#24050D] bg-[#C9A227]/20 border border-[#C9A227]/30 px-2.5 py-1 rounded-md">
                    {item.code}
                  </span>
                  
                  {item.weight && (
                    <span className="text-[10px] font-semibold tracking-wide text-[#6B5B52] bg-white border border-[#E6DEC9] px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                      <span className="text-[#C9A227]">⚖️</span> {item.weight}
                    </span>
                  )}
                </div>
                
                <h3 className="font-serif text-lg font-medium text-[#24050D] line-clamp-1 group-hover:text-[#C9A227] transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-[#E6DEC9]">
             <span className="text-4xl mb-3">⚖️</span>
             <p className="text-[#24050D] font-serif text-xl">No products in this category</p>
             <p className="text-[#6B5B52] text-xs mt-2">Try selecting a different category or audience.</p>
          </div>
        )}
      </div>
      
    </div>
  );
}