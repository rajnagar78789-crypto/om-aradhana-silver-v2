// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { collections } from "@/data/collections";
import { subCollections } from "@/data/subCollections"; 
import SubCollectionCard from "@/components/SubCollectionCard"; 
import { client } from "@/sanity/lib/client";
import CategoryPDFDownloadButton from "@/components/v2/CategoryPDFDownloadButton";
// 👇 Apna naya Smart Filter Grid Import kiya
import FilteredSanityGrid from "@/components/v2/FilteredSanityGrid"; 

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Sanity Data Fetching (Variants + Root imageUrl fallback for safety)
async function getProductsByCategory(categorySlug: string) {
  try {
    const query = `*[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      code,
      category,
      subCategory, 
      description,
      weight,    // 🔥 YEH ADD KIYA: Frontend par weight dikhane ke liye
      audience,  // 🔥 YEH ADD KIYA: Smart Filters (Mens/Womens) chalane ke liye
      variants[]{
        weight,
        sku,
        "imageUrl": image.asset->url
      },
      // 🔥 Coalesce: Pehle variants check karega, agar nahi mila toh purani 'image' utha lega
      "imageUrl": coalesce(variants[0].image.asset->url, image.asset->url)
    }`;
    
    const allProducts = await client.fetch(query, {}, { cache: "no-store" });
    const cleanSlug = decodeURIComponent(categorySlug).toLowerCase().replace(/[^a-z0-9]/g, '');

    return allProducts.filter((item: any) => {
      if (!item.category) return false;
      const cleanItemCategory = item.category.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanItemCategory === cleanSlug;
    });
  } catch (error) {
    return [];
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const collection = collections.find((item) => item.slug === slug || item.slug === decodedSlug);

  if (!collection) return { title: "Not Found" };

  return {
    title: `${collection.title} | Om Aradhana Silver`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const collection = collections.find((item) => item.slug === slug || item.slug === decodedSlug);

  if (!collection) notFound();

  // Local Murtis
  const localItems = subCollections.filter(
    (item) => item.collectionSlug === slug || item.collectionSlug === decodedSlug
  );

  // Sanity Antique Items
  const sanityItems = await getProductsByCategory(slug);
  const totalCount = localItems.length + sanityItems.length;

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#FAF7F2] text-[#24050D]">
      
      <section className="relative overflow-hidden bg-gradient-to-b from-[#24050D] via-[#24050D]/95 to-[#FAF7F2] text-[#F8F5F0] pt-12 pb-16 sm:pt-16 sm:pb-24">
        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#D2C5B0] transition-colors hover:text-[#E6CA65]"
              >
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </Link>
              <span className="text-[#C9A227]/40">/</span>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/15 px-3 sm:px-4 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E6CA65] backdrop-blur-md shadow-[0_0_20px_rgba(201,162,39,0.15)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227] animate-pulse" />
                Premium Collection
              </div>
            </div>

            <CategoryPDFDownloadButton 
              collection={collection as any} 
              items={(localItems.length > 0 ? localItems : sanityItems) as any} 
            />
          </div>

          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F8F5F0] leading-[1.1]">
              {collection.title}
            </h1>
            <p className="mt-4 text-sm sm:text-lg font-light leading-relaxed text-[#D2C5B0] max-w-2xl">
              {collection.description || "Exclusively crafted in certified 999 pure silver with lightweight hollow technology, designed for elite retail showcases across India."}
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl p-2.5 sm:p-3 rounded-2xl bg-white/[0.06] border border-[#C9A227]/30 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl bg-[#24050D]/60 border border-[#C9A227]/15">
              <span className="font-serif text-2xl font-bold text-[#E6CA65]">{totalCount}+</span>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">Exclusive</span>
                <span className="text-xs font-medium text-[#F8F5F0]">Master Designs</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl bg-[#24050D]/60 border border-[#C9A227]/15">
              <span className="font-serif text-2xl font-bold text-[#E6CA65]">2100+</span>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">Trusted</span>
                <span className="text-xs font-medium text-[#F8F5F0]">Retail Showrooms</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl bg-[#24050D]/60 border border-[#C9A227]/15">
              <span className="font-serif text-2xl font-bold text-[#E6CA65]">PAN</span>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#C9A227]">Express</span>
                <span className="text-xs font-medium text-[#F8F5F0]">India Supply</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-16 py-12 sm:py-20">
        {totalCount === 0 ? (
          <div className="rounded-3xl bg-white border border-[#E6DEC9] p-8 sm:p-12 text-center shadow-[0_10px_30px_rgba(36,5,13,0.04)]">
            <h2 className="font-serif text-2xl font-medium text-[#24050D]">
              No Products Found
            </h2>
            <p className="mt-2 text-xs font-light text-[#6B5B52]">
              New designs will be updated soon.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* 1. Purani Murtis as it is dikhengi */}
            {localItems.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {localItems.map((item) => (
                  <SubCollectionCard
                    key={item.id}
                    collectionSlug={slug}
                    item={item as any}
                  />
                ))}
              </div>
            )}

            {/* 2. Sanity Products with Smart Filters! (Magic here) */}
            {sanityItems.length > 0 && (
              <FilteredSanityGrid items={sanityItems} />
            )}
          </div>
        )}
      </section>
    </main>
  );
}