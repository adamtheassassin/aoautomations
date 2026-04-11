import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import HowItWorks from "@/components/HowItWorks";

import TheDifference from "@/components/TheDifference";
import ROICalculator from "@/components/ROICalculator";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import FreeAnalysis from "@/components/FreeAnalysis";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsSection />
      <HowItWorks />
      <TheDifference />
      <ROICalculator />
      <Pricing />

      <FAQ />
      <FreeAnalysis />
      <Footer />
    </main>
  );
}
