'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const notes = [
  {
    label: 'Scope',
    value: 'Brand direction, custom websites, and workflow consulting.',
  },
  {
    label: 'Based in',
    value: 'Southampton, NY — serving the Hamptons and greater Suffolk County.',
  },
  {
    label: 'Projects',
    value: 'Advisory engagements, full builds, focused refreshes, and ongoing retainers.',
  },
]

const showcaseProjects = [
  { src: '/images/projects/hampton-garden-party/hero.png', alt: 'Hampton Garden Party', modifier: 'primary' },
  { src: '/images/projects/roman-sanford/services-page.png', alt: 'Roman Sanford Services', modifier: 'secondary' },
  { src: '/images/projects/genuine-undead/hero.png', alt: 'Genuine Undead', modifier: 'tertiary' },
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
          '.hero__frame',
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.12,
            clearProps: 'all',
          },
          '-=0.6'
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

          <div className="hero__showcase">
            {showcaseProjects.map((project) => (
              <div
                key={project.alt}
                className={`hero__frame hero__frame--${project.modifier}`}
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                <div className="hero__frame-chrome">
                  <span className="hero__frame-dot" />
                  <span className="hero__frame-dot" />
                  <span className="hero__frame-dot" />
                </div>
                <img
                  src={project.src}
                  alt={project.alt}
                  className="hero__frame-img"
                  loading="eager"
                />
              </div>
            ))}
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
