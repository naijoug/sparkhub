import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allHackathonProducts,
  getProductById,
  getRelatedProducts,
  getHackathonById,
} from "@/lib/hackathons";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return allHackathonProducts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "作品未找到 — SparkHub 灵感殿堂",
    };
  }

  return {
    title: `${product.title} — ${product.tagline} | SparkHub 黑客松馆藏详情`,
    description: product.summary,
  };
}

const platformBadgeMap: Record<string, { label: string; colorClass: string }> = {
  app: {
    label: "移动端 App",
    colorClass: "bg-yellow-light text-yellow border-yellow/30",
  },
  web: {
    label: "Web 网站与应用",
    colorClass: "bg-purple-light text-purple border-purple/30",
  },
  ai: {
    label: "AI 智能体与系统",
    colorClass: "bg-green-light text-green border-green/30",
  },
  cross: {
    label: "跨端与空间计算",
    colorClass: "bg-accent-light text-accent border-accent/30",
  },
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const hackathon = getHackathonById(product.hackathonId);
  const relatedProducts = getRelatedProducts(product.id, 3);
  const platformBadge = platformBadgeMap[product.platformCategory] || {
    label: product.platformCategory,
    colorClass: "bg-surface text-secondary border-border",
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-dark">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-bg-light/92 backdrop-blur-md border-b border-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/#hackathons"
              className="inline-flex items-center gap-2 text-xs font-mono-meta uppercase tracking-wider text-secondary hover:text-dark transition-colors px-3 py-1.5 rounded-full border border-border bg-surface hover:border-dark"
            >
              <span>←</span>
              <span>返回黑客松展馆</span>
            </Link>

            <span className="text-border hidden sm:inline">/</span>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono-meta text-muted">
              <span>{product.hackathonName}</span>
              <span>/</span>
              <span className="text-dark font-semibold">{product.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={product.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent hover:bg-dark text-white text-xs font-mono-meta uppercase transition-all shadow-sm cursor-pointer"
            >
              <span>直达主站体验</span>
              <span className="text-xs">↗</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 py-10 lg:py-16 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto space-y-12">
          {/* Hero Section */}
          <section className="space-y-6 pb-10 border-b border-border">
            {/* Metadata Tags Row */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono-meta">
              <span className="px-2.5 py-1 rounded bg-dark text-surface font-semibold tracking-wider">
                {product.catalogNo}
              </span>
              <span
                className={`px-3 py-1 rounded-full border font-semibold ${platformBadge.colorClass}`}
              >
                ● {platformBadge.label}
              </span>
              <span className="px-3 py-1 rounded-full bg-surface border border-border text-secondary">
                🎯 {product.targetPlatform}
              </span>
              <span className="px-3 py-1 rounded-full bg-surface border border-border text-accent font-semibold">
                {product.award}
              </span>
              <span className="px-3 py-1 rounded-full bg-surface border border-border text-dark font-semibold">
                🔥 {product.votes.toLocaleString()} 社区有效票 · 第 {product.voteRank} 名
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-4 max-w-4xl">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-dark leading-[1.15]">
                {product.title}
              </h1>
              <p className="font-editorial italic text-xl sm:text-2xl text-secondary leading-relaxed">
                “{product.tagline}”
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={product.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-dark hover:bg-accent text-surface text-sm font-mono-meta uppercase tracking-wider transition-all shadow-md group cursor-pointer"
              >
                <span>🚀 访问产品主站 / 在线体验</span>
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </a>

              {product.githubUrl && (
                <a
                  href={product.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-surface hover:bg-bg-card border border-border hover:border-dark text-dark text-sm font-mono-meta uppercase tracking-wider transition-all cursor-pointer"
                >
                  <span>💻 查看 GitHub 源码 / 仓库</span>
                  <span>↗</span>
                </a>
              )}

              {hackathon && (
                <Link
                  href={`/hackathons/${hackathon.id}`}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-bg-card/75 hover:bg-surface border border-border hover:border-dark text-secondary hover:text-dark text-sm font-mono-meta uppercase tracking-wider transition-all"
                >
                  <span>🏛️ 所属赛事：{hackathon.name}</span>
                  <span>→</span>
                </Link>
              )}
            </div>
          </section>

          {/* Two Columns Grid: Dossier Body & Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 8 Cols: Detailed Narrative */}
            <div className="lg:col-span-8 space-y-10">
              {/* Visual Cover Plaque */}
              <div
                className={`relative w-full h-[280px] sm:h-[360px] rounded-3xl bg-gradient-to-br ${product.coverGradient} p-8 flex flex-col justify-between overflow-hidden shadow-[0_12px_36px_rgba(20,19,18,0.1)] border border-white/10`}
              >
                <div className="absolute inset-4 border border-white/20 rounded-2xl pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between text-white/80 font-mono-meta text-xs">
                  <span>SPECIMEN DOSSIER · ARCHIVAL SCAN</span>
                  <span>VERIFIED RECORD ✦</span>
                </div>

                <div className="relative z-10 space-y-2">
                  <span className="text-[11px] font-mono-meta uppercase px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/25">
                    {product.targetPlatform}
                  </span>
                  <div className="font-editorial text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {product.title}
                  </div>
                  <p className="text-white/80 text-sm max-w-xl line-clamp-2">
                    {product.tagline}
                  </p>
                </div>
              </div>

              {/* 01 · 核心概述与产品全貌 */}
              <section className="space-y-4 bg-surface p-8 rounded-3xl border border-border shadow-[0_4px_16px_rgba(20,19,18,0.03)]">
                <div className="flex items-center gap-2 text-xs font-mono-meta uppercase tracking-wider text-accent font-semibold">
                  <span>SECTION 01</span>
                  <span>•</span>
                  <span>WHAT IT DOES · 产品功能全貌</span>
                </div>
                <h2 className="font-editorial text-2xl font-bold text-dark">
                  产品是干什么的与运作机制
                </h2>
                <p className="text-secondary text-base leading-[1.85] whitespace-pre-line">
                  {product.summary}
                </p>
              </section>

              {/* 02 · 解决的核心痛点 */}
              <section className="space-y-4 bg-surface p-8 rounded-3xl border border-border shadow-[0_4px_16px_rgba(20,19,18,0.03)]">
                <div className="flex items-center gap-2 text-xs font-mono-meta uppercase tracking-wider text-green font-semibold">
                  <span>SECTION 02</span>
                  <span>•</span>
                  <span>PROBLEM &amp; IMPACT · 痛点与实际价值</span>
                </div>
                <h2 className="font-editorial text-2xl font-bold text-dark">
                  解决的现实世界痛点
                </h2>
                <p className="text-secondary text-base leading-[1.85]">
                  {product.problemSolved}
                </p>
              </section>

              {/* 03 · 核心功能与交互亮点 */}
              <section className="space-y-6 bg-surface p-8 rounded-3xl border border-border shadow-[0_4px_16px_rgba(20,19,18,0.03)]">
                <div className="flex items-center gap-2 text-xs font-mono-meta uppercase tracking-wider text-purple font-semibold">
                  <span>SECTION 03</span>
                  <span>•</span>
                  <span>KEY INNOVATIONS · 关键功能与交互特色</span>
                </div>
                <h2 className="font-editorial text-2xl font-bold text-dark">
                  为什么在赛事中脱颖而出
                </h2>
                <ul className="space-y-4">
                  {product.coreFeatures.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-bg-light/75 border border-border/80"
                    >
                      <span className="w-6 h-6 rounded-full bg-dark text-surface text-xs font-mono-meta flex items-center justify-center shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span className="text-dark/90 text-sm sm:text-base leading-relaxed">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 04 · 策展人专业评述 */}
              <section className="relative p-8 rounded-3xl bg-bg-card/75 border-l-4 border-accent border-y border-r border-border">
                <div className="flex items-center gap-2 text-xs font-mono-meta uppercase tracking-wider text-accent font-semibold mb-3">
                  <span>SECTION 04</span>
                  <span>•</span>
                  <span>CURATOR&apos;S CRITIQUE · 策展人评述</span>
                </div>
                <blockquote className="font-editorial italic text-lg sm:text-xl text-dark leading-relaxed">
                  “{product.curatorCritique}”
                </blockquote>
                <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between text-xs font-mono-meta text-muted">
                  <span>SPARKHUB ACADEMIC JURY · 灵感馆评选委员会</span>
                  <span>RATING: ★★★★★</span>
                </div>
              </section>
            </div>

            {/* Right 4 Cols: Archival Provenance Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Competition Provenance Plaque */}
              <div className="bg-surface p-7 rounded-3xl border border-border space-y-6 shadow-sm">
                <div className="space-y-1 pb-4 border-b border-border">
                  <span className="text-[10px] font-mono-meta uppercase tracking-widest text-muted">
                    PROVENANCE ARCHIVE
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-dark">
                    赛事造物档案
                  </h3>
                </div>

                <div className="space-y-4 text-xs font-mono-meta">
                  <div className="space-y-1">
                    <span className="text-muted uppercase">所属 Hackathon 赛事</span>
                    <p className="text-sm font-sans font-semibold text-dark">
                      {product.hackathonName}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-muted uppercase">举办日期与赛期</span>
                    <p className="text-sm font-semibold text-accent">
                      📅 {product.hackathonDates}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-muted uppercase">主办方与竞赛平台</span>
                    <p className="text-sm text-dark font-medium">
                      🏢 {product.organizer}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-muted uppercase">参赛团队 / 开发者</span>
                    <p className="text-sm text-dark font-medium">
                      👥 {product.team.name}
                      {product.team.members && (
                        <span className="text-muted font-normal block text-xs mt-0.5">
                          成员: {product.team.members.join(" · ")}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-muted uppercase">所获奖项荣誉</span>
                    <p className="text-sm font-semibold text-yellow">
                      {product.award}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-muted uppercase">社区有效投票支持</span>
                    <p className="text-sm font-semibold text-dark">
                      🔥 {product.votes.toLocaleString()} 票 (赛道第 {product.voteRank} 名)
                    </p>
                  </div>
                </div>

                {/* Direct Action in Sidebar */}
                <div className="pt-4 border-t border-border space-y-3">
                  <a
                    href={product.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-accent hover:bg-dark text-white text-xs font-mono-meta uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>跳转至产品主站 ↗</span>
                  </a>

                  {product.githubUrl && (
                    <a
                      href={product.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-bg-light hover:bg-border text-dark text-xs font-mono-meta uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>查看源码 / GitHub ↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Technology Stack Card */}
              <div className="bg-surface p-7 rounded-3xl border border-border space-y-4 shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-meta uppercase tracking-widest text-muted">
                    TECHNICAL ARCHITECTURE
                  </span>
                  <h3 className="font-editorial text-lg font-bold text-dark">
                    所用核心技术栈
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {product.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono-meta bg-bg-card text-dark border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Museum Edition Seal */}
              <div className="p-6 rounded-3xl bg-bg-card/65 border border-border text-[11px] font-mono-meta space-y-2 text-muted">
                <div className="text-dark font-semibold">
                  SPARKHUB CURATORIAL SPECIMEN
                </div>
                <p>
                  本档案经 SparkHub 数字艺术文献馆严谨核验收录，所有外部链接均直通开发者官方发布地址。
                </p>
                <div className="pt-2 text-dark/70">
                  REGISTRY: {product.catalogNo} · OPEN ACCESS
                </div>
              </div>
            </aside>
          </div>

          {/* Related Products Section */}
          <section className="pt-12 border-t border-border space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono-meta uppercase text-muted">
                  EXPLORE MORE SPECIMENS
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-dark">
                  同平台与同期其他高票黑客松造物
                </h3>
              </div>
              <Link
                href="/#hackathons"
                className="text-xs font-mono-meta uppercase text-accent hover:text-dark transition-colors inline-flex items-center gap-1"
              >
                <span>浏览全部黑客松赛事与产品</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between bg-surface rounded-3xl border border-border p-6 hover:border-dark/50 hover:shadow-lg transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono-meta">
                      <span className="px-2 py-0.5 rounded bg-bg-card text-muted">
                        {item.catalogNo}
                      </span>
                      <span className="text-accent font-semibold">
                        🔥 {item.votes} 票
                      </span>
                    </div>

                    <div>
                      <h4 className="font-editorial text-xl font-bold text-dark group-hover:text-accent transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs font-mono-meta text-muted mt-1">
                        {item.targetPlatform} · {item.hackathonName}
                      </p>
                    </div>

                    <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-border flex items-center justify-between text-xs font-mono-meta">
                    <Link
                      href={`/products/${item.id}`}
                      className="text-dark hover:text-accent font-semibold transition-colors inline-flex items-center gap-1"
                    >
                      <span>阅读详实档案</span>
                      <span>→</span>
                    </Link>

                    <a
                      href={item.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-dark transition-colors inline-flex items-center gap-1"
                    >
                      <span>直达主站 ↗</span>
                    </a>
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
