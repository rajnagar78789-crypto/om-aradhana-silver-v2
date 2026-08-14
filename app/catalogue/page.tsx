"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

export default function CataloguePDF() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await client.fetch(`*[_type == "product"] {
          _id,
          name,
          sku,
          material,
          "image": image.asset->url,
          "mainImage": mainImage.asset->url,
          "imagesArray": images[]{ "url": asset->url }
        }`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white p-8">
      {/* 🖨️ PDF Download Button (Print hote time yeh chhip jayega) */}
      <div className="print:hidden flex justify-between items-center mb-10 border-b pb-4">
        <div>
          <h1 className="text-2xl font-serif text-[#5A1020]">Om Aradhana Silver</h1>
          <p className="text-gray-500 text-sm">Wholesale Catalogue Generator</p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-[#5A1020] text-white px-6 py-2 rounded-lg shadow hover:bg-[#3D0A15] transition"
        >
          Download PDF
        </button>
      </div>

      {/* 📄 PDF KA ASLI CONTENT SHURU */}
      <div className="print:block">
        
        {/* PDF Cover Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-[#24050D] font-bold">OM ARADHANA SILVER</h1>
          <p className="text-lg text-[#8C6D18] tracking-[0.2em] uppercase mt-2">Premium Wholesale Collection</p>
          <div className="w-24 h-1 bg-[#C9A227] mx-auto mt-4"></div>
        </div>

        {/* 🛍️ Products Grid (1 row me 3 products aayenge A4 par) */}
        <div className="grid grid-cols-3 gap-6">
          {products.map((product, index) => {
            const imgUrl = product.image || product.mainImage || (product.imagesArray?.[0]?.url);

            return (
              <div 
                key={product._id || index} 
                className="border border-gray-200 p-4 rounded-xl flex flex-col items-center text-center break-inside-avoid"
              >
                <div className="relative w-full aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={product.name || "Product"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No Image</div>
                  )}
                </div>
                
                {/* Product Details */}
                <span className="text-[#C9A227] text-[10px] font-bold tracking-widest uppercase mb-1">
                  {product.sku || "NO-SKU"}
                </span>
                <h2 className="text-[#24050D] text-sm font-serif font-medium leading-tight">
                  {product.name}
                </h2>
                {product.material && (
                  <span className="text-gray-500 text-[10px] mt-1">{product.material}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* PDF Footer */}
        <div className="mt-16 text-center border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600">For Orders & Inquiries: +91-YOUR-NUMBER</p>
          <p className="text-xs text-gray-400 mt-1">www.omaradhana.com | Pan India Delivery</p>
        </div>

      </div>
    </main>
  );
}