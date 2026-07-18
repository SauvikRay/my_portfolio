"use client";

import React, { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  decay: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 1. Initialize Aurora blobs
    // Using HSL for vibrant, blending colors: Blue, Purple, Cyan
    const blobs: Blob[] = [
      {
        x: width * 0.25,
        y: height * 0.3,
        vx: 0.4,
        vy: 0.3,
        radius: Math.min(width, height) * 0.4,
        color: "rgba(91, 140, 255, 0.12)", // #5B8CFF Blue
      },
      {
        x: width * 0.75,
        y: height * 0.4,
        vx: -0.35,
        vy: 0.45,
        radius: Math.min(width, height) * 0.45,
        color: "rgba(139, 92, 246, 0.12)", // #8B5CF6 Purple
      },
      {
        x: width * 0.5,
        y: height * 0.8,
        vx: 0.3,
        vy: -0.3,
        radius: Math.min(width, height) * 0.38,
        color: "rgba(0, 229, 255, 0.1)", // #00E5FF Cyan
      },
    ];

    // 2. Initialize floating particles
    const particlesCount = 60;
    const particles: Particle[] = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.5 + 0.1,
        decay: Math.random() * 0.002 + 0.001,
      });
    }

    // Animation loop
    const animate = () => {
      // Clear with very slight transparency to leave a minute trail
      ctx.fillStyle = "#070B14";
      ctx.fillRect(0, 0, width, height);

      // Lerp mouse coordinates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Draw and move blobs
      ctx.globalCompositeOperation = "screen";
      blobs.forEach((blob) => {
        // Move blob
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce on borders
        if (blob.x - blob.radius < 0 || blob.x + blob.radius > width) blob.vx *= -1;
        if (blob.y - blob.radius < 0 || blob.y + blob.radius > height) blob.vy *= -1;

        // Interactive mouse pull
        const dx = mouseRef.current.x - blob.x;
        const dy = mouseRef.current.y - blob.y;
        const distance = Math.hypot(dx, dy);
        if (distance < width * 0.4) {
          blob.x += dx * 0.005;
          blob.y += dy * 0.005;
        }

        // Draw radial gradient for aurora
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(0.5, blob.color.replace("0.1", "0.04"));
        gradient.addColorStop(1, "rgba(7, 11, 20, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Restore default composite operation for particles
      ctx.globalCompositeOperation = "source-over";

      // Draw and animate particles
      particles.forEach((p) => {
        // Drifting animation
        p.x += p.speedX;
        p.y += p.speedY;

        // Mouse displacement
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }

        // Reset if particles go off-screen
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }

        // Draw particle
        ctx.fillStyle = `rgba(199, 210, 254, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
