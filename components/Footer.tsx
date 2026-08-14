import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1A0308] pt-24 pb-8 border-t border-[#C9A227]/20 text-[#F8F5F0]">
      
      {/* Background Soft Gold Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-[#C9A227]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12">

          {/* Left Column: Brand & Info (Col span 5) */}
          <div className="lg:col-span-5">
            <h3 className="font-serif text-3xl font-normal tracking-wide text-[#F8F5F0]">
              Om Aradhana Silver
            </h3>
            
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-[#D2C5B0]">
              Trusted wholesale supplier of 999 Hollow Idols, 92.5 Antique Jewellery, Fusion Jewellery and Sterling Silver Articles.
            </p>
            
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#E6CA65] backdrop-blur-md shadow-[0_0_15px_rgba(201,162,39,0.1)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227] animate-pulse" />
              Trusted by 2100+ Retail Showrooms
            </div>
          </div>

          {/* Middle Column: Quick Links (Col span 3) */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="font-serif text-lg font-medium tracking-wide text-[#F8F5F0]">
              Quick Links
            </h4>
            
            <ul className="mt-6 space-y-4 text-sm font-light text-[#D2C5B0]">
              <li>
                <Link href="/" className="transition-colors hover:text-[#E6CA65]">Home</Link>
              </li>
              <li>
                <Link href="#categories" className="transition-colors hover:text-[#E6CA65]">Categories</Link>
              </li>
              <li>
                <Link href="/products" className="transition-colors hover:text-[#E6CA65]">Products</Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-[#E6CA65]">About</Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Contact & Action (Col span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg font-medium tracking-wide text-[#F8F5F0]">
              Contact
            </h4>
            
            <ul className="mt-6 space-y-4 text-sm font-light text-[#D2C5B0]">
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#C9A227]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Ahmedabad • Mumbai</span>
              </li>
              
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#C9A227]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 88795 28201</span>
              </li>
            </ul>

            <div className="mt-8">
              <a
                href="https://wa.me/918879528201?text=Hello,%20I%20am%20interested%20in%20your%20silver%20jewellery%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#DFBA4E] to-[#C9A227] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#24050D] shadow-[0_0_15px_rgba(201,162,39,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,162,39,0.5)] hover:-translate-y-0.5"
              >
                <span>WhatsApp Now</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-16 flex flex-col items-center justify-center border-t border-[#C9A227]/20 pt-8 sm:flex-row sm:justify-between text-center">
          
          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <p className="text-xs font-light tracking-wide text-[#D2C5B0]">
              © {new Date().getFullYear()} Om Aradhana Silver • All Rights Reserved.
            </p>
            {/* 🚨 YAHAN THEEK KIYA HAI - Ekdum Clean */}
            <p className="text-[12px] font-light tracking-wider text-[#D2C5B0]/70 mt-1">
              Created by <span className="font-medium text-[#E6CA65] hover:text-[#F8F5F0] transition-colors">Raj Nagar</span>
            </p>
          </div>

          <div className="mt-5 flex items-center gap-4 sm:mt-0">
            <Link href="#" className="text-xs font-light text-[#D2C5B0] transition-colors hover:text-[#E6CA65]">
              Privacy Policy
            </Link>
            <span className="text-[#C9A227]/40">|</span>
            <Link href="#" className="text-xs font-light text-[#D2C5B0] transition-colors hover:text-[#E6CA65]">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}