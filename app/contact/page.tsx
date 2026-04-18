'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import CreatureGlyph from '@/components/CreatureGlyph'

const Ferrofluid = dynamic(() => import('@/components/Ferrofluid'), { ssr: false })

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo(
        '.contact-page__copy > *',
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
        '.contact-page__visual',
        { autoAlpha: 0, scale: 0.92 },
        {
          autoAlpha: 1,
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
                Send the current URL<CreatureGlyph>,</CreatureGlyph>
                <br />
                and what feels off<CreatureGlyph>.</CreatureGlyph>
              </h1>
              <p
                className="contact-page__lede"
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                That&rsquo;s usually enough to tell whether the next step is
                advisory, a rebuild, or lighter workflow support.
              </p>

              <div
                className="contact-page__actions"
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                <a
                  href="mailto:hello@taylor.maison?subject=Project%20inquiry"
                  className="contact-page__action contact-page__action--primary"
                >
                  Send the brief
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
                  <span className="contact-page__meta-value">2 engagements · Q2 2026</span>
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

            <div
              className="contact-page__visual"
              style={{ opacity: 0, visibility: 'hidden' }}
            >
              <Ferrofluid />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
