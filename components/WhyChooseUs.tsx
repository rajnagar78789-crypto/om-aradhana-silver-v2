export default function WhyChooseUs() {
  const features = [
    {
      title: "Premium Quality",
      description:
        "92.5 Sterling Silver & 999 Silver products with premium finishing.",
    },
    {
      title: "Wholesale Pricing",
      description:
        "Best wholesale prices for jewellery showrooms across India.",
    },
    {
      title: "Latest Designs",
      description:
        "Regularly updated antique, fusion and idol collections.",
    },
    {
      title: "Trusted Supplier",
      description:
        "Reliable service, timely delivery and long-term business relationships.",
    },
  ];

  return (
    <section className="bg-[#faf7f2] py-20">
      <div className="container">
        <div className="mb-14 text-center">
          <h2 className="text-5xl font-bold text-[#5A1020]">
            Why Choose Om Aradhana Silver?
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Trusted wholesale partner for premium silver jewellery.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-[#5A1020]">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}