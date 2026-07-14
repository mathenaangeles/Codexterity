import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { SITE_URL } from "./lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Codexterity | AI Workforce",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Google Search Console ownership proof — set GOOGLE_SITE_VERIFICATION in
  // Netlify env vars with the token from the "HTML tag" verification method.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    title: "Codexterity | We make your business run smarter with AI.",
    description:
      "AI automation, conversion-focused websites, and custom systems for small teams. Practical AI and real systems, not abstract hype.",
    url: SITE_URL,
    siteName: "Codexterity",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Codexterity — Future-proof your business with an AI workforce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codexterity, AI automation & custom systems",
    description:
      "We build the chatbot that answers your leads at 2am, so you don't have to.",
    images: ["/og.png"],
  },
  icons: {
    // the standalone X mark, never the clipped wordmark
    icon: [{ url: "/x-mark.png", type: "image/png" }],
    apple: "/x-mark.png",
  },
};

// Structured data: lets search engines list the six core services directly.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Codexterity",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: "codexterityai@gmail.com",
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
