# taylor.maison — Complete Build Prompt

> The definitive prompt for building the personal creative studio site for **Taylor Maison** at `taylor.maison`. This document contains everything needed to reproduce the site from scratch at the highest quality level: design philosophy, technical stack, full design system, component architecture, copy, data, animation system, and page structure.

---

## 1. WHO IS TAYLOR MAISON

Taylor Maison is a creative director, web designer, and systems builder based between **Los Angeles** and **Southampton, New York** (the Hamptons). He is not a traditional web designer. His background spans:

- **Estate management** inside ultra-high-net-worth environments
- **Seven years** in film and television production
- **Founder-side** brand, content, and community strategy
- **Custom web builds** and workflow systems

That background shows up in the digital work: calmer hierarchy, sharper editing, and systems that feel considered rather than bolted on.

**Clients:** Private security firms, hospitality brands, original IP projects, event brands, and founder-led businesses — all operating in the East End / Hamptons ecosystem and beyond.

**Services (three lanes):**
1. **Review + direction** (From $3K) — Positioning, hierarchy, copy, design direction, targeted updates
2. **Identity + site** (From $8K) — Custom design system, full custom site, motion/pacing, content framework
3. **Site + systems** (From $15K) — Custom website, intake/routing/proposal support, automation/AI where useful, operating layer behind the front end

**Email:** hello@taylor.maison
**X (Twitter):** @tMAIS0N
**LinkedIn:** taylor-florio-07a65036

---

## 2. DESIGN PHILOSOPHY

> "A premium site should feel specific, calm, and impossible to confuse with a template."

> "Luxury is not gold gradients and overstatement. It is clarity, spacing, type, restraint, and knowing what to leave out."

### Three operating principles:
1. **Restraint beats noise.**
2. **Great type does more work than extra decoration.**
3. **A stronger first impression means less explaining later.**

### The visual identity:
- **Warm, not cold.** The palette is linen and stone — organic warmth, never clinical.
- **Calm, not boring.** Motion exists to establish timing and hierarchy, never to dazzle.
- **Considered, not decorated.** Every element earns its place. No ornament for its own sake.
- **Architectural.** The grid, spacing, and structure should feel like a well-designed room — proportioned, balanced, breathable.
- **Silver, never gold.** The accent is a muted steel-blue `#5e6c7a`. Taylor explicitly dislikes gold tones.

### What this site is NOT:
- Not a SaaS landing page. No feature grids, no product screenshots, no "trusted by" logos.
- Not a loud portfolio. No flashy transitions, parallax overkill, or WebGL noise.
- Not a template. Every section is purpose-built. BEM class naming, no utility framework.
- Not a blog or content site. It's a single-page portfolio with case study detail pages.

---

## 3. TECH STACK

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16** | App Router, Turbopack dev server |
| Language | **TypeScript** | Strict mode |
| Styling | **Vanilla CSS** | Single `globals.css`, BEM naming, CSS custom properties |
| Fonts | **Clash Display** (display) + **Satoshi** (body) | Via Fontshare CDN |
| Animation | **GSAP 3** | ScrollTrigger for scroll reveals, timelines for hero |
| Smooth scroll | **Lenis** | Duration 1.2, exponential easing |
| Routing | Next.js file-based | `/` (home) + `/work/[slug]` (case studies) |
| Images | Static `/public/images/` | No CMS, no optimization pipeline yet |
| Deployment | Vercel (planned) | Port 3335 for local dev |

**No Tailwind. No CSS modules. No styled-components. No Framer Motion.** Just vanilla CSS with custom properties and GSAP.

---

## 4. DESIGN SYSTEM (CSS Custom Properties)

