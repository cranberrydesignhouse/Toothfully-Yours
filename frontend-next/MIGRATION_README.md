# Toothfully Yours — Next.js 14 Migration

This directory holds the **Next.js 14 App Router** port of the original CRA SPA at `/app/frontend`.

The original CRA app is **untouched**. The live preview (`https://amruta-dentistry.preview.emergentagent.com`) still serves CRA.
This Next.js build is **not deployed**. It's ready to ship once you sign off.

## Local Dev

```bash
cd /app/frontend-next
yarn dev        # http://localhost:3000
```

## Production Build (Static Export)

```bash
yarn build       # outputs to /app/frontend-next/out/
```

The `out/` directory is a complete static site — drop it into any static host.

## Netlify Deployment

In your Netlify site settings:

| Setting | Value |
|---|---|
| Base directory | `frontend-next` |
| Build command | `yarn install && yarn build` |
| Publish directory | `frontend-next/out` |
| Node version | 18 or 20 |

**No `@netlify/plugin-nextjs` needed** because we use `output: 'export'` — Netlify serves the pre-rendered HTML directly, no functions, no cold starts, no per-request cost.

Netlify Forms still work because the hidden form is embedded in every page at build time (see `app/layout.js`).

## URL Compatibility

Every URL from the CRA app is preserved 1-for-1:

| Original | Next.js |
|---|---|
| `/` | `/` |
| `/cosmetic-aesthetic-care` | `/cosmetic-aesthetic-care` |
| `/implants-restoration` | `/implants-restoration` |
| `/corrective-alignment` | `/corrective-alignment` |
| `/neuromuscular-dentistry` | `/neuromuscular-dentistry` |
| `/global-access` | `/global-access` |
| `/thank-you` | `/thank-you` |

## What Changed

- `react-router-dom` (Link / useLocation / useNavigate) → `next/link` + `next/navigation` (Link / usePathname / useRouter)
- `BrowserRouter` removed — file-based routing under `/app`
- Each page got per-route `metadata` export (title, description, OG, canonical)
- JSON-LD schema (`MedicalBusiness` + `MedicalProcedure`) now baked into static HTML for crawlers
- All interactive components marked `"use client"` (every component uses hooks)

## What Did NOT Change

- ✅ Every visual layout
- ✅ Every animation (Reveal / Embla carousels / motion classes)
- ✅ Every form field and submission target
- ✅ Every image URL
- ✅ Tailwind utility classes (one-for-one copy of `tailwind.config.js`)
- ✅ Mobile breakpoints — tested at 375 / 390 / 414 / 768 px

## Rollback

The original CRA is still at `/app/frontend` and is what Netlify is currently serving. Discarding this Next.js work = `rm -rf /app/frontend-next`.
