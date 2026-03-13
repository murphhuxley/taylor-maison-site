'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work__intro > *',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.work__intro',
            start: 'top 82%',
          },
        }
      )

      gsap.fromTo(
        '.work-entry',
        { autoAlpha: 0, y: 42 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.12,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.work__list',
            start: 'top 82%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="work">
      <div className="work__surface">
        <div className="work__intro">
          <span className="section-label" style={{ opacity: 0, visibility: 'hidden' }}>
            Selected work
          </span>
          <h2 className="work__title" style={{ opacity: 0, visibility: 'hidden' }}>
            Recent client worlds.
          </h2>
          <p className="work__description" style={{ opacity: 0, visibility: 'hidden' }}>
            A small selection of recent client and original work.
          </p>
        </div>

        <div className="work__list">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className={`work-entry ${index % 2 === 1 ? 'work-entry--reverse' : ''}`}
              style={{ opacity: 0, visibility: 'hidden' }}
            >
              <Link href={`/work/${project.slug}`} className="work-entry__media">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="work-entry__image"
                />
              </Link>

              <div className="work-entry__content">
                <div className="work-entry__meta">
                  <span className="work-entry__category">{project.category}</span>
                  <span className="work-entry__year">{project.year}</span>
                </div>

                <div className="work-entry__body">
                  <h3 className="work-entry__title">{project.title}</h3>
                  <p className="work-entry__summary">{project.description}</p>
                  <p className="work-entry__detail">
                    <span className="work-entry__detail-label">What changed</span>
                    {project.impact}
                  </p>
                </div>

                <Link href={`/work/${project.slug}`} className="work-entry__link">
                  Read case study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
