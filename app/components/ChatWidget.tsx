"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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

/** The standalone brand mark: the actual X cropped from the wordmark. */
function XMark({ size = 16 }: { size?: number }) {
  return (
    <Image
      src="/x-mark.png"
      alt=""
      aria-hidden
      width={166}
      height={196}
      className="w-auto"
      style={{ height: size }}
    />
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", lines: [CHAT_INTRO] }]);
  const [options, setOptions] = useState<ChatOption[]>(CHAT_ROOT_OPTIONS);
  const [atRoot, setAtRoot] = useState(true);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Deep-link: /#ask opens the chat (handy for "questions?" links).
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (window.location.hash === "#ask") setOpen(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const reset = () => {
    setMessages([{ from: "bot", lines: [CHAT_INTRO] }]);
    setOptions(CHAT_ROOT_OPTIONS);
    setAtRoot(true);
    setTyping(false);
  };

  const pick = (opt: ChatOption) => {
    if (opt.href) {
      setOpen(false);
      document.querySelector(opt.href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!opt.to || typing) return;
    const node = CHAT_NODES[opt.to];
    setMessages((m) => [...m, { from: "user", lines: [opt.label] }]);
    setOptions([]);
    setAtRoot(false);
    setTyping(true);
    // a believable typing beat before the scripted answer
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", lines: node.answer }]);
      setOptions(node.options);
    }, 700);
  };

  return (
    <>
      {/* persistent launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        data-open={open}
        className="chat-launcher group fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 rounded-full border border-volt/40 bg-[#0b0b0d]/90 py-2.5 pl-3.5 pr-4.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-volt/70 hover:shadow-[0_0_32px_-8px_rgba(230,255,75,0.45)] sm:bottom-6 sm:right-6"
        style={{ boxShadow: "0 12px 40px -12px rgba(0,0,0,0.75)" }}
      >
        <span className="relative flex items-center justify-center">
          <XMark size={16} />
          {/* volt sparks emitting from the mark on hover */}
          <span className="chat-orbit" aria-hidden>
            <span style={{ ["--ex" as string]: "-20px", ["--ey" as string]: "-14px", ["--ed" as string]: "0s" }} />
            <span style={{ ["--ex" as string]: "18px", ["--ey" as string]: "-18px", ["--ed" as string]: "0.25s" }} />
            <span style={{ ["--ex" as string]: "-16px", ["--ey" as string]: "14px", ["--ed" as string]: "0.5s" }} />
            <span style={{ ["--ex" as string]: "22px", ["--ey" as string]: "10px", ["--ed" as string]: "0.75s" }} />
            <span style={{ ["--ex" as string]: "0px", ["--ey" as string]: "-22px", ["--ed" as string]: "1s" }} />
            <span style={{ ["--ex" as string]: "6px", ["--ey" as string]: "20px", ["--ed" as string]: "1.2s" }} />
          </span>
        </span>
        <span className="mono text-[12px] font-medium text-white">{open ? "Close" : "Ask us anything"}</span>
      </button>

      {/* panel */}
      <div
        className={`fixed bottom-20 right-4 z-[60] w-[min(400px,calc(100vw-2rem))] origin-bottom-right transition-all duration-300 ease-[cubic-bezier(0.16,0.84,0.28,1)] sm:bottom-[5.5rem] sm:right-6 ${
          open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-[0.96] opacity-0"
        }`}
        role="dialog"
        aria-label="Codexterity live session"
      >
        <div
          className="flex max-h-[70vh] flex-col overflow-hidden rounded-[18px] border border-volt/35 bg-[#0b0b0d]/95 backdrop-blur-xl"
          style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.85)" }}
        >
          {/* header */}
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="mono flex items-center gap-2.5 text-[12px] tracking-[0.14em] text-volt">
              <XMark size={13} />
              CODEXTERITY LIVE SESSION
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-grey-2 transition-colors hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* messages */}
          <div ref={scrollRef} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] space-y-2 rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                    m.from === "user"
                      ? "rounded-br-md bg-volt font-medium text-[#0a0a08]"
                      : "rounded-bl-md bg-white/[0.05] text-grey-2"
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
            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white/[0.05] px-4 py-3.5 text-volt">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
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
            {!atRoot && !typing && (
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
