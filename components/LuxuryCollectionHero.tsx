import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image: string;
  backUrl: string;
};

export default function LuxuryCollectionHero({ title, description, image, backUrl }: Props) {
  return (
    // 🔥 PADDING KAM KI HAI (pt-6 pb-10) TAAKI SPACE NA KHAYE
    <section className="relative w-full bg-[#150d11] pt-6 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">
      
      {/* Subtle VIP Glow (Background me halki si gold chamak) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-16">
        
        {/* Back Button (Ekdum sleek) */}
        <Link
          href={backUrl}
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] transition-colors hover:text-white"
        >
          <span>&larr;</span> Back to Collection
        </Link>

        {/* EKDUM COMPACT AUR LUXURY GRID */}
        <div className="mt-6 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
          
          {/* LEFT CONTENT (60% width) */}
          <div className="w-full lg:w-3/5">
            <h1 className="font-serif text-5xl lg:text-7xl text-white drop-shadow-md">
              {title}
            </h1>
            
            <div className="mt-5 flex items-center gap-4">
              <div className="h-[1px] w-12 bg-[#d4af37]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                Masterpiece
              </span>
            </div>

            <p className="mt-5 max-w-lg text-sm lg:text-base font-light leading-relaxed text-gray-400">
              {description}
            </p>

            {/* 🌟 CLASSY INLINE FEATURES (Bada kaala dabba hata diya, ab ekdum clean lagega!) */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#d4af37]/80">
              <div className="flex items-center gap-2">
                <span className="text-[#d4af37] text-lg">✦</span>
                <span>100% Hallmarked</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-[#d4af37]/30" />
              <div className="flex items-center gap-2">
                <span className="text-[#d4af37] text-lg">✦</span>
                <span>Premium Finishing</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-[#d4af37]/30" />
              <div className="flex items-center gap-2">
                <span className="text-[#d4af37] text-lg">✦</span>
                <span>Expert Artisans</span>
              </div>
            </div>

            {/* Sleek WhatsApp Button (Gold outline se bhara hua) */}
            <div className="mt-10">
              <a
                href="https://wa.me/918879528201" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[#d4af37] bg-transparent px-8 py-3 transition-all duration-500 hover:bg-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] group"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4af37] transition-colors group-hover:text-black">
                  Enquire on WhatsApp
                </span>
                <svg className="w-4 h-4 text-[#d4af37] transition-colors group-hover:text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.12.548 4.17 1.59 5.987L.05 24l6.155-1.55A11.956 11.956 0 0012.031 24c6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm3.328 17.37c-.15.424-.87.818-1.22.868-.328.048-.755.138-2.45-.563-2.038-.84-3.34-2.91-3.44-3.045-.1-.135-.823-1.096-.823-2.09 0-.995.518-1.485.703-1.685.185-.2.4-.25.535-.25.135 0 .27.005.39.01.125.005.295-.048.46.35.17.405.58 1.425.63 1.525.05.1.085.215.015.355-.07.14-.105.225-.21.345-.105.12-.22.255-.31.365-.1.11-.205.225-.09.425.115.2.515.855 1.105 1.385.76.685 1.4 2.895 1.6 3.095z" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE (40% width) - Sleek Aspect Ratio & VIP Border */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] aspect-[4/3] rounded-[24px] overflow-hidden border border-[#d4af37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_30px_rgba(212,175,55,0.15)] group">
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#150d11] via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
              
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Subtle Gold Corner Accents (Royal touch) */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#d4af37]/60 z-20" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#d4af37]/60 z-20" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}