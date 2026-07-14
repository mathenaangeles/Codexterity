/**
 * The canonical site URL — the ONE place to set the real domain.
 *
 * Resolution order:
 *  1. SITE_URL env var (set it locally in .env.local and in
 *     Netlify → Site configuration → Environment variables)
 *  2. Netlify's own URL env (auto-provided on deploys)
 *  3. Vercel's production URL (auto-provided if ever deployed there)
 *  4. The live app URL below.
 *
 * Used by: the inquiry email (logo/X-mark image URLs + links), metadata
 * (canonical/OG), sitemap.xml, and robots.txt.
 */
export const SITE_URL =
  process.env.SITE_URL ??
  process.env.URL ?? // Netlify
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ??
  "https://codexterity.netlify.app";

/** Host name for display (e.g. "codexterity.netlify.app"). */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");
