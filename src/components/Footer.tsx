import { footerLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0F0E0D] text-surface px-6 lg:px-12 pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto space-y-14">
        <div className="flex flex-col lg:flex-row justify-between gap-12 pb-12 border-b border-white/10">
          {/* Left: Colophon & Curatorial Imprint */}
          <div className="flex flex-col gap-4 max-w-[420px]">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-[11px] font-editorial italic text-white">
                S
              </span>
              <span className="font-editorial text-2xl font-bold text-white select-none">
                SparkHub
              </span>
              <span className="text-[10px] font-mono-meta uppercase px-2 py-0.5 border border-white/20 rounded text-white/75">
                Atelier &amp; Radar
              </span>
            </div>
            <p className="text-[13px] text-white/65 leading-[1.8]">
              发现灵感，创造不凡。一座致力于数字界面美学、先锋创客实验与生成式视觉艺术的在线文献馆，每日自动漫游采撷全球有温度的新锐造物。
            </p>
            <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-mono-meta text-white/45">
              <span>TYPESET IN SERIF &amp; MONO</span>
              <span>PAPER TONE: #F6F2E9</span>
              <span>EDITION: 2026.10</span>
            </div>
          </div>

          {/* Right: Curatorial Directory Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-16">
            <FooterColumn no="I" title="展馆导览" links={footerLinks.browse} />
            <FooterColumn no="II" title="先锋赛事" links={footerLinks.contest} />
            <FooterColumn no="III" title="灵感信源" links={footerLinks.about} />
          </div>
        </div>

        {/* Bottom Archival Colophon & Oversized Watermark */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono-meta text-white/40">
          <span>
            &copy; 2024–2026 SPARKHUB CURATORIAL ARCHIVE. ALL RIGHTS RESERVED.
          </span>
          <span>PRINTED DIGITALLY · FORM FOLLOWS POETICS</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  no,
  title,
  links,
}: {
  no: string;
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-mono-meta uppercase tracking-wider text-white/90 flex items-center gap-2">
        <span className="text-accent font-editorial italic">{no}.</span>
        <span>{title}</span>
      </h4>
      {links.map((link) => {
        const isExternal = link.href.startsWith("http");
        return (
          <a
            key={link.label}
            href={link.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-[13px] text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            <span>{link.label}</span>
            {isExternal && <span className="text-[10px] opacity-60">↗</span>}
          </a>
        );
      })}
    </div>
  );
}
