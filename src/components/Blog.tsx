"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, Calendar, User } from "lucide-react";

interface BlogPost {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Unlocking 60 FPS in Flutter Canvas Shaders",
    category: "Graphics",
    date: "July 12, 2026",
    excerpt: "How we leveraged Skia and Impeller shader bindings to render real-time telemetry charts without dropping main thread UI frames.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9BhP16DBFX35hanLcHdE20250FpFltn1FUGLxsidw-o9s9YRBnWo6yj5fCegNBuPHz4enPKSAY7mS7HaMbyKtkigiznZYUpQ3_1Oq4QSnpWSJwGfyDPJ16-CPOSEkup1w_TlqeElNX95IWp-ODVabNzfR0CGRxoWeP6vIEknP5yssJOvDDDfX5VCSVjRT8XAj43zP4ZXm-o7-qAct_BdGXXDf4P-O25kaTF4NHYD7e1Q-H5Q9M9hnQB6mum6D8ZvMpGQmSE2mWso",
    readTime: "5 min read"
  },
  {
    title: "Clean Architecture: Multi-Package Flutter Core",
    category: "Architecture",
    date: "June 28, 2026",
    excerpt: "Structuring multi-market applications by separating domain layers, core packages, and local mock database providers.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCT_IcsawJfoN5xsDxzTNLE2cx__ZzdTqY9rY0j7yBNyFS2iQ6VB32Vmp8U8wPx1DZQVFEokXX4j6ufCQ8Tpj-UfyvllFwftWgsw4WFK25sYLNbzJGU7FFJr1FJwBXJidmhP-AYhmqB23Z19doDYDTAJSP059buLVCdtfsEw2_suDDGLafSGMYRPfcJ0EHGK_B5SpVyMMkUFNR3gZT5ABJmZkMU11N_ybTTxbAHmSRslQelDWX3IA-xB1x7RHtMMyagFOEGi9sUc_k",
    readTime: "8 min read"
  },
  {
    title: "WebSocket Streams on High-Concurrency Feeds",
    category: "Performance",
    date: "May 15, 2026",
    excerpt: "An in-depth analysis of processing, buffering, and throttling high-frequency market data streams in iOS Combine and Dart Streams.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9BhP16DBFX35hanLcHdE20250FpFltn1FUGLxsidw-o9s9YRBnWo6yj5fCegNBuPHz4enPKSAY7mS7HaMbyKtkigiznZYUpQ3_1Oq4QSnpWSJwGfyDPJ16-CPOSEkup1w_TlqeElNX95IWp-ODVabNzfR0CGRxoWeP6vIEknP5yssJOvDDDfX5VCSVjRT8XAj43zP4ZXm-o7-qAct_BdGXXDf4P-O25kaTF4NHYD7e1Q-H5Q9M9hnQB6mum6D8ZvMpGQmSE2mWso",
    readTime: "6 min read"
  }
];

export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Slide-up animation for blog cards
    gsap.fromTo(
      el.querySelectorAll(".blog-card-anim"),
      { opacity: 0, y: 40, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.15,
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
      id="blog"
      ref={containerRef}
      className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 relative"
    >
      {/* Header */}
      <div className="text-center mb-20">
        <span className="text-brand-primary font-space font-medium text-xs uppercase tracking-[0.25em] mb-4 block">
          Knowledge Base
        </span>
        <h2 className="text-white font-space font-bold text-4xl md:text-5xl">
          Technical Articles
        </h2>
        <p className="text-text-muted text-sm md:text-base mt-4 max-w-xl mx-auto font-inter">
          Deep-dives into advanced mobile engineering, shader designs, and performance optimization techniques.
        </p>
      </div>

      {/* Grid of posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post, i) => (
          <article
            key={i}
            className="blog-card-anim glass-panel rounded-custom-md border-white/5 overflow-hidden group flex flex-col justify-between h-full hover:border-brand-primary/30 transition-all duration-500 shadow-xl clickable"
          >
            <div>
              {/* Cover image with zoom reveal */}
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-bg-dark/40 group-hover:bg-bg-dark/20 transition-colors duration-500 z-10" />
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                />
                <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-bg-dark/80 text-[10px] font-space font-semibold uppercase tracking-wider text-brand-primary border border-white/10">
                  {post.category}
                </span>
              </div>

              {/* Contents */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 text-xs text-text-muted font-space mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-white font-space font-bold text-xl md:text-2xl mb-4 group-hover:text-brand-accent transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed font-inter line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* Read action footer */}
            <div className="p-6 md:p-8 pt-0 mt-auto border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-space font-bold text-white group-hover:text-brand-accent uppercase tracking-widest transition-colors duration-300">
                Read Article
              </span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-brand-accent group-hover:text-bg-dark transition-all duration-300">
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
