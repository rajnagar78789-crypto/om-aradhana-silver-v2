import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Om Aradhana Silver | Premium Antique Silver & Authentic Jewelry',
  description: 'Buy premium antique silver jewelry, authentic silver articles, and exclusive designs at Om Aradhana Silver. 100% pure quality and best craftsmanship.',
  keywords: 'Om Aradhana Silver, Antique Silver, Silver Jewelry, Pure Silver Articles, Silver Shop online, Premium Silverware',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#16050A] text-white antialiased`}>
        {/* Luxury Navbar */}
        <Header />

        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}