import type { IconName } from "../lib/data";

/**
 * Bespoke line icons — one consistent visual language: 1.6 stroke, round caps,
 * 24 grid, generous negative space so each reads clearly at small sizes.
 */
type IconProps = { name: IconName; className?: string };

const common = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function Icon({ name, className }: IconProps) {
  const paths: Record<IconName, React.ReactNode> = {
    // circular arrows = automation (self-running loop)
    automation: (
      <>
        <path d="M19.5 12a7.5 7.5 0 1 1-2.05-5.15" />
        <path d="M19.8 4.2v3.4h-3.4" />
        <circle cx="12" cy="12" r="2.2" />
      </>
    ),
    // browser window = web
    web: (
      <>
        <rect x="3.5" y="5" width="17" height="14" rx="2" />
        <path d="M3.5 9h17M6.6 7h.01M9 7h.01" />
      </>
    ),
    // speech bubble with dots = chatbot
    chatbot: (
      <>
        <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-7l-4 3v-3H5A1.5 1.5 0 0 1 3.5 14V7A1.5 1.5 0 0 1 5 5.5Z" />
        <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" />
      </>
    ),
    // connected nodes = workflow
    workflow: (
      <>
        <circle cx="6" cy="6.5" r="2.2" />
        <circle cx="18" cy="17.5" r="2.2" />
        <circle cx="18" cy="6.5" r="2.2" />
        <path d="M8.2 6.5h7.6M6 8.7v4.3a2 2 0 0 0 2 2h7.8" />
      </>
    ),
    // people in pipeline = crm
    crm: (
      <>
        <circle cx="8.5" cy="8" r="2.6" />
        <path d="M4 19c0-2.7 2-4.5 4.5-4.5s4.5 1.8 4.5 4.5" />
        <path d="M15.5 9.5h5M15.5 13h5M15.5 16.5h3" />
      </>
    ),
    // bar chart = dashboards
    dashboards: (
      <>
        <path d="M4 4.5v15h16" />
        <path d="M8 16v-3M12 16V9M16 16v-6" />
      </>
    ),
  };

  return (
    <svg {...common} className={className} aria-hidden="true" role="img">
      {paths[name]}
    </svg>
  );
}
