'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    if ('ontouchstart' in window) return

    let hoveredEl: Element | null = null

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }

      // Check if hovering an interactive element for magnetic snap
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const interactive = el?.closest('a, button, [data-cursor="pointer"]')

      if (interactive && interactive !== hoveredEl) {
        hoveredEl = interactive
        dot.classList.add('hovering')
      } else if (!interactive && hoveredEl) {
        hoveredEl = null
        dot.classList.remove('hovering')
      }

      // Magnetic snap: pull cursor toward center of interactive element
      if (interactive) {
        const rect = interactive.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        target.current = {
          x: e.clientX + (cx - e.clientX) * 0.15,
          y: e.clientY + (cy - e.clientY) * 0.15,
        }
      }
    }

    const animate = () => {
      // Lerp toward target
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15
      dot.style.left = `${pos.current.x}px`
      dot.style.top = `${pos.current.y}px`
      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return <div ref={dotRef} className="cursor-dot" />
}
