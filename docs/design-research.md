# Design Research & Reference Library

> Curated design patterns, typography choices, animation techniques, and architectural decisions for Taylor Maison projects. Reference this before building any new site.

---

## Typography

### Approved Fonts

| Font | Source | Role | Weights Used | Notes |
|------|--------|------|-------------|-------|
| **Clash Display** | Fontshare | Display / Headings | 200–700 (800 for hero) | Geometric, sharp, modern. The only display font Taylor has approved. |
| **Satoshi** | Fontshare | Body / UI | 300–900 | Clean geometric sans. Pairs perfectly with Clash Display. |

### Font Loading
```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=satoshi@300,400,500,700,900&display=swap');
```

### Rejected Fonts
- **Instrument Serif** — too editorial, not modern enough
- **Syne** — Taylor explicitly hated it ("hate hate hate")
- **Inter, Roboto, Arial** — generic AI slop
- **Space Grotesk** — overused in AI-generated designs

### Typography Scale (Fluid)
```css
--text-hero: clamp(5rem, 14vw, 13rem);
--text-display: clamp(2.5rem, 5.5vw, 5rem);
--text-heading: clamp(1.5rem, 3vw, 2.5rem);
--text-subheading: clamp(1.1rem, 1.5vw, 1.35rem);
--text-body: clamp(0.95rem, 1.1vw, 1.1rem);
--text-small: clamp(0.75rem, 0.9vw, 0.85rem);
--text-micro: clamp(0.65rem, 0.75vw, 0.75rem);
```

### Typography Techniques
- **Hero titles**: uppercase, weight 800, letter-spacing -0.04em, line-height 0.85
- **Section labels**: micro size, weight 500, letter-spacing 0.2em, uppercase, muted color
- **Body text**: line-height 1.6–1.8, secondary color for softer hierarchy
- **Display text on work items**: weight 500 default, 700 on hover (font-weight transition)

---

## Color & Palette

### Taylor Maison Palette — "Warm Architectural"
```css
--bg: #F2EDE8;          /* warm cream — NOT white */
--bg-alt: #E8E2DB;      /* slightly darker cream */
--text-primary: #141414; /* near-black */
--text-secondary: #6B6560; /* warm gray */
--text-muted: #A39D96;  /* light warm gray */
--line: #D4CEC7;        /* subtle dividers */
--line-dark: #141414;   /* strong dividers */
--accent: #BFA78A;      /* warm gold */
```

