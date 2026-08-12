export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] py-20">
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-16">
        
        {/* Main Floating Royal Card */}
        <div className="relative overflow-hidden rounded-[3rem] bg-[#24050D] px-8 py-20 sm:px-16 text-center border border-[#C9A227]/30 shadow-[0_20px_50px_rgba(36,5,13,0.2)]">
          
          {/* Background Royal Glow Effects */}
          <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-[#C9A227]/15 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#C9A227]/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-3xl">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/15 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#E6CA65] mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(201,162,39,0.15)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227] animate-pulse" />
              Trusted Wholesale Partner
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F8F5F0] leading-[1.1]">
              Ready to Grow Your <span className="italic font-light text-[#E6CA65]">Jewellery Business?</span>
            </h2>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-xl text-sm sm:text-base font-light leading-relaxed text-[#D2C5B0]">
              Join 1100+ retail showrooms across India. Request our wholesale digital catalogue on WhatsApp.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              
              {/* Primary WhatsApp Button */}
              <a
  href="https://wa.me/918879528201?text=Hello,%20I%20want%20to%20get%20the%20wholesale%20catalogue."
  target="_blank"
  rel="noopener noreferrer"
  className="..."
>
  Get Catalogue on WhatsApp
</a>

              {/* Secondary Call Button */}
              <a
                href="tel:+91XXXXXXXXXX"
                className="inline-flex items-center gap-3 rounded-full border border-[#C9A227]/40 bg-white/[0.05] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F8F5F0] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.1] hover:border-[#C9A227] hover:-translate-y-0.5"
              >
                <span>Call Wholesale Desk</span>
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}