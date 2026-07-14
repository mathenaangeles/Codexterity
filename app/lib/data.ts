// Shared source of truth for services — consumed by the Services grid, the
// PackageBuilder chips, and the JSON-LD structured data, so copy and SEO
// stay consistent everywhere.
//
// Deliberately six core, top-line offers (the things people actually search
// for, deliverable by a small senior team) instead of a ten-item menu.

export type IconName =
  | "automation"
  | "web"
  | "chatbot"
  | "workflow"
  | "crm"
  | "dashboards";

export type Service = {
  id: string;
  title: string;
  icon: IconName;
  blurb: string;
  /** SEO-oriented keyword line, used in structured data. */
  keyword: string;
};

export const SERVICES: Service[] = [
  {
    id: "ai-agents",
    title: "AI Agents",
    icon: "automation",
    blurb:
      "Deploy AI agents that handle repetitive tasks, answer questions, complete workflows, and work alongside your team 24/7.",
    keyword: "AI agents for business",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    icon: "workflow",
    blurb:
      "Automate manual business processes by connecting your CRM, email, spreadsheets, accounting software, and other business tools.",
    keyword: "workflow automation and integrations",
  },
  {
    id: "chatbots-voice",
    title: "Chatbots & Voice Agents",
    icon: "chatbot",
    blurb:
      "Capture leads, answer customer questions, qualify prospects, and book appointments through your website, WhatsApp, Messenger, Viber, or phone.",
    keyword: "AI chatbots and voice agents",
  },
  {
    id: "web-development",
    title: "Web Design & Development",
    icon: "web",
    blurb:
      "Launch high-converting websites built for SEO, AI search, Google AI Overviews, and lead generation from day one.",
    keyword: "high-converting web design and development",
  },
  {
    id: "crm-sales",
    title: "CRM & Sales Automation",
    icon: "crm",
    blurb:
      "Automatically capture, score, nurture, and follow up with every lead so your sales pipeline keeps moving without manual work.",
    keyword: "CRM and sales automation",
  },
  {
    id: "dashboards-bi",
    title: "Dashboards & Business Intelligence",
    icon: "dashboards",
    blurb:
      "Turn scattered business data into real-time dashboards and reports that help you make faster, smarter decisions.",
    keyword: "business intelligence dashboards",
  },
];

export const BUDGETS = ["< $2k", "$2k–$5k", "$5k–$15k", "$15k+", "Uncertain"] as const;
export const TIMELINES = ["ASAP", "2–4 weeks", "1–3 months", "Exploring"] as const;

export type Budget = (typeof BUDGETS)[number];
export type Timeline = (typeof TIMELINES)[number];