### Color Principles
- **Never pure white (#fff) for backgrounds** — always warm it up
- **Never pure black (#000) for text** — use #141414 or similar
- Dark sections use project-specific colors (each project has a `color` property)
- Muted colors for supporting text creates breathing room
- Accent color used sparingly — gold/warm tones match the Hamptons luxury feel

### Project Colors
| Project | Color | Mood |
|---------|-------|------|
| Roman Sanford | #2A2A2A | Authoritative dark gray |
| RS Black | #0A0A0A | Nearly black, classified feel |
| Genuine Undead | #1A3D2E | Deep forest green |
| Hampton Garden Party | #4A6741 | Garden green |

---

## Animation & Motion

### Stack
- **GSAP 3.14+** with ScrollTrigger plugin
- **Lenis 1.3+** for smooth scrolling
- CSS transitions for hover states

### GSAP Pattern — SSR Safe
```tsx
// Set initial hidden state (won't flash on SSR)
gsap.set('.element', { opacity: 0, y: 30 })

// Animate to visible on scroll
gsap.to('.element', {
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.element',
    start: 'top 85%',
  },
})
```

### Character-by-Character Text Animation
```tsx
const splitChars = (text: string) => {
  return text.split('').map((char, i) => (
    <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
      <span className="char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    </span>
  ))
}
```
Then animate `.char` elements:
```js
gsap.set('.char', { y: '110%', rotate: 5 })
gsap.to('.char', {
  y: '0%',
  rotate: 0,
  duration: 1.2,
  ease: 'power4.out',
  stagger: 0.025,
})
```

### Easing Reference
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* snappy deceleration */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* smooth both ends */
--ease-expo: cubic-bezier(0.19, 1, 0.22, 1);     /* dramatic expo out */
```
- `power3.out` — default for most reveals (smooth, professional)
- `power4.out` — hero text (dramatic entry)
- Duration: 0.6–0.8s for reveals, 1.0–1.2s for hero elements
- Stagger: 0.025 for characters, 0.1–0.15 for list items

### ScrollTrigger Gotchas
- **Bottom-of-page sections**: use `start: 'top 90%'` or `start: 'top 95%'` — aggressive starts like `top 75%` won't fire because you can't scroll far enough
- **GSAP context**: always wrap in `gsap.context(() => {}, ref)` and call `ctx.revert()` on cleanup
- **Lenis + Playwright**: `scrollTo({ behavior: 'instant' })` bypasses Lenis, so ScrollTrigger won't detect position changes in automated testing

### Hover Transitions
- Duration: `var(--duration-fast)` (0.3s)
- Easing: `var(--ease-out)`
- Font-weight transitions create a "breathing" effect on work items
- Underline reveal: `width: 0` → `width: 100%` on `::after` pseudo-element

---

## Layout & Spatial Composition

### Container System
```css
--container-max: 1400px;
--container-padding: clamp(1.5rem, 4vw, 4rem);
```

### Spacing Scale (Fluid)
```css
--space-xs: clamp(0.5rem, 1vw, 0.75rem);
--space-sm: clamp(1rem, 2vw, 1.5rem);
--space-md: clamp(2rem, 4vw, 3rem);
--space-lg: clamp(4rem, 8vw, 6rem);
--space-xl: clamp(6rem, 12vw, 10rem);
--space-2xl: clamp(8rem, 16vw, 14rem);
```

### Page Structure Pattern
```
Header (fixed, mix-blend-mode: difference)
├── Hero (full viewport, char animation)
├── Work (full-width list, border dividers)
├── Services (stacked with large numbers)
├── About (2-column grid with photo)
├── Contact (centered large type CTA)
└── Footer (minimal, back-to-top)
```

### Case Study Page Structure
```
Header (fixed, mix-blend-mode: difference)
├── Hero (full viewport, project color bg, white text)
├── Overview (2-column: sidebar metadata + brief)
├── Challenge (centered text, max-width 800px)
├── Gallery (alternating full/split/offset layouts)
├── Next Project (large type CTA, links to next)
└── Footer
```

### Gallery Layout System
Three layout modes, applied via BEM modifiers:
- **`--full`**: single column, full width
- **`--split`**: two equal columns (`1fr 1fr`)
- **`--offset`**: asymmetric two columns (`1.2fr 0.8fr`), items align to bottom

### Grid Techniques
- Work list: flex with `align-items: baseline` + gap for uniform spacing
- About section: `grid-template-columns: 0.65fr 1.2fr` (photo smaller than text)
- Services: flex with large number on left, content on right
- Overview sidebar: fixed 280px column, content fills rest

---

## Visual Details & Texture

### Grain Overlay
```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.022;  /* very subtle */
  background-image: url("data:image/svg+xml,...feTurbulence...");
  background-repeat: repeat;
  background-size: 256px 256px;
}
```
- Uses SVG `feTurbulence` filter (fractalNoise, baseFrequency 0.9, 4 octaves)
- Opacity 0.022 — barely perceptible, adds analog warmth
- Fixed position so it doesn't scroll with content

### Dividers & Rules
- Horizontal rules: 1px solid `var(--line)` for section boundaries
- Work items: top border on each, bottom border on last
- Accent bar on work hover: 3px vertical bar, slides in via `scaleY(0)` → `scaleY(1)`

### Selection Style
```css
::selection {
  background-color: var(--text-primary);
  color: var(--bg);
}
```

---

## Custom Cursor

### Implementation
- 10px solid dot, no ring
- `mix-blend-mode: exclusion` with white background — inverts to dark on cream, light on dark backgrounds
- Grows to 14px on interactive elements (`.hovering` class)
- Tracks mouse with `requestAnimationFrame`
- Hidden on mobile (`ontouchstart` detection + CSS `display: none` at 768px)

### Cursor Lessons Learned
- `mix-blend-mode: difference` with dark cursor on cream = invisible (math: #141414 difference on #F2EDE8 ≈ cream)
- Solution: white cursor + `exclusion` blend mode — works on both light and dark backgrounds
- Never use custom cursor on touch devices

---

## Header Pattern

### Fixed Header with Blend Mode
```css
.header {
  position: fixed;
  mix-blend-mode: difference;
  color: var(--bg); /* cream — inverts to dark on cream, stays light on dark */
}
```
- On cream backgrounds: text inverts to near-black
- On dark project hero backgrounds: text stays light
- Mobile: switch to `mix-blend-mode: normal` with semi-transparent cream background + backdrop-filter blur

### Navigation
- Uppercase, small, tracked-out links
- Underline reveal on hover (::after pseudo-element)
- Use absolute paths (`/#work`) not hash-only (`#work`) so links work from sub-pages

---

## Responsive Strategy

### Breakpoints
- **1024px**: collapse capabilities grid to single column
- **768px**: main mobile breakpoint — single columns, smaller type, no custom cursor
- **480px**: micro adjustments for very small screens

### Mobile Patterns
- Custom cursor hidden
- Header switches from blend-mode to solid background with blur
- All multi-column grids → single column
- Gallery split/offset → single column
- Work category moves below title with left margin
- Hero title scales down aggressively
- Contact links stack vertically

---

## Architecture & Tech Stack

### Stack
- **Next.js 16+** (App Router, TypeScript)
- **GSAP 3.14+** with ScrollTrigger
- **Lenis 1.3+** for smooth scroll
- **Fontshare CDN** for fonts (no next/font overhead)
- **Vanilla CSS** with custom properties (no Tailwind)

### File Structure
```
app/
├── layout.tsx          (root layout, metadata)
├── page.tsx            (homepage)
├── globals.css         (entire design system + all section styles)
└── work/[slug]/
    └── page.tsx        (dynamic case study route)

components/
├── Header.tsx
├── Hero.tsx
├── WorkSection.tsx
├── ServicesSection.tsx
├── AboutSection.tsx
├── ContactSection.tsx
├── CaseStudy.tsx
├── Footer.tsx
├── CustomCursor.tsx
└── SmoothScroll.tsx

lib/
└── projects.ts         (project data + types)
```

### Key Patterns
- **Server components** for pages (data fetching, metadata)
- **Client components** for anything with GSAP, event handlers, or refs
- **`generateStaticParams`** for pre-rendering all project pages
- **`generateMetadata`** for dynamic page titles/descriptions
- **Project data in TypeScript** — no CMS, no API calls, just a typed array
- **CSS custom properties** for the entire design system — change variables, change everything
- **BEM naming** for CSS classes (`.block__element--modifier`)

### Deployment
- Dev: `next dev -p 3335` with Turbopack
- Production: Vercel (static export compatible)

---

## Design Philosophy

### "Art school designer meets Hamptons modern luxury meets simplicity meets architectural linework"

This translates to:
1. **Restraint over excess** — generous whitespace, minimal elements
2. **Typography carries the design** — big, bold, geometric type does the heavy lifting
3. **Warm, not cold** — cream backgrounds, gold accents, warm grays (never blue-gray)
4. **Architectural precision** — clean lines, intentional spacing, grid-based layouts
5. **Motion as punctuation** — animations are subtle and purposeful, not decorative
6. **Dark/light contrast** — project heroes use dark backgrounds for dramatic shift from cream

### Anti-Patterns to Avoid
- Purple gradients on white (classic AI slop)
- Rounded cards with drop shadows
- Stock photography or placeholder images
- Hamburger menus on desktop
- Parallax for the sake of parallax
- Excessive micro-interactions
- Generic sans-serif stacks

---

## Reference Sites (Aesthetic Alignment)

### Luxury / Architectural
- **Studio Freight** — GSAP mastery, bold typography, smooth scrolling
- **Locomotive** — clean grid systems, scroll-triggered reveals
- **Aristide Benoist** — minimal portfolio, large type, restrained motion
- **Fig** — editorial meets luxury, strong typographic hierarchy

### Techniques Worth Studying
- **Split-text character animations** — creates premium feel on hero sections
- **Scale-reveal on images** — image starts at 1.05 scale, animates to 1.0 on scroll
- **Accent bar reveals** — thin vertical bar slides in on hover (scaleY transition)
- **Staggered list reveals** — items appear one-by-one with 0.1–0.15s delay
- **Font-weight transitions** — text gets bolder on hover for subtle emphasis
- **Gradient overlays on hero** — transparent → dark gradient at bottom for text legibility on colored backgrounds
