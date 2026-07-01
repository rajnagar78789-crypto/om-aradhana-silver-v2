export default function WhyChooseUs() {
  const features = [
    {
      title: "1100+ Retail Showrooms",
      desc: "Trusted by jewellery retailers across India for quality and long-term business.",
      icon: "🏢",
    },
    {
      title: "5+ Years Experience",
      desc: "Delivering premium silver jewellery with consistent quality and service.",
      icon: "⭐",
    },
    {
      title: "200+ Premium Designs",
      desc: "Wide collection of idols, antique jewellery, fusion jewellery and silver articles.",
      icon: "💎",
    },
    {
      title: "PAN India Supply",
      desc: "Reliable delivery network serving retail jewellery showrooms across India.",
      icon: "🚚",
    },
    {
      title: "GST Billing",
      desc: "Professional invoicing and transparent business transactions.",
      icon: "📄",
    },
    {
      title: "Business Support",
      desc: "Dedicated support to help our retail partners grow with confidence.",
      icon: "🤝",
    },
  ];

  return (
    <section id="why-us" className="bg-[#faf7f2] py-24">
      <div className="container mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="rounded-full bg-[#C9A227]/20 px-4 py-2 text-sm font-semibold text-[#5A1020]">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl font-bold text-[#5A1020] lg:text-5xl">
            Why Retail Showrooms Trust
            <br />
            Om Aradhana Silver
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            We believe in building long-term business relationships through
            premium quality, trusted service and consistent supply.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border border-[#eadfcb] bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A227] hover:shadow-2xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5A1020] text-3xl">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-[#5A1020]">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}