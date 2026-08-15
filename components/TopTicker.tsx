import React from 'react';

export default function TopTicker(): React.JSX.Element {
  return (
    <div className="relative flex overflow-x-hidden bg-[#0A0103] border-b border-[#C9A227]/20 text-[#E6CA65] py-2.5 font-mono text-xs sm:text-sm tracking-widest uppercase z-[100]">
      
      <div className="animate-marquee whitespace-nowrap flex items-center cursor-default">
        <span className="mx-6 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          OM ARADHANA SILVER
        </span>
        
        <span className="mx-6 font-semibold text-[#F8F5F0]">
          PREMIUM 999 HOLLOW IDOLS & 92.5 ANTIQUE JEWELLERY
        </span>
        <span className="mx-4 text-[#C9A227]/40">|</span>
        
        <span className="mx-6 font-semibold text-[#DFBA4E]">
          ✦ STRICTLY B2B WHOLESALE ONLY ✦
        </span>
        <span className="mx-4 text-[#C9A227]/40">|</span>
        
        <span className="mx-6 font-bold text-[#F8F5F0]">
          CONNECT ON WHATSAPP FOR TODAY'S LIVE RATES
        </span>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(100vw); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `
      }} />
    </div>
  );
}