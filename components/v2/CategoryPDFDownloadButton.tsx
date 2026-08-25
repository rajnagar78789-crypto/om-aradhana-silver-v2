// @ts-nocheck
"use client";

import { useState } from "react";
import { Download, Loader2, X, FileText, CheckSquare, Square } from "lucide-react";

export default function CategoryPDFDownloadButton({ collection, items }: { collection: any, items: any[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 📞 TERA WHATSAPP NUMBER YAHAN HAI (Country code 91 ke saath, bina + lagaye)
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
    setProgressText("Fetching Ultra-HD Images...");

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const itemsWithBase64 = [];
      for (let i = 0; i < filteredItems.length; i++) {
        setProgressText(`Loading HD Image ${i + 1}/${filteredItems.length}...`);
        
        const product = filteredItems[i];
        let base64 = null;
        if (product.imageUrl) {
          const imgUrl = `${product.imageUrl}${product.imageUrl.includes('?') ? '&' : '?'}w=1400&q=100`;
          base64 = await getBase64ImageFromUrl(imgUrl);
        }
        itemsWithBase64.push({ ...product, base64 });
      }

      setProgressText("Assembling Smart Catalog...");

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

      const element = document.createElement("div");
      element.style.width = "210mm"; 
      element.style.backgroundColor = "#FAF7F2";
      
      let html = `<div>`; 

      for (let page = 0; page < totalPages; page++) {
        const pageItems = itemsWithBase64.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

        html += `
          <div class="pdf-page" style="width: 210mm; height: 295mm; padding: 12mm 15mm; box-sizing: border-box; background-color: #FAF7F2; position: relative; overflow: hidden;">
            
            <!-- HEADER -->
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
          // 👇 JADOO: WhatsApp message ko taiyaar karna
          const prodName = product.title || product.name || 'Untitled';
          const prodCode = product.code || product.sku || 'N/A';
          const prodWeight = product.weight || '-';
          
          // Image ka direct URL bhejenge taaki WhatsApp par tum click karke photo dekh sako
          const imgLink = product.imageUrl ? product.imageUrl : 'No image link';

          const whatsappMessage = `Hello Om Aradhana Silver, I want to inquire about this product from your catalog:\n\n*Product:* ${prodName}\n*Code:* ${prodCode}\n*Weight:* ${prodWeight}\n*Image:* ${imgLink}`;
          
          // Link ko browser ke hisaab se encode karna zaruri hai
          const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

          html += `
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

                <!-- 👇 JADOO: WhatsApp button design -->
                <div style="margin-top: auto; padding-top: 5px;">
                  <span style="background-color: #25D366; color: #ffffff; padding: 6px 12px; border-radius: 4px; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block; border: 1px solid #1EBE57;">
                    💬 Order on WhatsApp
                  </span>
                </div>

              </a>
          `;
        });

        html += `
            </div> 
            
            <!-- FOOTER -->
            <div style="position: absolute; bottom: 10mm; left: 15mm; right: 15mm; text-align: center; font-size: 11px; color: #7A6B58; border-top: 1px solid #E6DEC9; padding-top: 5mm; font-weight: bold;">
              <p style="margin:0;">Om Aradhana Silver | Trusted by 2100+ Showrooms | Pure 92.5 & Antique Jewellery</p>
              <p style="margin:4px 0 0 0; color: #C9A227; font-size: 12px;">WhatsApp / Call: +91 8879528201</p>
            </div>
            
          </div>
        `;
      }

      html += `</div>`;
      element.innerHTML = html;
      setProgressText("Embedding Smart WhatsApp Links...");

      const safeName = categoriesToDownload.length === availableCategories.length 
        ? "All_Designs" 
        : categoriesToDownload.length <= 2 
            ? categoriesToDownload.map(c => c.replace(/\s+/g, "_")).join("_") 
            : "Custom_Selection";
      
      const options = {
        margin: 0, 
        filename: `OmAradhana_${safeName}_Order_Now.pdf`,
        image: { type: 'jpeg', quality: 1 }, 
        pagebreak: { mode: ['css', 'legacy'], after: '.pdf-page' }, 
        html2canvas: { scale: 3, useCORS: true, logging: false, letterRendering: true }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
      };

      await html2pdf().from(element).set(options).save();

    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error building catalog. Please check your internet connection.");
    } finally {
      setIsLoading(false);
      setProgressText("");
      setSelectedCategories([]); 
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading || !items || items.length === 0}
        className="flex items-center gap-2 bg-white/10 border border-[#C9A227]/40 px-4 py-2 rounded-full backdrop-blur-md hover:bg-[#C9A227] hover:text-[#24050D] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg min-w-[160px] justify-center"
      >
        {isLoading ? (
          <Loader2 size={16} className="animate-spin text-[#C9A227] group-hover:text-[#24050D]" />
        ) : (
          <Download size={16} className="text-[#C9A227] group-hover:text-[#24050D]" />
        )}
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-[#24050D]">
          {isLoading ? progressText : "Download Catalog"}
        </span>
      </button>

      {/* 🌟 ADVANCED MULTI-SELECT POPUP MODAL 🌟 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#FAF7F2] w-full max-w-md rounded-2xl shadow-2xl border border-[#C9A227]/30 overflow-hidden transform transition-all flex flex-col max-h-[85vh]">
            
            <div className="bg-[#24050D] p-5 flex justify-between items-center relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C9A227]/20 via-transparent to-transparent"></div>
              <h2 className="text-white font-serif text-xl font-medium flex items-center gap-2 relative z-10">
                <FileText className="text-[#C9A227]" size={20} />
                Build HD Catalog
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/70 hover:text-white transition-colors relative z-10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
              <p className="text-[#6B5B52] text-sm mb-5 text-center font-medium">
                Select one or more categories to download:
              </p>
              
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
    </>
  );
}