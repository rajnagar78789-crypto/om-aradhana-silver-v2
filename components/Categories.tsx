import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";

export default function Categories() {
  return (
    <section
      id="categories"
      className="bg-white py-24"
    >
      <div className="container mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-[#C9A227]/20 px-5 py-2 text-sm font-semibold text-[#5A1020]">
            Premium Collections
          </span>

          <h2 className="mt-6 text-4xl font-bold text-[#5A1020] lg:text-5xl">
            Explore Our Silver Collections
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Carefully curated premium silver collections trusted by
            <span className="font-semibold text-[#5A1020]">
              {" "}1100+ retail jewellery showrooms{" "}
            </span>
            across India.
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