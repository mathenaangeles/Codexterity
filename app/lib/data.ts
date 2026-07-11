// Shared source of truth for services — consumed by the Services grid, the
// PackageBuilder chips, and the Contact form's service selector, so the copy
// stays consistent everywhere.

export type IconName =
  | "automation"
  | "web"
  | "chatbot"
  | "workflow"
  | "crm"
  | "leads"
  | "ecommerce"
  | "dashboards"
  | "api"
  | "software";

export type Service = {
  id: string;
  title: string;
  icon: IconName;
  blurb: string;
};

// Core services, verbatim from the brand book.
export const SERVICES: Service[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    icon: "automation",
    blurb: "Put the repetitive judgment calls on autopilot: triage, replies, routing, and follow-ups.",
  },
  {
    id: "website-development",
    title: "Website Development",
    icon: "web",
    blurb: "Conversion-focused sites that load fast, read clearly, and turn visitors into leads.",
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbots",
    icon: "chatbot",
    blurb: "The assistant that answers your leads at 2am, trained on how your business actually works.",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    icon: "workflow",
    blurb: "Connect the tools you already use so hand-offs happen without anyone touching them.",
  },
  {
    id: "crm-setup",
    title: "CRM Setup",
    icon: "crm",
    blurb: "A pipeline your team will actually use, with clean stages, automations, and no data entry.",
  },
  {
    id: "lead-generation",
    title: "Lead Generation",
    icon: "leads",
    blurb: "Systems that find, capture, and nurture the right leads while you do the work you love.",
  },
  {
    id: "ecommerce-automation",
    title: "E-Commerce Automation",
    icon: "ecommerce",
    blurb: "Orders, inventory, and post-purchase flows that run themselves across your storefront.",
  },
  {
    id: "dashboards-reporting",
    title: "Dashboards & Reporting",
    icon: "dashboards",
    blurb: "One screen for the numbers that matter, live and accurate and built to decide from.",
  },
  {
    id: "api-integrations",
    title: "API Integrations",
    icon: "api",
    blurb: "Make two systems that were never meant to talk to each other work as one.",
  },
  {
    id: "custom-software",
    title: "Custom Software",
    icon: "software",
    blurb: "When off-the-shelf can't do it, we build the exact tool your operation needs.",
  },
];

export const BUDGETS = ["< $2k", "$2k–$5k", "$5k–$15k", "$15k+", "Not sure yet"] as const;
export const TIMELINES = ["ASAP", "2–4 weeks", "1–3 months", "Exploring"] as const;

export type Budget = (typeof BUDGETS)[number];
export type Timeline = (typeof TIMELINES)[number];
