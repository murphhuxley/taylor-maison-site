# Case Study Asset Shot List

Reference for producing/curating the images each case study should use. The current folders contain only page screenshots; the goal is to replace those with real project assets so the hero and gallery can hold HTML type without competing composed text.

Naming convention: per-project folder `public/images/projects/{slug}/` with semantic filenames.

---

## Roman Sanford
**Read:** Architectural intelligence. Private, precise, quiet authority. Visual vocabulary borrowed from surveillance, private architecture, and the aesthetics of institutions that don't advertise.

### Hero (one image, landscape 16:9 or 3:2)
Low-light environmental shot or a composed still life. Candidates:
- An empty, architectural interior with strong geometry (a private lobby, a stone staircase shadow, a black lacquered surface)
- A single, photographed detail of the brand identity on material (letterpress business card at an angle, a folded brief on a dark desk)
- A macro of the wordmark rendered on physical substrate (embossed, debossed, blind-foil on dark stock)

Keep the frame quiet; negative space in one corner for overlay type. No website chrome. No composed headlines.

### Body / gallery
- Identity system: wordmark on three surfaces (paper, metal, screen)
- Color + type specimen plate (black, charcoal, accent)
- A process artifact: one frame of the brand strategy doc, or a single moodboard page
- Applied-in-context: a closed folder, a key card, a signage mockup in the style of the work

### Remove
- `hero.png`, `cta.png`, `services.png`, `services-page.png`, `gallery.png` — keep for the live-site row but move them to `/screens/` and stop using them as hero.

---

## RS Black
**Read:** Classified tier. More austere, more controlled, more mood than logic. Redaction aesthetic. Less is the message.

### Hero (portrait crop or extreme landscape letterbox)
- A near-black frame with a single ink-level detail — a seal, a foil emboss, a redaction mark, a folded cover
- A physical brief photographed flat-lay on a dark surface, corner lit
- Type specimen shot: one word, one weight, on black, sharp edge

Even more negative space than Roman Sanford. The hero should look like a document you weren't supposed to receive.

### Body / gallery
- Logo construction grid (one frame only)
- Tiny-detail shots: crop-ups of the identity, micro type, file-tab edges
- Training module identity marks (isolated, black on black, caught in light)
- One environmental/in-situ shot if it can be found — a briefcase, a physical credential

### Remove
- `hero.png`, `cta.png`, `gallery.png`, `modules.png` — move to `/screens/` if needed for a "live site" row.

---

## Genuine Undead
**Read:** Narrative architecture. Multi-century comic IP. The strongest visual brand-asset library of the four. The hero should be **art**, not a webpage.

### Hero (key frame from the IP universe)
- A cover illustration from Issue Zero
- A character turnaround — a single hero character against black/white — painted at full resolution
- A panel spread cropped to a single dramatic frame
- The logotype painted into environmental art

### Body / gallery
- Character line-up (2–4 characters, full figure, studio black bg)
- Panel art detail — a single high-contrast page
- Timeline/world diagram (the narrative architecture made visible)
- The 3D reader device mock (one clean frame)
- Community artifact — a collector card, a mint invitation

### Existing files likely reusable
- `characters.png` — if it's character art (not a characters-page screenshot), it's a strong hero candidate
- `timeline.png` — possibly usable if it reads as IP artifact rather than webpage
- Move `homepage.png`, `community.png` to `/screens/`

---

## Hampton Garden Party
**Read:** Summer afternoon light. Warm, editorial, unhurried. Hospitality. Should feel like a magazine feature, not a brochure.

### Hero (natural-light environmental photograph)
- A Hamptons garden in dappled late-afternoon light (no people, no text)
- A styled still life: linen napkin, florals, a printed invitation, a coupe glass
- A macro of the wordmark printed on a physical piece (menu card, signage, ribbon)
- An editorial portrait-style vignette: table setting at golden hour, slight blur

### Body / gallery
- Wordmark on collateral: menu, invitation, ribbon, signage
- Palette + type specimen (soft greens, creams, warm accent)
- In-situ photography: table, garden, centerpiece detail
- A print piece — handwritten place card, a folded menu, a branded coaster

### Remove
- `hero.png`, `homepage.png` — move to `/screens/`

---

## File organization proposal
```
public/images/projects/{slug}/
├── hero.jpg                      # the new one, non-screenshot
├── gallery/
│   ├── 01-identity.jpg
│   ├── 02-detail.jpg
│   ├── 03-context.jpg
│   └── ...
└── screens/                      # existing page screenshots, kept for reference
    ├── homepage.png
    ├── hero.png (old)
    └── ...
```

Once the `hero.jpg` exists per project, `lib/projects.ts` gets updated to point at the new paths and the old paths move under `/screens/`. The case study page will continue to render whatever's in the `gallery` array of `projects.ts`, so new items drop in naturally.

---

## Status
- **Before launch:** at minimum, each project needs ONE new non-screenshot hero image.
- **Nice to have:** 3–4 true brand assets per project for a full gallery that feels like actual design documentation rather than a link tour.
