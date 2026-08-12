import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Products & Idols",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
      placeholder: "e.g., 999 Silver Ganesha Idol or Antique Payal",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Base Product Code",
      type: "string",
      placeholder: "e.g., OAS 413",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "999 Hollow Idols", value: "999-hollow-idols" },
          { title: "92.5 Antique Jewellery", value: "92-5-antique-jewellery" },
          { title: "Fusion Collection", value: "fusion-collection" },
          { title: "Sterling Silver", value: "sterling-silver" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    // 👇 Master Dropdown for ALL Jewellery Categories 👇
    defineField({
      name: "subCategory",
      title: "Product Type (For Jewellery)",
      type: "string",
      options: {
        list: [
          { title: "Earrings", value: "earrings" },
          { title: "Nosepin", value: "nosepin" },
          { title: "Necklace Set", value: "necklace-set" },
          { title: "Pendant Set", value: "pendant-set" },
          { title: "Chain", value: "chain" },
          { title: "Bracelet", value: "bracelet" },
          { title: "Bangles", value: "bangles" },
          { title: "Kamar Belt", value: "kamar-belt" },
          { title: "Payal", value: "payal" },
          { title: "Toe Ring", value: "toe-ring" },
          { title: "Rings", value: "rings" },
          { title: "Choker", value: "choker" },
          { title: "Mangalsutra", value: "mangalsutra" },
        ],
      },
      // 🧠 Smart Logic: Yeh dropdown sirf "999 Idols" ke time hide hoga, baaki teeno me dikhega!
      hidden: ({ document }) => document?.category === "999-hollow-idols",
    }),
    
    // 🔥 Wapas simple fields add kar diye (Variants hata diye)
    defineField({
      name: "weight",
      title: "Weight",
      type: "string",
      placeholder: "e.g., 25g",
      validation: (Rule) => Rule.required(),
    }),
    
    // 📸 1 Product = 1 Main Image
    defineField({
      name: "image",
      title: "Main Product Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    // 📸 Optional: Agar same piece ke aur angles ki photo daalni ho
    defineField({
      name: "gallery",
      title: "Gallery Images (Same product diff angles - Optional)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      placeholder: "Short details about the product...",
    }),
  ],
});