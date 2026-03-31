# Taylor Maison Creative — Master Strategy Doc
*Living document. Updated March 12, 2026.*

---

## The Thesis

Taylor Maison Creative is not a web agency. It's a **service-as-software company** disguised as a web agency.

Phase 1: Sell websites. Beautiful, premium, animation-forward.
Phase 2: Sell the systems behind the websites. AI agents, automations, intelligent workflows.
Phase 3: Fork the entire operations layer for each client. Recurring revenue. The moat.

The website is the Trojan horse. The agent stack is the business.

---

## Why Now

From 100 recent bookmarks + market research (March 2026):

- **@shivsakhuja** is using Claude Code for ALL GTM execution — outbound, leads, SEO, CRM. Not coding. Business operations. Revenue: growing SaaS. One-person team.
- **@elvissun** built an OpenClaw agent that earned $1,505 in X payouts from 9.3M impressions in 33 days. The agent runs itself.
- **FelixCraftAI** — tokenized OpenClaw agent — hit $73K revenue from 4 streams.
- **@hooeem** published a Claude Skills course that got 989K impressions and 9,103 bookmarks in 24 hours. The market is hungry.
- **Anthropic** quietly published a case study of one person running an entire growth marketing operation with Claude. The one-person agency is no longer theoretical.

The consensus: **GTM-as-code is real.** The agency model is flipping from manual labor to systematized infrastructure. Taylor has the agent stack already running. Most people in this space are using Claude raw — Taylor has specialized agents (Murph, Reed, HuxCap) and a memory system.

---

## Service Stack (Current)

### Websites
| Tier | Price | Delivery | Stack |
|------|-------|----------|-------|
| Starter | $3-5K | 2 weeks | Next.js + GSAP + Vercel |
| Standard | $8-12K | 4-6 weeks | + CMS + animations + SEO |
| Premium | $15-25K | 8-12 weeks | + AI chatbot + automations + intelligent workflows |

### 3D Property Tours
| Service | Price | Delivery |
|---------|-------|----------|
| Single property scan | $1,000 | Same day |
| Bundled (3 scans w/ Standard tier) | Included | Per project |
| Retainer (5/mo for agencies) | $4,000/mo | Ongoing |

**Pipeline:** Taylor shoots walkthrough video → Murph processes everything (Polycam → SuperSplat → web embed).

### Retainer (Monthly)
| Service | Price |
|---------|-------|
| Maintenance + updates | $1,500-3,000/mo |
| AI tool development | $2,000-5,000/mo |
| Full operations layer (forkable org) | $5,000-10,000/mo |

---

## New Services to Build (From Bookmark Intelligence)

### 1. AI Brand Identity Package
**Source:** @jameygannon's Midjourney system — consistent brand imagery without complex prompting.

**What:** Consistent AI-generated brand assets (social templates, product shots, lifestyle imagery) using a trained style system. Client gets 50+ on-brand images per month instead of hiring a photographer or design agency.

**Price:** $2,000-4,000 as add-on, or $1,500/mo retainer.

**Build needed:**
- [ ] Research Jameygannon's Midjourney workflow (watch the Claire Vo episode)
- [ ] Build a SKILL.md for brand asset generation
- [ ] Create 3 sample brand identity packs (for portfolio)

**Status:** Not started.

### 2. AI Listing Video Generator
**Source:** @recap_david — luxury real estate listing videos from a Zillow link for $10. @ashen_one replicated it with local qwen on a Mac Mini.

**What:** Input: property photos/Zillow link. Output: cinematic 30-60 second listing video with music, transitions, property details overlay. Complements the 3D scanning service.

**Price:** $500/video, or bundled with property scan ($1,200 for scan + video).

**Build needed:**
- [ ] Research the actual pipeline (which AI video tools: Kling, RunwayML, Pika?)
- [ ] Build automated workflow: photos → script → video generation → editing → delivery
- [ ] Test with a real property listing

