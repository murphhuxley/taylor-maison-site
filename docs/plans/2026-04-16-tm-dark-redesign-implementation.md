# TM Dark Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Taylor Maison portfolio site as a dark / bold / typography-forward experience, relocating the ferrofluid orb to a dedicated `/contact` page, adopting the JACK Framer template's stacked-row work section, and stripping pricing from services.

**Architecture:** Next.js 16 App Router + React 19, GSAP for motion, Lenis for smooth scroll. The redesign is a token-swap + component-rebuild pass — design system tokens in `globals.css` flip first (makes the whole site dark instantly), then each section is rebuilt in order of visual impact. Two new pages (`/contact`, `/work`) are added; no data shape changes.

**Tech Stack:** Next.js 16.1.6, React 19.2.4, TypeScript 5.9.3 strict, GSAP 3.14.2 (ScrollTrigger + SplitText), Lenis 1.3.18, React Three Fiber 9.5.0 (only on `/contact`), Cabinet Grotesk + Satoshi fonts.

**Reference design doc:** `docs/plans/2026-04-16-tm-dark-redesign-design.md`
**Reference site:** https://jack-template.framer.website/

---

## Pre-flight

### Task 0: Set up working environment

**Files:** None (environment check only)

**Step 1:** Verify dev server runs clean from current state.

```bash
cd /Users/murphhuxley/.openclaw/workspace/projects/taylor-maison-site
npm run dev
```

Expected: Server starts on `http://localhost:3335`. Confirm homepage loads without errors in the browser.

**Step 2:** Kill the dev server. Take a baseline screenshot of the current warm/cream homepage at desktop width — save as `docs/screenshots/baseline-home-desktop.png`. This is the "before" reference for comparison at the end.

**Step 3:** Confirm git status is clean. If not, Taylor decides what to do with existing changes before proceeding.

```bash
git status
```

Expected: `nothing to commit, working tree clean`. If dirty, pause and ask Taylor.

**Step 4:** Create the screenshots directory if it doesn't exist.

```bash
mkdir -p docs/screenshots
```

**Step 5:** No commit — this is setup.

---

## Phase 1: Design tokens (globals.css)

Replacing the `:root` variables flips the entire site to dark in one step. The site will look broken after this phase — that's expected. Subsequent phases rebuild each component against the new palette.

### Task 1.1: Read current globals.css in full

**Files:**
- Read: `app/globals.css`

**Step 1:** Read the entire file. Note the exact location of the `:root` block and any section-scoped custom properties (e.g., `.voice-moment`, `.hero`) that reference the old tokens.

**Step 2:** No changes. Understanding step only.

### Task 1.2: Replace :root color tokens

**Files:**
- Modify: `app/globals.css` (the `:root` block)

**Step 1:** In `app/globals.css`, replace the existing color custom properties in `:root` with the new dark palette. Preserve any other variables (spacing, easing, etc.) untouched.

New color block:

```css
:root {
  /* dark redesign palette — replaces warm cream system */
  --bg: #0a0a0c;
  --bg-elevated: #14161a;
  --surface: rgba(255, 255, 255, 0.04);
  --text-primary: #f4f4f5;
  --text-secondary: #a8b5c2;
  --text-muted: #6a7581;
  --accent: #8FA3B8;
  --accent-bright: #C8D4E0;
  --line: rgba(168, 181, 194, 0.12);
  --metallic-grad: linear-gradient(180deg, #f4f4f5 0%, #8FA3B8 100%);
  --charcoal: #0d1015;           /* retained for edge/debug only */
  --shadow-soft: 0 24px 60px rgba(0, 0, 0, 0.4);

  /* existing tokens — keep unchanged */
  /* --font-display, --font-body, spacing, easing, container, etc. */
}
```

**Step 2:** Start the dev server. Visually confirm the page is now dark. Most sections will look broken — that's correct.

```bash
npm run dev
```

**Step 3:** Screenshot: `docs/screenshots/phase1-tokens-swapped.png` (expect visual chaos)

**Step 4:** Prepare commit. Present to Taylor for approval before committing.

```bash
git add app/globals.css
# draft message — await Taylor's approval before running:
# git commit -m "refactor(design-tokens): swap to dark palette base"
```

### Task 1.3: Bump type scale

**Files:**
- Modify: `app/globals.css` (type scale variables)

**Step 1:** Update the type scale variables in `:root`:

