"use client";

import { useState } from "react";
import { categories } from "@/lib/data";

export default function CategoryBar() {
  const [active, setActive] = useState("all");

  return (
    <section className="bg-white">
      <div className="flex justify-center gap-2.5 py-5 px-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`inline-flex items-center h-9 px-4 rounded-full text-sm font-medium transition-colors ${
              active === cat.id
                ? "bg-accent text-white"
                : "bg-bg-card text-secondary hover:bg-border/50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="h-px bg-border mx-6" />
    </section>
  );
}
