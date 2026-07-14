import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE_URL, SITE_HOST } from "../../lib/site";

// nodemailer needs the Node runtime (not edge). Vercel Hobby runs this for free.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InquiryBody = {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot — real users leave this blank
  services?: string[];
  budget?: string | null;
  timeline?: string | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  let body: InquiryBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim().slice(0, 120);
  const email = (body.email ?? "").toString().trim().slice(0, 200);
  const message = (body.message ?? "").toString().trim().slice(0, 4000);
  const services = Array.isArray(body.services) ? body.services.slice(0, 20) : [];
  const budget = (body.budget ?? "").toString().slice(0, 40);
  const timeline = (body.timeline ?? "").toString().slice(0, 40);

  // Honeypot: silently accept bots so they think it worked.
  if (body.company && body.company.toString().trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and a message are required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const to = process.env.INQUIRY_TO ?? "codexterityai@gmail.com";
  const subjectBits = [name, services.length ? services.join(", ") : "General inquiry"];
  const subject = `Inquiry | ${subjectBits.join(" | ")}`;

  const textLines = [
    `Name:      ${name}`,
    `Email:     ${email}`,
    `Services:  ${services.length ? services.join(", ") : "—"}`,
    `Budget:    ${budget || "—"}`,
    `Timeline:  ${timeline || "—"}`,
    "",
    "Message:",
    message,
  ];
  const text = textLines.join("\n");

  /* ------------------------------------------------------------------------
     Branded email: the site's design system translated to bulletproof,
     table-based, inline-styled HTML. Real logo + X mark from the live site
     (email clients need absolute URLs — SITE_URL comes from app/lib/site.ts),
     site fonts via @import where supported (Apple Mail/iOS; Gmail falls back
     to the system stack), volt/mint/aqua/cobalt gradient rail, mono eyebrows,
     and the divided-arrow blueprint CTA.
     ------------------------------------------------------------------------ */
  const SITE = SITE_URL;
  const MONO = "'JetBrains Mono','SF Mono',Menlo,Consolas,'Courier New',monospace";
  const SANS = "'Inter',-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
  const DISPLAY = "'Sora','Inter',-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

  const eyebrow = (t: string, color = "#37d9d4") =>
    `<div style="font-family:${MONO};color:${color};font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;">${t}</div>`;

  const chip = (t: string) =>
    `<span style="display:inline-block;background:rgba(230,255,75,0.10);border:1px solid rgba(230,255,75,0.4);color:#e6ff4b;font-family:${SANS};font-size:12.5px;font-weight:600;padding:6px 12px;border-radius:999px;margin:0 6px 8px 0;">${esc(t)}</span>`;
  const na = `<span style="color:#5c5c62;font-size:13px;">Not specified</span>`;

  // budget / timeline as side-by-side stat cells (the form's receipt language)
  const stat = (label: string, value: string) =>
    `<td width="50%" style="padding:14px 16px;background:#101013;border:1px solid #242429;border-radius:12px;">
       <div style="font-family:${MONO};color:#86868b;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;">${label}</div>
       <div style="margin-top:6px;color:#ffffff;font-family:${SANS};font-size:16px;font-weight:700;letter-spacing:-0.01em;">${value}</div>
     </td>`;

  const html = `
  <div style="margin:0;padding:0;background:#050506;">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    </style>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#050506" style="background:#050506;">
      <tr><td align="center" style="padding:36px 12px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;font-family:${SANS};">

          <!-- header: real wordmark + status pill -->
          <tr><td style="padding:0 6px 18px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
              <td align="left" style="vertical-align:middle;">
                <a href="${SITE}" style="text-decoration:none;">
                  <img src="${SITE}/logo.png" alt="Codexterity" width="150" style="display:block;border:0;width:150px;height:auto;color:#ffffff;font-family:${DISPLAY};font-size:18px;font-weight:800;" />
                </a>
              </td>
              <td align="right" style="vertical-align:middle;">
                <span style="font-family:${MONO};color:#e6ff4b;border:1px solid rgba(230,255,75,0.4);background:rgba(230,255,75,0.08);font-size:10.5px;letter-spacing:0.14em;padding:6px 12px;border-radius:999px;">&#9679;&nbsp; NEW INQUIRY</span>
              </td>
            </tr></table>
          </td></tr>

          <!-- card -->
          <tr><td>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#0b0b0d" style="background:#0b0b0d;border:1px solid #242429;border-radius:18px;overflow:hidden;">

              <!-- brand gradient rail: volt -> mint -> aqua -> cobalt -->
              <tr><td bgcolor="#e6ff4b" style="height:3px;font-size:0;line-height:0;background:linear-gradient(90deg,#e6ff4b 0%,#7cf3b0 34%,#37d9d4 66%,#4b58ff 100%);">&nbsp;</td></tr>

              <!-- hero -->
              <tr><td style="padding:30px 32px 6px;">
                ${eyebrow(`Package request &middot; <a href="${SITE}" style="color:#37d9d4;text-decoration:none;">the package builder</a>`)}
                <div style="margin-top:12px;color:#ffffff;font-family:${DISPLAY};font-size:24px;font-weight:800;letter-spacing:-0.03em;line-height:1.22;">
                  <span style="color:#e6ff4b;">${esc(name)}</span> wants to build something.
                </div>
                <div style="margin-top:8px;font-size:14px;color:#a6a6ac;">
                  Reply to <a href="mailto:${esc(email)}" style="color:#37d9d4;text-decoration:none;">${esc(email)}</a>
                </div>
              </td></tr>

              <!-- budget / timeline stat cells -->
              <tr><td style="padding:22px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:8px 0;margin:0 -8px;">
                  <tr>
                    ${stat("Budget", esc(budget) || na)}
                    ${stat("Timeline", esc(timeline) || na)}
                  </tr>
                </table>
              </td></tr>

              <!-- services -->
              <tr><td style="padding:24px 32px 0;">
                ${eyebrow("The package", "#86868b")}
                <div style="margin-top:12px;">${services.length ? services.map(chip).join("") : na}</div>
              </td></tr>

              <!-- message: chat-bubble language from the site -->
              <tr><td style="padding:20px 32px 0;">
                ${eyebrow("What's slowing them down", "#86868b")}
                <div style="margin-top:12px;background:#101013;border:1px solid #242429;border-left:3px solid #e6ff4b;border-radius:4px 14px 14px 4px;padding:16px 18px;color:#d0d0d4;font-size:14.5px;line-height:1.65;white-space:pre-wrap;">${esc(message)}</div>
              </td></tr>

              <!-- CTA: the site's blueprint button — label cell + divided arrow cell -->
              <tr><td style="padding:26px 32px 30px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
                  <tr>
                    <td bgcolor="#e6ff4b" style="background:#e6ff4b;border-radius:12px 0 0 12px;">
                      <a href="mailto:${esc(email)}" style="display:inline-block;color:#0a0a08;font-family:${SANS};font-size:14.5px;font-weight:600;letter-spacing:-0.01em;padding:13px 18px;text-decoration:none;">Reply to ${esc(name)}</a>
                    </td>
                    <td bgcolor="#e6ff4b" align="center" style="background:#e6ff4b;border-radius:0 12px 12px 0;border-left:1px solid rgba(0,0,0,0.22);width:44px;">
                      <a href="mailto:${esc(email)}" style="display:inline-block;color:#0a0a08;font-size:15px;font-weight:700;padding:13px 15px;text-decoration:none;">&rarr;</a>
                    </td>
                  </tr>
                </table>
              </td></tr>

              <!-- footer strip -->
              <tr><td bgcolor="#08080a" style="padding:16px 32px;border-top:1px solid #1c1c20;background:#08080a;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                  <td align="left" style="vertical-align:middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                      <td style="vertical-align:middle;padding-right:8px;">
                        <img src="${SITE}/x-mark.png" alt="" width="12" style="display:block;border:0;width:12px;height:auto;" />
                      </td>
                      <td style="vertical-align:middle;">
                        <span style="font-family:${MONO};color:#5c5c62;font-size:11.5px;">Sent by the package builder</span>
                      </td>
                    </tr></table>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <a href="${SITE}" style="font-family:${MONO};color:#86868b;font-size:11.5px;text-decoration:none;">${SITE_HOST}</a>
                  </td>
                </tr></table>
              </td></tr>

            </table>
          </td></tr>
        </table>

      </td></tr>
    </table>
  </div>`;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, INQUIRY_FROM } = process.env;

  // Graceful fallback: if SMTP isn't configured yet, log the inquiry so nothing
  // is lost, and still return success so the UX works during setup.
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn(
      "[inquiry] SMTP not configured — logging inquiry instead of emailing.\n" + text,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT ? Number(SMTP_PORT) : 587,
      secure: SMTP_SECURE === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: INQUIRY_FROM ?? `Codexterity <${SMTP_USER}>`,
      to,
      replyTo: `${name} <${email}>`,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[inquiry] send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please email codexterityai@gmail.com directly." },
      { status: 502 },
    );
  }
}
