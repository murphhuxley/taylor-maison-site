'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const offers = [
  {
    name: 'Maison Starter',
    price: 'Starting at $3K',
    summary: 'A clean, custom website with polished animation and mobile-first design. Delivered in about two weeks.',
    note: 'Best for solo operators, boutiques, and businesses ready to move past templates.',
  },
  {
    name: 'Maison Standard',
    price: 'Starting at $8K',
    summary: 'Full brand integration, scroll-driven animation, content management, custom inquiry flows, and search optimization.',
    note: 'Best for established businesses that need a digital presence matching their reputation.',
  },
  {
    name: 'Maison Premium',
    price: 'Starting at $15K',
    summary: 'A complete digital system — everything in Standard plus custom automation, workflow tooling, and ongoing support.',
    note: 'Best for businesses that want their site to work as hard as they do.',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services__intro > *',
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.services__intro',
            start: 'top 82%',
          },
        }
      )

      gsap.fromTo(
        '.services__row',
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.services__list',
            start: 'top 82%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="services">
      <div className="services__intro">
        <span className="section-label" style={{ opacity: 0, visibility: 'hidden' }}>
          What we build
        </span>
        <h2 className="services__title" style={{ opacity: 0, visibility: 'hidden' }}>
          Three tiers. Every project custom.
        </h2>
        <p className="services__description" style={{ opacity: 0, visibility: 'hidden' }}>
          Most projects start with direction before they become a full build.
          Some stay there. The difference between tiers is depth and scope.
        </p>
      </div>

      <div className="services__list">
        {offers.map((offer) => (
          <article key={offer.name} className="services__row" style={{ opacity: 0, visibility: 'hidden' }}>
            <div className="services__row-header">
              <span className="services__row-name">{offer.name}</span>
              <span className="services__row-price">{offer.price}</span>
            </div>
            <p className="services__row-summary">{offer.summary}</p>
            <p className="services__row-note">{offer.note}</p>
          </article>
        ))}
      </div>

      <p className="services__footnote">
        Add-ons available: monthly retainers, brand identity packages, copywriting,
        e-commerce, and SEO campaigns.
      </p>
    </section>
  )
}
