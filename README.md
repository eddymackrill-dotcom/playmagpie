# PlayMagpie

A modern crypto casino affiliate website built with Next.js 16, TypeScript and Tailwind CSS.

## Features

- **13+ pages** — Homepage, 4 casino list pages, dynamic review template, guides index + 5 guide pages, About, Contact, Privacy, Terms
- **7 casinos** including real BitStarz data with full data models
- **Premium dark UI** with amber/gold accents
- **Fully responsive** — mobile, tablet, desktop
- **Full SEO suite** — sitemap.xml, robots.txt, Open Graph, Twitter cards, JSON-LD review schema, canonical URLs on every page
- **Static data** — no external CMS required
- **Vercel-ready** — zero config deployment

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build & Deploy

```bash
npm run build   # production build + type check
npm run start   # serve production build locally
```

Deploy to Vercel:

```bash
npx vercel
```

## Project Structure

```
playmagpie/
├── app/
│   ├── layout.tsx                    # Root layout (Header + Footer + global metadata)
│   ├── sitemap.ts                    # Auto-generated sitemap.xml
│   ├── robots.ts                     # Auto-generated robots.txt
│   ├── page.tsx                      # Homepage
│   ├── best-crypto-casinos/page.tsx
│   ├── fast-withdrawal-casinos/page.tsx
│   ├── high-roller-casinos/page.tsx
│   ├── no-kyc-casinos/page.tsx
│   ├── reviews/[slug]/page.tsx       # Dynamic casino review pages (with JSON-LD schema)
│   ├── guides/page.tsx               # Guides index
│   ├── guides/[slug]/page.tsx        # Individual guide pages
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── Header.tsx                    # Logo + nav
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── CasinoComparisonTable.tsx
│   ├── TopRatedSection.tsx
│   ├── ReviewSection.tsx
│   ├── ScoreBadge.tsx
│   ├── CTAButton.tsx
│   └── BonusBanner.tsx
├── lib/
│   ├── casinos.ts    # Casino data model + entries
│   └── guides.ts     # Guide data + content
└── public/
    └── magpie-logo.svg   # Site logo
```

## Adding a Casino

Add a new entry to `lib/casinos.ts` following the `Casino` type. The casino will automatically appear in all relevant list pages and a review page will be generated at `/reviews/[slug]`.

## Domain

Update `https://www.playmagpie.com` in these three files when your domain changes:

- `app/layout.tsx` — `metadataBase`
- `app/sitemap.ts` — `BASE_URL`
- `app/robots.ts` — `sitemap` URL

## Tech Stack

- **Next.js 16** — App Router, static generation
- **TypeScript** — Full type safety
- **Tailwind CSS v4** — Utility-first styling
- **Vercel** — Deployment target