```css
--text-hero:     clamp(4.5rem, 14vw, 12rem);   /* was clamp(3.6rem, 9vw, 8.8rem) */
--text-display:  clamp(2.8rem, 7vw, 6rem);     /* was clamp(2.3rem, 5vw, 4.8rem) */
--text-heading:  clamp(1.6rem, 2.8vw, 2.4rem); /* unchanged but restated for clarity */
--text-body:     clamp(1rem, 1.2vw, 1.08rem);  /* unchanged */
--text-small:    clamp(0.75rem, 0.9vw, 0.85rem); /* new */
```

**Step 2:** Reload dev server, confirm hero headline now looks much bigger (still broken layout — that's OK).

**Step 3:** Screenshot: `docs/screenshots/phase1-type-scale-bumped.png`

**Step 4:** Prepare commit, await approval.

```bash
git add app/globals.css
# git commit -m "refactor(design-tokens): bump hero + display type scale"
```

### Task 1.4: Update legacy body + section styles that referenced old tokens

**Files:**
- Modify: `app/globals.css` (body, section rules, any hardcoded cream colors)

**Step 1:** Search `app/globals.css` for any hardcoded color values that need updating — particularly `#f4f0e8`, `#ece6de`, `rgba(21,24,27,...)`, gold/cream values that slipped past custom properties. Replace with the new tokens or remove.

**Step 2:** Ensure `body` has `background: var(--bg); color: var(--text-primary);`.

**Step 3:** Keep the SVG noise overlay — it still works on dark.

**Step 4:** Reload. Screenshot: `docs/screenshots/phase1-body-cleaned.png`

**Step 5:** Prepare commit, await approval.

```bash
git add app/globals.css
# git commit -m "refactor(design-tokens): clean legacy cream references in globals"
```

---

## Phase 2: Hero rebuild (highest-impact change)

Hero is the face of the site. Getting it right early makes the rest of the redesign feel coherent even while other sections still look rough.

### Task 2.1: Remove video background + Ferrofluid from Hero

**Files:**
- Modify: `components/Hero.tsx`

**Step 1:** Remove the `<video>` element and its `ref` callback setting playback rate. Remove the `Ferrofluid` import and its JSX usage inside `.hero__visual`.

**Step 2:** Remove the `notes` array and `.hero__notes` block (geography note moves to About in Phase 6).

**Step 3:** Remove the `.hero__visual` div entirely.

**Step 4:** Reload dev server. Hero should now be just text on dark — stripped but not yet rebuilt.

**Step 5:** Screenshot: `docs/screenshots/phase2-hero-stripped.png`

**Step 6:** Prepare commit, await approval.

```bash
git add components/Hero.tsx
# git commit -m "refactor(hero): remove video bg, ferrofluid, and notes strip"
```

### Task 2.2: Replace hero copy with locked name + tagline

**Files:**
- Modify: `components/Hero.tsx`

**Step 1:** Replace the current `<h1>` content (`"Creative direction and custom websites."`) with a two-line structure:

```tsx
<h1 className="hero__title">
  <span className="hero__name">TAYLOR MAISON</span>
  <span className="hero__tagline">BRAND. WEB. AI.</span>
</h1>
```

**Step 2:** Remove the `.hero__lede` paragraph entirely. The tagline replaces it.

**Step 3:** Remove the `.hero__eyebrow` span (name was there, now it's the hero).

**Step 4:** Reload. Expect hero to show two lines of text, not yet styled with metallic gradient.

**Step 5:** Screenshot: `docs/screenshots/phase2-hero-copy-swapped.png`

**Step 6:** Prepare commit, await approval.

### Task 2.3: Add metallic gradient CSS for hero text

**Files:**
- Modify: `app/globals.css` (add `.hero__name` and `.hero__tagline` rules)

**Step 1:** Add CSS for the metallic text effect using `background-clip: text`:

```css
.hero__name,
.hero__tagline {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 0.95;
  background: var(--metallic-grad);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: block;
  text-transform: uppercase;
}

.hero__tagline {
  font-size: clamp(2.8rem, 10vw, 9rem);   /* slightly smaller than name */
  margin-top: 0.1em;
}
```

**Step 2:** Reload. Confirm text now shows the silver gradient effect.

**Step 3:** Screenshot (desktop + mobile): `docs/screenshots/phase2-hero-metallic-desktop.png` + `phase2-hero-metallic-mobile.png`

**Step 4:** Prepare commit, await approval.

### Task 2.4: Build corner layout (tagline + CTA)

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `app/globals.css` (add `.hero__corner-*` rules)

**Step 1:** Add two corner elements to Hero — lower-left small tagline (placeholder copy), lower-right CTA pill:

```tsx
<div className="hero__corner hero__corner--bottom-left">
  <span className="hero__corner-label">CREATIVE DIRECTION</span>
</div>
<div className="hero__corner hero__corner--bottom-right">
  <a href="/contact" className="hero__cta">Start a conversation →</a>
</div>
```

**Step 2:** Add CSS positioning the `.hero` as `position: relative` and the corners as `position: absolute` at the bottom corners with appropriate padding.

**Step 3:** Style the CTA pill — silver-blue fill, dark text, rounded-full, subtle hover brightness lift:

```css
.hero__cta {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: var(--accent);
  color: var(--bg);
  font-family: var(--font-body);
  font-size: var(--text-small);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 999px;
  text-decoration: none;
  transition: filter 200ms ease;
}
.hero__cta:hover {
  filter: brightness(1.15);
}
```

**Step 4:** Reload. Confirm corners visible at the bottom of the hero.

**Step 5:** Screenshot: `docs/screenshots/phase2-hero-corners.png`

**Step 6:** Prepare commit, await approval.

### Task 2.5: Add GSAP SplitText scramble reveal

**Files:**
- Modify: `components/Hero.tsx` (GSAP timeline)

**Step 1:** Update the GSAP timeline in the `useEffect` to scramble-reveal the name and tagline on load. If the project doesn't already have `ScrambleTextPlugin` or `SplitText` registered, register them. GSAP 3.14 includes these as free plugins in recent versions — confirm via `import` and registration:

```tsx
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
gsap.registerPlugin(ScrambleTextPlugin)
```

**Step 2:** Replace the existing `tl.fromTo('.hero__eyebrow, .hero__title, ...')` with:

```tsx
tl.to('.hero__name', {
  duration: 1.2,
  scrambleText: { text: 'TAYLOR MAISON', chars: 'upperCase', speed: 0.4 },
  ease: 'power2.out',
})
.to('.hero__tagline', {
  duration: 1.0,
  scrambleText: { text: 'BRAND. WEB. AI.', chars: 'upperCase', speed: 0.5 },
  ease: 'power2.out',
}, '-=0.5')
.fromTo('.hero__corner', {
  autoAlpha: 0, y: 20,
}, {
  autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', clearProps: 'all',
}, '-=0.3')
```

**Step 3:** If ScrambleTextPlugin isn't available, fall back to a SplitText-style character-by-character reveal using `gsap.from('.hero__name', { autoAlpha: 0, y: 30, stagger: 0.02, duration: 0.9 })` — still declarative-feeling.

**Step 4:** Reload. Confirm scramble on load.

**Step 5:** Screenshot (mid-animation if possible, and final state): `docs/screenshots/phase2-hero-scramble.png`

**Step 6:** Prepare commit, await approval.

### Task 2.6: Hero visual verification at three breakpoints

**Files:** None (verification only)

**Step 1:** Using the playwright browser tool or browser dev tools, screenshot the hero at:
- Desktop: 1440×900
- Tablet: 768×1024
- Mobile: 390×844

**Step 2:** Visually verify:
- Text doesn't overflow horizontally at any breakpoint
- Metallic gradient is visible and not washed out
- Corners don't overlap the hero text
- CTA pill is thumb-reachable on mobile

**Step 3:** If any issue, fix before moving on.

**Step 4:** Save screenshots to `docs/screenshots/phase2-hero-final-{desktop,tablet,mobile}.png`.

**Step 5:** No commit — verification only.

---

## Phase 3: Header restyle + nav slim

### Task 3.1: Slim nav to WORK | ABOUT | CONTACT

**Files:**
- Modify: `components/Header.tsx`

**Step 1:** Remove the `Services` link from the nav pill. Update `CONTACT` to link to `/contact` (the new dedicated page). `WORK` and `ABOUT` still anchor to homepage sections — TransitionLink handles this.

**Step 2:** Reload. Confirm header shows three nav items.

**Step 3:** Screenshot: `docs/screenshots/phase3-header-slim.png`

**Step 4:** Prepare commit, await approval.

### Task 3.2: Restyle header for dark theme

**Files:**
- Modify: `app/globals.css` (header rules, `.tm-logo`, `.nav-pill`)

**Step 1:** Update header styles — nav pill background uses `var(--surface)`, border `1px solid var(--line)`, text `var(--text-primary)`. TM logo dot uses `var(--accent)`.

**Step 2:** Update hover states to use `var(--accent-bright)` with 200ms ease.

**Step 3:** Reload, confirm header is visible against dark bg without fighting the hero.

**Step 4:** Screenshot: `docs/screenshots/phase3-header-dark.png`

**Step 5:** Prepare commit, await approval.

### Task 3.3: Add mobile hamburger menu

**Files:**
- Modify: `components/Header.tsx` (add hamburger + mobile menu state)
- Modify: `app/globals.css` (mobile menu styles)

**Step 1:** Current behavior per CLAUDE.md: nav hides below 900px. Add a hamburger icon that appears below 900px, toggles a full-screen overlay menu with the same three nav links stacked vertically.

**Step 2:** Use React `useState` for menu open/closed. Animate overlay in via CSS transition (0.3s ease-out) or GSAP.

**Step 3:** Ensure menu closes on link click or backdrop click.

**Step 4:** Test at 390px width via browser dev tools.

**Step 5:** Screenshot mobile open + closed states: `docs/screenshots/phase3-mobile-menu-{open,closed}.png`

**Step 6:** Prepare commit, await approval.

---

## Phase 4: Work section rebuild (JACK pattern)

The single biggest structural change. Full-bleed stacked rows replacing the alternating list.

### Task 4.1: Read current WorkSection + projects data

**Files:**
- Read: `components/WorkSection.tsx`
- Read: `lib/projects.ts`

**Step 1:** Understand current structure and project data shape. Identify which 3 projects should appear on homepage (likely the 3 most polished — Roman Sanford, RS Black, Genuine Undead, but confirm with Taylor if unclear).

**Step 2:** No changes yet.

### Task 4.2: Rewrite WorkSection as 3 full-viewport rows

**Files:**
- Modify: `components/WorkSection.tsx` (full rewrite)

**Step 1:** Replace the alternating layout with a vertical stack of 3 `<article>` elements. Each article is full-viewport height with:

```tsx
<article className="work-row" key={project.slug}>
  <div className="work-row__inner">
    <div className="work-row__meta">
      <span className="work-row__tag">{project.tags.join(' · ')}</span>
    </div>
    <h2 className="work-row__title">{project.title}</h2>
    <TransitionLink href={`/work/${project.slug}`} className="work-row__image-link">
      <img
        src={project.thumbnail}
        alt={project.title}
        className="work-row__image"
      />
    </TransitionLink>
  </div>
</article>
```

**Step 2:** If `lib/projects.ts` doesn't have a `tags` field, either add one (requires data shape change — ask Taylor first) or derive tags from existing fields (e.g., `scope` or hardcode generic "WEB DESIGN · 2024" for now).

**Step 3:** Only render the first 3 projects. Add a "See all work →" link below that routes to `/work`.

### Task 4.3: Style work rows

**Files:**
- Modify: `app/globals.css` (add `.work-row` + children rules)

**Step 1:** Add CSS:

```css
.work-row {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl) var(--space-md);
}

.work-row__inner {
  max-width: var(--container-max);
  width: 100%;
}

.work-row__meta {
  margin-bottom: var(--space-sm);
}

.work-row__tag {
  font-family: var(--font-body);
  font-size: var(--text-small);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.work-row__title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 800;
  letter-spacing: -0.015em;
  line-height: 0.95;
  margin-bottom: var(--space-md);
  color: var(--text-primary);
  text-transform: uppercase;
}

.work-row__image-link {
  display: block;
  overflow: hidden;
  border-radius: 4px;
  transition: transform 400ms var(--ease-out);
}

.work-row__image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 600ms var(--ease-out);
}

.work-row__image-link:hover .work-row__image {
  transform: scale(1.02);
}

.work-row__see-all {
  display: block;
  text-align: center;
  padding: var(--space-lg) 0;
  font-family: var(--font-body);
  font-size: var(--text-body);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  text-decoration: none;
  border-top: 1px solid var(--line);
  margin: 0 var(--space-md);
}
```

**Step 2:** Reload. Confirm each project is a full-viewport row with big title and image.

**Step 3:** Screenshot: `docs/screenshots/phase4-work-rows.png`

**Step 4:** Prepare commit, await approval.

### Task 4.4: Add ScrollTrigger reveal animations

**Files:**
- Modify: `components/WorkSection.tsx` (GSAP useEffect)

**Step 1:** Add GSAP context with a `forEach` loop over `.work-row` elements, each animating `autoAlpha: 0 → 1` and `y: 60 → 0` at scroll trigger `top 82%`, play once only, `clearProps: 'all'`.

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.work-row').forEach((row) => {
      gsap.fromTo(row,
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1, y: 0,
          duration: 1.0,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: row,
            start: 'top 82%',
          },
        }
      )
    })
  }, sectionRef)
  return () => ctx.revert()
}, [])
```

**Step 2:** Scroll through the page manually. Confirm each row reveals as it enters viewport, plays once only.

**Step 3:** Screenshot scroll sequence: `docs/screenshots/phase4-work-scroll-{1,2,3}.png`

**Step 4:** Prepare commit, await approval.

---

## Phase 5: Engagements (renamed Services)

### Task 5.1: Rename file + update imports

**Files:**
- Rename: `components/ServicesSection.tsx` → `components/EngagementsSection.tsx`
- Modify: `app/page.tsx` (update import)

**Step 1:** Use `git mv` to rename (preserves history):

```bash
git mv components/ServicesSection.tsx components/EngagementsSection.tsx
```

**Step 2:** Update import + component name in `app/page.tsx`.

**Step 3:** Update the component's exported name and any internal references to `ServicesSection` or `.services-section` class.

**Step 4:** Reload, confirm page still renders.

**Step 5:** Prepare commit, await approval.

### Task 5.2: Strip dollar amounts + update copy

**Files:**
- Modify: `components/EngagementsSection.tsx`

**Step 1:** Remove all dollar values (`$3,000`, `$8,000`, `$15,000` or whatever the current tiers are).

**Step 2:** Update the three block titles to placeholder engagement names (Taylor to finalize during implementation):
- "Focused refresh"
- "Full build"
- "Ongoing partnership"

**Step 3:** Update each block's description to one-sentence scope (no pricing hints like "starting at" etc.). Placeholders:
- Focused refresh: "A targeted engagement for brands that need sharpening, not starting over."
- Full build: "End-to-end brand and web from blank canvas to live site."
- Ongoing partnership: "Continuous involvement — retainer, advisory, and hands-on support."

**Step 4:** Remove per-block CTAs. Add a single CTA below all three → `/contact`.

**Step 5:** Update section header to `ENGAGEMENTS` or `HOW WE WORK` (Taylor picks).

**Step 6:** Reload, screenshot: `docs/screenshots/phase5-engagements.png`

**Step 7:** Prepare commit, await approval.

### Task 5.3: Restyle engagements dark

**Files:**
- Modify: `app/globals.css` (engagements rules)

**Step 1:** Apply dark tokens to the section. Engagement blocks use `var(--surface)` with `var(--line)` borders. Section header uses `var(--text-primary)` with metallic gradient optionally.

**Step 2:** Reload, screenshot final: `docs/screenshots/phase5-engagements-final.png`

**Step 3:** Prepare commit, await approval.

---

## Phase 6: About restyle + absorb geography

### Task 6.1: Restyle About dark

**Files:**
- Modify: `components/AboutSection.tsx` (classes only, no structural change)
- Modify: `app/globals.css` (about rules)

**Step 1:** Swap warm tokens for dark tokens on all About section styles. Credentials grid uses `border-color: var(--line)` for hairline dividers.

**Step 2:** Reload, screenshot: `docs/screenshots/phase6-about-dark.png`

**Step 3:** Prepare commit, await approval.

### Task 6.2: Desaturate/duotone headshot

**Files:**
- Modify: `app/globals.css` (`.about__headshot img` rule)

**Step 1:** Apply CSS filter to the headshot image:

```css
.about__headshot img {
  filter: grayscale(100%) contrast(1.1) brightness(0.95);
  transition: filter 600ms var(--ease-out);
}
.about__headshot:hover img {
  filter: grayscale(40%) contrast(1.05);
}
```

Alternative (duotone): use a CSS `background-blend-mode` or an SVG filter for a true silver-blue duotone. Start with grayscale — upgrade only if it feels flat.

**Step 2:** Reload, screenshot: `docs/screenshots/phase6-headshot-treated.png`

**Step 3:** Prepare commit, await approval.

### Task 6.3: Add geography note to About

**Files:**
- Modify: `components/AboutSection.tsx`

**Step 1:** Add a small block (near the bio or credentials) with:

```tsx
<div className="about__location">
  <span className="about__location-label">Based in</span>
  <p className="about__location-value">
    Southampton, NY. Available for select remote and in-person engagements.
  </p>
