# nhm-portfolio

Personal portfolio & showcase monorepo by **Nicolas Hormesch** — Senior Frontend Developer with a focus on modern Vue/Nuxt ecosystems, design systems, and production-grade web applications.

> Live: [nicolashormesch.dev](https://nicolashormesch.dev) &nbsp;|&nbsp; [ecoscope.nicolashormesch.dev](https://ecoscope.nicolashormesch.dev)

---

## What this repo demonstrates

This is not a template — it is a deliberately over-engineered personal portfolio designed to serve as a live code sample. Every architectural decision reflects real production patterns I apply professionally:

- **pnpm monorepo** with shared workspace tooling across multiple apps
- **Nuxt 4 SSR** with server-side data fetching via `useAsyncData` (correctly awaited for SSR hydration)
- **Nuxt Content v3** with multi-locale collection strategy (`content_en` / `content_de`) and graceful EN fallback
- **Serverless API routes** (Nitro) for contact form email delivery via Resend
- **Component architecture** following Single Responsibility — every component has exactly one job, sub-components for sub-elements
- **TypeScript throughout** — no `any`, all domain models typed in `/models` and `/types`
- **Reactive i18n** — locale-scoped `useAsyncData` keys so SSR payloads are locale-aware from the first render
- **Motion-v animations** — Vue port of Framer Motion; scroll-triggered, viewport-once, no CSS hacks
- **3D scene** via TresJS + Three.js with OrbitControls, ContactShadows, and image transitions
- **Custom Tailwind design system** — semantic color tokens (`sage`, `mint`, `moss`, `charcoal`), custom gradients and patterns, no inline hex values anywhere

---

## Monorepo structure

```
nhm-portfolio-new/
├── apps/
│   ├── portfolio/          # Main portfolio site (nicolashormesch.dev)
│   └── ecoscope/           # Showcase sub-app: real-time air quality dashboard
├── package.json            # Workspace root — shared pnpm scripts
└── pnpm-workspace.yaml
```

### `apps/portfolio`

```
app/
├── components/
│   ├── Sections/           # One component per page section (Hero, Portfolio, Skills, …)
│   ├── Banners/            # MarqueeBanner with RAF-driven acceleration easter egg
│   ├── Clients/            # CTA banner with locomotive beam (conic-gradient + motion-v)
│   ├── Contact/            # ContactForm (PrimeVue) → /api/contact server route
│   ├── Experience/         # Timeline with project detail dialog
│   ├── Skills/             # Scrolling "highway" lanes with skill chips
│   ├── Portfolio/          # Project carousel + TresJS 3D scene
│   ├── Navbar/             # Fixed nav with scroll-spy and locale toggle
│   └── Footer/
├── composables/
│   ├── useSectionData.ts   # Locale-aware content fetcher for portfolio.md sections
│   ├── useContentData.ts   # Generic locale-aware fetcher for any content path
│   └── useScrollSpy.ts     # IntersectionObserver-based hash sync (no router events)
├── models/                 # TypeScript interfaces for all domain data
├── types/                  # Supplementary type definitions
├── locales/                # i18n JSON (en / de) — no hardcoded UI strings
├── themes/                 # PrimeVue Aura theme override
└── layouts/
    └── default.vue         # Navbar + slot + Footer

content/
├── en/
│   ├── portfolio.md        # All section data: hero, clients, portfolio, contact
│   ├── skills.md           # Skill categories and entries
│   └── experience.md       # Timeline projects
└── de/                     # Full German translations of all content files

server/
└── api/
    └── contact.post.ts     # Resend email handler (runtimeConfig, input validation)
```

### `apps/ecoscope`

Standalone data-visualization app showcasing AG Grid, AG Charts, and a live air quality API integration. Deployed to a subdomain and linked from the portfolio as a live project reference.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 4 + Vue 3 (Composition API, `<script setup>`) |
| Language | TypeScript (strict, no `any`) |
| Styling | Tailwind CSS 3 with custom design tokens |
| UI Components | PrimeVue 4 (Aura theme preset) |
| Animations | motion-v (Vue port of Framer Motion) |
| 3D | TresJS + Three.js + @tresjs/cientos |
| Content | @nuxt/content v3 (Markdown, SQLite, multi-collection) |
| i18n | @nuxtjs/i18n v10 (EN + DE, prefix_except_default) |
| Data viz | AG Grid 35 + AG Charts 13 |
| Email | Resend via Nitro server route |
| Package manager | pnpm 10 (workspaces) |
| Deployment | Vercel (two projects, one repo, Nitro vercel preset) |

---

## Architecture decisions worth noting

**Locale-aware SSR data fetching**  
Each `useAsyncData` call uses a function key (`() => \`section-${locale.value}\``) so Nuxt generates separate SSR payload entries per locale. Without this, a static string key causes the client to hydrate with stale empty data when i18n initializes reactively on mount.

**Composable hierarchy**  
`useSectionData(section)` wraps `useContentData(path)` wraps `useAsyncData`. Each layer is `async` and must be `await`ed in `<script setup>` — this is intentional and ensures the component suspends during SSR rather than rendering empty.

**RAF-driven marquee**  
`MarqueeBanner.vue` replaces CSS `animation-duration` changes (which restart the animation) with a `requestAnimationFrame` loop tracking absolute scroll position as a 0–1 progress value. Speed changes affect only the rate of change per frame, not the position — enabling seamless mid-animation acceleration without visual jumps.

**3D canvas isolation**  
The TresJS canvas is constrained to `w-1/2` and positioned on the left half of the viewport, keeping right-side text fully interactive and selectable.

---

## Local development

```bash
# Install dependencies (from repo root)
pnpm install

# Run both apps in parallel
pnpm dev

# Run only portfolio
pnpm dev:portfolio

# Run only ecoscope
pnpm dev:ecoscope
```

Environment variables (create `apps/portfolio/.env`):

```env
RESEND_API_KEY=re_...
NUXT_PUBLIC_ECOSCOPE_URL=http://localhost:3001
```

---

## Deployment

Each app is a separate Vercel project pointing to the same GitHub repo, with **Root Directory** set to the respective `apps/` folder. The `vercel.json` in each app navigates to the monorepo root for `pnpm install` to resolve workspace dependencies, then builds via `--filter`.

See [`apps/portfolio/vercel.json`](apps/portfolio/vercel.json) and [`apps/ecoscope/vercel.json`](apps/ecoscope/vercel.json).
