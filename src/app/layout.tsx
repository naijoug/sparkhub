import type { Metadata } from "next";
import {
  buildCanonicalUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: SITE_TITLE,
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "SparkHub",
    "数字艺术",
    "灵感策展",
    "黑客松",
    "Hackathon",
    "设计工程",
    "Design Engineering",
    "生成式艺术",
    "AI 大赛",
    "灵感信源",
  ],
  alternates: {
    canonical: buildCanonicalUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: buildCanonicalUrl("/"),
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
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
