"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const canvas = canvasRef.current;
    if (!dot || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mousePos = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let time = 0;
    let hoverProgress = 0;
    let hasMoved = false; // Tracks first mouse movement

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      if (!hasMoved) {
        // Instantly snap cursor positions to mouse coordinates to prevent top-left starting jump
        dotPos.x = e.clientX;
        dotPos.y = e.clientY;
        ringPos.x = e.clientX;
        ringPos.y = e.clientY;
        hasMoved = true;
      }

      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeaveWindow);

    // Smooth cursor follow interpolation (spring effect)
    const tick = () => {
      // Lerping dot (pinpoint)
      dotPos.x += (mousePos.x - dotPos.x) * 0.25;
      dotPos.y += (mousePos.y - dotPos.y) * 0.25;
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;

      // Lerping canvas with smooth spring inertia
      ringPos.x += (mousePos.x - ringPos.x) * 0.12;
      ringPos.y += (mousePos.y - ringPos.y) * 0.12;
      // Offset by half of canvas dimensions (48/2 = 24) to center it on mouse
      canvas.style.transform = `translate3d(${ringPos.x - 24}px, ${ringPos.y - 24}px, 0)`;

      // Animate time (rotation & color cycling)
      const targetSpeed = cursorType === "hover" ? 0.08 : cursorType === "view" ? 0.12 : 0.04;
      time += targetSpeed;

      // Lerp hover transition progress
      const targetHover = cursorType === "hover" ? 1.0 : cursorType === "view" ? 2.0 : 0.0;
      hoverProgress += (targetHover - hoverProgress) * 0.1;

      // Draw DNA Animation on Canvas
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const numNodes = 5; // Reduced nodes for even more compact layout
      
      // Spacing and dimensions transition under hover states
      const spacing = 4 + hoverProgress * 1.5;
      const amplitude = 5 + hoverProgress * 3;
      const tilt = Math.PI / 4; // 45 degree tilt diagonal layout

      // Setup coordinates and hues for each node pair
      const nodes: {
        ax: number; ay: number; az: number; hueA: number;
        bx: number; by: number; bz: number; hueB: number;
      }[] = [];

      for (let i = 0; i < numNodes; i++) {
        const phase = time + i * 0.6;
        const t = (i - (numNodes - 1) / 2) * spacing;

        // Helix coordinates: Node A and Node B opposite phases
        const ax_local = amplitude * Math.cos(phase);
        const ay_local = t;
        const az = Math.sin(phase); // -1 to 1 depth

        const bx_local = -amplitude * Math.cos(phase);
        const by_local = t;
        const bz = -Math.sin(phase);

        // Apply diagonal axis rotation (tilt)
        const ax_rot = ax_local * Math.cos(tilt) - ay_local * Math.sin(tilt);
        const ay_rot = ax_local * Math.sin(tilt) + ay_local * Math.cos(tilt);

        const bx_rot = bx_local * Math.cos(tilt) - by_local * Math.sin(tilt);
        const by_rot = bx_local * Math.sin(tilt) + by_local * Math.cos(tilt);

        // Rainbow color computation (shifting hues along the strand and time)
        const hueA = Math.floor(time * 20 + i * (360 / numNodes)) % 360;
        const hueB = (hueA + 180) % 360; // Opposite color on color wheel

        nodes.push({
          ax: cx + ax_rot,
          ay: cy + ay_rot,
          az,
          hueA,
          bx: cx + bx_rot,
          by: cy + by_rot,
          bz,
          hueB,
        });
      }

      // Draw back nodes (depth z < 0)
      nodes.forEach((node) => {
        if (node.az < 0) {
          const radius = (node.az + 1) * 0.5 + 0.6;
          ctx.beginPath();
          ctx.arc(node.ax, node.ay, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${node.hueA}, 70%, 50%, 0.35)`; // Faded rainbow A
          ctx.fill();
        }
        if (node.bz < 0) {
          const radius = (node.bz + 1) * 0.5 + 0.6;
          ctx.beginPath();
          ctx.arc(node.bx, node.by, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${node.hueB}, 70%, 50%, 0.35)`; // Faded rainbow B
          ctx.fill();
        }
      });

      // Draw rungs (linking lines with color gradients)
      nodes.forEach((node) => {
        const grad = ctx.createLinearGradient(node.ax, node.ay, node.bx, node.by);
        grad.addColorStop(0, `hsla(${node.hueA}, 80%, 55%, ${0.2 + hoverProgress * 0.2})`);
        grad.addColorStop(1, `hsla(${node.hueB}, 80%, 55%, ${0.2 + hoverProgress * 0.2})`);

        ctx.beginPath();
        ctx.moveTo(node.ax, node.ay);
        ctx.lineTo(node.bx, node.by);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.5 + hoverProgress * 0.25;
        ctx.stroke();
      });

      // Draw front nodes (depth z >= 0)
      nodes.forEach((node) => {
        if (node.az >= 0) {
          const radius = (node.az + 1) * 0.9 + 0.9;
          ctx.beginPath();
          ctx.arc(node.ax, node.ay, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${node.hueA}, 85%, 60%)`; // Solid rainbow A
          ctx.fill();
          
          // Glow overlay
          if (hoverProgress > 0.1) {
            ctx.beginPath();
            ctx.arc(node.ax, node.ay, radius + hoverProgress * 1, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${node.hueA}, 85%, 60%, 0.2)`;
            ctx.fill();
          }
        }
        if (node.bz >= 0) {
          const radius = (node.bz + 1) * 0.9 + 0.9;
          ctx.beginPath();
          ctx.arc(node.bx, node.by, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${node.hueB}, 85%, 60%)`; // Solid rainbow B
          ctx.fill();

          if (hoverProgress > 0.1) {
            ctx.beginPath();
            ctx.arc(node.bx, node.by, radius + hoverProgress * 1, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${node.hueB}, 85%, 60%, 0.2)`;
            ctx.fill();
          }
        }
      });

      requestAnimationFrame(tick);
    };

    const animId = requestAnimationFrame(tick);

    // Hover detection listeners
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.classList.contains("clickable");

      const hasViewCursor = target.closest('[data-cursor="view"]');

      if (hasViewCursor) {
        setCursorType("view");
      } else if (isClickable) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, cursorType]);

  const dotStyle = () => {
    switch (cursorType) {
      case "hover":
        return "w-2 h-2 -mt-1 -ml-1 bg-brand-accent shadow-[0_0_8px_#00E5FF]";
      case "view":
        return "w-0 h-0 opacity-0";
      default:
        return "w-2 h-2 -mt-1 -ml-1 bg-brand-primary";
    }
  };

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 hidden lg:block ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Animated DNA Canvas Follower */}
      <canvas
        ref={canvasRef}
        width={48}
        height={48}
        className="fixed top-0 left-0 pointer-events-none transition-transform duration-75 ease-out"
      />
      {/* Inner precise pinpoint dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-[width,height,margin,background-color,opacity] duration-300 ease-out ${dotStyle()}`}
      />
    </div>
  );
}
