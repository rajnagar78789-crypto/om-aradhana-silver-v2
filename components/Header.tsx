import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#5A1020]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Om Aradhana Silver"
            width={55}
            height={55}
            priority
            className="rounded-full"
          />

          <div>
            <h1 className="text-3xl font-bold text-white">
              Om Aradhana Silver
            </h1>

            <p className="text-sm font-medium tracking-wide text-[#C9A227]">
              Ahmedabad • Mumbai
            </p>
          </div>
        </a>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 lg:flex">
          {["Home", "Products", "Categories", "About", "Contact"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="font-medium text-white transition duration-300 hover:text-[#C9A227]"
              >
                {item}
              </a>
            )
          )}
        </nav>

        {/* Button */}
        <button className="rounded-xl bg-[#C9A227] px-6 py-3 font-semibold text-[#5A1020] transition-all duration-300 hover:scale-105 hover:shadow-lg">
          Enquiry Now
        </button>
      </div>
    </header>
  );
}