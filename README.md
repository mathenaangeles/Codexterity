# Codexterity

Marketing site for Codexterity — AI automation, websites & custom systems.
Built with Next.js (App Router), React 19, and Tailwind CSS v4. The design system
is ported directly from `brand-book.html` (Volt `#E6FF4B` / Cobalt `#4B58FF`,
Sora + Inter + JetBrains Mono).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

Single scrolling landing page (`app/page.tsx`) composed of section components in
`app/components/`:

- `Header` — floating Apple-style pill nav, glass-on-scroll, mobile sheet
- `Hero` — texture/grid/glow background, gradient + typing headline, console mock
- `Proof` — "plugs into what you already use" integrations marquee
- `Services` — boxy grid with bespoke line icons (`Icon.tsx`)
- `PackageBuilder` — the "build your package" scope collector (Volt chips)
- `Process`, `About`, `Contact`, `Footer`
- `InquiryContext` — shares the selected services/budget/timeline between the
  package builder and the contact form

Shared data (services, budgets, timelines) lives in `app/lib/data.ts`.

## Contact form email (`/api/inquiry`)

The contact + package form POSTs to `app/api/inquiry/route.ts`, which sends email
via **nodemailer**. Until SMTP is configured, submissions are logged server-side
and the form still succeeds (nothing is lost) — no email is sent.

Copy `.env.example` to `.env.local` for local dev, and set the same variables in
**Vercel → Project → Settings → Environment Variables** for production:

```
SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
INQUIRY_TO   (default: hello@codexterity.ai)
INQUIRY_FROM
```

Any SMTP provider works (Resend, Postmark, SendGrid, a Gmail app password, etc.).

## Deploy (Vercel, free)

This is a standard Next.js app (no `output: "export"`), so Vercel's free Hobby
tier runs the `/api/inquiry` serverless function at no cost. Push to a Git repo,
import it in Vercel, add the env vars above, and deploy.
