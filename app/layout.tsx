import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
// 🚨 VIP Ticker yahan import kiya hai
import TopTicker from "@/components/TopTicker"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://omaradhanasilver.in'),
  title: 'Om Aradhana Silver | Trusted B2B Wholesale Silver Partner',
  description: "India's trusted wholesale partner for retail jewellery showrooms. Premium 999 & 92.5 silver collections with consistent high-volume supply.",
  keywords: 'B2B Wholesale Silver, Silver Wholesale India, Premium 999 Silver, 92.5 Silver Wholesale, Retail Jewellery Showrooms, Om Aradhana Silver',
  openGraph: {
    images: '/opengraph-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#16050A] text-white antialiased`}>
        
        {/* 📈 Live MCX Ticker Sabse Upar */}
        <TopTicker />

        {/* Luxury Navbar */}
        <Header />

        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}