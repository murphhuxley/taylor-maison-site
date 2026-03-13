'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const fitNotes = [
  'Best fit: businesses that care about presentation, clarity, and follow-through.',
  'Useful starting point: the current URL, rough timing, and what feels off.',
  'Consulting is available for creative direction, brand, websites, and AI workflows.',
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact__copy > *, .contact__panel',
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.contact__inner',
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="contact">
      <div className="contact__inner">
        <div className="contact__copy">
          <span className="section-label" style={{ opacity: 0, visibility: 'hidden' }}>
            Contact
          </span>
          <h2 className="contact__title" style={{ opacity: 0, visibility: 'hidden' }}>
            Send the current URL and what feels off.
          </h2>
          <p className="contact__description" style={{ opacity: 0, visibility: 'hidden' }}>
            That is usually enough to tell whether the next step is advisory,
            a rebuild, or lighter workflow support.
          </p>
        </div>

        <div className="contact__panel" style={{ opacity: 0, visibility: 'hidden' }}>
          <a
            href="mailto:hello@taylor.maison?subject=Consulting or project inquiry"
            className="contact__button contact__button--primary"
          >
            Send the brief
          </a>
          <a href="mailto:hello@taylor.maison" className="contact__button contact__button--secondary">
            hello@taylor.maison
          </a>

          <ul className="contact__notes">
            {fitNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
