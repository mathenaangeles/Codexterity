"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { BlueprintCorners } from "./Button";
import Icon from "./Icon";
import { SERVICES, BUDGETS, TIMELINES } from "../lib/data";
import { useInquiry } from "./InquiryContext";

type Status = "idle" | "submitting" | "success" | "error";

function StepHeader({ n, title, hint }: { n: string; title: string; hint?: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <span className="mono flex h-6 w-6 shrink-0 translate-y-0.5 items-center justify-center rounded-[6px] border border-volt/40 bg-volt/[0.07] text-[11px] text-volt">
        {n}
      </span>
      <span className="text-[15px] font-semibold text-white">{title}</span>
      {hint && <span className="hidden text-[12px] text-grey-3 sm:inline">{hint}</span>}
    </div>
  );
}

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-4 w-4",
};

// Broader "kind of project" options offered only in the form (the six grid
// services are productised; these cover everything else people ask for).
const EXTRAS: { id: string; title: string; icon: React.ReactNode }[] = [
  {
    id: "software-development",
    title: "Software Development",
    icon: <svg {...svgProps}><path d="M9 7 5 12l4 5M15 7l4 5-4 5M13.5 5l-3 14" /></svg>,
  },
  {
    id: "ai-consulting",
    title: "AI Consulting & Strategy",
    icon: <svg {...svgProps}><path d="M6 4v16M6 5h11l-2.5 3.5L17 12H6" /></svg>,
  },
  {
    id: "system-integrations",
    title: "System Integrations",
    icon: <svg {...svgProps}><path d="M10.5 13.5 8.8 15.2a3.2 3.2 0 0 1-4.5-4.5L6 9M13.5 10.5l1.7-1.7a3.2 3.2 0 0 1 4.5 4.5L18 15M9.8 14.2l4.4-4.4" /></svg>,
  },
  {
    id: "other",
    title: "Others",
    icon: <svg {...svgProps} strokeWidth={2}><path d="M6 12h.01M12 12h.01M18 12h.01" /></svg>,
  },
];

/**
 * Single "build your package" flow: pick services, budget, timeline, then add
 * your details and send. This replaces a separate contact form so the service
 * selector only exists once.
 */
