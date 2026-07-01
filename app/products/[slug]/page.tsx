import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { products } from "@/data/products";

import ProductInfo from "@/components/ProductInfo";
import RelatedProducts from "@/components/RelatedProducts";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);
      return (
    <main className="min-h-screen bg-[#faf7f2]">

      {/* Breadcrumb */}
      <section className="border-b border-[#ece2d0] bg-white">
        <div className="container mx-auto max-w-7xl px-6 py-5">

          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-[#5A1020]"
          >
            ← Back to Collection
          </Link>

        </div>
      </section>

      {/* Product */}
      <section className="container mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-16 lg:grid-cols-2">

          {/* Left */}
          <div>

            <div className="overflow-hidden rounded-[32px] border border-[#eadfcb] bg-white shadow-2xl">

              <div className="relative aspect-square">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition duration-700 hover:scale-105"
                />

              </div>

            </div>

          </div>

          {/* Right */}
          <ProductInfo product={product} />

        </div>

      </section>
            {/* Related Products */}
      <section className="container mx-auto max-w-7xl px-6">
        <RelatedProducts products={relatedProducts} />
      </section>

    </main>
  );
}