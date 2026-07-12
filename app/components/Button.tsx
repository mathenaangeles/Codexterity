import type { ReactNode } from "react";

/**
 * Blueprint CTA (hex.tech-style): boxy button with registration marks at the
 * four corners that snap from circles into L-brackets on hover. Corner marks
 * are rendered as spans so both <a> and <button> forms share the look.
 */

export function BlueprintCorners() {
  return (
    <>
      <span className="bp bp-tl" aria-hidden />
      <span className="bp bp-tr" aria-hidden />
      <span className="bp bp-bl" aria-hidden />
      <span className="bp bp-br" aria-hidden />
    </>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <a href={href} onClick={onClick} className={`cta cta-${variant} ${size === "sm" ? "cta-sm" : ""} ${className}`}>
      <BlueprintCorners />
      <span>{children}</span>
      <span className="cta-arrow" aria-hidden>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
