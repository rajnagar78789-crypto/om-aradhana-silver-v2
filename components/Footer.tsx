import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-[#C9A227]/20 bg-[#3B0B16] text-white"
    >
      <div className="container mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Company */}

          <div>

            <h2 className="text-3xl font-bold">
              Om Aradhana Silver
            </h2>

            <p className="mt-5 leading-8 text-gray-300">
              Trusted wholesale supplier of
              999 Hollow Idols,
              92.5 Antique Jewellery,
              Fusion Jewellery and
              Sterling Silver Articles.
            </p>

            <div className="mt-6">

              <span className="rounded-full bg-[#C9A227]/20 px-4 py-2 text-sm font-semibold text-[#C9A227]">
                Trusted by 1100+ Retail Jewellery Showrooms
              </span>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-xl font-bold">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>
                <Link href="/">
                  Home
                </Link>
              </li>

              <li>
                <Link href="#categories">
                  Categories
                </Link>
              </li>

              <li>
                <Link href="#products">
                  Products
                </Link>
              </li>

              <li>
                <Link href="#about">
                  About
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-5 text-xl font-bold">
              Contact
            </h3>

            <div className="space-y-4 text-gray-300">

              <p>
                📍 Ahmedabad • Mumbai
              </p>

              <p>
                📱 +91 88795 28201
              </p>

              <a
                href="https://wa.me/918879528201"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl bg-[#C9A227] px-6 py-3 font-semibold text-[#5A1020] transition hover:scale-105"
              >
                WhatsApp Now
              </a>

            </div>

          </div>

        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center text-sm text-gray-400">

          © 2026 Om Aradhana Silver • All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}