import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="bg-[#faf7f2]">

      <Hero />

      <Categories />

      <FeaturedProducts />

      <About />

      <WhyChooseUs />

      <ContactCTA />

      <Footer />

      <WhatsAppButton />

    </main>
  );
}