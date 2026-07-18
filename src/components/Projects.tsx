"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { projectsData, Project } from "@/utils/projectsData";
import { ExternalLink, X, Check, ArrowRight } from "lucide-react";

export default function Projects() {
  const [filter, setFilter] = useState<"All" | "Flutter" | "Android" | "iOS" | "Backend">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projectsData.filter(
    (p) => filter === "All" || p.category === filter
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Slide-in animations for section
    gsap.fromTo(
      el.querySelectorAll(".project-card-anim"),
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );
  }, [filter]);

  // Mouse 3D tilt for project cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 10;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 10;

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 800,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 relative"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-brand-accent font-space font-medium text-xs uppercase tracking-[0.25em] mb-4 block">
          Showcase
        </span>
        <h2 className="text-white font-space font-bold text-4xl md:text-5xl">
          Featured Engineering
        </h2>
        <p className="text-text-muted text-sm md:text-base mt-4 max-w-xl mx-auto font-inter">
          A selection of production-grade mobile platforms and logistics layers I have designed and deployed.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {(["All", "Flutter", "Android", "iOS", "Backend"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-full font-space text-xs font-semibold uppercase tracking-wider transition-all duration-300 border clickable ${
              filter === cat
                ? "bg-brand-primary text-white border-brand-primary glow-primary"
                : "bg-surface-dark/40 text-text-muted border-white/5 hover:border-brand-primary/30 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={project.id}
              onClick={() => setSelectedProject(project)}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={handleMouseLeave}
              className="project-card-anim glass-panel rounded-custom-md border-white/5 overflow-hidden group cursor-pointer clickable relative flex flex-col justify-between"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image Showcase Wrapper */}
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-bg-dark/40 group-hover:bg-bg-dark/10 transition-colors duration-500 z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                />
                <span className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-bg-dark/80 text-[10px] font-space font-semibold uppercase tracking-wider text-brand-accent border border-white/10">
                  {project.category}
                </span>
              </div>

              {/* Text Specs */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-white font-space font-bold text-xl md:text-2xl mb-3 group-hover:text-brand-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6 font-inter flex-grow">
                  {project.description}
                </p>

                {/* Tags List */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-white/5 text-text-secondary font-space text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Details Prompt */}
                <div className="flex items-center gap-1 text-xs font-space font-semibold text-brand-accent group-hover:text-brand-primary transition-colors duration-300">
                  Explore Case Study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Case Study Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-bg-dark/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-surface-dark border border-white/10 rounded-custom-md shadow-[0_0_50px_rgba(7,11,20,0.8)] overflow-y-auto z-10 lenis-clean-scroll"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-text-muted hover:text-white transition-colors duration-300 z-20 clickable focus:outline-none"
              >
                <X size={20} />
              </button>

              {/* Cover Banner */}
              <div className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent z-10" />
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Case Study Details */}
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-xs font-space font-semibold uppercase tracking-wider text-brand-primary">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs text-text-muted font-space">Production System</span>
                </div>

                <h3 className="text-white font-space font-bold text-3xl md:text-4xl mb-6">
                  {selectedProject.title}
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                  {/* Left Specs */}
                  <div className="lg:col-span-7">
                    <h4 className="text-xs font-space font-bold text-brand-accent uppercase tracking-widest mb-3">
                      Overview
                    </h4>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6 font-inter">
                      {selectedProject.longDescription}
                    </p>

                    <h4 className="text-xs font-space font-bold text-brand-accent uppercase tracking-widest mb-4">
                      Key Implementation Details
                    </h4>
                    <ul className="flex flex-col gap-3">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex gap-3 text-sm text-text-muted font-inter leading-relaxed">
                          <Check size={16} className="text-brand-success shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Meta details */}
                  <div className="lg:col-span-5 flex flex-col gap-6 p-6 rounded-custom-sm bg-white/5 border border-white/5 self-start">
                    <div>
                      <h4 className="text-[10px] font-space font-bold text-text-muted uppercase tracking-widest mb-2">
                        Technologies Deployed
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded bg-white/5 text-text-secondary font-space text-[10px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 flex gap-4">
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-3 px-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-space text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 transition-colors duration-300 clickable"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          Repository
                        </a>
                      )}
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-3 px-4 rounded-full bg-brand-primary text-white font-space text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 glow-primary transition-all duration-300 clickable"
                        >
                          <ExternalLink size={14} />
                          Live Site
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
