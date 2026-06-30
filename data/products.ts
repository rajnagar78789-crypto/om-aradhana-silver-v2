export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  image: string;
  shortDescription: string;
  description: string;
  features: string[];
};

export const products: Product[] = [
  {
    id: 1,
    slug: "999-hollow-idols",
    name: "999 Hollow Idols",
    category: "999 Silver",
    image: "/images/products/idols.jpg",
    shortDescription:
      "Premium 999 Silver Hollow Idols for jewellery showrooms.",
    description:
      "Our 999 Hollow Silver Idols are crafted with premium finishing and elegant designs. Perfect for wholesale jewellery showrooms across India.",
    features: [
      "999 Pure Silver",
      "Premium Finish",
      "Light Weight",
      "Wholesale Available",
    ],
  },
  {
    id: 2,
    slug: "92-5-antique-jewellery",
    name: "92.5 Antique Jewellery",
    category: "Antique",
    image: "/images/products/antique.jpg",
    shortDescription:
      "Luxury antique jewellery with premium craftsmanship.",
    description:
      "Beautiful handcrafted antique jewellery collection designed for modern jewellery showrooms with elegant finishing.",
    features: [
      "92.5 Sterling Silver",
      "Antique Finish",
      "Premium Quality",
      "Wholesale Available",
    ],
  },
  {
    id: 3,
    slug: "fusion-collection",
    name: "Fusion Collection",
    category: "Fusion",
    image: "/images/products/fusion.jpg",
    shortDescription:
      "Stylish fusion jewellery with modern elegance.",
    description:
      "Fusion collection specially designed for customers looking for trendy silver jewellery with luxurious finishing.",
    features: [
      "Italian Polish",
      "Latest Designs",
      "Premium Finish",
      "Wholesale Available",
    ],
  },
  {
    id: 4,
    slug: "turkey-kada",
    name: "Turkey Kada",
    category: "Turkey",
    image: "/images/products/turkey.jpg",
    shortDescription:
      "Exclusive Turkey Kada Collection.",
    description:
      "Premium Turkey Kada collection with elegant craftsmanship and luxury finishing.",
    features: [
      "92.5 Silver",
      "Turkey Finish",
      "Luxury Collection",
      "Wholesale Available",
    ],
  },
  {
    id: 5,
    slug: "payal-collection",
    name: "Payal Collection",
    category: "Payal",
    image: "/images/products/payal.jpg",
    shortDescription:
      "Designer silver payal collection.",
    description:
      "Premium silver payal collection with elegant designs suitable for every jewellery showroom.",
    features: [
      "92.5 Silver",
      "Italian Polish",
      "Premium Finish",
      "Wholesale Available",
    ],
  },
  {
    id: 6,
    slug: "sterling-silver",
    name: "Sterling Silver",
    category: "92.5 Sterling",
    image: "/images/products/sterling.jpg",
    shortDescription:
      "Premium sterling silver articles.",
    description:
      "Exclusive sterling silver collection manufactured with superior finishing and quality.",
    features: [
      "92.5 Sterling",
      "Premium Polish",
      "Luxury Finish",
      "Wholesale Available",
    ],
  },
];