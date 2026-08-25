'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-[#150d11] py-28 border-t border-[#d4af37]/25">
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 mx-auto max-w-[1000px] px-6 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            25 Years of Legacy
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight mb-8">
            Decades of Mastery. A New Era of <span className="italic font-light text-[#d4af37]">Pure Silver</span>
          </h2>

          {/* 1. History & Roots */}
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed mb-6">
            Om Aradhana Silver is proudly headquartered in Ahmedabad, the vibrant hub driving our nationwide marketing and operations. However, our foundation is built on 25 years of relentless hard work and deep market expertise in Mumbai’s iconic Zaveri Bazaar. With our main command center in Ahmedabad and a strong secondary firm in Mumbai, we bridge unparalleled craftsmanship with a dynamic business spirit.
          </p>

          {/* 2. Core Expertise */}
          <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed mb-8">
            As a leading B2B wholesaler, we don't just sell silver; we curate masterpieces. Our core expertise lies in crafting premium <strong className="text-gray-200 font-medium">999 Hollow Idols</strong> and intricately designed <strong className="text-gray-200 font-medium">92.5 Antique Jewellery</strong>. Whether through our massive ready-stock inventory or dedicated by-order manufacturing, we ensure every piece meets the elite tastes of retail showrooms.
          </p>

          {/* 3. The Trust Banner (USP) */}
          <div className="inline-flex flex-wrap justify-center items-center gap-3 sm:gap-6 pt-6 border-t border-[#d4af37]/20">
            <span className="text-[#d4af37] text-sm sm:text-base font-medium tracking-wide">
              100% Purity Guarantee
            </span>
            <span className="hidden sm:inline-block text-gray-600">•</span>
            <span className="text-gray-300 text-sm sm:text-base font-medium tracking-wide">
              2000+ Retail Partners
            </span>
            <span className="hidden sm:inline-block text-gray-600">•</span>
            <span className="text-gray-300 text-sm sm:text-base font-medium tracking-wide">
              Fast-Growing Supply Chain
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}