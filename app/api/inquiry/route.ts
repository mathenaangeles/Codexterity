import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

  const to = process.env.INQUIRY_TO ?? "hello@codexterity.ai";
  const subjectBits = [name, services.length ? services.join(", ") : "General inquiry"];
  const subject = `New project inquiry — ${subjectBits.join(" · ")}`;

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
  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px">
      <h2 style="margin:0 0 4px">New project inquiry</h2>
      <p style="color:#666;margin:0 0 16px">via codexterity.ai</p>
      <table style="border-collapse:collapse;width:100%">
        ${[
          ["Name", esc(name)],
          ["Email", `<a href="mailto:${esc(email)}">${esc(email)}</a>`],
          ["Services", services.length ? esc(services.join(", ")) : "—"],
          ["Budget", esc(budget) || "—"],
          ["Timeline", esc(timeline) || "—"],
        ]
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#888;vertical-align:top">${k}</td><td style="padding:6px 0">${v}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:18px 0 6px;color:#888">Message</p>
      <p style="white-space:pre-wrap;margin:0;padding:12px;background:#f5f5f4;border-radius:8px">${esc(
        message,
      )}</p>
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
      { error: "Couldn't send right now. Please email hello@codexterity.ai directly." },
      { status: 502 },
    );
  }
}
