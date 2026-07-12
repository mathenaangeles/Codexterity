import Reveal from "./Reveal";
import RevealText from "./RevealText";
import Button from "./Button";
import WaveField from "./WaveField";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-28 pt-40 sm:pt-48">
      <WaveField />
      <div className="section-grid section-grid-fade" aria-hidden />
      <div data-parallax="0.25" className="glow glow-cobalt left-[-6%] top-[6%] h-[440px] w-[560px]" aria-hidden />
      <div data-parallax="-0.18" className="glow glow-volt right-[4%] top-[46%] h-[300px] w-[300px]" aria-hidden />
      {/* readability scrim: keeps the headline (esp. the gradient word) legible over the dot field */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 58% 46% at 26% 40%, rgba(5,5,6,0.92) 0%, rgba(5,5,6,0.55) 48%, transparent 74%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-[900px]">
          <Reveal>
            <span className="eyebrow eyebrow-line">AI Consulting &amp; Automation</span>
          </Reveal>

          <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.5rem,5.6vw,4.7rem)] leading-[1.03] text-white">
            <RevealText>
              Future-proof your business with an{" "}
              <span className="text-gradient">AI workforce.</span>
            </RevealText>
          </h1>

          <Reveal delay={2} as="p" className="mt-8 max-w-[56ch] text-[18px] leading-relaxed text-grey-2 sm:text-[19px]">
            We build the systems, dashboards, and chatbots that save time, reduce errors, and
            improve profitability.
          </Reveal>

          <Reveal delay={3} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="#package" variant="primary">
              Build my package
            </Button>
            <Button href="#services" variant="ghost">
              See it in action
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
