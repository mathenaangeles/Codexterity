"use client";

import { useEffect, useRef } from "react";

/**
 * Hairline scroll progress indicator pinned to the very top of the viewport,
 * filled with the brand gradient (cloudstudio-style "where am I" cue).
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2.5px]" aria-hidden>
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{ background: "var(--grad-brand)", transform: "scaleX(0)" }}
      />
    </div>
  );
}
