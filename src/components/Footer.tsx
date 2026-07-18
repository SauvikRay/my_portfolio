"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Footer() {
  const topBtnMagnetic = useMagnetic(0.3);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-16 md:py-24 px-4 md:px-8 border-t border-white/5 relative bg-bg-dark/40 overflow-hidden">
      {/* Decorative Wave/Line details */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Brand identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="text-white font-space font-bold text-xl tracking-wider mb-2">
            SAUVIK<span className="text-brand-accent">RAY</span>
          </div>
          <p className="text-text-muted text-xs font-inter">
            Architecting premium mobile spaces. Crafted with Next.js, TS & GSAP.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-text-muted text-xs font-space tracking-wide text-center md:text-right">
          © {new Date().getFullYear()} Sauvik Ray. All rights reserved.
        </div>

        {/* Back to top button */}
        <div ref={topBtnMagnetic} className="magnetic-wrap">
          <button
            onClick={handleScrollToTop}
            aria-label="Back to top"
            className="w-12 h-12 rounded-full border border-white/10 hover:border-brand-primary/40 flex items-center justify-center text-text-muted hover:text-white bg-surface-dark/40 transition-colors clickable focus:outline-none"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