**Status:** Not started.

### 3. GTM-as-Code / Outbound Engine
**Source:** @shivsakhuja's Claude Code GTM stack — outbound campaigns, lead finding, SEO pages, CRM management.

**What:** Automated outbound system for clients. Find ideal customers, personalize outreach, manage follow-ups, book meetings. The "sales team in a box."

**Price:** $3,000-5,000 setup + $2,000/mo management.

**Build needed:**
- [ ] Map Shiv's workflow into reproducible skill files
- [ ] Build lead finder skill (industry + location + intent signals)
- [ ] Build outreach personalization skill
- [ ] Integrate with common CRMs (HubSpot, Airtable, Notion)
- [ ] Test on Taylor Maison Creative itself (eat own dog food)

**Status:** Not started. **Highest priority new build.**

### 4. Screenshot → Website Recreation
**Source:** @Suryanshti777 — pixel-perfect UI recreation from screenshots.

**What:** Speed up client builds by screenshotting competitor/inspiration sites and having AI recreate the layout, then customize. Cuts Starter tier delivery from 2 weeks to 3-5 days.

**Build needed:**
- [ ] Test the workflow with Claude Code / Cursor
- [ ] Document the prompt and workflow
- [ ] Add to dev-sprint-rules.md

**Status:** Not started. Low effort, high impact on margins.

---

## Forkable Orgs (Phase 3 — The Moat)

**The vision (confirmed by Taylor March 9):** Every Premium client gets a forked version of Taylor's operations layer. Not just a website — a running system.

**What a fork includes:**
- SOUL.md (customized for their business identity)
- Skill library (industry-specific: real estate skills, restaurant skills, etc.)
- Memory system (client knowledge base, customer data, procedures)
- Cron jobs (automated reports, content scheduling, lead monitoring)
- Agent stack (1-3 specialized agents per client)

**Revenue model:**
- Setup: $15-25K (included in Premium tier)
- Monthly: $2-5K/mo (operations + maintenance + AI tool development)
- Annual value per client: $39-85K

**Why this is defensible:** The switching cost is enormous. Once a client's operations run through the fork, leaving means rebuilding everything. The agent learns their business over time — it gets more valuable, not less.

**What needs building:**
- [ ] Fork template (blank SOUL.md + base skill set + memory structure)
- [ ] Client onboarding skill (extracts business knowledge → populates fork)
- [ ] Industry skill packs (real estate, restaurant, events, security)
- [ ] Client dashboard (simple web UI showing agent activity, tasks completed, value delivered)

**Status:** Architecture conceptualized. No code yet.

---

## Sales Ammo (From Bookmarks)

Use these in pitches, proposals, and social proof:

1. **"Last year this landing page cost $120K and 6 months. This year a better one got built in a weekend with AI."** — @thatguybg. Anchor high, then present Taylor's pricing as a bargain.

2. **"The gap between a prompt engineer and a systems architect is $150K."** — @rohit4verse. Position Taylor as systems architect, not just a web designer.

3. **"One Claude prompt. One night. $3,000 on Polymarket by morning."** — Demonstrates AI capability to skeptical clients.

4. **"$5K AI automation for a plumbing company — runs the entire admin side."** — @hamza_automates. Proof that local service businesses pay for this.

5. **"30 things automated with AI agents for $140/month."** — Scale argument for the retainer pitch.

---

## Competitive Intelligence

### Who's doing this (from X discourse):

| Builder | What They're Doing | Revenue | Taylor's Edge |
|---------|-------------------|---------|---------------|
| @shivsakhuja | Claude Code for all GTM | Growing SaaS | Taylor has multi-agent stack, not just Claude Code |
| @elvissun | OpenClaw agent business | $1,505 X payout/33 days | Taylor has real-world clients, not just X revenue |
| FelixCraftAI | Tokenized OpenClaw agent | $73K total | Taylor has services + recurring, not one-time products |
| @tolibear_ | souls.zip (agent workspace fixer) | Launching | Taylor has the actual client delivery, not just tooling |
| @WorkflowWhisper | Vertical AI agency model | Unknown | Both doing the same thing — Mark Cuban playbook |

