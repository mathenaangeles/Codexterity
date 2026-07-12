import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { SERVICES } from "./lib/data";
import Backdrop from "./components/Backdrop";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import ScrollFX from "./components/ScrollFX";

// Garet is a licensed commercial face; per the brand book, on-screen specimens
// fall back to Sora where Garet isn't installed.
const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-jb",
  display: "swap",
});

const SITE_URL = "https://codexterity.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Codexterity | AI Automation, Chatbots & Websites for Small Teams",
    template: "%s | Codexterity",
  },
  description:
    "Codexterity builds AI chatbots, workflow automations, CRM systems, and dashboards that clear your busywork. Live in weeks, owned by you. AI automation for small business.",
  keywords: [
    "AI automation for small business",
    "AI automation agency",
    "custom AI chatbot",
    "workflow automation",
    "CRM setup",
    "website development",
    "business dashboards",
    "lead generation systems",
  ],
  alternates: { canonical: SITE_URL },
  authors: [{ name: "Codexterity" }],
  openGraph: {
    title: "Codexterity | We automate the work you keep doing by hand",
    description:
      "AI automation, conversion-focused websites, and custom systems for small teams. Practical AI and real systems, not abstract hype.",
    url: SITE_URL,
    siteName: "Codexterity",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codexterity, AI automation & custom systems",
    description:
      "We build the chatbot that answers your leads at 2am, so you don't have to.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo-mark.png", type: "image/png" },
    ],
    apple: "/logo-mark.png",
  },
};

// Structured data: lets search engines list the six core services directly.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Codexterity",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.png`,
  email: "hello@codexterity.ai",
  description:
    "AI automation studio for small teams: chatbots, workflow automation, CRM and lead systems, dashboards, and conversion-focused websites.",
  makesOffer: SERVICES.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.keyword },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <ScrollProgress />
        <ScrollFX />
        <Backdrop />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
