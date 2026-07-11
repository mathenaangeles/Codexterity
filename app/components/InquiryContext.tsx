"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Budget, Timeline } from "../lib/data";

type InquiryState = {
  services: string[];
  budget: Budget | null;
  timeline: Timeline | null;
  toggleService: (id: string) => void;
  setBudget: (b: Budget) => void;
  setTimeline: (t: Timeline) => void;
};

const InquiryCtx = createContext<InquiryState | null>(null);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [timeline, setTimeline] = useState<Timeline | null>(null);

  const value = useMemo<InquiryState>(
    () => ({
      services,
      budget,
      timeline,
      toggleService: (id) =>
        setServices((prev) =>
          prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
        ),
      setBudget,
      setTimeline,
    }),
    [services, budget, timeline],
  );

  return <InquiryCtx.Provider value={value}>{children}</InquiryCtx.Provider>;
}

export function useInquiry(): InquiryState {
  const ctx = useContext(InquiryCtx);
  if (!ctx) throw new Error("useInquiry must be used within InquiryProvider");
  return ctx;
}
