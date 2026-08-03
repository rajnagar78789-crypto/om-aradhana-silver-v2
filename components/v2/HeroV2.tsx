import Image from "next/image";
import Link from "next/link";

export default function HeroV2() {
  return (
    <section className="relative overflow-hidden bg-[#F8F5F0]">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full bg-[#C9A227]/10 blur-[120px]" />
        <div className="absolute -left-48 bottom-0 h-[450px] w-[450px] rounded-full bg-[#4A0D1F]/5 blur-[120px]" />
      </div>

<div className="relative mx-auto max-w-[1600px] px-6 py-20 lg:px-10 lg:py-28">
  <div className="grid items-center gap-12 lg:grid-cols-[46%_54%]">          {/* LEFT CONTENT */}

          <div>

            {/* Brand Badge */}

            <div className="inline-flex items-center gap-3 rounded-full border border-[#C9A227]/30 bg-white/90 px-5 py-3 shadow-lg backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-[0_10px_35px_rgba(201,162,39,0.25)]">

              <div className="h-2.5 w-2.5 rounded-full bg-[#C9A227]" />

              <span className="text-sm font-semibold tracking-[0.18em] text-[#8B6A18] uppercase">
                Om Aradhana Silver
              </span>

            </div>

            {/* Heading */}

<h1 className="mt-8 max-w-[760px] text-5xl font-black leading-[0.95] tracking-[-0.07em] text-[#4A0D1F] lg:text-[72px]">
              Premium Silver.

              <br />

              Trusted Wholesale.

            </h1>

            {/* Description */}

            <p className="mt-8 max-w-xl text-xl leading-8 text-gray-600">
  Trusted wholesale partner for premium silver collections across India.
</p>


<div className="mt-6 space-y-3 text-[17px] text-[#4A0D1F]">

  <div className="flex items-center gap-3">
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C9A227]/15 text-[#C9A227]">
  ✓
</div>
    <span>999 Hollow Idols</span>
  </div>

  <div className="flex items-center gap-3">
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C9A227]/15 text-[#C9A227]">
  ✓
</div>
    <span>92.5 Antique Jewellery</span>
  </div>

  <div className="flex items-center gap-3">
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C9A227]/15 text-[#C9A227]">
  ✓
</div>
    <span>Fusion Collection & Sterling Silver Articles</span>
  </div>


</div>
            {/* Buttons */}

<div className="mt-12 flex flex-wrap items-center gap-5">

  <Link
  href="#products"
  style={{ color: "#ffffff" }}
  className="inline-flex min-w-[240px] h-14 items-center justify-center rounded-2xl border border-[#C9A227] bg-[#4A0D1F] px-8 text-[17px] font-semibold tracking-wide shadow-[0_12px_35px_rgba(74,13,31,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5A1327]"
>
  Explore Collection
</Link>

  <a
    href="https://wa.me/918879528201"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex min-w-[240px] h-14 items-center justify-center rounded-2xl border border-[#C9A227] bg-[#FCF8F1] px-8 text-[17px] font-semibold tracking-wide text-[#4A0D1F] shadow-[0_12px_35px_rgba(201,162,39,0.10)] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
  >
    WhatsApp Catalogue
  </a>

</div>
          </div>
                    {/* RIGHT IMAGE */}

          <div className="relative">

            {/* Soft Glow */}
            <div className="absolute -inset-8 rounded-[48px] bg-[#C9A227]/15 blur-3xl" />

            {/* Image Card */}
            <div className="relative overflow-hidden rounded-l-[44px] shadow-[0_35px_90px_rgba(74,13,31,0.16)]">

              <Image
                src="/images/hero-v2.png"
                alt="Om Aradhana Silver Premium Collection"
                width={750}
                height={900}
                priority
className="h-full w-full object-cover object-right transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.05]"              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}