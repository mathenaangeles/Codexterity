"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type NavItem = { name: string; href: string; index: string };

const navItems: NavItem[] = [
  { name: "Services", href: "#services", index: "01" },
  { name: "Use cases", href: "#uses", index: "02" },
  { name: "Package", href: "#package", index: "03" },
  { name: "Process", href: "#process", index: "04" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (window.location.hash === "#menu") setMenuOpen(true);
    return () => window.removeEventListener("scroll", onScroll);
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
          <Image src="/logo.png" alt="Codexterity" width={448} height={98} priority className="h-[20px] w-auto" />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="rounded-full px-4 py-2 text-[14px] text-grey-2 transition-colors duration-300 hover:bg-white/5 hover:text-white"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#package"
            className="hidden items-center gap-2 rounded-full bg-volt px-5 py-2 text-[14px] font-semibold text-[#0a0a08] transition-all duration-300 hover:bg-[#f0ff6e] sm:inline-flex"
          >
            Start a project
          </a>
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
  const all = [...items, { name: "Start a project", href: "#package", index: "05" }];
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

      {/* scroll container: centers when short, scrolls when tall (never clips) */}
      <div className="relative z-10 h-full overflow-y-auto">
        <nav className="mx-auto flex min-h-full max-w-[1120px] flex-col justify-center px-6 pb-12 pt-24">
          {all.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="group flex items-center justify-between border-b border-white/10 py-4 sm:py-5"
              style={{
                transitionDelay: open ? `${120 + i * 55}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(22px)",
                opacity: open ? 1 : 0,
                transition: "transform 0.6s cubic-bezier(0.16,0.84,0.28,1), opacity 0.6s",
              }}
            >
              <div className="flex items-baseline gap-5 sm:gap-8">
                <span className="mono text-[13px] text-grey-3 transition-colors group-hover:text-aqua">
                  {item.index}
                </span>
                <span className="font-display text-[clamp(2rem,7vw,4rem)] font-extrabold leading-none text-grey-2 transition-colors duration-300 group-hover:text-white">
                  {item.name}
                </span>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:-translate-x-2">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}

          <div
            className="mt-8 flex flex-col gap-2 text-grey"
            style={{
              transitionDelay: open ? "460ms" : "0ms",
              opacity: open ? 1 : 0,
              transition: "opacity 0.6s",
            }}
          >
            <a href="mailto:hello@codexterity.ai" className="mono text-[13px] transition-colors hover:text-aqua">
              hello@codexterity.ai
            </a>
            <span className="mono text-[12px] text-grey-3">
              <span className="text-aqua">●</span> available for new work
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
}
