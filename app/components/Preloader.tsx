"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * First-load boot screen: the X mark pulses while the wordmark wipes in with
 * real load progress (eased toward 92%, snapped to 100% when the window
 * finishes loading), then the whole sheet slides up and unmounts. Server-
 * rendered visible so there is no unstyled flash before hydration; instant
 * exit under prefers-reduced-motion; scroll locked while showing.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const started = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }

    started.current = performance.now();
    document.body.style.overflow = "hidden";

    let raf = 0;
    let p = 0;
    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let goneTimer: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      const minShown = performance.now() - started.current > 1000;
      const target = loaded && minShown ? 100 : 92;
      p += (target - p) * (loaded ? 0.14 : 0.045);
      setProgress(p);
      if (p >= 99.4) {
        setProgress(100);
        exitTimer = setTimeout(() => setExiting(true), 200);
        goneTimer = setTimeout(() => {
          setGone(true);
          document.body.style.overflow = "";
        }, 1050);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      clearTimeout(goneTimer);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  const pct = Math.min(100, Math.round(progress));

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050506] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,0.84,0.28,1)]"
      style={{ transform: exiting ? "translateY(-100%)" : "translateY(0)" }}
    >
      {/* the same material as the site: graph grid + ambient glow */}
      <div className="section-grid section-grid-fade" aria-hidden />
      <div className="glow glow-indigo left-1/2 top-1/2 h-[360px] w-[480px] -translate-x-1/2 -translate-y-1/2" aria-hidden />

      <div className="relative flex w-[min(320px,78vw)] flex-col items-center">
        {/* X mark with a breathing ring */}
        <span className="relative mb-7 flex items-center justify-center">
          <span className="absolute h-14 w-14 animate-ping rounded-full border border-volt/30" style={{ animationDuration: "1.6s" }} />
          <Image src="/x-mark.png" alt="" width={166} height={196} priority className="h-9 w-auto" />
        </span>

        {/* wordmark wiping in with progress: ghost underneath, lit on top */}
        <span className="relative block w-full">
          <Image src="/logo.png" alt="" width={432} height={82} priority className="h-auto w-full opacity-[0.08]" />
          <span
            className="absolute inset-0 block overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
          >
            <Image src="/logo.png" alt="Codexterity" width={432} height={82} priority className="h-auto w-full" />
          </span>
        </span>

        {/* gradient progress hairline (same language as the scroll bar) */}
        <span className="mt-7 block h-[2px] w-full overflow-hidden rounded-full bg-white/[0.07]">
          <span
            className="block h-full origin-left rounded-full"
            style={{ background: "var(--grad-brand)", transform: `scaleX(${progress / 100})` }}
          />
        </span>

        <span className="mono mt-4 flex w-full items-center justify-between text-[11px] tracking-[0.15em] text-grey">
          <span>BOOTING THE WORKFORCE</span>
          <span className="tabular-nums text-volt">{pct}%</span>
        </span>
      </div>
    </div>
  );
}