</div>
```

**Step 2:** Style to match the credentials grid aesthetic.

**Step 3:** Reload, screenshot: `docs/screenshots/phase6-about-geography.png`

**Step 4:** Prepare commit, await approval.

---

## Phase 7: Cut VoiceMoment + remove homepage Contact

### Task 7.1: Remove VoiceMoment from homepage render tree

**Files:**
- Modify: `app/page.tsx`

**Step 1:** Remove the `<VoiceMoment />` line and its import.

**Step 2:** Reload, confirm the section is gone. Scroll goes Hero → Work → Engagements → About → Contact (Contact removal in next task).

**Step 3:** Screenshot: `docs/screenshots/phase7-voicemoment-cut.png`

**Step 4:** Prepare commit, await approval.

### Task 7.2: Ask Taylor before trashing VoiceMoment component file

**Files:**
- Candidate for deletion: `components/VoiceMoment.tsx`

**Step 1:** Per Taylor's memory rule ("never trash without approval"), ask Taylor whether to delete `components/VoiceMoment.tsx` or leave it in the codebase unused.

**Step 2:** If approved, `trash components/VoiceMoment.tsx` (NOT `rm`). If not, leave and continue.

**Step 3:** If deleted: `git add -A && git commit -m "chore: remove unused VoiceMoment component"` (await approval).

### Task 7.3: Remove ContactSection from homepage

**Files:**
- Modify: `app/page.tsx`

**Step 1:** Remove the `<ContactSection />` line and its import. Contact will live at `/contact` as a dedicated page (Phase 8).

**Step 2:** Reload. Homepage now ends at About. Header's CONTACT link routes to `/contact` (not yet built — will 404 until Phase 8).

**Step 3:** Screenshot: `docs/screenshots/phase7-homepage-contact-removed.png`

**Step 4:** Prepare commit, await approval.

### Task 7.4: Ask Taylor before trashing ContactSection component

**Step 1:** Ask Taylor whether to delete `components/ContactSection.tsx` (likely yes — its logic is being rewritten for the new page). If approved, `trash`. If not, leave.

**Step 2:** Prepare commit if deleted, await approval.

---

## Phase 8: /contact page with orb

### Task 8.1: Create app/contact/page.tsx scaffold

**Files:**
- Create: `app/contact/page.tsx`

**Step 1:** Create the file with basic scaffold:

```tsx
'use client'

