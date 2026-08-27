import { DesignCard as DesignCardType } from "@/lib/data";

const tagColors: Record<string, string> = {
  accent: "bg-accent-light text-accent",
  purple: "bg-purple-light text-purple",
  green: "bg-green-light text-green",
  yellow: "bg-yellow-light text-yellow",
};

interface DesignCardProps {
  card: DesignCardType;
}

export default function DesignCard({ card }: DesignCardProps) {
  return (
    <article className="flex flex-col bg-white rounded-2xl border border-[#EFEFEF] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-shadow">
      {/* Image placeholder */}
      <div
        className={`w-full h-[260px] bg-gradient-to-br ${card.image} flex items-center justify-center`}
      >
        <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-3.5">
        <h3 className="text-[15px] font-semibold text-dark">{card.title}</h3>
        <p className="text-xs text-muted">{card.author}</p>

        {/* Tags */}
        <div className="flex gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag.label}
              className={`inline-flex items-center h-[22px] px-1.5 rounded text-[11px] font-medium ${tagColors[tag.color]}`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-1">
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <HeartIcon />
            {card.likes}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <EyeIcon />
            {card.views}
          </span>
        </div>
      </div>
    </article>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 12L1.5 6.5C0.5 5.5 0.5 3.5 1.5 2.5C2.5 1.5 4 1.5 5 2.5L7 4.5L9 2.5C10 1.5 11.5 1.5 12.5 2.5C13.5 3.5 13.5 5.5 12.5 6.5L7 12Z"
        stroke="#999"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="2.5" stroke="#999" strokeWidth="1.2" />
      <path
        d="M1 7C2.5 3.5 5 1.5 7 1.5C9 1.5 11.5 3.5 13 7C11.5 10.5 9 12.5 7 12.5C5 12.5 2.5 10.5 1 7Z"
        stroke="#999"
        strokeWidth="1.2"
      />
    </svg>
  );
}
