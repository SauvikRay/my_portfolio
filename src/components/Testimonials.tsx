"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    role: "Product VP",
    company: "FinTechCorp",
    quote: "Sauvik redesigned our mobile dashboard. His attention to clean architecture and smooth micro-animations was key to our 4.8 App Store rating.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    name: "Marcus Vance",
    role: "CTO",
    company: "InnovateRetail",
    quote: "An outstanding mobile architect. He migrated our native Swift/Kotlin stack to a single unified Flutter app, saving us millions in dev cycles.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    name: "Elena Rostova",
    role: "Founder",
    company: "FoodieOnDemand",
    quote: "Sauvik delivered a beautifully responsive, geofenced courier-tracking app. It maintains a solid 60 FPS even on low-end devices.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
  },
  {
    name: "David Chen",
    role: "Director of Engineering",
    company: "SocialSphere",
    quote: "Sauvik's integration of real-time WebSocket pipelines into our feed views was flawless. A highly rigorous developer.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D tilt effects for testimonial cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 8;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 600,
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
      id="testimonials"
      ref={containerRef}
      className="py-12 md:py-16 border-t border-white/5 relative overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-20 px-4">
        <span className="text-brand-accent font-space font-medium text-xs uppercase tracking-[0.25em] mb-4 block">
          Endorsements
        </span>
        <h2 className="text-white font-space font-bold text-4xl md:text-5xl">
          Client Feedback
        </h2>
        <p className="text-text-muted text-sm md:text-base mt-4 max-w-xl mx-auto font-inter">
          What engineering managers, product leads, and startup founders say about working with me.
        </p>
      </div>

      {/* Infinite Horizontal Scroller */}
      <div className="w-full flex relative overflow-hidden py-4 select-none">
        {/* Shadow Overlays to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-[8%] md:w-[15%] bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[8%] md:w-[15%] bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />

        {/* Double array for seamless looping marquee */}
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="inline-block w-[300px] md:w-[450px] whitespace-normal glass-panel p-6 md:p-8 rounded-custom-md border-white/5 relative shadow-xl shrink-0 group transition-colors duration-500 hover:border-brand-primary/30"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-brand-primary/10 group-hover:text-brand-primary/20 transition-colors">
                <Quote size={40} />
              </div>

              {/* Text Quote */}
              <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6 font-inter italic relative z-10">
                "{item.quote}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4 relative z-10">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-white/10"
                />
                <div className="flex flex-col">
                  <span className="text-white font-space font-bold text-sm md:text-base">
                    {item.name}
                  </span>
                  <span className="text-[10px] md:text-xs font-space text-text-muted">
                    {item.role}, <strong className="text-brand-accent font-normal">{item.company}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styled animation keyframes inside module/style */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}
