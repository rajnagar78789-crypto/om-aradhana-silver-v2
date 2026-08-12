export type Category = {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: 1,
    title: "999 Hollow Idols",
    slug: "999-hollow-idols",
    image: "/images/products/idol.jpg",
    description:
      "Ultra-lightweight 999 silver idols with premium finishing.",
  },
  {
    id: 2,
    title: "92.5 Antique Jewellery",
    slug: "92-5-antique-jewellery",
    image: "/images/products/antique1.jpg",
    description:
      "Timeless antique silver jewellery.",
  },
  {
    id: 3,
    title: "Fusion Collection",
    slug: "fusion-collection",
    image: "/images/products/fusion1.jpg",
    description:
      "Modern silver jewellery with timeless fusion styling.",
  },
  {
    id: 6,
    title: "Sterling Silver",
    slug: "sterling-silver",
    image: "/images/products/sterling1.jpg",
    description:
      "Classic 92.5 sterling silver crafted for lasting elegance.",
  },
];