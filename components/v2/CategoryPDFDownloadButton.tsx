// @ts-nocheck
"use client";
import { useState } from "react";

export default function SubCollectionPDFButton({ title, products }: { title: string, products: any[] }) {
  const [isLoading, setIsLoading] = useState(false);

  const generatePDF = async () => {
    setIsLoading(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const element = document.createElement("div");
      element.style.width = "210mm";
      element.style.padding = "15mm";
      element.style.fontFamily = "serif";
      element.style.backgroundColor = "#FAF7F2";

      let html = `
        <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #C9A227; padding-bottom: 15px;">
          <h1 style="color: #24050D; font-size: 26px; margin: 0;">Om Aradhana Silver</h1>
          <p style="color: #C9A227; font-size: 14px; text-transform: uppercase; letter-spacing: 0.2em; margin: 5px 0 0 0;">
            Collection: ${title}
          </p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
      `;

      products.forEach((product) => {
        const imgUrl = product.images?.[0] ? window.location.origin + product.images[0] : '';
        html += `
          <div style="border: 1px solid #E6DEC9; border-radius: 12px; padding: 15px; background: #ffffff; text-align: center; page-break-inside: avoid;">
            ${
              imgUrl 
                ? `<img src="${imgUrl}" crossorigin="anonymous" style="width: 100%; height: 180px; object-fit: contain; border-radius: 8px; margin-bottom: 10px;" />`
                : `<div style="width: 100%; height: 180px; background: #FAF7F2; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #C9A227; font-size: 13px; font-weight: bold; margin-bottom: 10px; border: 1px dashed #C9A227;">Image Coming Soon</div>`
            }
            <h3 style="font-size: 14px; color: #24050D; margin: 8px 0 4px 0; font-weight: bold;">${product.name}</h3>
            <p style="font-size: 12px; color: #5A1020; margin: 0; font-weight: 600;">SKU: ${product.sku || 'N/A'}</p>
            <p style="font-size: 11px; color: #7A6B58; margin: 4px 0 0 0;">Weight: ${product.weight || 'N/A'}</p>
          </div>
        `;
      });

      html += `
        </div>
        <div style="margin-top: 30px; text-align: center; font-size: 10px; color: #7A6B58; border-top: 1px solid #E6DEC9; padding-top: 10px;">
          <p>Om Aradhana Silver | Certified 999 Pure Silver | Wholesale Inquiries: +91 8879528201</p>
        </div>
      `;

      element.innerHTML = html;

      const options = {
        margin: 0,
        filename: `${title.toLowerCase().replace(/\s+/g, '-')}-catalog.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().from(element).set(options).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isLoading}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C9A227] via-[#F3E5AB] to-[#C9A227] px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#24050D] shadow-md transition-all hover:scale-105 disabled:opacity-50"
    >
      {isLoading ? "Generating PDF..." : `📥 DOWNLOAD CATALOG`}
    </button>
  );
}