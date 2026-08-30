'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';

// Sanity Connection
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

export default function VIPProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { sku } = params;
  
  const [idol, setIdol] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Zoom Effect States
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundImage: '', backgroundPosition: '0% 0%' });

  // Data Fetching
  useEffect(() => {
    const fetchIdol = async () => {
      try {
        const query = `*[_type == "idol" && sku == $sku][0]`;
        const data = await client.fetch(query, { sku: sku });
        setIdol(data);
      } catch (error) {
        console.error("Error fetching idol detail:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (sku) fetchIdol();
  }, [sku]);

  // Image Zoom Logic (Amazon Style)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${urlFor(idol.image).width(1200).url()})`,
      backgroundPosition: `${x}% ${y}%`
    });
  };

  const handleWhatsApp = () => {
    const phoneNumber = "919999999999"; // ⚠️ APNA NUMBER YAHAN DAAL
    const message = `Hello Om Aradhana Silver, I want to inquire about:%0A%0A*${idol.name}*%0A*Code:* ${idol.sku}%0A*Weight:* ${idol.weight}%0A%0APlease share live exact weight and today's price.`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (isLoading) return <div className="min-h-screen bg-[#150d11] flex items-center justify-center"><div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div></div>;
  if (!idol) return <div className="min-h-screen bg-[#150d11] text-white flex items-center justify-center flex-col"><h1 className="text-3xl mb-4 text-[#d4af37]">Idol Not Found</h1><button onClick={() => router.back()} className="text-gray-400 hover:text-white underline">Go Back</button></div>;

  return (
    <div className="min-h-screen bg-[#150d11] text-white pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Breadcrumb / Back Button */}
        <button onClick={() => router.back()} className="text-gray-400 hover:text-[#d4af37] mb-8 flex items-center gap-2 transition-colors">
          <span>←</span> Back to Collection
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT: Image Section with Zoom */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative">
            <div 
              className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-[#d4af37]/20 group cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomStyle({ ...zoomStyle, display: 'none' })}
            >
              <img 
                src={urlFor(idol.image).width(800).url()} 
                alt={idol.name}
                className="w-full h-full object-cover"
              />
              {/* Zoom Overlay (Hidden by default, shows on hover) */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none bg-no-repeat transition-opacity duration-150"
                style={{
                  ...zoomStyle,
                  backgroundSize: '200%', // Kitna zoom karna hai (2x)
                }}
              />
            </div>
            <p className="text-center text-gray-500 text-xs mt-4">Hover over the image to magnify details</p>
          </motion.div>

          {/* RIGHT: Product Details Section */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
            
            <div className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 w-max">
              {idol.category.replace(/_/g, ' ')}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4 leading-tight">
              {idol.name}
            </h1>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-800">
              <div className="bg-black/50 border border-gray-700 rounded-lg px-4 py-2">
                <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Item Code (SKU)</span>
                <span className="text-xl text-white font-mono">{idol.sku}</span>
              </div>
              <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-lg px-4 py-2">
                <span className="text-[#d4af37]/70 text-xs uppercase tracking-wider block mb-1">Base Weight</span>
                <span className="text-xl text-[#d4af37] font-medium">{idol.weight}</span>
              </div>
            </div>

            <div className="mb-10 text-gray-300 leading-relaxed font-light">
              <p>Experience the ultimate craftsmanship of Zaveri Bazaar. This 999 pure silver masterpiece is intricately designed for premium retail showcases. Note: Final weight may slightly vary due to the die-stamping process.</p>
            </div>

            {/* Big WhatsApp CTA */}
            <button 
              onClick={handleWhatsApp}
              className="w-full sm:w-auto bg-[#d4af37] text-black px-10 py-4 rounded-xl font-bold uppercase tracking-[0.1em] hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-sm"
            >
              <span className="text-xl">💬</span> Ask Live Exact Weight & Price
            </button>
            <p className="text-gray-500 text-xs mt-4">Safe & insured express delivery across PAN India.</p>

          </motion.div>
        </div>
      </div>
    </div>
  );
}