export default function ContactCTA() {
  return (
    <section className="bg-gradient-to-r from-[#5A1020] to-[#7A1B33] py-20">

      <div className="container mx-auto max-w-6xl px-6 text-center">

        <span className="rounded-full bg-[#C9A227]/20 px-5 py-2 text-sm font-semibold text-[#C9A227]">
          Trusted Wholesale Partner
        </span>

        <h2 className="mt-8 text-4xl font-bold text-white lg:text-5xl">
          Ready to Grow Your Jewellery Business?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-200">
          Join 1100+ retail jewellery showrooms across India.
          Get our latest wholesale catalogue and premium silver collection.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <a
            href="https://wa.me/918879528201"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-[#C9A227] px-8 py-4 text-lg font-bold text-[#5A1020] transition hover:scale-105"
          >
            📲 Get Wholesale Catalogue
          </a>

          <a
            href="https://wa.me/918879528201"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition hover:bg-white hover:text-[#5A1020]"
          >
            💬 WhatsApp Now
          </a>

        </div>

      </div>

    </section>
  );
}