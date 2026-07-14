import Image from "next/image";
import Button from "./Button";

const nav = [
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Results", href: "#results" },
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
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[34ch]">
            <Image src="/logo.png" alt="Codexterity" width={432} height={82} className="h-10 w-auto" />
            <p className="mt-5 text-[14px] leading-relaxed text-grey">
              Practical AI and real systems for small teams. We build the software
              that removes the work nobody should be doing twice.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3.5">
              <a
                href="mailto:codexterityai@gmail.com"
                className="mono text-[13px] text-grey-2 transition-colors hover:text-aqua"
              >
                codexterityai@gmail.com
              </a>
              <span className="h-3.5 w-px bg-white/15" aria-hidden />
              <span className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-grey-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-volt" />
                </span>
                Taking new projects
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="eyebrow mb-1">Navigate</span>
            {nav.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="w-fit text-[14px] text-grey-2 transition-colors hover:text-white"
              >
                <span className="roll">
                  <span className="roll-inner" data-text={item.name}>
                    {item.name}
                  </span>
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12">
          <Button href="#package">Start a project</Button>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-[13px] text-grey-3">© {new Date().getFullYear()} Codexterity</p>
        </div>
      </div>
    </footer>
  );
}