import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'

const Ferrofluid = dynamic(() => import('@/components/Ferrofluid'), { ssr: false })

export default function Contact() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="contact-page">
        <div className="contact-page__orb">
          <Ferrofluid />
        </div>
        <div className="contact-page__corner contact-page__corner--bottom-left">
          <span className="contact-page__label">Let's make something</span>
        </div>
        <div className="contact-page__corner contact-page__corner--bottom-right">
          <a
            href="mailto:hi@taylormaison.com"
            className="contact-page__cta"
          >
            hi@taylormaison.com →
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

**Step 2:** Navigate to `localhost:3335/contact` in browser. Confirm route resolves and orb mounts.

**Step 3:** Screenshot: `docs/screenshots/phase8-contact-scaffold.png`

**Step 4:** Prepare commit, await approval.

### Task 8.2: Style the /contact page

**Files:**
- Modify: `app/globals.css` (add `.contact-page` rules)

**Step 1:** Add CSS:

```css
.contact-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  overflow: hidden;
}

.contact-page__orb {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.contact-page__corner {
  position: absolute;
  padding: var(--space-md);
  z-index: 2;
  pointer-events: auto;
}

.contact-page__corner--bottom-left {
  bottom: var(--space-lg);
  left: var(--space-lg);
}

.contact-page__corner--bottom-right {
  bottom: var(--space-lg);
  right: var(--space-lg);
}

.contact-page__label {
  font-family: var(--font-body);
  font-size: var(--text-small);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.contact-page__cta {
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.75rem;
  background: var(--accent);
  color: var(--bg);
  font-family: var(--font-body);
  font-size: var(--text-body);
  border-radius: 999px;
  text-decoration: none;
  transition: filter 200ms ease;
}
.contact-page__cta:hover {
  filter: brightness(1.15);
}
```

