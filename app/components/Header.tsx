"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";

type NavItem = { name: string; href: string; index: string };

const navItems: NavItem[] = [
  { name: "Services", href: "#services", index: "01" },
  { name: "Process", href: "#process", index: "02" },
  { name: "Results", href: "#results", index: "03" },
  { name: "Package", href: "#package", index: "04" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    // sync initial state after paint (avoids setState directly in the effect)
    const raf = requestAnimationFrame(() => {
      onScroll();
      if (window.location.hash === "#menu") setMenuOpen(true);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      {/* Floating pill nav — kept above the full-screen menu so the close (X) stays clickable */}
      <div
        className={`relative z-[60] mx-auto flex h-14 max-w-[1120px] items-center justify-between rounded-full pl-5 pr-2.5 transition-all duration-500 ${
          scrolled
            ? "border border-white/10 bg-black/55 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            : "border border-white/[0.04] bg-white/[0.02] backdrop-blur-md"
        }`}
      >
        <a href="#top" aria-label="Codexterity home" className="flex items-center">
          <Image src="/logo.png" alt="Codexterity" width={432} height={82} priority className="h-[27px] w-auto" />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="rounded-full px-4 py-2 text-[14px] text-grey-2 transition-colors duration-300 hover:bg-white/5 hover:text-white"
            >
              <span className="roll">
                <span className="roll-inner" data-text={item.name}>
                  {item.name}
                </span>
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex">
            <Button href="#package" variant="primary" size="sm">
              Start a project
            </Button>
          </span>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
          >
            <div className="flex flex-col gap-[5px]">
              <span className={`block h-[1.5px] w-4 bg-white transition-all duration-300 ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] w-4 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-[1.5px] w-4 bg-white transition-all duration-300 ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <FullScreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} items={navItems} />
    </header>
  );
}

function FullScreenMenu({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}) {
  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-500 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-[#050506]/[0.98] backdrop-blur-2xl" />
      {/* ambient glow + grid */}
      <div className="section-grid section-grid-fade" aria-hidden />
      <div className="glow glow-indigo left-1/2 top-1/2 h-[420px] w-[520px] -translate-x-1/2 -translate-y-1/2" aria-hidden />

      {/* scroll container: centers when short, scrolls when tall (never clips).
          data-lenis-prevent hands wheel events back to this box. */}
      <div data-lenis-prevent className="relative z-10 h-full overflow-y-auto">
        <nav className="mx-auto flex min-h-full max-w-[1120px] flex-col justify-center px-6 py-24">
          {items.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="group relative flex items-center justify-between border-b border-white/10 px-1 py-4 sm:py-5"
              style={{
                // longhand transition props only: mixing the `transition`
                // shorthand with a changing `transitionDelay` makes React warn
                // about conflicting style properties on rerender
                transitionDelay: open ? `${120 + i * 55}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(22px)",
                opacity: open ? 1 : 0,
                transitionProperty: "transform, opacity",
                transitionDuration: "0.6s",
                transitionTimingFunction: "cubic-bezier(0.16,0.84,0.28,1)",
              }}
            >
              <span className="menu-rule" aria-hidden />
              <div className="flex items-baseline gap-5 sm:gap-8">
                <span className="mono text-[13px] text-grey-3 transition-colors duration-300 group-hover:text-volt">
                  {item.index}
                </span>
                <span className="menu-label font-display text-[clamp(2rem,7vw,4rem)] font-extrabold leading-none">
                  {item.name}
                </span>
              </div>
              <span className="flex h-11 w-11 shrink-0 -translate-x-3 -rotate-45 items-center justify-center rounded-full border border-white/15 text-white opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:rotate-0 group-hover:border-white/40 group-hover:opacity-100">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}

          {/* menu footer: CTA on one side, contact meta on the other */}
          <div
            className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
            style={{
              transitionDelay: open ? "420ms" : "0ms",
              opacity: open ? 1 : 0,
              transitionProperty: "opacity",
              transitionDuration: "0.6s",
            }}
          >
            <span onClick={onClose}>
              <Button href="#package">Start a project</Button>
            </span>
            <div className="flex flex-col gap-2 sm:items-end">
              <a href="mailto:codexterityai@gmail.com" className="mono text-[13px] text-grey-2 transition-colors hover:text-aqua">
                codexterityai@gmail.com
              </a>
              <span className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-grey-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-volt" />
                </span>
                Taking new projects
              </span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
