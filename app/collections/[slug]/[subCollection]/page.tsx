// @ts-nocheck
import { notFound } from "next/navigation";

import ProductCard from "@/components/ProductCard";
import LuxuryCollectionHero from "@/components/LuxuryCollectionHero";
import SubCollectionPDFButton from "@/components/v2/SubCollectionPDFButton";

import { collections } from "@/data/collections";
import { subCollections } from "@/data/subCollections";
import { client } from "@/sanity/lib/client"; 

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
  if (!collection) notFound();

  const currentSubCollection = subCollections.find(
    (item) => item.collectionSlug === slug && item.slug === subCollection
  );

  if (!currentSubCollection) notFound();

  const folderCategory = subCollection.replace(/-/g, "_"); 

  const sanityQuery = `*[_type == "idol" && (category match $subCollection || category match $folderCategory)] {
    _id,
    name,
    sku,
    category,
    weight,
    "imageUrl": image.asset->url
  }`;

  const sanityProducts = await client.fetch(sanityQuery, { 
    subCollection: subCollection,
    folderCategory: folderCategory
  });

  const items = sanityProducts.map((item: any) => ({
    id: item._id,
    slug: item._id, 
    name: item.name || "Om Aradhana VIP Idol", // Sirf Naam
    sku: item.sku || "",
    images: item.imageUrl ? [{ url: item.imageUrl, alt: item.name }] : [],
    image: item.imageUrl, 
    collectionId: slug, 
    subCollectionId: subCollection, 
    status: "Active",
    weight: item.weight || "", // Exact weight jo Sanity se aayega
    tags: [item.sku ? `CODE: ${item.sku}` : "999 SILVER VIP"]
  }));

  const bannerImage = items.length > 0 && items[0].image 
    ? items[0].image 
    : ((currentSubCollection as { image?: string }).image || "/images/subcollections/ganesh-ka931-transparent.webp");

  return (
    <main className="min-h-screen bg-[#150d11]">
      
      <LuxuryCollectionHero
        title={currentSubCollection.title}
        description="Explore our premium handcrafted VIP silver designs created for luxury retail showrooms."
        image={bannerImage}
        backUrl={`/collections/${slug}`}
      />

      <section className="relative overflow-hidden bg-[#150d11] py-20 border-t border-[#d4af37]/20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[800px] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                Our VIP Collection
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl font-normal text-white drop-shadow-lg">
                All {currentSubCollection.title} Designs
              </h2>
              <div className="mt-4 h-[1px] w-full max-w-[200px] bg-gradient-to-r from-[#d4af37]/60 to-transparent mx-auto sm:mx-0" />
            </div>

            <div className="flex justify-center sm:justify-end">
              <SubCollectionPDFButton title={currentSubCollection.title} products={items} />
            </div>
          </div>

          {items.length === 0 ? (
            <div className="rounded-3xl bg-black/40 border border-[#d4af37]/20 p-12 text-center shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <h2 className="font-serif text-2xl text-white">No VIP Products Found</h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.sku} product={product as any} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}