import type { NextConfig } from "next";

// NOTE: We intentionally do NOT use `output: "export"` here.
// Static export disables API routes (serverless functions), and the site relies
// on /api/inquiry (nodemailer) for the contact + package flow. Vercel's free
// (Hobby) tier runs Next.js serverless functions natively, so a standard build
// deploys for free with the backend intact.
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
