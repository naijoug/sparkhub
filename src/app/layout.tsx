import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SparkHub — 数字艺术与灵感策展志 | 发现灵感，创造不凡",
  description:
    "汇集全球优秀设计、黑客松作品、AI 大赛佳作与每日新锐产品、创意活动及灵感网站的策展平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="h-full antialiased selection:bg-accent selection:text-white">
      <body className="min-h-full flex flex-col text-dark">{children}</body>
    </html>
  );
}
