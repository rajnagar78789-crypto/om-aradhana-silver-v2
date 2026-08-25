"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryVideoSlider({ collectionSlug }: { collectionSlug: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter') || 'All';
  
  const [isHovered, setIsHovered] = useState(false);

  const categoryVideoData: Record<string, { title: string; value: string; videoUrl: string }[]> = {
    "92-5-antique-jewellery": [
      { title: "Payal", value: "payal", videoUrl: "/category-videos/antique/payal1.mp4" },
      { title: "Leg Kada", value: "leg-kada", videoUrl: "/category-videos/antique/leg-kada.mp4" },
      { title: "Bangles", value: "bangles", videoUrl: "/category-videos/antique/bangles1.mp4" },
      { title: "Rings", value: "rings", videoUrl: "/category-videos/antique/rings1.mp4" },
    ],
    "fusion-collection": [
      
      { title: "Payal", value: "payal", videoUrl: "/category-videos/fusion/payal.mp4" },
      { title: "Juda", value: "juda", videoUrl: "/category-videos/fusion/juda.mp4" },
      { title: "Rings", value: "rings", videoUrl: "/category-videos/fusion/rings.mp4" },
      { title: "Purse", value: "purse", videoUrl: "/category-videos/fusion/purse.mp4" },
    ],
    "sterling-silver": [
      { title: "Chains", value: "chain", videoUrl: "/category-videos/sterling/chains.mp4" },
      { title: "Turkey Chain", value: "turkey-chain", videoUrl: "/category-videos/sterling/turkey.mp4" },
      { title: "Bracelets", value: "bracelet", videoUrl: "/category-videos/sterling/bracelet.mp4" },
    ]
  };

  const currentCategories = categoryVideoData[collectionSlug] || [];

  const slide = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 420 : 260; 
      const multiplier = direction === "left" ? -1 : 1;
      scrollRef.current.scrollBy({ left: scrollAmount * multiplier, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isHovered || currentCategories.length === 0) return;
    const autoPlayInterval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          slide("right");
        }
      }
    }, 4000); 

    return () => clearInterval(autoPlayInterval);
  }, [isHovered, currentCategories.length]);

  // 👇 YAHAN HAI NAYA "SELF-TARGETING" SCROLL LOGIC
  const handleCardClick = (categoryValue: string) => {
    // 1. URL update karo (Sanity grid update karne ke liye)
    const newFilter = currentFilter === categoryValue ? 'All' : categoryValue;
    router.push(`${pathname}?filter=${newFilter}`, { scroll: false });

    // 2. Exact usi jagah scroll karo jahan Slider khatam aur Filter shuru hota hai
    setTimeout(() => {
      const targetMarker = document.getElementById("slider-bottom-marker");
      if (targetMarker) {
        // Marker ki absolute position nikali
        const targetPosition = targetMarker.getBoundingClientRect().top + window.scrollY;
        
        // Us position se 80px upar ruke taaki top navbar products ko hide na kare
        window.scrollTo({
          top: targetPosition - 80,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  if (currentCategories.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden bg-[#FAF7F2] py-12 sm:py-20 z-40">
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-6 sm:mb-10 flex justify-between items-center">
        <h2 className="font-serif text-2xl sm:text-4xl text-[#24050D] font-medium tracking-tight">
          Explore Categories
        </h2>
        <div className="hidden sm:flex gap-4">
          <button onClick={() => slide("left")} className="p-3 rounded-full border border-[#C9A227] text-[#24050D] hover:bg-[#C9A227] hover:text-white transition-all">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => slide("right")} className="p-3 rounded-full border border-[#C9A227] text-[#24050D] hover:bg-[#C9A227] hover:text-white transition-all">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 sm:gap-10 overflow-x-auto px-4 sm:px-8 pb-10 no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {currentCategories.map((cat, index) => {
          const isSelected = currentFilter === cat.value;

          return (
            <div 
              key={index} 
              className="flex-none snap-center cursor-pointer group"
              onClick={() => handleCardClick(cat.value)}
            >
              <div 
                className={`relative w-[260px] h-[340px] sm:w-[400px] sm:h-[500px] bg-[#1a0309] rounded-2xl overflow-hidden transition-all duration-500 ${
                  isSelected 
                    ? "ring-4 ring-[#C9A227] ring-offset-4 ring-offset-[#FAF7F2] shadow-2xl scale-[1.02]" 
                    : "shadow-lg hover:shadow-2xl hover:-translate-y-2"
                }`}
              >
                <video
  src={cat.videoUrl}
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  disablePictureInPicture
  className="absolute inset-0 w-full h-full object-cover pointer-events-none bg-[#1a0309]"
  style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
/>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>

                <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center px-4 pointer-events-none">
                  <h3 className={`font-serif text-xl sm:text-3xl tracking-wide drop-shadow-md transition-colors ${
                    isSelected ? "text-[#C9A227] font-bold" : "text-white font-medium group-hover:text-[#C9A227]"
                  }`}>
                    {cat.title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 👇 YEH HAI WOH INVISIBLE MARKER JO TERE SCREEN KO EXACTLY YAHAN ROKEGA */}
      <div id="slider-bottom-marker" className="absolute bottom-0 left-0 w-full h-[1px] pointer-events-none"></div>

    </div>
  );
}