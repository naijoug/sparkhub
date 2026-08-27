import { hotTags } from "@/lib/data";

const tagColors: Record<string, string> = {
  accent: "bg-accent-light text-accent",
  purple: "bg-purple-light text-purple",
  green: "bg-green-light text-green",
  yellow: "bg-yellow-light text-yellow",
};

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center h-[400px] bg-bg-light px-4 gap-6">
      <h1 className="text-[48px] font-extrabold text-dark text-center max-w-[600px] leading-tight">
        发现灵感，创造不凡
      </h1>
      <p className="text-base text-secondary text-center max-w-[560px]">
        汇集全球优秀设计、黑客松作品与 AI 大赛佳作，随时随地找到你需要的灵感
      </p>

      {/* Large search box */}
      <div className="flex items-center gap-2 w-full max-w-[560px] h-[52px] px-4 bg-white rounded-full border border-border shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="shrink-0"
        >
          <circle
            cx="9"
            cy="9"
            r="6"
            stroke="#999"
            strokeWidth="1.5"
          />
          <path
            d="M13.5 13.5L18 18"
            stroke="#999"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          placeholder="搜索设计灵感、功能模块、标签..."
          className="flex-1 bg-transparent text-[15px] text-dark placeholder:text-muted outline-none"
        />
      </div>

      {/* Hot tags */}
      <div className="flex items-center gap-2.5">
        <span className="text-[13px] text-muted">热门：</span>
        {hotTags.map((tag) => (
          <span
            key={tag.label}
            className={`inline-flex items-center h-7 px-2.5 rounded-full text-xs font-medium ${tagColors[tag.color]}`}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </section>
  );
}
