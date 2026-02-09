import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Roadmap from "@/components/Roadmap";
import TheDifference from "@/components/TheDifference";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import FreeAnalysis from "@/components/FreeAnalysis";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Roadmap />
      <TheDifference />
      <FAQ />
      <FreeAnalysis />
      <Footer />
    </main>
  );
}
