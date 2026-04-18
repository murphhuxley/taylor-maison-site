'use client'

import { useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  /** Pull strength in px at 0 distance. */
  maxPull?: number
  /** Peak scale factor at 0 distance. */
  maxScale?: number
  /** Peak rotation in deg at 0 distance. */
  maxRot?: number
  /** Influence radius in px. */
  influence?: number
}

/**
 * A single glyph that deforms toward the cursor when it's within `influence` px.
 * Uses a shared RAF loop + a shared mousemove listener so any number of
 * CreatureGlyphs on the page runs cheaply.
 *
 * Does NOT touch the global CustomCursor.
 */
export default function CreatureGlyph({
  children,
  className = '',
  maxPull = 22,
  maxScale = 1.4,
  maxRot = 14,
  influence = 520,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion.
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let cx = 0
    let cy = 0

    const measure = () => {
      const r = el.getBoundingClientRect()
      cx = r.left + r.width / 2
      cy = r.top + r.height / 2
    }
    measure()

    // Re-measure on layout-shifting events.
    const onResize = () => measure()
    const onScroll = () => measure()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    // Re-measure after fonts / late layout.
    const t1 = window.setTimeout(measure, 600)
    const t2 = window.setTimeout(measure, 1500)

    let mx = window.innerWidth / 2
    let my = -500
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    document.addEventListener('mousemove', onMove)

    let rafId = 0
    const tick = () => {
      const dx = mx - cx
      const dy = my - cy
      const dist = Math.hypot(dx, dy)

      if (dist < influence && dist > 0.1) {
        const f = 1 - dist / influence
        const ease = f * f
        const tx = (dx / dist) * maxPull * ease
        const ty = (dy / dist) * maxPull * ease
        const scale = 1 + (maxScale - 1) * ease
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)
        const rot = (angle / 180) * maxRot * ease
        el.style.setProperty('--tx', `${tx.toFixed(2)}px`)
        el.style.setProperty('--ty', `${ty.toFixed(2)}px`)
        el.style.setProperty('--rot', `${rot.toFixed(2)}deg`)
        el.style.setProperty('--s', scale.toFixed(3))
        el.style.setProperty('--aura', ease.toFixed(3))
        el.style.setProperty(
          '--c',
          ease > 0.5 ? 'var(--accent-bright)' : 'var(--accent)'
        )
      } else {
        el.style.setProperty('--tx', '0px')
        el.style.setProperty('--ty', '0px')
        el.style.setProperty('--rot', '0deg')
        el.style.setProperty('--s', '1')
        el.style.setProperty('--aura', '0')
        el.style.setProperty('--c', 'var(--accent)')
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mousemove', onMove)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [influence, maxPull, maxRot, maxScale])

  return (
    <span ref={ref} className={`creature ${className}`.trim()}>
      {children}
    </span>
  )
}
