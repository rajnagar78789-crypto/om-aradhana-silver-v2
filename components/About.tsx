import Link from "next/link";

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#faf7f2] py-24"
    >
      <div className="container mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <div>

            <span className="inline-flex rounded-full bg-[#C9A227]/15 px-4 py-2 text-sm font-semibold text-[#5A1020]">
              About Om Aradhana Silver
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-[#5A1020] lg:text-5xl">
              Trusted Wholesale Partner
              <br />
              for Retail Jewellery Showrooms
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-600">
              Om Aradhana Silver has been supplying premium silver jewellery to
              retail jewellery showrooms across India for more than 5 years.
              Our focus is simple — premium quality, consistent finishing,
              timely delivery and long-term business relationships.
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              From 999 Hollow Idols and 92.5 Antique Jewellery to Fusion
              Jewellery and Sterling Silver Articles, we offer carefully
              selected collections that help jewellery retailers grow their
              business with confidence.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="#products"
                className="rounded-xl bg-[#5A1020] px-8 py-4 font-semibold text-white transition hover:bg-[#74192f]"
              >
                Browse Collection
              </Link>

              <a
                href="https://wa.me/918879528201?text=Hello%20Om%20Aradhana%20Silver,%20Please%20share%20your%20wholesale%20catalogue."
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border-2 border-[#5A1020] px-8 py-4 font-semibold text-[#5A1020] transition hover:bg-[#5A1020] hover:text-white"
              >
                WhatsApp Us
              </a>

            </div>

          </div>

          {/* Right */}
          <div className="grid gap-6">

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h3 className="text-4xl font-bold text-[#5A1020]">
                1100+
              </h3>

              <p className="mt-2 text-gray-600">
                Retail Jewellery Showrooms Served
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h3 className="text-4xl font-bold text-[#5A1020]">
                200+
              </h3>

              <p className="mt-2 text-gray-600">
                Premium Silver Designs
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h3 className="text-4xl font-bold text-[#5A1020]">
                5+
              </h3>

              <p className="mt-2 text-gray-600">
                Years of Industry Experience
              </p>
            </div>

            <div className="rounded-3xl bg-[#5A1020] p-8 text-white shadow-xl">
              <h3 className="text-3xl font-bold">
                PAN India Supply
              </h3>

              <p className="mt-3 text-gray-200">
                Reliable wholesale supply with dedicated business support for
                retail jewellery showrooms across India.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}