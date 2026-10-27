"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryBar from "@/components/CategoryBar";
import DailyCurationsSection from "@/components/DailyCurationsSection";
import FeaturedSection from "@/components/FeaturedSection";
import HackathonSection from "@/components/HackathonSection";
import AIContestSection from "@/components/AIContestSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="flex-1">
        <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <DailyCurationsSection searchQuery={searchQuery} />
        <CategoryBar
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <FeaturedSection
          activeCategory={activeCategory}
          searchQuery={searchQuery}
        />
        <HackathonSection searchQuery={searchQuery} />
        <AIContestSection searchQuery={searchQuery} />
      </main>
      <Footer />
    </>
  );
}
