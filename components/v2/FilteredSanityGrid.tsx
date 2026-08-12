"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FilteredSanityGrid({ items }: { items: any[] }) {
  const [activeTab, setActiveTab] = useState("All");

  // Sanity items me se automatically check karega ki kaun kaun si categories available hain
  const availableCategories = Array.from(
    new Set(items.map((item) => item.subCategory).filter(Boolean))
  );

  // Jo tab select kiya hai, sirf wahi products dikhayega
  const filteredItems = activeTab === "All" 
    ? items 
    : items.filter((item) => item.subCategory === activeTab);

  if (items.length === 0) return null;

  return (
    <div className="space-y-8 sm:space-y-10">
      
      {/* Category Filter Tabs (Golden Buttons) */}
      {availableCategories.length > 0 && (
        <div className="relative z-20 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab("All")}
            className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
              activeTab === "All" 
                ? "bg-[#C9A227] text-[#24050D] shadow-[0_4px_20px_rgba(201,162,39,0.3)] scale-105" 
                : "bg-white border border-[#E6DEC9] text-[#6B5B52] hover:border-[#C9A227] hover:text-[#C9A227]"
            }`}
          >
            All Designs
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {filteredItems.map((item: any) => (
          <Link 
            key={item._id} 
            href={`/products/${item._id}`}
            className="group rounded-2xl bg-white border border-[#E6DEC9] overflow-hidden shadow-[0_10px_30px_rgba(36,5,13,0.04)] hover:shadow-xl transition-all duration-300 block"
          >
            {item.imageUrl ? (
              <div className="relative w-full h-72 bg-[#FAF7F2] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
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