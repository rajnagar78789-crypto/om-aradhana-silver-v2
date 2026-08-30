// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation"; 

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function HeaderV2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const pathname = usePathname(); 

  const isProductPage = pathname?.includes("/product");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 MAGIC HERE: Agar Product page hai toh 'absolute' (scroll hoke gayab ho jayega), warna 'fixed' (chipka rahega)
  return (
    <header
      className={`${isProductPage ? "absolute" : "fixed"} top-4 left-1/2 z-[9999] pointer-events-auto w-[96%] max-w-7xl -translate-x-1/2 rounded-2xl transition-all duration-500 ${
        scrolled && !isProductPage
          ? "border border-white/60 bg-white/85 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-2xl"
          : "border border-white/30 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/logo.png"
            alt="Om Aradhana Silver"
            width={165}
            height={60}
            priority
            className="h-auto w-[135px] md:w-[165px]"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#4b1022] transition-all duration-300 hover:text-[#C9A227] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[#C9A227] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}

          <a
            href="https://wa.me/918879528201"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-r from-[#4b1022] to-[#6a1b29] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-md shadow-[#4b1022]/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#C9A227] hover:to-[#dfbe45] hover:text-[#24050D] hover:shadow-lg hover:shadow-[#C9A227]/40"
          >
            WhatsApp
          </a>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-[#4b1022] transition-colors hover:bg-black/5 lg:hidden"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 mt-2 w-full overflow-hidden rounded-2xl border border-white/40 bg-white/95 shadow-xl backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col px-6 py-6 space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-gray-100 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-[#4b1022] transition-colors hover:text-[#C9A227]"
              >
                {item.name}
              </Link>
            ))}

            <a
              href="https://wa.me/918879528201"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 rounded-full bg-[#4b1022] py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md transition-all hover:bg-[#C9A227] hover:text-[#24050D]"
            >
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      )}
    </header>
  );
}