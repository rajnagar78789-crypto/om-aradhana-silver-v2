'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';

// 1. Sanity Connection Setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: true,
});

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// 2. Types Define Kiye
type Idol = {
  _id: string;
  name: string;
  sku: string;
  category: string;
  weight: string;
  image: any;
};

const CATEGORIES = [
  { id: 'all', label: 'All Idols' },
  { id: 'ganesh_ji', label: 'Ganesh Ji' },
  { id: 'laxmi_ji', label: 'Laxmi Ji' },
  { id: 'laxmi_ganesh_jodi', label: 'Laxmi-Ganesh' },
  { id: 'ram_darbar', label: 'Ram Darbar' },
  { id: 'krishna_ji', label: 'Krishna Ji' },
  { id: 'hanuman_ji', label: 'Hanuman Ji' },
];

export default function VIPIdolsShowroom() {
  const [idols, setIdols] = useState<Idol[]>([]);
  const [filteredIdols, setFilteredIdols] = useState<Idol[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // 3. Sanity Se Data Mangwana (Godown se Showroom me)
  useEffect(() => {
    const fetchIdols = async () => {
      try {
        const data = await client.fetch(`*[_type == "idol"] | order(_createdAt desc)`);
        setIdols(data);
        setFilteredIdols(data);
      } catch (error) {
        console.error("Error fetching idols:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIdols();
  }, []);

  // 4. Category Filter Logic
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredIdols(idols);
    } else {
      setFilteredIdols(idols.filter(idol => idol.category === activeCategory));
    }
  }, [activeCategory, idols]);

  // 5. WhatsApp Magic Link
  const handleWhatsAppInquiry = (idol: Idol) => {
    const phoneNumber = "919999999999"; // ⚠️ BHAI YAHAN APNA WHATSAPP NUMBER DAAL LENA (bina + ke)
    const message = `Hello Om Aradhana Silver, I want to inquire about this VIP 999 Idol:%0A%0A*Item:* ${idol.name}%0A*SKU Code:* ${idol.sku}%0A*Base Weight:* ${idol.weight}%0A%0APlease share the exact live weight today's silver rate, and price.`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#150d11] text-white pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-5xl font-serif text-[#d4af37] mb-4 tracking-wide"
          >
            Premium 999 Hollow Idols
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto font-light"
          >
            Exclusive 999 pure silver hollow idols crafted for premium retail counters. 100% purity guaranteed.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wider transition-all duration-300 border ${
                activeCategory === cat.id 
                  ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                  : 'bg-transparent text-gray-400 border-gray-700 hover:border-[#d4af37] hover:text-[#d4af37]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Grid Showroom */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredIdols.map((idol) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={idol._id}
                className="bg-black/40 border border-[#d4af37]/20 rounded-2xl overflow-hidden group hover:border-[#d4af37]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500 flex flex-col"
              >
                
                {/* 🚀 YAHAN SE LINK SHURU (Image + Name click karne pe Zoom page khulega) */}
                <Link href={`/vip-idols/${idol.sku}`} className="block flex-1 cursor-pointer">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-white/5">
                    {idol.image && (
                      <img 
                        src={urlFor(idol.image).width(600).url()} 
                        alt={idol.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-[#d4af37]/40 text-[#d4af37] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                      {idol.category.replace(/_/g, ' ')}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-serif text-white group-hover:text-[#d4af37] transition-colors line-clamp-1">{idol.name}</h3>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="text-gray-400 font-mono">Code: <span className="text-gray-200">{idol.sku}</span></span>
                      <span className="text-[#d4af37] font-medium bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/20">
                        Wt: {idol.weight}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* WhatsApp CTA (Link ke bahar rakha hai taaki seedha Whatsapp pe jaye) */}
                <div className="px-6 pb-6 mt-auto">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleWhatsAppInquiry(idol);
                    }}
                    className="w-full bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold uppercase tracking-widest text-xs py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative z-10"
                  >
                    <span>💬</span> Ask Live Price & Wt
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {!isLoading && filteredIdols.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <h3 className="text-2xl font-serif text-white mb-2">More Masterpieces Coming Soon!</h3>
            <p>Our artisans are crafting new designs for this category.</p>
          </div>
        )}

      </div>
    </div>
  );
}