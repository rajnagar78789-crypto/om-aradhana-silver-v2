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

            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-white px-5 py-2 text-sm font-semibold tracking-[0.15em] uppercase text-[#8B6A18] shadow-lg">
              Trusted Since 2020
            </span>

            <h2 className="mt-6 text-5xl font-black leading-[1.05] tracking-[-0.03em] text-[#5A1020] lg:text-6xl">
  Trusted Wholesale
  <br />
  Partner for Retail
  <br />
  Jewellery Showrooms
</h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-gray-600">
  For over 5 years, Om Aradhana Silver has been helping retail jewellery
  showrooms across India with premium silver collections, reliable supply
  and long-term business partnerships built on trust and consistency.
</p>

        

            <div className="mt-10">

             

              <a
                href="https://wa.me/918879528201?text=Hello%20Om%20Aradhana%20Silver,%20Please%20share%20your%20wholesale%20catalogue."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 min-w-[260px] items-center justify-center rounded-2xl border border-[#C9A227] bg-white px-8 text-base font-semibold text-[#5A1020] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5A1020] hover:text-white"
              >
                Get Wholesale Catalogue
              </a>

            </div>

          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-6">

            <div className="flex min-h-[170px] flex-col justify-center rounded-3xl border border-[#E9DDC6] bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

  <h3 className="text-5xl font-black text-[#5A1020]">
    1100+
  </h3>

  <p className="mt-3 text-sm font-medium leading-6 text-gray-600">
    Retail Jewellery
    <br />
    Showrooms
  </p>

</div>

            <div className="flex min-h-[170px] flex-col justify-center rounded-3xl border border-[#E9DDC6] bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

  <h3 className="text-5xl font-black text-[#5A1020]">
    200+
  </h3>

  <p className="mt-3 text-sm font-medium leading-6 text-gray-600">
    Premium Silver
    <br />
    Designs
  </p>

</div>

            <div className="flex min-h-[170px] flex-col justify-center rounded-3xl border border-[#E9DDC6] bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

  <h3 className="text-5xl font-black text-[#5A1020]">
    5+
  </h3>

  <p className="mt-3 text-sm font-medium leading-6 text-gray-600">
    Years of Industry
    <br />
    Experience
  </p>

</div>

            <div className="flex min-h-[170px] flex-col justify-center rounded-3xl border border-[#E9DDC6] bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

  <h3 className="text-4xl font-black text-[#5A1020]">
    PAN India
  </h3>

  <p className="mt-3 text-sm font-medium leading-6 text-gray-600">
    Reliable Supply
    <br />
    Network
  </p>

</div>

          </div>

        </div>

      </div>
    </section>
  );
}