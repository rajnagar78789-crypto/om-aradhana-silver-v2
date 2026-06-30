import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="section bg-[#faf7f2]">

      <div className="container">

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="inline-block rounded-full bg-[#C9A227]/20 px-5 py-2 text-sm font-semibold text-[#5A1020]">
            Our Collection
          </span>

          <h2 className="section-title mt-6">
            Featured Silver Collection
          </h2>

          <p className="section-subtitle">
            Explore our premium range of 999 Silver Idols,
            92.5 Antique Jewellery, Fusion Collection,
            Turkey Kada, Payal and Sterling Silver Articles
            crafted for jewellery showrooms across India.
          </p>

        </div>

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