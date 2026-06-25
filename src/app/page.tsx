import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";

export default function Home() {
  return (
    <main
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        backgroundColor: "#081229",
      }}
    >
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
    </main>
  );
}
