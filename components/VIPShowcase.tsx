'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// 🔥 Yahan apni actual videos ka path aur links daal dena
const reelsData = [
  {
    id: 1,
    title: "Sterling Silver Set",
    video: "/videos/reel1.mp4", // Teri pehli reel ka path
    link: "/collections/sterling-silver",
  },
  {
    id: 2,
    title: "92.5 Antique Ladies Kada",
    video: "/videos/reel2.mp4", 
    link: "/collections/antique-kada",
  },
  {
    id: 3,
    title: "92.5 Fusion Pendent",
    video: "/videos/reel3.mp4", 
    link: "/collections/fusion-pendent",
  },
  {
    id: 4,
    title: "999 Hollow Idol",
    video: "/videos/reel4.mp4", 
    link: "/collections/hollow-idols",
  }
];

export default function ReelsShowcase() {
  return (
    <section className="py-20 bg-[#150d11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-serif text-[#d4af37] tracking-wider mb-2"
          >
            Trending Collections
          </motion.h2>
          <div className="h-1 w-16 bg-[#d4af37] mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reelsData.map((reel, index) => (
            // 🔥 YEH RAHA TERA CLICKABLE LINK
            <Link key={reel.id} href={reel.link}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden cursor-pointer border border-transparent hover:border-[#d4af37] transition-all duration-300 shadow-xl"
              >
                {/* Auto-playing Background Video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={reel.video} type="video/mp4" />
                </video>
                
                {/* Black shadow taaki text saaf dikhe */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-end">
                  <h3 className="text-white text-lg font-medium tracking-wide">
                    {reel.title}
                  </h3>
                  
                  {/* Yeh wo chhota sa audio/bars wala icon (Music Visualizer) dikhane ke liye */}
                  <div className="flex gap-1 items-end h-4">
                    <div className="w-1 h-2 bg-[#d4af37] animate-pulse"></div>
                    <div className="w-1 h-4 bg-[#d4af37] animate-pulse delay-75"></div>
                    <div className="w-1 h-3 bg-[#d4af37] animate-pulse delay-150"></div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}