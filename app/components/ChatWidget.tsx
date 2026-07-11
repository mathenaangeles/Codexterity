"use client";

import { useEffect, useRef, useState } from "react";
import { CHAT_INTRO, CHAT_ROOT_OPTIONS, CHAT_NODES, type ChatOption } from "../lib/chat";

type Msg = { from: "bot" | "user"; lines: string[] };

// Render **bold** inside a scripted line.
function Line({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold text-white">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", lines: [CHAT_INTRO] }]);
  const [options, setOptions] = useState<ChatOption[]>(CHAT_ROOT_OPTIONS);
  const [atRoot, setAtRoot] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Deep-link: /#ask opens the chat (handy for "questions?" links).
  useEffect(() => {
    if (window.location.hash === "#ask") setOpen(true);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const reset = () => {
    setMessages([{ from: "bot", lines: [CHAT_INTRO] }]);
    setOptions(CHAT_ROOT_OPTIONS);
    setAtRoot(true);
  };

  const pick = (opt: ChatOption) => {
    if (opt.href) {
      setOpen(false);
      document.querySelector(opt.href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!opt.to) return;
    const node = CHAT_NODES[opt.to];
    setMessages((m) => [...m, { from: "user", lines: [opt.label] }]);
    setAtRoot(false);
    // brief "typing" beat before the scripted answer
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", lines: node.answer }]);
      setOptions(node.options);
    }, 320);
  };

  return (
    <>
      {/* persistent launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 rounded-full border border-volt/40 bg-[#0b0b0d]/85 py-2.5 pl-3 pr-4 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
        style={{ boxShadow: "0 12px 40px -12px rgba(0,0,0,0.7)" }}
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-volt opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-volt" />
        </span>
        <span className="mono text-[12px] font-medium text-white">{open ? "Close" : "Ask me anything"}</span>
      </button>

      {/* panel */}
      <div
        className={`fixed bottom-20 right-4 z-[60] w-[min(400px,calc(100vw-2rem))] origin-bottom-right transition-all duration-300 sm:bottom-24 sm:right-6 ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="panel flex max-h-[70vh] flex-col overflow-hidden" style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.8)" }}>
          {/* header */}
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="mono flex items-center gap-2 text-[12px] tracking-wider text-volt">
              <span className="h-1.5 w-1.5 rounded-full bg-volt" />
              CODEXTERITY · LIVE SESSION
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="text-grey-2 transition-colors hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] space-y-2 rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                    m.from === "user" ? "bg-volt font-medium text-[#0a0a08]" : "bg-white/[0.04] text-grey-2"
                  }`}
                >
                  {m.lines.map((l, j) => (
                    <p key={j}>
                      <Line text={l} />
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* options */}
          <div className="flex flex-wrap gap-2 border-t border-line p-3">
            {options.map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => pick(o)}
                className="mono rounded-full border border-line bg-white/[0.02] px-3.5 py-2 text-[12px] text-grey-2 transition-colors hover:border-volt/50 hover:text-white"
              >
                {o.label}
              </button>
            ))}
            {!atRoot && (
              <button
                type="button"
                onClick={reset}
                className="mono rounded-full px-3 py-2 text-[12px] text-grey-3 transition-colors hover:text-grey-2"
              >
                ← All questions
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
