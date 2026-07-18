"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Lock scrolling on body
    document.body.style.overflow = "hidden";

    // 2. Count up progress
    let count = 0;
    const duration = 2200; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      count += increment;
      if (count >= 100) {
        setProgress(100);
        clearInterval(timer);
        triggerExitAnimation();
      } else {
        setProgress(Math.floor(count));
      }
    }, stepTime);

    // GSAP floating logo entry animation
    gsap.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0, filter: "blur(10px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
    );

    // 3. Exit animation function
    const triggerExitAnimation = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
          onComplete();
        },
      });

      // Scale logo out
      tl.to(logoRef.current, {
        scale: 1.4,
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.8,
        ease: "power4.inOut",
      });

      // Shrink and slide counter
      tl.to(
        counterRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        "-=0.6"
      );

      // Slide up/fade out loading container with a dramatic blur transition
      tl.to(
        screenRef.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          opacity: 0,
          duration: 1,
          ease: "power4.inOut",
        },
        "-=0.3"
      );
    };

    return () => {
      clearInterval(timer);
    };
  }, [onComplete]);

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-9999 bg-bg-dark flex flex-col justify-between p-8 md:p-16 select-none"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      {/* Top Header Placeholder */}
      <div className="flex justify-between items-center text-xs font-space tracking-widest text-text-muted uppercase">
        <span>Sauvik Ray</span>
        <span>Portfolio ©2026</span>
      </div>

      {/* Main Logo Showcase */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div ref={logoRef} className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24 rounded-2xl bg-surface-dark border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(91,140,255,0.15)] overflow-hidden">
            {/* Pulsing inner gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-brand-secondary opacity-20 animate-pulse" />
            <span className="text-white font-space text-4xl font-bold tracking-widest relative z-10">
              SR
            </span>
          </div>
          <div className="text-sm font-space tracking-[0.25em] text-text-secondary uppercase">
            Mobile Architect
          </div>
        </div>
      </div>

      {/* Bottom Counter */}
      <div
        ref={counterRef}
        className="flex justify-between items-end border-t border-white/5 pt-8"
      >
        <div className="flex flex-col gap-1">
          <div className="text-xs font-space tracking-widest text-text-muted uppercase">
            Loading System
          </div>
          <div className="text-[10px] font-space tracking-wide text-brand-primary uppercase animate-pulse">
            Compiling widgets...
          </div>
        </div>
        {/* Dynamic numerical percentage */}
        <div className="font-space text-8xl md:text-9xl font-bold leading-none tracking-tighter text-white select-none">
          {progress.toString().padStart(3, "0")}
        </div>
      </div>
    </div>
  );
}
