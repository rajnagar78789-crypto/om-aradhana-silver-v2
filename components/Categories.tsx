'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categoryCards = [
  { 
    id: 1, 
    title: "999 Idols", 
    subtitle: "Divine Purity", 
    image: "/images/products/idol.jpg",  
    link: "/collections/999-hollow-idols" 
  },
  { 
    id: 2, 
    title: "92.5 Antique Jewellery", 
    subtitle: "Heritage Crafted", 
    image: "/images/products/antique1.jpg", 
    link: "/collections/92-5-antique-jewellery" 
  },
  { 
    id: 3, 
    title: "92.5 Fusion Jewellery", 
    subtitle: "The Royal Blend", 
    image: "/images/products/fusion1.jpg", 
    link: "/collections/fusion-collection" 
  },
  { 
    id: 4, 
    title: "92.5 Sterling Silver", 
    subtitle: "Modern Elegance", 
    image: "/images/products/sterling1.jpg", 
    link: "/collections/sterling-silver" 
  }
];

export default function Categories() {
  return (
    <section className="relative py-24 px-4 md:px-12 lg:px-16 bg-[#150d11] border-t border-[#d4af37]/20">
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
          Curated Categories
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
          Explore Masterpiece Collections
        </h2>
        <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          
          {categoryCards.map((cat, index) => (
            <Link 
              key={cat.id} 
              href={cat.link} 
              className="block h-[450px] md:h-[500px] w-full"
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative w-full h-full rounded-3xl overflow-hidden group cursor-pointer border border-[#d4af37]/20 hover:border-[#d4af37] transition-all duration-500 shadow-2xl bg-[#1a1115]"
              >
                
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#150d11] via-black/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <div className="h-[2px] w-8 bg-[#d4af37] mb-4 transform origin-left transition-all duration-500 group-hover:w-16"></div>
                  
                  <h3 className="text-white text-2xl md:text-3xl font-serif mb-2 drop-shadow-xl tracking-wide leading-tight">
                    {cat.title}
                  </h3>
                  
                  <p className="text-[#d4af37] text-xs uppercase tracking-[0.2em] font-semibold mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {cat.subtitle}
                  </p>
                  
                  <span className="text-white text-xs uppercase tracking-wider flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Explore <span className="text-[#d4af37] text-lg leading-none">→</span>
                  </span>
                </div>

              </motion.div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}