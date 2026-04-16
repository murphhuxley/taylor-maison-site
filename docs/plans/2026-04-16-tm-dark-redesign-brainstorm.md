# Taylor Maison Site — Dark Redesign Brainstorm

**Started:** 2026-04-16
**Status:** Brainstorming (clarifying questions, paused mid-session)
**Skill in use:** `superpowers:brainstorming`

## Context

Taylor wants a full aesthetic pivot for the Taylor Maison portfolio site. Current site is warm cream / editorial / restrained. Reference direction is dark / bold / high-contrast / statement-typography.

## Reference

Tweet: https://x.com/viktoroddy/status/2044391376062730324
- Pure black background with subtle glossy wave/ribbon corner effects
- Massive condensed sans-serif hero headline ("HI, I'M JACK") with metallic/silver gradient
- Minimal top nav: ABOUT | PRICE | PROJECTS | CONTACT (all caps, evenly spaced)
- Small all-caps tagline tucked lower-left
- Purple-to-magenta gradient pill CTA lower-right
- 3D character head overlapping headline (**Taylor does NOT want this element**)

## Decisions locked in

| Topic | Decision |
|---|---|
| Scope | Full redesign, not a tweak |
| Aesthetic | Dark / bold / high-contrast |
| Ferrofluid orb | Moves OFF hero → Contact page |
| No 3D head | Hard no on any 3D character/avatar |
| Hero headline direction | **Hybrid** — name + tagline both large, stacked (exact copy TBD) |
| Hero visual (floating idea) | ASCII animation — "really cool" — TBD, will explore during implementation |

## Open questions (paused here)

1. **Nav structure** — three options presented, awaiting answer:
   - A) Slim down (ABOUT | WORK | CONTACT)
   - B) Keep all current sections but restyle dark
   - C) Restructure into separate pages (Work page, About page)
2. Hero visual commitment (ASCII vs. typography-only vs. other)
3. Specific hero copy
4. Whether to adopt the purple-magenta gradient CTA accent (or pick a different accent for dark mode — Taylor dislikes gold, currently uses silver-blue #6f8190)
5. Treatment of existing sections: Work, VoiceMoment, Services (3-tier pricing), About, Contact

## What to keep from current build

- GSAP + ScrollTrigger animation system
- Lenis smooth scroll
- Page transition system (PageTransitionContext + TransitionLink)
- CustomCursor (fragile, don't refactor without testing)
- Case study structure (`/work/[slug]`) and project data in `lib/projects.ts`
- Ferrofluid component (relocate to Contact, don't delete)
- Cabinet Grotesk + Satoshi fonts (may swap display font for something more condensed/bold to match reference feel)

## What's changing

- Color palette: cream (#f4f0e8) → dark/black base
- Hero: replace ferrofluid-in-hero with typography-forward layout (possibly ASCII)
- Typography scale: likely push hero text bigger, more condensed, metallic/gradient treatment
- Accent: TBD — purple-magenta gradient per reference, or a dark-mode-appropriate silver variant
- Section density: likely slim down per reference, TBD on final nav

## How to resume

1. `cd ~/.openclaw/workspace/projects/taylor-maison-site`
2. Re-read this file and the project CLAUDE.md
3. Re-invoke `superpowers:brainstorming` skill
4. Pick up at the nav structure question
5. After nav: hero visual, accent color, section treatments
6. Then propose 2-3 design approaches with trade-offs
7. Then present design sections for approval
8. Then write final design doc and invoke `superpowers:writing-plans`

## Reference files

- Project CLAUDE.md: `~/.openclaw/workspace/projects/taylor-maison-site/CLAUDE.md`
- Current globals.css (design tokens): `app/globals.css`
- Current Hero: `components/Hero.tsx`
- Projects data: `lib/projects.ts`
