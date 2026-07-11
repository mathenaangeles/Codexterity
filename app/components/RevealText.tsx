"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Token = { kind: "word"; text: string; grad?: boolean } | { kind: "br" };

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) return extractText((node.props as { children?: ReactNode }).children);
  return "";
}

function tokenize(children: ReactNode, out: Token[]) {
  Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      for (const w of String(child).split(/\s+/).filter(Boolean)) out.push({ kind: "word", text: w });
    } else if (isValidElement(child)) {
      if (child.type === "br") {
        out.push({ kind: "br" });
        return;
      }
      // Treat a nested element (e.g. the gradient span) as a single animated unit
      // so its gradient stays continuous instead of restarting per word.
      out.push({ kind: "word", text: extractText(child), grad: true });
    }
  });
}

/**
 * Word-by-word reveal that rises and fades into place. Never clips descenders.
 * Gradient segments (passed as a nested element) animate as one unit.
 */
export default function RevealText({
  children,
  className = "",
  stagger = 55,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const tokens: Token[] = [];
  tokenize(children, tokens);

  let wi = 0;
  return (
    <span ref={ref} className={`rw ${visible ? "is-visible" : ""} ${className}`}>
      {tokens.map((t, i) => {
        if (t.kind === "br") return <br key={i} />;
        const delay = visible ? `${wi++ * stagger}ms` : "0ms";
        return (
          <span
            key={i}
            className={`rw-word ${t.grad ? "text-gradient" : ""}`}
            style={{ transitionDelay: delay, marginRight: "0.26em" }}
          >
            {t.text}
          </span>
        );
      })}
    </span>
  );
}
