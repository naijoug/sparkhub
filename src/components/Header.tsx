"use client";

import { useState } from "react";

const navItems = [
  { label: "发现", href: "#", active: true },
  { label: "分类", href: "#" },
  { label: "黑客松", href: "#" },
  { label: "AI 大赛", href: "#" },
];

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center h-16 bg-white border-b border-border">
      {/* Left: Logo + Nav */}
      <div className="flex items-center gap-8 pl-4">
        <span className="text-[22px] font-extrabold tracking-tight text-dark select-none">
          SparkHub
        </span>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                item.active ? "text-dark" : "text-secondary hover:text-dark"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Right: Search + Upload */}
      <div className="flex items-center gap-3 ml-auto pr-4">
        <div
          className={`flex items-center gap-2 w-[280px] h-10 px-3 rounded-lg transition-colors ${
            searchFocused
              ? "bg-white ring-2 ring-accent/20"
              : "bg-bg-card"
          }`}
        >
          <SearchIcon />
          <input
            type="text"
            placeholder="搜索灵感、作品、标签..."
            className="flex-1 bg-transparent text-[13px] text-dark placeholder:text-muted outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
        <button className="flex items-center h-9 px-4 bg-accent hover:bg-accent/90 text-white text-[13px] font-medium rounded-lg transition-colors">
          上传作品
        </button>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="shrink-0"
    >
      <circle
        cx="8"
        cy="8"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-muted"
      />
      <path
        d="M12 12L16 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-muted"
      />
    </svg>
  );
}
