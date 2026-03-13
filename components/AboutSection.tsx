'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const credentials = [
  'Grew up in Southampton — knows the market firsthand',
  'Estate management inside ultra-high-net-worth environments',
  'Seven years in film and television production',
  'Custom web builds and workflow consulting',
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about__media, .about__content > *',
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.about__inner',
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="about">
      <div className="about__inner">
        <div className="about__media" style={{ opacity: 0, visibility: 'hidden' }}>
          <img src="/images/taylor-headshot.jpg" alt="Taylor Maison" className="about__image" />
          <p className="about__media-caption">Creative direction, websites, and AI support.</p>
        </div>

        <div className="about__content">
          <span className="section-label" style={{ opacity: 0, visibility: 'hidden' }}>
            About Taylor
          </span>
          <h2 className="about__title" style={{ opacity: 0, visibility: 'hidden' }}>
            Built out of real-world operations.
          </h2>
          <p className="about__text" style={{ opacity: 0, visibility: 'hidden' }}>
            Taylor grew up in Southampton. Estate management, film production,
            content strategy, and founder-side operations all shaped the way he
            approaches digital work. The common thread: understanding how people
            read trust, timing, and presentation when the details actually matter.
          </p>
          <p className="about__text" style={{ opacity: 0, visibility: 'hidden' }}>
            That background shows up in the work as sharper editing, calmer
            hierarchy, and systems that feel considered instead of bolted on.
          </p>

          <ul className="about__credentials" style={{ opacity: 0, visibility: 'hidden' }}>
            {credentials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
