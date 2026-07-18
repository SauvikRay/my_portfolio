"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const submitBtnMagnetic = useMagnetic(0.25);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState({ name: false, email: false, message: false });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Slide-up animation
    gsap.fromTo(
      el.querySelectorAll(".contact-anim"),
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

  const handleFocus = (field: "name" | "email" | "message") => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: "name" | "email" | "message") => {
    setFocused((prev) => ({ ...prev, [field]: false }));
    validateField(field);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: "name" | "email" | "message") => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateField = (field: "name" | "email" | "message") => {
    let err = "";
    if (!form[field].trim()) {
      err = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    } else if (field === "email" && !/\S+@\S+\.\S+/.test(form.email)) {
      err = "Please enter a valid email address.";
    }
    setErrors((prev) => ({ ...prev, [field]: err }));
    return !err;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const isNameVal = validateField("name");
    const isEmailVal = validateField("email");
    const isMsgVal = validateField("message");

    if (!isNameVal || !isEmailVal || !isMsgVal) return;

    setStatus("submitting");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });

      // Trigger celebrate confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#5B8CFF", "#8B5CF6", "#00E5FF"],
      });
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* Left Side: Contact Specs */}
        <div className="lg:col-span-5 flex flex-col justify-between contact-anim">
          <div>
            <span className="text-brand-primary font-space font-medium text-xs uppercase tracking-[0.25em] mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-white font-space font-bold text-4xl md:text-5xl leading-tight mb-8">
              Let's create something <br />
              <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
                extraordinary
              </span>
            </h2>
            <p className="text-text-muted text-sm md:text-base mb-12 font-inter leading-relaxed max-w-md">
              Whether you need to architect a new Flutter codebase, scale a product logistics tier, or solve complex rendering loops, I am ready to collaborate.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 border border-white/5 flex items-center justify-center text-brand-primary">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-space tracking-widest text-text-muted uppercase">Email</span>
                  <a href="mailto:hello@sauvikray.dev" className="text-sm font-space font-bold text-white hover:text-brand-primary transition-colors clickable">
                    hello@sauvikray.dev
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-white/5 flex items-center justify-center text-brand-accent">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-space tracking-widest text-text-muted uppercase">Phone</span>
                  <a href="tel:+880170000000" className="text-sm font-space font-bold text-white hover:text-brand-accent transition-colors clickable">
                    +880 1700-000000
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-secondary/10 border border-white/5 flex items-center justify-center text-brand-secondary">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-space tracking-widest text-text-muted uppercase">Location</span>
                  <span className="text-sm font-space font-bold text-white">
                    Dhaka, Bangladesh
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-16 lg:mt-0">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/sauvik-ray-634555289/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:border-white/30 hover:text-[#0A66C2] transition-all duration-300 clickable"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/sauvikray"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:border-white/30 hover:text-white transition-all duration-300 clickable"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/sauvik.ray.35"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:border-white/30 hover:text-[#1877F2] transition-all duration-300 clickable"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/sauvik_ray_002/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:border-white/30 hover:text-[#E1306C] transition-all duration-300 clickable"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 contact-anim">
          <form
            onSubmit={handleSubmit}
            className="glass-panel p-8 md:p-12 rounded-custom-md border-white/5 relative flex flex-col gap-8 shadow-2xl"
          >
            {/* Input field 1: Name */}
            <div className="relative w-full">
              <input
                type="text"
                id="name"
                value={form.name}
                onFocus={() => handleFocus("name")}
                onBlur={() => handleBlur("name")}
                onChange={(e) => handleChange(e, "name")}
                className={`w-full bg-white/5 border px-4 py-4 rounded-custom-sm font-inter text-sm text-white focus:outline-none transition-all duration-300 ${errors.name
                  ? "border-red-500/50 focus:border-red-500 bg-red-500/5"
                  : focused.name
                    ? "border-brand-primary bg-white/10"
                    : "border-white/5 hover:border-white/10"
                  }`}
              />
              <label
                htmlFor="name"
                className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none font-space text-sm tracking-wide text-text-muted transition-all duration-300 ${focused.name || form.name
                  ? "-translate-y-9 left-2 text-xs font-bold text-brand-primary"
                  : ""
                  }`}
              >
                Full Name
              </label>
              {errors.name && (
                <div className="flex items-center gap-1.5 text-xs text-red-500 mt-2 font-inter">
                  <AlertCircle size={12} />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Input field 2: Email */}
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                value={form.email}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                onChange={(e) => handleChange(e, "email")}
                className={`w-full bg-white/5 border px-4 py-4 rounded-custom-sm font-inter text-sm text-white focus:outline-none transition-all duration-300 ${errors.email
                  ? "border-red-500/50 focus:border-red-500 bg-red-500/5"
                  : focused.email
                    ? "border-brand-accent bg-white/10"
                    : "border-white/5 hover:border-white/10"
                  }`}
              />
              <label
                htmlFor="email"
                className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none font-space text-sm tracking-wide text-text-muted transition-all duration-300 ${focused.email || form.email
                  ? "-translate-y-9 left-2 text-xs font-bold text-brand-accent"
                  : ""
                  }`}
              >
                Email Address
              </label>
              {errors.email && (
                <div className="flex items-center gap-1.5 text-xs text-red-500 mt-2 font-inter">
                  <AlertCircle size={12} />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Input field 3: Message */}
            <div className="relative w-full">
              <textarea
                id="message"
                value={form.message}
                onFocus={() => handleFocus("message")}
                onBlur={() => handleBlur("message")}
                onChange={(e) => handleChange(e, "message")}
                rows={5}
                className={`w-full bg-white/5 border px-4 py-4 rounded-custom-sm font-inter text-sm text-white focus:outline-none transition-all duration-300 resize-none ${errors.message
                  ? "border-red-500/50 focus:border-red-500 bg-red-500/5"
                  : focused.message
                    ? "border-brand-secondary bg-white/10"
                    : "border-white/5 hover:border-white/10"
                  }`}
              />
              <label
                htmlFor="message"
                className={`absolute left-4 top-6 pointer-events-none font-space text-sm tracking-wide text-text-muted transition-all duration-300 ${focused.message || form.message
                  ? "-translate-y-[38px] left-2 text-xs font-bold text-brand-secondary"
                  : ""
                  }`}
              >
                Your Message
              </label>
              {errors.message && (
                <div className="flex items-center gap-1.5 text-xs text-red-500 mt-2 font-inter">
                  <AlertCircle size={12} />
                  {errors.message}
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div ref={submitBtnMagnetic} className="magnetic-wrap self-start">
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className={`px-8 py-4 rounded-full bg-brand-primary text-white font-space font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 glow-primary hover:glow-accent hover:bg-brand-accent hover:text-bg-dark transition-all duration-300 clickable disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status === "submitting" ? (
                  <span>Transmitting...</span>
                ) : status === "success" ? (
                  <>
                    <CheckCircle size={14} className="text-white" />
                    <span>Transmitted</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
