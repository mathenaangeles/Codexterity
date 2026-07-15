"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * First-load boot screen: the X mark pulses while the wordmark wipes in with
 * load progress, then the sheet slides up and unmounts.
 *
 * Two engines, one look:
 *  - Pure CSS (pre-hydration): the .preloader-shell animations fill the bar,
 *    wipe the wordmark, and auto-dismiss the sheet after ~3.6s. On slow
 *    mobile connections React arrives last, so the screen must never depend
 *    on JS to leave.
 *  - React (post-hydration): the effect below cancels the CSS fallback and
 *    drives the same elements with real load progress (eased toward 90%,
 *    snapped to 100% on window.load, hard-capped so it can't hang).
 *
 * Server-rendered visible so there is no unstyled flash; reduced-motion
 * users skip it both ways (the global reduce rule collapses the CSS
 * animations to 0ms, and the effect unmounts immediately).
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const started = useRef<number>(0);
  const shellRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const wipeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // signal "React is alive": switches the CSS no-JS safety nets off
    document.documentElement.classList.add("hydrated");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }

    // JS is alive: take over from the CSS fallback timeline.
    shellRef.current?.style.setProperty("animation", "none");
    fillRef.current?.style.setProperty("animation", "none");
    wipeRef.current?.style.setProperty("animation", "none");
    setHydrated(true);

    started.current = performance.now();
    document.body.style.overflow = "hidden";

    let raf = 0;
    let p = 0;
    let finished = false;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let goneTimer: ReturnType<typeof setTimeout> | undefined;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;

    // Exit is TIMER-driven (not tied to the rAF progress reaching a threshold),
    // so the boot screen always leaves and unlocks scroll even if rAF is
    // throttled or a resource hangs. The bar animation below is best-effort.
    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      exitTimer = setTimeout(() => setExiting(true), 220);
      goneTimer = setTimeout(() => {
        setGone(true);
        document.body.style.overflow = "";
      }, 1050);
    };

    const scheduleFinish = () => {
      if (finishTimer || finished) return;
      const elapsed = performance.now() - started.current;
      finishTimer = setTimeout(finish, Math.max(0, 1000 - elapsed) + 320); // keep a short minimum on-screen
    };

    const onLoad = () => scheduleFinish();
    if (document.readyState === "complete") scheduleFinish();
    else window.addEventListener("load", onLoad);
    // Hard cap: never wait on `window.load` forever (slow mobile / hanging asset).
    const maxTimer = setTimeout(scheduleFinish, 2600);

    const tick = () => {
      const target = finishTimer || finished ? 100 : 90;
      p += (target - p) * 0.08;
      setProgress(Math.min(100, p));
      if (!finished) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(maxTimer);
      clearTimeout(finishTimer);
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
      ref={shellRef}
      aria-hidden
      className="preloader-shell fixed inset-0 z-[80] flex items-center justify-center bg-[#050506] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,0.84,0.28,1)]"
      style={{ transform: exiting ? "translateY(-101%)" : undefined }}
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
            ref={wipeRef}
            className="pre-wipe absolute inset-0 block overflow-hidden"
            style={hydrated ? { clipPath: `inset(0 ${100 - progress}% 0 0)` } : undefined}
          >
            <Image src="/logo.png" alt="Codexterity" width={432} height={82} priority className="h-auto w-full" />
          </span>
        </span>

        {/* gradient progress hairline (same language as the scroll bar) */}
        <span className="mt-7 block h-[2px] w-full overflow-hidden rounded-full bg-white/[0.07]">
          <span
            ref={fillRef}
            className="pre-fill block h-full origin-left rounded-full"
            style={{
              background: "var(--grad-brand)",
              ...(hydrated ? { transform: `scaleX(${progress / 100})` } : null),
            }}
          />
        </span>

        <span className="mono mt-4 flex w-full items-center justify-between text-[11px] tracking-[0.15em] text-grey">
          <span>BOOTING THE WORKFORCE</span>
          {/* percent needs JS — before hydration it would sit frozen at 0% */}
          <span className="tabular-nums text-volt">{hydrated ? `${pct}%` : ""}</span>
        </span>
      </div>
    </div>
  );
}
