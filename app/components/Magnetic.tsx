"use client";

import { useRef, type ReactNode } from "react";

/**
 * Wraps an interactive element and nudges it toward the cursor on hover for a
 * subtle magnetic feel. No-ops on touch / reduced-motion (transform simply
 * never gets applied because those devices don't fire hover mousemove).
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-flex transition-transform duration-300 ease-[cubic-bezier(0.16,0.84,0.28,1)] ${className}`}
    >
      {children}
    </span>
  );
}
