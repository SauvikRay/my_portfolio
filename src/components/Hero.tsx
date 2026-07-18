"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useMagnetic } from "@/hooks/useMagnetic";
import { ArrowDown, Briefcase, ChevronDown, Download, FileText, Send } from "lucide-react";

const roles = [
  "Senior Flutter Developer",
  "Cross Platform Expert",
  "Mobile Architect",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  const btnProjectsMagnetic = useMagnetic(0.25);
  const btnResumeMagnetic = useMagnetic(0.25);
  const btnContactMagnetic = useMagnetic(0.25);

  useEffect(() => {
    // 1. Role rotation interval
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    // 2. GSAP Letter-by-letter Animation
    const headline = headlineRef.current;
    if (headline) {
      const text = headline.textContent || "";
      headline.innerHTML = "";

      // Split text into characters, keeping spaces as &nbsp;
      const chars = text.split("").map((char) => {
        const span = document.createElement("span");
        span.className = "inline-block opacity-0 translate-y-8 filter blur-sm";
        span.innerHTML = char === " " ? "&nbsp;" : char;
        headline.appendChild(span);
        return span;
      });

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.04,
        ease: "power4.out",
        delay: 0.5,
      });
    }

    // Fade in sub-elements
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1.6 }
    );

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1.8 }
    );

    // 3. Mouse Parallax and 3D Tilt for Profile Photo
    const photoContainer = photoContainerRef.current;
    const photo = photoRef.current;

    if (photoContainer && photo) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = photoContainer.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within container
        const y = e.clientY - rect.top;  // y position within container

        // Calculate rotation angles (-15 to 15 degrees)
        const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 15;
        const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 15;

        // Calculate translation offset (-20px to 20px)
        const transX = ((x - rect.width / 2) / (rect.width / 2)) * 20;
        const transY = ((y - rect.height / 2) / (rect.height / 2)) * 20;

        gsap.to(photo, {
          rotateX: rotX,
          rotateY: rotY,
          x: transX,
          y: transY,
          transformPerspective: 1000,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        // Reset tilt
        gsap.to(photo, {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      photoContainer.addEventListener("mousemove", handleMouseMove);
      photoContainer.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        clearInterval(interval);
        photoContainer.removeEventListener("mousemove", handleMouseMove);
        photoContainer.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex flex-col justify-center items-center px-4 md:px-8 pt-20 overflow-hidden"
    >
      {/* Background blobs and lights */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[15%] w-[40vw] h-[40vw] rounded-full bg-brand-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-brand-secondary/10 blur-[130px] animate-pulse" style={{ animationDuration: "8s" }} />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 py-12">
        {/* Text Content */}
        <div className="lg:col-span-8 flex flex-col text-center lg:text-left items-center lg:items-start order-2 lg:order-1">
          <span className="text-brand-primary font-space font-medium text-sm md:text-base uppercase tracking-[0.25em] mb-4">
            Available for Freelance & Contract
          </span>

          <h1
            ref={headlineRef}
            className="text-white font-space font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-none mb-6 min-h-[1.1em] whitespace-nowrap"
          >
            Hi, I'm Sauvik Ray
          </h1>

          {/* Floating animated subtitles */}
          <div ref={subtitleRef} className="h-10 md:h-12 mb-8 flex items-center justify-center lg:justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-2xl md:text-4xl font-space font-semibold bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent"
              >
                {roles[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-text-muted text-base md:text-lg max-w-xl mb-12 font-inter leading-relaxed">
            Crafting premium, award-winning cross-platform mobile ecosystems. Specialized in clean scalable architectures, hardware integrations, and micro-animations that elevate brands.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap justify-center lg:justify-start gap-4">
            <div ref={btnProjectsMagnetic} className="magnetic-wrap">
              <a
                href="#projects"
                className="px-8 py-4 rounded-full bg-brand-primary text-white font-space font-semibold uppercase tracking-wider text-xs flex items-center gap-2 glow-primary hover:glow-accent hover:bg-brand-accent hover:text-bg-dark transition-all duration-300 clickable"
              >
                <Briefcase size={14} />
                View Projects
              </a>
            </div>
            <div ref={btnResumeMagnetic} className="magnetic-wrap">
              <a
                href="/resume.pdf"
                download
                className="px-8 py-4 rounded-full border border-white/10 hover:border-brand-primary/50 text-white font-space font-semibold uppercase tracking-wider text-xs flex items-center gap-2 hover:bg-white/5 transition-all duration-300 clickable"
              >
                <Download size={14} />
                Get CV
              </a>
            </div>
            <div ref={btnContactMagnetic} className="magnetic-wrap">
              <a
                href="#contact"
                className="px-8 py-4 rounded-full text-text-secondary hover:text-white font-space font-semibold uppercase tracking-wider text-xs flex items-center gap-2 transition-all duration-300 clickable"
              >
                <Send size={14} />
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Profile Portrait Showcase */}
        <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
          <div
            ref={photoContainerRef}
            className="relative w-72 h-72 md:w-96 md:h-96 aspect-square cursor-pointer select-none"
          >
            {/* Ambient Background Glow ring */}
            <div className="absolute inset-0 rounded-custom-lg bg-gradient-to-tr from-brand-primary/20 via-brand-secondary/20 to-brand-accent/20 blur-xl scale-105" />

            {/* Interactive 3D Card */}
            <div
              ref={photoRef}
              className="w-full h-full rounded-custom-lg p-2 glass-panel border-white/10 overflow-hidden shadow-2xl relative"
            >
              {/* Outer border gradient overlay */}
              <div className="absolute inset-0 rounded-custom-lg border border-white/10 pointer-events-none z-20" />

              <img
                src="/profile.png"
                alt="Sauvik Ray portrait"
                className="w-full h-full object-cover rounded-[20px] grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
                draggable={false}
              />

              {/* Float Widget overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel bg-bg-dark/80 rounded-custom-sm border-white/5 flex items-center gap-3 backdrop-blur-md z-10 shadow-lg">
                <span className="w-3 h-3 rounded-full bg-brand-success animate-ping shrink-0" />
                <div className="flex flex-col">
                  <div className="text-[10px] font-space tracking-widest text-text-muted uppercase">Status</div>
                  <div className="text-xs font-space font-medium text-white">Open to Global Opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted hover:text-brand-accent transition-colors duration-300 z-10 clickable focus:outline-none"
      >
        <span className="text-[10px] font-space tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-text-muted/40 flex justify-center p-1.5 relative overflow-hidden">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 rounded-full bg-brand-accent"
          />
        </div>
      </button>
    </section>
  );
}
