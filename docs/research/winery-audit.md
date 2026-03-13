# Hamptons Winery Website Audit
**Taylor Maison Creative — Research Cycle 2**
**Date:** March 10, 2026
**Researcher:** Murph Huxley

> Summer is peak tasting season. Sites need to be ready by May. Window to close is closing fast.

---

## Summary Scorecard

| Winery | Grade | E-Commerce | Online Booking | Wine Club | Est. Value | Priority |
|--------|-------|-----------|---------------|-----------|------------|----------|
| Wölffer Estate | Modern | ✅ Shopify | ✅ | ✅ | Pass | Low |
| Channing Daughters | Dated | ⚠️ Basic | ❌ | ⚠️ Thin | $8K–$12K | High |
| Duckwalk Vineyards | Dated | ⚠️ Offsite | ❌ Phone only | ⚠️ Mention only | $7K–$10K | High |
| Mattebella Vineyards | Dated | ❌ | ❌ | ⚠️ Form | $8K–$12K | High |
| Macari Vineyards | Dated/Broken | ❓ JS-broken | ❓ | ❓ | $10K–$15K | High |
| Kontokosta Winery | Dated | ❌ | ❌ Walk-in only | ⚠️ Blurb only | $10K–$15K | High |
| Harbes Family Farm | Dated | ⚠️ Square off-site | ❌ | ⚠️ Email signup | $8K–$12K | Medium |
| Shepherd's Run | **NOTE: RI** | ✅ Shopify | ✅ | N/A | N/A | N/A |

---

## Detailed Audits

---

### 1. Wölffer Estate Vineyard
**URL:** wolffer.com
**Grade: MODERN** ✅

The benchmark. This is what good looks like for an LI winery.

**What they have:**
- Full Shopify e-commerce with product catalog (wine, cider, spirits, merch)
- Tasting room reservations page with booking flow
- Wine club with clear value props (15% off, exclusive releases, events)
- Wine Stand separate experience page
- Private events / weddings section
- Active blog/news
- Clean navigation, Instagram integration

**Issues (minor):**
- Some products showing "Sold out" with no restock notification
- Could improve wine education/story content

**Verdict:** Pass. Not a TMC prospect at this time. Use as competitive benchmark when pitching others.

**Estimated Project Value:** N/A — they're covered.

---

### 2. Channing Daughters Winery
**URL:** channingdaughters.com (Squarespace)
**Grade: DATED** ⚠️

Squarespace site that was probably built 2018–2020 and hasn't been significantly updated. Content is dense and text-heavy. The winery itself is excellent (30 varieties, artisanal production, cult following) — the site doesn't do it justice.

**Specific Issues:**
- **No online booking system.** Visiting Us page exists but no reservation widget — just hours and a "We are Open!!" headline that reads like a COVID-era update
- **Wine Club is thin.** Has a section but the flow is minimal — no benefit breakdown, no tier comparison
- **Events page exists** but unclear if it's kept current (Squarespace sites notoriously go stale)
- **Shop exists** but redirects through Squarespace Commerce — limited catalog presentation
- **Photography:** Relies on blog/Instagram — no hero lifestyle imagery visible in page structure
- **Artist Series (2019/2020)** still prominently in nav — 5–6 year old feature
- **ADA Commitment** page is listed in nav — usually means they had a legal issue, site accessibility may be outdated

**The Pitch:** "You're one of the most interesting wineries on Long Island. Your site is not. Let's fix that before summer."

**Seasonal Urgency:** HIGH — they do walk-in tasting season May–Oct. If the booking experience isn't improved before Memorial Day, they're leaving reservations on the table every weekend.

**Estimated Project Value: $8K–$12K**
- Redesign on Webflow or Squarespace 2.0
- Booking integration (Tock or Resy)
- Wine club funnel rebuild
- Events calendar system

---

### 3. Duckwalk Vineyards (Water Mill & Southold)
**URL:** duckwalk.com (WordPress)
**Grade: DATED** ⚠️

Family-owned, well-known local brand, two locations. The site is functional but clearly not updated with modern UX standards. Layout and typography feel early-to-mid 2010s.

**Specific Issues:**
- **No online booking.** Reservations for groups 6+ are phone-only (631-726-7555). In 2026, this is money left on the table
- **E-commerce offsite.** Shop links go to `shop.duckwalk.com` — a separate subdomain, which breaks the user journey and likely has low conversion
- **Wine Club is buried.** Just a bullet point on the tasting room page: "Special Tasting Benefits & Discounts for Members." No landing page, no signup flow visible
- **Events.** Site mentions live music Saturdays but no events calendar
- **Instagram integration broken** — the tasting room page shows "Instagram has returned invalid data" in the page source
- **Photography:** Low-res and generic feeling based on site structure
- **Two-location complexity** handled poorly — Water Mill vs. Southold not clearly differentiated for visitors

