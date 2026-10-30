import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  hackathonEditions,
  getHackathonById,
} from "@/lib/hackathons";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return hackathonEditions.map((h) => ({ id: h.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const hackathon = getHackathonById(id);

  if (!hackathon) {
    return {
      title: "黑客松赛事未找到 — SparkHub 灵感殿堂",
    };
  }

  return {
    title: `${hackathon.name} (${hackathon.dateDisplay}) — 高票造物展录 | SparkHub`,
    description: hackathon.description,
  };
}

export default async function HackathonEditionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hackathon = getHackathonById(id);

  if (!hackathon) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-dark">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-bg-light/92 backdrop-blur-md border-b border-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/#hackathons"
              className="inline-flex items-center gap-2 text-xs font-mono-meta uppercase tracking-wider text-secondary hover:text-dark transition-colors px-3 py-1.5 rounded-full border border-border bg-surface hover:border-dark"
            >
              <span>←</span>
              <span>返回黑客松展厅</span>
            </Link>

            <span className="text-border hidden sm:inline">/</span>

            <span className="text-xs font-mono-meta text-muted hidden sm:inline">
              {hackathon.edition} · {hackathon.name}
            </span>
          </div>

          <a
            href={hackathon.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-dark hover:bg-accent text-white text-xs font-mono-meta uppercase transition-all shadow-sm cursor-pointer"
          >
            <span>访问赛事官网 / Devpost ↗</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 py-10 lg:py-16 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto space-y-12">
          {/* Masthead Header */}
          <section className="space-y-6 pb-10 border-b border-border">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono-meta">
              <span className="px-2.5 py-1 rounded bg-dark text-surface font-semibold tracking-wider">
                {hackathon.catalogNo}
              </span>
              <span className="px-3 py-1 rounded-full bg-accent-light text-accent border border-accent/25 font-semibold">
                📅 举办日期：{hackathon.dateDisplay}
              </span>
              <span className="px-3 py-1 rounded-full bg-surface border border-border text-secondary">
                📍 {hackathon.location}
              </span>
              <span className="px-3 py-1 rounded-full bg-surface border border-border text-accent font-semibold">
                💰 总奖金池：{hackathon.prizePool}
              </span>
              <span className="px-3 py-1 rounded-full bg-surface border border-border text-dark">
                🏢 主办平台：{hackathon.organizer}
              </span>
            </div>

            <div className="space-y-3 max-w-4xl">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-dark leading-tight">
                {hackathon.name}
              </h1>
              <p className="font-editorial italic text-xl sm:text-2xl text-secondary">
                {hackathon.englishName} · {hackathon.edition}
              </p>
              <p className="text-secondary text-base leading-relaxed pt-2 max-w-3xl">
                {hackathon.description}
              </p>
            </div>
          </section>

          {/* Winning / Top Voted Products Section */}
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono-meta uppercase text-muted">
                  TOP-VOTED SPECIMENS &amp; WINNERS
                </span>
                <h2 className="font-editorial text-3xl font-bold text-dark">
                  本期高票与获奖产品专区 ({hackathon.products.length} 款)
                </h2>
                <p className="text-sm text-secondary">
                  汇聚本届黑客松中由评委会特选与全球社区最高票选拔出的先锋产品，每个产品均配有详实档案与直达主站链接。
                </p>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hackathon.products.map((prd) => (
                <div
                  key={prd.id}
                  className="group relative flex flex-col justify-between bg-surface rounded-3xl border border-border overflow-hidden hover:border-dark/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Top Gradient Header Plate */}
                  <div
                    className={`relative w-full h-[190px] bg-gradient-to-br ${prd.coverGradient} p-6 flex flex-col justify-between overflow-hidden`}
                  >
                    <div className="absolute inset-3 border border-white/20 rounded-2xl pointer-events-none" />

                    <div className="relative z-10 flex items-center justify-between text-xs font-mono-meta text-white/80">
                      <span>{prd.catalogNo}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 text-[10px]">
                        {prd.targetPlatform}
                      </span>
                    </div>

                    <div className="relative z-10 flex items-end justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-dark/70 text-white backdrop-blur-sm border border-white/20">
                        {prd.award.split(" (")[0]}
                      </span>
                      <span className="text-xs font-mono-meta text-white/90 font-semibold">
                        🔥 {prd.votes.toLocaleString()} 票
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-editorial text-2xl font-bold text-dark group-hover:text-accent transition-colors leading-snug">
                          {prd.title}
                        </h3>
                        <p className="font-editorial italic text-sm text-secondary mt-1">
                          “{prd.tagline}”
                        </p>
                      </div>

                      <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                        {prd.summary}
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {prd.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[11px] font-mono-meta bg-bg-light text-muted border border-border/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-6 mt-4 border-t border-border flex items-center justify-between text-xs font-mono-meta">
                      <Link
                        href={`/products/${prd.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-dark text-surface hover:bg-accent transition-colors font-semibold shadow-sm"
                      >
                        <span>查看详细页面</span>
                        <span>→</span>
                      </Link>

                      <a
                        href={prd.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-secondary hover:text-dark hover:bg-bg-light transition-colors"
                      >
                        <span>访问主站</span>
                        <span className="text-xs">↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
