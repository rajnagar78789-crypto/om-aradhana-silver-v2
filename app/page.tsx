import HeroV2 from "@/components/v2/HeroV2";
import Reveal from "@/components/v2/Reveal";

import Categories from "@/components/Categories";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="bg-[#faf7f2]">
      <HeroV2 />

      <Reveal delay={0.05}>
        <Categories />
      </Reveal>
    

      <Reveal delay={0.15}>
        <About />
      </Reveal>

      <Reveal delay={0.2}>
        <WhyChooseUs />
      </Reveal>

      <Reveal delay={0.25}>
        <ContactCTA />
      </Reveal>

      <Footer />

      <WhatsAppButton />
    </main>
  );
}