**Step 2:** Reload `/contact`. Orb dominant, corners tucked.

**Step 3:** Screenshot: `docs/screenshots/phase8-contact-styled.png`

**Step 4:** Prepare commit, await approval.

### Task 8.3: Tune Ferrofluid for solo stage

**Files:**
- Modify: `components/Ferrofluid.tsx` (size/reactivity config)

**Step 1:** Inspect Ferrofluid component. Identify the config variables controlling size, segment count, and interaction strength.

**Step 2:** Increase the orb's visible size by ~25–40% (exact value tunable via trial). Either bump the geometry scale or the camera field-of-view.

**Step 3:** Slightly increase interactivity responsiveness — magnet strength ceiling, spike amplitude. Test at desktop and make sure it doesn't tank performance on mobile.

**Step 4:** Confirm mobile reactivity still works (touch events should trigger the same behavior as mouse hover).

**Step 5:** Screenshot: `docs/screenshots/phase8-contact-orb-tuned.png`

**Step 6:** Prepare commit, await approval.

---

## Phase 9: /work index page

### Task 9.1: Create app/work/page.tsx

**Files:**
- Create: `app/work/page.tsx`

**Step 1:** Create the file:

```tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import { projects } from '@/lib/projects'
import TransitionLink from '@/components/TransitionLink'

export default function WorkIndex() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="work-index">
        <header className="work-index__header">
          <h1 className="work-index__title">ALL WORK</h1>
        </header>
        <div className="work-index__list">
          {projects.map((project) => (
            <article key={project.slug} className="work-row">
              <div className="work-row__inner">
                <div className="work-row__meta">
                  <span className="work-row__tag">
                    {project.tags?.join(' · ') ?? 'WEB DESIGN'}
                  </span>
                </div>
                <h2 className="work-row__title">{project.title}</h2>
                <TransitionLink href={`/work/${project.slug}`} className="work-row__image-link">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="work-row__image"
                  />
                </TransitionLink>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
```

