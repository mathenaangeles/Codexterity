// Hero visual: a live control panel where manual tasks flip to automated in a
// staggered loop. Reads instantly as "the work you do by hand, now running
// itself." Pure CSS animation (paused by prefers-reduced-motion globally).
const ROWS = [
  { task: "New lead follow-up", delay: "0s" },
  { task: "Invoice + payment reminder", delay: "1.4s" },
  { task: "Support reply", delay: "2.8s" },
  { task: "Weekly report", delay: "4.2s" },
];

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HeroPanel() {
  return (
    <div className="relative w-full max-w-[500px]">
      <div className="glow glow-aqua absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2" />
      <div className="panel relative overflow-hidden p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
        {/* header */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="mono text-[12px] tracking-wider text-grey-2">automations</span>
          <span className="badge !py-1 !text-[11px]">
            <span className="dot bg-aqua animate-pulse" />
            live
          </span>
        </div>

        <div className="rounded-[16px] border border-line bg-black/40 p-2">
          {ROWS.map((row) => (
            <div
              key={row.task}
              className="hp-row relative flex items-center justify-between overflow-hidden rounded-xl px-4 py-3.5"
              style={{ ["--d" as string]: row.delay }}
            >
              {/* sweep bar */}
              <span
                className="hp-sweep absolute inset-y-0 left-0 w-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(230,255,75,0.16), transparent)" }}
                aria-hidden
              />
              <span className="relative z-10 flex items-center gap-3">
                <span className="hp-dot h-2 w-2 rounded-full" style={{ background: "var(--color-grey-3)" }} />
                <span className="text-[14px] font-medium text-white">{row.task}</span>
              </span>
              <span className="relative z-10 grid text-[12px]">
                <span className="hp-manual col-start-1 row-start-1 mono justify-self-end text-grey-3">manual</span>
                <span className="hp-auto col-start-1 row-start-1 flex items-center gap-1.5 justify-self-end font-semibold text-volt">
                  <Check />
                  automated
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* footer stat */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="mono text-[11px] text-grey-3">4 workflows running</span>
          <span className="mono text-[11px] text-grey-3">
            saved <span className="text-white">120h</span> / mo
          </span>
        </div>
      </div>
    </div>
  );
}
