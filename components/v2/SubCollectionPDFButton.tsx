// @ts-nocheck
"use client";
import { useState } from "react";

export default function SubCollectionPDFButton({ title, products }: { title: string, products: any[] }) {
  const [isLoading, setIsLoading] = useState(false);

  const generateDirectPDF = async () => {
    setIsLoading(true);

    try {
      // jsPDF ko dynamically import karte hain
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const margin = 12;
      const usableWidth = pageWidth - (margin * 2);

      let currentY = margin;

      // Helper function to load image as base64 so jsPDF can render it without CORS issues
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

      // Header draw karne ka function
      const drawHeader = () => {
        pdf.setFont("times", "bold");
        pdf.setFontSize(20);
        pdf.setTextColor(36, 5, 13); // #24050D
        pdf.text("OM ARADHANA SILVER", pageWidth / 2, currentY, { align: "center" });

        currentY += 6;
        pdf.setFont("times", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(201, 162, 39); // #C9A227
        pdf.text(`PREMIUM COLLECTION : ${title.toUpperCase()}`, pageWidth / 2, currentY, { align: "center" });

        currentY += 4;
        pdf.setDrawColor(201, 162, 39);
        pdf.setLineWidth(0.5);
        pdf.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 8;
      };

      // Footer draw karne ka function
      const drawFooter = () => {
        pdf.setDrawColor(230, 222, 201);
        pdf.setLineWidth(0.3);
        pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

        pdf.setFont("times", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(122, 107, 88);
        pdf.text(
          "Om Aradhana Silver | Certified 999 Pure Silver | Wholesale Inquiries: +91 8879528201",
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
      };

      drawHeader();

      const itemsPerPage = 4;
      const colWidth = (usableWidth - 10) / 2; // 2 columns with 10mm gap
      const colHeight = 105; // Height for each image card

      for (let i = 0; i < products.length; i++) {
        // Agar ek page par 4 items ho gaye hain, toh naya page add karo
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
        const colIndex = indexOnPage % 2; // 0 for left, 1 for right
        const rowIndex = Math.floor(indexOnPage / 2); // 0 for top row, 1 for bottom row

        const posX = margin + colIndex * (colWidth + 10);
        const posY = currentY + rowIndex * (colHeight + 8);

        // Card Background & Border
        pdf.setFillColor(255, 255, 255);
        pdf.setDrawColor(230, 222, 201); // #E6DEC9
        pdf.setLineWidth(0.3);
        pdf.roundedRect(posX, posY, colWidth, colHeight, 3, 3, "FD");

        // Image load karke draw karna
        if (imgUrl) {
          const base64Img = await getBase64ImageFromUrl(imgUrl);
          if (base64Img) {
            // Padding inside card box
            const p = 4;
            pdf.addImage(base64Img, 'JPEG', posX + p, posY + p, colWidth - (p * 2), colHeight - (p * 2));
          } else {
            pdf.setFont("times", "bold");
            pdf.setFontSize(10);
            pdf.setTextColor(201, 162, 39);
            pdf.text("Image Coming Soon", posX + (colWidth / 2), posY + (colHeight / 2), { align: "center" });
          }
        }
      }

      drawFooter();

      // Direct file download trigger
      pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}-lookbook.pdf`);
    } catch (error) {
      console.error("Direct PDF generation error:", error);
      alert("PDF download failed! Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={generateDirectPDF}
      disabled={isLoading}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C9A227] via-[#F3E5AB] to-[#C9A227] px-5 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#24050D] shadow-[0_4px_14px_rgba(201,162,39,0.3)] transition-all hover:scale-105 hover:shadow-[0_6px_20px_rgba(201,162,39,0.4)] disabled:opacity-50"
    >
      {isLoading ? "Generating PDF..." : `📥 Download ${title} Lookbook`}
    </button>
  );
}