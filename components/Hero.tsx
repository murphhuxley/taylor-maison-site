'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import TransitionLink from './TransitionLink'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(
        '.hero__reveal',
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
        }
      ).fromTo(
        '.hero__card',
        { autoAlpha: 0, y: 42, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          clearProps: 'all',
        },
        '-=0.55'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={sectionRef} className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow hero__reveal" style={{ opacity: 0, visibility: 'hidden' }}>
            Taylor Maison · Creative Systems
          </p>

          <h1 className="hero__headline hero__reveal" style={{ opacity: 0, visibility: 'hidden' }}>
            <span>Sharper website.</span>
            <span>Smarter workflows.</span>
            <span>More revenue.</span>
          </h1>

          <p className="hero__lede hero__reveal" style={{ opacity: 0, visibility: 'hidden' }}>
            Taylor Maison rebuilds the digital presence and practical AI systems behind it,
            so founder-led businesses win better inquiries, follow up faster, and turn more
            opportunities into revenue.
          </p>

          <div className="hero__actions hero__reveal" style={{ opacity: 0, visibility: 'hidden' }}>
            <TransitionLink href="/contact" className="hero__cta hero__cta--primary">
              Start a conversation
            </TransitionLink>
            <TransitionLink href="/work" className="hero__cta hero__cta--secondary">
              View the work
            </TransitionLink>
          </div>

          <p className="hero__trust hero__reveal" style={{ opacity: 0, visibility: 'hidden' }}>
            Southampton-rooted · Built for warm referrals, serious operators, and quiet leverage.
          </p>
        </div>

        <aside className="hero__card" style={{ opacity: 0, visibility: 'hidden' }}>
          <p className="hero__card-label">Where the lift comes from</p>
          <ul className="hero__card-list">
            <li>
              <span>01</span>
              <strong>The website</strong>
              <p>Positioning, homepage, proof, and a path that makes inquiry feel obvious.</p>
            </li>
            <li>
              <span>02</span>
              <strong>The follow-up system</strong>
              <p>Lead flow, reply structure, and simple automations that stop good opportunities from leaking.</p>
            </li>
            <li>
              <span>03</span>
              <strong>The AI skill layer</strong>
              <p>Practical tools and training so the team can move faster without turning into an AI gimmick.</p>
            </li>
          </ul>
          <div className="hero__card-footer">
            <span>By referral</span>
            <span>Select engagements · 2026</span>
          </div>
        </aside>
      </div>
    </section>
  )
}
