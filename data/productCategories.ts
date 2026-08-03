export type ProductCategory = {
  id: number;
  subCollectionSlug: string;
  title: string;
  slug: string;
};

export const productCategories: ProductCategory[] = [
  {
    id: 1,
    subCollectionSlug: "laxmi-ganesh-jodi",
    title: "8 Inch",
    slug: "8-inch",
  },
  {
    id: 2,
    subCollectionSlug: "laxmi-ganesh-jodi",
    title: "10 Inch",
    slug: "10-inch",
  },
  {
    id: 3,
    subCollectionSlug: "laxmi-ganesh-jodi",
    title: "12 Inch",
    slug: "12-inch",
  },
];