# Seagram Building — Scrollytelling Timeline

Interactive chronological timeline presenting the architectural history of the Seagram Building (375 Park Avenue, NYC). The site uses a "scrollytelling" pattern where a sticky visual panel crossfades between representations as the user scrolls through narrative text blocks.

## Tech Stack

- **Vite + React 18 + TypeScript** — project scaffold
- **Tailwind CSS v4** — styling via `@tailwindcss/vite` plugin (CSS-first config in `@theme` blocks, no `tailwind.config.js`)
- **GSAP + ScrollTrigger** (`gsap`, `@gsap/react`) — scroll-driven phase detection and progress tracking
- **Motion** (`motion/react`) — component crossfades and entrance animations

## Architecture

### Layout Pattern

Desktop (`lg:+`): two-column grid. Left column is the sticky visual panel (`position: sticky`, CSS-native). Right column contains scrollable `TimelineSection` blocks (~100vh each). GSAP ScrollTrigger observes scroll position to determine the active phase — it does **not** handle pinning (CSS sticky does that).

Mobile (`< lg`): single stacked column. Each phase renders its own visual inline above its text. GSAP pinning is disabled; visuals use Motion's `whileInView` instead.

### Scroll State Management

- `activePhaseIndex` (discrete, changes ~3 times) — React state, triggers visual crossfade via `AnimatePresence`
- `scrollProgress` (continuous, every frame) — stored in a `ref`, applied directly to DOM (progress bar width), bypasses React re-renders

### Content Data Flow

All content lives in `src/data/timelineData.ts` as a typed `TimelineData` object. Components receive phase data as props — there is no global state management library. The four phases are:

0. "The Context & The Rejection" (1916–1954)
1. "The Archival Conception" (1954–1958)
2. "The Monument & The Law" (1958–1961)
3. "Current State & Weathering" (Present Day)

### Visual System

Visual placeholders are gradient boxes with descriptive labels (real images to be added later). Phase 0 has a `visualSequence` array for a mid-phase sub-transition (zoning diagram → rejected P&L model), driven by scroll progress within that phase.

## Key Directories

```
src/
  data/          — timeline content and metadata
  types/         — TypeScript interfaces (Phase, VisualConfig, TimelineData)
  hooks/         — useScrollTimeline (GSAP), useMediaQuery
  utils/         — gsapSetup (plugin registration), constants
  components/
    layout/      — ScrollytellingLayout (core orchestrator), Header, Footer
    timeline/    — TimelineSection, TimelineNav, TimelineNavDot
    visuals/     — VisualPanel (crossfade manager), VisualPlaceholder
    ui/          — FadeInSection, ProgressBar
```

## Design Tokens

Defined in `src/index.css` via Tailwind v4 `@theme` block. Key colors: `seagram-bronze` (#8B6914), `seagram-cream` (#F5F0E8), `seagram-ink` (#1A1A1A), `seagram-granite` (#D4C5A9), `seagram-charcoal` (#2A2A2A). Fonts: Playfair Display (display), Inter (body).

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
