"use client";

import React, { useState, useEffect } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const logoMagnetic = useMagnetic(0.2);
  const buttonMagnetic = useMagnetic(0.2);

  useEffect(() => {
    // Scroll behavior: hide on scroll down, show on scroll up
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide
        setIsVisible(false);
      } else {
        // Scrolling up - show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // IntersectionObserver to set active section
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section dominates viewport
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [lastScrollY]);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-transform duration-500 ease-in-out px-4 md:px-8 pt-6 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? "glass-panel bg-surface-dark/70 shadow-[0_10px_30px_rgba(7,11,20,0.5)] border-white/10"
              : "border-transparent bg-transparent"
          }`}
        >
          {/* Logo */}
          <div ref={logoMagnetic} className="magnetic-wrap">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="text-white font-space font-bold text-lg tracking-wider flex items-center gap-1 group clickable"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-primary group-hover:bg-brand-accent transition-colors duration-300" />
              SAUVIK<span className="text-brand-accent font-light">RAY</span>
            </a>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-space rounded-full transition-colors duration-300 clickable ${
                    isActive ? "text-brand-accent font-medium" : "text-text-muted hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-accent shadow-[0_0_10px_#00E5FF]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <div ref={buttonMagnetic} className="magnetic-wrap">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="relative px-6 py-2.5 rounded-full bg-brand-primary text-white font-space text-xs font-semibold uppercase tracking-wider glow-primary hover:glow-accent hover:bg-brand-accent hover:text-bg-dark transition-all duration-300 ease-out clickable"
              >
                Hire Me
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-brand-primary transition-colors focus:outline-none clickable"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 md:hidden bg-bg-dark/95 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6 text-center">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-2xl font-space font-medium tracking-wide transition-all ${
                  isActive ? "text-brand-accent scale-115" : "text-text-muted hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="mt-12 px-8 py-3 rounded-full bg-brand-primary text-white font-space text-sm font-semibold uppercase tracking-wider glow-primary"
        >
          Hire Me
        </a>
      </div>
    </>
  );
}
