"use client";

import { useEffect, useRef } from "react";

/**
 * 3D dot-wave field: a perspective plane of dots that breathes with a calm
 * ambient ripple. The pointer does NOT move the whole plane; instead it creates
 * a local, fluid disturbance under the cursor (a lift plus propagating ripple
 * rings that ease in and out). Hand-rolled canvas, ~0 bundle, pauses offscreen,
 * static under prefers-reduced-motion.
 */

// brand ramp: volt -> mint -> aqua -> cobalt
const RAMP: [number, number, number][] = [
  [230, 255, 75],
  [124, 243, 176],
  [55, 217, 212],
  [75, 88, 255],
];

function rampColor(t: number): [number, number, number] {
  const x = Math.min(0.9999, Math.max(0, t)) * (RAMP.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = RAMP[i];
  const b = RAMP[i + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

export default function WaveField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    let t = 0;

    // eased pointer position (canvas space) + hover strength for fluid in/out
    let px = -9999;
    let py = -9999;
    let cx = -9999;
    let cy = -9999;
    let hov = 0;
    let hovTarget = 0;

    const COLS = 70;
    const ROWS = 32;
    const INFLUENCE = 210; // px radius of the cursor disturbance

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // ease the cursor + hover strength (fluid response, no snap)
      cx += (px - cx) * 0.18;
      cy += (py - cy) * 0.18;
      hov += (hovTarget - hov) * 0.07;

      const fov = 340;
      const camY = -235; // constant: pointer never shifts the whole plane
      const horizon = h * 0.42; // sit below the eyebrow / headline

      for (let zi = ROWS - 1; zi >= 0; zi--) {
        const z = 60 + zi * 26;
        const depth = zi / (ROWS - 1); // 0 near, 1 far
        for (let xi = 0; xi < COLS; xi++) {
          const x = (xi - (COLS - 1) / 2) * 30;
          // calm ambient ripple (always on, gentle)
          const baseY =
            Math.sin(xi * 0.3 + t * 1.05 + zi * 0.22) * 11 +
            Math.sin(zi * 0.46 - t * 0.72) * 8 +
            Math.sin((xi + zi) * 0.13 + t * 0.5) * 5;

          const scale = fov / (fov + z);
          const sx = w / 2 + x * scale * (w / 900);
          let sy = horizon + (baseY - camY) * scale;
          if (sx < -8 || sx > w + 8) continue;

          // local, fluid cursor disturbance (only near the pointer)
          let infl = 0;
          if (hov > 0.002) {
            const dx = sx - cx;
            const dy = sy - cy;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < INFLUENCE) {
              const f = 1 - d / INFLUENCE;
              const smooth = f * f * (3 - 2 * f); // smoothstep falloff
              infl = smooth * hov;
              // lift toward the viewer + propagating ripple rings
              const ripple = Math.sin(d * 0.055 - t * 6) * infl;
              sy -= infl * 22 * (1 - depth * 0.4) + ripple * 6;
            }
          }

          const [r, g, b] = rampColor(xi / (COLS - 1));
          const alpha = (1 - depth) * 0.32 + 0.03 + Math.max(0, baseY) * 0.003 + infl * 0.6;
          const size = (1 - depth) * 1.9 + 0.4 + infl * 1.7;

          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${Math.min(1, alpha).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = () => {
      if (!running) return;
      t += 0.016;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      // engage only while the pointer is actually over the field
      hovTarget = px >= 0 && px <= r.width && py >= 0 && py <= r.height ? 1 : 0;
    };

    resize();
    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("mousemove", onPointer, { passive: true });
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running && !reduce) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, #000 40%, #000 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 40%, #000 82%, transparent 100%)",
      }}
      aria-hidden
    />
  );
}
