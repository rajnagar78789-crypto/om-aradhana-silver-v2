import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";

export default function Categories() {
  return (
    <section className="section bg-[#faf7f2]">
      <div className="container">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="inline-block rounded-full bg-[#C9A227]/20 px-5 py-2 text-sm font-semibold text-[#5A1020]">
            Our Collection
          </span>

          <h2 className="section-title mt-6">
            Explore Our Categories
          </h2>

          <p className="section-subtitle">
            Discover our complete range of premium silver collections
            specially crafted for jewellery showrooms, wholesalers and
            retailers across India.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

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