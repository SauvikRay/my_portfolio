"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MapPin, Calendar, CheckCircle2, Award, Users, Download, ArrowUpRight } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Trigger count-up animation
          const obj = { val: 0 };
          gsap.to(obj, {
            val: end,
            duration: duration,
            ease: "power2.out",
            onUpdate: () => {
              setCount(Math.floor(obj.val));
            },
          });
          // Stop observing after firing once
          if (observerRef.current) observerRef.current.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(el);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={elementRef} className="font-space">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade elements in on scroll
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".reveal-fade-up"),
      { opacity: 0, y: 40, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Portrait Workspace / Profile Setup */}
        <div className="lg:col-span-5 relative reveal-fade-up">
          <div className="relative aspect-square w-full max-w-md mx-auto rounded-custom-md overflow-hidden glass-panel p-3">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-secondary/20 to-brand-accent/20 opacity-30" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9BhP16DBFX35hanLcHdE20250FpFltn1FUGLxsidw-o9s9YRBnWo6yj5fCegNBuPHz4enPKSAY7mS7HaMbyKtkigiznZYUpQ3_1Oq4QSnpWSJwGfyDPJ16-CPOSEkup1w_TlqeElNX95IWp-ODVabNzfR0CGRxoWeP6vIEknP5yssJOvDDDfX5VCSVjRT8XAj43zP4ZXm-o7-qAct_BdGXXDf4P-O25kaTF4NHYD7e1Q-H5Q9M9hnQB6mum6D8ZvMpGQmSE2mWso"
              alt="Sauvik Ray workspace"
              className="w-full h-full object-cover rounded-custom-sm opacity-80 hover:opacity-100 transition-opacity duration-700"
            />
          </div>

          {/* Floating Card - Stats / Location badge */}
          <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 p-4 glass-panel rounded-custom-sm border-white/10 shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <MapPin size={18} />
            </div>
            <div>
              <div className="text-[9px] font-space tracking-widest text-text-muted uppercase">Based in</div>
              <div className="text-xs font-space font-semibold text-white">Dhaka, Bangladesh</div>
            </div>
          </div>
        </div>

        {/* Right Side: Description and Metrics */}
        <div className="lg:col-span-7 flex flex-col reveal-fade-up">
          <span className="text-brand-accent font-space font-medium text-xs uppercase tracking-[0.25em] mb-4">
            About Me
          </span>
          <h2 className="text-white font-space font-bold text-4xl md:text-5xl leading-tight mb-8">
            Architecting high-performance <br />
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Mobile Landscapes
            </span>
          </h2>

          <p className="text-text-secondary text-base md:text-lg mb-6 leading-relaxed font-inter">
            Over the past 6+ years, I've designed and scaled mobile platforms that integrate clean architecture principles with premium motion design. My primary stack is **Flutter & Dart**, backed by cloud microservices and native integrations in Swift and Kotlin.
          </p>

          <p className="text-text-muted text-sm md:text-base mb-10 leading-relaxed font-inter">
            I prioritize maintainability, developer speed, and user experience. Whether setting up automated CI/CD deployment chains, writing complex shader transitions, or managing high-load WebSockets, I build products that are scalable by design.
          </p>

          {/* Detailed Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 border-t border-b border-white/5 py-8">
            <div className="flex items-center gap-3">
              <div className="text-brand-primary shrink-0"><Calendar size={20} /></div>
              <span className="text-sm font-inter text-text-muted">
                Available starting <strong className="text-white">Immediately</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-brand-accent shrink-0"><MapPin size={20} /></div>
              <span className="text-sm font-inter text-text-muted">
                Location: <strong className="text-white">Dhaka, Bangladesh (Remote/GMT+6)</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-brand-success shrink-0"><CheckCircle2 size={20} /></div>
              <span className="text-sm font-inter text-text-muted">
                Relocation: <strong className="text-white">Open (Global Visas/Sponsorship)</strong>
              </span>
            </div>
          </div>

          {/* Numeric Counters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-space font-bold text-white mb-2 leading-none">
                <Counter end={6} suffix="+" />
              </span>
              <span className="text-xs font-space tracking-wider text-text-muted uppercase">
                Years Experience
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-space font-bold text-brand-primary mb-2 leading-none">
                <Counter end={50} suffix="+" />
              </span>
              <span className="text-xs font-space tracking-wider text-text-muted uppercase">
                Projects Completed
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-space font-bold text-brand-secondary mb-2 leading-none">
                <Counter end={30} suffix="+" />
              </span>
              <span className="text-xs font-space tracking-wider text-text-muted uppercase">
                Happy Clients
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-space font-bold text-brand-accent mb-2 leading-none">
                <Counter end={12} suffix="K+" />
              </span>
              <span className="text-xs font-space tracking-wider text-text-muted uppercase">
                App Downloads
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
