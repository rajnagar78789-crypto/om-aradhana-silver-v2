'use client' 

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  title: string;
  description: string;
  image: string;
  backUrl: string;
};

export default function LuxuryCollectionHero({
  title,
  description,
  image,
  backUrl,
}: Props) {
  
  const whatsappNumber = "918879528201";
  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in wholesale catalogue for ${title} collection.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="relative overflow-hidden bg-[#150d11] text-white min-h-[90vh] flex items-center">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 md:-left-52 top-10 md:top-20 h-[300px] md:h-[600px] w-[300px] md:w-[600px] rounded-full bg-[#d4af37]/10 blur-[100px] md:blur-[150px]" />
        <div className="absolute right-[-50px] md:right-[-100px] top-10 h-[300px] md:h-[500px] w-[300px] md:w-[500px] rounded-full bg-[#d4af37]/10 blur-[100px] md:blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#150d11_100%)] opacity-80" />
      </div>

      {/* MAIN CONTAINER - 🔥 Added proper mobile padding (px-5) */}
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-10 md:gap-12 px-5 pt-20 pb-16 lg:grid-cols-2 md:px-14 md:pt-24 md:pb-24">
        
        {/* LEFT CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full"
        >
          <Link
            href={backUrl}
            className="group inline-flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-light uppercase tracking-widest text-[#d4af37]/70 transition-colors hover:text-[#d4af37]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> 
            Back to Collection
          </Link>

          {/* 🔥 Mobile par text size 5xl, Desktop par 8xl */}
          <h1 className="mt-6 md:mt-8 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.1] tracking-tight text-white drop-shadow-[0_10px_30px_rgba(212,175,55,0.15)]">
            {title}
          </h1>

          <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4">
            <div className="h-[2px] w-12 md:w-16 bg-[#d4af37]" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold text-[#d4af37]">Masterpiece</span>
          </div>

          <p className="mt-6 md:mt-8 max-w-xl text-base md:text-lg lg:text-xl font-light leading-relaxed text-[#e5e5e5]/80 pr-2">
            {description}
          </p>

          {/* 🔥 Mobile par padding kam ki hai (p-4 instead of p-6) */}
          <div className="mt-8 md:mt-12 grid grid-cols-3 gap-1 md:gap-2 rounded-2xl border border-[#d4af37]/20 bg-black/40 p-4 md:p-6 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
            <div className="text-center">
              <p className="text-lg md:text-2xl text-[#d4af37]">✦</p>
              <p className="mt-2 md:mt-3 text-[8px] md:text-[10px] lg:text-xs font-semibold uppercase tracking-wider text-gray-300">
                100%<br />Hallmarked
              </p>
            </div>

            <div className="border-x border-[#d4af37]/20 text-center">
              <p className="text-lg md:text-2xl text-[#d4af37]">◈</p>
              <p className="mt-2 md:mt-3 text-[8px] md:text-[10px] lg:text-xs font-semibold uppercase tracking-wider text-gray-300">
                Premium<br />Finishing
              </p>
            </div>

            <div className="text-center">
              <p className="text-lg md:text-2xl text-[#d4af37]">✤</p>
              <p className="mt-2 md:mt-3 text-[8px] md:text-[10px] lg:text-xs font-semibold uppercase tracking-wider text-gray-300">
                Expert<br />Artisans
              </p>
            </div>
          </div>

          {/* 🔥 Mobile par button full width (w-full) aur center aligned hoga */}
          <div className="pt-2 mt-8 md:mt-8 w-full">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full md:w-max items-center justify-between gap-4 md:gap-6 rounded-full border border-[#d4af37] bg-transparent px-6 md:px-8 py-3 md:py-4 transition-all duration-500 hover:bg-[#d4af37] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]"
            >
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] transition-colors duration-500 group-hover:text-black">
                Enquire on WhatsApp
              </span>
              
              <span className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#d4af37] text-black transition-all duration-500 group-hover:bg-black group-hover:text-[#d4af37] shrink-0">
                <svg className="h-4 w-4 md:h-5 md:w-5 translate-x-0 transition-transform duration-500 group-hover:translate-x-1 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
              </span>
            </a>
          </div>
        </motion.div>

        {/* RIGHT IMAGE - Mobile height fixed */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center items-center mt-6 md:mt-10 lg:mt-0"
        >
          <div className="absolute h-[300px] md:h-[500px] w-[300px] md:w-[500px] rounded-full bg-[#d4af37]/15 blur-[80px] md:blur-[120px]" />

          {/* 🔥 Mobile par image height kam ki hai (h-[350px]) */}
          <div 
            className="relative h-[350px] sm:h-[450px] lg:h-[650px] w-full max-w-lg"
            style={{ 
              WebkitMaskImage: "radial-gradient(ellipse at center, black 55%, transparent 85%)", 
              maskImage: "radial-gradient(ellipse at center, black 55%, transparent 85%)" 
            }}
          >
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-contain"
            />
          </div>
          
          <div className="absolute -bottom-2 md:-bottom-5 left-1/2 h-6 md:h-10 w-32 md:w-48 -translate-x-1/2 rounded-[100%] bg-white/20 blur-xl md:blur-2xl" />
        </motion.div>

      </div>
    </section>
  );
}