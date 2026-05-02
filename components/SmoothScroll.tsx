'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Bridge Lenis -> ScrollTrigger: update on every scroll event.
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis off the GSAP ticker so both share one RAF loop.
    const tickerCb = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger once more after images/fonts finish loading.
    const onLoad = () => ScrollTrigger.refresh()
    if (document.readyState === 'complete') {
      ScrollTrigger.refresh()
    } else {
      window.addEventListener('load', onLoad)
    }

    // Handle anchor links
    const anchorClicks: Array<{ el: Element; handler: (e: Event) => void }> = []
    document.querySelectorAll('a[href^="#"]').forEach((el) => {
      const handler = (e: Event) => {
        e.preventDefault()
        const href = el.getAttribute('href')
        if (!href) return
        const target = document.querySelector(href)
        if (target) {
          lenis.scrollTo(target as HTMLElement, { offset: -100 })
        }
      }
      el.addEventListener('click', handler)
      anchorClicks.push({ el, handler })
    })

    return () => {
      gsap.ticker.remove(tickerCb)
      window.removeEventListener('load', onLoad)
      anchorClicks.forEach(({ el, handler }) => el.removeEventListener('click', handler))
      lenis.destroy()
    }
  }, [])

  return null
}
