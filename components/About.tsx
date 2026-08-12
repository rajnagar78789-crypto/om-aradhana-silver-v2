export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] py-28 border-t border-[#C9A227]/15">
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#8C6D18] backdrop-blur-md shadow-[0_0_15px_rgba(201,162,39,0.1)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227] animate-pulse" />
              Trusted Since 2020
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#24050D] leading-[1.08]">
              Trusted Wholesale Partner for <span className="italic font-light text-[#A4821E]">Retail Jewellery</span> Showrooms
            </h2>

            <p className="text-base sm:text-lg font-light leading-relaxed text-[#6B5B52] max-w-xl">
              For over 5 years, Om Aradhana Silver has been helping retail jewellery showrooms across India with premium silver collections, reliable supply and long-term business partnerships built on trust and consistency.
            </p>

            <div className="pt-4">
              <a
                href="https://wa.me/91XXXXXXXXXX" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#24050D] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F8F5F0] transition-all duration-300 hover:bg-[#3D0A17] hover:shadow-[0_10px_30px_rgba(36,5,13,0.2)] hover:-translate-y-0.5 border border-[#C9A227]/30"
              >
                <span>Get Wholesale Catalogue</span>
                <span className="text-[#E6CA65]">→</span>
              </a>
            </div>

          </div>

          {/* Right Stats Grid Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Stat Card 1 */}
            <div className="group rounded-3xl border border-[#E6DEC9] bg-white p-8 shadow-[0_10px_30px_rgba(36,5,13,0.03)] transition-all duration-300 hover:border-[#C9A227]/50 hover:shadow-[0_15px_35px_rgba(201,162,39,0.1)] hover:-translate-y-1">
              <div className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#24050D] group-hover:text-[#A4821E] transition-colors">
                1100+
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-[0.15em] text-[#8C6D18]">
                Retail Showrooms
              </div>
              <p className="mt-1 text-xs text-[#6B5B52] font-light">
                Actively partnered across PAN India.
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className="group rounded-3xl border border-[#E6DEC9] bg-white p-8 shadow-[0_10px_30px_rgba(36,5,13,0.03)] transition-all duration-300 hover:border-[#C9A227]/50 hover:shadow-[0_15px_35px_rgba(201,162,39,0.1)] hover:-translate-y-1">
              <div className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#24050D] group-hover:text-[#A4821E] transition-colors">
                200+
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-[0.15em] text-[#8C6D18]">
                Premium Designs
              </div>
              <p className="mt-1 text-xs text-[#6B5B52] font-light">
                Certified 999 & 92.5 silver masters.
              </p>
            </div>

            {/* Stat Card 3 */}
            <div className="group rounded-3xl border border-[#E6DEC9] bg-white p-8 shadow-[0_10px_30px_rgba(36,5,13,0.03)] transition-all duration-300 hover:border-[#C9A227]/50 hover:shadow-[0_15px_35px_rgba(201,162,39,0.1)] hover:-translate-y-1">
              <div className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#24050D] group-hover:text-[#A4821E] transition-colors">
                5+
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-[0.15em] text-[#8C6D18]">
                Years Experience
              </div>
              <p className="mt-1 text-xs text-[#6B5B52] font-light">
                Deep expertise in B2B silver trade.
              </p>
            </div>

            {/* Stat Card 4 */}
            <div className="group rounded-3xl border border-[#E6DEC9] bg-white p-8 shadow-[0_10px_30px_rgba(36,5,13,0.03)] transition-all duration-300 hover:border-[#C9A227]/50 hover:shadow-[0_15px_35px_rgba(201,162,39,0.1)] hover:-translate-y-1">
              <div className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#24050D] group-hover:text-[#A4821E] transition-colors pt-2">
                PAN India
              </div>
              <div className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-[#8C6D18]">
                Reliable Network
              </div>
              <p className="mt-1 text-xs text-[#6B5B52] font-light">
                Safe and insured express delivery.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}