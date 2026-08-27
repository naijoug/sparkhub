import { aiContestCards } from "@/lib/data";

const badgeColors: Record<string, string> = {
  purple: "bg-purple text-white",
  yellow: "bg-yellow text-dark",
  green: "bg-green text-white",
  accent: "bg-accent text-white",
};

export default function AIContestSection() {
  return (
    <section className="bg-white px-12 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-dark">AI 大赛佳作</h2>
        <a href="#" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
          查看更多 →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {aiContestCards.map((card) => (
          <article
            key={card.id}
            className="flex flex-col bg-white rounded-2xl overflow-hidden border border-[#EFEFEF] shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-shadow"
          >
            {/* Image */}
            <div
              className={`w-full h-[200px] bg-gradient-to-br ${card.image} rounded-t-2xl flex items-end p-3`}
            >
              <span
                className={`inline-flex items-center h-6 px-2 rounded-md text-[11px] font-semibold ${badgeColors[card.badgeColor]}`}
              >
                {card.badge}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1.5 p-3">
              <h3 className="text-sm font-semibold text-dark">{card.title}</h3>
              <p className="text-xs text-muted">{card.meta}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
