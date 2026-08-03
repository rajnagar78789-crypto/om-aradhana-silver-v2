import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#3B0B16] via-[#5A1020] to-[#6D1630]">

      <div className="container pt-36 pb-28">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-5 py-2 text-sm font-semibold text-[#F4D46A] backdrop-blur-md">
  <span className="h-2 w-2 rounded-full bg-[#F4D46A]" />
  Trusted by 1100+ Retail Showrooms
</div>

            <h1 className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight text-white lg:text-7xl">

  Premium 999 Silver
  <br />

  Idols & Jewellery

  <span className="mt-3 block text-[#C9A227]">
    For Retail Showrooms
  </span>

</h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-200">
  Trusted wholesale manufacturer of
  <span className="font-semibold text-white"> 999 Hollow Idols</span>,
  <span className="font-semibold text-white"> 92.5 Antique Jewellery</span>,
  Fusion Collection and Sterling Silver Articles,
  supplying retailers across India.
</p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="#categories"
                className="btn-primary"
              >
                View Collection
              </Link>

              <a
                href="https://wa.me/918879528201"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                WhatsApp Enquiry
              </a>

            </div>
                        {/* TRUST STATS */}

            <div className="mt-14 grid grid-cols-2 gap-6 text-center text-white md:grid-cols-4">

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold text-[#C9A227]">
                  1100+
                </h3>

                <p className="mt-2 text-sm text-gray-200">
                  Retail Showrooms
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold text-[#C9A227]">
                  5+
                </h3>

                <p className="mt-2 text-sm text-gray-200">
                  Years Experience
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold text-[#C9A227]">
                  200+
                </h3>

                <p className="mt-2 text-sm text-gray-200">
                  Premium Designs
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold text-[#C9A227]">
                  PAN India
                </h3>

                <p className="mt-2 text-sm text-gray-200">
                  Wholesale Supply
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="absolute -inset-5 rounded-[40px] bg-[#C9A227]/20 blur-3xl"></div>

            <div className="relative overflow-hidden rounded-[34px] border border-white/20 bg-white/10 p-3 backdrop-blur">

              <Image
                src="/images/hero.png"
                alt="Om Aradhana Silver"
                width={700}
                height={700}
                priority
                className="rounded-[28px]"
              />
              <div className="absolute bottom-8 left-8 rounded-2xl bg-white/95 px-6 py-4 shadow-2xl backdrop-blur">

  <p className="text-sm font-semibold text-gray-500">
    Trusted By
  </p>

  <h3 className="mt-1 text-2xl font-bold text-[#5A1020]">
    1100+
  </h3>

  <p className="text-sm text-gray-600">
    Retail Showrooms
  </p>

</div>
                          </div>

          </div>

        </div>

      </div>

    </section>
  );
}