export interface GalleryItem {
  layout: 'full' | 'split' | 'offset'
  items: {
    label: string
    aspect: string
    image?: string
  }[]
}

export interface ProjectHighlight {
  label: string
  value: string
}

export interface Project {
  slug: string
  title: string
  category: string
  year: string
  description: string
  color: string
  url?: string
  thumbnail: string
  headline: string
  audience: string
  signatureMove: string
  impact: string
  highlights: ProjectHighlight[]
  brief: string
  challenge: string
  services: string[]
  gallery: GalleryItem[]
}

export const projects: Project[] = [
  {
    slug: 'roman-sanford',
    title: 'Roman Sanford',
    category: 'Web Design / Digital Security',
    year: '2026',
    description:
      'The referral already carried weight. The website needed to make that trust visible, qualify the right clients, and make the first conversation easier to win.',
    color: '#232323',
    url: 'https://romansanford.vercel.app',
    thumbnail: '/images/projects/roman-sanford/hero.png',
    headline:
      'Turning a quiet security reputation into a digital trust system.',
    audience:
      'High-net-worth individuals, family offices, and private estates where one wrong signal can end the conversation.',
    signatureMove:
      'Use the site as pre-qualification: restraint, authority, and a direct path from instinctive trust to inquiry.',
    impact:
      'The new presence turns a sensitive service business into a sharper trust engine: clearer positioning, stronger authority, and less explanation required on the first call.',
    highlights: [
      { label: 'Before', value: 'A generic presence for a high-stakes buyer' },
      { label: 'After', value: 'Trust before the first contact' },
      { label: 'Mechanism', value: 'Inquiry path built around discretion' },
    ],
    brief:
      'Roman Sanford already had serious capability and referral weight. The problem was that the digital presence did not carry the same authority. For a security consultancy serving high-net-worth individuals, family offices, and private estates, the website had to reduce doubt before anyone reached out. It needed to make the business feel credible, discreet, and operationally sharp in seconds.',
    challenge:
      'This was not a brochure problem. It was a trust conversion problem. Security buyers do not want noise, gimmicks, or over-explanation; they want to feel that every detail is controlled. The site had to act like a quiet intake screen: strong enough to reassure the right client, restrained enough to protect the brand, and structured enough to move serious inquiries toward a conversation.',
    services: ['Web Design', 'Brand Identity', 'Digital Strategy', 'Art Direction'],
    gallery: [
      {
        layout: 'full',
        items: [
          {
            label: 'Homepage hero',
            aspect: '16/9',
            image: '/images/projects/roman-sanford/hero.png',
          },
        ],
      },
      {
        layout: 'split',
        items: [
          {
            label: 'Services overview',
            aspect: '4/3',
            image: '/images/projects/roman-sanford/services-page.png',
          },
          {
            label: 'Photo gallery',
            aspect: '4/3',
            image: '/images/projects/roman-sanford/gallery.png',
          },
        ],
      },
      {
        layout: 'full',
        items: [
          {
            label: 'Call to action',
            aspect: '16/9',
            image: '/images/projects/roman-sanford/cta.png',
          },
        ],
      },
    ],
  },
  {
    slug: 'rs-black',
    title: 'RS Black',
    category: 'Web Design / Brand Identity',
    year: '2026',
    description:
      'An invitation-only offer needed a digital experience that filters the room before a conversation starts.',
    color: '#0a0a0a',
    thumbnail: '/images/projects/rs-black/hero.png',
    headline:
      'A premium security offer turned into a qualification system.',
    audience:
      'Private clients and partners who should feel selected, not sold to.',
    signatureMove:
      'Make the interface do qualification work: sparse information, controlled atmosphere, and clear signal for the right visitor.',
    impact:
      'RS Black became less of a hidden page and more of a controlled doorway: intrigue for the right audience, friction for everyone else.',
    highlights: [
      { label: 'Before', value: 'Too much access for the wrong visitor' },
      { label: 'After', value: 'Premium perception without overselling' },
      { label: 'Mechanism', value: 'A brand page designed as qualification UX' },
    ],
    brief:
      'RS Black is the invitation-only tier of Roman Sanford\'s security operation. It is not a public-facing offer in the normal sense; it is a controlled signal for a narrow audience. The digital experience had to help the business protect its own attention by making the right people lean in and the wrong people move on.',
    challenge:
      'Most websites try to explain more. This one needed to explain less and still create desire. The business value came from qualification: reducing noise, raising perceived seriousness, and making the page feel like a door that only opens for the right person. The result is a brand system that behaves more like a filter than a pitch deck.',
    services: ['Web Design', 'Brand Identity', 'UX Design', 'Creative Direction'],
    gallery: [
      {
        layout: 'full',
        items: [
          {
            label: 'Landing experience',
            aspect: '16/9',
            image: '/images/projects/rs-black/hero.png',
          },
        ],
      },
      {
        layout: 'split',
        items: [
          {
            label: 'Training modules',
            aspect: '4/3',
            image: '/images/projects/rs-black/modules.png',
          },
          {
            label: 'Testimonials and gallery',
            aspect: '4/3',
            image: '/images/projects/rs-black/gallery.png',
          },
        ],
      },
      {
        layout: 'full',
        items: [
          {
            label: 'Training gallery',
            aspect: '16/9',
            image: '/images/projects/rs-black/cta.png',
          },
        ],
      },
    ],
  },
  {
    slug: 'genuine-undead',
    title: 'Genuine Undead',
    category: 'Creative Direction / IP Development',
    year: '2025-2026',
    description:
      'A story universe needed infrastructure: a brand world, reader experience, and community front door that could grow with the IP.',
    color: '#17352b',
    url: 'https://www.genuineundeadcomics.com',
    thumbnail: '/images/projects/genuine-undead/homepage.png',
    headline:
      'Building audience infrastructure for an original IP, not just a comic site.',
    audience:
      'Readers, collectors, collaborators, and early believers evaluating whether the world is worth entering.',
    signatureMove:
      'Treat the universe like an operating system: narrative, visual identity, reader flow, and community touchpoints all reinforcing each other.',
    impact:
      'Genuine Undead now has a digital foundation for attention, sales, and community: not just a place to read, but a front door to the world.',
    highlights: [
      { label: 'Before', value: 'A new IP needed reasons to believe' },
      { label: 'After', value: 'World-building became a conversion asset' },
      { label: 'Mechanism', value: 'Brand, reader, lore, and community in one frame' },
    ],
    brief:
      'Genuine Undead was not starting with inherited audience trust. It needed to earn belief from scratch: story, design, reader experience, commerce, and community all had to make the universe feel real. The work was less about launching a comic page and more about building the infrastructure around an original IP so attention could turn into fandom.',
    challenge:
      'A universe breaks when the parts feel unrelated. The design system had to carry Ancient Egypt, feudal Japan, the American frontier, and cyberpunk Tokyo without losing coherence. The reader experience had to make the act of reading feel cinematic, not mechanical. The system thinking mattered as much as the visuals: every touchpoint needed to answer the same question for a new audience — is this world worth my time?',
    services: ['Creative Direction', 'Web Development', '3D Reader', 'Brand Identity', 'Community Building'],
    gallery: [
      {
        layout: 'full',
        items: [
          {
            label: 'Homepage and universe',
            aspect: '16/9',
            image: '/images/projects/genuine-undead/homepage.png',
          },
        ],
      },
      {
        layout: 'split',
        items: [
          {
            label: 'Issue zero',
            aspect: '4/3',
            image: '/images/projects/genuine-undead/characters.png',
          },
          {
            label: 'Reading experience',
            aspect: '4/3',
            image: '/images/projects/genuine-undead/timeline.png',
          },
        ],
      },
      {
        layout: 'full',
        items: [
          {
            label: 'Mint and collect',
            aspect: '16/9',
            image: '/images/projects/genuine-undead/community.png',
          },
        ],
      },
    ],
  },
  {
    slug: 'hampton-garden-party',
    title: 'Hampton Garden Party',
    category: 'Web Design / Brand Strategy',
    year: '2026',
    description:
      'A local luxury brand needed its digital presence to sell confidence before the host ever asked about logistics.',
    color: '#536648',
    thumbnail: '/images/projects/hampton-garden-party/homepage.png',
    headline:
      'Turning atmosphere into an inquiry engine for a Hamptons-facing brand.',
    audience:
      'Hosts, event clients, and premium local partners who buy taste, calm, and confidence before they buy logistics.',
    signatureMove:
      'Make the site slow the buyer down while quietly moving them toward inquiry.',
    impact:
      'Hampton Garden Party gained a calmer, more premium presence that makes the experience feel handled before the first email.',
    highlights: [
      { label: 'Before', value: 'Luxury service was harder to feel online' },
      { label: 'After', value: 'Higher confidence before inquiry' },
      { label: 'Mechanism', value: 'Mood, proof, and contact path working together' },
    ],
    brief:
      'Hampton Garden Party sells an experience before it sells a service. In a market where taste is part of the product, the digital presence had to create confidence before the first email: this will feel beautiful, this will be handled, and these people understand the world they are serving.',
    challenge:
      'The hardest design challenge is making atmosphere useful. The site had to evoke a Hamptons garden afternoon without falling into local cliche, while still giving visitors a clear path to inquire. The system needed to balance softness and conversion: enough calm to feel premium, enough structure to turn interest into a real conversation.',
    services: ['Brand Strategy', 'Web Design', 'Visual Identity', 'Art Direction'],
    gallery: [
      {
        layout: 'full',
        items: [
          {
            label: 'Homepage atmosphere',
            aspect: '16/9',
            image: '/images/projects/hampton-garden-party/homepage.png',
          },
        ],
      },
      {
        layout: 'split',
        items: [
          {
            label: 'Editorial mood',
            aspect: '4/3',
            image: '/images/projects/hampton-garden-party/hero.png',
          },
          {
            label: 'Table setting direction',
            aspect: '4/3',
            image: '/images/projects/hampton-garden-party/hero.png',
          },
        ],
      },
      {
        layout: 'full',
        items: [
          {
            label: 'Brand world reference',
            aspect: '16/9',
            image: '/images/projects/hampton-garden-party/hero.png',
          },
        ],
      },
    ],
  },
]
