import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Om Aradhana Silver | Trusted Wholesale Partner",
  description: "Exclusive handcrafted masterpieces for B2B retail jewellery showrooms.",
};

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