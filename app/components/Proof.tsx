import Reveal from "./Reveal";
import RevealText from "./RevealText";
import {
  siHubspot,
  siNotion,
  siStripe,
  siShopify,
  siZapier,
  siAirtable,
  siGmail,
  siQuickbooks,
  siCalendly,
  siWebflow,
  siGooglesheets,
  siMake,
  siWhatsapp,
  siZendesk,
  siMailchimp,
} from "simple-icons";

/**
 * Integration grid on a "cut out" blueprint sheet (hex.tech style): a grained
 * paper panel with a margin frame, corner crop-marks, and "+" crosshairs at
 * every grid intersection. Cells rest as light grey and flood cobalt / aqua on
 * hover. Tool names stay in the DOM (aria-label / title) for search.
 */
const TOOLS = [
  siHubspot,
  siStripe,
  siShopify,
  siGmail,
  siWhatsapp,
  siNotion,
  siAirtable,
  siGooglesheets,
  siQuickbooks,
  siCalendly,
  siZapier,
  siMake,
  siWebflow,
  siZendesk,
  siMailchimp,
];

// alternate the hover accent so the grid feels alive: a faint tint floods the
// cell and the logo takes the accent — volt and aqua, the site's own two accents
function hoverVars(i: number) {
  return i % 2 === 0
    ? { ["--hc" as string]: "rgba(230,255,75,0.09)", ["--lc" as string]: "#e6ff4b" }
    : { ["--hc" as string]: "rgba(55,217,212,0.1)", ["--lc" as string]: "#37d9d4" };
}

function CropMark({ pos }: { pos: string }) {
  const map: Record<string, string> = {
    tl: "left-2.5 top-2.5 border-l border-t",
    tr: "right-2.5 top-2.5 border-r border-t",
    bl: "left-2.5 bottom-2.5 border-l border-b",
    br: "right-2.5 bottom-2.5 border-r border-b",
  };
  return <span className={`pointer-events-none absolute z-[7] h-3.5 w-3.5 border-white/40 ${map[pos]}`} aria-hidden />;
}

export default function Proof() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="section-grid section-grid-fade" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1160px] px-5 sm:px-6">
        <Reveal className="max-w-[60ch]">
          <span className="eyebrow eyebrow-line">Built on your stack</span>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] text-white">
            <RevealText>We integrate with the tools you already use.</RevealText>
          </h2>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-grey-2">
            We transform your existing CRM, ERP, databases, APIs, and business software into one
            AI-powered operating system that runs itself.
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-12">
          <div className="paper-panel p-2.5 sm:p-3.5">
            <CropMark pos="tl" />
            <CropMark pos="tr" />
            <CropMark pos="bl" />
            <CropMark pos="br" />

            {/* margin frame */}
            <div className="relative z-[2] border border-white/12">
              <div className="grid grid-cols-3 gap-px bg-white/10 sm:grid-cols-5">
                {TOOLS.map((tool, i) => (
                  <div
                    key={tool.title}
                    className="tool-cell group relative flex aspect-[4/3] items-center justify-center sm:aspect-[16/9]"
                    style={hoverVars(i)}
                    title={tool.title}
                  >
                    {/* icon + label stay centered as one group; the label
                       expands on hover so the icon never hits the top edge.
                       z-[8] keeps them ABOVE the grain plies (z-6): iOS Safari
                       can fail mix-blend-mode and paint the grain as opaque
                       fog, which was hiding the logos on phones. */}
                    <span className="relative z-[8] flex flex-col items-center gap-2">
                      <svg viewBox="0 0 24 24" role="img" aria-label={tool.title} className="h-6 w-6 sm:h-7 sm:w-7">
                        <path d={tool.path} />
                      </svg>
                      <span className="tool-name pointer-events-none text-center text-[10px] font-medium leading-none tracking-wide sm:text-[10.5px]">
                        {tool.title}
                      </span>
                    </span>
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
