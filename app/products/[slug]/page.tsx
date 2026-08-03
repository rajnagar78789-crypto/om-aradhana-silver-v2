  import type { Metadata } from "next";
  import { notFound } from "next/navigation";

  import { products } from "@/data/products";

  import ProductInfo from "@/components/ProductInfo";
  import ProductGallery from "@/components/ProductGallery";
  import RelatedProducts from "@/components/RelatedProducts";

  type Props = {
    params: Promise<{
      slug: string;
    }>;
  };

  /* =========================================================
    DYNAMIC PRODUCT SEO
  ========================================================= */

  export async function generateMetadata({
    params,
  }: Props): Promise<Metadata> {
    const { slug } = await params;

    const product = products.find(
      (item) =>
        item.slug === slug &&
        item.status === "Active"
    );

    if (!product) {
      return {
        title: "Product Not Found | Om Aradhana Silver",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const title =
      product.metaTitle ||
      `${product.name} | Om Aradhana Silver`;

    const description =
      product.metaDescription ||
      product.shortDescription;

    const image = product.images[0];

    return {
      title,
      description,

      keywords: [
        product.name,
        product.sku,
        product.material,
        product.finish,
        ...product.tags,
        "Om Aradhana Silver",
        "Wholesale Silver Jewellery",
      ],

      openGraph: {
        title,
        description,
        type: "website",
        siteName: "Om Aradhana Silver",

        images: image
          ? [
              {
                url: image.url,
                alt: image.alt || product.name,
              },
            ]
          : [],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,

        images: image
          ? [image.url]
          : [],
      },
    };
  }

  /* =========================================================
    PRODUCT PAGE
  ========================================================= */

  export default async function ProductPage({
    params,
  }: Props) {
    const { slug } = await params;

    // Find Product
    const product = products.find(
      (item) =>
        item.slug === slug &&
        item.status === "Active"
    );

    if (!product) {
      notFound();
    }

    // Related Products
    const relatedProducts = products
      .filter(
        (item) =>
          item.sku !== product.sku &&
          item.subCollectionId === product.subCollectionId &&
          item.status === "Active"
      )
      .slice(0, 3);

    return (
      <main className="min-h-screen bg-[#faf7f2]">

        {/* Product Section */}
        <section className="mx-auto w-full max-w-[1450px] px-6 pt-20 pb-24 sm:px-8 lg:px-12 lg:pt-24 lg:pb-28">

          <div className="grid items-start gap-16 lg:grid-cols-[1fr_0.9fr] lg:gap-24">

            {/* Left - Product Gallery */}
            <div className="relative flex justify-center">

              {/* Soft Gold Glow */}
              <div className="pointer-events-none absolute inset-10 rounded-full bg-[#C9A227]/10 blur-3xl" />

              <div className="relative w-full max-w-[700px]">
  <ProductGallery
    product={product}
  />
</div>

            </div>

            {/* Right - Product Information */}
            <div className="min-w-0 lg:pt-2">
              <ProductInfo product={product} />
            </div>

          </div>

        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mx-auto w-full max-w-[1450px] px-5 pb-16 pt-8 sm:px-8 lg:px-10 lg:pb-24 lg:pt-14">

            <div className="mb-10 border-t border-[#eadfcb]" />

            <RelatedProducts products={relatedProducts} />

          </section>
        )}

      </main>
    );
  }