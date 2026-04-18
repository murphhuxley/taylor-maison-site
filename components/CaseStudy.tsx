'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/lib/projects'
import TransitionLink from './TransitionLink'
import CreatureGlyph from './CreatureGlyph'

gsap.registerPlugin(ScrollTrigger)

interface CaseStudyProps {
  project: Project
  nextProject: Project
  index: number
  total: number
}

export default function CaseStudy({ project, nextProject, index, total }: CaseStudyProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  const idxDisplay = String(index + 1).padStart(2, '0')
  const totalDisplay = String(total).padStart(2, '0')
  const nextIdxDisplay = String(((index + 1) % total) + 1).padStart(2, '0')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro — plays once on mount
      gsap.fromTo(
        '.case-hero__row',
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.09,
          clearProps: 'all',
          delay: 0.1,
        }
      )

      // Editorial body: per-block reveal on scroll
      gsap.utils.toArray<HTMLElement>('.case-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        )
      })

      // Gallery images: soft scale-in
      gsap.utils.toArray<HTMLElement>('.case-image').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40, scale: 1.03 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
            },
          }
        )
      })
    }, rootRef)

    // ScrollTrigger.refresh() after images load — fixes the "gallery never appears"
    // issue where triggers were measured before images took up their final layout space.
    const imgs = rootRef.current?.querySelectorAll<HTMLImageElement>('img') ?? []
    let pending = imgs.length
    const markLoaded = () => {
      pending -= 1
      if (pending <= 0) ScrollTrigger.refresh()
    }
    imgs.forEach((img) => {
      if (img.complete) markLoaded()
      else {
        img.addEventListener('load', markLoaded, { once: true })
        img.addEventListener('error', markLoaded, { once: true })
      }
    })

    // Safety net — ensure triggers are fresh after the page transition settles,
    // even if image loads are cached or out of order.
    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 350)
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 1400)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      ctx.revert()
    }
  }, [project.slug])

  return (
    <div ref={rootRef}>
      <section className="case-hero" style={{ backgroundColor: project.color }}>
        <div className="case-hero__media">
          <img src={project.thumbnail} alt="" className="case-hero__image" />
        </div>
        <div className="case-hero__scrim" aria-hidden="true" />

        <div className="case-hero__content">
          <div
            className="case-hero__row case-hero__row--top"
            style={{ opacity: 0, visibility: 'hidden' }}
          >
            <span className="case-hero__eyebrow">Case study</span>
            <span className="case-hero__index">
              {idxDisplay}
              <CreatureGlyph className="creature--light">{' / '}</CreatureGlyph>
              {totalDisplay}
            </span>
          </div>

          <div className="case-hero__row case-hero__row--title" style={{ opacity: 0, visibility: 'hidden' }}>
            <span className="case-hero__category">{project.category}</span>
            <h1 className="case-hero__title">{project.title}</h1>
          </div>

          <div className="case-hero__row case-hero__row--footer" style={{ opacity: 0, visibility: 'hidden' }}>
            <p className="case-hero__headline">{project.headline}</p>
            <div className="case-hero__meta">
              <div className="case-hero__meta-item">
                <span className="case-hero__meta-label">Year</span>
                <span className="case-hero__meta-value">{project.year}</span>
              </div>
              <div className="case-hero__meta-item">
                <span className="case-hero__meta-label">Discipline</span>
                <span className="case-hero__meta-value">{project.services.slice(0, 2).join(' · ')}</span>
              </div>
              {project.url && (
                <div className="case-hero__meta-item">
                  <span className="case-hero__meta-label">Live</span>
                  <a
                    className="case-hero__meta-link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit site
                    <span aria-hidden="true" className="case-hero__meta-arrow">→</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="case-brief">
        <div className="case-brief__inner">
          <span className="case-label case-reveal">Brief</span>
          <p className="case-brief__lede case-reveal">{project.brief}</p>
        </div>
      </section>

      <section className="case-ribbon">
        <div className="case-ribbon__inner">
          <div className="case-ribbon__item case-reveal">
            <span className="case-ribbon__label">Audience</span>
            <p className="case-ribbon__value">{project.audience}</p>
          </div>
          <div className="case-ribbon__item case-reveal">
            <span className="case-ribbon__label">Signature move</span>
            <p className="case-ribbon__value">{project.signatureMove}</p>
          </div>
          <div className="case-ribbon__item case-reveal">
            <span className="case-ribbon__label">Services</span>
            <ul className="case-ribbon__list">
              {project.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="case-challenge">
        <div className="case-challenge__inner">
          <span className="case-label case-reveal">The challenge</span>
          <p className="case-challenge__text case-reveal">{project.challenge}</p>
        </div>
      </section>

      <section className="case-gallery-section">
        {project.gallery.map((group, gi) => (
          <div key={gi} className={`case-gallery case-gallery--${group.layout}`}>
            {group.items.map((item, ii) => (
              <figure
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
                <figcaption className="case-image__label">{item.label}</figcaption>
              </figure>
            ))}
          </div>
        ))}
      </section>

      <section className="case-impact">
        <div className="case-impact__inner">
          <span className="case-label case-reveal">What changed</span>
          <p className="case-impact__text case-reveal">{project.impact}</p>
          <div className="case-impact__grid">
            {project.highlights.map((h) => (
              <div key={h.label} className="case-impact__card case-reveal">
                <span className="case-impact__card-label">{h.label}</span>
                <p className="case-impact__card-value">{h.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TransitionLink href={`/work/${nextProject.slug}`} className="case-next">
        <div className="case-next__inner">
          <span className="case-next__label case-reveal">Next project</span>
          <div className="case-next__row case-reveal">
            <span className="case-next__idx">{nextIdxDisplay}</span>
            <h2 className="case-next__title">{nextProject.title}</h2>
            <span className="case-next__arrow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <span className="case-next__meta case-reveal">{nextProject.category}</span>
        </div>
      </TransitionLink>
    </div>
  )
}