**Step 2:** Navigate to `/work`. Confirm all projects render in the JACK-pattern layout.

**Step 3:** Screenshot: `docs/screenshots/phase9-work-index.png`

**Step 4:** Prepare commit, await approval.

### Task 9.2: Wire header CONTACT + WORK nav correctly

**Files:**
- Verify: `components/Header.tsx`

**Step 1:** Confirm Header's `WORK` link routes appropriately. Options: (A) anchor to homepage first row (`/#work`), or (B) link to `/work`. Taylor to decide — propose (A) for homepage context, (B) is explicit.

**Step 2:** No commit needed if already correct.

---

## Phase 10: Case study palette pass

### Task 10.1: Update CaseStudy component palette

**Files:**
- Modify: `components/CaseStudy.tsx`
- Modify: `app/globals.css` (case study rules)

**Step 1:** Replace any hardcoded light-theme colors in CaseStudy.tsx with new dark tokens. Background uses `var(--bg)`, text uses `var(--text-primary)`, accents use `var(--accent)`.

**Step 2:** Note: each project in `lib/projects.ts` has a `color` property — this still drives the case study hero background. Confirm whether those colors work against dark text/surroundings or need adjustment. Likely per-project, may need case-by-case review.

**Step 3:** Visit each of the 4 case studies at `/work/[slug]` and screenshot: `docs/screenshots/phase10-casestudy-{slug}.png`

