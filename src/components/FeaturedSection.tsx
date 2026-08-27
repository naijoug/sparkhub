import { featuredCards } from "@/lib/data";
import DesignCard from "./DesignCard";

export default function FeaturedSection() {
  return (
    <section className="bg-white px-12 py-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-dark">精选作品</h2>
        <a href="#" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
          查看更多 →
        </a>
      </div>

      {/* Card grid: 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCards.map((card) => (
          <DesignCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
