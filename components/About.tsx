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
            Legacy of Excellence
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight mb-8">
            Crafting Timeless Elegance in <span className="italic font-light text-[#d4af37]">Pure Silver</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed mb-6">
            At Om Aradhana Silver, we bridge traditional Indian craftsmanship with modern luxury standards. Every masterpiece is meticulously curated to meet the elite tastes of premium retail showrooms across the nation.
          </p>

          <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
            Our commitment to certified purity (999 & 92.5), transparent B2B relationships, and consistent high-volume supply makes us the most trusted wholesale partner for high-end jewellery counters.
          </p>
        </motion.div>

      </div>
    </section>
  );
}