**Step 4:** Prepare commit, await approval.

---

## Phase 11: Footer + cleanup

### Task 11.1: Restyle Footer dark

**Files:**
- Modify: `components/Footer.tsx` (minimal changes)
- Modify: `app/globals.css` (footer rules)

**Step 1:** Swap tokens. Footer links use `var(--text-secondary)` with hover `var(--accent-bright)`. Border-top hairline uses `var(--line)`.

**Step 2:** Screenshot: `docs/screenshots/phase11-footer.png`

**Step 3:** Prepare commit, await approval.

### Task 11.2: Ask Taylor before removing hero-bg.mp4

**Files:**
- Candidate for deletion: `public/video/hero-bg.mp4`

**Step 1:** Ask Taylor whether to delete the unused hero video (Hero no longer references it). If approved, `trash public/video/hero-bg.mp4`. If not, leave.

**Step 2:** Prepare commit if deleted, await approval.

---

## Phase 12: QA pass + verification

Use `@superpowers:verification-before-completion` to enforce the bar here.

### Task 12.1: Desktop screenshots of every page

**Step 1:** At 1440×900, screenshot: `/`, `/work`, `/work/roman-sanford` (pick one case study), `/contact`.

**Step 2:** Save to `docs/screenshots/qa-desktop-{page}.png`.

### Task 12.2: Mobile screenshots of every page

**Step 1:** At 390×844, screenshot same pages.

**Step 2:** Save to `docs/screenshots/qa-mobile-{page}.png`.

