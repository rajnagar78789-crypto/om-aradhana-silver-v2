"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { collections } from "@/data/collections"; 

const navItems = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/#collections" }, 
  { name: "Search", href: "/search" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false); 
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false); 
  
  const pathname = usePathname(); 

  // 🔥 VIP FIX: Ab yeh URL mein kahin bhi "product" word dhundhega
  const isProductPage = pathname?.includes("/product");

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    setCollectionDropdownOpen(false);

    if (href.includes("#")) {
      const targetId = href.split("#")[1]; 
      const elem = document.getElementById(targetId);
      
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // 🔥 THE MAGIC: Agar product page hai, toh 'relative' (upar chhut jayega). Warna 'sticky top-0' (chipka rahega)
  return (
    <header className={`${isProductPage ? "relative" : "sticky top-0"} z-[9999] border-b border-[#C9A227]/25 bg-[#24050D]/95 backdrop-blur-xl transition-all duration-300`}>
      <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-6 lg:px-16">
        
        {/* BRAND LOGO & TITLE */}
        <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-4 group">
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full border-2 border-[#C9A227]/70 bg-[#24050D] shadow-[0_0_25px_rgba(201,162,39,0.4)] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#E6CA65]">
            <Image src="/logo.png" alt="Om Aradhana Silver" fill priority sizes="80px" className="object-cover p-0.5" />
          </div>
          <div>
            <span className="block font-serif text-lg sm:text-xl font-medium tracking-wide text-[#F8F5F0] group-hover:text-[#E6CA65] transition-colors">
              Om Aradhana Silver
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A227]">
              Trusted by 2000+ RETAIL PARTNERS
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            if (item.name === "Collections") {
              return (
                <div 
                  key={item.name}
                  className="relative py-2"
                  onMouseEnter={() => setCollectionDropdownOpen(true)}
                  onMouseLeave={() => setCollectionDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center gap-1.5 py-1 text-xs font-medium tracking-[0.2em] uppercase text-[#D2C5B0] transition-colors duration-300 hover:text-[#E6CA65] group cursor-pointer"
                  >
                    {item.name}
                    <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${collectionDropdownOpen ? "rotate-180 text-[#E6CA65]" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9A227] transition-all duration-300 group-hover:w-full" />
                  </Link>

                  {/* 🌟 MEGA DROPDOWN MENU FOR SUBCATEGORIES */}
                  {collectionDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-[#1A0309] border border-[#C9A227]/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 grid grid-cols-2 gap-6 z-50">
                      {collections.map((cat) => (
                        <div key={cat.slug} className="space-y-2 border-b border-[#C9A227]/10 pb-4 last:border-none">
                          <Link 
                            href={`/collections/${cat.slug}`}
                            className="font-serif text-sm font-medium text-[#E6CA65] hover:text-white transition-colors block"
                            onClick={() => setCollectionDropdownOpen(false)}
                          >
                            {cat.title} →
                          </Link>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.subcategories?.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/collections/${cat.slug}?sub=${sub.slug}`}
                                className="text-[10px] font-light bg-[#24050D] border border-[#C9A227]/20 px-2.5 py-1 rounded-md text-[#D2C5B0] hover:border-[#C9A227] hover:text-white transition-all"
                                onClick={() => setCollectionDropdownOpen(false)}
                              >
                                {sub.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative py-1 text-xs font-medium tracking-[0.2em] uppercase text-[#D2C5B0] transition-colors duration-300 hover:text-[#E6CA65] group cursor-pointer"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9A227] transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP CTA BUTTON */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://wa.me/918879528201"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#C9A227] via-[#F3E5AB] to-[#C9A227] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#24050D] shadow-[0_4px_25px_rgba(201,162,39,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_35px_rgba(201,162,39,0.55)]"
          >
            WhatsApp Catalogue
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label="Toggle Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C9A227]/30 bg-white/5 text-[#F8F5F0] transition hover:border-[#C9A227] lg:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div className={`overflow-hidden border-t border-[#C9A227]/20 bg-[#24050D]/95 backdrop-blur-2xl transition-all duration-300 lg:hidden ${menuOpen ? "max-h-[800px] opacity-100 py-6" : "max-h-0 opacity-0 py-0 border-t-0"}`}>
        <nav className="flex flex-col space-y-4 px-6 max-h-[70vh] overflow-y-auto">
          {navItems.map((item) => {
            if (item.name === "Collections") {
              return (
                <div key={item.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        setMenuOpen(false);
                      }}
                      className="text-sm font-medium uppercase tracking-[0.15em] text-[#D2C5B0] transition hover:text-[#E6CA65]"
                    >
                      {item.name}
                    </Link>
                    <button 
                      onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                      className="text-[#E6CA65] p-1 text-xs font-bold"
                    >
                      {mobileCollectionsOpen ? "▲ Hide Subcategories" : "▼ View Subcategories"}
                    </button>
                  </div>

                  {mobileCollectionsOpen && (
                    <div className="pl-4 space-y-4 border-l border-[#C9A227]/20 py-2">
                      {collections.map((cat) => (
                        <div key={cat.slug} className="space-y-1.5">
                          <Link
                            href={`/collections/${cat.slug}`}
                            onClick={() => setMenuOpen(false)}
                            className="font-serif text-xs font-semibold text-[#E6CA65] block"
                          >
                            {cat.title}
                          </Link>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.subcategories?.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/collections/${cat.slug}?sub=${sub.slug}`}
                                onClick={() => setMenuOpen(false)}
                                className="text-[10px] bg-[#1A0309] border border-[#C9A227]/20 px-2 py-1 rounded text-[#D2C5B0]"
                              >
                                {sub.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium uppercase tracking-[0.15em] text-[#D2C5B0] transition hover:text-[#E6CA65] cursor-pointer"
              >
                {item.name}
              </Link>
            );
          })}

          <a
            href="https://wa.me/918879528201"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 text-center rounded-full bg-gradient-to-r from-[#C9A227] via-[#F3E5AB] to-[#C9A227] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#24050D] shadow-md"
          >
            WhatsApp Catalogue
          </a>
        </nav>
      </div>
    </header>
  );
}