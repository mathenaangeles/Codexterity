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
  "How can we help you today? Choose a question below to get started. ";

export const CHAT_ROOT_OPTIONS: ChatOption[] = [
  { label: "What do you build?", to: "build" },
  { label: "How much does it cost?", to: "pricing" },
  { label: "How fast can you ship?", to: "speed" },
  { label: "Do I own it?", to: "ownership" },
  { label: "Book a call.", href: "#package" },
];

export const CHAT_NODES: Record<string, ChatNode> = {
  build: {
    id: "build",
    answer: [
      "We build custom AI solutions tailored to the way your business works, including:",
      "**AI agents and chatbots** that answer customers, automate support, and complete repetitive tasks.",
      "**Business automations** that connect your CRM, ERP, databases, APIs, and other software into seamless workflows.",
      "**Websites and applications** designed to generate leads, streamline operations, and help your business grow.",
    ],
    options: [
      { label: "How fast can you ship?", to: "speed" },
      { label: "Show me what it looks like,", href: "#services" },
      { label: "Build my package,", href: "#package" },
    ],
  },
  pricing: {
    id: "pricing",
    answer: [
      "Our pricing is designed to match the way you work.",
      "Whether you need a one-time project team, an ongoing AI partner, or strategic consultant, we'll recommend the **engagement model** that best fits your business.",
      "You'll receive a **tailored proposal** with a recommended scope, timeline, and estimated investment.",
    ],
    options: [
      { label: "How fast can you ship?", to: "speed" },
      { label: "Build my package.", href: "#package" },
    ],
  },
  speed: {
    id: "speed",
    answer: [
      "Most projects reach a first working release within **1 to 3 weeks** depending on complexity.",
      "We prioritize getting a usable solution into your hands early, then refine and expand it through rapid iterations."
    ],
    options: [
      { label: "Do I own it?", to: "ownership" },
      { label: "Build my package.", href: "#package" },
    ],
  },
  ownership: {
    id: "ownership",
    answer: [
      "**Completely**. We provide a clear handoff, plain-language documentation, and no lock-in.",
      "You do not need an in-house engineering team to keep it running.",
    ],
    options: [
      { label: "How much does it cost?", to: "pricing" },
      { label: "Build my package.", href: "#package" },
    ],
  },
};
