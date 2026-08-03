"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function HeaderV2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
  className={`fixed top-5 left-1/2 z-50 w-[96%] max-w-7xl -translate-x-1/2 rounded-2xl transition-all duration-500 ${
    scrolled
      ? "border border-white/50 bg-white/75 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
: "border border-white/20 bg-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl"
  }`}
>
      <div className="mx-auto grid h-[76px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6">

        {/* Logo */}
<Link
  href="/"
  className="justify-self-start flex items-center transition-transform duration-300 hover:scale-105"
>          <Image
            src="/logo.png"
            alt="Om Aradhana Silver"
            width={165}
            height={60}
            priority
            className="h-auto w-[135px] md:w-[165px]"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden justify-self-center items-center gap-12 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
className="relative py-2 font-semibold tracking-wide text-[#4b1022] transition-all duration-300 hover:text-[#C9A227] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[#C9A227] after:transition-all after:duration-300 hover:after:w-full"            >
              {item.name}
            </Link>
          ))}

          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
className="rounded-full bg-[#4b1022] px-7 py-3 font-semibold text-white shadow-lg shadow-[#4b1022]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#C9A227] hover:text-[#4b1022] hover:shadow-xl hover:shadow-[#C9A227]/40"          >
            WhatsApp
          </a>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden"
        >
          {menuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t bg-white lg:hidden">
          <div className="flex flex-col px-6 py-5">

            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 font-medium text-[#4b1022]"
              >
                {item.name}
              </Link>
            ))}

            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              className="mt-4 rounded-full bg-[#4b1022] px-5 py-3 text-center font-semibold text-white"
            >
              WhatsApp Enquiry
            </a>

          </div>
        </div>
      )}
    </header>
  );
}