```css
:root {
  /* ── Colors ────────────────────────────────── */
  --bg: #eeebe5;                          /* Warm linen background */
  --bg-strong: #e7e3dc;                   /* Slightly darker surface */
  --surface: rgba(255, 255, 255, 0.52);   /* Glass cards */
  --surface-strong: rgba(255, 255, 255, 0.72);
  --surface-dark: rgba(16, 18, 22, 0.72);
  --text-primary: #151410;                /* Near-black, warm undertone */
  --text-secondary: #5f5851;              /* Body copy */
  --text-muted: #958d84;                  /* Labels, metadata */
  --line: rgba(21, 20, 16, 0.12);         /* Subtle dividers */
  --line-strong: rgba(21, 20, 16, 0.2);   /* Prominent dividers */
  --accent: #5e6c7a;                      /* Steel-blue accent — NOT gold */
  --accent-soft: rgba(94, 108, 122, 0.12);
  --charcoal: #121418;                    /* Dark sections */
  --charcoal-soft: #1a1f26;
  --mist: rgba(255, 255, 255, 0.14);      /* White wash overlays */
  --success: #c6d5b0;                     /* Sage green status indicators */

  /* ── Typography ────────────────────────────── */
  --font-display: 'Clash Display', 'Helvetica Neue', sans-serif;
  --font-body: 'Satoshi', 'Helvetica Neue', sans-serif;

  --text-hero: clamp(3.6rem, 9vw, 8.8rem);
  --text-display: clamp(2.3rem, 5vw, 4.8rem);
  --text-heading: clamp(1.5rem, 2.8vw, 2.4rem);
  --text-body: clamp(1rem, 1.2vw, 1.08rem);
  --text-small: clamp(0.8rem, 0.95vw, 0.92rem);
  --text-micro: 0.75rem;

  /* ── Spacing ───────────────────────────────── */
  --space-xs: clamp(0.75rem, 1vw, 0.9rem);
  --space-sm: clamp(1rem, 1.6vw, 1.4rem);
  --space-md: clamp(1.8rem, 3vw, 2.8rem);
  --space-lg: clamp(3.2rem, 6vw, 5.8rem);
  --space-xl: clamp(5rem, 9vw, 8rem);
  --space-2xl: clamp(6rem, 12vw, 10rem);

  /* ── Layout ────────────────────────────────── */
  --container-max: 1320px;
  --container-padding: clamp(1.25rem, 4vw, 3.5rem);

  /* ── Shape ─────────────────────────────────── */
  --radius-sm: 18px;
  --radius-md: 28px;
  --radius-lg: 44px;

  /* ── Shadows ───────────────────────────────── */
  --shadow-soft: 0 18px 50px rgba(17, 15, 11, 0.08);
  --shadow-strong: 0 32px 100px rgba(17, 15, 11, 0.16);

  /* ── Easing ────────────────────────────────── */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Background treatment:
- Body uses a **layered radial gradient** over a warm linear gradient (top: `#f2efe9` → bottom: `#ebe7df`)
- A **fixed SVG noise texture overlay** at `opacity: 0.018` via `body::after` — adds analog film grain
- Dark sections (Systems, Contact) use `--charcoal` with their own radial gradient accents

### Typography rules:
- Font import: `https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=satoshi@300,400,500,700,900&display=swap`
- Display type: Clash Display, uppercase, tight tracking (`-0.035em` to `-0.05em`), line-height ~0.92–0.95
- Body type: Satoshi, sentence case, generous line-height (1.65–1.75)
- Labels/metadata: `--text-micro` (0.75rem), weight 700, uppercase, letter-spacing 0.14–0.18em
- Section labels get a 32px horizontal rule before the text via `::before` pseudo-element

### Selection style:
```css
::selection {
  background: var(--text-primary);
  color: var(--bg);
}
```

---

## 5. ANIMATION SYSTEM (GSAP)

### Core pattern — every section follows this:

```tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SomeSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.some-class > *',
        { autoAlpha: 0, y: 28 },          // FROM: hidden + shifted down
        {
          autoAlpha: 1,                     // TO: visible
          y: 0,                             // TO: in position
          duration: 0.85,                   // ~0.7–0.95s
          ease: 'power3.out',              // Always power3.out
          stagger: 0.08,                   // Children cascade in
          clearProps: 'all',               // Clean up inline styles after
          scrollTrigger: {
            trigger: '.some-class',
            start: 'top 80%',              // Fire when 80% down viewport
          },
        }
      )
    }, sectionRef)                          // Scope to section ref

    return () => ctx.revert()               // Clean up on unmount
  }, [])
  // ...
}
```

