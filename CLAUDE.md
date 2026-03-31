# Taylor Maison Site

## Project Overview
Portfolio and services site for Taylor Maison, creative director specializing in brand strategy, custom websites, and AI workflow consulting. Showcases projects (Roman Sanford, RS Black, Genuine Undead, Hampton Garden Party) with sophisticated animations, 3D ferrofluid orb, and smooth scroll.

## Stack
- **Framework:** Next.js 16.1.6 (App Router)
- **Frontend:** React 19.2.4, TypeScript 5.9.3 (strict)
- **Styling:** Vanilla CSS (globals.css), CSS custom properties
- **Animation:** GSAP 3.14.2 (ScrollTrigger), Lenis 1.3.18 (smooth scroll)
- **3D:** React Three Fiber 9.5.0, Three.js 0.183.2, @react-three/drei 10.7.7
- **Fonts:** Cabinet Grotesk (display) + Satoshi (body) via Fontshare CDN
- **Dev server:** port 3335 (`next dev -p 3335`)

## Architecture

### Page Structure
- `/` — Home (Hero, WorkSection, VoiceMoment, ServicesSection, AboutSection, ContactSection)
- `/work/[slug]` — Case study pages (dynamic, `generateStaticParams`)
- Layout wraps with PageTransition, CustomCursor via context

### Component Tree
```
Layout (PageTransition wrapper, CustomCursor)
+-- Header (fixed, GSAP-animated nav pill + TM logo dot)
+-- Hero (video BG, Ferrofluid 3D orb, notes strip)
+-- WorkSection (project grid, ScrollTrigger)
+-- VoiceMoment (principles cards, dark bg)
+-- ServicesSection (3-tier pricing: $3K / $8K / $15K)
+-- AboutSection (headshot, bio, credentials)
+-- ContactSection (CTA buttons, email)
+-- Footer (social links, back-to-top)
```

### Data Flow
- Projects: static array in `lib/projects.ts` (4 entries)
- Dynamic routing via `generateStaticParams` for case studies
- Animations: GSAP context + ScrollTrigger per section, play once only
- Smooth scroll: Lenis (duration 1.2s, exponential easing)
- Page transitions: overlay slides up/down via PageTransitionContext + TransitionLink

### Key Directories
```
app/            -- Next.js App Router (layout, page, work/[slug])
components/     -- 20 React components
lib/            -- projects.ts, useTextScramble.ts
shaders/        -- GLSL (ferrofluid.vert.ts, ferrofluid.frag.ts)
public/images/  -- Project thumbnails, case study images
public/video/   -- hero-bg.mp4
```

## Design System

### Colors (CSS custom properties in globals.css)
- `--bg: #f4f0e8` (warm cream)
- `--bg-strong: #ece6de` (darker cream)
- `--surface: rgba(255,255,255,0.58)` (frosted glass)
- `--text-primary: #15181b` (almost black)
- `--text-secondary: #5f5951` (brown-gray)
- `--text-muted: #8a8278`
- `--accent: #6f8190` (silvery blue -- NOT gold, Taylor explicitly dislikes gold)
- `--line: rgba(21,24,27,0.12)`
- `--charcoal: #0d1015`

### Fonts
- `--font-display: 'Cabinet Grotesk'` (headings)
- `--font-body: 'Satoshi'` (body text)
- Loaded from Fontshare CDN, fallback to Helvetica Neue

### Typography (fluid clamp scales)
- `--text-hero: clamp(3.6rem, 9vw, 8.8rem)`
- `--text-display: clamp(2.3rem, 5vw, 4.8rem)`
- `--text-heading: clamp(1.5rem, 2.8vw, 2.4rem)`
- `--text-body: clamp(1rem, 1.2vw, 1.08rem)`

### Spacing (fluid)
- `--space-xs` through `--space-2xl` (clamp-based)
- `--container-max: 1320px`

### Effects
- Body noise overlay (SVG feTurbulence, opacity 0.01)
- `--shadow-soft: 0 18px 40px rgba(17,15,11,0.05)`
- `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`

## Components

### Layout & Navigation
- **Header.tsx** -- Fixed header, nav pill (TM brand, Work/Services/About/Contact), CTA. GSAP stagger entrance. Uses TransitionLink.
- **PageTransition.tsx** -- Context provider, overlay slides up/down on navigation. "Loading next view" label.
- **TransitionLink.tsx** -- Smart link: detects same-page hash, external, cross-page. Triggers page transition.
- **CustomCursor.tsx** -- 24px white plus-sign (::before/::after), mix-blend-mode exclusion, lerp 0.15 magnetic snap, grows to 36px on hover. Disabled on mobile.
- **SmoothScroll.tsx** -- Global Lenis (duration 1.2s, exponential easing). Hijacks anchor clicks with -100px offset.

