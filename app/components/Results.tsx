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
    title: "Execution first",
    body: "Every engagement ends in something live and measurable, never a deck.",
  },
  {
    title: "Practical AI",
    body: "AI where it earns its place, left out where it doesn't. No hype.",
  },
  {
    title: "Owned by you",
    body: "Docs a founder can read, no lock-in, no dev team required.",
  },
];

export default function Results() {
  return (
    <section id="results" className="relative overflow-hidden py-24 sm:py-32">
      <div data-parallax="0.18" className="glow glow-aqua right-[-8%] top-[10%] h-[380px] w-[380px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow eyebrow-line">Proof it works</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.4rem)] text-white">
            <RevealText>Numbers that show up<br />where it counts.</RevealText>
          </h2>
        </Reveal>

        {/* Headline metrics, one consistent format */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i} className="bg-bg p-8 sm:p-10">
              <div className="font-display text-[clamp(3rem,7vw,4.5rem)] font-extrabold leading-none text-white">
                <CountUp to={m.to} suffix={m.suffix} />
              </div>
              <p className="mt-4 max-w-[22ch] text-[15px] leading-relaxed text-grey-2">{m.label}</p>
            </Reveal>
          ))}
        </div>

        {/* Why it works */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i} className="rounded-[18px] border border-line bg-panel p-7">
              <div className="mb-4 h-1 w-9 rounded-full" style={{ background: "var(--grad-brand-soft)" }} />
              <h3 className="text-[18px] font-semibold tracking-tight text-white">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-grey">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
