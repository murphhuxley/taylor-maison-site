'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const palettes = [
  {
    '--bg': '#F2EDE8',
    '--bg-alt': '#E8E2DB',
    '--text-primary': '#141414',
    '--text-secondary': '#6B6560',
    '--text-muted': '#A39D96',
    '--line': '#D4CEC7',
    '--line-dark': '#141414',
    '--accent': '#9BA0A8',
  },
  {
    '--bg': '#FF5E1A',
    '--bg-alt': '#E8520F',
    '--text-primary': '#FFFFFF',
    '--text-secondary': 'rgba(255,255,255,0.7)',
    '--text-muted': 'rgba(255,255,255,0.4)',
    '--line': 'rgba(255,255,255,0.2)',
    '--line-dark': '#FFFFFF',
    '--accent': '#FFD600',
  },
  {
    '--bg': '#3A0CA3',
    '--bg-alt': '#32088C',
    '--text-primary': '#FFFFFF',
    '--text-secondary': 'rgba(255,255,255,0.6)',
    '--text-muted': 'rgba(255,255,255,0.35)',
    '--line': 'rgba(255,255,255,0.15)',
    '--line-dark': '#FFFFFF',
    '--accent': '#F72585',
  },
  {
    '--bg': '#FF006E',
    '--bg-alt': '#E80063',
    '--text-primary': '#FFFFFF',
    '--text-secondary': 'rgba(255,255,255,0.7)',
    '--text-muted': 'rgba(255,255,255,0.4)',
    '--line': 'rgba(255,255,255,0.2)',
    '--line-dark': '#FFFFFF',
    '--accent': '#FFBE0B',
  },
  {
    '--bg': '#FFDD00',
    '--bg-alt': '#F0D000',
    '--text-primary': '#141414',
    '--text-secondary': '#3A0CA3',
    '--text-muted': '#6B5B00',
    '--line': 'rgba(0,0,0,0.1)',
    '--line-dark': '#141414',
    '--accent': '#FF006E',
  },
  {
    '--bg': '#3A86FF',
    '--bg-alt': '#2E75E8',
    '--text-primary': '#FFFFFF',
    '--text-secondary': 'rgba(255,255,255,0.7)',
    '--text-muted': 'rgba(255,255,255,0.4)',
    '--line': 'rgba(255,255,255,0.2)',
    '--line-dark': '#FFFFFF',
    '--accent': '#FFBE0B',
  },
  {
    '--bg': '#06D6A0',
    '--bg-alt': '#05C090',
    '--text-primary': '#141414',
    '--text-secondary': '#073B4C',
    '--text-muted': '#0A5E4A',
    '--line': 'rgba(0,0,0,0.1)',
    '--line-dark': '#141414',
    '--accent': '#FF006E',
  },
]

export default function ColorShift() {
  const paletteIndex = useRef(0)

  useEffect(() => {
    const handleColorShift = (e: Event) => {
      const detail = (e as CustomEvent).detail
      const x = detail?.x ?? window.innerWidth / 2
      const y = detail?.y ?? 0

      // Advance palette
      paletteIndex.current = (paletteIndex.current + 1) % palettes.length
      const palette = palettes[paletteIndex.current]

      // Create shockwave element
      const wave = document.createElement('div')
      const size = Math.max(window.innerWidth, window.innerHeight) * 2.5
      Object.assign(wave.style, {
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: palette['--bg'],
        pointerEvents: 'none',
        zIndex: '9998',
        transform: 'translate(-50%, -50%) scale(0)',
        transformOrigin: 'center center',
      })
      document.body.appendChild(wave)

      // Animate the shockwave
      gsap.to(wave, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          // Apply all CSS vars to :root
          const root = document.documentElement
          Object.entries(palette).forEach(([key, value]) => {
            root.style.setProperty(key, value)
          })

          // Fade out and remove shockwave
          gsap.to(wave, {
            opacity: 0,
            duration: 0.15,
            onComplete: () => {
              wave.remove()
            },
          })
        },
      })
    }

    document.addEventListener('colorshift', handleColorShift)
    return () => document.removeEventListener('colorshift', handleColorShift)
  }, [])

  return null
}
