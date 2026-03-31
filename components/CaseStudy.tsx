'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/lib/projects'
import TransitionLink from './TransitionLink'

gsap.registerPlugin(ScrollTrigger)

interface CaseStudyProps {
  project: Project
  nextProject: Project
}

export default function CaseStudy({ project, nextProject }: CaseStudyProps) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.case-hero__category, .case-hero__title, .case-hero__headline, .case-hero__meta',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
        }
      )

      gsap.fromTo(
        '.case-overview__sidebar, .case-overview__text, .case-impact__intro, .case-impact__card, .case-challenge__inner > *, .case-next > *',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.case-overview',
            start: 'top 80%',
          },
        }
      )

      gsap.utils.toArray<HTMLElement>('.case-image').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 44, scale: 1.04 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className="case-hero" style={{ backgroundColor: project.color }}>
        <div className="case-hero__media">
          <img src={project.thumbnail} alt={project.title} className="case-hero__image" />
        </div>
        <div className="case-hero__content">
          <span className="case-hero__category" style={{ opacity: 0, visibility: 'hidden' }}>
            {project.category}
          </span>
          <h1 className="case-hero__title" style={{ opacity: 0, visibility: 'hidden' }}>
            {project.title}
          </h1>
          <p className="case-hero__headline" style={{ opacity: 0, visibility: 'hidden' }}>
            {project.headline}
          </p>
          <div className="case-hero__meta" style={{ opacity: 0, visibility: 'hidden' }}>
            <span>{project.year}</span>
            <span>{project.services.join(' · ')}</span>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                View live
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="case-overview">
        <div className="case-overview__inner">
          <div className="case-overview__sidebar" style={{ opacity: 0, visibility: 'hidden' }}>
            <div className="case-overview__meta-item">
              <span className="case-overview__meta-label">Audience</span>
              <span className="case-overview__meta-value">{project.audience}</span>
            </div>
            <div className="case-overview__meta-item">
              <span className="case-overview__meta-label">Signature move</span>
              <span className="case-overview__meta-value">{project.signatureMove}</span>
            </div>
            <div className="case-overview__meta-item">
              <span className="case-overview__meta-label">Services</span>
              {project.services.map((service) => (
                <span key={service} className="case-overview__meta-value">
                  {service}
                </span>
              ))}
            </div>
            {project.url && (
              <div className="case-overview__meta-item">
                <span className="case-overview__meta-label">Live</span>
                <a
                  href={project.url}
                  className="case-overview__meta-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit site
                </a>
              </div>
            )}
          </div>

          <div className="case-overview__text" style={{ opacity: 0, visibility: 'hidden' }}>
            <p className="case-overview__brief">{project.brief}</p>
          </div>
        </div>
      </section>

      <section className="case-impact">
        <div className="case-impact__intro" style={{ opacity: 0, visibility: 'hidden' }}>
          <span className="section-label">What changed</span>
          <p className="case-impact__text">{project.impact}</p>
        </div>

        <div className="case-impact__grid">
          {project.highlights.map((highlight) => (
            <article
              key={highlight.label}
              className="case-impact__card"
              style={{ opacity: 0, visibility: 'hidden' }}
            >
              <span className="case-impact__label">{highlight.label}</span>
              <p className="case-impact__value">{highlight.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-challenge">
        <div className="case-challenge__inner">
          <span className="section-label" style={{ opacity: 0, visibility: 'hidden' }}>
            The challenge
          </span>
          <p className="case-challenge__text" style={{ opacity: 0, visibility: 'hidden' }}>
            {project.challenge}
          </p>
        </div>
      </section>

      <section className="case-gallery-section">
        {project.gallery.map((group, gi) => (
          <div key={gi} className={`case-gallery case-gallery--${group.layout}`}>
            {group.items.map((item, ii) => (
              <div
                key={ii}
                className="case-image"
                style={{
                  backgroundColor: project.color,
                  aspectRatio: item.aspect,
                  opacity: 0,
                  visibility: 'hidden',
                }}
              >
                {item.image && (
                  <img src={item.image} alt={item.label} className="case-image__img" />
                )}
                <span className="case-image__label">{item.label}</span>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="case-next">
        <span className="case-next__label section-label" style={{ opacity: 0, visibility: 'hidden' }}>
          Next project
        </span>
        <TransitionLink href={`/work/${nextProject.slug}`} className="case-next__link" style={{ opacity: 0, visibility: 'hidden' }}>
          <h2 className="case-next__title">{nextProject.title}</h2>
        </TransitionLink>
        <span className="case-next__category" style={{ opacity: 0, visibility: 'hidden' }}>
          {nextProject.category}
        </span>
      </section>
    </>
  )
}