### Critical rules:
1. **`autoAlpha`** — always use instead of raw `opacity`. It manages `visibility: hidden` ↔ `visible` automatically.
2. **Initial state in JSX** — every animated element needs `style={{ opacity: 0, visibility: 'hidden' }}` inline to prevent flash of unstyled content before GSAP kicks in.
3. **`clearProps: 'all'`** — always include. Removes GSAP inline styles after animation completes so CSS takes over cleanly.
4. **`gsap.context(fn, ref)`** — always scope to a ref. This ensures cleanup only affects this section's animations.
5. **Play once only** — default GSAP ScrollTrigger behavior. No `toggleActions`, no replay on scroll back. Taylor explicitly does not want replay behavior.
6. **Easing** — `power3.out` for reveals, `sine.inOut` for infinite loops (orbs), `var(--ease-out)` for CSS transitions.
7. **Stagger** — 0.08 for text elements, 0.1–0.12 for cards/blocks.
8. **Y offset** — 24–48px depending on element size. Larger elements get more offset.

### Hero-specific animation:
The hero uses a **GSAP timeline** (not standalone fromTo) with a 0.2s delay, sequencing title lines → practice items with overlap (`'-=0.45'`).

### Hero floating orbs:
Two decorative gradient orbs with infinite yoyo animation:
```tsx
gsap.to('.hero__orb--one', {
  y: -30, x: 24, duration: 6,
  repeat: -1, yoyo: true, ease: 'sine.inOut',
})
gsap.to('.hero__orb--two', {
  y: 20, x: -18, duration: 7,
  repeat: -1, yoyo: true, ease: 'sine.inOut',
})
```

---

## 6. SMOOTH SCROLL (Lenis)

```tsx
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Handle anchor links — intercept all #hash links
document.querySelectorAll('a[href^="#"]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.querySelector(el.getAttribute('href')!)
    if (target) lenis.scrollTo(target as HTMLElement, { offset: -100 })
  })
})
```

---

## 7. PAGE STRUCTURE

### Homepage (`/`)

**Section order (top to bottom):**
1. **Header** — Fixed glass morphism bar
2. **Hero** — Full-width intro with title, specs panel, practice items
3. **WorkSection** — Case study entries (4 projects)
4. **SystemsSection** — Dark section, workflow steps + example panel
5. **AboutSection** — Photo + bio + credentials
6. **ServicesSection** — Three pricing tiers
7. **ContactSection** — Dark CTA card
8. **Footer** — Wordmark + links

### Case Study Pages (`/work/[slug]`)

**Section order:**
1. **Header** (same component, smart anchoring via `usePathname`)
2. **Case Hero** — Full-bleed colored background, title, headline, meta
3. **Case Overview** — Sidebar (audience, signature move, services) + brief text
4. **Case Impact** — "What changed" + highlights grid
5. **Case Challenge** — Extended narrative
6. **Case Gallery** — Mixed-layout image grid (full/split/offset)
7. **Case Next** — Link to next project (cycles through)
8. **Footer**

---

## 8. COMPONENT SPECIFICATIONS

### 8.1 Header

**Layout:** Fixed, `z-index: 200`, padded from top. Shell is a `border-radius: 26px` glass card with `backdrop-filter: blur(18px)`, warm-toned `rgba(242, 239, 233, 0.82)` background, subtle border and shadow.

**Grid:** `auto 1fr auto` — brand (left), nav (center), CTA (right).

**Brand mark:** 40px circle with "TM" monogram, `border-radius: 999px`, semi-transparent white background. Adjacent: "TAYLOR MAISON" (Clash Display, 0.95rem, weight 700) + "Southampton / Los Angeles" subtitle.

