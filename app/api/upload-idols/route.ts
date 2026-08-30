import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

// Sanity client setup VIP Token ke sath
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // Jo token tune .env me daala tha
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const productsJson = formData.get('products') as string;
    
    if (!productsJson) {
      return NextResponse.json({ error: 'No product data found' }, { status: 400 });
    }

    const products = JSON.parse(productsJson);
    const results = [];

    // Har ek product ke liye loop chalega
    for (const product of products) {
      const file = formData.get(`file_${product.id}`) as File;
      if (!file) continue;

      // 1. Photo ko buffer mein convert karke Sanity pe upload karna
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const asset = await client.assets.upload('image', buffer, {
        filename: file.name
      });

      // 2. Product ki details Sanity database mein save karna
      const doc = {
        _type: 'idol',
        name: product.name,
        sku: product.sku,
        weight: product.weight,
        height: product.height, // 🚀 Yeh add kar lena
        length: product.length, // 🚀 Yeh bhi add kar lena
        category: product.category,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
      };

      const createdDoc = await client.create(doc);
      results.push(createdDoc);
    }

    return NextResponse.json({ success: true, count: results.length });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}