import { footerLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row gap-20 px-12 py-12 bg-dark">
      {/* Logo + Description */}
      <div className="flex flex-col gap-3 max-w-[320px]">
        <span className="text-[22px] font-extrabold text-white select-none">
          SparkHub
        </span>
        <p className="text-[13px] text-muted leading-relaxed">
          发现灵感，创造不凡。汇集全球优秀设计、黑客松作品与 AI
          大赛佳作的设计灵感平台。
        </p>
        <p className="text-xs text-[#666] mt-auto">
          &copy; 2024 SparkHub. All rights reserved.
        </p>
      </div>

      {/* Link columns */}
      <div className="flex gap-20">
        <FooterColumn title="浏览" links={footerLinks.browse} />
        <FooterColumn title="大赛" links={footerLinks.contest} />
        <FooterColumn title="关于" links={footerLinks.about} />
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-[13px] text-muted hover:text-white transition-colors"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
