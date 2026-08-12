import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";

export default function Categories() {
  return (
    <section
      id="categories"
      className="relative overflow-hidden bg-[#FAF7F2] py-28 border-t border-[#C9A227]/15"
    >
      {/* Subtle Luxury Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[#C9A227]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-16">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#8C6D18] mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(201,162,39,0.1)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227] animate-pulse" />
            Premium Collections
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#24050D] leading-[1.1]">
            <span className="block text-[#24050D]">
              Explore Our
            </span>
            <span className="mt-1 block italic font-light text-[#A4821E]">
              Collections
            </span>
          </h2>

          <p className="mx-auto mt-6 text-sm sm:text-base font-light leading-relaxed text-[#6B5B52]">
            Discover our handcrafted range of 
            <span className="font-medium text-[#24050D]"> 999 Silver Idols</span>, 
            <span className="font-medium text-[#24050D]"> 92.5 Antique Jewellery </span> 
            and premium silver collections, exclusively crafted for retail jewellery showrooms across India.
          </p>

        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>

      </div>
    </section>
  );
}