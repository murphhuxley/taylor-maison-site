'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import dynamic from 'next/dynamic'

const Ferrofluid = dynamic(() => import('./Ferrofluid'), { ssr: false })

const notes = [
  {
    label: 'Scope',
    value: 'Brand direction, custom websites, and workflow consulting.',
  },
  {
    label: 'Based in',
    value: 'Southampton, NY — available for select remote and in-person engagements.',
  },
  {
    label: 'Projects',
    value: 'Advisory engagements, full builds, focused refreshes, and ongoing retainers.',
  },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(
        '.hero__eyebrow, .hero__title, .hero__lede, .hero__actions',
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
        }
      )
        .fromTo(
          '.hero__note',
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.06,
            clearProps: 'all',
          },
          '-=0.5'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={sectionRef} className="hero">
      <video
        className="hero__video-bg"
        autoPlay
        muted
        loop
        playsInline
        src="/video/hero-bg.mp4"
        ref={(el) => { if (el) el.playbackRate = 0.4 }}
      />
      <div className="hero__inner">
        <span className="hero__eyebrow section-label" style={{ opacity: 0, visibility: 'hidden' }}>
          Taylor Maison
        </span>

        <div className="hero__main">
          <div className="hero__copy">
            <h1 className="hero__title" style={{ opacity: 0, visibility: 'hidden' }}>
              Creative direction and custom websites.
            </h1>
            <p className="hero__lede" style={{ opacity: 0, visibility: 'hidden' }}>
              Brand consulting, websites, and workflow support for businesses
              that care how they present. Built around clarity, restraint, and
              knowing what to leave out.
            </p>
            <div className="hero__actions" style={{ opacity: 0, visibility: 'hidden' }}>
              <a href="#work" className="hero__button hero__button--primary">
                Selected work
              </a>
              <a href="#contact" className="hero__button hero__button--secondary">
                Start a conversation
              </a>
            </div>
          </div>

          <div className="hero__visual">
            <Ferrofluid />
          </div>
        </div>

        <div className="hero__notes">
          {notes.map((note) => (
            <div key={note.label} className="hero__note" style={{ opacity: 0, visibility: 'hidden' }}>
              <span className="hero__note-label">{note.label}</span>
              <p className="hero__note-value">{note.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
