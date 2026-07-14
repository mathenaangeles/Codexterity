import Reveal from "./Reveal";
import RevealText from "./RevealText";

type Step = {
  no: string;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    no: "01",
    title: "Discover the opportunity",
    body: "We learn how your business works today, identify repetitive processes, and uncover the opportunities where we can create the greatest impact.",
  },
  {
    no: "02",
    title: "Build the system",
    body: "We design, develop, and integrate a custom solution that fits seamlessly into the software and workflows you already use.",
  },
  {
    no: "03",
    title: "Launch and optimize",
    body: "Once your solution is live, we monitor performance, measure business outcomes, and refine it based on the results.",
  },
  {
    no: "04",
    title: "Hand it over",
    body: "You receive complete documentation and take full ownership of the solution, giving your team the confidence to manage it independently.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32">
      <div data-parallax="0.2" className="glow glow-cobalt right-[-10%] bottom-[10%] h-[420px] w-[420px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1160px] px-5 sm:px-6">
        <Reveal>
          <span className="eyebrow eyebrow-line">How it works</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.1] text-white">
            <RevealText>Move from manual to managed<br />in four moves.</RevealText>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[26px] border border-line bg-line sm:grid-cols-2">
          {steps.map((step, i) => (
            <Reveal
              key={step.no}
              delay={i % 2}
              className="group relative bg-bg p-8 transition-colors duration-500 hover:bg-panel sm:p-10"
            >
              {/* gradient hairline sweeps in on hover */}
              <span
                className="absolute inset-x-0 top-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: "var(--grad-brand-soft)" }}
                aria-hidden
              />
              <span className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold text-line-2 transition-all duration-500 group-hover:text-white">
                {step.no}
              </span>
              <div className="mt-5 h-1 w-9 rounded-full opacity-80" style={{ background: "var(--grad-brand-soft)" }} aria-hidden />
              <h3 className="mt-4 text-[22px] font-semibold tracking-tight text-white">
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
