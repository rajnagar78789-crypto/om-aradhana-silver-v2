import {
  Building2,
  Award,
  Gem,
  Truck,
  FileText,
  Handshake,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
  {
    title: "1100+ Retail Showrooms",
    desc: "Trusted by jewellery retailers across India for quality and long-term business.",
    icon: Building2,
  },
  {
    title: "5+ Years Experience",
    desc: "Delivering premium silver jewellery with consistent quality and service.",
    icon: Award,
  },
  {
    title: "200+ Premium Designs",
    desc: "Wide collection of idols, antique jewellery, fusion jewellery and silver articles.",
    icon: Gem,
  },
  {
    title: "PAN India Supply",
    desc: "Reliable delivery network serving retail jewellery showrooms across India.",
    icon: Truck,
  },
  {
    title: "GST Billing",
    desc: "Professional invoicing and transparent business transactions.",
    icon: FileText,
  },
  {
    title: "Business Support",
    desc: "Dedicated support to help our retail partners grow with confidence.",
    icon: Handshake,
  },
];

  return (
    <section id="why-us" className="bg-[#faf7f2] py-24">
      <div className="container mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-white px-5 py-2 text-sm font-semibold tracking-[0.15em] uppercase text-[#8B6A18] shadow-lg">
  <span className="h-2 w-2 rounded-full bg-[#C9A227]" />
  Our Advantages
</span>

          <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.04em] text-[#4A0D1F] lg:text-5xl">
  Built for Retail
  <br />
  Jewellery Showrooms
</h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
  Designed to help retail jewellery showrooms grow with premium silver
  collections, reliable supply, GST billing and dedicated wholesale
  support.
</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border border-[#E9DDC6] bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-[#C9A227] hover:ring-1 hover:ring-[#C9A227]/30 hover:shadow-[0_25px_70px_rgba(201,162,39,0.22)]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5A1020] text-white transition-all duration-300 group-hover:bg-[#C9A227] group-hover:text-[#5A1020]">

  <item.icon size={28} strokeWidth={2.2} />

</div>

              <h3 className="text-[24px] font-bold leading-tight text-[#5A1020]">
                {item.title}
              </h3>

              <p className="mt-4 min-h-[84px] text-[16px] leading-7 text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}