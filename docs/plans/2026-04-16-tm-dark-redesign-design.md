# Taylor Maison Site — Dark Redesign Design Doc

**Date:** 2026-04-16 (refined 2026-04-26)
**Status:** Design approved with 2026-04-26 refinements; ready for implementation
**Predecessor:** `docs/plans/2026-04-16-tm-dark-redesign-brainstorm.md`
**Companion:** `docs/design-principles.md` (controlled-contrast tensions + ten rules)
**Reference:** JACK Framer template by Ludovic Losco — `https://jack-template.framer.website/`

## 2026-04-26 refinements (override prior locked decisions where they conflict)

1. **Hero gets a thesis line.** Add plain-language thesis below `BRAND. WEB. AI.`: *"Sharper digital presence and operating systems for founder-led businesses."* Body register, max-width clamped, off-cream tone. The metallic title carries brand expression; the thesis carries immediate legibility.
2. **Palette adds cream.** Background shifts from surgical near-black `#0a0a0c` to milky black `#0d0c0a` (slight warm undertone). Cream `#f4ecdf` introduced as body type tone and supporting surfaces — not dominant. Three-tone system: milky black = authority, cream = warmth, silver-blue = technical intelligence.
3. **Ferrofluid restored to hero (restrained).** No longer `/contact`-only. Smaller, calmer hero appearance (~35–40% of `/contact` volume, reduced reactivity). Then full-volume on `/contact` as the reveal. This protects the signature from feeling like an easter egg.
4. **Engagements copy locked (renamed and rewritten).** Block names: Focused Refresh / Flagship Build / Ongoing Partner. Outcome-driven copy below.
5. **`/contact` upgraded from mailto-only.** Structured mailto template (pre-fills subject + body skeleton: project type / timeline / scope / budget range / brief description) plus a tasteful "What to include" guide panel beside the orb. No form. Lower friction; clearer signal for serious leads.
6. **Trust note in hero lower-left.** Replaces TBD tagline: `SOUTHAMPTON, NY  ·  BY REFERRAL` (all-caps tracked, muted silver).
7. **Identity system locked: wordmark-first.** Primary mark = TAYLOR MAISON stacked wordmark in Cabinet Grotesk 800 (custom letterform refinements deferred to follow-up sprint). Pearl/orb = "memory" layer — secondary motif, never primary. Header `TM dot` is replaced with compact stacked mini-wordmark. Favicon defaults to lowercase `tm` (safest from ™-symbol confusion) until a stronger custom T or pearl glyph earns it. Validated by `concepts/logo/research.md` peer audit + monogram theory + trademark distinctiveness. Uppercase TM monogram in a circle is killed permanently.

## Goal

Full aesthetic pivot of the Taylor Maison portfolio site from warm cream / editorial / restrained to dark / bold / high-contrast / typography-forward. The pivot serves two business purposes:

1. Bring TM's visual identity in line with the caliber of portfolio work (Roman Sanford, RS Black — both dark, high-contrast).
2. Align the site with Taylor's real clientele base — Hamptons-rooted, referral-driven, high-net-worth. Hamptons is **context, not aesthetic**: the audience lives there, the brand does not look like there. No nautical, preppy, or country-club motifs.

## Scope

- Full homepage redesign (all sections)
- New dedicated `/contact` page
- New `/work` index page
- Case study pages (`/work/[slug]`) — palette only, structure unchanged
- Mobile nav (hamburger) added — currently missing
- No deployment in this pass; dev server only until Taylor signs off visually

## Architecture

### Routes

| Route | Purpose | Change |
|---|---|---|
| `/` | Home | Heavy restructure |
| `/work` | Project index | **NEW** |
| `/work/[slug]` | Case study | Palette only |
| `/contact` | Contact + ferrofluid orb | **NEW** (currently a homepage section only) |

### Homepage section order

1. Hero
2. Work row 1 (full viewport)
3. Work row 2 (full viewport)
4. Work row 3 (full viewport)
5. Engagements (renamed Services, no pricing)
6. About (absorbs geography note from hero)
7. Footer

Contact is no longer a homepage section — it is its own page. VoiceMoment section is cut entirely.

### Navigation

- Header: `WORK | ABOUT | CONTACT` (slimmed from current four items)
- `WORK` → anchors to first work row on `/` (or links to `/work` — decide during implementation)
- `ABOUT` → anchors to homepage About section
- `CONTACT` → links to `/contact` dedicated page
- Mobile: hamburger menu (new — CLAUDE.md TODO cleared)

## Page-by-page composition

### Hero (`/`)

- Full viewport height, dark bg, no video, no orb
- Top-left: small `TM` wordmark dot, silver on dark
- Top-right: nav `WORK | ABOUT | CONTACT`, all-caps tracked, silver
- Center-stacked:
  - Line 1: `TAYLOR MAISON` — massive condensed display, metallic gradient clipped to text (silver → cool blue, top-to-bottom via `-webkit-background-clip: text`)
  - Line 2: `BRAND. WEB. AI.` — same metallic treatment, same or slightly smaller scale; periods are visual punctuation
