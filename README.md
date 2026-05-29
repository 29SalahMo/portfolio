# Salahaldin Mohamed - Cinematic 3D Portfolio

Cyberpunk-luxury portfolio built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **GSAP + ScrollTrigger**, **React Three Fiber**, **Drei**, and **Lenis**.

## Run locally

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
src/
  app/              # Next.js App Router (layout, page, providers, globals)
  components/
    layout/         # Nav, loader, cursor, scroll progress
    sections/       # Hero, About, Skills, Projects, Journey, Contact, Terminal
    three/          # R3F scenes (hero, skills galaxy, contact sphere)
    ui/             # Glass cards, magnetic buttons, section headings
  data/             # Profile, projects, skills, timeline (edit here)
  hooks/            # Magnetic hover, GSAP reveals, reduced motion
  lib/              # Utilities
```

### Motion system

- **Lenis** (`providers.tsx`) handles smooth scrolling; GSAP ticker drives Lenis RAF.
- **ScrollTrigger** powers horizontal project pinning and section reveals.
- **Framer Motion** handles loader, micro-interactions, and UI transitions.
- **R3F** scenes are dynamically imported (`ssr: false`) for performance.

### Performance

- 3D canvases use capped `dpr` and lazy dynamic imports.
- `prefers-reduced-motion` disables custom cursor and lowers 3D quality.
- Edit project data in `src/data/projects.ts` (add `live` URLs when ready).

## Deploy (Vercel)

1. Push `portfolio/` to GitHub.
2. Import on Vercel, framework preset: Next.js.
3. Set env if needed; default build: `npm run build`.
4. Update `metadataBase` in `src/app/layout.tsx` to your real domain.

## Lighthouse tips

- Add `public/og.png` (1200x630) and reference in `layout.tsx`.
- Compress any future video previews for project cards.
- Keep hero 3D particle count lower on mobile if needed.

## Still to polish (optional)

- Real project demo videos on hover
- Form backend (Resend / Email API route)
- Sound-reactive toggle
- Behance/Dribbble links
- Custom domain + OG image assets
- Easter eggs and scroll-section background shifts
