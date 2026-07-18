"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Briefcase, Calendar, Award, Code2 } from "lucide-react";

interface Milestone {
  role: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
  icon: React.ReactNode;
  color: string; // Tailwind class
}

const experiences: Milestone[] = [
  {
    role: "Senior Mobile Architect",
    company: "Global Tech Solutions",
    period: "2021 — PRESENT",
    description: "Orchestrating the mobile application stack for a high-transaction global fintech platform.",
    bullets: [
      "Led transition to Clean Architecture & BLoC state modules, reducing crash rates to 0.02%.",
      "Created a modular micro-app ecosystem allowing 15+ sub-teams to ship code independently.",
      "Optimized native Swift/Kotlin bindings for high-performance localized cryptography.",
      "Established fully automated CI/CD pipelines deploying to stores in under 12 minutes."
    ],
    icon: <Award size={18} />,
    color: "text-brand-primary"
  },
  {
    role: "Senior Flutter Developer",
    company: "Innovate Labs",
    period: "2019 — 2021",
    description: "Designed bespoke, interactive applications for luxury brand accounts and high-profile clients.",
    bullets: [
      "Created custom graphics rendering engines using Canvas/Skia shaders, winning two design awards.",
      "Reduced CPU and memory consumption by 35% through strict frame profiling and widget pruning.",
      "Implemented complex WebSocket synchronizations supporting offline-first transactional states.",
      "Mentored 6 junior devs and introduced automated unit/integration test workflows."
    ],
    icon: <Code2 size={18} />,
    color: "text-brand-accent"
  },
  {
    role: "Mobile App Developer",
    company: "StartUp Inc.",
    period: "2017 — 2019",
    description: "Founding member of the mobile team, bootstrapping client applications from early proof-of-concepts.",
    bullets: [
      "Successfully migrated three native iOS/Android codebases to Flutter, cutting development costs by 50%.",
      "Integrated Google Maps SDK, geolocation tracking, and real-time push dispatch logic.",
      "Designed and deployed responsive mobile dashboards utilizing REST endpoints and SQLite caches.",
      "Integrated Stripe and Apple/Google Pay systems driving early product monetization."
    ],
    icon: <Briefcase size={18} />,
    color: "text-brand-secondary"
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Timeline Progress Line Filling Animation
    gsap.to(lineProgressRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 60%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    // 2. Alternate Slide-in Animations for Milestones
    const items = container.querySelectorAll(".timeline-item-anim");
    items.forEach((item) => {
      const isLeft = item.classList.contains("timeline-left");
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: isLeft ? -50 : 50,
          filter: "blur(5px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
        }
      );
    });

    // 3. Timeline Center Nodes Scaling Animation
    const nodes = container.querySelectorAll(".timeline-node-anim");
    nodes.forEach((node) => {
      gsap.fromTo(
        node,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 relative overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-brand-secondary font-space font-medium text-xs uppercase tracking-[0.25em] mb-4 block">
          Journey
        </span>
        <h2 className="text-white font-space font-bold text-4xl md:text-5xl">
          Professional History
        </h2>
        <p className="text-text-muted text-sm md:text-base mt-4 max-w-xl mx-auto font-inter">
          A timeline of my professional accomplishments, engineering contributions, and team leadership.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative max-w-5xl mx-auto">
        {/* Background Central Tracking Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 z-0" />
        {/* Animated Active Tracking Line */}
        <div
          ref={lineProgressRef}
          className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-brand-primary via-brand-accent to-brand-secondary -translate-x-1/2 z-0 origin-top"
          style={{ height: "0%" }}
        />

        {/* Milestones list */}
        <div className="flex flex-col gap-12 md:gap-20">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center"
              >
                {/* Node indicator */}
                <div
                  className="timeline-node-anim absolute left-4 md:left-1/2 w-9 h-9 rounded-full bg-surface-dark border-2 border-white/10 z-10 -translate-x-1/2 flex items-center justify-center text-white shadow-xl"
                  style={{
                    boxShadow: `0 0 15px rgba(255,255,255,0.05)`,
                  }}
                >
                  <div className={`p-1.5 rounded-full ${exp.color}`}>
                    {exp.icon}
                  </div>
                </div>

                {/* Left Side Content (Desktop: Even item shows Card; Odd item shows empty) */}
                <div
                  className={`timeline-item-anim timeline-left col-span-1 md:col-span-5 pl-12 md:pl-0 ${
                    isLeft ? "md:text-right" : "hidden md:block md:opacity-0 pointer-events-none"
                  }`}
                >
                  {isLeft && (
                    <div className="glass-panel p-6 md:p-8 rounded-custom-md border-white/5 shadow-xl relative overflow-hidden group hover:border-brand-primary/30 transition-colors duration-500 text-left md:text-right">
                      {/* Hover reflection light */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                      
                      <span className="text-xs font-mono font-bold text-brand-primary tracking-widest inline-flex items-center gap-1.5 mb-2">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      <h3 className="text-white font-space font-bold text-xl md:text-2xl leading-tight mb-1">
                        {exp.role}
                      </h3>
                      <span className="text-brand-accent font-space text-sm font-medium block mb-4">
                        {exp.company}
                      </span>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4 font-inter">
                        {exp.description}
                      </p>
                      <ul className="flex flex-col gap-2 md:items-end">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="text-xs md:text-sm text-text-muted font-inter leading-relaxed flex gap-2 text-left md:text-right">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2 bg-brand-accent md:order-last" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Middle spacer for timeline node (Desktop only, spans 2 columns) */}
                <div className="hidden md:block col-span-2" />

                {/* Right Side Content (Desktop: Odd item shows Card; Even item shows empty) */}
                <div
                  className={`timeline-item-anim timeline-right col-span-1 md:col-span-5 pl-12 md:pl-0 ${
                    !isLeft ? "" : "hidden md:block md:opacity-0 pointer-events-none"
                  }`}
                >
                  {!isLeft && (
                    <div className="glass-panel p-6 md:p-8 rounded-custom-md border-white/5 shadow-xl relative overflow-hidden group hover:border-brand-primary/30 transition-colors duration-500">
                      {/* Hover reflection light */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                      <span className="text-xs font-mono font-bold text-brand-accent tracking-widest inline-flex items-center gap-1.5 mb-2">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      <h3 className="text-white font-space font-bold text-xl md:text-2xl leading-tight mb-1">
                        {exp.role}
                      </h3>
                      <span className="text-brand-secondary font-space text-sm font-medium block mb-4">
                        {exp.company}
                      </span>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4 font-inter">
                        {exp.description}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="text-xs md:text-sm text-text-muted font-inter leading-relaxed flex gap-2">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2 bg-brand-accent" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
