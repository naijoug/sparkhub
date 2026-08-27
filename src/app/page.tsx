import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryBar from "@/components/CategoryBar";
import FeaturedSection from "@/components/FeaturedSection";
import HackathonSection from "@/components/HackathonSection";
import AIContestSection from "@/components/AIContestSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <CategoryBar />
        <FeaturedSection />
        <HackathonSection />
        <AIContestSection />
      </main>
      <Footer />
    </>
  );
}
