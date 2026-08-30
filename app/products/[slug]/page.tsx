// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import ProductInfoV2 from "@/components/v2/ProductInfoV2";
import ProductGalleryV2 from "@/components/v2/ProductGalleryV2";
import RelatedProductsV2 from "@/components/v2/RelatedProductsV2";
import { client } from "@/sanity/lib/client";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProduct(slug: string) {
  // 🔥 MASTER FIX: Ab yeh ID aur Slug dono check karega, aur 'product'/'idol' dono ko allow karega!
  const sanityQuery = `*[_type in ["product", "idol"] && (_id == $id || slug.current == $id)][0] {
    _id, 
    title,
    name,
    code,
    sku,
    category, 
    subCategory,
    weight, 
    description, 
    "imageUrl": image.asset->url,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    "imagesArray": images[].asset->url
  }`;
  
  const sanityProduct = await client.fetch(sanityQuery, { id: slug });

  if (!sanityProduct) return null;

  // 📸 Image Checker: Chahe purana product ho ya naya idol, photo nikaal lega
  const allImages = [];
  if (sanityProduct.imageUrl) allImages.push(sanityProduct.imageUrl);
  if (sanityProduct.mainImage && !allImages.includes(sanityProduct.mainImage)) allImages.push(sanityProduct.mainImage);
  
  if (sanityProduct.gallery && sanityProduct.gallery.length > 0) {
    allImages.push(...sanityProduct.gallery);
  }
  if (sanityProduct.imagesArray && sanityProduct.imagesArray.length > 0) {
    sanityProduct.imagesArray.forEach((img: string) => {
      if (!allImages.includes(img)) allImages.push(img);
    });
  }

  const rawWeight = sanityProduct.weight;
  const finalWeight = rawWeight ? (String(rawWeight).toLowerCase().includes('g') ? rawWeight : `${rawWeight}g`) : "";

  return {
    id: sanityProduct._id,
    slug: sanityProduct._id,
    name: sanityProduct.title || sanityProduct.name || "Om Aradhana VIP Masterpiece", 
    sku: sanityProduct.code || sanityProduct.sku || "",
    shortDescription: sanityProduct.description || "",
    images: allImages,
    collectionId: sanityProduct.category || "",
    subCollectionId: sanityProduct.subCategory || "",
    status: "Active",
    weight: finalWeight,
    tags: [sanityProduct.sku || sanityProduct.code ? `CODE: ${sanityProduct.sku || sanityProduct.code}` : "999 SILVER VIP"]
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found | Om Aradhana Silver" };
  return { title: `${product.name} | Om Aradhana Silver`, description: product.shortDescription };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  // Related Products
  const relatedQuery = `*[_type in ["product", "idol"] && category == $category && _id != $id][0...4] {
    _id, name, title, sku, code, category, subCategory, weight, "imageUrl": image.asset->url, "mainImage": mainImage.asset->url
  }`;
  const sanityRelated = await client.fetch(relatedQuery, { category: product.collectionId, id: product.id });

  const relatedProducts = sanityRelated.map((item: any) => {
    const rWeight = item.weight ? (String(item.weight).toLowerCase().includes('g') ? item.weight : `${item.weight}g`) : "";
    const rImg = item.imageUrl || item.mainImage;
    return {
      id: item._id, 
      slug: item._id, 
      name: item.title || item.name, 
      sku: item.sku || item.code, 
      images: rImg ? [{ url: rImg, alt: item.title || item.name }] : [], 
      collectionId: item.category, 
      subCollectionId: item.subCategory, 
      status: "Active", 
      weight: rWeight, 
      tags: [item.sku || item.code ? `CODE: ${item.sku || item.code}` : "999 SILVER VIP"]
    };
  });

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-20 pt-6">
      <section className="mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="w-full lg:col-span-5 lg:sticky lg:top-28">
            <ProductGalleryV2 product={product as any} />
          </div>
          <div className="w-full min-w-0 lg:col-span-7">
            <ProductInfoV2 product={product as any} />
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mx-auto w-full max-w-[1380px] px-4 pt-12 sm:px-6 lg:px-8">
          <div className="mb-10 border-t border-gray-200" />
          <RelatedProductsV2 products={relatedProducts as any} />
        </section>
      )}
    </main>
  );
}