**The Pitch:** "You're one of the best-known names in Hamptons wine. Your site is sending people to a phone call in 2026."

**Seasonal Urgency:** HIGH — peak season runs May–Oct. Live music Saturdays + summer foot traffic = they need an experience that converts.

**Estimated Project Value: $7K–$10K**
- WordPress refresh or migration to Webflow
- Integrated Tock/OpenTable-style booking
- Proper wine club landing page + signup
- Events calendar
- Fix broken Instagram feed

---

### 4. Mattebella Vineyards
**URL:** mattebella.com (Squarespace — basic)
**Grade: DATED** ⚠️

Very minimal content surfaced. The homepage is mostly a seasonal vibe section ("Summer at the Tasting Cottage," "Crisp Fall Days") with minimal nav. The site appears to be a very lean Squarespace build.

**Specific Issues:**
- **No e-commerce visible.** No shop/order online flow on the main site
- **Wine Club: paper form flow.** Has a "Membership Application" page — almost certainly a PDF or basic form, not a modern signup flow
- **Reservations exist** as a nav item but unclear what system is behind it (likely a basic contact form or Squarespace bookings)
- **Events** listed in nav — no indication it's actively maintained
- **Photography:** Seasonal copy sections suggest imagery exists but no hero photography evident from site structure
- **404 on /visit** — the /visit URL returns a 404, meaning they either moved it or it's broken. Bad for SEO and user experience
- **Located on North Fork** (Southold, NY-25) — technically outside the Hamptons but within the Long Island Wine Country corridor

**The Pitch:** "You have a beautiful Tasting Cottage. Your site doesn't show it. Let's build something that sells the experience before they even arrive."

**Seasonal Urgency:** HIGH — tasting cottage season is summer, need site ready before May.

**Estimated Project Value: $8K–$12K**
- Full Squarespace redesign or Webflow migration
- Proper reservation system integration
- Wine club signup flow
- Wine catalog with e-commerce
- Events calendar

---

### 5. Macari Vineyards
**URL:** macariwines.com (JavaScript SPA — likely React/Next.js)
**Grade: DATED (functionally broken without JS)** ⚠️

The site renders almost no content without JavaScript enabled — just a brief about blurb and press quotes. This indicates a heavy SPA (single-page application) architecture. While it may look fine in a browser, it's a significant SEO liability and accessibility problem.

**Specific Issues:**
- **JS-dependent architecture** — search engines may struggle to index it properly; accessibility tools can't read it; slow initial load
- **Cannot assess e-commerce** — site requires JS to render product pages
- **Cannot assess booking** — same issue
- **Wine Club status unknown** — likely exists but can't evaluate from fetch
- **The winery is substantial** — 500 acres, North Fork waterfront, biodynamic, press-covered by Food & Wine. The site may underserve their brand
- **"Wines" page returns JS disabled error** on the search snippet — confirmed SPA dependency issue

**The Pitch:** "Your wines have been in Food & Wine. Your website can't be indexed by Google. Let's fix that."

**Seasonal Urgency:** HIGH — biodynamic, press-worthy winery in peak summer market deserves a site that works.

**Estimated Project Value: $10K–$15K**
- Full site rebuild (Webflow recommended — clean, fast, SEO-friendly)
- Proper e-commerce (Shopify integration or Commerce Layer)
- Wine club with member portal
- Events, tasting reservations
- SEO recovery

---

### 6. Kontokosta Winery
**URL:** kontokostawinery.com (appears to be NextGuest/CMS-hosted)
**Grade: DATED** ⚠️

The site has some great content (waterfront views, Gold medal wines, private events business doing $25K–$35K site fees) but the digital experience doesn't match the premium positioning.

**Specific Issues:**
- **No e-commerce.** /shop redirects back to homepage. There is literally no online wine purchasing
- **No online booking.** "Walk-ins welcome on a first come, first served basis" — that's it. No reservation system
- **Wine Club blurb only.** "Bluff Road Club" is described in a paragraph but there's no CTA, no signup form, no member portal link
- **Events: none visible.** Site has no events section
- **Private Events CTA links to #** (blank anchor) — dead link
- **Visitor Information Guide** links to a CloudFront PDF from 2022 — stale
- **"Closed Tuesday and Wednesday"** hours are prominent but there's no seasonal calendar or updated hours section
- **Design feel:** Generic CMS template, no distinctive visual identity

**The Pitch:** "You're charging $25K–$35K for private events. Your website sends people to a PDF from 2022 and a dead link."

**Seasonal Urgency:** CRITICAL — event business books months in advance. Summer bookings happen in February–April. They may already be missing events.

