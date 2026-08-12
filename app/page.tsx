import HeroV2 from "@/components/v2/HeroV2";
import Categories from "@/components/Categories";
import ReelsShowcase from "@/components/ReelsShowcase"; // 🔥 Ye line add hui hai
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="bg-[#faf7f2]">
      <HeroV2 />

      <section id="collections">
        <Categories />
      </section>

      {/* 🔥 Reels Section Added Here */}
      <ReelsShowcase />

      {/* ❌ Purana wala section humne yahan se hide (comment) kar diya hai 👇 */}
      {/* 
      <section id="about">
        <About />
      </section> 
      */}

      {/* ✅ Tera pasandida naya (Centered) section yeh raha 👇 */}
      <WhyChooseUs />

      <section id="contact">
        <ContactCTA />
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}