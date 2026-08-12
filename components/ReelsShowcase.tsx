"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

// Types
interface Reel {
  _id: string;
  title: string;
  videoUrl: string;
}

export default function ReelsShowcase() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReels() {
      try {
        // Sanity se Reels fetch kar rahe hain
        const query = `
          *[_type == "reel"] | order(_createdAt desc) {
            _id,
            title,
            "videoUrl": videoFile.asset->url
          }
        `;
        const data = await client.fetch(query);
        setReels(data);
      } catch (error) {
        console.error("Error fetching reels:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReels();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-[1440px] mx-auto px-6 text-center text-[#6B5B52]">
          Loading Masterpieces...
        </div>
      </section>
    );
  }

  // Agar reels na hon, toh section hide ho jayega
  if (!reels || reels.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#24050D] py-24 border-t border-[#C9A227]/20">
      {/* Subtle Gold Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#C9A227]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-16">
        
        {/* Heading Section */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#C9A227] mb-6 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227] animate-pulse" />
            Live Showcase
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-white leading-[1.1]">
            <span className="block text-[#FAF7F2]">
              Craftsmanship In
            </span>
            <span className="mt-1 block italic font-light text-[#C9A227]">
              Motion
            </span>
          </h2>

          <p className="mx-auto mt-6 text-sm sm:text-base font-light leading-relaxed text-[#D4C3B3]">
            Experience the exquisite details and brilliant finish of our pure silver collections through our cinematic reels.
          </p>
        </div>

        {/* Reels Grid (Auto-flowing horizontal scroll on mobile, grid on desktop) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible hide-scrollbar">
          {reels.map((reel) => (
            <div 
              key={reel._id}
              className="snap-center shrink-0 w-[280px] sm:w-[320px] lg:w-full aspect-[9/16] relative rounded-3xl overflow-hidden border border-[#C9A227]/30 shadow-[0_0_30px_rgba(201,162,39,0.1)] group bg-black"
            >
              {/* Video Player */}
              <video
                src={reel.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay Gradient (Bottom to Top) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Title and Play Icon */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between">
                <h3 className="text-white font-serif text-lg leading-tight line-clamp-2 pr-4 shadow-black drop-shadow-md">
                  {reel.title}
                </h3>
                {/* Small animated equalizer/play icon to show it's playing */}
                <div className="flex gap-1 items-end h-4 pb-1">
                  <span className="w-1 bg-[#C9A227] h-full animate-[bounce_1s_infinite_ease-in-out]"></span>
                  <span className="w-1 bg-[#C9A227] h-[60%] animate-[bounce_1.2s_infinite_ease-in-out]"></span>
                  <span className="w-1 bg-[#C9A227] h-[80%] animate-[bounce_0.8s_infinite_ease-in-out]"></span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Global CSS for hiding scrollbar in this specific component */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}