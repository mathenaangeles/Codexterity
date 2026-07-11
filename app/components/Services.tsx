import Reveal from "./Reveal";
import RevealText from "./RevealText";
import Icon from "./Icon";
import Button from "./Button";
import { SERVICES } from "../lib/data";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32">
      <div className="section-grid section-grid-fade" aria-hidden />
      <div className="glow glow-cobalt left-[-10%] top-[20%] h-[440px] w-[440px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1160px] px-5 sm:px-6">
        <Reveal className="max-w-[52ch]">
          <span className="eyebrow eyebrow-line">What we build</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.4rem)] text-white">
            <RevealText>Ten ways to get your<br />time back.</RevealText>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-grey-2">
            Pick a single fix or a full system. We handle the automation, the data, and the
            build, then hand you something you can run without us.
          </p>
        </Reveal>

        {/* Boxy grid — quiet until touched */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[26px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.id}
              delay={i % 3}
              className="group relative bg-bg p-7 transition-colors duration-500 hover:bg-panel"
            >
              {/* hover accent line */}
              <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-aqua to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel-2 text-white transition-all duration-500 group-hover:border-aqua/40 group-hover:text-aqua group-hover:shadow-[0_0_28px_-8px_rgba(55,217,212,0.6)]">
                  <Icon name={service.icon} className="h-[22px] w-[22px]" />
                </div>
                <span className="mono text-[11px] text-grey-3">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-grey">{service.blurb}</p>
            </Reveal>
          ))}

          {/* CTA cell fills the remaining grid track */}
          <Reveal
            delay={1}
            className="group relative flex flex-col justify-between bg-panel p-7 sm:col-span-2 lg:col-span-2"
          >
            <span className="section-dots opacity-60" aria-hidden />
            <div className="relative z-10">
              <span className="eyebrow text-volt">Something else?</span>
              <h3 className="mt-4 max-w-[24ch] font-display text-[clamp(1.4rem,2.4vw,2rem)] text-white">
                Not sure what you need? That&apos;s the normal way to start.
              </h3>
              <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-grey">
                Tell us the task that keeps landing on your plate. We&apos;ll tell you whether it&apos;s
                worth automating, and exactly how.
              </p>
            </div>
            <Button href="#package" variant="primary" className="relative z-10 mt-6 w-fit">
              Build a package
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
