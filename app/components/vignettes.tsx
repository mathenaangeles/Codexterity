import type { ReactNode } from "react";
import Image from "next/image";
import { siShopify, siQuickbooks, siWhatsapp, siGooglesheets } from "simple-icons";

/**
 * Mini-app demos for the "What we build" section: one product snapshot per
 * service, looping on CSS keyframes (vg-* classes in globals.css). Each is
 * designed like a screen of the real deliverable: an agent console, an
 * automation run, a support desk, a site deploy, a CRM pipeline, a BI
 * dashboard you can talk to.
 */

/* ---------------------------------------------------------- shared frame */

export function Frame({
  label,
  accent,
  children,
}: {
  label: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b0b0d]">
      <div className="section-grid opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(circle at 70% 20%, ${accent}, transparent 60%)` }}
        aria-hidden
      />
      <div className="absolute inset-4 flex flex-col rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm sm:inset-5">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
          <span className="text-[12px] font-medium text-grey-2">{label}</span>
          <span className="flex items-center gap-1.5 rounded-full border border-volt/30 bg-volt/[0.06] px-2.5 py-1 text-[10px] font-semibold text-volt">
            <span className="h-1 w-1 rounded-full bg-volt" />
            RUNNING
          </span>
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-0 p-3.5">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- tiny primitives */

function Avatar({ initials, className = "" }: { initials: string; className?: string }) {
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[10px] font-semibold text-grey-2 ${className}`}
    >
      {initials}
    </span>
  );
}

/* --------------------------------------------------- 1 · AI agent console */

function AgentTask({
  initials,
  sender,
  subject,
  result,
  delay,
  escalated = false,
}: {
  initials: string;
  sender: string;
  subject: string;
  result: string;
  delay: string;
  /** The one task the agent hands to a human, so the demo reads honest. */
  escalated?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2">
      <Avatar initials={initials} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[11.5px] font-semibold text-white">{sender}</p>
          <span className="relative grid shrink-0 justify-items-end">
            <span
              className="vg-flip-a col-start-1 row-start-1 rounded-full border border-white/10 px-2 py-px text-[9px] font-medium text-grey-3"
              style={{ ["--vd" as string]: delay }}
            >
              Queued
            </span>
            {escalated ? (
              <span
                className="vg-flip-b col-start-1 row-start-1 inline-flex items-center gap-1 rounded-full border border-aqua/40 bg-aqua/10 px-2 py-px text-[9px] font-bold text-aqua"
                style={{ ["--vd" as string]: delay }}
              >
                Marked for Review
              </span>
            ) : (
              <span
                className="vg-flip-b col-start-1 row-start-1 inline-flex items-center gap-1 rounded-full bg-volt px-2 py-px text-[9px] font-bold text-black"
                style={{ ["--vd" as string]: delay }}
              >
                <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Done
              </span>
            )}
          </span>
        </div>
        <div className="relative grid text-[10.5px]">
          <span className="vg-flip-a col-start-1 row-start-1 truncate text-grey-3" style={{ ["--vd" as string]: delay }}>
            {subject}
          </span>
          <span className="vg-flip-b col-start-1 row-start-1 truncate text-grey-2" style={{ ["--vd" as string]: delay }}>
            {result}
          </span>
        </div>
      </div>
    </div>
  );
}

export function AgentVignette() {
  return (
    <div className="flex h-full flex-col justify-between gap-2">
      {/* console header */}
      <div className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2">
        <span className="flex items-center gap-2 text-[11px] font-medium text-grey-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-volt" />
          </span>
          Inbox Agent
        </span>
        <span className="text-[10px] tabular-nums text-grey-3">6:12 AM</span>
      </div>

      <div className="space-y-1.5">
        <AgentTask initials="ST" sender="Sam Torres" subject="Refund for order #1042" result="Refunded the order and replied to Sam." delay="0.4s" />
        <AgentTask initials="AC" sender="Ava Chen" subject="Quote: catering for 80 guests" result="Drafted a quote and sent it for review." delay="1.2s" />
        <AgentTask initials="RD" sender="Ravi Deol" subject="Reschedule Tuesday delivery" result="Rebooked it and updated the calendar." delay="2s" />
        <AgentTask initials="LK" sender="Lena Koh" subject="Custom contract terms" result="Summarized the thread for your review." delay="2.8s" escalated />
      </div>

      {/* summary strip */}
      <div className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2">
        <span className="text-[10.5px] text-grey-2">
          Ran <span className="font-semibold text-white">9 actions</span> across Gmail, Stripe, and your calendar.
        </span>
        <span className="relative grid text-[10.5px] font-semibold">
          <span className="vg-flip-a col-start-1 row-start-1 text-grey-3" style={{ ["--vd" as string]: "3.4s" }}>
            Working...
          </span>
          <span className="vg-flip-b col-start-1 row-start-1 text-mint" style={{ ["--vd" as string]: "3.4s" }}>
            Completed
          </span>
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------- 2 · workflow timeline */

function FlowStep({
  icon,
  app,
  action,
  ms,
  delay,
  last = false,
}: {
  icon: { path: string };
  app: string;
  action: string;
  ms: string;
  delay: string;
  last?: boolean;
}) {
  return (
    <div className="grid grid-cols-[28px_1fr] gap-x-2.5">
      {/* timeline rail: tool icon node + connector wire */}
      <div className="flex flex-col items-center">
        <span
          className="vg-node flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
          style={{ ["--vd" as string]: delay }}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-grey-2" aria-hidden>
            <path d={icon.path} />
          </svg>
        </span>
        {!last && (
          <span className="mt-1 h-full min-h-3 w-px bg-white/[0.08]">
            <span className="vg-wire block h-full w-full bg-volt/60" style={{ ["--vd" as string]: delay }} />
          </span>
        )}
      </div>
      <div className={`flex items-center justify-between gap-2 ${last ? "" : "pb-2"}`}>
        <span className="min-w-0 truncate text-[11.5px] text-grey-2">
          <span className="font-semibold text-white">{app}</span> · {action}
        </span>
        <span className="relative grid shrink-0 justify-items-end text-[9.5px] tabular-nums">
          <span className="vg-flip-a col-start-1 row-start-1 text-grey-3" style={{ ["--vd" as string]: delay }} aria-hidden>
            —
          </span>
          <span className="vg-flip-b col-start-1 row-start-1 font-medium text-mint" style={{ ["--vd" as string]: delay }}>
            ✓ {ms}
          </span>
        </span>
      </div>
    </div>
  );
}

export function WorkflowVignette() {
  const week = [5, 8, 6, 9, 7, 10, 8];
  return (
    <div className="flex h-full flex-col justify-between gap-2">
      {/* builder header */}
      <div className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2">
        <span className="truncate text-[11px] font-medium text-white">New order → invoice → notify</span>
        <span className="flex items-center gap-1.5 rounded-full bg-mint/12 px-2 py-0.5 text-[9.5px] font-bold text-mint">
          <span className="h-1 w-1 rounded-full bg-mint" />
          ON
        </span>
      </div>

      <div className="rounded-lg border border-white/[0.07] bg-white/[0.015] p-3">
        <FlowStep icon={siShopify} app="Shopify" action="A new order comes in." ms="0.2s" delay="0s" />
        <FlowStep icon={siQuickbooks} app="QuickBooks" action="The invoice is created and sent." ms="0.8s" delay="0.8s" />
        <FlowStep icon={siWhatsapp} app="WhatsApp" action="The fulfillment team gets pinged." ms="0.3s" delay="1.6s" />
        <FlowStep icon={siGooglesheets} app="Google Sheets" action="The revenue sheet updates itself." ms="0.4s" delay="2.4s" last />
      </div>

      {/* run history with sparkline */}
      <div className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2">
        <span className="text-[10.5px] text-grey-2">
          <span className="font-semibold text-white">142 runs</span> this week, <span className="font-semibold text-mint">0 errors</span>.
        </span>
        <span className="flex h-4 items-end gap-[3px]" aria-hidden>
          {week.map((v, i) => (
            <span
              key={i}
              className="vg-bar w-[5px] rounded-t-[2px] bg-volt/50"
              style={{ height: `${v * 10}%`, ["--vd" as string]: `${0.3 + i * 0.12}s` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

/* ----------------------------------------------- 3 · chatbot / voice agent */

export function SupportVignette() {
  return (
    <div className="flex h-full flex-col text-[12px] leading-snug">
      <div className="flex flex-1 flex-col justify-end gap-2">
        {/* earlier exchange, dimmed: the desk has been running all night */}
        <div className="max-w-[70%] self-start rounded-xl rounded-bl-sm border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-grey-3 opacity-60">
          Do you ship to Canada?
        </div>
        <div className="max-w-[72%] self-end rounded-xl rounded-br-sm bg-volt/25 px-3 py-2 text-grey-2 opacity-60">
          Yes, we ship to Canada in 3 to 5 business days. It&apos;s free on orders over $50.
        </div>
        <div className="vg-in max-w-[75%] self-start rounded-xl rounded-bl-sm border border-white/10 bg-white/[0.05] px-3 py-2 text-grey-2" style={{ ["--vd" as string]: "0.2s" }}>
          Hi! Where is my order #4821?
        </div>
        <div className="vg-typing flex w-fit items-center gap-1 self-end rounded-xl rounded-br-sm bg-volt/15 px-3 py-2 text-volt" aria-hidden>
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
        <div className="vg-in max-w-[80%] self-end rounded-xl rounded-br-sm bg-volt px-3 py-2 font-medium text-[#0a0a08]" style={{ ["--vd" as string]: "2.7s" }}>
          Good news: it shipped this morning and arrives Thursday. Here is your tracking:
        </div>
        <div className="vg-in flex max-w-[80%] items-center gap-2.5 self-end rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2" style={{ ["--vd" as string]: "3.3s" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-aqua">
            <path d="M4 8l8-4 8 4v8l-8 4-8-4V8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M4 8l8 4 8-4M12 12v8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <span className="text-white">
            <span className="font-semibold">Order #4821</span>
            <span className="block text-[11px] text-grey-2">It&apos;s out for delivery and arrives Thursday.</span>
          </span>
        </div>
        <div className="vg-in self-end text-[10px] text-grey" style={{ ["--vd" as string]: "3.9s" }}>
          Resolved in 8 seconds at 2:04 AM. No human needed.
        </div>
      </div>
      {/* composer */}
      <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
        <span className="flex-1 text-[11.5px] text-grey-3">Ask anything at any hour...</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-grey-3" aria-hidden>
          <path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 1 1-6 0V6a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6 12a6 6 0 0 0 12 0M12 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-volt text-[#0a0a08]">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------- 4 · website building itself */

export function WebVignette() {
  const scores = [
    { ring: "100", label: "Speed", sub: "1.2s load" },
    { ring: "98", label: "SEO", sub: "#1 on Google" },
    { ring: "100", label: "Mobile", sub: "+38% conversions" },
  ];
  return (
    <div className="flex h-full flex-col">
      {/* browser chrome */}
      <div className="flex items-center gap-2 rounded-t-lg border border-white/10 bg-white/[0.03] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 rounded-md bg-black/40 px-3 py-0.5 text-[10px] text-grey-2">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="2" />
          </svg>
          yourbusiness.com
        </span>
      </div>
      {/* the page assembling */}
      <div className="relative flex-1 overflow-hidden rounded-b-lg border border-t-0 border-white/10 bg-black/30 p-3">
        <div className="vg-in flex items-center justify-between" style={{ ["--vd" as string]: "0.3s" }}>
          <span className="h-2 w-12 rounded-full bg-white/25" />
          <span className="flex gap-2">
            <span className="h-2 w-8 rounded-full bg-white/10" />
            <span className="h-2 w-8 rounded-full bg-white/10" />
            <span className="h-2 w-8 rounded-full bg-white/10" />
          </span>
        </div>
        <div className="vg-in mt-4" style={{ ["--vd" as string]: "0.9s" }}>
          <span className="block h-3.5 w-4/5 rounded-full bg-white/30" />
          <span className="mt-1.5 block h-3.5 w-3/5 rounded-full bg-white/30" />
          <span className="mt-2 block h-2 w-2/3 rounded-full bg-white/[0.09]" />
        </div>
        <span className="vg-in mt-3 inline-block rounded-md bg-volt px-4 py-1.5 text-[10px] font-bold text-black" style={{ ["--vd" as string]: "1.5s" }}>
          Book a call
        </span>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[2.1, 2.4, 2.7].map((d) => (
            <div key={d} className="vg-in rounded-md border border-white/[0.07] bg-white/[0.02] p-2" style={{ ["--vd" as string]: `${d}s` }}>
              <span className="block h-6 rounded bg-white/[0.06]" />
              <span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-white/12" />
            </div>
          ))}
        </div>
        {/* audit bar: ring gauges with their receipts, one glass strip */}
        <div className="vg-in absolute bottom-3 left-3 right-3 grid grid-cols-3 divide-x divide-white/[0.08] rounded-lg border border-white/10 bg-black/60 py-2 backdrop-blur-sm" style={{ ["--vd" as string]: "3.2s" }}>
          {scores.map((s) => (
            <span key={s.label} className="flex items-center justify-center gap-2 px-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-mint/60 text-[9px] font-bold text-mint">
                {s.ring}
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] font-semibold text-white">{s.label}</span>
                <span className="block text-[9px] text-grey-2">{s.sub}</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------ 5 · CRM pipeline */

function LeadCard({
  initials,
  name,
  tag,
  amount,
}: {
  initials: string;
  name: string;
  tag: string;
  amount: string;
}) {
  return (
    <div className="rounded-md border border-white/[0.07] bg-white/[0.03] p-2">
      <div className="flex items-center gap-1.5">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/[0.09] text-[7.5px] font-bold text-grey-2">
          {initials}
        </span>
        <p className="truncate text-[10px] font-semibold text-white">{name}</p>
      </div>
      <div className="mt-1 flex items-center justify-between gap-1">
        <span className="truncate text-[9px] text-grey-3">{tag}</span>
        <span className="shrink-0 text-[9px] font-medium text-grey-2">{amount}</span>
      </div>
    </div>
  );
}

export function LeadsVignette() {
  const stages = [
    {
      name: "New lead",
      total: "$8.5k",
      cls: "vg-stage-1",
      cards: [
        { initials: "MR", name: "Maya R.", tag: "Site Redesign", amount: "$2.8k" },
        { initials: "OT", name: "Owen T.", tag: "Chatbot", amount: "$1.5k" },
        { initials: "EF", name: "Ella F.", tag: "Automation", amount: "$1.9k" },
      ],
    },
    {
      name: "Contacted",
      total: "$8.6k",
      cls: "vg-stage-2",
      cards: [
        { initials: "PS", name: "Priya S.", tag: "CRM Setup", amount: "$3.4k" },
        { initials: "LM", name: "Leo M.", tag: "SEO Retainer", amount: "$900/mo" },
        { initials: "NA", name: "Noor A.", tag: "AI Chatbot", amount: "$2.6k" },
      ],
    },
    {
      name: "Call booked",
      total: "$11.5k",
      cls: "vg-stage-3",
      cards: [
        { initials: "DW", name: "Dana W.", tag: "Dashboards", amount: "$5.1k" },
        { initials: "CB", name: "Cole B.", tag: "Automation", amount: "$2.2k" },
        { initials: "IV", name: "Iris V.", tag: "Web & CRM", amount: "$4.2k" },
      ],
    },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="relative grid flex-1 grid-cols-3 gap-2">
        {stages.map((s) => (
          <div key={s.name} className="flex flex-col gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
            <span className={`${s.cls} flex items-baseline justify-between text-[9.5px] font-semibold uppercase tracking-wide`}>
              {s.name}
              <span className="text-[9px] font-bold normal-case tracking-normal text-grey-2">{s.total}</span>
            </span>
            <span className="h-[46px]" aria-hidden />
            {s.cards.map((c) => (
              <LeadCard key={c.name} {...c} />
            ))}
          </div>
        ))}
        <div className="pointer-events-none absolute left-2 top-[26px] w-[calc((100%-16px)/3-16px)]">
          <div className="vg-lead-card rounded-md border border-volt/60 bg-[#17170d] p-2 shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-volt text-[7.5px] font-bold text-black">JP</span>
              <span className="truncate text-[10px] font-semibold text-white">Jordan P.</span>
            </div>
            <div className="mt-1 flex items-center justify-between gap-1">
              <span className="truncate text-[9px] text-grey-2">Quote Request</span>
              <span className="shrink-0 text-[9px] font-bold text-volt">$4.2k</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2.5 text-center text-[11px] text-grey">
        Every lead is replied to, scored, and booked <span className="font-semibold text-white">in under a minute</span>.
      </p>
    </div>
  );
}

/* ------------------------------------------- 6 · BI dashboard + ask-data */

export function AnalyticsVignette() {
  const kpis = [
    { label: "Revenue", value: "$48.2k", delta: "+12%" },
    { label: "Hours saved", value: "31", delta: "this week" },
    { label: "Open tickets", value: "4", delta: "-63%" },
  ];
  const bars = [38, 52, 44, 60, 55, 72, 66, 88];
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((k, i) => (
          <div key={k.label} className="vg-in rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-2" style={{ ["--vd" as string]: `${0.2 + i * 0.25}s` }}>
            <p className="text-[10px] text-grey">{k.label}</p>
            <p className="text-[15px] font-bold leading-tight text-white">{k.value}</p>
            <p className="text-[9.5px] font-medium text-mint">{k.delta}</p>
          </div>
        ))}
      </div>
      {/* bar chart + trend line, both animated */}
      <div className="relative flex-1 overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
        <div className="flex items-center justify-between px-1 pb-1.5">
          <span className="text-[9.5px] font-medium text-grey-2">Revenue by week</span>
          <span className="flex items-center gap-1 text-[9px] text-grey">
            <span className="h-1 w-1 rounded-full bg-aqua" />
            Trend
          </span>
        </div>
        <div className="relative h-[calc(100%-20px)]">
          <div className="absolute inset-0 flex items-end justify-between gap-1.5 px-1">
            {bars.map((v, i) => (
              <span
                key={i}
                className="vg-bar w-full rounded-t-[3px]"
                style={{
                  height: `${v}%`,
                  background: i === bars.length - 1 ? "var(--grad-brand-soft)" : "rgba(255,255,255,0.10)",
                  ["--vd" as string]: `${0.3 + i * 0.14}s`,
                }}
              />
            ))}
          </div>
          <svg viewBox="0 0 240 80" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" fill="none" aria-hidden>
            <path
              d="M14 52 C 40 46, 60 42, 88 40 C 118 38, 132 30, 162 26 C 190 22, 210 18, 228 10"
              stroke="#37d9d4"
              strokeWidth="2"
              strokeLinecap="round"
              className="vg-draw"
            />
          </svg>
        </div>
      </div>
      {/* ask your data: a real chat exchange with avatars */}
      <div className="space-y-1.5">
        <div className="vg-in ml-auto flex w-fit items-center gap-1.5" style={{ ["--vd" as string]: "3s" }}>
          <span className="rounded-lg rounded-br-sm bg-white/[0.06] px-2.5 py-1.5 text-[11px] text-white">
            Which channel grew fastest?
          </span>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.09] text-[8px] font-bold text-grey-2">
            You
          </span>
        </div>
        <div className="vg-in flex w-fit items-center gap-1.5" style={{ ["--vd" as string]: "3.9s" }}>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-volt/40 bg-black/60">
            <Image src="/x-mark.png" alt="" aria-hidden width={166} height={196} className="h-2.5 w-auto" />
          </span>
          <span className="rounded-lg rounded-bl-sm bg-volt/12 px-2.5 py-1.5 text-[11px] font-medium text-volt">
            Instagram grew the fastest. It&apos;s up 34% this month.
          </span>
        </div>
      </div>
    </div>
  );
}
