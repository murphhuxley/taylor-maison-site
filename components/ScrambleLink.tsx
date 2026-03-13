'use client'

import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import { useTextScramble } from '@/lib/useTextScramble'

interface ScrambleLinkProps {
  children: string
  href: string
  className?: string
  magnetic?: boolean
  magneticStrength?: number
  scrambleDuration?: number
  target?: string
  rel?: string
  'data-cursor'?: string
}

export default function ScrambleLink({
  children,
  href,
  className = '',
  magnetic = true,
  magneticStrength = 0.3,
  scrambleDuration = 500,
  ...props
}: ScrambleLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const { display, scramble, reset } = useTextScramble(children, scrambleDuration)

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!magnetic) return
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * magneticStrength
      const dy = (e.clientY - cy) * magneticStrength
      gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: 'power3.out' })
    },
    [magnetic, magneticStrength]
  )

  const onMouseEnter = useCallback(() => {
    scramble()
  }, [scramble])

  const onMouseLeave = useCallback(() => {
    reset()
    if (!magnetic) return
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
  }, [reset, magnetic])

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ display: 'inline-block' }}
      {...props}
    >
      {display}
    </a>
  )
}
