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
      'A digital presence built to earn trust before anyone says a word — for a security consultancy whose clients can\'t afford the wrong first impression.',
    color: '#232323',
    url: 'https://romansanford.vercel.app',
    thumbnail: '/images/projects/roman-sanford/hero.png',
    headline:
      'A digital presence engineered to build trust before a single conversation begins.',
    audience:
      'High-net-worth individuals, family offices, and private estates choosing security partners on instinct and signal.',
    signatureMove:
      'Use restraint as a status signal: architectural structure, darkness, and zero wasted explanation.',
    impact:
      'Roman Sanford went from generic web presence to a site that feels like quiet intelligence infrastructure.',
    highlights: [
      { label: 'Signal', value: 'Authority without noise' },
      { label: 'Build', value: 'Custom Next.js front-end' },
      { label: 'Focus', value: 'Trust before contact' },
    ],
    brief:
      'Roman Sanford serves high-net-worth individuals and families who require a different level of security expertise - private, precise, and rarely discussed. The challenge was not just design. It was engineering a digital presence that communicates elite competence to a clientele that reads status signals in milliseconds. The existing presence simply did not hold up to that standard.',
    challenge:
      'Security at this level operates on trust built long before a contract is signed. Every element of the design had to work as a credentialing mechanism - signaling authority without aggression, expertise without exposition, and discretion without hiding. We built a visual language borrowed from architecture and intelligence: clean structure, controlled hierarchy, and restraint that says we do not need to explain ourselves.',
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
      'The classified tier. A site that doesn\'t explain itself — because if you need to ask, you\'re not the audience.',
    color: '#0a0a0a',
    thumbnail: '/images/projects/rs-black/hero.png',
    headline:
      'A classified-feeling digital experience for an offer that should never feel public.',
    audience:
      'Invitation-only clients looking for discretion, training depth, and the feeling that everything is tightly controlled.',
    signatureMove:
      'Turn the interface into a filter: sparse copy, dense atmosphere, and no unnecessary sales behavior.',
    impact:
      'The site behaves less like a pitch deck and more like a litmus test for exactly the right kind of visitor.',
    highlights: [
      { label: 'Mood', value: 'Controlled darkness' },
      { label: 'Role', value: 'Brand filter, not brochure' },
      { label: 'Result', value: 'Exclusivity without cliche' },
    ],
    brief:
      'RS Black is the invitation-only tier of Roman Sanford\'s security operation - a program that does not recruit clients, it selects them. The digital experience needed to function as a filter: welcoming enough to intrigue, exclusive enough to deter the wrong inquiry. The brand language had to do the qualification before any human conversation began.',
    challenge:
      'The design constraint was almost paradoxical: create a compelling online presence for something that specifically should not be easily discoverable. We leaned into controlled sparsity - minimal text, near-black palette, and precise typographic hierarchy that implies extreme focus. No stock photography. No corporate softness. The experience was designed to feel like a classified brief: everything you need, nothing you do not.',
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
      'A multi-century comic universe — from world-building to 3D web reader — built from a blank page.',
    color: '#17352b',
    url: 'https://www.genuineundeadcomics.com',
    thumbnail: '/images/projects/genuine-undead/homepage.png',
    headline:
      'Creative direction, narrative architecture, and digital world-building for an original comic universe.',
    audience:
      'Readers, collectors, and early believers stepping into a brand-new world with no inherited IP equity.',
    signatureMove:
      'Make the story architecture and the interface reinforce each other so the world feels coherent at every scroll.',
    impact:
      'The project became more than a comic site - it reads like the front door to an expanding universe.',
    highlights: [
      { label: 'Scope', value: 'Brand, product, and narrative' },
      { label: 'Experience', value: 'Immersive reader storytelling' },
      { label: 'World', value: 'A unified identity across eras' },
    ],
    brief:
      'Genuine Undead is not a comic series. It is an intellectual property architecture - narrative threads, visual systems, character universes, and world-building mechanics that needed to cohere across time periods, media formats, and community touchpoints. The brief covered everything from the story\'s internal logic to how a reader would experience it alone at 2am on a phone. Full creative direction meant owning all of it.',
    challenge:
      'The technical and creative problems here were inseparable. The reader experience had to handle dense sequential art while making the interaction feel cinematic rather than mechanical. The brand identity had to function across Ancient Egypt and cyberpunk Tokyo while remaining unmistakably one universe. We built the narrative architecture first and let that structure dictate the visual language.',
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
      'A brand that captures what a perfect Hamptons afternoon actually feels like — built for the people who host them.',
    color: '#536648',
    thumbnail: '/images/projects/hampton-garden-party/homepage.png',
    headline:
      'A Hamptons-facing brand system designed to sell a feeling before the client asks for details.',
    audience:
      'Hosts, event clients, and premium local businesses who buy based on atmosphere as much as logistics.',
    signatureMove:
      'Translate a summer-garden feeling into a restrained visual system without falling into coastal cliche.',
    impact:
      'The work gives a local luxury brand the kind of visual calm that makes people assume the experience itself will be handled well.',
    highlights: [
      { label: 'Market', value: 'Hamptons and East End hospitality' },
      { label: 'Mood', value: 'Warm, editorial, unhurried' },
      { label: 'Use', value: 'Brand world for web and collateral' },
    ],
    brief:
      'Hampton Garden Party exists at the intersection of two of the East End\'s most competitive service categories - events and landscape design - and needed a brand that felt native to both without being generic to either. The brief: capture the sensory experience of a Hamptons summer garden the way a song captures a mood. Warm, specific, and unhurried.',
    challenge:
      'The hardest design challenge is designing for a feeling. The identity had to evoke dappled afternoon light, midsummer greens, and the social ease of people who know exactly how they want the room to feel. The site needed to slow visitors down without losing clarity or conversion.',
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
