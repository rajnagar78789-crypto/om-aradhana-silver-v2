import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#3B0B16] via-[#5A1020] to-[#6D1630]">

      <div className="container py-24">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center rounded-full border border-[#C9A227]/40 bg-white/10 px-5 py-2 text-sm font-semibold text-[#C9A227] backdrop-blur">
              ✨ Trusted Wholesale Supplier
            </div>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white lg:text-7xl">

              Wholesale
              <br />

              Silver Jewellery
              <br />

              Collection

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-200">

              Premium manufacturer & wholesale supplier of
              999 Hollow Idols,
              92.5 Antique Jewellery,
              Fusion Collection,
              Turkey Kada,
              Sterling Silver &
              Exclusive Silver Articles.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <button className="btn-primary">
                View Collection
              </button>

              <button className="btn-outline">
                WhatsApp Enquiry
              </button>

            </div>

            {/* TRUST BADGES */}

            <div className="mt-12 grid grid-cols-2 gap-4 text-white lg:grid-cols-4">

              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-gray-300">✓ 999 Silver</p>
              </div>

              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-gray-300">✓ 92.5 Sterling</p>
              </div>

              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-gray-300">✓ PAN India</p>
              </div>

              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-gray-300">✓ Wholesale Only</p>
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

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}