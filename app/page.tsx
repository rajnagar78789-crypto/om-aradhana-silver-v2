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