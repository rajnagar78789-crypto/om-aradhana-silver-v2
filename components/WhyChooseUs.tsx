'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 px-4 md:px-12 lg:px-16 bg-[#150d11] border-t border-[#d4af37]/20 overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Title & Description */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            {/* Trusted Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              Trusted Since 2020
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight mb-6">
              Trusted Wholesale Partner for <span className="text-[#d4af37] italic">Retail Jewellery</span> Showrooms
            </h2>

            <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-8">
              For over 5 years, Om Aradhana Silver has been helping retail jewellery showrooms across India with premium silver collections, reliable supply and long-term business partnerships built on trust and consistency.
            </p>

            {/* CTA Button */}
            <a 
              href="#contact"
              className="group inline-flex items-center gap-4 rounded-full border border-[#d4af37] bg-black/40 px-8 py-3.5 transition-all duration-500 hover:bg-[#d4af37] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] backdrop-blur-md cursor-pointer"
            >
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] transition-colors duration-500 group-hover:text-black">
                Get Wholesale Catalogue
              </span>
              <span className="transition-transform duration-500 group-hover:translate-x-1 text-[#d4af37] group-hover:text-black text-lg leading-none">
                →
              </span>
            </a>
          </motion.div>

          {/* Right Side: 4 VIP Stat Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-3xl border border-[#d4af37]/20 bg-black/40 backdrop-blur-md hover:border-[#d4af37] transition-all duration-500 shadow-xl group"
            >
              <h3 className="font-serif text-4xl md:text-5xl text-[#d4af37] mb-3 group-hover:scale-105 transform origin-left transition-transform duration-300">
                2100+
              </h3>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-2">
                Retail Showrooms
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Actively partnered across PAN India with consistent high-volume supply.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-3xl border border-[#d4af37]/20 bg-black/40 backdrop-blur-md hover:border-[#d4af37] transition-all duration-500 shadow-xl group"
            >
              <h3 className="font-serif text-4xl md:text-5xl text-[#d4af37] mb-3 group-hover:scale-105 transform origin-left transition-transform duration-300">
                200+
              </h3>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-2">
                Premium Designs
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Certified 999 & 92.5 silver masters crafted for elite counters.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-8 rounded-3xl border border-[#d4af37]/20 bg-black/40 backdrop-blur-md hover:border-[#d4af37] transition-all duration-500 shadow-xl group"
            >
              <h3 className="font-serif text-4xl md:text-5xl text-[#d4af37] mb-3 group-hover:scale-105 transform origin-left transition-transform duration-300">
                5+
              </h3>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-2">
                Years Experience
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Deep expertise and absolute transparency in B2B wholesale silver trade.
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-8 rounded-3xl border border-[#d4af37]/20 bg-black/40 backdrop-blur-md hover:border-[#d4af37] transition-all duration-500 shadow-xl group"
            >
              <h3 className="font-serif text-3xl md:text-4xl text-[#d4af37] mb-3 pt-2 group-hover:scale-105 transform origin-left transition-transform duration-300">
                PAN India
              </h3>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-2">
                Reliable Network
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Safe, secure, and insured express delivery straight to your store.
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}