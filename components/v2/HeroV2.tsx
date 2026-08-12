export default function HeroV2() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-[#24050D]">
      
      {/* 🎬 BACKGROUND VIDEO - More visible & shifted right */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-[75%_center] opacity-95"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 🔥 Dark overlay gradient (thoda halka kiya hai taaki video aur saaf dikhe) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#24050D] via-[#24050D]/50 to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-16 py-20">
        
        {/* TEXT CONTENT AREA */}
        <div className="max-w-2xl">
          
          {/* Elite Tag */}
          <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 backdrop-blur-md">
            <span className="text-[#E6CA65] text-xs animate-pulse">✦</span>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E6CA65]">
              TRUSTED BY 1100+ SHOWROOMS ACROSS INDIA
            </span>
          </div>

          {/* Main Headings */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-normal tracking-tight text-[#F8F5F0] leading-[1.1]">
            Timeless Silver. <br />
            <span className="font-serif italic font-light text-[#E6CA65]">
              Unmatched Legacy.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-sm sm:text-base lg:text-lg font-light leading-relaxed text-[#D2C5B0] max-w-xl">
            Supplying elite retail jewellery showrooms across India with certified 999 hollow idols, antique artifacts, fusion designs, and sterling silver masterpieces.
          </p>

          {/* 4 Categories Minimal Grid */}
          <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            {["999 Hollow Idols", "92.5 Antique Jewellery", "92.5 Fusion Collection", "92.5 Sterling Silver"].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-[#24050D]/40 border border-[#C9A227]/30 backdrop-blur-md transition-all hover:bg-[#C9A227]/10">
                <span className="text-[#E6CA65] text-xs">✦</span>
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#F8F5F0]">{item}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#categories"
              className="rounded-full bg-gradient-to-r from-[#C9A227] via-[#F3E5AB] to-[#C9A227] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#24050D] shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all hover:scale-105"
            >
              Explore Collections
            </a>
            <a
              href="https://wa.me/918879528201?text=Hi,%20I%20want%20to%20search%20the%20catalogue."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#C9A227]/40 bg-[#24050D]/50 backdrop-blur-md px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#F8F5F0] transition-all hover:bg-[#C9A227]/20"
            >
              Catalogue Search
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}