"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker and kept in sync with
 * ScrollTrigger so scroll-scrubbed animations stay glued to the eased scroll.
 * Skipped entirely for reduced-motion users and coarse pointers keep native
 * momentum (Lenis handles touch natively — we simply don't smooth it).
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Never smooth-scroll on touch / small screens. Lenis driven off the GSAP
    // ticker hijacks native touch scrolling on mobile (the page won't scroll),
    // so we hand phones and tablets back their native momentum. ScrollTrigger
    // and the progress bar both fall back to native scroll automatically.
    if (window.matchMedia("(pointer: coarse), (max-width: 768px)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.115,
      anchors: { offset: -90 }, // clear the fixed pill nav
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
