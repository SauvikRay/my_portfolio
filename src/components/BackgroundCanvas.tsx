"use client";

import React, { useEffect, useRef } from "react";

const vsSource = `
  attribute vec2 a_position;
  varying vec2 v_texCoord;
  void main() {
    v_texCoord = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fsSource = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  varying vec2 v_texCoord;

  // Simplex 2D noise implementation for fluid waves
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
      vec2 uv = v_texCoord;
      float time = u_time * 0.15; // Elegant slow fluid movement
      
      // Interactive mouse hover distortion
      vec2 normMouse = u_mouse / u_resolution;
      float mouseDist = length(uv - normMouse);
      float mouseInfluence = smoothstep(0.4, 0.0, mouseDist) * 0.15;

      // Aurora colors based on brand palette
      vec3 col1 = vec3(0.357, 0.549, 1.0); // #5B8CFF Blue
      vec3 col2 = vec3(0.545, 0.361, 0.965); // #8B5CF6 Purple
      vec3 col3 = vec3(0.0, 0.898, 1.0); // #00E5FF Cyan
      vec3 bg = vec3(0.027, 0.043, 0.078); // #070B14 Dark background

      // Multi-frequency noise sampling for natural fluid dynamics
      float n1 = snoise(uv * 2.0 + time + mouseInfluence);
      float n2 = snoise(uv * 3.0 - time * 1.5 - mouseInfluence);
      float n3 = snoise(uv * 1.5 + time * 0.8 + mouseInfluence * 0.5);
      
      float f = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
      f = smoothstep(-0.2, 0.8, f);
      
      vec3 color = mix(bg, col1, f * 0.35);
      color = mix(color, col2, n2 * 0.25);
      color = mix(color, col3, n3 * 0.18);
      
      // Vignette to blend the edges deeply into the layout
      float d = length(uv - 0.5);
      color *= 1.0 - d * 0.45;
      
      gl_FragColor = vec4(color, 1.0);
  }
`;

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
}

export default function BackgroundCanvas() {
  const glCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const glCanvas = glCanvasRef.current;
    const pCanvas = particlesCanvasRef.current;
    if (!glCanvas || !pCanvas) return;

    const gl = glCanvas.getContext("webgl") || glCanvas.getContext("experimental-webgl") as WebGLRenderingContext | null;
    const ctx = pCanvas.getContext("2d");
    if (!gl || !ctx) return;

    let animId: number;
    let width = (glCanvas.width = pCanvas.width = window.innerWidth);
    let height = (glCanvas.height = pCanvas.height = window.innerHeight);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      // WebGL Y axis goes from bottom to top (inverted compared to screen coordinates)
      mouseRef.current.targetY = window.innerHeight - e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      width = glCanvas.width = pCanvas.width = window.innerWidth;
      height = glCanvas.height = pCanvas.height = window.innerHeight;
      gl.viewport(0, 0, width, height);
    };
    window.addEventListener("resize", handleResize);

    // 1. WebGL Shader compilation
    const compileShader = (type: number, src: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Quad geometry (covers the whole screen)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uResLoc = gl.getUniformLocation(program, "u_resolution");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");

    // 2. Initialize Overlay Particles
    const particlesCount = 40;
    const particles: Particle[] = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -Math.random() * 0.3 - 0.1,
        alpha: Math.random() * 0.35 + 0.15,
      });
    }

    // Animation Tick
    const render = (time: number) => {
      // --- Pass 1: WebGL Shader ---
      gl.viewport(0, 0, glCanvas.width, glCanvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Lerp mouse coordinates smoothly
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      gl.useProgram(program);
      gl.uniform1f(uTimeLoc, time * 0.001);
      gl.uniform2f(uResLoc, glCanvas.width, glCanvas.height);
      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // --- Pass 2: 2D Floating Particles ---
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Displace particles slightly away from mouse coordinates (converted to 2D screen coordinate space)
        const screenMouseY = height - mouseRef.current.y;
        const dx = mouseRef.current.x - p.x;
        const dy = screenMouseY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        // Reset if offscreen
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(199, 210, 254, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Cleanups
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      {/* WebGL Shader Canvas */}
      <canvas ref={glCanvasRef} className="absolute inset-0 w-full h-full block" />
      {/* 2D Particles Overlay */}
      <canvas ref={particlesCanvasRef} className="absolute inset-0 w-full h-full block opacity-30" />
    </div>
  );
}