**Taylor's unique position:** Local relationships + agent infrastructure + service delivery. Most competitors are either all-tech-no-clients or all-clients-no-tech. Taylor has both.

---

## Market Research: The AI Labour Market Shift

**Source:** @hooeem — "How to Survive the AI Labour Market Apocalypse" (130K views, 794 bookmarks, March 12 2026). Synthesizes Anthropic's Economic Index, IMF modeling, and Bureau of Labor Statistics data.

### The 94/33 Gap
AI can theoretically execute 94% of all computer/mathematical tasks. Only 33% are currently deployed in the real world. The gap exists because of legal/compliance friction, integration costs, and hallucination risk in high-stakes environments. **This gap is Taylor's sales window.** It will close as adoption matures — the question isn't if, but when.

### Who Gets Hit
- Bachelor's degree holders: **27% exposure** to AI automation
- No high school diploma: **3% exposure**
- Most exposed demographics: older, female, highly educated, higher-paid
- "The person pouring your beer is more job-secure than the person managing your portfolio"

### The Entry-Level Paradox
Workers aged 22-25 are being hired less frequently in high-AI-exposure professions. Not fired — never hired. Companies use AI for foundational tasks that were the training ground for junior employees. The corporate ladder is losing its bottom rungs. **This is invisible in unemployment data but devastating long-term.**

### Why This Validates Taylor Maison Creative

hooeem's 6-phase action plan for individuals maps directly to what TMC sells to businesses:

| hooeem's Advice (Individual) | TMC Service (Business) |
|------------------------------|----------------------|
| Map tasks as Red/Amber/Green | Business audit → AI readiness assessment |
| Build AI literacy | TMC IS the AI literacy layer |
| Reposition as AI Orchestrator | Forkable org = orchestration-as-a-service |
| Document value with hard data | Dashboards + reporting in retainer |
| "The person who owns the knowledge of a tool is last to be replaced by it" | **TMC's entire moat** — clients who fork the ops layer own the knowledge |

### Key Stat for Pitches
- Teams that redesign processes around AI are **2x more likely to exceed revenue targets** vs those that bolt AI onto old workflows (Gartner)
- Executive AI adoption is high; frontline employee adoption stalled at **51%** — the gap TMC bridges
- When leadership visibly supports AI adoption, positive frontline sentiment jumps **15% → 55%**

