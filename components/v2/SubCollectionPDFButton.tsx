// @ts-nocheck
"use client";
import { useState } from "react";

export default function SubCollectionPDFButton({ title, products }: { title: string, products: any[] }) {
  const [isLoading, setIsLoading] = useState(false);

  const generateDirectPDF = async () => {
    setIsLoading(true);

    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 210; 
      const pageHeight = 297; 
      const margin = 12;
      const usableWidth = pageWidth - (margin * 2);

      let currentY = margin;

      const getBase64ImageFromUrl = async (imageUrl: string): Promise<string> => {
        try {
          const res = await fetch(imageUrl, { mode: 'cors' });
          const blob = await res.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch (e) {
          return '';
        }
      };

      const drawHeader = () => {
        pdf.setFont("times", "bold");
        pdf.setFontSize(22);
        // 🔥 Naya VIP Dark Color (Blackish/Dark Grey)
        pdf.setTextColor(21, 13, 17); 
        pdf.text("OM ARADHANA SILVER", pageWidth / 2, currentY, { align: "center" });

        currentY += 8;
        pdf.setFont("times", "bold");
        pdf.setFontSize(10);
        // 🔥 Naya VIP Gold Color (#d4af37 -> 212, 175, 55)
        pdf.setTextColor(212, 175, 55); 
        pdf.text(`PREMIUM MASTERPIECES : ${title.toUpperCase()}`, pageWidth / 2, currentY, { align: "center" });

        currentY += 5;
        pdf.setDrawColor(212, 175, 55);
        pdf.setLineWidth(0.5);
        pdf.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 10;
      };

      const drawFooter = () => {
        pdf.setDrawColor(212, 175, 55);
        pdf.setLineWidth(0.3);
        pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

        pdf.setFont("times", "italic");
        pdf.setFontSize(9);
        pdf.setTextColor(100, 100, 100);
        pdf.text(
          "Om Aradhana Silver | Certified 999 Pure Silver | Wholesale: +91 8879528201",
          pageWidth / 2,
          pageHeight - 9,
          { align: "center" }
        );
      };

      drawHeader();

      const itemsPerPage = 4;
      const colWidth = (usableWidth - 10) / 2; 
      const colHeight = 105; 

      for (let i = 0; i < products.length; i++) {
        if (i > 0 && i % itemsPerPage === 0) {
          drawFooter();
          pdf.addPage();
          currentY = margin;
          drawHeader();
        }

        const product = products[i];
        let imagePath = (product.images && product.images.length > 0) ? product.images[0] : product.image;
        if (imagePath && typeof imagePath === 'object') imagePath = imagePath.src || imagePath.url || '';
        
        let imgUrl = '';
        if (imagePath && typeof imagePath === 'string') {
          imgUrl = imagePath.startsWith('http') ? imagePath : window.location.origin + (imagePath.startsWith('/') ? '' : '/') + imagePath;
        }

        const indexOnPage = i % itemsPerPage;
        const colIndex = indexOnPage % 2; 
        const rowIndex = Math.floor(indexOnPage / 2); 

        const posX = margin + colIndex * (colWidth + 10);
        const posY = currentY + rowIndex * (colHeight + 8);

        pdf.setFillColor(255, 255, 255);
        pdf.setDrawColor(212, 175, 55); // Naya Gold Border
        pdf.setLineWidth(0.2);
        pdf.roundedRect(posX, posY, colWidth, colHeight, 4, 4, "FD");

        if (imgUrl) {
          const base64Img = await getBase64ImageFromUrl(imgUrl);
          if (base64Img) {
            const p = 4;
            pdf.addImage(base64Img, 'JPEG', posX + p, posY + p, colWidth - (p * 2), colHeight - (p * 2));
          } else {
            pdf.setFont("times", "italic");
            pdf.setFontSize(10);
            pdf.setTextColor(212, 175, 55);
            pdf.text("Image Loading...", posX + (colWidth / 2), posY + (colHeight / 2), { align: "center" });
          }
        }
      }

      drawFooter();
      pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}-vip-lookbook.pdf`);
    } catch (error) {
      console.error("Direct PDF generation error:", error);
      alert("PDF download failed! Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 🔥 SAFED AUR PEELA RANG GAYAB! Ab Premium Gold Ghost Button hai
    <button
      onClick={generateDirectPDF}
      disabled={isLoading}
      className="group flex w-full md:w-max items-center justify-center gap-3 rounded-full border border-[#d4af37] bg-transparent px-8 py-3.5 transition-all duration-500 hover:bg-[#d4af37] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] disabled:opacity-50 disabled:hover:bg-transparent"
    >
      <span className="flex h-5 w-5 items-center justify-center text-[#d4af37] transition-all duration-500 group-hover:-translate-y-1 group-hover:text-black">
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        )}
      </span>
      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] transition-colors duration-500 group-hover:text-black">
        {isLoading ? "Generating Masterpiece..." : `Download ${title} Lookbook`}
      </span>
    </button>
  );
}