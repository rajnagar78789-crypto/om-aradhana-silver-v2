import { client } from '@/sanity/lib/client'; 
import HeroSlider from "@/components/HeroSlider"; 
import Categories from "@/components/Categories"; 
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
      
      {/* 1. Cinematic Hero Video */}
      <HeroSlider sliderData={sliderData} />

      {/* 2. Categories ("Explore Collections" button yahin scroll karega) */}
      <div id="collections">
        <Categories />
      </div>

      {/* 3. Live Showcase / Reels */}
      <ReelsShowcase />

      {/* 4. Live Showcase ke turant baad: Why Choose Us (Dark version - Sirf ek baar) */}
      <WhyChooseUs />

      {/* 5. About Section */}
      <section id="about">
        <About />
      </section> 
      
      {/* 6. Contact CTA */}
      <section id="contact">
        <ContactCTA />
      </section>

      {/* 7. Footer & WhatsApp */}
      <Footer />
      <WhatsAppButton />
    </main>
  );
}