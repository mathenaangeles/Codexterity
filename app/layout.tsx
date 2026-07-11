import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import Backdrop from "./components/Backdrop";
import CustomCursor from "./components/CustomCursor";

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
    default: "Codexterity — AI automation, websites & custom systems",
    template: "%s · Codexterity",
  },
  description:
    "Codexterity turns manual, scattered business processes into streamlined digital systems — chatbots, CRM, dashboards, and websites that quietly do the work your team keeps doing by hand.",
  keywords: [
    "AI automation",
    "workflow automation",
    "AI chatbots",
    "CRM setup",
    "website development",
    "custom software",
    "lead generation",
  ],
  authors: [{ name: "Codexterity" }],
  openGraph: {
    title: "Codexterity — We automate the work you keep doing by hand",
    description:
      "AI automation, conversion-focused websites, and custom systems for SMEs. Practical AI and real systems — not abstract hype.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <Backdrop />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
