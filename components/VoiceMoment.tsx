'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const principles = [
  'Every project is custom. No templates, no page builders, no shortcuts.',
  'Presentation should feel considered — not decorated.',
  'A stronger first impression means less explaining later.',
]

export default function VoiceMoment() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.section-label, .voice__headline, .voice__copy, .voice__divider',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      )

      gsap.fromTo(
        '.voice__principle',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.voice__principles',
            start: 'top 84%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="voice">
      <span className="section-label" style={{ opacity: 0, visibility: 'hidden' }}>
        Operating principle
      </span>
      <h2 className="voice__headline" style={{ opacity: 0, visibility: 'hidden' }}>
        A premium site should feel specific, calm, and impossible to confuse
        with a template.
      </h2>
      <p className="voice__copy" style={{ opacity: 0, visibility: 'hidden' }}>
        Clarity, spacing, type, and restraint. The work is in knowing what
        to leave out — not in adding more.
      </p>
      <div className="voice__divider" style={{ opacity: 0, visibility: 'hidden' }} />

      <div className="voice__principles">
        {principles.map((principle) => (
          <div
            key={principle}
            className="voice__principle"
            style={{ opacity: 0, visibility: 'hidden' }}
          >
            {principle}
          </div>
        ))}
      </div>
    </section>
  )
}
