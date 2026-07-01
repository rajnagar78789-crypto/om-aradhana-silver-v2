import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Om Aradhana Silver | Wholesale Silver Jewellery Supplier",

  description:
    "Om Aradhana Silver is a trusted wholesale supplier of 999 Hollow Idols, 92.5 Antique Jewellery, Fusion Jewellery and Sterling Silver Articles. Trusted by 1100+ retail jewellery showrooms across India.",

  keywords: [
    "Wholesale Silver Jewellery",
    "92.5 Sterling Silver",
    "999 Hollow Idols",
    "Silver Idols",
    "Antique Silver Jewellery",
    "Fusion Jewellery",
    "Wholesale Silver Supplier",
    "Silver Manufacturer Ahmedabad",
    "Retail Jewellery Showroom Supplier",
    "Om Aradhana Silver",
  ],

  authors: [
    {
      name: "Om Aradhana Silver",
    },
  ],

  creator: "Om Aradhana Silver",

  openGraph: {
    title: "Om Aradhana Silver",

    description:
      "Trusted by 1100+ Retail Jewellery Showrooms Across India.",

    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={poppins.className}>

        <Header />

        {children}

      </body>

    </html>
  );
}