### Hero & 3D
- **Hero.tsx** -- Video bg (autoplay muted loop, 0.4 playback rate), h1 + lede + CTA, 3 note items. GSAP timeline.
- **Ferrofluid.tsx** -- Three.js interactive orb. Custom vertex/fragment shaders (Simplex noise FBM). Responds to pointer (magnetic, spike, recoil). icosahedronGeometry (128 desktop, 64 mobile).

### Sections
- **WorkSection.tsx** -- Project list, alternating layout, ScrollTrigger. Links to `/work/[slug]`.
- **VoiceMoment.tsx** -- Dark charcoal section, large headline + 3 principle cards.
- **ServicesSection.tsx** -- 3-tier pricing grid with ScrollTrigger.
- **AboutSection.tsx** -- Two-column (image + bio), credentials grid.
- **ContactSection.tsx** -- CTA with email buttons, fit notes.
- **CaseStudy.tsx** -- Dynamic case study page: hero (project.color bg), overview sidebar, impact cards, challenge, gallery groups (full/split/offset), next project link.

### Utilities
- **MagneticLink.tsx** -- Anchor with magnetic offset on mousemove (GSAP, elastic recoil).
- **ScrambleLink.tsx** -- Text scramble on hover (useTextScramble hook). Optional magnetic.
- **ColorShift.tsx** -- Cycles 7 Gen Z palettes on TM wordmark click. Radial shockwave animation. No persistence (resets on reload).
- **Footer.tsx** -- Email, social links (X, LinkedIn), back-to-top.

## Animation Patterns

### GSAP + ScrollTrigger Convention
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo('.selector',
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out',
        stagger: 0.08, clearProps: 'all',
        scrollTrigger: { trigger: '.trigger', start: 'top 82%' }
      })
  }, sectionRef)
  return () => ctx.revert()
}, [])
```

**Rules:**
- Animations **play once only** (no toggleActions). Taylor explicitly does not want replay-on-scroll.
- Always use `clearProps: 'all'` after animation.
- Use `autoAlpha` not bare `opacity`.
- Stagger: 0.06-0.12s. Trigger start: usually `'top 82%'`.

### Ferrofluid Interaction
- Hover (400ms+): magnetStrength ramps to 0.5, spikes visible
- Press: magnetStrength -> 1.0, sharp spikes, strong recoil on release
- Recoil: exponential decay with sinusoidal wobble (1.5s)

## Known Gotchas

### IMAGE CACHE (critical)
When swapping an image with the **same filename**, Turbopack caches aggressively. Browser refresh won't work.
**Fix:** `rm -rf .next` + restart dev server.

### Dev Server Crashes
Port 3335 occasionally exits with code 144. Just restart: `npx next dev -p 3335`.

### CustomCursor.tsx -- FRAGILE
Do NOT refactor without explicit testing. Magnetic snap + RAF loop are interdependent. Changes to one break the other. Reverting has been needed multiple times.

### ColorShift -- No Persistence
7 palettes cycle on TM wordmark click. Resets on reload. Taylor wants to fine-tune some palette colors.

### object-fit Gotcha
`object-fit: cover` crops horizontally only when image is wider than container ratio. Vertical `object-position` shifts have ZERO effect. Fix the source image aspect ratio instead.

### Accent Color
Gold (#BFA78A) replaced with silver (#9BA0A8). Taylor explicitly dislikes gold. Header dot/pill uses `var(--text-primary)`, mobile header bg uses `color-mix()`.

### Scroll Animations
Play once only. Do NOT add `toggleActions` or make animations repeatable unless Taylor asks.

### Nav Interaction -- Undecided
Cursor hover behavior over nav links not decided. Don't change without asking Taylor.

## Known Issues / TODOs
- **Mobile nav:** No hamburger menu; nav hides at <900px. Needs mobile nav.
- **/about page:** Not yet built.
- **Background color shift between sections:** Tier 3, not started.
- **Cursor behavior refinement:** Decide on cursor over nav, hover states.
- **Color shift palette tweaks:** Some colors too bright/dark.
- **Not deployed:** Dev server only, ready for Vercel push.
