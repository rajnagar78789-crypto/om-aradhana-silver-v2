import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function FeaturedProducts() {
  return (
    <section
  id="products"
  className="relative overflow-hidden bg-[#F8F5F0] py-32"
>
  <div className="absolute inset-0">
  <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#C9A227]/8 blur-3xl" />
  <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#5A1020]/5 blur-3xl" />
</div>

      <div className="container mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-4xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-white/80 px-5 py-2 text-sm font-semibold tracking-[0.15em] uppercase text-[#8B6A18] shadow-lg backdrop-blur-sm">
  <span className="h-2 w-2 rounded-full bg-[#C9A227]" />
  Featured Products
</span>
          <h2 className="mt-6 text-5xl font-black leading-[1.05] tracking-[-0.05em] lg:text-6xl">
  <span className="block text-[#4A0D1F]">
    Best Selling
  </span>

  <span className="mt-2 block text-[#C9A227]">
    Silver Designs
  </span>
</h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#5F6470]">
  Explore our most loved silver designs, handcrafted with premium quality and
  trusted by
  <span className="font-semibold text-[#5A1020]">
    {" "}2000+ RETAIL PARTNERS
  </span>
  across India.
</p>

        </div>

        {/* Products */}

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

          {products.map((product) => (
            <ProductCard
              key={product.sku}
              product={product}
            />
          ))}

        </div>
        <div className="mt-16 flex justify-center">
  <a
    href="https://wa.me/91XXXXXXXXXX"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full bg-[#5A1020] px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#C9A227] hover:text-[#5A1020]"
  >
    View Full WhatsApp Catalogue
  </a>
</div>

      </div>

    </section>
  );
}