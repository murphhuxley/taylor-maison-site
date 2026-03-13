'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const navItems = [
  { label: 'Work', id: 'work' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
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

  const hrefFor = (id: string) => {
    if (pathname === '/') return `#${id}`
    return `/#${id}`
  }

  return (
    <header ref={headerRef} className="header">
      <div className="header__shell">
        <Link href="/" className="header__brand" style={{ opacity: 0, visibility: 'hidden' }}>
          <span className="header__brand-mark">TM</span>
          <span className="header__brand-copy">
            <span className="header__brand-name">Taylor Maison</span>
            <span className="header__brand-subtitle">Creative direction</span>
          </span>
        </Link>

        <nav className="header__nav" aria-label="Primary" style={{ opacity: 0, visibility: 'hidden' }}>
          {navItems.map((item) => (
            <a key={item.id} href={hrefFor(item.id)} className="header__nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={hrefFor('contact')}
          className="header__cta"
          style={{ opacity: 0, visibility: 'hidden' }}
        >
          Contact
        </a>
      </div>
    </header>
  )
}
