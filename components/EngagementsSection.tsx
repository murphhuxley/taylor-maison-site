'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const engagements = [
  {
    idx: '01',
    name: 'Brand direction',
    summary:
      'Strategy and visual identity for businesses that care how they present. Naming, positioning, wordmarks, systems — and the reasoning that binds them.',
    includes: [
      'Positioning + voice',
      'Visual identity system',
      'Wordmark + typography',
      'Rollout roadmap',
    ],
    fit: 'Best when you have a real business but the brand is catching up.',
  },
  {
    idx: '02',
    name: 'Custom websites',
    summary:
      'Design and build for marketing sites, portfolios, and product storytelling. Every detail considered — from the grid to the cursor.',
    includes: [
      'Bespoke design + build',
      'Animation + interaction',
      'CMS integration',
      'Performance + SEO',
    ],
    fit: 'Best when your site has to match the quality of the work behind it.',
  },
  {
    idx: '03',
    name: 'AI workflows',
    summary:
      'Practical AI fluency for non-technical teams. Real workflows that save hours per week — research, drafting, review — wired into the tools you already use.',
    includes: [
      'Workflow audit',
      'Tooling selection + setup',
      'Prompts + playbooks',
      'Team training + coaching',
    ],
    fit: 'Best for teams who know AI matters and want to stop watching from the sidelines.',
  },
]

export default function EngagementsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.engagements__intro > *',
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.engagements__intro',
            start: 'top 82%',
          },
        }
      )

      gsap.fromTo(
        '.engagements__card',
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.12,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.engagements__grid',
            start: 'top 82%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="engagements" ref={sectionRef} className="engagements">
      <div className="engagements__intro">
        <span className="section-label" style={{ opacity: 0, visibility: 'hidden' }}>
          Engagements
        </span>
        <h2 className="engagements__title" style={{ opacity: 0, visibility: 'hidden' }}>
          Three pillars. Every engagement custom.
        </h2>
        <p className="engagements__description" style={{ opacity: 0, visibility: 'hidden' }}>
          Most work begins with a conversation, not a scope. Pricing is shaped by
          ambition, timeline, and fit — told directly once we&rsquo;ve met.
        </p>
      </div>

      <div className="engagements__grid">
        {engagements.map((e) => (
          <article
            key={e.idx}
            className="engagements__card"
            style={{ opacity: 0, visibility: 'hidden' }}
          >
            <header className="engagements__card-header">
              <span className="engagements__card-idx">{e.idx}</span>
              <h3 className="engagements__card-name">{e.name}</h3>
            </header>
            <p className="engagements__card-summary">{e.summary}</p>
            <ul className="engagements__card-list">
              {e.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="engagements__card-fit">{e.fit}</p>
          </article>
        ))}
      </div>

      <div className="engagements__footer">
        <p className="engagements__footnote">
          Retainers, ongoing advisory, and multi-pillar engagements available.
        </p>
        <a href="/contact" className="engagements__cta">
          Start a conversation
        </a>
      </div>
    </section>
  )
}
