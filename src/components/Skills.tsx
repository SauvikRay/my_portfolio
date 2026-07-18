"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Cpu, Code2, Globe, Layers, ArrowUpRight } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // percentage
  icon: string;
  color: string; // Tailwind class
  glowColor: string; // hex shadow
}

const skills: SkillItem[] = [
  { name: "Flutter", level: 98, icon: "flutter", color: "text-[#02569B]", glowColor: "rgba(2, 86, 155, 0.4)" },
  { name: "Dart", level: 95, icon: "dart", color: "text-[#00B4AB]", glowColor: "rgba(0, 180, 171, 0.4)" },
  { name: "Bloc", level: 92, icon: "bloc", color: "text-[#32E0C4]", glowColor: "rgba(50, 224, 196, 0.4)" },
  { name: "Riverpod", level: 90, icon: "riverpod", color: "text-[#00E5FF]", glowColor: "rgba(0, 229, 255, 0.4)" },
  { name: "Android", level: 92, icon: "android", color: "text-[#3DDC84]", glowColor: "rgba(61, 220, 132, 0.4)" },
  { name: "iOS", level: 90, icon: "ios", color: "text-[#FFFFFF]", glowColor: "rgba(255, 255, 255, 0.3)" },
  { name: "Swift", level: 85, icon: "swift", color: "text-[#F05138]", glowColor: "rgba(240, 81, 56, 0.4)" },
  { name: "Kotlin", level: 82, icon: "kotlin", color: "text-[#7F52FF]", glowColor: "rgba(127, 82, 255, 0.4)" },
  { name: "Firebase", level: 88, icon: "firebase", color: "text-[#FFCA28]", glowColor: "rgba(255, 202, 40, 0.4)" },
  { name: "WebSocket", level: 90, icon: "websocket", color: "text-[#00E5FF]", glowColor: "rgba(0, 229, 255, 0.4)" },
  { name: "REST API", level: 95, icon: "api", color: "text-[#5B8CFF]", glowColor: "rgba(91, 140, 255, 0.4)" },
  { name: "NodeJS", level: 80, icon: "node", color: "text-[#339933]", glowColor: "rgba(51, 153, 51, 0.4)" },
  { name: "CI/CD", level: 88, icon: "cicd", color: "text-[#8B5CF6]", glowColor: "rgba(139, 92, 246, 0.4)" },
  { name: "Docker", level: 78, icon: "docker", color: "text-[#2496ED]", glowColor: "rgba(36, 150, 237, 0.4)" },
  { name: "Git", level: 92, icon: "git", color: "text-[#F05032]", glowColor: "rgba(240, 80, 50, 0.4)" },
  { name: "GetX", level: 85, icon: "getx", color: "text-[#8B5CF6]", glowColor: "rgba(139, 92, 246, 0.4)" },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reveal skills container
    gsap.fromTo(
      el.querySelectorAll(".skill-card-anim"),
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 relative"
    >
      <div className="text-center mb-20">
        <span className="text-brand-primary font-space font-medium text-xs uppercase tracking-[0.25em] mb-4 block">
          Expertise
        </span>
        <h2 className="text-white font-space font-bold text-4xl md:text-5xl">
          Core Technical Stack
        </h2>
        <p className="text-text-muted text-sm md:text-base mt-4 max-w-xl mx-auto font-inter">
          A collection of languages, frameworks, patterns, and environments I've mastered over years of professional mobile architecture.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            whileHover={{
              y: -8,
              rotate: 1.5,
              scale: 1.02,
              boxShadow: `0 15px 40px -10px ${skill.glowColor}`,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="skill-card-anim glass-panel p-6 rounded-custom-md border-white/5 relative overflow-hidden group clickable flex flex-col justify-between min-h-[170px]"
          >
            {/* Hover reflection light */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

            {/* Header info */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <span className="text-white font-space font-bold text-lg md:text-xl tracking-tight">
                  {skill.name}
                </span>
                <span className="text-xs font-space text-text-muted mt-1">
                  Skill Level
                </span>
              </div>
              <span className={`font-space font-bold text-sm ${skill.color}`}>
                {skill.level}%
              </span>
            </div>

            {/* Progress bar container */}
            <div className="mt-auto">
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                {/* Glowing progress line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"
                  style={{
                    boxShadow: `0 0 10px ${skill.glowColor}`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Aurora background light */}
      <div className="absolute right-0 top-[20%] w-[300px] h-[300px] rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none -z-10 animate-pulse" />
    </section>
  );
}
