// @ts-nocheck
import { notFound } from "next/navigation";

import ProductCard from "@/components/ProductCard";
import LuxuryCollectionHero from "@/components/LuxuryCollectionHero";
import CollectionTrustBar from "@/components/CollectionTrustBar";
// Apna naya button import kiya
import SubCollectionPDFButton from "@/components/v2/SubCollectionPDFButton";

import { collections } from "@/data/collections";
import { subCollections } from "@/data/subCollections";
import { products } from "@/data/products";

type Props = {
  params: Promise<{
    slug: string;
    subCollection: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug, subCollection } = await params;
  const currentSubCollection = subCollections.find(
    (item) => item.collectionSlug === slug && item.slug === subCollection
  );

  if (!currentSubCollection) return { title: "Not Found" };

  return {
    title: `${currentSubCollection.title} | Om Aradhana Silver`,
    description: `Explore premium handcrafted ${currentSubCollection.title} designs for luxury retail showrooms.`,
  };
}

export default async function SubCollectionPage({ params }: Props) {
  const { slug, subCollection } = await params;

  const collection = collections.find((item) => item.slug === slug);
  if (!collection) {
    notFound();
  }

  const currentSubCollection = subCollections.find(
    (item) => item.collectionSlug === slug && item.slug === subCollection
  );

  if (!currentSubCollection) {
    notFound();
  }

  const items = products.filter(
    (product) =>
      product.collectionId === slug &&
      product.subCollectionId === subCollection
  );

  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      {/* LUXURY HERO */}
      <LuxuryCollectionHero
        title={currentSubCollection.title}
        description="Explore our premium handcrafted silver designs created for luxury retail showrooms."
        image={
          (currentSubCollection as { image?: string }).image ||
          "/images/subcollections/ganesh-ka931-transparent.webp"
        }
        backUrl={`/collections/${slug}`}
      />
      <CollectionTrustBar />

      {/* PRODUCTS SECTION */}
      <section className="bg-[#FAF7F2] py-20 border-t border-[#C9A227]/10">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6D18] backdrop-blur-md mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227] animate-pulse" />
                Our Collection
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl font-normal text-[#24050D]">
                All {currentSubCollection.title} Designs
              </h2>
              <div className="mt-4 h-[1px] w-full max-w-[200px] bg-gradient-to-r from-[#C9A227]/60 to-transparent mx-auto sm:mx-0" />
            </div>

            {/* 👇 Yahan Apna Naya PDF Button Laga Diya */}
            <div className="flex justify-center sm:justify-end">
              <SubCollectionPDFButton 
                title={currentSubCollection.title} 
                products={items} 
              />
            </div>
          </div>

          {items.length === 0 ? (
            <div className="rounded-3xl bg-white border border-[#E6DEC9] p-12 text-center shadow-sm">
              <h2 className="font-serif text-2xl text-[#24050D]">
                No Products Found
              </h2>
              <p className="mt-3 text-sm font-light text-[#6B5B52]">
                New designs will be updated soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}