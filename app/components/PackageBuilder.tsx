"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { BlueprintCorners } from "./Button";
import Icon from "./Icon";
import { SERVICES, BUDGETS, TIMELINES } from "../lib/data";
import { useInquiry } from "./InquiryContext";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Single "build your package" flow: pick services, budget, timeline, then add
 * your details and send. This replaces a separate contact form so the service
 * selector only exists once.
 */
export default function PackageBuilder() {
  const { services, budget, timeline, toggleService, setBudget, setTimeline } = useInquiry();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const selectedTitles = SERVICES.filter((s) => services.includes(s.id)).map((s) => s.title);

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
          <h2 className="mx-auto mt-5 max-w-[18ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] text-white">
            What do you need built?
          </h2>
          <p className="mx-auto mt-5 max-w-[44ch] text-[17px] leading-relaxed text-grey-2">
            Tap what&apos;s slowing you down, add one line, send. Scope back within a business day.
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-12">
          <form onSubmit={handleSubmit} className="panel p-6 sm:p-10" noValidate>
            {status === "success" ? (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-volt text-black">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-2xl text-white">Got it. Talk soon.</h3>
                <p className="mt-3 max-w-[40ch] text-[15px] text-grey-2">
                  Your package is in. We reply from hello@codexterity.ai, usually within a business day.
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-7">
                  Send another
                </button>
              </div>
            ) : (
              <>
                {/* 01 services */}
                <p className="eyebrow mb-4">01 · What do you need</p>
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
                </div>

                {/* 02 / 03 budget + timeline */}
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow mb-4">02 · Budget</p>
                    <div className="flex flex-wrap gap-2.5">
                      {BUDGETS.map((b) => (
                        <button key={b} type="button" className="chip" data-active={budget === b} aria-pressed={budget === b} onClick={() => setBudget(b)}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow mb-4">03 · Timeline</p>
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
                <div className="mt-9 border-t border-line pt-8">
                  <p className="eyebrow mb-4">04 · Your details</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="name" className="field" placeholder="Your name" autoComplete="name" aria-label="Name" />
                    <input name="email" type="email" className="field" placeholder="you@company.com" autoComplete="email" aria-label="Work email" />
                  </div>
                  <textarea
                    name="message"
                    rows={3}
                    className="field mt-4 resize-none"
                    placeholder="What's slowing you down? e.g. We answer the same 20 questions in the inbox every day."
                    aria-label="What's slowing you down"
                  />
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />
                </div>

                {error && (
                  <p className="mt-4 text-[14px] text-cobalt-2" role="alert">
                    {error}
                  </p>
                )}

                <div className="mt-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <p className="mono text-[13px] text-grey">
                    <span className="text-volt">{services.length}</span> selected
                    {budget ? ` · ${budget}` : ""}
                    {timeline ? ` · ${timeline}` : ""}
                  </p>
                  <button type="submit" disabled={status === "submitting"} className="cta cta-primary w-full justify-center disabled:opacity-70 sm:w-auto">
                    <BlueprintCorners />
                    <span>{status === "submitting" ? "Sending" : "Send my package"}</span>
                    <span className="cta-arrow" aria-hidden>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
