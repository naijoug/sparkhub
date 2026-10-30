import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SparkHub — 数字艺术与灵感策展志 | 发现灵感，创造不凡",
  description:
    "汇集全球优秀设计、黑客松作品、AI 大赛佳作与每日新锐产品、创意活动及灵感网站的策展平台",
};

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem("sparkhub:theme");
    var theme = (stored === "dark" || stored === "light")
      ? stored
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className="h-full antialiased selection:bg-accent selection:text-white"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col text-dark">{children}</body>
    </html>
  );
}
