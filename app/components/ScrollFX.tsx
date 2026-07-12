"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One global controller for declarative scroll + pointer effects, so server
 * components can opt in with data attributes instead of going client-side:
 *
 *  - [data-parallax="0.2"]  — element drifts vertically at that fraction of
 *    scroll speed (positive = slower/laggy, negative = counter-scroll).
 *  - [data-spotlight]       — element gets --mx/--my custom props tracking the
 *    pointer, consumed by the .spotlight-card CSS hover glow.
 *  - [data-scrub-text]      — per-word progressive fill while scrolling
 *    through (itsoffbrand-style reading scrub). Words are pre-split spans
 *    with class .scrub-w.
 */
export default function ScrollFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // --- parallax drift ---------------------------------------------------
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax ?? "0.2");
        gsap.fromTo(
          el,
          { y: () => speed * 120 },
          {
            y: () => speed * -120,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section") ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });

      // --- scroll-scrubbed word fill ---------------------------------------
      document.querySelectorAll<HTMLElement>("[data-scrub-text]").forEach((el) => {
        const words = el.querySelectorAll<HTMLElement>(".scrub-w");
        if (!words.length) return;
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              end: "top 34%",
              scrub: 0.4,
            },
          },
        );
      });
    });

    // --- spotlight pointer tracking (delegated, rAF-throttled) --------------
    let raf = 0;
    let lastEvent: MouseEvent | null = null;
    const onMove = (e: MouseEvent) => {
      lastEvent = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const ev = lastEvent;
        if (!ev) return;
        const card = (ev.target as Element)?.closest?.<HTMLElement>("[data-spotlight]");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${ev.clientX - r.left}px`);
        card.style.setProperty("--my", `${ev.clientY - r.top}px`);
      });
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  return null;
}
