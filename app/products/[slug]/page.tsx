// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { products } from "@/data/products";
import ProductInfoV2 from "@/components/v2/ProductInfoV2";
import ProductGalleryV2 from "@/components/v2/ProductGalleryV2";
import RelatedProductsV2 from "@/components/v2/RelatedProductsV2";
import { client } from "@/sanity/lib/client";

type Props = {
  params: Promise<{ slug: string }>;
};

// Smart Fetcher: Single Image + Gallery Support (No Variants Jhanjhat)
async function getProduct(slug: string) {
  // 1. Sanity query - Simple Main Image aur Gallery Fetch karega
  const sanityQuery = `*[_type == "product" && _id == $id][0] {
    _id, 
    title, 
    code, 
    category, 
    subCategory,
    weight, 
    description, 
    "imageUrl": image.asset->url,
    "gallery": gallery[].asset->url
  }`;
  
  const sanityProduct = await client.fetch(sanityQuery, { id: slug });

  // Agar Sanity me product mil gaya:
  if (sanityProduct) {
    // Main image aur gallery ki baki images ko ek array me combine kar do
    const allImages = [];
    if (sanityProduct.imageUrl) allImages.push(sanityProduct.imageUrl);
    if (sanityProduct.gallery && sanityProduct.gallery.length > 0) {
      allImages.push(...sanityProduct.gallery);
    }

    return {
      id: sanityProduct._id,
      slug: sanityProduct._id,
      name: sanityProduct.title,
      sku: sanityProduct.code,
      shortDescription: sanityProduct.description || "",
      images: allImages, // Main image + Diff angle photos
      collectionId: sanityProduct.category,
      subCollectionId: sanityProduct.subCategory || "",
      status: "Active",
      weight: sanityProduct.weight || ""
    };
  }

  // 2. Local Fallback (Purani static data wali file se)
  return products.find(
    (item) => item.slug === slug && item.status === "Active"
  );
}

/* Dynamic SEO Metadata */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: "Product Not Found | Om Aradhana Silver" };

  return {
    title: product.metaTitle || `${product.name} | Om Aradhana Silver`,
    description: product.metaDescription || product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  
  // Smart Fetch function execute
  const product = await getProduct(slug);

  if (!product) notFound();

  // Smart Related Products Logic
  let relatedProducts = products
    .filter(
      (item) =>
        item.sku !== product.sku &&
        item.subCollectionId === product.subCollectionId &&
        item.status === "Active"
    )
    .slice(0, 4);

  if (relatedProducts.length < 4) {
    const extraProducts = products.filter(
      (item) =>
        item.sku !== product.sku &&
        item.collectionId === product.collectionId &&
        !relatedProducts.some((r) => r.sku === item.sku) &&
        item.status === "Active"
    );
    relatedProducts = [...relatedProducts, ...extraProducts].slice(0, 4);
  }

  // Google Product Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images?.[0] || "",
    description: product.shortDescription,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "Om Aradhana Silver",
    },
  };

  return (
    <main className="min-h-screen bg-[#faf7f2] pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 lg:px-8 lg:py-10">
        
        {/* Breadcrumb Links */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex items-center gap-2 text-xs text-[#7A6B58] sm:text-sm">
          <Link href="/" className="transition hover:text-[#5A1020]">
            Home
          </Link>
          <span>/</span>
          {product.collectionId && (
            <>
              <Link
                href={`/collections/${product.collectionId.replace(/\s+/g, '-')}`}
                className="capitalize transition hover:text-[#5A1020]"
              >
                {product.collectionId.replace(/-/g, " ")}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="font-semibold text-[#5A1020] truncate max-w-[180px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Product Grid */}
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
          
          {/* Left: Gallery */}
          <div className="w-full lg:col-span-5 lg:sticky lg:top-28">
            <ProductGalleryV2 product={product as any} />
          </div>

          {/* Right: Info */}
          <div className="w-full min-w-0 lg:col-span-7">
            <ProductInfoV2 product={product as any} />
          </div>

        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto w-full max-w-[1380px] px-4 pt-8 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 border-t border-[#E8DCC3]" />
          <RelatedProductsV2 products={relatedProducts as any} />
        </section>
      )}
    </main>
  );
}