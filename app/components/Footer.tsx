import Image from "next/image";
import Magnetic from "./Magnetic";
import Button from "./Button";

const nav = [
  { name: "Services", href: "#services" },
  { name: "Use cases", href: "#uses" },
  { name: "Process", href: "#process" },
  { name: "Results", href: "#results" },
  { name: "Build a package", href: "#package" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20 pb-14">
      {/* frog-style ambient corner gradient bleeding up from the bottom-left */}
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 h-[560px] w-[720px]"
        style={{
          background:
            "radial-gradient(circle at 30% 70%, rgba(109,75,255,0.35) 0%, rgba(75,88,255,0.18) 34%, transparent 68%)",
          filter: "blur(20px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-52 right-[-6%] h-[420px] w-[420px]"
        style={{
          background: "radial-gradient(circle, rgba(55,217,212,0.14) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* Big CTA line */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-16 md:flex-row md:items-end">
          <h2 className="max-w-[15ch] font-display text-[clamp(2.2rem,5vw,4rem)] text-white">
            Ready to stop doing it{" "}
            <span className="text-gradient">by hand?</span>
          </h2>
          <Magnetic className="shrink-0">
            <Button href="#package" variant="primary">
              Start a project
            </Button>
          </Magnetic>
        </div>

        <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[34ch]">
            <Image src="/logo.png" alt="Codexterity" width={448} height={98} className="h-7 w-auto" />
            <p className="mt-5 text-[14px] leading-relaxed text-grey">
              Practical AI and real systems for small teams. Not abstract hype, just software
              that removes the work nobody should be doing twice.
            </p>
            <a
              href="mailto:hello@codexterity.ai"
              className="mono mt-4 inline-block text-[13px] text-grey-2 transition-colors hover:text-aqua"
            >
              hello@codexterity.ai
            </a>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="eyebrow mb-1">Navigate</span>
            {nav.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[14px] text-grey-2 transition-colors hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="mono text-[12px] text-grey-3">
            © {new Date().getFullYear()} Codexterity · AI &amp; Automation Consultancy
          </p>
          <p className="mono text-[12px] text-grey-3">
            status <span className="text-aqua">active</span> · uptime 99.98%
          </p>
        </div>
      </div>
    </footer>
  );
}
