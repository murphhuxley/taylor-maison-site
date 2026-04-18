# Hero variants — ideation pass

Three live HTML concepts for unsticking the landing page. Each pushes a different "wow" hypothesis. Open them in a browser and move your cursor around — don't just look at screenshots.

## The three bets

**Variant A — Editorial type hero.** The orb recedes. Massive Cabinet Grotesk display (up to ~14-17vw) dominates above the fold. Headline breaks across four lines with a right-shift and indent rhythm that reads as deliberate typesetting, not brute scale. An italic silvery `&` and a silvery period are the only chromatic accents. Below: a thin strip with location + status, a running marquee of project names.

*Hypothesis:* Your positioning is already restrained. Doubling down on restraint — swapping the 3D gimmick for editorial type craft — is the signal that says "serious creative director."

**Variant B — Cinematic reveal.** Keeps the current composition (copy left, orb right) but the *entrance* is the moment. Page loads behind a charcoal curtain with "Taylor Maison · Loading view." Curtain lifts. Orb materializes from a blurred point. Three lines of the headline slide up one at a time. The whole thing takes about 3 seconds and then settles.

*Hypothesis:* The hero composition is fine; what's missing is a cinematic first impression. Reload to re-watch the sequence.

**Variant C — Magnetic type field.** No orb above the fold. The headline itself is split into characters, each with a gravitational pull toward your cursor. Move the cursor and letters near it drift, swell, and tint toward the silvery accent. A custom cursor + ring tracks alongside. The type *is* the interaction.

*Hypothesis:* The "wow" doesn't have to be the orb. A magnetic-type field is rarer, more distinctive, and trades 3D novelty for pure typographic intent.

## How to evaluate

1. Open [index.html](./index.html) for a side-by-side grid, or open each variant in its own tab.
2. For each one, ask yourself:
   - **Does it land within 1.5 seconds?** If you have to study it to get it, it's overdesigned.
   - **Does the "wow" moment read as intentional craft, or as a gimmick?**
   - **Would I be proud to send this link to someone whose taste I respect?**
3. You're not picking a finished design. You're picking the *direction* — the one that makes you go "yeah, that's the bet I want to take."

## What's NOT in the variants

- The real orb (three.js ferrofluid) — B uses a CSS stand-in. C removes it above fold.
- Scroll-driven animations for the rest of the page — hero only.
- Polished copy — all three use your current headline. Copy tune-up is a separate pass.
- Mobile fidelity — designed for desktop first (all responsive-collapse cleanly though).

## Likely next move

Once you pick a direction (or a Frankenstein of two), I can:
1. Port it into the Next.js site as a branch we can preview against the current hero.
2. Swap the CSS orb in Variant B for the real three.js ferrofluid.
3. Refine the mechanic in Variant C (softer falloff, better initial state, hover on CTAs, etc.).

## Files

- [index.html](./index.html) — side-by-side viewer with toggle
- [variant-a-editorial.html](./variant-a-editorial.html)
- [variant-b-cinematic-reveal.html](./variant-b-cinematic-reveal.html)
- [variant-c-magnetic-type.html](./variant-c-magnetic-type.html)
