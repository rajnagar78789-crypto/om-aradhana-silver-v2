'use client'

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSlider({ sliderData }: any) {
  return (
    <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-[#150d11]">
      
      {/* BACKGROUND VIDEO */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/videos/hero-bg (3).mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#150d11]/90 via-black/50 to-[#150d11] pointer-events-none"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center pointer-events-none">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="flex flex-col items-center pointer-events-auto">
          
          {/* 🔥 NAYA VIP TRUST BADGE (Pill) YAHAN ADD KIYA HAI */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-black/40 px-4 py-1.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <span className="text-[#d4af37]">✦</span>
            Thousands of Shop Owners Trust Us
          </div>

          {/* Premium Silver Line */}
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="h-[1px] w-10 md:w-16 bg-[#d4af37]" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold text-[#d4af37]">
              Premium 999 & 92.5 Silver
            </span>
            <div className="h-[1px] w-10 md:w-16 bg-[#d4af37]" />
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] mb-4 md:mb-6 tracking-wide">
            OM ARADHANA
          </h1>
          
          <p className="max-w-2xl text-xs sm:text-sm md:text-base text-gray-300 font-light tracking-widest uppercase mb-10 drop-shadow-md">
            Masterpieces Handcrafted for Luxury Retail Showrooms
          </p>

          {/* BUTTON */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative z-50 group flex items-center justify-center gap-4 rounded-full border border-[#d4af37] bg-black/20 px-8 py-3.5 transition-all duration-500 hover:bg-[#d4af37] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] backdrop-blur-md cursor-pointer"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] transition-colors duration-500 group-hover:text-black">
              Explore Collections
            </span>
            <span className="transition-transform duration-500 group-hover:translate-y-1 group-hover:text-black text-[#d4af37] text-lg leading-none">
              ↓
            </span>
          </button>
          
        </motion.div>
      </div>
    </div>
  );
}