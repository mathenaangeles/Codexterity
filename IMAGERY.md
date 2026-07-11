# Imagery & graphics guide

Short answer to "is the page too text heavy?": it was. The fix already applied is
**animated vector graphics**, not photos, because raster/AI photos are exactly what
reads as "AI generated" and would work against an Awwwards-style bar.

## What's already in the page (keep leaning on this)

- **Hero orbital graphic** (`HeroGraphic.tsx`) — pure SVG + CSS. Nodes orbit a core,
  signal arcs flow. One gradient, one visual language.
- **Bespoke line icons** (`Icon.tsx`) — single-weight, 24px grid.
- **Custom cursor, count-up metrics, magnetic buttons, scroll reveals** — motion does
  the "delight" job that stock imagery usually fails at.

## Where a real image genuinely helps

Add real screenshots only where they prove something concrete:

1. **A case study / "work" section** (not built yet) — real screenshots of dashboards,
   chat flows, or automations you shipped. Frame them inside the existing `.panel`
   with a dark browser chrome so they match. Real product > any generated art.
2. **OG / social share image** — one designed 1200x630 card. I can generate this from
   the logo + gradient on request.

## If you generate images with AI, do this

Prefer tools that output on-brand, non-photographic assets:

- **Vector / UI mock:** Figma + a plugin, or hand-built SVG (what we did). Most on-brand.
- **Abstract textures / gradients:** Midjourney / DALL·E / Ideogram, then treat them so
  they don't look generated:
  - Prompt for **abstract, non-representational** art only ("abstract flowing gradient
    mesh, lime to cyan to cobalt, dark background, fine grain, no text, no people").
  - Desaturate slightly, overlay the site grain, and mask edges into black so it reads
    as texture, not a "picture".
  - Never generate people, robots, "AI brains", or literal tech clip-art. The brand book
    bans these and they're the #1 tell of an AI site.
- **Icons:** keep them vector and hand-built for consistency. Don't mix an AI icon set in.

## Color story (for any new asset)

Signature gradient travels the clean side of the wheel so it never muddies:
`#e6ff4b (volt) → #62eeb4 (mint) → #37c8e0 (aqua) → #4b58ff (cobalt)`.
Ambient glows use cobalt→indigo (`#4b58ff → #6d4bff`). Volt and the gradient are accents,
used on one or two elements per view. Everything else stays white or grey on near-black.

## Note on the metrics

The Results numbers (38%, 120+, 90%) are **illustrative placeholders**. Swap them for real
figures before launch, or I can reword them as ranges / capabilities if you don't want to
claim specific numbers yet.
