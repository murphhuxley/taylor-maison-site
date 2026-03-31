# Framer Page Transitions — Competitive Intelligence

*Source: @hxmzaehsan tweet (2.9K❤️, 100K👁, 1,860 bookmarks) reshared by @AliGrids (1.7K❤️, 65K👁). March 15, 2026.*

---

## What This Is

Hamza Ehsan (@hxmzaehsan) posted a video showcasing fluid page transitions built in Framer. The video went viral — 100K+ views, nearly 2K bookmarks. AliGrids reshared it and got another 65K views. The community reaction: "buttery smooth," "reduce bounce rate," "undefeated."

Hamza is a music producer-turned-web designer who sells Framer templates at hxmzaehsan.com. He also does 1:1 coaching.

## The Technique: Framer Page Effects

Framer has built-in page transition effects (called "Page Effects" or "View Transitions"):

**Available presets:**
- Crossfade
- Wipe
- Circular mask
- Blinds
- Zigzag
- Inset

**Customizable properties:**
- Direction
- Duration
- Mask width
- Separate enter/exit animations
- Can be applied globally to all pages or targeted to specific pages

**Key insight:** These transitions are built into Framer's platform — no custom code needed. You configure them in the Effects panel. The viral appeal is that the result looks like custom development but it's actually a drag-and-drop feature.

## Why This Matters for Taylor Maison Creative

### Competitive Threat
Framer is a no-code platform. If someone like Hamza can produce transitions this polished without writing code, it compresses the perceived value gap between:
- A $50/mo Framer template with beautiful transitions
- A $8-12K custom Next.js + GSAP build from Taylor

### How We're Different (and Better)

| Feature | Framer Templates | Taylor Maison (Next.js + GSAP) |
|---------|-----------------|-------------------------------|
| Page transitions | ✅ Built-in presets | ✅ Custom, unlimited complexity |
| Hosting | Framer hosting only | Any platform (Vercel, custom) |
| Performance | Framer runtime overhead | Optimized, no platform bloat |
| SEO control | Limited | Full control |
| Custom interactions | Limited to Framer's API | Unlimited (GSAP, Three.js, custom) |
| AI/agent integration | ❌ Not possible | ✅ Forkable ops layer |
| Ownership | Locked to Framer platform | Client owns the code |
| Data/CMS | Framer CMS only | Any CMS, any database |
| Scalability | Limited by Framer plans | Unlimited |

### The Real Moat

Framer wins on **speed to pretty.** You can have a beautiful site with smooth transitions in hours. But:

1. **You can't fork a Framer site into an operations layer.** No AI agents, no memory system, no cron jobs, no automated workflows.
2. **You're locked to their platform.** If Framer raises prices or shuts down, your site goes with it.
3. **The transitions are the same ones everyone else has.** Every Framer site with "zigzag" transition looks identical. Custom GSAP work is unique.
4. **No backend logic.** Framer is purely frontend. Taylor's stack includes intelligent backend services.

### Tactical Takeaway

**Steal what works, build what they can't:**

1. **Match the polish:** Our Next.js + GSAP sites need to have transitions AT LEAST this smooth. If a prospect sees a Framer template that looks better than our portfolio, we lose before the pitch starts.

2. **Build a transition library:** Create reusable GSAP page transition components (crossfade, wipe, slide, morph) that we can drop into any client project. This is our "template" equivalent — but custom and owned.

3. **Use Framer as a reference, not a competitor:** In pitches, show the Framer example and say: "This is what $50/month gets you. Beautiful transitions, but locked to their platform with no backend, no AI, no ownership. We build the same polish with actual infrastructure underneath."

4. **Consider Framer for Starter tier:** For $3-5K projects where the client just needs a landing page, Framer might actually be the right tool. Faster delivery, lower cost. Save Next.js for Standard+ tiers where the client needs custom logic.

## Action Items

