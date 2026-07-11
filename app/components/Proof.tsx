import Reveal from "./Reveal";

// "It plugs into what you already use — no rip and replace."
const STACK = [
  "HubSpot", "Slack", "Notion", "Stripe", "Shopify", "Zapier", "Airtable",
  "Gmail", "QuickBooks", "Salesforce", "Calendly", "Webflow", "Twilio",
  "OpenAI", "Google Sheets", "Make", "Monday", "WhatsApp",
];

export default function Proof() {
  return (
    <section className="relative overflow-hidden border-y border-line py-14">
      <div className="mx-auto mb-8 flex max-w-[1160px] justify-center px-6">
        <Reveal as="p" className="eyebrow eyebrow-line">
          Plugs into what you already use. No rip and replace.
        </Reveal>
      </div>

      <div className="marquee-mask relative">
        <div className="marquee-track gap-3">
          {[...STACK, ...STACK].map((tool, i) => (
            <span
              key={i}
              className="mono whitespace-nowrap rounded-full border border-line bg-panel px-5 py-2.5 text-[13px] text-grey-2"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
