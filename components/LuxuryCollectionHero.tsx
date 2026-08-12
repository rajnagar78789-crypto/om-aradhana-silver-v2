import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  image: string;
  backUrl: string;
};

export default function LuxuryCollectionHero({
  title,
  description,
  image,
  backUrl,
}: Props) {
  // WhatsApp direct message link setup
  const whatsappNumber = "918879528201";
  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in wholesale catalogue for ${title} collection.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="relative overflow-hidden bg-[#16050A] text-white">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0">
        <div className="absolute -left-52 top-20 h-[600px] w-[600px] rounded-full bg-[#C9A227]/15 blur-[170px]" />
        <div className="absolute right-[-150px] top-0 h-[650px] w-[650px] rounded-full bg-[#7A1835]/40 blur-[180px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
        <div className="absolute left-[-180px] top-10 h-[600px] w-[600px] opacity-[0.08] bg-[url('/patterns/mandala.svg')] bg-contain bg-no-repeat" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 px-6 pt-20 pb-24 lg:grid-cols-2 lg:px-14">
        
        {/* LEFT CONTENT */}
        <div className="relative z-10">
          <Link
            href={backUrl}
            className="inline-flex items-center rounded-full border border-[#C9A227]/50 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] backdrop-blur-md transition-colors hover:border-[#C9A227]"
          >
            ← Back to Premium Collection
          </Link>

          {/* LUXURY SERIF TITLE */}
          <h1 className="mt-8 font-serif text-6xl font-normal leading-[0.95] tracking-tight text-[#FFF9F0] drop-shadow-[0_10px_40px_rgba(201,162,39,0.15)] lg:text-8xl">
            {title}
          </h1>

          {/* GOLD ORNAMENT */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-24 bg-[#C9A227]" />
            <span className="text-xl text-[#C9A227]">✦</span>
            <div className="h-px w-24 bg-[#C9A227]" />
          </div>

          <p className="mt-8 max-w-xl text-xl leading-9 text-white/70 font-light">
            {description}
          </p>

          {/* PREMIUM HIGHLIGHTS */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl text-[#C9A227]">✧</p>
              <p className="mt-2 text-sm text-white/90 font-light">
                100%<br />Hallmarked Silver
              </p>
            </div>

            <div className="border-x border-[#C9A227]/30 text-center">
              <p className="text-3xl text-[#C9A227]">◈</p>
              <p className="mt-2 text-sm text-white/90 font-light">
                Premium<br />Finishing
              </p>
            </div>

            <div className="text-center">
              <p className="text-3xl text-[#C9A227]">✤</p>
              <p className="mt-2 text-sm text-white/90 font-light">
                Crafted By<br />Expert Artisans
              </p>
            </div>
          </div>

          {/* PREMIUM GOLD GRADIENT WHATSAPP BUTTON (As Anchor Link) */}
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#DFBA4E] to-[#C9A227] px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#16050A] shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(201,162,39,0.5)]"
            >
              <svg className="h-5 w-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE - Seamless & Borderless Luxury */}
        <div className="relative flex justify-center items-center">
          {/* Rich Soft Gold & Wine Glows behind the Murti */}
          <div className="absolute h-[500px] w-[500px] rounded-full bg-[#C9A227]/25 blur-[160px]" />
          <div className="absolute right-0 h-[450px] w-[450px] rounded-full bg-[#7A1835]/40 blur-[160px]" />

          {/* Clean Borderless Ganesh Container */}
          <div className="relative h-[600px] w-full max-w-lg translate-y-[-10px]">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-contain scale-[1.18] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
            
            {/* Soft Floor Lighting for 3D realism */}
            <div className="absolute bottom-10 left-1/2 h-16 w-60 -translate-x-1/2 rounded-full bg-[#C9A227]/40 blur-3xl" />
          </div>
        </div>

      </div>
    </section>
  );
}