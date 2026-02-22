# Seagram Building — Scrollytelling Timeline

Interactive chronological timeline presenting the architectural history of the Seagram Building (375 Park Avenue, NYC). The site uses a "scrollytelling" pattern where full-viewport pinned galleries cycle through images as the user scrolls, then release into narrative text blocks.

## Tech Stack

- **Vite + React 18 + TypeScript** — project scaffold
- **Tailwind CSS v4** — styling via `@tailwindcss/vite` plugin (CSS-first config in `@theme` blocks, no `tailwind.config.js`)
- **GSAP + ScrollTrigger** (`gsap`, `@gsap/react`) — scroll-driven pinned galleries with image cycling
- **Motion** (`motion/react`) — component crossfades and entrance animations

## Architecture

### Layout Pattern

The page alternates between **pinned gallery sections** and **text sections** for each of the four phases:

```
Header → Gallery 0 (pinned) → Text 0 → Gallery 1 (pinned) → Text 1 → … → Footer
```

Desktop (`lg:+`): Each gallery is a full-viewport section pinned by GSAP ScrollTrigger. Scroll input cycles through 3 images per phase (with `AnimatePresence` crossfade). Once all images are shown, the pin releases and the text section scrolls normally. Text sections are centered (`max-w-3xl`).

Mobile (`< lg`): No pinning. Gallery images are stacked vertically inline with Motion `whileInView` fade-in animations, followed by the text section.

### Scroll State Management

- `activePhaseIndex` (discrete) — React state in `ScrollytellingLayout`, updated by `PinnedGallery.onPhaseEnter` callbacks and text-section ScrollTrigger observers. Drives `TimelineNav` dot highlighting.
- `visualSubIndex` (discrete) — React state local to each `PinnedGallery`, computed from ScrollTrigger `onUpdate` progress. Only updates when the image index actually changes (ref guard).
- `scrollProgress` (continuous, every frame) — `ProgressBar` has its own global ScrollTrigger applied directly to DOM, bypasses React re-renders.

### Content Data Flow

All content lives in `src/data/timelineData.ts` as a typed `TimelineData` object. Components receive phase data as props — there is no global state management library. The four phases are:

0. "The Context & The Rejection" (1916–1954)
1. "The Archival Conception" (1954–1958)
2. "The Monument & The Law" (1958–1961)
3. "Current State & Weathering" (Present Day)

### Visual System

Each phase has a `visualSequence` array of 3 `VisualConfig` objects, each with an `imageSrc` path pointing to optimized images in `public/images/`. The `VisualPlaceholder` component renders either a real `<img>` with caption overlay (when `imageSrc` is present) or falls back to a gradient placeholder with descriptive labels.

## Key Directories

```
src/
  data/          — timeline content and metadata
  types/         — TypeScript interfaces (Phase, VisualConfig, TimelineData)
  hooks/         — useMediaQuery
  utils/         — gsapSetup (plugin registration), constants
  components/
    layout/      — ScrollytellingLayout (core orchestrator), Header, Footer
    timeline/    — TimelineSection, TimelineNav, TimelineNavDot
    visuals/     — PinnedGallery (GSAP pin + image cycling), VisualPanel (crossfade manager), VisualPlaceholder, GalleryProgress
    ui/          — FadeInSection, ProgressBar
```

## Design Tokens

Defined in `src/index.css` via Tailwind v4 `@theme` block. Key colors: `seagram-bronze` (#8B6914), `seagram-cream` (#F5F0E8), `seagram-ink` (#1A1A1A), `seagram-granite` (#D4C5A9), `seagram-charcoal` (#2A2A2A). Fonts: Playfair Display (display), Inter (body).

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
