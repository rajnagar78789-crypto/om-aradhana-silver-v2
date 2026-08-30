// @ts-nocheck
"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Sparkles, X } from "lucide-react"; 
import { client } from "@/sanity/lib/client"; 

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // 🔥 THE ULTIMATE FIX: Ab yeh "product" aur "idol" dono ko uthayega!
        const sanityQuery = `*[_type in ["product", "idol"]][0...10000] {
          ..., 
          _id,
          "slug": slug.current,
          "singleImage": image.asset->url,        
          "mainImage": mainImage.asset->url,      
          "imagesArray": images[]{                
            "url": asset->url,
            "alt": asset->altText
          }
        }`;
        
        const data = await client.fetch(sanityQuery);
        setProducts(data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching Sanity products:", error);
      }
    }
    fetchProducts();
  }, []);

  const results = useMemo(() => {
    const rawSearchTerm = query.trim().toLowerCase();
    if (!rawSearchTerm) return [];

    const cleanSearchTerm = rawSearchTerm.replace(/[^a-z0-9]/g, ""); 

    return products.filter((product) => {
      const allTextData = [
        product.name || "",
        product.title || "",      
        product.sku || "",
        product.code || "",        
        product.productCode || "",
        product.itemCode || "",
        product.category || "",     
        product.subCategory || "",  
        product.material || "",
        ...(product.tags || [])
      ].join(" ").toLowerCase();

      if (allTextData.includes(rawSearchTerm)) {
        return true;
      }

      const compressedTextData = allTextData.replace(/[^a-z0-9]/g, "");
      if (compressedTextData.includes(cleanSearchTerm)) {
        return true;
      }

      return false; 
    });
  }, [query, products]);

  return (
    <main className="min-h-screen bg-[#FAF7F2] relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C9A227]/5 blur-[100px] rounded-full pointer-events-none" />

      <section className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

        <div className="mx-auto max-w-3xl flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-1.5 mb-6 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#C9A227]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C6D18]">
              Explore The Catalogue
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#24050D] leading-tight">
            Find Your Perfect <span className="italic text-[#C9A227]">Silver</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base font-bold text-[#5A1020]">
            {isLoaded ? `Database Connected: ${products.length} Items Ready!` : "Connecting to Database..."}
          </p>
        </div>

        <div className="mx-auto max-w-2xl relative group mb-8">
          <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
            <Search className="h-6 w-6 text-[#A09388] group-focus-within:text-[#C9A227] transition-colors duration-300" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by Code (e.g. OAS-ACS141) or Category..."
            autoFocus
            className="w-full bg-white border border-[#E6DEC9] rounded-full py-5 sm:py-6 pl-16 pr-16 text-base sm:text-lg text-[#24050D] placeholder-[#A09388] shadow-[0_8px_30px_rgba(36,5,13,0.04)] focus:outline-none focus:border-[#C9A227] focus:ring-4 focus:ring-[#C9A227]/10 transition-all duration-300"
          />
          
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-6 text-[#A09388] hover:text-[#5A1020] transition-colors"
              aria-label="Clear search"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {!query.trim() && (
          <div className="mt-10 w-full flex flex-col items-center animate-in fade-in duration-500">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C6D18] mb-5">
              Popular Searches
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
              {['OAS', 'Ring', 'Necklace', 'Antique Bangles', 'Fusion'].map((tag) => (
                <button 
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-5 py-2.5 bg-white border border-[#E6DEC9] rounded-full text-xs sm:text-sm font-medium text-[#5A1020] cursor-pointer hover:border-[#C9A227] hover:bg-[#C9A227]/5 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {query.trim() && (
          <div className="mx-auto max-w-7xl mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E6DEC9] pb-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#8C6D18]">
                Search results for
              </p>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium text-[#24050D]">
                “{query.trim()}”
              </h2>
            </div>
            <span className="mt-4 sm:mt-0 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#8C6D18]">
              {results.length} {results.length === 1 ? "Product" : "Products"} Found
            </span>
          </div>
        )}

        {query.trim() && results.length > 0 && (
          <div className="mx-auto max-w-7xl grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 animate-in slide-in-from-bottom-4 duration-500">
            
            {results.map((product, index) => {
              const imgUrl = 
                product.singleImage || 
                product.mainImage || 
                (product.imagesArray && product.imagesArray.length > 0 ? product.imagesArray[0].url : null);

              // 🔥 YAHAN LINK FIX KIYA HAI! Agar slug nahi hai toh _id pass hoga
              const finalSlug = product.slug || product._id;
              
              return (
                <Link
                  key={product._id || index}
                  href={finalSlug ? `/products/${finalSlug}` : "#"}
                  className="group overflow-hidden rounded-3xl border border-[#E6DEC9] bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A227]/50 hover:shadow-[0_20px_40px_rgba(36,5,13,0.08)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#FAF7F2]">
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={product.title || product.name || "Om Aradhana Silver Product"}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#E6DEC9]/30 text-[#8C6D18] text-xs font-bold uppercase tracking-widest">
                        No Image
                      </div>
                    )}
                    
                    {(product.subCategory || product.category) && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-md border border-[#E6DEC9]/50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#5A1020] shadow-sm">
                        {product.subCategory || product.category}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-[#3D0A15]/0 group-hover:bg-[#3D0A15]/10 transition-all duration-500" />
                  </div>

                  <div className="p-4 sm:p-5">
                    {(product.sku || product.code) && (
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A227]">
                        {product.sku || product.code}
                      </span>
                    )}
                    <h3 className="mt-1.5 line-clamp-2 font-serif text-base sm:text-lg font-medium leading-snug text-[#24050D] group-hover:text-[#5A1020] transition-colors">
                      {product.title || product.name || "Untitled"}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div className="mx-auto max-w-2xl mt-8 rounded-3xl border border-[#E6DEC9] bg-white p-10 sm:p-16 text-center shadow-[0_10px_30px_rgba(36,5,13,0.02)] animate-in fade-in">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF7F2] mb-6">
              <Search className="h-8 w-8 text-[#C9A227]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#24050D] mb-3">
              No Masterpieces Found
            </h2>
            <p className="text-sm font-light leading-relaxed text-[#6B5B52] max-w-sm mx-auto mb-8">
              We couldn't find anything matching "{query}". 
            </p>
          </div>
        )}

      </section>
    </main>
  );
}