### Task 12.3: Lighthouse audit

**Step 1:** Run Lighthouse in Chrome DevTools or CLI on the homepage and `/contact`. Capture scores for Performance, Accessibility, Best Practices, SEO.

**Step 2:** Flag any a11y issue with score < 95. Address before sign-off.

**Step 3:** Save report: `docs/screenshots/qa-lighthouse.png`.

### Task 12.4: Reduced-motion check

**Step 1:** In Chrome DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Reload homepage.

**Step 2:** Confirm scramble reveals and Y-offset scroll animations are disabled or fallback to fade-only. If not, add `@media (prefers-reduced-motion: reduce)` rules in globals.css or guard GSAP animations with a `matchMedia` check.

**Step 3:** Screenshot: `docs/screenshots/qa-reduced-motion.png`.

### Task 12.5: Click every nav link and CTA

**Step 1:** Manually click every link on the homepage + Header + Footer. Confirm routing works and no 404s.

**Step 2:** Confirm hero CTA → `/contact`, WORK link, ABOUT link, CONTACT link, each work row link, each case study "next project" link.

**Step 3:** Document any broken link and fix before sign-off.

### Task 12.6: Ferrofluid interactivity on /contact

**Step 1:** On `/contact`, hover over the orb, press, release. Confirm magnetic reach, spike formation, recoil wobble all behave as expected.

**Step 2:** Test on mobile (touch events). Confirm tap-to-interact works.

**Step 3:** Screenshot mid-interaction: `docs/screenshots/qa-contact-orb-interaction.png`.

### Task 12.7: Compare final vs baseline

**Step 1:** Open `docs/screenshots/baseline-home-desktop.png` (Task 0 output) alongside `docs/screenshots/qa-desktop-.png`.

**Step 2:** Side-by-side review with Taylor. The "before and after" moment. Get explicit sign-off before considering this complete.

---

## Post-implementation

### Task POST: Update project CLAUDE.md

**Files:**
- Modify: `CLAUDE.md` (root of project)

**Step 1:** Once Taylor signs off, update the project CLAUDE.md to reflect the new architecture:
- Routes (add `/work`, `/contact`)
- Component tree (new EngagementsSection, ContactPage; removed VoiceMoment)
- Design system (new dark palette + type scale)
- Removed outdated "Known Issues" items that have been fixed (mobile nav, etc.)

**Step 2:** Fold in the Hamptons positioning guidance from `project_tm_hamptons_positioning.md` memory. Remove the contradicting "broad and aspirational, don't over-specify geography" line per that memory's "how to apply" note.

**Step 3:** Prepare commit, await approval.

### Task POST-2: Optional follow-ups (do NOT do in this plan — separate engagements)

These are explicitly out of scope but flagged here so they don't get lost:

- Production deploy to Vercel (awaits Taylor's go-ahead)
- Final engagement copy (Focused refresh / Full build / Ongoing partnership — placeholders)
- Final hero corner tagline copy
- Final mailto address on `/contact` (placeholder uses `hi@taylormaison.com`)
- Consider ASCII hero visual as a layered additive if the pure-type hero feels sparse after implementation (was kept optional per design doc)
- Optional display font swap (Cabinet Grotesk → more condensed if metallic treatment feels rounded)
- Optional mono font for metadata/tags

---

## Global rules for executing this plan

- **Commits:** Never commit without Taylor's explicit approval per his global rule. Each "Prepare commit, await approval" step means the work is done, the diff is ready to stage, and you pause for his sign-off.
- **File removal:** Never `trash` or `rm` any file without asking. Specifically flagged in Phases 7 and 11.
- **Image cache:** When swapping images with the same filename, `rm -rf .next` before reloading — Turbopack caches aggressively. (Not applicable in this plan since we're not swapping images with same names, but keep in mind.)
- **CustomCursor:** Do not refactor `components/CustomCursor.tsx`. Fragile per CLAUDE.md. If it breaks, revert.
- **Scroll animations:** Must play once only. Never add `toggleActions` unless Taylor asks.
- **Screenshots:** Required at every "screenshot" step. Saved to `docs/screenshots/`. This is the verification mechanism — visual design without screenshots isn't verified.
- **Dev server port:** 3335. If it dies (code 144 per CLAUDE.md), restart with `npm run dev`.
- **Referenced skills:**
  - @superpowers:executing-plans — how to work through this plan
  - @superpowers:verification-before-completion — before claiming Phase 12 done
  - @superpowers:subagent-driven-development — if parallelizing phases