- Lower-left corner: small all-caps tagline (candidates TBD in implementation)
- Lower-right corner: primary CTA pill → `/contact` (silver-blue fill, dark text — metallic feel, not purple gradient)
- Entrance: GSAP SplitText scramble reveal on both lines, 0.12s stagger

### Work rows × 3

Pattern adapted from JACK template:

- Each row = full viewport height
- Oversized H2 project title above large featured image
- Small metadata tags beside title (e.g., `WEB DESIGN · 2024`)
- Entire row is a link to `/work/[slug]`
- Scroll reveal: Y-offset 60px + autoAlpha fade at `top 82%` trigger, play once
- Below row 3: "See all work →" link to `/work` index (hairline underline, silver)

### Engagements (renamed from Services)

- Large condensed section header (e.g., `HOW WE WORK` or `ENGAGEMENTS` — pick during implementation)
- Three horizontal engagement blocks, each with name + one-sentence description
- **No dollar amounts** — stripped to avoid commoditizing the relationship for the referral-driven clientele
- Single CTA below all three → `/contact`
- Proposed engagement names (placeholders, tunable): **Focused refresh** / **Full build** / **Ongoing partnership**

### About

- Two-column desktop, stacked mobile
- Left: headshot, desaturated or dark duotone so it lives in the palette
- Right: bio (rewrite from existing), credentials grid with silver-blue hairline dividers
- Geography note absorbed here: "Based in Southampton, NY. Available for select remote and in-person engagements." (moved from hero notes strip)

### Contact (`/contact` — dedicated page)

- Full viewport, dark bg
- Ferrofluid orb dominates — centered, large, fully interactive (existing shaders, existing magnetic/spike/recoil behavior, tuned larger)
- Lower-left corner: small tagline/prompt (TBD)
- Lower-right or upper-right: mailto CTA pill (metallic silver fill)
- No form. Mailto only.
- Ferrofluid tuned for this context — larger size, stronger reactivity since it's the sole focus

### Footer

- Across all pages
- Email, X link, LinkedIn, back-to-top — existing pattern, restyled dark
- Minimal, doesn't compete

## Design tokens

### Color palette

Replacing current warm cream system in `globals.css`:

```css
--bg:              #0a0a0c;   /* near-black, slight cool undertone */
--bg-elevated:     #14161a;   /* subtle lift for card surfaces */
--surface:         rgba(255, 255, 255, 0.04);   /* frosted glass, barely visible */
--text-primary:    #f4f4f5;   /* off-white, reduces eye strain vs pure white */
--text-secondary:  #a8b5c2;   /* cool gray body copy */
--text-muted:      #6a7581;   /* metadata, captions */
--accent:          #8FA3B8;   /* lifted silver-blue — CTAs, hover */
--accent-bright:   #C8D4E0;   /* near-metallic — focus, active */
--line:            rgba(168, 181, 194, 0.12);   /* hairline dividers */
--metallic-grad:   linear-gradient(180deg, #f4f4f5 0%, #8FA3B8 100%);
                   /* clipped to hero text via -webkit-background-clip: text */
```

- `--charcoal: #0d1015` — retained for edge/debug only; VoiceMoment's contrast role is obsolete
- SVG noise overlay (opacity 0.01) — kept, still useful on dark
- `--shadow-soft` — restyled to `0 24px 60px rgba(0, 0, 0, 0.4)`

### Typography

- **Display:** Cabinet Grotesk (existing). Swap to more condensed bold face during implementation only if metallic treatment feels too rounded. Candidates if swapping: NB International Pro Condensed, Editorial New Ultra-Light.
- **Body:** Satoshi (existing, unchanged)
- **Mono (optional):** For metadata / tags / timestamps — JetBrains Mono, IBM Plex Mono, Khand. Defer to implementation.

### Type scale

```css
--text-hero:     clamp(4.5rem, 14vw, 12rem);   /* major bump from 3.6–8.8 */
--text-display:  clamp(2.8rem, 7vw, 6rem);     /* work row titles */
--text-heading:  clamp(1.6rem, 2.8vw, 2.4rem);
--text-body:     clamp(1rem, 1.2vw, 1.08rem);
--text-small:    clamp(0.75rem, 0.9vw, 0.85rem);
```

Hero scale bump is the single biggest visual change — editorial restrained → bold declarative.

### Motion system

- Existing conventions preserved: `autoAlpha`, `clearProps: 'all'`, `ease: 'power3.out'`, play-once-only
- Hero: SplitText scramble reveal, 0.12s stagger between lines
- Work rows: Y-offset 60px + autoAlpha fade at `top 82%`
- Engagement blocks: staggered fade from left, 0.08s
- Silver hover-glow on links: 200ms ease, `filter: brightness(1.2)` + subtle silver-blue `text-shadow`
- CustomCursor: unchanged (fragile per CLAUDE.md)
- Ferrofluid on `/contact`: tuned larger, stronger reactivity
- `prefers-reduced-motion`: scramble reveals and Y-offset transitions disabled; fade-only fallback

