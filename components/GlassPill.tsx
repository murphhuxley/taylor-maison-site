'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TransitionLink from './TransitionLink'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/#engagements' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const socialItems = [
  { label: 'X', href: 'https://x.com/tMAIS0N' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/taylorflorio' },
]

type GlassPillProps = {
  autoOpenOnBottom?: boolean
}

export default function GlassPill({ autoOpenOnBottom = false }: GlassPillProps) {
  const [open, setOpen] = useState(false)
  const [autoOpen, setAutoOpen] = useState(false)
  const [userClosed, setUserClosed] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
    setAutoOpen(false)
    setUserClosed(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setAutoOpen(false)
        setUserClosed(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Auto-expand near the bottom so the dock feels like a useful next-step layer.
  // gsap.ticker shares the RAF loop with Lenis so this catches every scroll source.
  useEffect(() => {
    if (!autoOpenOnBottom) {
      setAutoOpen(false)
      return
    }

    let lastShouldOpen: boolean | null = null
    const tick = () => {
      const doc = document.documentElement
      const distanceFromBottom = doc.scrollHeight - (window.scrollY + window.innerHeight)
      const shouldOpen = distanceFromBottom < Math.min(window.innerHeight * 0.18, 180)
      if (shouldOpen === lastShouldOpen) return
      lastShouldOpen = shouldOpen
      if (shouldOpen) {
        setAutoOpen(true)
      } else {
        setAutoOpen(false)
        setUserClosed(false)
      }
    }
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
    }
  }, [autoOpenOnBottom, pathname])

  const isOpen = open || (autoOpen && !userClosed)

  const closeAll = () => {
    setOpen(false)
    setUserClosed(true)
  }

  const handleToggle = () => {
    if (isOpen) {
      closeAll()
    } else {
      setOpen(true)
      setUserClosed(false)
    }
  }

  const handleBackToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    closeAll()
  }

  return (
    <div className={`glass-dock ${isOpen ? 'is-open' : ''}`} aria-label="Floating navigation">
      <div className="glass-dock__shell">
        <div className="glass-dock__panel" aria-hidden={!isOpen}>
          <p className="glass-dock__tagline">
            Brand direction, custom websites, and practical AI workflows.
          </p>

          <ul className="glass-dock__nav">
            {navItems.map((item, i) => (
              <li key={item.href} style={{ transitionDelay: isOpen ? `${0.06 + i * 0.05}s` : '0s' }}>
                <TransitionLink
                  href={item.href}
                  className="glass-dock__nav-link"
                  onClick={closeAll}
                >
                  {item.label}
                </TransitionLink>
              </li>
            ))}
          </ul>

          <div className="glass-dock__divider" />

          <div className="glass-dock__contact">
            <a href="mailto:hello@taylor.maison" className="glass-dock__email">
              hello@taylor.maison
            </a>
            <TransitionLink
              href="/contact"
              className="glass-dock__cta"
              style={{ transitionDelay: isOpen ? `${0.1 + navItems.length * 0.05}s` : '0s' }}
              onClick={closeAll}
            >
              Let&rsquo;s talk
            </TransitionLink>
          </div>

          <div className="glass-dock__utility">
            <ul className="glass-dock__social">
              {socialItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="glass-dock__social-link"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="glass-dock__back-to-top"
              onClick={handleBackToTop}
            >
              Back to top
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>

        <div className="glass-dock__bar">
          <TransitionLink href="/" className="glass-dock__brand" aria-label="Taylor Maison — home">
            <img src="/tm-mark.png" alt="" />
            <span className="glass-dock__bar-wordmark" aria-hidden="true">
              <span>TAYLOR</span>
              <span>MAISON</span>
            </span>
          </TransitionLink>
          <button
            type="button"
            className={`glass-dock__toggle ${isOpen ? 'is-open' : ''}`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={handleToggle}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </div>
  )
}
