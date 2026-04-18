'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import CreatureGlyph from './CreatureGlyph'

const pillars = [
  {
    idx: '01',
    name: 'Brand direction',
    desc: 'Strategy and visual identity for businesses that care how they present.',
  },
  {
    idx: '02',
    name: 'Custom websites',
    desc: 'Design + build for marketing sites, portfolios, and product storytelling.',
  },
  {
    idx: '03',
    name: 'AI workflows',
    desc: 'Getting non-technical teams fluent with AI tooling — real workflows, not hype.',
  },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })

      tl.fromTo(
        '.hero__top-strip',
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out', clearProps: 'all' }
      )
        .fromTo(
          '.hero__title-line',
          { autoAlpha: 0, y: 80 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.12,
            clearProps: 'all',
          },
          '-=0.2'
        )
        .fromTo(
          '.hero__pillar',
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.08,
            clearProps: 'all',
          },
          '-=0.55'
        )
        .fromTo(
          '.hero__bottom > *',
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.08,
            clearProps: 'all',
          },
          '-=0.4'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={sectionRef} className="hero hero--editorial">
      <div className="hero__top-strip" style={{ opacity: 0, visibility: 'hidden' }}>
        <span>Taylor Maison — Creative Direction · Websites · AI Workflows</span>
        <span>Southampton, NY · Est. 2024</span>
      </div>

      <div className="hero__type">
        <h1 className="hero__title">
          <span className="hero__title-line" style={{ opacity: 0, visibility: 'hidden' }}>
            Taste<CreatureGlyph>,</CreatureGlyph> applied to
          </span>
          <span className="hero__title-line" style={{ opacity: 0, visibility: 'hidden' }}>
            whatever&rsquo;s
          </span>
          <span className="hero__title-line" style={{ opacity: 0, visibility: 'hidden' }}>
            next<CreatureGlyph>.</CreatureGlyph>
          </span>
        </h1>

        <div className="hero__pillars">
          {pillars.map((p) => (
            <div key={p.idx} className="hero__pillar" style={{ opacity: 0, visibility: 'hidden' }}>
              <span className="hero__pillar-idx">{p.idx}</span>
              <span className="hero__pillar-name">{p.name}</span>
              <p className="hero__pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__bottom">
        <p className="hero__lede" style={{ opacity: 0, visibility: 'hidden' }}>
          Built around clarity, restraint, and knowing what to leave out —
          whether that&rsquo;s a wordmark, a homepage, or how your team actually
          uses AI.
        </p>
        <div className="hero__actions" style={{ opacity: 0, visibility: 'hidden' }}>
          <a href="/work" className="hero__button hero__button--primary">
            Selected work
          </a>
          <a href="/contact" className="hero__button hero__button--secondary">
            Start a conversation
          </a>
        </div>
        <div className="hero__signal" style={{ opacity: 0, visibility: 'hidden' }}>
          <span className="hero__signal-pin" aria-hidden="true" />
          <span>
            <strong>Taking on 2 new engagements</strong>
          </span>
          <span>Q2 · 2026</span>
        </div>
      </div>

    </section>
  )
}
