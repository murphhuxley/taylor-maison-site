'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import Header from '@/components/Header'
import GlassPill from '@/components/GlassPill'
import SmoothScroll from '@/components/SmoothScroll'

const Ferrofluid = dynamic(() => import('@/components/Ferrofluid'), { ssr: false })

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo(
        '.contact-page__orb',
        { autoAlpha: 0, scale: 0.94 },
        { autoAlpha: 1, scale: 1, duration: 1.4, ease: 'power3.out', clearProps: 'all' }
      )
        .fromTo(
          '.contact-page__copy > *',
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.08,
            clearProps: 'all',
          },
          '-=1.0'
        )
        .fromTo(
          '.contact-page__panel',
          { autoAlpha: 0, y: 36, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            clearProps: 'all',
          },
          '-=0.6'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <section ref={sectionRef} className="contact-page">
          <div className="contact-page__inner">
            <div className="contact-page__copy">
              <span
                className="contact-page__eyebrow"
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                Start a conversation
              </span>
              <h1
                className="contact-page__title"
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                Bring me the bottleneck.
              </h1>
              <p
                className="contact-page__lede"
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                Send the current site, the business goal behind the change, and
                where the business is losing time, trust, or opportunity.
                I&rsquo;ll reply with the clearest next move: focused refresh, full
                build, or ongoing creative and AI support.
              </p>

              <div
                className="contact-page__actions"
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                <a
                  href="mailto:hello@taylor.maison?subject=Project%20inquiry"
                  className="contact-page__action contact-page__action--primary"
                >
                  Email Taylor
                </a>
                <a
                  href="mailto:hello@taylor.maison"
                  className="contact-page__action contact-page__action--secondary"
                >
                  hello@taylor.maison
                </a>
              </div>

              <div
                className="contact-page__meta"
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                <div className="contact-page__meta-block">
                  <span className="contact-page__meta-label">Based in</span>
                  <span className="contact-page__meta-value">Southampton, NY</span>
                </div>
                <div className="contact-page__meta-block">
                  <span className="contact-page__meta-label">Availability</span>
                  <span className="contact-page__meta-value">Limited project openings</span>
                </div>
                <div className="contact-page__meta-block">
                  <span className="contact-page__meta-label">Scope</span>
                  <span className="contact-page__meta-value">Brand · Websites · AI workflows</span>
                </div>
                <div className="contact-page__meta-block">
                  <span className="contact-page__meta-label">Response</span>
                  <span className="contact-page__meta-value">Within 2 business days</span>
                </div>
              </div>
            </div>

            <div className="contact-page__right">
              <div
                className="contact-page__orb"
                aria-hidden="true"
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                <Ferrofluid />
              </div>

              <aside className="contact-page__panel" style={{ opacity: 0, visibility: 'hidden' }}>
                <p className="contact-page__panel-label">What to include</p>
                <ul className="contact-page__brief-list">
                  <li>
                    <span>01</span>
                    <p>The current website, brand, or reference point.</p>
                  </li>
                  <li>
                    <span>02</span>
                    <p>What feels off: trust, taste, inquiry quality, follow-up, or speed.</p>
                  </li>
                  <li>
                    <span>03</span>
                    <p>What is changing: launch, season, offer, referral, team, or market pressure.</p>
                  </li>
                  <li>
                    <span>04</span>
                    <p>What should become easier, faster, or more profitable.</p>
                  </li>
                </ul>
                <p className="contact-page__panel-note">
                  No form maze. No performance. Just enough context to know whether
                  this should be a small fix, a full build, or a longer partnership.
                </p>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <GlassPill />
    </>
  )
}
