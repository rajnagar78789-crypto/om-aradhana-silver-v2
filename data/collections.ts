export type Collection = {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
};

export const collections: Collection[] = [
  {
    id: 1,
    title: "999 Hollow Idols",
    slug: "999-hollow-idols",
    image: "/images/products/idols.jpg",
    description: "Premium 999 Silver Hollow Idols Collection",
  },
  {
    id: 2,
    title: "92.5 Antique Jewellery",
    slug: "92-5-antique-jewellery",
    image: "/images/products/antique.jpg",
    description: "Exclusive Antique Silver Jewellery Collection",
  },
  {
    id: 3,
    title: "Fusion Collection",
    slug: "fusion-collection",
    image: "/images/products/fusion.jpg",
    description: "Modern Fusion Silver Jewellery Collection",
  },
  {
    id: 4,
    title: "Sterling Silver",
    slug: "sterling-silver",
    image: "/images/products/sterling.jpg",
    description: "Premium Sterling Silver Articles",
  },
];