**Nav links:** Work, Systems, About, Contact. Uppercase, micro type, pill-shaped hover state (white background fade in, -1px translateY). `border-radius: 999px`.

**CTA button:** "Contact" — bordered pill, same hover behavior.

**Smart anchoring:** Uses `usePathname()`. On homepage, links are `#section`. On case study pages, links are `/#section` to navigate back.

**Responsive:**
- At 900px: nav links hide, grid becomes `auto auto` (brand + CTA only)
- At 720px: brand copy (name + subtitle) hides, only TM circle remains

### 8.2 Hero

**Layout:** Two-column grid (`1.05fr` copy / `0.95fr` panel, min 320px). Backdrop with two floating gradient orbs and a fading grid overlay.

**Content stack:**
1. Section label: "Taylor Maison"
2. Kicker: "Creative direction, websites, and systems. Southampton in season."
3. Title (3 lines, each wrapped for animation):
   - "Creative direction"
   - "and digital presence"
   - **"for the East End."** (accent color)
4. Lede paragraph
5. Two CTAs: "Selected work" (solid dark) + "Send a brief" (bordered glass)

**Side panel:** "Studio notes" header, three spec rows (Based, Works with, Builds) separated by thin lines.

**Practice bar:** Three-column grid below the main content. Direction, Websites, Systems — each with title + description. Separated from hero by `--line-strong` border-top.

### 8.3 WorkSection

**Intro:** Two-column — section label ("Selected work") on left, description on right.

**Entries:** Each project is a `<Link>` to `/work/[slug]`. Alternating layout: odd entries are normal (media left, content right), even entries are reversed.

**Entry structure:**
- Media: `border-radius: 30px`, `aspect-ratio: 16/10`, background `color-mix()` with project color, image scales to 1.035 on hover
- Meta row: index (01, 02...), category, year
- Title: Clash Display, clamp(2.2rem → 4rem)
- Summary paragraph
- Impact paragraph
- Highlights grid: 3-column, each in a bordered pill card with `border-radius: 20px`
- "Open case study" link

**Per-project color:** Each project has a `--project-color` CSS custom property set via inline style.

### 8.4 VoiceMoment

**Container:** Glass card (`voice__frame`) with white-to-transparent gradient background, subtle border and shadow, `border-radius: var(--radius-lg)`.

**Content:**
1. Section label: "Operating principle"
2. Headline: "A premium site should feel specific, calm, and impossible to confuse with a template."
3. Supporting copy: "Luxury is not gold gradients and overstatement. It is clarity, spacing, type, restraint, and knowing what to leave out."
4. Three principle cards in a 3-column grid, each with `border-radius: var(--radius-sm)`, semi-transparent white background

### 8.5 SystemsSection

**This is a dark section.** Background: `rgba(15, 18, 24, 0.98)` gradient with border, `border-radius: calc(var(--radius-lg) - 6px)`, box-shadow. Text color: `#f2eee7`.

**Intro:** Two-column — section label + title on left, description on right. Title: "Some projects need more than a site."

**Board:** Two-column grid. Left: flow of 4 steps (Intake, Routing, Prep, Follow-through). Right: "Example workflow" panel showing 4 status lines (captured, sorted, drafted, queued) with sage green status text, plus a summary paragraph.

