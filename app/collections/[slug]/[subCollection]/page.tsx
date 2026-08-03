import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import ProductCard from "@/components/ProductCard";
import LuxuryCollectionHero from "@/components/LuxuryCollectionHero";
import CollectionTrustBar from "@/components/CollectionTrustBar";

import { collections } from "@/data/collections";
import { subCollections } from "@/data/subCollections";
import { products } from "@/data/products";



type Props = {
  params: Promise<{
    slug: string;
    subCollection: string;
  }>;
};



export default async function SubCollectionPage({
  params,
}: Props) {


  const { slug, subCollection } = await params;



  const collection = collections.find(
    (item) => item.slug === slug
  );


  if (!collection) {
    notFound();
  }



  const currentSubCollection = subCollections.find(
    (item) =>
      item.collectionSlug === slug &&
      item.slug === subCollection
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
        image="/images/subcollections/ganesh-ka931-transparent.webp"
        backUrl={`/collections/${slug}`}
      />
      <CollectionTrustBar />





      {/* PRODUCTS */}

<section className="bg-[#F8F5F0] py-16">

  <div className="mx-auto max-w-[1500px] px-6 lg:px-8">

    {/* Heading */}

    <div className="mb-12">

      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A227]">
        Our Collection
      </p>

      <h2 className="mt-3 text-4xl font-black text-[#5A1020] lg:text-5xl">
        All {currentSubCollection.title} Designs
      </h2>

      <div className="mt-4 h-[2px] w-28 rounded-full bg-[#C9A227]" />

    </div>

    {items.length === 0 ? (

      <div className="rounded-3xl bg-white p-12 text-center">

        <h2 className="text-2xl font-bold text-[#5A1020]">
          No Products Found
        </h2>

        <p className="mt-3 text-gray-600">
          Products will be available soon.
        </p>

      </div>

    ) : (

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-8
          justify-items-center
        "
      >

        {items.map((product) => (

          <ProductCard
            key={product.sku}
            product={product}
          />

        ))}

      </div>

    )}

  </div>

</section>



    </main>

  );

}