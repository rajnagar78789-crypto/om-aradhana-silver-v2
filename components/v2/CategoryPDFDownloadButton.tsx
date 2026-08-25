// @ts-nocheck
"use client";

import { useState } from "react";
import { Download, Loader2, X, FileText, CheckSquare, Square, Sparkles } from "lucide-react";

export default function CategoryPDFDownloadButton({ collection, items }: { collection: any, items: any[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const WHATSAPP_NUMBER = "918879528201";

  const availableCategories = Array.from(
    new Set(
      items
        .map((item) => item.subCategory ? item.subCategory.trim().toLowerCase().replace(/-/g, " ") : "other")
        .filter(Boolean)
    )
  ).sort();

  const getBase64ImageFromUrl = async (imageUrl: string): Promise<string | null> => {
    try {
      const response = await fetch(imageUrl, { cache: "no-store" }); 
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      return null;
    }
  };

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleDownloadSelected = () => {
    if (selectedCategories.length === 0) {
      alert("Please select at least one category.");
      return;
    }
    generatePDF(selectedCategories);
  };

  const handleDownloadAll = () => {
    generatePDF(availableCategories); 
  };

  const generatePDF = async (categoriesToDownload: string[]) => {
    setIsModalOpen(false); 
    
    const filteredItems = items.filter(item => {
      const itemCat = item.subCategory ? item.subCategory.trim().toLowerCase().replace(/-/g, " ") : "other";
      return categoriesToDownload.includes(itemCat);
    });

    if (filteredItems.length === 0) return;

    setIsLoading(true);
    setProgressText("Fetching Images...");

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const itemsWithBase64 = [];
      for (let i = 0; i < filteredItems.length; i++) {
        setProgressText(`Loading Image ${i + 1}/${filteredItems.length}...`);
        
        const product = filteredItems[i];
        let base64 = null;
        if (product.imageUrl) {
          const imgUrl = `${product.imageUrl}${product.imageUrl.includes('?') ? '&' : '?'}w=600&q=80`;
          base64 = await getBase64ImageFromUrl(imgUrl);
        }
        itemsWithBase64.push({ ...product, base64 });
      }

      setProgressText("Assembling Catalog...");

      let titlePrefix = "EXCLUSIVE";
      if (categoriesToDownload.length === availableCategories.length) {
        titlePrefix = "COMPLETE";
      } else if (categoriesToDownload.length <= 2) {
        titlePrefix = categoriesToDownload.map(c => c.toUpperCase()).join(" & ");
      } else {
        titlePrefix = "CUSTOM SELECTION";
      }

      const ITEMS_PER_PAGE = 4;
      const totalPages = Math.ceil(itemsWithBase64.length / ITEMS_PER_PAGE);

      let htmlString = `<div style="width: 210mm; background-color: #FAF7F2; font-family: sans-serif;">`; 

      for (let page = 0; page < totalPages; page++) {
        const pageItems = itemsWithBase64.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

        htmlString += `
          <div class="pdf-page" style="width: 210mm; height: 295mm; padding: 12mm 15mm; box-sizing: border-box; background-color: #FAF7F2; position: relative; overflow: hidden;">
            
            <div style="text-align: center; border-bottom: 2px solid #C9A227; padding-bottom: 5mm; margin-bottom: 8mm;">
              <h1 style="color: #24050D; font-size: 28px; margin: 0; font-weight: bold; font-family: serif;">OM ARADHANA SILVER</h1>
              <p style="color: #C9A227; font-size: 14px; text-transform: uppercase; letter-spacing: 0.15em; margin: 4px 0 0 0; font-weight: bold;">
                ${titlePrefix} CATALOG
              </p>
              <p style="color: #6B5B52; font-size: 10px; margin: 4px 0 0 0;">
                ${collection.name || collection.title || "Premium Collection"} &nbsp;|&nbsp; Click any product to order on WhatsApp &nbsp;|&nbsp; Page ${page + 1} of ${totalPages}
              </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10mm; height: 215mm;">
        `;

        pageItems.forEach((product) => {
          const prodName = product.title || product.name || 'Untitled';
          const prodCode = product.code || product.sku || 'N/A';
          const prodWeight = product.weight || '-';
          const imgLink = product.imageUrl ? product.imageUrl : 'No image link';

          const whatsappMessage = `Hello Om Aradhana Silver, I want to inquire about this product from your catalog:\n\n*Product:* ${prodName}\n*Code:* ${prodCode}\n*Weight:* ${prodWeight}\n*Image:* ${imgLink}`;
          const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

          htmlString += `
              <a href="${whatsappUrl}" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid #E6DEC9; border-radius: 8px; padding: 15px; background: #ffffff; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.05); box-sizing: border-box; display: flex; flex-direction: column;">
                
                <div style="height: 190px; width: 100%; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; background: #FAF7F2; border-radius: 6px;">
                  ${
                    product.base64 
                      ? `<img src="${product.base64}" style="max-height: 180px; max-width: 100%; object-fit: contain;" />`
                      : `<span style="color: #C9A227; font-size: 14px; font-weight: bold;">No Image</span>`
                  }
                </div>
                
                <h3 style="font-size: 18px; color: #24050D; margin: 0 0 5px 0; font-weight: bold; font-family: serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  ${prodName}
                </h3>
                <p style="font-size: 14px; color: #5A1020; margin: 0 0 4px 0; font-weight: bold;">
                  Code: ${prodCode}
                </p>
                <p style="font-size: 12px; color: #7A6B58; margin: 0 0 10px 0; font-weight: bold;">
                  Wt: ${prodWeight}
                </p>

                <div style="margin-top: auto; padding-top: 5px;">
                  <span style="background-color: #25D366; color: #ffffff; padding: 6px 12px; border-radius: 4px; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block; border: 1px solid #1EBE57;">
                    💬 Order on WhatsApp
                  </span>
                </div>

              </a>
          `;
        });

        htmlString += `
            </div> 
            
            <div style="position: absolute; bottom: 10mm; left: 15mm; right: 15mm; text-align: center; font-size: 11px; color: #7A6B58; border-top: 1px solid #E6DEC9; padding-top: 5mm; font-weight: bold;">
              <p style="margin:0;">Om Aradhana Silver | Trusted by 2100+ Showrooms | Pure 92.5 & Antique Jewellery</p>
              <p style="margin:4px 0 0 0; color: #C9A227; font-size: 12px;">WhatsApp / Call: +91 8879528201</p>
            </div>
            
          </div>
        `;
      }

      htmlString += `</div>`;
      
      setProgressText("Generating PDF...");

      const safeName = categoriesToDownload.length === availableCategories.length 
        ? "All_Designs" 
        : categoriesToDownload.length <= 2 
            ? categoriesToDownload.map(c => c.replace(/\s+/g, "_")).join("_") 
            : "Custom_Selection";
      
      const options = {
        margin: 0, 
        filename: `OmAradhana_${safeName}_Order_Now.pdf`,
        image: { type: 'jpeg', quality: 0.95 }, 
        pagebreak: { mode: ['css', 'legacy'] }, 
        html2canvas: { scale: 2, useCORS: true, logging: false }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
      };

      await html2pdf().from(htmlString).set(options).save();

    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error building catalog. Please try again.");
    } finally {
      setIsLoading(false);
      setProgressText("");
      setSelectedCategories([]); 
    }
  };

  return (
    // 👇 FIX 1: Container se saare "z-index" aur "relative" hata diye taaki wo modal ko kaid na kar sake
    <div className="flex flex-col items-center sm:items-end gap-2.5">
      
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading || !items || items.length === 0}
        className="relative flex items-center gap-2.5 bg-[#C9A227]/10 border border-[#C9A227] px-6 py-3 rounded-full backdrop-blur-md hover:bg-[#C9A227] hover:text-[#24050D] text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_15px_rgba(201,162,39,0.15)] hover:shadow-[0_0_25px_rgba(201,162,39,0.3)] min-w-[200px] justify-center hover:scale-[1.02]"
      >
        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A227] opacity-80"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#C9A227] border-[2.5px] border-[#24050D]"></span>
        </span>

        {isLoading ? (
          <Loader2 size={18} className="animate-spin text-[#C9A227] group-hover:text-[#24050D]" />
        ) : (
          <Download size={18} className="text-[#C9A227] group-hover:text-[#24050D]" />
        )}
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A227] group-hover:text-[#24050D]">
          {isLoading ? progressText : "Download Catalog"}
        </span>
      </button>

      {!isLoading && (
        <div className="flex items-center gap-1.5 text-[#C9A227]/90 bg-black/40 px-3.5 py-1.5 rounded-full border border-[#C9A227]/20 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-700">
          <Sparkles size={12} className="text-[#C9A227]" />
          <span className="text-[9.5px] sm:text-[10.5px] font-medium tracking-widest uppercase">
            Click to order via WhatsApp
          </span>
        </div>
      )}

      {/* 🌟 ADVANCED MULTI-SELECT POPUP MODAL 🌟 */}
      {isModalOpen && (
        // 👇 FIX 2: Modal ko "fixed" ke saath "z-[99999]" de diya. Website ka Header 50 par hota hai, yeh Header ke bhi baap ke upar aayega!
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 text-left"
          style={{ zIndex: 99999 }}
        >
          <div className="bg-[#FAF7F2] w-full max-w-md rounded-2xl shadow-2xl border border-[#C9A227]/30 overflow-hidden transform transition-all flex flex-col max-h-[85vh]">
            
            <div className="bg-[#24050D] p-5 flex justify-between items-center relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C9A227]/20 via-transparent to-transparent"></div>
              <h2 className="text-white font-serif text-xl font-medium flex items-center gap-2 relative z-10">
                <FileText className="text-[#C9A227]" size={20} />
                Build Smart Catalog
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/70 hover:text-white transition-colors relative z-10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
              <div className="bg-[#C9A227]/10 border border-[#C9A227]/30 p-3 rounded-xl mb-5 flex gap-3 items-start">
                <span className="text-xl">💡</span>
                <p className="text-[#6B5B52] text-xs font-medium leading-relaxed">
                  The downloaded PDF will be interactive. You can click on any product photo in the PDF to order it directly on WhatsApp.
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                {availableCategories.map((cat, idx) => {
                  const count = items.filter(i => (i.subCategory ? i.subCategory.trim().toLowerCase().replace(/-/g, " ") : "other") === cat).length;
                  const isSelected = selectedCategories.includes(cat);
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleCategory(cat)}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-[0.15em] border transition-all flex justify-between items-center group ${
                        isSelected 
                          ? "bg-[#C9A227]/10 border-[#C9A227] text-[#24050D] shadow-sm" 
                          : "bg-white border-[#E6DEC9] text-[#6B5B52] hover:border-[#C9A227] hover:bg-[#FAF7F2]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isSelected ? (
                          <CheckSquare size={18} className="text-[#C9A227]" />
                        ) : (
                          <Square size={18} className="text-[#E6DEC9] group-hover:text-[#C9A227]" />
                        )}
                        <span className="capitalize">{cat}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-[10px] border ${
                        isSelected ? "bg-white border-[#C9A227]/30 text-[#C9A227]" : "bg-[#FAF7F2] border-[#E6DEC9] group-hover:bg-white"
                      }`}>
                        {count} Items
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 border-t border-[#E6DEC9] bg-white flex flex-col gap-3 flex-shrink-0">
              <button
                onClick={handleDownloadSelected}
                disabled={selectedCategories.length === 0}
                className="w-full bg-[#24050D] text-[#C9A227] py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.15em] border border-[#C9A227]/50 hover:bg-[#C9A227] hover:text-[#24050D] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                📥 Download Selected ({selectedCategories.length})
              </button>
              <button
                onClick={handleDownloadAll}
                className="w-full bg-transparent text-[#24050D] py-2.5 rounded-xl text-xs font-bold uppercase tracking-[0.15em] border border-[#24050D]/20 hover:border-[#24050D] transition-all"
              >
                Download All Categories
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}