import Reveal from "./Reveal";
import RevealText from "./RevealText";

type Step = {
  no: string;
  title: string;
  body: string;
  meta: string;
};

const steps: Step[] = [
  {
    no: "01",
    title: "Map the manual work",
    body: "We sit with your real workflow and name every task a person is doing by hand: the chasing, the copy-paste, the late-night replies.",
    meta: "week 1 · discovery",
  },
  {
    no: "02",
    title: "Build the system",
    body: "Working software, not decks. Chatbots, automations, and dashboards wired straight into the tools you already run.",
    meta: "weeks 1 to 3 · build",
  },
  {
    no: "03",
    title: "Automate and measure",
    body: "It goes live and we watch the numbers: hours saved, leads captured, tickets closed without a person touching them.",
    meta: "ongoing · live",
  },
  {
    no: "04",
    title: "Hand it over",
    body: "Clear ownership and plain-language docs. No lock in, and no in-house engineering team required to keep it running.",
    meta: "handoff · yours to keep",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32">
      <div className="glow glow-cobalt right-[-10%] bottom-[10%] h-[420px] w-[420px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1160px] px-5 sm:px-6">
        <Reveal className="max-w-[52ch]">
          <span className="eyebrow eyebrow-line">How it works</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.4rem)] text-white">
            <RevealText>From manual to managed<br />in four moves.</RevealText>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[26px] border border-line bg-line sm:grid-cols-2">
          {steps.map((step, i) => (
            <Reveal
              key={step.no}
              delay={i % 2}
              className="group relative bg-bg p-8 transition-colors duration-500 hover:bg-panel sm:p-10"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold text-line-2 transition-all duration-500 group-hover:text-white">
                  {step.no}
                </span>
                <span className="mono text-[11px] text-grey-3">{step.meta}</span>
              </div>
              <h3 className="mt-5 text-[22px] font-semibold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-grey-2">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
