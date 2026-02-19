import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import HowItWorks from "@/components/HowItWorks";

import TheDifference from "@/components/TheDifference";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import FreeAnalysis from "@/components/FreeAnalysis";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsSection />
      <HowItWorks />
      <TheDifference />

      <FAQ />
      <FreeAnalysis />
      <Footer />
    </main>
  );
}
