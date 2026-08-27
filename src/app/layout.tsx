import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SparkHub - 发现灵感，创造不凡",
  description:
    "汇集全球优秀设计、黑客松作品与 AI 大赛佳作的设计灵感平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
