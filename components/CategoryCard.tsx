'use client' // 🔥 Framer Motion ke liye yeh zaroori hai

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/data/categories";

type Props = {
  category: Category;
};

export default function CategoryCard({ category }: Props) {
  // 🔥 YAHAN TERA ASLI LINK HAI: /collections/slug
  return (
    <Link href={`/collections/${category.slug}`} className="block w-full h-full">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        // 🔥 PURANA SAFED CARD GAYAB, NAYA LUREX/DARK ROUNDED BOX AA GAYA
        className="relative w-full h-[60vh] md:h-[70vh] rounded-2xl md:rounded-[2rem] overflow-hidden group cursor-pointer border border-[#d4af37]/20 hover:border-[#d4af37] transition-all duration-500 shadow-2xl"
      >
        
        {/* 🔥 TERA DESI JUGAD: CINEMATIC PHOTO ZOOM (Ken Burns Effect) */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* DARK OVERLAY (Text ko chamkane ke liye) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#150d11] via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>

        {/* TEXT BOX */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 lg:p-8">
          
          {/* Golden Line */}
          <div className="h-[2px] w-8 bg-[#d4af37] mb-3 transform origin-left transition-all duration-500 group-hover:w-16"></div>
          
          {/* Main Title */}
          <h3 className="text-white text-2xl md:text-3xl lg:text-3xl font-serif mb-2 drop-shadow-xl tracking-wide leading-tight">
            {category.title}
          </h3>
          
          {/* Subtitle / Description (Line clamp laga diya taaki lammba text design kharab na kare) */}
          <p className="text-[#d4af37] text-xs uppercase tracking-[0.2em] font-semibold mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 line-clamp-2">
            {category.description}
          </p>
          
          {/* Explore Link with Arrow */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <span className="text-white text-xs uppercase tracking-wider">
              Explore Designs
            </span>
            {/* Round Arrow Button (Premium Touch) */}
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37] text-black">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
          
        </div>

      </motion.div>
    </Link>
  );
}