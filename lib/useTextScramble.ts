'use client'

import { useState, useCallback, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&'

export function useTextScramble(original: string, duration = 600) {
  const [display, setDisplay] = useState(original)
  const frameRef = useRef<number>(0)
  const isRunning = useRef(false)

  const scramble = useCallback(() => {
    if (isRunning.current) return
    isRunning.current = true
    const startTime = performance.now()
    const length = original.length

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      let result = ''
      for (let i = 0; i < length; i++) {
        if (original[i] === ' ') {
          result += ' '
        } else if (i / length < progress) {
          result += original[i]
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setDisplay(result)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setDisplay(original)
        isRunning.current = false
      }
    }

    frameRef.current = requestAnimationFrame(animate)
  }, [original, duration])

  const reset = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    isRunning.current = false
    setDisplay(original)
  }, [original])

  return { display, scramble, reset }
}