**Dark section text colors:** Labels and secondary text use `rgba(244, 239, 231, 0.74)`. Status indicators use `--success` (#c6d5b0).

### 8.6 AboutSection

**Layout:** Two-column grid (photo left, content right).

**Photo column:**
- Image: `aspect-ratio: 4/5`, `border-radius: calc(var(--radius-lg) - 8px)`, strong shadow
- Floating card overlay (absolute, bottom-right): "Base" label + "Los Angeles now. Southampton through the season." — glass morphism with `backdrop-filter: blur(16px)`

**Content column:**
1. Section label: "About Taylor"
2. Title: "The background is not traditional web design."
3. Two body paragraphs about Taylor's background
4. Credentials grid: 2-column, 4 items, each with left border-top line + accent-colored dot bullet

### 8.7 ServicesSection

**Intro:** Two-column — section label + title on left, description on right. Title: "Most projects land in one of three lanes."

**Cards:** Three horizontal cards stacked vertically, separated by `--line-strong` borders. Each card is a two-column grid (main info left, deliverables list right).

**Card structure:**
- Head: name + price (both micro type, uppercase)
- Summary paragraph
- Itemized list with accent-colored dot bullets

**Three tiers:**
1. Review + direction — From $3K
2. Identity + site — From $8K
3. Site + systems — From $15K

### 8.8 ContactSection

**This is a dark section.** Container card with `border-radius: var(--radius-lg)`, charcoal gradient background with sage-green radial accent, strong shadow.

**Layout:** Two-column grid. Left: label + title + description. Right: panel card with two full-width buttons + fit notes.

**Title:** "If you already have a site, send the link."

**Buttons:**
- Primary: "Send the brief" — light on dark, `mailto:hello@taylor.maison?subject=Project inquiry`
- Secondary: "hello@taylor.maison" — bordered, transparent

**Fit notes:** Three bullet points with sage-green dots.

### 8.9 Footer

**Layout:** Flex, space-between. Left: wordmark + note. Right: email + social links (X, LinkedIn, Back to top).

**Bottom bar:** Copyright + "Built for the Hamptons and beyond."

### 8.10 CaseStudy (detail page)

**Hero:** Full-bleed section, `min-height: 92vh`, background set to `project.color`. Overlay gradient for text readability. Content: category, title (massive display type), headline, meta row (year, services joined by ·, live link if available).

**Overview:** Two-column — sidebar with metadata (Audience, Signature move, Services, Live link) + main brief text.

**Impact:** "What changed" section with large display text + 3-column highlights grid (glass cards).

**Challenge:** Single-column narrative section.

**Gallery:** Mixed layouts — `full` (1 column), `split` (2 equal columns), `offset` (1.15fr / 0.85fr). Images are aspect-ratio containers with cover images, labels overlaid at bottom-left, hover scale 1.04.

**Next project:** Centered section linking to the next project in the array (cycles back to first).

---

## 9. PROJECT DATA

Four case studies, each with this interface:

```typescript
interface Project {
  slug: string
  title: string
  category: string
  year: string
  description: string
  color: string           // Background color for hero + media
  url?: string            // Live site URL (optional)
  thumbnail: string       // Path to thumbnail image
  headline: string        // Case study hero subhead
  audience: string        // Who the work serves
  signatureMove: string   // The key creative decision
  impact: string          // What changed
  highlights: { label: string; value: string }[]
  brief: string           // Full project brief (2-3 sentences)
  challenge: string       // The creative/technical challenge (2-3 sentences)
  services: string[]      // Service tags
  gallery: {
    layout: 'full' | 'split' | 'offset'
    items: { label: string; aspect: string; image?: string }[]
  }[]
}
```

### Project 1: Roman Sanford
- **Category:** Web Design / Digital Security
- **Year:** 2026
- **Color:** `#232323`
- **URL:** romansanford.vercel.app
- **Headline:** "A digital presence engineered to build trust before a single conversation begins."
- **Impact:** "Roman Sanford went from generic web presence to a site that feels like quiet intelligence infrastructure."
- **Highlights:** Signal (Authority without noise), Build (Custom Next.js front-end), Focus (Trust before contact)

### Project 2: RS Black
- **Category:** Web Design / Brand Identity
- **Year:** 2026
- **Color:** `#0a0a0a`
- **Headline:** "A classified-feeling digital experience for an offer that should never feel public."
- **Impact:** "The site behaves less like a pitch deck and more like a litmus test for exactly the right kind of visitor."
- **Highlights:** Mood (Controlled darkness), Role (Brand filter, not brochure), Result (Exclusivity without cliche)

### Project 3: Genuine Undead
- **Category:** Creative Direction / IP Development
- **Year:** 2025-2026
- **Color:** `#17352b`
- **URL:** genuineundeadcomics.com
- **Headline:** "Creative direction, narrative architecture, and digital world-building for an original comic universe."
- **Impact:** "The project became more than a comic site — it reads like the front door to an expanding universe."
- **Highlights:** Scope (Brand, product, and narrative), Experience (Immersive reader storytelling), World (A unified identity across eras)

### Project 4: Hampton Garden Party
- **Category:** Web Design / Brand Strategy
- **Year:** 2026
- **Color:** `#536648`
- **Headline:** "A Hamptons-facing brand system designed to sell a feeling before the client asks for details."
- **Impact:** "The work gives a local luxury brand the kind of visual calm that makes people assume the experience itself will be handled well."
- **Highlights:** Market (Hamptons and East End hospitality), Mood (Warm, editorial, unhurried), Use (Brand world for web and collateral)

---

## 10. RESPONSIVE BREAKPOINTS

Three breakpoints, mobile-down:

### 1180px (tablet landscape)
- All two-column grids collapse to single column (hero, systems, contact, about, services, case overview)
- Practice items and impact cards go to 2-column
- Services cards stack vertically

### 900px (tablet portrait)
- Header nav links hide (brand + CTA only)
- Voice principles, about credentials, and detail grids go single column
- Footer stacks vertically, text aligns left

### 720px (mobile)
- Container padding shrinks to 1rem
- Header shell compact, brand copy hides (TM circle only)
- Hero title shrinks: `clamp(2.9rem, 12vw, 4.8rem)`
- Practice items, gallery grids, hero actions all go single column
- About media card becomes static (not absolute positioned)
- Smaller internal padding on cards and panels
- Case hero min-height reduces to 76vh

---

## 11. FILE STRUCTURE

```
taylor-maison-site/
├── app/
│   ├── layout.tsx              # Root layout, metadata, globals.css import
│   ├── page.tsx                # Homepage — all sections composed here
│   ├── globals.css             # Complete design system + all component styles
│   └── work/
│       └── [slug]/
│           └── page.tsx        # Case study page with generateStaticParams
├── components/
│   ├── Header.tsx              # Glass morphism fixed header
│   ├── Hero.tsx                # Two-column hero with orbs + practice bar
│   ├── WorkSection.tsx         # Case study entries with alternating layout
│   ├── VoiceMoment.tsx         # Operating principle glass card
│   ├── SystemsSection.tsx      # Dark section — workflow steps + panel
│   ├── AboutSection.tsx        # Photo + bio + credentials
│   ├── ServicesSection.tsx     # Three pricing tiers
│   ├── ContactSection.tsx      # Dark CTA card
│   ├── Footer.tsx              # Wordmark + links
│   ├── CaseStudy.tsx           # Full case study detail layout
│   └── SmoothScroll.tsx        # Lenis initialization
├── lib/
│   └── projects.ts             # Project data + TypeScript interfaces
├── public/
│   └── images/
│       ├── taylor-headshot.jpg
│       └── projects/
│           ├── roman-sanford/  # hero.png, services.png, gallery.png, cta.png
│           ├── rs-black/       # hero.png, modules.png, gallery.png, cta.png
│           ├── genuine-undead/ # hero.png, characters.png, timeline.png, community.png
│           └── hampton-garden-party/ # hero.png
├── package.json
└── tsconfig.json
```

---

## 12. METADATA

```tsx
export const metadata: Metadata = {
  title: 'Taylor Maison — Creative Direction, Websites, Systems',
  description: 'Creative direction, custom websites, and operating systems for East End and founder-led businesses.',
  openGraph: {
    title: 'Taylor Maison',
    description: 'Creative direction, custom websites, and operating systems for the East End.',
    type: 'website',
  },
}
```

Case study pages: `"${project.title} - Taylor Maison"` with project description.

---

## 13. INTERACTION DETAILS

### Hover states:
- All buttons/links: `translateY(-1px)` on hover, `0.35s var(--ease-out)` transition
- Work entry images: `scale(1.035)` on hover, `0.65s var(--ease-out)`
- Gallery images: `scale(1.04)` on hover
- Nav links: white background fade appears, subtle lift
- Work entries: entire card lifts `-2px`

### Container rhythm:
- Every `main > section` and `.footer` gets `width: min(100%, var(--container-max) + (var(--container-padding) * 2))` with auto margins and side padding
- Vertical spacing between sections uses `--space-lg` to `--space-xl` padding (top and bottom)
- No section has an `id` unless it's a nav anchor target

### Dark section rules:
When a section has a dark background (Systems, Contact):
- All text inverts to light (`#f2eee7` or `rgba(244, 239, 231, 0.74)`)
- Section labels get overridden: label text AND `::before` rule color
- Status/success indicators use `--success` (#c6d5b0)
- Borders use `rgba(255, 255, 255, 0.08–0.12)` instead of dark line tokens
- Cards within use `rgba(255, 255, 255, 0.03–0.07)` background

---

## 14. COPY REFERENCE

### Hero title:
```
Creative direction
and digital presence
for the East End.
```

### Hero lede:
"Selected work spans private security, hospitality, original IP, and event brands. The assignment is usually the same: make the business feel more composed, more established, and easier to trust online."

### Voice moment headline:
"A premium site should feel specific, calm, and impossible to confuse with a template."

### Systems title:
"Some projects need more than a site."

### About title:
"The background is not traditional web design."

### Services title:
"Most projects land in one of three lanes."

### Contact title:
"If you already have a site, send the link."

### Footer tagline:
"Creative direction, custom websites, and systems from Southampton and Los Angeles."

### Copyright:
"© 2026 Taylor Maison. Built for the Hamptons and beyond."

---

## 15. KNOWN CONSTRAINTS AND PREFERENCES

1. **No gold.** The accent is steel-blue `#5e6c7a`. Taylor explicitly dislikes gold.
2. **No scroll replay.** Animations play once on first scroll, never replay when scrolling back.
3. **No Tailwind.** Pure vanilla CSS. BEM naming. Single globals.css file.
4. **No CMS.** All content is hardcoded in components and `lib/projects.ts`.
5. **Lenis smooth scroll** is non-negotiable. Anchor links use `lenis.scrollTo()` with `-100` offset.
6. **GSAP `autoAlpha` pattern** with inline hidden styles is the reveal mechanism everywhere.
7. **Mobile nav** hides at 900px — no hamburger menu built yet.
8. **Images** are static in `/public/images/`. No `next/image` optimization.
9. **Dev server** runs on port 3335 and crashes frequently (exit 144). Just restart.
10. **ColorShift and CustomCursor components exist** in the codebase but are **not currently rendered** in page.tsx. They may be re-added later.

---

## 16. QUALITY CHECKLIST

When building or reviewing, verify:

- [ ] Every animated element has `style={{ opacity: 0, visibility: 'hidden' }}` inline
- [ ] Every GSAP `fromTo` uses `autoAlpha` (not raw `opacity`)
- [ ] Every GSAP animation includes `clearProps: 'all'`
- [ ] Every `useEffect` with GSAP uses `gsap.context(fn, ref)` and returns `ctx.revert()`
- [ ] No `toggleActions` on any ScrollTrigger (play-once only)
- [ ] Dark sections override light text tokens AND section-label `::before` color
- [ ] All containers respect `--container-max` and `--container-padding`
- [ ] All border-radius values use design tokens (`--radius-sm/md/lg`) or explicit values
- [ ] Fonts load via Fontshare CDN `@import` at top of globals.css
- [ ] Body has noise overlay via `::after` pseudo-element
- [ ] All three breakpoints are tested (1180px, 900px, 720px)
- [ ] Case study pages generate static params and have proper metadata
- [ ] Lenis handles all anchor link navigation with offset
- [ ] No gold anywhere in the palette

---

*This prompt is the source of truth for taylor.maison. If something contradicts this document, this document wins.*