**Estimated Project Value: $10K–$15K**
- Full redesign (Webflow)
- E-commerce wine shop
- Online tasting reservation system
- Wine club signup + member benefits page
- Private events inquiry flow (not a dead #link)
- Events calendar

---

### 7. Harbes Family Farm & Vineyard
**URL:** harbesfamilyfarm.com (WordPress)
**Grade: DATED** ⚠️

Harbes is a multi-attraction farm operation (barnyard, orchard, vineyard) rolled into one big site. The vineyard section feels bolted on. The main site is functional but chaotic — it tries to serve too many audiences at once (families with kids, wine buyers, season pass holders).

**Specific Issues:**
- **E-commerce offsite.** Wine shop links to `squareup.com/store/harbes-wines` — a Square storefront completely outside their brand. No integration, no cohesion
- **Wine Club: email signup only.** "To join our Wine Club, please contact us at harbeswines@gmail.com" — gmail.com. Not even a professional email address
- **No reservations.** Explicitly states "We do not accept reservations. All seating is first come, first served."
- **No events calendar** visible on vineyard section
- **Vineyard buried** inside farm site — a wine buyer has to navigate through barnyard adventure, mini Highland cow encounters, and season passes before finding wine content
- **Closed for season** messaging is prominent and seasonal confusion is high
- **The pitch problem:** Harbes has award-winning wines (Platinum at NY Wine Classic 2025 for 2014 Merlot) but the site makes them look like an afterthought to pumpkin picking

**The Pitch:** "Your Merlot just won Platinum at the NY Wine Classic. You're sending buyers to a Gmail address and a Square popup. Time for a standalone wine brand presence."

**Seasonal Urgency:** MEDIUM — farm operation is closed in winter, wine barn reopens in spring. May deadline is still relevant for summer wine sales.

**Estimated Project Value: $8K–$12K**
- Standalone wine brand microsite (Webflow)
- Proper Shopify or commerce integration
- Wine club with real signup flow
- Tasting barn experience page
- Events/seasonal calendar

---

### 8. Shepherd's Run
**NOTE: Geographic Mismatch**

Shepherd's Run (shepherds.run) is located in **South Kingstown, Rhode Island** — not the Hamptons. This is a different business than what may have been intended on the prospect list.

**If there's a Hamptons winery by this name:** Could not locate it — the .com is for sale on HugeDomains ($13,095), which suggests either the winery doesn't have a web presence or is operating under a different domain.

**The shepherds.run site (Rhode Island) — FYI Grade: MODERN**
- Shopify-based, clean design
- Online room reservations (hotel/inn)
- Winery reservations (online)
- Spa/wellness bookings
- Events, retail wine shop
- Good structure, though room booking system noted as "currently under maintenance"

**Recommendation:** Clarify with Taylor whether Shepherd's Run was a Hamptons-specific lead or if the list needs a substitute. Possible replacements: Jamesport Vineyards, Bedell Cellars, Osprey's Dominion, or Laurel Lake Vineyards.

**Estimated Project Value for RI site:** N/A (wrong territory)

---

## Key Findings

### The Real Opportunity
Six out of seven Hamptons/LI wineries have significant website deficiencies. The common failure pattern:

1. **No online booking** — phone calls only or walk-in only, leaving Memorial Day–Labor Day revenue on the table
2. **Broken or offsite e-commerce** — Square popups, Shopify subdomains, or nothing
3. **Wine club as an afterthought** — mentioned in a paragraph, no conversion flow
4. **Stale content** — 2020-era pandemic language, 2022 PDFs, broken Instagram feeds
5. **No events infrastructure** — summer is event season and none of these sites can surface it properly

### Hottest Prospects

**Tier 1 — Close Now (Pre-Summer Urgency):**
- **Kontokosta** — premium waterfront venue, dead private events link, zero e-commerce. $10K–$15K
- **Macari** — broken SPA architecture, press-covered winery, biodynamic story. $10K–$15K

**Tier 2 — Strong Pitches:**
- **Channing Daughters** — cult winery, Squarespace site from 2018, artistic community = potential for something visually beautiful. $8K–$12K
- **Duckwalk** — high visibility, two locations, broken Instagram feed literally visible in their page HTML. $7K–$10K

**Tier 3 — Good Fits, Lower Urgency:**
- **Mattebella** — broken /visit link, no e-commerce. $8K–$12K
- **Harbes** — needs standalone wine identity, Gmail for wine club. $8K–$12K

### Timing
**Hard deadline: May 1.** Memorial Day weekend is the unofficial start of Hamptons season. Any winery that wants summer revenue impact needs a new site live by then. That means Taylor needs to be closing deals in **March–April** for May launches.

---

*Audit completed March 10, 2026 by Murph Huxley for Taylor Maison Creative*
