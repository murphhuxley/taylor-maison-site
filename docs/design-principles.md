# Taylor Maison Site — Design Principles

*Lives alongside the dark-redesign design doc. Captures the principles that guide implementation decisions when the design doc doesn't have a specific answer. Synthesized April 26, 2026 with Taylor.*

---

## The site's job (one sentence)

Make a warm-referral Hamptons business owner think: *"this person has taste, understands my world, and can build something I can't get from the local web guy."*

## The frame (from the game plan)

**Bespoke taste on the outside. Productized execution on the inside.**

The site embodies the outside. The internal SKUs, rate card, and delivery system embody the inside.

## Controlled contrast — the visual language

The design lives in five productive tensions. Every layout, copy block, and interaction should embody these without resolving them.

| Tension | Meaning |
|---|---|
| **Beautiful / useful** | Visual restraint paired with immediate legibility. Pretty alone is forgettable; useful alone is generic. |
| **Local / world-class** | Hamptons-rooted, NYC-quality. Geography appears as trust context, never as preppy/nautical motif. |
| **Bespoke / systematic** | Looks bespoke (no public pricing, mailto contact, conversational copy). Runs on systems (rate card, templates, defined cadences). |
| **Tasteful / technical** | Restrained typography and motion paired with serious technical capability. Show, don't announce. |
| **Quiet / alive** | Calm premium layout with one living, reactive signature object (ferrofluid). Not five competing effects. |

## Ten implementation rules

1. **Premium before it explains itself — but with a sharp thesis.** First screen carries confidence through type, spacing, restraint, motion, material feel. AND a plain-language sentence so the visitor knows what TM does within seconds.
2. **Beautiful, not chaotic.** One strong idea: milky black world, cream warmth, silver-blue technical glint, living ferrofluid signature, elegant typography, quiet luxury motion. Not five competing effects.
3. **Local but not small.** Southampton/Hamptons appears as trust context, not visual identity. Locally rooted, NYC-quality.
4. **Make the offer understandable fast.** Brand direction, websites, intelligent systems — framed as business outcomes, never as service categories.
5. **Sell judgment, not labor.** The design feels edited, decisive, high-taste. The visitor senses: *they know what to leave out.*
6. **AI sophisticated, not gimmicky.** Avoid robot language. Use intake, follow-up, proposals, workflows, operating systems, leverage. *"Intelligent systems"* over *"AI."* Sell business outcomes; AI is the unfair lever, never the headline.
7. **Case studies as proof of range and quality.** Not random featured work. Show the kinds of business problems TM solves. Without these, the premium-without-explanation thing collapses.
8. **Convert quietly.** No screaming CTAs. The flow is view work → understand engagements → start a conversation.
9. **Human and relationship-based.** About section carries weight: local roots, taste, technical capability, *I'm the person you actually work with.*
10. **No public pricing.** Create enough desire and trust that pricing happens in conversation.

## The color system

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#0d0c0a` | Milky black — authority. Slight warm undertone, not surgical. |
| `--cream` | `#f4ecdf` | Human/local warmth. Used for body type and one or two supporting surfaces. Not dominant. |
| `--accent` | `#8FA3B8` | Silver-blue — technical intelligence. CTAs, hover. |
| `--accent-bright` | `#C8D4E0` | Near-metallic — focus, active states. |
| `--text-primary` | `#f4ecdf` | Body type uses the cream tone (warmer than pure off-white). |
| `--text-secondary` | `#a8b5c2` | Cool gray — metadata, captions. |
| `--text-muted` | `#6a7581` | Tertiary — labels, timestamps. |
| `--metallic-grad` | `linear-gradient(180deg, #f4ecdf 0%, #8FA3B8 100%)` | Clipped to hero text via `-webkit-background-clip: text`. |

## The identity system

**Name = authority. Typeface = taste. Pearl = memory.**

Wordmark-first — validated by peer audit (0 of ~25 creative-director marks use circle+monogram), monogram theory (working monograms *interact*; T+M sitting in a circle doesn't), and trademark distinctiveness (USPTO rejects un-customized monograms). Full reasoning in `concepts/logo/research.md`.

| Layer | Treatment |
|---|---|
| **Primary mark** | TAYLOR MAISON stacked wordmark, Cabinet Grotesk 800. Custom letterform refinements (tracking, optical spacing, subtle character edits) make it feel *set*, not typed. |
| **Secondary motif** | Pearl / living ferrofluid orb. The "memory" layer of the brand. Restrained in hero, dominant on `/contact`. Never asked to carry the brand alone. |
| **Header lockup** | Compact stacked mini-wordmark. Replaces the prior "TM dot" mark. |
| **Hero / Contact / Footer** | Larger stacked wordmark when warranted. |
| **Favicon / avatar** | Three real candidates: custom single T, lowercase `tm`, or pearl glyph. Default to lowercase `tm` (survives the ™-symbol confusion) until a stronger option earns its place. |
| **Type system** | Cabinet Grotesk (display) + Satoshi (body). |
| **Killed** | Uppercase TM monogram in a circle. Reads as ™. Three independent research angles confirm. Do not revisit. |

## The signature object

The ferrofluid orb is the brand myth. It appears restrained in the hero (smaller, calmer, ~35–40% of `/contact` size, reduced reactivity) and dominant on `/contact` (large, fully alive). The visitor recognizes it on `/contact` — *"that thing I saw earlier, now at full volume."* This is intentional: the contact page is the moment the brand fully meets the visitor.

## Three must-solves before truly locked

These three determine whether the site converts or stays a beautiful shell.

1. **Hero thesis — beautiful AND immediately legible.** Locked draft: *"Sharper digital presence and operating systems for founder-led businesses."* Sits below `BRAND. WEB. AI.`, body register, off-cream tone.
2. **Engagements explain outcomes, not services.** Locked copy:
   - **Focused Refresh** — *For businesses with real reputation whose digital presence has fallen behind it. We sharpen the story, homepage, visual system, and inquiry path.*
   - **Flagship Build** — *A complete digital presence: positioning, website, motion, content structure, and lead flow built around how the business actually sells.*
   - **Ongoing Partner** — *Monthly creative, web, and intelligent-systems support for founder-led teams that need senior taste and steady output without building an internal department.*
3. **Case studies prove taste, trust, and operational value.** Currently 0 of 4 written. **Critical path** — site visual restraint collapses without proof. Pick one (Roman Sanford or RS Black) as the template, replicate.

## What this rules out

- Cold black/white tech minimalism
- Public flat-rate pricing on the homepage
- "AI agency" branding language
- Crowded pitch copy or SaaS-style hero layouts
- Five competing motion effects
- Generic agency grids
- Provincial / over-niched Hamptons motifs (nautical, preppy, country-club)
- Form-based contact (mailto only, with structured prompt)
- Restraint without proof (case studies must do their job)

---

*Maintained by Murph Huxley. Pair with `docs/plans/2026-04-16-tm-dark-redesign-design.md` and `docs/game-plan.md`.*
