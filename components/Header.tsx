"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "Search", href: "/search" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#C9A227]/20 bg-[#5A1020]/95 backdrop-blur-xl">

      {/* MAIN HEADER */}
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-9">

        {/* BRAND */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex min-w-0 items-center gap-3 lg:w-[30%]"
        >
          <Image
            src="/logo.png"
            alt="Om Aradhana Silver"
            width={52}
            height={52}
            priority
            className="h-11 w-11 object-contain sm:h-[52px] sm:w-[52px]"
          />

          <div className="min-w-0">
            <h1 className="whitespace-nowrap text-[18px] font-bold text-white sm:text-xl">
              Om Aradhana Silver
            </h1>

            <p className="mt-1 hidden whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-[#C9A227] sm:block">
              Trusted by 1100+ Retail Showrooms
            </p>

            <p className="mt-0.5 whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.14em] text-[#C9A227] sm:hidden">
              Wholesale Silver Jewellery
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden justify-center lg:flex lg:w-[40%]">
          <div className="flex items-center gap-9">

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative py-2 !text-white text-[15px] font-medium transition-colors duration-300 hover:!text-[#C9A227]"
              >
                {item.name}

                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C9A227] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

          </div>
        </nav>
                {/* DESKTOP CTA */}
        <div className="hidden justify-end pr-4 lg:flex lg:w-[30%] xl:pr-8">
          <a
  href="https://wa.me/918879528201"
  target="_blank"
  rel="noopener noreferrer"
  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl border border-[#E7C45A] bg-gradient-to-b from-[#FFE79A] via-[#E7C24A] to-[#C99513] px-8 py-3.5 font-semibold text-[#55111E] shadow-[0_10px_25px_rgba(201,162,39,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(201,162,39,0.50)]"
>
  {/* Shine Effect */}
  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

  <span className="relative z-10">
    View Catalogue
  </span>

  <svg
    className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.4}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 5l7 7-7 7M5 12h15"
    />
  </svg>
</a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label="Toggle Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-white transition hover:border-[#C9A227] hover:text-[#C9A227] lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`overflow-hidden border-white/10 bg-[#5A1020] transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-[550px] border-t opacity-100"
            : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-5 pb-6 pt-2">

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-4 text-[15px] font-medium text-white transition hover:pl-1 hover:text-[#C9A227]"
            >
              {item.name === "Search"
                ? "Search Products"
                : item.name}
            </Link>
          ))}

          <a
            href="https://wa.me/918879528201"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-5 flex items-center justify-center rounded-xl bg-[#C9A227] px-5 py-3.5 text-sm font-bold text-[#5A1020] transition hover:brightness-105"
          >
            View WhatsApp Catalogue →
          </a>

        </nav>
      </div>
          </header>
  );
} 