### Three Scenarios (2027-2030)
1. **Displacement Spiral:** Mass automation → consumer spending collapse → "Ghost GDP" (AI output that doesn't circulate in the real economy)
2. **Blue-Collar Renaissance:** Physical world bottleneck creates massive demand for trades. Electricians > software engineers.
3. **Machines of Loving Grace:** AI compresses 100 years of science into one decade. Post-scarcity.

**Reality:** Likely a messy collision of all three across different industries and geographies simultaneously. TMC is positioned for all three — websites serve Scenario 2-3 businesses, forkable orgs serve Scenario 1 survivors.

**Article URL:** `https://x.com/i/article/2031819477608763393`

---

## Implementation Priority (March-April 2026)

### Week of March 12-18
- [ ] **GTM Engine (for ourselves):** Build the outbound lead finder. Test on Hamptons targets.
- [ ] **Portfolio:** Take screenshots of Roman Sanford, RS Black, GU, Hampton Garden Party for case studies
- [ ] **Sales ammo:** Save bookmark tweet links into a swipe file

### Week of March 19-25
- [ ] **AI Brand Identity:** Research + test Midjourney workflow
- [ ] **Listing Video:** Research AI video pipeline (Kling/Runway)
- [ ] **Screenshot → Website:** Test and document the workflow

### Week of March 26-April 1
- [ ] **Fork template:** Build blank client fork structure
- [ ] **Client onboarding skill:** First draft
- [ ] **Pitch deck:** Compile everything into a shareable PDF/site

### April (Pre-Hamptons)
- [ ] **JB Andreassi demo:** Property scan + website mockup
- [ ] **First outreach emails** using the GTM engine we built
- [ ] **GU Kickstarter** (if Taylor picks it back up)

---

## Key Metrics to Track

| Metric | Target | Current |
|--------|--------|---------|
| Portfolio case studies | 4 | 0 (sites exist, copy not written) |
| Outreach conversations started | 10 by April | 0 |
| New services tested | 3 | 1 (property scan) |
| Forkable org template | v1 by April | Not started |
| Pipeline value | $50K+ | $0 |
| Revenue (May) | $9,000 | — |

---

---

## Case Study: Oliver Henry / LarryLoop — The Productization Playbook

*Source: @oliverhenry X article (681❤️, 410K👁, 3.5K bookmarks). March 21, 2026.*

### What He Built

Oliver Henry built "Larry," an AI agent on OpenClaw that automates TikTok content marketing. Larry generates slideshows, posts them, tracks performance, and iterates. Results: 1.6M TikTok views, hundreds of paying subscribers, runs his entire content marketing while he spends 60 seconds/day adding music.

### The Two-Tier Model

| Tier | Product | Audience | Pricing |
|------|---------|----------|---------|
| Power users | **LarryBrain** (skills marketplace) | OpenClaw users (10K) | Free skill |
| Everyone else | **LarryLoop** (SaaS dashboard) | Non-technical (7M article readers) | Paid SaaS |

The free skill on LarryBrain is the hook. It builds community, gets him known, creates social proof. LarryLoop (larryloop.com) is the revenue engine — same AI, zero friction, sign in with Google.

### The Feedback Loop (Core IP)

```
Generate content → Post → Track what happened → Learn from data → Generate better content
```

The critical differentiator: he tracks **revenue**, not just views. Stripe/RevenueCat integration tells him which post with 5K views drove 8 paying subscribers vs which post with 200K views drove zero. Content optimization against money, not vanity metrics.

### How This Maps to Taylor Maison Creative

| Oliver's Journey | Our Equivalent |
|---|---|
| Built Larry for his own apps | Built Murph/Reed/HuxCap for Taylor's businesses |
| Free skill on LarryBrain (10K users) | Free base skills on ClawHub |
| LarryLoop SaaS for everyone else | Forkable orgs: managed agent ops for clients |
| "I hated marketing, so I automated it" | "Hamptons businesses hate digital, so we handle it" |
| Revenue attribution (Stripe → content) | Dashboard + reporting in retainer |
| Content self-improves via feedback loop | Reed should self-improve via performance data |

### Key Quote

"For the 10,000 people who already use OpenClaw, that's nothing. But for the other 6,990,000 people? They didn't know what OpenClaw was."

This is the Starter vs Premium tier gap. The skill is the hook. The managed service is the revenue.

### What to Steal

1. **Feedback loop as product** — Reed needs revenue attribution, not just impressions
2. **Two-tier distribution** — free skill (community) + paid managed service (revenue)
3. **The "60 seconds a day" pitch** — quantify the time savings for prospects
4. **Content that compounds** — "Week 1 learning, Month 1 knows your audience, Month 3 it's a machine"

### Oliver's Full Body of Work (Study List)

- Original Larry article: x.com/oliverhenry/status/2022011925903667547 (7M views)
- LarryBrain: larrybrain.com (skills marketplace)
- LarryLoop: larryloop.com (SaaS product)
- Larry's X account: @LarryClawerence
- Larry's community: x.com/i/communities/2020254386430300547

---

*This is the plan. Now we build.*

*Maintained by Murph Huxley. Last updated: March 22, 2026.*
