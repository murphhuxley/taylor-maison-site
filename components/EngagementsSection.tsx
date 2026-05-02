'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TransitionLink from './TransitionLink'

gsap.registerPlugin(ScrollTrigger)

const engagements = [
  {
    idx: '01',
    name: 'Focused Refresh',
    summary:
      'For businesses with real reputation whose website no longer reflects it. We sharpen the story, homepage, visual system, and inquiry path.',
    includes: [
      'Story + positioning audit',
      'Homepage rebuild',
      'Visual system tightening',
      'Inquiry flow refresh',
    ],
    fit: 'Best when the business has earned trust the website doesn’t reflect.',
  },
  {
    idx: '02',
    name: 'Flagship Build',
    summary:
      'A complete digital presence: positioning, website, motion, content structure, and lead flow built around how the business actually wins trust.',
    includes: [
      'Positioning + brand direction',
      'Custom design + build',
      'Motion + interaction system',
      'Content architecture + lead flow',
    ],
    fit: 'Best when the website needs to do the work of a senior team.',
  },
  {
    idx: '03',
    name: 'Ongoing Partner',
    summary:
      'Monthly creative, web, and workflow support for founder-led teams that need senior taste and steady output without building an internal department.',
    includes: [
      'Async-first weekly cadence',
      'Design + web maintenance',
      'AI + workflow support',
      'Senior judgment on call',
    ],
    fit: 'Best for founder-led teams that want a senior partner, not another hire.',
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
          Choose the right depth of change.
        </h2>
        <p className="engagements__description" style={{ opacity: 0, visibility: 'hidden' }}>
          Some clients need the digital presence sharpened. Some need the whole
          system rebuilt. Some need a steady partner after launch.
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
          Pricing stays conversational; the delivery model does not. Every engagement has a
          clear cadence, decision path, and owner.
        </p>
        <TransitionLink href="/contact" className="engagements__cta">
          Start a conversation
        </TransitionLink>
      </div>
    </section>
  )
}
