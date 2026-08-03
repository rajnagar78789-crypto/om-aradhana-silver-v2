import type { MetadataRoute } from "next";

import { collections } from "@/data/collections";
import { subCollections } from "@/data/subCollections";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://om-aradhana-silver-v2.vercel.app";

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const collectionPages: MetadataRoute.Sitemap =
    collections.map((collection) => ({
      url: `${baseUrl}/collections/${collection.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const subCollectionPages: MetadataRoute.Sitemap =
    subCollections.map((subCollection) => ({
      url: `${baseUrl}/collections/${subCollection.collectionSlug}/${subCollection.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const productPages: MetadataRoute.Sitemap = products
    .filter((product) => product.status === "Active")
    .map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...collectionPages,
    ...subCollectionPages,
    ...productPages,
  ];
}