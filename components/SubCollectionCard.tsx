import Image from "next/image";
import Link from "next/link";
import type { SubCollection } from "@/data/subCollections";

type Props = {
  collectionSlug: string;
  item: SubCollection;
};

export default function SubCollectionCard({
  collectionSlug,
  item,
}: Props) {
  return (
    <Link
      href={`/collections/${collectionSlug}/${item.slug}`}
      className="group overflow-hidden rounded-[30px] border border-[#E9DDC6] bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A227] hover:shadow-2xl"
    >
      <div className="relative h-80 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-3xl font-bold text-white">
            {item.title}
          </h2>

          <p className="mt-2 text-white/90">
            Explore Designs →
          </p>
        </div>
      </div>
    </Link>
  );
}