export default function PackageBuilder() {
  const { services, budget, timeline, toggleService, setBudget, setTimeline } = useInquiry();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const titleById: Record<string, string> = {};
  SERVICES.forEach((s) => (titleById[s.id] = s.title));
  EXTRAS.forEach((e) => (titleById[e.id] = e.title));
  const selectedTitles = services.map((id) => titleById[id]).filter(Boolean);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();

    if (!name || !email || !message) {
      setError("Add your name, email, and a line about what you need.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email doesn't look right. Mind checking it?");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company, services: selectedTitles, budget, timeline }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Email us directly.");
    }
  }

  return (
    <section id="package" className="relative overflow-hidden py-24 sm:py-32">
      <div className="section-dots" aria-hidden />
      <div data-parallax="0.16" className="glow glow-volt right-[-6%] top-[8%] h-[380px] w-[380px]" aria-hidden />
      <div data-parallax="-0.14" className="glow glow-indigo left-[-6%] bottom-[6%] h-[360px] w-[420px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1000px] px-5 sm:px-8">
        <Reveal className="flex flex-col items-center text-center">
          <span className="eyebrow eyebrow-line">Build your package</span>
          <h2 className="mx-auto mt-5 max-w-[18ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.1] text-white">
            What do you need built?
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-[17px] leading-relaxed text-grey-2">
            Tell us what you need and the problem you&apos;re solving. We&apos;ll send back a clear
            plan and a price within a few business days.
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-12">
          <form onSubmit={handleSubmit} className="panel p-5 sm:p-10" noValidate>
            <div className="relative">
            {status === "success" ? (
              <div className="flex flex-col items-center py-12 text-center sm:py-14">
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <span className="absolute inset-0 rounded-[20px] bg-volt/25 blur-xl" aria-hidden />
                  <span className="success-pop relative flex h-14 w-14 items-center justify-center rounded-[18px] bg-volt text-black shadow-[0_10px_30px_-10px_rgba(230,255,75,0.7)]">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                <span className="eyebrow mt-6">Request received</span>
                <h3 className="mt-3 font-display text-[clamp(1.7rem,3.6vw,2.4rem)] leading-[1.1] text-white">
                  Your build is in the queue.
                </h3>
                <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-grey-2">
                  Thanks for reaching out. We&apos;ll read your brief and come back with a commercial proposal, so you know exactly what you&apos;re getting before we start.
                </p>

                {/* what happens next */}
                <div className="mt-8 w-full max-w-[440px] divide-y divide-white/[0.07] overflow-hidden rounded-xl border border-white/10 bg-black/30 text-left">
                  {[
                    ["We review your requirements.", "Today"],
                    ["You receive a tailored proposal.", "1–2 business days"],
                    ["We kick off your project.", "When you’re ready"],
                  ].map(([label, meta], i) => (
                    <div key={label} className="flex items-center justify-between gap-3 px-4 py-3">
                      <span className="flex items-center gap-3">
                        <span className="mono flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-volt/40 text-[10px] text-volt">
                          {i + 1}
                        </span>
                        <span className="text-[13.5px] text-grey-2">{label}</span>
                      </span>
                      <span className="mono shrink-0 text-[11px] text-grey-3">{meta}</span>
                    </div>
                  ))}
                </div>

                <p className="mono mt-6 text-[12px] text-grey-3">
                  Watch for a reply from <span className="text-grey-2">codexterityai@gmail.com</span>.
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="cta cta-ghost mt-6">
                  <BlueprintCorners />
                  <span>Send another inquiry</span>
                  <span className="cta-arrow" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </div>
            ) : (
              <>
                {/* 01 services + broader project types */}
                <StepHeader n="01" title="What can we build for you?" />
                <div className="flex flex-wrap gap-2.5">
                  {SERVICES.map((s) => {
                    const active = services.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        className="chip"
                        data-active={active}
                        aria-pressed={active}
                        onClick={() => toggleService(s.id)}
                      >
                        <Icon name={s.icon} className="h-4 w-4" />
                        {s.title}
                        {active && (
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                  {EXTRAS.map((e) => {
                    const active = services.includes(e.id);
                    return (
                      <button
                        key={e.id}
                        type="button"
                        className="chip"
                        data-active={active}
                        aria-pressed={active}
                        onClick={() => toggleService(e.id)}
                      >
                        {e.icon}
                        {e.title}
                        {active && (
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 02 / 03 budget + timeline */}
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <StepHeader n="02" title="What's your budget?" />
                    <div className="flex flex-wrap gap-2.5">
                      {BUDGETS.map((b) => (
                        <button key={b} type="button" className="chip" data-active={budget === b} aria-pressed={budget === b} onClick={() => setBudget(b)}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <StepHeader n="03" title="What's your timeline?" />
                    <div className="flex flex-wrap gap-2.5">
                      {TIMELINES.map((t) => (
                        <button key={t} type="button" className="chip" data-active={timeline === t} aria-pressed={timeline === t} onClick={() => setTimeline(t)}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 04 details */}
                <div className="mt-9 border-t border-white/[0.08] pt-8">
                  <StepHeader n="04" title="How do we reach you?" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mono mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-grey-3">Name</span>
                      <input name="name" className="field" placeholder="Your name" autoComplete="name" />
                    </label>
                    <label className="block">
                      <span className="mono mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-grey-3">Email</span>
                      <input name="email" type="email" className="field" placeholder="you@company.com" autoComplete="email" />
                    </label>
                  </div>
                  <label className="mt-4 block">
                    <span className="mono mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-grey-3">
                      What&apos;s slowing you down?
                    </span>
                    <textarea
                      name="message"
                      rows={3}
                      className="field resize-none"
                      placeholder="e.g. We answer the same 20 questions in the inbox every day."
                    />
                  </label>
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />
                </div>

                {error && (
                  <p className="mt-4 text-[14px] text-cobalt-2" role="alert">
                    {error}
                  </p>
                )}

                {/* live receipt: the package assembling as you pick */}
                <div className="mt-8 flex flex-col gap-4 rounded-xl border border-white/10 bg-black/30 p-4 sm:flex-row sm:items-center sm:justify-between sm:pl-5">
                  <p className="mono min-w-0 text-[12.5px] leading-relaxed text-grey">
                    <span className="text-grey-3">Your Package: </span>
                    {selectedTitles.length > 0 ? (
                      <span className="text-volt">{selectedTitles.join(" + ")}</span>
                    ) : (
                      <span>Pick what you need above and it&apos;ll build here.</span>
                    )}
                    {budget && <span className="text-grey-2"> · {budget}</span>}
                    {timeline && <span className="text-grey-2"> · {timeline}</span>}
                  </p>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    aria-busy={status === "submitting"}
                    className="cta cta-primary w-full shrink-0 justify-center sm:w-auto"
                  >
                    <BlueprintCorners />
                    <span>{status === "submitting" ? "Sending…" : "Send my package"}</span>
                    <span className="cta-arrow" aria-hidden>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              </>
            )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
