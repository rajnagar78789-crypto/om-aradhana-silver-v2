import { client } from '@/sanity/lib/client'; 
import HeroSlider from "@/components/HeroSlider"; 
import Categories from "@/components/Categories"; // 🔥 WAPAS LE AAYA TERA KHAZANA
import ReelsShowcase from "@/components/ReelsShowcase"; 
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const revalidate = 0; 

const sliderQuery = `*[_type == "heroSlider"][0] {
  sliderName,
  slides[] {
    productName,
    "videoUrl": videoFile.asset->url, 
    tagline,
    collectionLink
  }
}`;

export default async function Home() {
  const sliderData = await client.fetch(sliderQuery);

  return (
    <main className="bg-[#150d11]"> 
      
      {/* TERA NAYA VIP SHOWCASE */}
      <section id="vip-grid">
        <HeroSlider sliderData={sliderData} />
      </section>

      {/* 🔥 TERE ASLI PRODUCTS YAHAN DIKHENGE */}
      <section id="collections">
        <Categories />
      </section>

      <ReelsShowcase />

      <section id="about">
        <About />
      </section> 
      
      <WhyChooseUs />

      <section id="contact">
        <ContactCTA />
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}