### Accessibility

- Primary text contrast: `#f4f4f5` on `#0a0a0c` = 17.2:1 (passes AAA comfortably)
- `prefers-reduced-motion` respected
- Focus states use `--accent-bright` with visible outline

## Component scope

### Modify (existing, heavy changes)

- `Hero.tsx` — remove video bg, remove Ferrofluid import, remove notes strip; rebuild as typography-forward with metallic gradient text, corner CTAs, scramble reveals
- `Header.tsx` — nav slims to three items, restyle silver on dark, remove Services link
- `WorkSection.tsx` — rewrite as 3 full-viewport rows (JACK pattern)
- `ServicesSection.tsx` → rename to `EngagementsSection.tsx`, strip pricing
- `AboutSection.tsx` — restyle dark, desaturate headshot, hairline dividers, absorb geography
- `ContactSection.tsx` — remove from homepage; logic/copy migrates to new `/contact` page
- `Footer.tsx` — restyle dark, minimal
- `globals.css` — full `:root` replacement, type scale bump
- `CaseStudy.tsx` — palette only

### Create (new)

- `app/contact/page.tsx` — dedicated page, orb-dominated layout
- `app/work/page.tsx` — index listing all `lib/projects.ts` entries
- Metallic gradient text treatment — likely CSS-only on existing Hero, may not need a new component

### Keep as-is

- `Ferrofluid.tsx` + shaders — used on `/contact` instead of homepage
- `CustomCursor.tsx` — fragile, do not refactor
- `PageTransition.tsx`, `TransitionLink.tsx` — unchanged
- `SmoothScroll.tsx` (Lenis) — unchanged
- `MagneticLink.tsx`, `ScrambleLink.tsx` — used more, internals unchanged
- `lib/projects.ts` — data shape unchanged

### Delete (ask Taylor before `trash`ing per memory rule)

- `VoiceMoment.tsx` — section cut
- `public/video/hero-bg.mp4` — hero no longer uses video

## Build sequence

1. Swap design tokens in `globals.css` — site goes dark everywhere instantly; allows palette iteration before layout work
2. Rebuild Hero (typography, metallic gradient, CTAs) — highest-impact change, do early
3. Rebuild Work section as JACK-pattern rows
4. Restyle About, Engagements, Header
5. Build `/contact` page with relocated Ferrofluid
6. Build `/work` index page
7. Mobile nav (hamburger) — folds into this work since nav is changing anyway
8. Visual QA pass with screenshots at three breakpoints before declaring done

## Verification plan

- Screenshot hero on desktop + mobile after each major change (per "screenshot and verify" feedback rule)
- Lighthouse run: contrast, performance, a11y
- Manual pass of all scroll animations — must play once only, no `toggleActions`
- `prefers-reduced-motion` toggle check
- Ferrofluid interactivity confirmed on `/contact` (hover, press, recoil)
- Click every nav link + CTA confirming routing works
- No deploy until Taylor visually approves

## Out of scope

- Changing case study page (`/work/[slug]`) structure — palette only
- Touching CustomCursor internals
- Changing `lib/projects.ts` data shape
- Adding a blog or new content surface
- Building a booking/scheduling system on `/contact`
- Deploying to production (separate call)
- Mobile nav polish beyond functional hamburger (follow-up)

## Open items (deferred to implementation)

- Exact hero corner tagline copy
- Exact engagement block copy (three names + one-sentence descriptions)
- Final display font decision (Cabinet Grotesk vs. more condensed swap)
- Whether Work nav link anchors to homepage row or links to `/work` index
- Whether to add optional mono font for metadata
- Exact mailto CTA copy on `/contact`

## Decision log (from brainstorm)

| Decision | Locked value |
|---|---|
| Scope | Full redesign, not a tweak |
| Aesthetic | Dark / bold / high-contrast |
| Orb placement | Moves OFF hero → dedicated `/contact` page |
| 3D character/head | Hard no |
| Hero layout | Hybrid: name + tagline both at hero scale, stacked |
| Hero visual | Pure typography; ASCII remains optional additive during implementation if sparse |
| Hero copy | `TAYLOR MAISON` / `BRAND. WEB. AI.` |
| Nav structure | `WORK \| ABOUT \| CONTACT` (Services removed from nav) |
| Accent | Lifted silver-blue family, metallic gradient |
| Services section | Kept, renamed Engagements, stripped of dollar amounts |
| Work section | JACK's stacked full-bleed pattern, 3 on homepage + `/work` index |
| VoiceMoment | Cut entirely |
| About | Restyle, absorb geography note |
| Contact | Dedicated page, orb-dominated, mailto only |
| Execution character | B — Bold Declarative (reference-aligned) |
| Positioning context | Hamptons-rooted clientele; Hamptons as context not aesthetic |
