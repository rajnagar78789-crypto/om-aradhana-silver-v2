import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function FeaturedProducts() {
  return (
    <section
  id="products"
  className="bg-[#faf7f2] py-24"
>

      <div className="container mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-[#C9A227]/20 px-5 py-2 text-sm font-semibold text-[#5A1020]">
            Premium Collection
          </span>

          <h2 className="mt-6 text-4xl font-bold text-[#5A1020] lg:text-5xl">
            Featured Silver Collection
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore our carefully selected premium silver collections,
            trusted by
            <span className="font-semibold text-[#5A1020]">
              {" "}1100+ retail jewellery showrooms{" "}
            </span>
            across India.
          </p>

        </div>

        {/* Products */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </section>
  );
}