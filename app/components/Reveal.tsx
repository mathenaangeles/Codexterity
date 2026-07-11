"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger index — each step adds 70ms of delay for a cascading reveal. */
  delay?: number;
  /** Fraction of the element visible before it triggers. */
  threshold?: number;
};

/**
 * Subtle scroll-reveal wrapper (IntersectionObserver). Respects
 * prefers-reduced-motion by showing content immediately.
 */
export default function Reveal({
  children,
  as,
  className = "",
  delay = 0,
  threshold = 0.15,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay * 70}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
