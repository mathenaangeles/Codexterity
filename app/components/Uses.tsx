"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import RevealText from "./RevealText";

type Use = {
  title: string;
  manual: string; // the painful "before"
  outcome: string; // the automated "after"
  metric: string;
  accent: string; // preview glow
};

const USES: Use[] = [
  {
    title: "Inbox & support",
    manual: "Answering the same questions all day.",
    outcome: "A trained assistant replies in seconds, day or night, and escalates only what matters.",
    metric: "60% of tickets resolved with no human",
    accent: "rgba(230,255,75,0.35)",
  },
  {
    title: "Invoicing & chasing",
    manual: "Remembering who owes you, and nudging them.",
    outcome: "Invoices go out on time and chase themselves until they're paid.",
    metric: "Paid ~9 days faster on average",
    accent: "rgba(55,217,212,0.35)",
  },
  {
    title: "Lead capture & routing",
    manual: "Copy-pasting leads between tools by hand.",
    outcome: "Every inbound lead is enriched, scored, and routed to the right place instantly.",
    metric: "Routed in under 2 seconds",
    accent: "rgba(111,121,255,0.4)",
  },
  {
    title: "Reporting",
    manual: "Rebuilding the same spreadsheet every week.",
    outcome: "One live dashboard pulls from every tool and lands in your inbox each morning.",
    metric: "Hours of manual reporting, gone",
    accent: "rgba(230,255,75,0.28)",
  },
  {
    title: "Client onboarding",
    manual: "Chasing forms, files, and first steps.",
    outcome: "New clients get set up on a guided flow that runs without you touching it.",
    metric: "Zero-touch onboarding",
    accent: "rgba(55,217,212,0.3)",
  },
];

function Preview({ use }: { use: Use }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b0b0d]">
      <div className="section-grid opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(circle at 68% 32%, ${use.accent}, transparent 62%)` }}
        aria-hidden
      />
      {/* mock "after" UI */}
      <div className="absolute inset-6 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="mono text-[11px] text-grey-2">{use.title.toLowerCase()}</span>
          <span className="badge !py-0.5 !text-[10px]">
            <span className="dot bg-volt" />
            automated
          </span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2.5 w-2/3 rounded bg-white/15" />
          <div className="h-2 w-full rounded bg-white/8" />
          <div className="h-2 w-4/5 rounded bg-white/8" />
        </div>
        <div className="mt-5 flex items-center gap-2 rounded-lg border border-volt/25 bg-volt/10 px-3 py-2.5">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-volt">
            <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[12px] font-medium text-white">{use.metric}</span>
        </div>
      </div>
    </div>
  );
}

export default function Uses() {
  const [active, setActive] = useState(0);

  return (
    <section id="uses" className="relative overflow-hidden py-24 sm:py-32">
      <div className="section-dots" aria-hidden />
      <div className="glow glow-cobalt left-[-8%] top-[24%] h-[420px] w-[420px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow eyebrow-line">What we automate</span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.4rem)] text-white">
              <RevealText>The work you keep<br />doing by hand.</RevealText>
            </h2>
          </div>
          <p className="mono max-w-[26ch] text-[12px] text-grey">
            Hover a workflow to see the version that runs itself.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* list with left-to-right sweep */}
          <div className="flex flex-col">
            {USES.map((u, i) => (
              <button
                key={u.title}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-active={active === i}
                data-cursor="hover"
                className="sweep-row group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-6 text-left first:border-t"
              >
                <span
                  className="sweep-fill"
                  style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))" }}
                  aria-hidden
                />
                <span className="relative z-10 mono text-[12px] text-grey-3">0{i + 1}</span>
                <span className="relative z-10">
                  <span
                    className={`block font-display text-[clamp(1.5rem,3vw,2.3rem)] font-bold leading-tight transition-colors duration-300 ${
                      active === i ? "text-white" : "text-grey-2"
                    }`}
                  >
                    {u.title}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-grey">{u.manual}</span>
                </span>
                <span
                  className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border text-white transition-all duration-300 ${
                    active === i ? "translate-x-0 border-volt/50 bg-volt/10 opacity-100" : "-translate-x-2 border-white/15 opacity-0"
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            ))}
          </div>

          {/* preview */}
          <Reveal delay={1} className="lg:sticky lg:top-24">
            <div className="panel overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                {USES.map((u, i) => (
                  <div key={u.title} className={`absolute inset-0 transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}>
                    <Preview use={u} />
                  </div>
                ))}
              </div>
              <div className="border-t border-line p-5">
                <p className="text-[15px] leading-relaxed text-grey-2">{USES[active].outcome}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
