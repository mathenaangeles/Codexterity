import Reveal from "./Reveal";
import RevealText from "./RevealText";
import CountUp from "./CountUp";

const metrics = [
  { to: 38, suffix: "%", label: "more qualified leads captured" },
  { to: 120, suffix: "+", label: "hours saved every month" },
  { to: 90, suffix: "%", label: "less manual data entry" },
];

const principles = [
  {
    title: "Production-Ready",
    body: "Every solution is engineered for real-world business use and delivered ready for deployment, so your team can start seeing value in weeks instead of months.",
  },
  {
    title: "Outcome-Driven",
    body: "Every recommendation is backed by a clear business case, focusing on measurable improvements in efficiency, productivity, cost savings, or customer experience.",
  },
  {
    title: "Fully Owned",
    body: "You own the code, workflows, and documentation, giving your team complete control today and the flexibility to grow tomorrow.",
  },
];

function CropMark({ pos }: { pos: string }) {
  const map: Record<string, string> = {
    tl: "left-2.5 top-2.5 border-l border-t",
    tr: "right-2.5 top-2.5 border-r border-t",
    bl: "left-2.5 bottom-2.5 border-l border-b",
    br: "right-2.5 bottom-2.5 border-r border-b",
  };
  return <span className={`pointer-events-none absolute z-[7] h-3.5 w-3.5 border-white/40 ${map[pos]}`} aria-hidden />;
}

export default function Results() {
  return (
    <section id="results" className="relative overflow-hidden py-24 sm:py-32">
      <div data-parallax="0.18" className="glow glow-aqua right-[-8%] top-[10%] h-[380px] w-[380px]" aria-hidden />
      <div data-parallax="-0.12" className="glow glow-indigo left-[-10%] bottom-[0%] h-[360px] w-[420px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow eyebrow-line">Proof it works</span>
          <h2 className="mt-5 max-w-[24ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.1] text-white">
            <RevealText>Every decision is driven by business impact.</RevealText>
          </h2>
        </Reveal>

        <Reveal delay={1} className="mt-14">
          <div className="paper-panel p-2.5 sm:p-3.5">
            <CropMark pos="tl" />
            <CropMark pos="tr" />
            <CropMark pos="bl" />
            <CropMark pos="br" />

            {/* margin frame */}
            <div className="relative z-[2] border border-white/12">
              {/* metrics */}
              <div className="grid gap-px bg-white/10 sm:grid-cols-3">
                {metrics.map((m, i) => (
                  <div key={m.label} data-spotlight className="xcell spotlight-card p-8 sm:p-9">
                    <div className="font-display text-[clamp(3rem,6.5vw,4.4rem)] font-extrabold leading-none">
                      <span className="text-gradient">
                        <CountUp to={m.to} suffix={m.suffix} />
                      </span>
                    </div>
                    <span
                      className="metric-bar mt-5 w-16"
                      style={{ transitionDelay: `${250 + i * 180}ms` }}
                      aria-hidden
                    />
                    <p className="mt-4 max-w-[22ch] text-[15px] leading-relaxed text-grey-2">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* principles */}
              <div className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-3">
                {principles.map((p, i) => (
                  <div key={p.title} data-spotlight className="xcell spotlight-card p-7 sm:p-8">
                    <div className="flex items-center gap-3">
                      <span className="mono text-[11px] text-grey-3">0{i + 1}</span>
                      <span className="h-px flex-1 bg-white/[0.08]" aria-hidden />
                    </div>
                    <h3 className="mt-4 text-[17px] font-semibold tracking-tight text-white">{p.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-grey">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
