import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import HowItWorks from "@/components/home/HowItWorks";
import DemoPreview from "@/components/home/demoPreview";
import CtaSection from "@/components/home/CtaSection";
import Footer from "@/components/home/Footer";
import { NavbarDemo } from "@/components/navbar/navbar";

export default function Home() {
  return (
    <>
      <NavbarDemo />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <DemoPreview />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
