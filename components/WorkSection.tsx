'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/lib/projects'
import TransitionLink from './TransitionLink'

gsap.registerPlugin(ScrollTrigger)

type Panel = {
  slug: string
  title: string
  category: string
  year: string
  description: string
  thumbnail: string
  impact: string
  href: string
  linkLabel: string
  kind: 'case-study'
}

const panels: Panel[] = projects.map((p) => ({
  slug: p.slug,
  title: p.title,
  category: p.category,
  year: p.year,
  description: p.description,
  thumbnail: p.thumbnail,
  impact: p.impact,
  href: `/work/${p.slug}`,
  linkLabel: 'Read case study',
  kind: 'case-study',
}))

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned horizontal scroll — desktop only
      const mm = gsap.matchMedia()

      mm.add('(min-width: 900px)', () => {
        const track = trackRef.current
        const pin = pinRef.current
        const progress = progressRef.current
        const counter = counterRef.current
        if (!track || !pin) return

        const getDistance = () => track.scrollWidth - window.innerWidth

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => '+=' + getDistance(),
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progress) progress.style.transform = `scaleX(${self.progress})`
              if (counter) {
                const idx = Math.min(
                  panels.length,
                  Math.max(1, Math.ceil(self.progress * panels.length) || 1)
                )
                counter.textContent = String(idx).padStart(2, '0')
              }
            },
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      // Mobile reveal — native swipe rail with live progress.
      mm.add('(max-width: 899px)', () => {
        const track = trackRef.current
        const progress = progressRef.current
        const counter = counterRef.current
        if (!track) return

        const updateMobileProgress = () => {
          const maxScroll = track.scrollWidth - track.clientWidth
          const progressValue = maxScroll > 0 ? track.scrollLeft / maxScroll : 0
          const idx = Math.min(
            panels.length,
            Math.max(1, Math.round(progressValue * (panels.length - 1)) + 1)
          )

          if (progress) progress.style.transform = `scaleX(${progressValue})`
          if (counter) counter.textContent = String(idx).padStart(2, '0')
        }

        gsap.fromTo(
          '.work-panel',
          { autoAlpha: 0, x: 28 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.95,
            ease: 'power3.out',
            stagger: 0.12,
            clearProps: 'all',
            scrollTrigger: {
              trigger: '.work__track',
              start: 'top 82%',
            },
          }
        )

        track.addEventListener('scroll', updateMobileProgress, { passive: true })
        window.addEventListener('resize', updateMobileProgress)
        updateMobileProgress()

        return () => {
          track.removeEventListener('scroll', updateMobileProgress)
          window.removeEventListener('resize', updateMobileProgress)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="work">
      <div ref={pinRef} className="work__pin">
        <div className="work__rail">
          <div className="work__rail-left">
            <span className="work__rail-label">Selected work</span>
            <span className="work__rail-counter" aria-hidden="true">
              <span ref={counterRef}>01</span>
              <span className="work__rail-counter-divider"> / </span>
              <span>{String(panels.length).padStart(2, '0')}</span>
            </span>
          </div>
          <TransitionLink href="/work" className="work__rail-link">
            All work
            <span aria-hidden="true">→</span>
          </TransitionLink>
        </div>

        <div className="work__rail-line">
          <div ref={progressRef} className="work__rail-fill" />
        </div>

        <div ref={trackRef} className="work__track">
          {panels.map((panel) => (
            <article key={panel.slug} className="work-panel">
              <TransitionLink href={panel.href} className="work-panel__media">
                <img
                  src={panel.thumbnail}
                  alt={panel.title}
                  className="work-panel__image"
                />
              </TransitionLink>

              <div className="work-panel__content">
                <div className="work-panel__lead">
                  <div className="work-panel__meta">
                    <span>{panel.category}</span>
                    <span>{panel.year}</span>
                  </div>
                  <h3 className="work-panel__title">{panel.title}</h3>
                  <p className="work-panel__summary">{panel.description}</p>
                </div>
                <div className="work-panel__close">
                  <div className="work-panel__lift">
                    <span className="work-panel__lift-label">What changed</span>
                    <p>{panel.impact}</p>
                  </div>
                  <TransitionLink href={panel.href} className="work-panel__link">
                    {panel.linkLabel}
                    <span aria-hidden="true">→</span>
                  </TransitionLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
