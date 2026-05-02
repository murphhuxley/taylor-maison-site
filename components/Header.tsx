'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import TransitionLink from './TransitionLink'

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.header__shell > *',
        { opacity: 0, y: -18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
        }
      )
    }, headerRef)

    return () => ctx.revert()
  }, [])

  return (
    <header ref={headerRef} className="header header--minimal">
      <div className="header__shell">
        <TransitionLink
          href="/"
          className="header__brand"
          style={{ opacity: 0, visibility: 'hidden' }}
          aria-label="Taylor Maison — home"
        >
          <span className="header__brand-mark" aria-hidden="true">
            <img src="/tm-mark.png" alt="" />
          </span>
          <span className="header__brand-wm" aria-hidden="true">
            <span>TAYLOR</span>
            <span>MAISON</span>
          </span>
        </TransitionLink>

        <TransitionLink
          href="/contact"
          className="header__cta"
          style={{ opacity: 0, visibility: 'hidden' }}
        >
          Let&rsquo;s talk
        </TransitionLink>
      </div>
    </header>
  )
}
