'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const rings = [
  { size: 100, tiltX: 65, tiltY: 0, speed: 28, opacity: 0.35 },
  { size: 85, tiltX: 72, tiltY: 35, speed: 34, opacity: 0.25 },
  { size: 70, tiltX: 58, tiltY: -20, speed: 22, opacity: 0.2 },
  { size: 52, tiltX: 80, tiltY: 55, speed: 40, opacity: 0.15 },
]

const dotConfigs = [
  { ring: 0, orbitSpeed: 8, size: 3, startAngle: 0 },
  { ring: 1, orbitSpeed: 11, size: 2.5, startAngle: 90 },
  { ring: 2, orbitSpeed: 6, size: 2.5, startAngle: 45 },
  { ring: 3, orbitSpeed: 14, size: 2, startAngle: 200 },
]

export default function OrbitalRings() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sceneRef.current || !wrapRef.current) return

    const ringEls = sceneRef.current.querySelectorAll<HTMLElement>('.orbital-rings__ring')
    const dotEls = sceneRef.current.querySelectorAll<SVGGElement>('.orbital-dot')

    const tweens: gsap.core.Tween[] = []

    // Spin each ring slowly
    ringEls.forEach((el, i) => {
      tweens.push(
        gsap.to(el, {
          rotation: 360,
          duration: rings[i].speed,
          ease: 'none',
          repeat: -1,
          delay: i * 0.4,
        })
      )
    })

    // Orbit each dot around its ring center independently
    dotEls.forEach((el, i) => {
      const cfg = dotConfigs[i]
      tweens.push(
        gsap.fromTo(el,
          { rotation: cfg.startAngle, svgOrigin: '100 100' },
          {
            rotation: cfg.startAngle + 360,
            svgOrigin: '100 100',
            duration: cfg.orbitSpeed,
            ease: 'none',
            repeat: -1,
          }
        )
      )
    })

    // Entrance
    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out', delay: 0.6 }
    )

    return () => tweens.forEach(t => t.kill())
  }, [])

  return (
    <div ref={wrapRef} className="orbital-rings" style={{ opacity: 0 }}>
      <div ref={sceneRef} className="orbital-rings__scene">
        {rings.map((ring, i) => {
          const dot = dotConfigs.find(d => d.ring === i)
          return (
            <div
              key={i}
              className="orbital-rings__ring"
              style={{
                width: `${ring.size}%`,
                height: `${ring.size}%`,
                opacity: ring.opacity,
              }}
            >
              <svg
                viewBox="0 0 200 200"
                className="orbital-rings__svg"
                style={{
                  transform: `rotateX(${ring.tiltX}deg) rotateY(${ring.tiltY}deg)`,
                }}
              >
                <circle
                  cx="100" cy="100" r="96"
                  fill="none" stroke="currentColor" strokeWidth="1"
                />
                {dot && (
                  <g className="orbital-dot">
                    <circle cx="100" cy="4" r={dot.size} fill="currentColor" />
                  </g>
                )}
              </svg>
            </div>
          )
        })}

        <div className="orbital-rings__center" />
      </div>
    </div>
  )
}
