import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";

export default function Categories() {
  return (
    <section
      id="categories"
      className="relative overflow-hidden bg-[#F8F5F0] py-28"
    >
      <div className="relative container mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-5 py-2 text-sm font-semibold text-[#8A6510]">
  <span className="h-2 w-2 rounded-full bg-[#C9A227]" />
  Premium Collections
</span>

          <h2 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] lg:text-6xl">
  <span className="block text-[#4A0D1F]">
    Explore Our
  </span>

  <span className="mt-2 block text-[#C9A227]">
    Collections
  </span>
</h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5F6470]">
  Discover our handcrafted range of
  <span className="font-semibold text-[#4A0D1F]">
    {" "}999 Silver Idols
  </span>,
  <span className="font-semibold text-[#4A0D1F]">
    {" "}92.5 Antique Jewellery
  </span>
  {" "}and premium silver collections, exclusively crafted for retail jewellery showrooms across India.
</p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

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