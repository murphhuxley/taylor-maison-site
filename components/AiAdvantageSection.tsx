'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AiAdvantageSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ai-advantage__reveal',
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.ai-advantage',
            start: 'top 82%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="ai-advantage" ref={sectionRef} className="ai-advantage">
      <div className="ai-advantage__inner">
        <span className="section-label ai-advantage__reveal" style={{ opacity: 0, visibility: 'hidden' }}>
          The AI advantage
        </span>
        <h2 className="ai-advantage__title ai-advantage__reveal" style={{ opacity: 0, visibility: 'hidden' }}>
          The AI advantage is still early.
        </h2>
        <div className="ai-advantage__copy ai-advantage__reveal" style={{ opacity: 0, visibility: 'hidden' }}>
          <p>
            Most business owners are watching AI with a mix of curiosity and dread.
            The risk is not that AI replaces the business. It is that someone else
            uses it first to respond faster, follow up cleaner, package better, and
            make the client experience feel effortless.
          </p>
          <p>
            Taylor Maison helps teams get ahead practically: taught in plain language,
            built into real workflows, and kept aligned with the brand instead of
            bolted on as a gimmick.
          </p>
        </div>
      </div>
    </section>
  )
}
