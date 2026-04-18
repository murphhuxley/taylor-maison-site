'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import TransitionLink from './TransitionLink'

type NavItem = { label: string; href: string }

const navItems: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

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

  // Close mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll while mobile menu is open.
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const resolveHref = (href: string) => {
    // Hash-only links targeting root should still go to /#x.
    if (href.startsWith('/#') && pathname === '/') {
      return href.slice(1) // -> #x, so smooth-scroll on current page
    }
    return href
  }

  return (
    <header ref={headerRef} className="header">
      <div className="header__shell">
        <TransitionLink href="/" className="header__brand" style={{ opacity: 0, visibility: 'hidden' }}>
          <span className="header__brand-mark">TM</span>
          <span className="header__brand-copy">
            <span className="header__brand-name">Taylor Maison</span>
            <span className="header__brand-subtitle">Creative direction</span>
          </span>
        </TransitionLink>

        <nav className="header__nav" aria-label="Primary" style={{ opacity: 0, visibility: 'hidden' }}>
          {navItems.map((item) => (
            <TransitionLink
              key={item.href}
              href={resolveHref(item.href)}
              className="header__nav-link"
            >
              {item.label}
            </TransitionLink>
          ))}
        </nav>

        <TransitionLink
          href="/contact"
          className="header__cta"
          style={{ opacity: 0, visibility: 'hidden' }}
        >
          Start a project
        </TransitionLink>

        <button
          type="button"
          className={`header__menu-btn${menuOpen ? ' is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
          style={{ opacity: 0, visibility: 'hidden' }}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-nav__inner" aria-label="Primary mobile">
          {navItems.map((item, i) => (
            <TransitionLink
              key={item.href}
              href={resolveHref(item.href)}
              className="mobile-nav__link"
              style={{ transitionDelay: menuOpen ? `${0.08 + i * 0.06}s` : '0s' }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-nav__link-idx">0{i + 1}</span>
              <span className="mobile-nav__link-label">{item.label}</span>
            </TransitionLink>
          ))}
          <TransitionLink
            href="/contact"
            className="mobile-nav__cta"
            style={{ transitionDelay: menuOpen ? `${0.08 + navItems.length * 0.06}s` : '0s' }}
            onClick={() => setMenuOpen(false)}
          >
            Start a project
          </TransitionLink>
        </nav>
      </div>
    </header>
  )
}