- [ ] Build a GSAP page transition component library (crossfade, wipe, slide, morph, mask)
- [ ] Add page transitions to the Taylor Maison site itself (eat own dog food)
- [ ] Evaluate Framer as a delivery tool for Starter tier projects
- [ ] Watch Hamza's "How I Learned Framer FAST" YouTube tutorial for technique patterns
- [ ] Bookmark @hxmzaehsan and @AliGrids as design inspiration sources

## Thread Sentiment (65K+ views)

The replies confirm what we already know — fluid transitions are table stakes for premium web design:
- "transitioning between the pages feels so seamless — it would certainly reduce bounce rate"
- "I am now devoting my life to UI after seeing this"
- "the developer who built this just broke every backend engineer's ego"
- One skeptic noted: "A lot of users will probably see a very choppy animation on lower end laptops" — valid concern for GSAP too, needs performance testing

---

---

## Addendum: Radial Burger Menu UI

*Source: @Aurelien_Gz (163❤️, 8.1K👁) resharing @designloomco's original (1.1K❤️, 69K👁). March 15, 2026.*

**What it is:** A radial/circular burger menu — instead of the standard dropdown hamburger, the menu items fan out in a circle around the trigger point. Built in Figma, designed for @huly_io. Called "Alohomora."

**Why it matters:**
- "We definitely need more radial UIs" — the thread consensus is that radial menus feel premium and differentiated
- Standard hamburger menus are table stakes. A radial menu is a conversation starter.
- This is a micro-interaction that makes a site feel custom-built, not templated

**Implementation for our stack:**
- GSAP + Framer Motion can handle the circular animation (staggered radial positioning with spring physics)
- CSS `transform: rotate()` + `translate()` for the circular layout
- Could be a reusable `<RadialMenu>` component

**Use case:** Premium tier sites where the nav itself should feel like an experience. Not for every project — for the ones where first impression is everything (luxury real estate, creative portfolios, boutique brands).

---

## Addendum: Brennan Jay Footer Design (Image-in-Footer Trend)

*Source: @Brennan_designs (261❤️, 5.8K👁, 111 bookmarks). March 14, 2026.*

**What it is:** A "Nietzsche" brand footer concept with two distinct zones:

**Upper section (white):**
- Logo left, 4 nav columns right (Main, Company, Application, Legal)
- Geometric sans-serif typography (Inter/DM Sans family)
- Generous whitespace, clinical and clean

**Lower section (full-bleed image):**
- Cinematic golden-hour landscape photograph as background
- Brand messaging and social icons overlaid on the image
- Warm amber/lavender tones, sustainability-focused branding
- Social icons: GitHub, Facebook, Threads, X

**Why Taylor loves this (and should steal it):**

1. **The "image in footer" trend is having a moment.** Thread comment: "I'm loving this image in footer trend." This is a design pattern that immediately elevates perceived quality.

2. **Contrast layering** — clinical white nav zone → warm cinematic imagery creates emotional impact at the end of the page. The user's last impression before leaving.

3. **Easy to implement in Next.js** — it's CSS (full-bleed image, text overlay, grid columns). No Three.js or GSAP needed. High impact, low effort.

4. **Perfect for Hamptons clients** — a luxury real estate site or boutique hotel with a drone shot of the property as the footer image? That's a closer.

**Implementation for Taylor Maison site:**
- Replace standard footer with two-zone layout
- Use a cinematic Hamptons/LA landscape as the lower section background
- Overlay: tagline left, social icons right, copyright bottom
- CSS `object-fit: cover` + `min-height: 400px` for the image section
- Add subtle parallax scroll effect on the image for premium feel

**Action items:**
- [ ] Redesign Taylor Maison site footer with image-in-footer pattern
- [ ] Source a hero landscape photo (Hamptons beach, LA skyline, or abstract)
- [ ] Add this pattern to the reusable component library as `<CinematicFooter>`

*Compiled by Murph Huxley, March 15, 2026*
