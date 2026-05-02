'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Header from '@/components/Header'
import GlassPill from '@/components/GlassPill'
import SmoothScroll from '@/components/SmoothScroll'
import TransitionLink from '@/components/TransitionLink'
import { projects } from '@/lib/projects'

export default function WorkIndexPage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo(
        '.work-index__eyebrow, .work-index__title, .work-index__description',
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
        }
      ).fromTo(
        '.work-index__row',
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
        },
        '-=0.5'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <section ref={sectionRef} className="work-index">
          <div className="work-index__intro">
            <div>
              <span
                className="work-index__eyebrow"
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                Selected work · 2024 — 2026
              </span>
              <h1
                className="work-index__title"
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                Work that earns the next conversation.
              </h1>
            </div>
            <p
              className="work-index__description"
              style={{ opacity: 0, visibility: 'hidden' }}
            >
              A short list of brand, web, and workflow projects chosen for what
              changed after launch: stronger first impressions, cleaner
              qualification, better follow-up, and more confidence before the
              first call.
            </p>
          </div>

          <div className="work-index__list">
            {projects.map((p, i) => (
              <TransitionLink
                key={p.slug}
                href={`/work/${p.slug}`}
                className="work-index__row"
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                <span className="work-index__row-idx">
                  0{i + 1} / {String(projects.length).padStart(2, '0')}
                </span>
                <h2 className="work-index__row-title">{p.title}</h2>
                <span className="work-index__row-discipline">{p.category}</span>
                <p className="work-index__row-summary">{p.description}</p>
                <span className="work-index__row-arrow" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7h10M7 2l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </TransitionLink>
            ))}
          </div>
        </section>
      </main>
      <GlassPill />
    </>
  )
}
