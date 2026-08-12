export type SubCategory = {
  title: string;
  slug: string;
  image?: string;
};

export type Collection = {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
  subcategories?: SubCategory[]; // 🔥 Yeh hai naya sub-categories ka field
};

export const collections: Collection[] = [
  {
    id: 1,
    title: "999 Hollow Idols",
    slug: "999-hollow-idols",
    image: "/images/products/idols.jpg",
    description: "Premium 999 Silver Hollow Idols Collection",
    subcategories: [
      { title: "Ganesh Ji Idols", slug: "ganesh-ji-idols" },
      { title: "Laxmi Ji Idols", slug: "laxmi-ji-idols" },
      { title: "Radha Krishna Idols", slug: "radha-krishna-idols" },
      { title: "Divine Sets", slug: "divine-sets" },
    ],
  },
  {
    id: 2,
    title: "92.5 Antique Jewellery",
    slug: "92-5-antique-jewellery",
    image: "/images/products/antique.jpg",
    description: "Exclusive Antique Silver Jewellery Collection",
    subcategories: [
      { title: "Antique Necklaces", slug: "antique-necklaces" },
      { title: "Antique Bangles", slug: "antique-bangles" },
      { title: "Antique Chokers", slug: "antique-chokers" },
      { title: "Antique Earrings", slug: "antique-earrings" },
    ],
  },
  {
    id: 3,
    title: "Fusion Collection",
    slug: "fusion-collection",
    image: "/images/products/fusion.jpg",
    description: "Modern Fusion Silver Jewellery Collection",
    subcategories: [
      { title: "Modern Fusion Sets", slug: "modern-fusion-sets" },
      { title: "Fusion Bracelets", slug: "fusion-bracelets" },
      { title: "Kundan Fusion", slug: "kundan-fusion" },
    ],
  },
  {
    id: 4,
    title: "Sterling Silver",
    slug: "sterling-silver",
    image: "/images/products/sterling.jpg",
    description: "Premium Sterling Silver Articles",
    subcategories: [
      { title: "Silver Articles", slug: "silver-articles" },
      { title: "Sterling Bangles", slug: "sterling-bangles" },
      { title: "Dinner Sets & Gifts", slug: "dinner-sets-gifts" },
    ],
  },
];