// Deterministic, scripted chat content. No LLM, no backend: every answer is
// pre-written and every path is a button. It replaces a static FAQ.

export type ChatOption = { label: string; to?: string; href?: string };

export type ChatNode = {
  id: string;
  // answer can contain **bold** segments; rendered by the widget
  answer: string[];
  // follow-up options: label + the node id it leads to (or a link)
  options: ChatOption[];
};

export const CHAT_INTRO =
  "You found the talk button. I'm the site, and I answer fast. Pick a question below.";

export const CHAT_ROOT_OPTIONS: ChatOption[] = [
  { label: "What do you build?", to: "build" },
  { label: "Pricing & engagements", to: "pricing" },
  { label: "How fast can you ship?", to: "speed" },
  { label: "Do I own it?", to: "ownership" },
  { label: "Book a call", href: "#package" },
];

export const CHAT_NODES: Record<string, ChatNode> = {
  build: {
    id: "build",
    answer: [
      "Three buckets, all shipped to production:",
      "**Agents & applied AI** — support agents, RAG on your docs, workflow bots.",
      "**Systems & automation** — CRM, dashboards, lead routing, API glue.",
      "**Websites** — conversion-focused sites and the tooling behind them.",
    ],
    options: [
      { label: "How fast can you ship?", to: "speed" },
      { label: "Show me real work", href: "#work" },
      { label: "Build my package", href: "#package" },
    ],
  },
  pricing: {
    id: "pricing",
    answer: [
      "Simple, and told to your face:",
      "**Fixed price** for scoped projects. **Retainer** for the long game. **Advisory** when you need a brain, not a build.",
      "You get a scope within one business day of a short call. No surprise invoices.",
    ],
    options: [
      { label: "How fast can you ship?", to: "speed" },
      { label: "Build my package", href: "#package" },
    ],
  },
  speed: {
    id: "speed",
    answer: [
      "Fast, because we ship working software instead of decks.",
      "A first working system usually lands in **1 to 3 weeks**. You see progress live, not at the end.",
    ],
    options: [
      { label: "Do I own it?", to: "ownership" },
      { label: "Build my package", href: "#package" },
    ],
  },
  ownership: {
    id: "ownership",
    answer: [
      "Completely. Clear handoff, plain-language docs, and no lock-in.",
      "You do not need an in-house engineering team to keep it running. It's yours to keep.",
    ],
    options: [
      { label: "Pricing & engagements", to: "pricing" },
      { label: "Build my package", href: "#package" },
    ],
  },
};
