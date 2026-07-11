import Reveal from "./Reveal";
import RevealText from "./RevealText";
import HeroPanel from "./HeroPanel";
import Button from "./Button";
import Magnetic from "./Magnetic";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-36 sm:pt-40">
      <div className="section-grid section-grid-fade" aria-hidden />
      <div className="glow glow-cobalt left-[-6%] top-[6%] h-[440px] w-[560px]" aria-hidden />
      <div className="glow glow-volt right-[6%] top-[38%] h-[300px] w-[300px]" aria-hidden />

      <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-[620px]">
          <Reveal>
            <span className="eyebrow eyebrow-line">Automate the busywork</span>
          </Reveal>

          <h1 className="mt-6 font-display text-[clamp(2.7rem,6vw,4.9rem)] leading-[1.02] text-white">
            <RevealText>
              Your busywork,
              <br />
              running <span className="text-gradient">without you.</span>
            </RevealText>
          </h1>

          <Reveal delay={2} as="p" className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-grey-2 sm:text-[18px]">
            Codexterity turns scattered, manual business processes into clean digital systems
            your team can own. Chatbots, CRM, dashboards, and websites that run on their own.
          </Reveal>

          <Reveal delay={3} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <Button href="#package" variant="primary">
                Build my package
              </Button>
            </Magnetic>
            <Button href="#uses" variant="ghost">
              What we automate
            </Button>
          </Reveal>

          <Reveal delay={4} className="mt-10">
            <span className="mono text-[12px] text-grey">Live for teams from 2 to 200 people</span>
          </Reveal>
        </div>

        <Reveal delay={2} className="flex justify-center lg:justify-end">
          <HeroPanel />
        </Reveal>
      </div>
    </section>
  );
}
