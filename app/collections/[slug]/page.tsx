import { notFound } from "next/navigation";
import Link from "next/link";

import { collections } from "@/data/collections";
import { subCollections } from "@/data/subCollections";

import SubCollectionCard from "@/components/SubCollectionCard";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;

  const collection = collections.find(
    (item) => item.slug === slug
  );

  if (!collection) {
    notFound();
  }

  const items = subCollections.filter(
    (item) => item.collectionSlug === slug
  );

  return (
    <main className="min-h-screen bg-[#F8F5F0]">

      {/* Header */}

<section className="relative overflow-hidden border-b border-[#ECE2D0] bg-[#F8F5F0]">

   {/* Background Glow */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[#C9A227]/10 blur-[120px]" />
    <div className="absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-[#5A1020]/5 blur-[120px]" />
  </div>
        <div className="relative container mx-auto max-w-7xl px-6 pt-56 pb-20">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#5A1020] shadow-md">
  <span className="h-2 w-2 rounded-full bg-[#C9A227]" />
  <Link
  href="/"
  className="mt-8 block text-sm font-medium text-[#5A1020] transition hover:text-[#C9A227]"
>
  ← Back to Home
</Link>
  Premium Collection
</div>



          

<h1 className="mt-5 text-5xl font-black leading-[1.05] tracking-[-0.03em] text-[#5A1020] lg:text-6xl">
  {collection.title}
</h1>

<p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 lg:text-xl">
  {collection.description}
</p>

<div className="mt-12 flex flex-wrap gap-5">

  <div className="rounded-3xl border border-[#E8D8B8] bg-white px-7 py-6 shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(90,16,32,0.12)]">
    <p className="text-4xl font-black tracking-[-0.03em] text-[#5A1020]">
      {items.length}+
    </p>

    <p className="mt-2 text-sm font-medium tracking-wide text-gray-500">
      Exclusive Designs
    </p>
  </div>

  <div className="rounded-2xl border border-[#E8D8B8] bg-white px-7 py-6 shadow-md">
    <p className="text-3xl font-bold text-[#5A1020]">
      1100+
    </p>

    <p className="text-sm text-gray-600">
      Retail Showrooms
    </p>
  </div>

  <div className="rounded-2xl border border-[#E8D8B8] bg-white px-7 py-6 shadow-md">
    <p className="text-3xl font-bold text-[#5A1020]">
      PAN
    </p>

    <p className="text-sm text-gray-600">
      India Supply
    </p>
  </div>

</div>

        </div>

      </section>

      {/* Sub Collections */}

      <section className="container mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {items.map((item) => (
            <SubCollectionCard
              key={item.id}
              collectionSlug={slug}
              item={item}
            />
          ))}

        </div>

      </section>

    </main>
  );
}