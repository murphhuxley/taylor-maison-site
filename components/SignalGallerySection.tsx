'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TransitionLink from './TransitionLink'

gsap.registerPlugin(ScrollTrigger)

const pathways = [
  {
    eyebrow: 'Services',
    title: 'Our services',
    href: '#engagements',
    tone: 'ink',
    shape: 'wide',
    slot: '01',
  },
  {
    eyebrow: 'Field note',
    title: 'What is the value of content strategy?',
    href: '/notes/content-strategy',
    tone: 'sage',
    shape: 'tall',
    slot: '02',
  },
  {
    eyebrow: 'About',
    title: 'About Taylor Maison',
    href: '/about',
    tone: 'stone',
    shape: 'square',
    slot: '03',
  },
  {
    eyebrow: 'Field note',
    title: 'Digital strategy before design',
    href: '/notes/digital-strategy',
    tone: 'cream',
    shape: 'wide',
    slot: '04',
  },
  {
    eyebrow: 'Work',
    title: 'Selected work',
    href: '/work',
    tone: 'charcoal',
    shape: 'wide',
    slot: '05',
  },
  {
    eyebrow: 'Field note',
    title: 'AI without the panic',
    href: '/notes/ai-without-the-panic',
    tone: 'mist',
    shape: 'tall',
    slot: '06',
  },
]

export default function SignalGallerySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.signal-gallery__statement, .signal-gallery__rail > *',
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.07,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.signal-gallery',
            start: 'top 78%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="signal-gallery">
      <p className="signal-gallery__statement" style={{ opacity: 0, visibility: 'hidden' }}>
        We work with ambitious operators ready to make the digital side of the
        business sharper. <TransitionLink href="/contact">Let&rsquo;s talk.</TransitionLink>
      </p>

      <div className="signal-gallery__rail">
        <span className="section-label" style={{ opacity: 0, visibility: 'hidden' }}>
          Studio gallery
        </span>
        <TransitionLink href="/contact" className="signal-gallery__view" style={{ opacity: 0, visibility: 'hidden' }}>
          Let&rsquo;s talk
        </TransitionLink>
      </div>

      <div className="signal-gallery__track" aria-label="Studio pathways">
        {[0, 1].map((copyIndex) => (
          <div
            key={copyIndex}
            className="signal-gallery__group"
            aria-hidden={copyIndex === 1}
          >
            {pathways.map((pathway) => (
              <TransitionLink
                key={`${pathway.title}-${copyIndex}`}
                href={pathway.href}
                tabIndex={copyIndex === 1 ? -1 : undefined}
                className={`signal-card signal-card--${pathway.shape} signal-card--${pathway.tone}`}
              >
                <span className="signal-card__placeholder" aria-hidden="true">
                  Photo slot {pathway.slot}
                </span>
                <span className="signal-card__shade" aria-hidden="true" />
                <span className="signal-card__content">
                  <span className="signal-card__eyebrow">{pathway.eyebrow}</span>
                  <span className="signal-card__title">{pathway.title}</span>
                </span>
              </TransitionLink>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
