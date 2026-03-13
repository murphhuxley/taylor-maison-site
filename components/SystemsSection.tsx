'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  {
    title: 'Audit the workflow',
    text: 'Start with the actual bottlenecks before reaching for prompts, tools, or automation.',
  },
  {
    title: 'Choose the right layer',
    text: 'Sometimes the answer is better intake. Sometimes it is a prompt library. Sometimes it needs code.',
  },
  {
    title: 'Build lightly',
    text: 'The goal is less repetitive work, cleaner follow-through, and systems people will actually use.',
  },
]

const examples = [
  'Inquiry intake and routing',
  'Research and briefing workflows',
  'Proposal prep and follow-up',
  'Internal knowledge organization',
]

export default function SystemsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.systems__intro > *',
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.systems__intro',
            start: 'top 82%',
          },
        }
      )

      gsap.fromTo(
        '.systems__card, .systems__examples',
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.systems__grid',
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="systems" ref={sectionRef} className="systems">
      <div className="systems__surface">
        <div className="systems__intro">
          <span className="section-label" style={{ opacity: 0, visibility: 'hidden' }}>
            AI + systems
          </span>
          <h2 className="systems__title" style={{ opacity: 0, visibility: 'hidden' }}>
            Use AI where it actually helps.
          </h2>
          <p className="systems__description" style={{ opacity: 0, visibility: 'hidden' }}>
            This is consulting first, not novelty first. The point is better
            intake, less repetitive admin, and clearer follow-through for the team.
          </p>
        </div>

        <div className="systems__grid">
          {capabilities.map((capability) => (
            <article key={capability.title} className="systems__card" style={{ opacity: 0, visibility: 'hidden' }}>
              <h3 className="systems__card-title">{capability.title}</h3>
              <p className="systems__card-text">{capability.text}</p>
            </article>
          ))}

          <aside className="systems__examples" style={{ opacity: 0, visibility: 'hidden' }}>
            <span className="systems__examples-label">Useful for</span>
            <ul className="systems__examples-list">
              {examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
