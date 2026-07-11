import type { ReactNode } from "react";

// Bespoke CTA: label cell + divided arrow cell with a sheen sweep on hover.
type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <a href={href} onClick={onClick} className={`cta cta-${variant} ${className}`}>
      <span className="cta-label">{children}</span>
      <span className="cta-arrow" aria-hidden>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
