/**
 * The canonical site URL — the ONE place to set your real domain.
 *
 * Resolution order:
 *  1. SITE_URL env var (set it in .env.local and in Vercel → Settings →
 *     Environment Variables, e.g. SITE_URL=https://yourdomain.com)
 *  2. Vercel's production URL (auto-provided, so the email logo works even
 *     before you own a domain, e.g. https://codexterity.vercel.app)
 *  3. The placeholder below — replace it when the real domain exists.
 *
 * Used by: the inquiry email (logo/X-mark image URLs + links), metadata
 * (canonical/OG), sitemap.xml, and robots.txt.
 */
export const SITE_URL =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://codexterity.ai");
