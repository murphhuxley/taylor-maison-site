'use client'

import { useRef, useCallback } from 'react'
import gsap from 'gsap'

interface MagneticLinkProps {
  children: React.ReactNode
  href: string
  className?: string
  strength?: number
  target?: string
  rel?: string
  'data-cursor'?: string
}

export default function MagneticLink({
  children,
  href,
  className = '',
  strength = 0.3,
  ...props
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: 'power3.out' })
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
  }, [])

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ display: 'inline-block' }}
      {...props}
    >
      {children}
    </a>
  )
}
