'use client'

import { createContext, startTransition, useContext, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'

interface PageTransitionContextValue {
  isTransitioning: boolean
  navigate: (href: string) => void
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

export function usePageTransition() {
  const context = useContext(PageTransitionContext)

  if (!context) {
    throw new Error('usePageTransition must be used within PageTransition')
  }

  return context
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const isTransitioningRef = useRef(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!overlayRef.current) return

    gsap.set(overlayRef.current, {
      autoAlpha: 0,
      yPercent: 100,
    })
  }, [])

  useEffect(() => {
    if (!isTransitioningRef.current || !overlayRef.current) return

    const tl = gsap.timeline({
      delay: 0.08,
      onComplete: () => {
        isTransitioningRef.current = false
        setIsTransitioning(false)

        gsap.set(overlayRef.current, {
          autoAlpha: 0,
          yPercent: 100,
        })

        if (labelRef.current) {
          gsap.set(labelRef.current, {
            autoAlpha: 0,
            y: 20,
          })
        }
      },
    })

    if (labelRef.current) {
      tl.to(labelRef.current, {
        autoAlpha: 0,
        y: -18,
        duration: 0.24,
        ease: 'power2.in',
      }, 0)
    }

    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.84,
      ease: 'power4.inOut',
    }, 0.06)

    return () => {
      tl.kill()
    }
  }, [pathname])

  const navigate = (href: string) => {
    if (!href || isTransitioningRef.current) return

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(href)
      return
    }

    if (!overlayRef.current) {
      router.push(href)
      return
    }

    isTransitioningRef.current = true
    setIsTransitioning(true)

    const tl = gsap.timeline({
      defaults: {
        ease: 'power4.inOut',
      },
      onComplete: () => {
        startTransition(() => {
          router.push(href)
        })
      },
    })

    gsap.set(overlayRef.current, {
      autoAlpha: 1,
      yPercent: 100,
    })

    if (labelRef.current) {
      gsap.set(labelRef.current, {
        autoAlpha: 0,
        y: 20,
      })
    }

    tl.to(overlayRef.current, {
      yPercent: 0,
      duration: 0.72,
    }, 0)

    if (labelRef.current) {
      tl.to(labelRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.38,
        ease: 'power3.out',
      }, 0.28)
    }
  }

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, navigate }}>
      {children}
      <div ref={overlayRef} className="page-transition" aria-hidden="true">
        <div className="page-transition__inner">
          <div ref={labelRef} className="page-transition__label">
            <span className="page-transition__eyebrow">Taylor Maison</span>
            <span className="page-transition__title">Loading next view</span>
          </div>
        </div>
      </div>
    </PageTransitionContext.Provider>
  )
}
