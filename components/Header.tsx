"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "#categories" },
  { name: "Products", href: "#products" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#5A1020]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Om Aradhana Silver"
            width={58}
            height={58}
            priority
            className="rounded-full shadow-lg"
          />

          <div>
            <h1 className="text-xl font-bold text-white lg:text-2xl">
              Om Aradhana Silver
            </h1>

            <p className="text-xs tracking-[0.2em] text-[#C9A227] uppercase">
  Trusted by 1100+ Retail Showrooms
</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-[15px] font-semibold text-white/90 transition-all duration-300 hover:text-[#C9A227] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-[#C9A227] after:transition-all hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="https://wa.me/918879528201"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#C9A227] px-6 py-3 font-semibold text-[#5A1020] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
          >
            💬 WhatsApp
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl text-white lg:hidden"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#5A1020] lg:hidden">
          <div className="flex flex-col p-5">

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-4 text-white transition hover:text-[#C9A227]"
              >
                {item.name}
              </Link>
            ))}

            <a
              href="https://wa.me/918879528201"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 rounded-xl bg-[#C9A227] py-3 text-center font-semibold text-[#5A1020]"
            >
              💬 WhatsApp Now
            </a>

          </div>
        </div>
      )}
    </header>
  );
}