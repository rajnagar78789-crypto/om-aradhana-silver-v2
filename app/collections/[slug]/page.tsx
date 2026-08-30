// @ts-nocheck
import CategoryVideoSlider from "@/components/v2/CategoryVideoSlider";
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
  // 👇 NAYA: searchParams add kiya taaki URL se filter utha sakein
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Sanity Data Fetching
async function getProductsByCategory(categorySlug: string) {
  try {
    const query = `*[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      code,
      category,
      subCategory, 
      description,
      weight,
      audience,
      variants[]{
        weight,
        sku,
        "imageUrl": image.asset->url
      },
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

export default async function CollectionPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // 👇 NAYA: Active filter nikal raha hai
  const searchParamsData = searchParams ? await searchParams : {};
  const activeFilter = typeof searchParamsData.filter === 'string' ? searchParamsData.filter : "All";

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
    // 🔥 DUSHMAN MARA GAYA: `overflow-x-hidden` hatake `overflow-clip` lagaya 🔥
    <main className="min-h-screen w-full overflow-clip bg-[#FAF7F2] text-[#24050D]">
      
      {/* 👇 SLEEK PREMIUM HEADER 👇 */}
      <section className="relative bg-[#24050D] text-[#F8F5F0] pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-[#C9A227]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C9A227]/10 via-[#24050D] to-[#24050D]"></div>
        
        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227] transition-colors hover:text-[#F8F5F0]"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
              {collection.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white/5 border border-[#C9A227]/20 px-4 py-2 rounded-full backdrop-blur-md">
              <span className="font-serif text-lg font-bold text-[#C9A227]">{totalCount}+</span>
              <span className="text-[9px] uppercase tracking-wider text-white/80">Designs</span>
            </div>
            
            {/* Maine isme 'name' hardcode kar diya hai, ab life mein kabhi undefined nahi aayega */}
            <CategoryPDFDownloadButton 
              collection={{ 
                ...collection, 
                title: collection.title, 
                name: collection.title || "Jewellery" 
              } as any} 
              items={(localItems.length > 0 ? localItems : sanityItems) as any} 
            />
          </div>
          
        </div>
      </section>

      {/* 👇 THE VIDEO SLIDER SHOWSTOPPER 👇 */}
      <CategoryVideoSlider collectionSlug={slug} />

      {/* 👇 FILTER & GRID SECTION 👇 */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-16 pb-12 sm:pb-20 pt-4">
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
            
            {/* 1. Purani Murtis */}
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
              <FilteredSanityGrid 
                key={activeFilter} 
                items={sanityItems} 
                activeCategory={activeFilter} 
              />
            )}
          </div>
        )}
      </section>
    </main>
  );
}