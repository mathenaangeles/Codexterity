"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import RevealText from "./RevealText";
import Button from "./Button";
import { SERVICES } from "../lib/data";
import {
  Frame,
  AgentVignette,
  WorkflowVignette,
  SupportVignette,
  WebVignette,
  LeadsVignette,
  AnalyticsVignette,
} from "./vignettes";

/**
 * "What we build" — the single services section. Each of the six services is
 * a selectable row (click floods it volt, cloudstudio-style) and drives the
 * sticky demo panel: a looping mini-app that shows the actual deliverable.
 */

const DEMOS: Record<string, { hook: string; outcome: string; accent: string; vignette: React.ReactNode }> = {
  "ai-agents": {
    hook: "Your busywork gets done while you sleep.",
    outcome: "An agent reads, decides, and acts across your tools, so the queue is already clear before you sit down.",
    accent: "rgba(230,255,75,0.26)",
    vignette: <AgentVignette />,
  },
  "workflow-automation": {
    hook: "Your tools finally talk to each other.",
    outcome: "One trigger runs the whole chain: the order comes in, the invoice goes out, the team is notified, and the sheet updates itself.",
    accent: "rgba(111,121,255,0.34)",
    vignette: <WorkflowVignette />,
  },
  "chatbots-voice": {
    hook: "Every question gets answered in seconds.",
    outcome: "A trained assistant answers instantly on your site, WhatsApp, or phone, day and night, and escalates only the tricky ones.",
    accent: "rgba(230,255,75,0.22)",
    vignette: <SupportVignette />,
  },
  "web-development": {
    hook: "Your website sells while you work.",
    outcome: "It loads fast, ranks on Google, and turns visitors into booked calls instead of just traffic.",
    accent: "rgba(55,217,212,0.28)",
    vignette: <WebVignette />,
  },
  "crm-sales": {
    hook: "No lead goes cold again.",
    outcome: "Every inquiry gets an instant reply, a score, and a booked call before your competitors open the email.",
    accent: "rgba(111,121,255,0.3)",
    vignette: <LeadsVignette />,
  },
  "dashboards-bi": {
    hook: "Every number that matters lives on one screen.",
    outcome: "You get a live dashboard you can question in plain English, and the Monday report writes itself.",
    accent: "rgba(55,217,212,0.3)",
    vignette: <AnalyticsVignette />,
  },
};

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32">
      {/* #uses kept as an anchor alias for old links */}
      <span id="uses" className="absolute -top-24" aria-hidden />
      <div data-parallax="0.2" className="glow glow-cobalt left-[-10%] top-[20%] h-[440px] w-[440px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow eyebrow-line">What we build</span>
          <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] text-white">
            <RevealText>6 ways to get your time back.</RevealText>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* service rows: the ACTIVE one floods volt */}
          <div className="flex flex-col">
            {SERVICES.map((s, i) => {
              const demo = DEMOS[s.id];
              const on = active === i;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  data-active={on}
                  data-cursor="hover"
                  aria-pressed={on}
                  className="sweep-row group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line px-4 py-[1.35rem] text-left first:border-t sm:px-5"
                >
                  <span className="sweep-fill" aria-hidden />
                  <span className={`relative z-10 text-[12px] font-semibold transition-colors duration-300 ${on ? "text-[#0a0a08]/60" : "text-grey-3"}`}>
                    0{i + 1}
                  </span>
                  <span className="relative z-10">
                    <span
                      className={`block font-display text-[clamp(1.3rem,2.3vw,1.9rem)] font-bold leading-tight transition-colors duration-300 ${
                        on ? "text-[#0a0a08]" : "text-grey-2 group-hover:text-white"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className={`mt-0.5 block text-[13px] transition-colors duration-300 ${on ? "text-[#0a0a08]/70" : "text-grey"}`}>
                      {demo.hook}
                    </span>
                  </span>
                  <span
                    className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                      on ? "translate-x-0 border-[#0a0a08]/40 text-[#0a0a08] opacity-100" : "-translate-x-2 border-white/15 text-white opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>

          {/* live demo panel */}
          <Reveal delay={1} className="lg:sticky lg:top-24 lg:self-start">
            <div className="panel overflow-hidden">
              <div className="relative aspect-[4/3] max-h-[440px] w-full">
                {SERVICES.map((s, i) => {
                  const demo = DEMOS[s.id];
                  return (
                    <div
                      key={s.id}
                      className={`absolute inset-0 transition-opacity duration-300 ${active === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
                      aria-hidden={active !== i}
                    >
                      <Frame label={s.title} accent={demo.accent}>
                        {demo.vignette}
                      </Frame>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-line p-5">
                <p className="text-[15px] leading-relaxed text-grey-2">{DEMOS[SERVICES[active].id].outcome}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* catch-all CTA */}
        <Reveal delay={1} className="relative mt-6 overflow-hidden rounded-[22px] border border-line bg-panel">
          <span className="section-dots opacity-60" aria-hidden />
          <div className="relative z-10 flex flex-col justify-between gap-6 p-7 sm:flex-row sm:items-center sm:p-8">
            <div>
              <span className="eyebrow text-volt">Something else?</span>
              <h3 className="mt-3 max-w-[28ch] font-display text-[clamp(1.4rem,2.4vw,2rem)] text-white">
                If you do it more than twice a week, it can probably run itself.
              </h3>
            </div>
            <Button href="#package" variant="primary" className="w-fit shrink-0">
              Build a package
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
