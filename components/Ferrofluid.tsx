'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { vertexShader } from '../shaders/ferrofluid.vert'
import { fragmentShader } from '../shaders/ferrofluid.frag'

interface FerroState {
  magnetStrength: number
  targetStrength: number
  spikeSharpness: number
  targetSharpness: number
  magnetPos: THREE.Vector3
  targetMagnetPos: THREE.Vector3
  hovered: boolean
  pressed: boolean
  hoverStart: number
  recoilTime: number
  recoilActive: boolean
  edgeProximity: number
}

function FerrofluidMesh({ state }: { state: React.RefObject<FerroState> }) {
  const meshRef = useRef<THREE.Mesh>(null)

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const detail = isMobile ? 64 : 128

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMagnetPos: { value: new THREE.Vector3(0, 0, 1) },
      uMagnetStrength: { value: 0 },
      uSpikeSharpness: { value: 2.0 },
    }),
    []
  )

  useFrame((frameState) => {
    const s = state.current
    if (!s) return

    const t = frameState.clock.elapsedTime
    const now = performance.now()

    // Determine targets based on interaction state
    if (s.pressed) {
      s.targetStrength = 1.0
      s.targetSharpness = 10.0
    } else if (s.hovered) {
      const hoverDuration = now - s.hoverStart
      const edge = s.edgeProximity // 0 at edges, 1 at center
      if (hoverDuration < 600) {
        s.targetStrength = 0.0
        s.targetSharpness = 2.0
      } else if (hoverDuration < 1000) {
        const ramp = (hoverDuration - 600) / 400 // 0→1 over 400ms
        s.targetStrength = ramp * 0.4 * edge * edge
        s.targetSharpness = 2.0 + ramp * 3.0 * edge
      } else {
        s.targetStrength = 0.7 * edge * edge
        s.targetSharpness = 3.0 + 5.0 * edge
      }
    } else {
      s.targetStrength = 0.0
      s.targetSharpness = 2.0
    }

    // Recoil wobble
    if (s.recoilActive) {
      const rt = (now - s.recoilTime) / 1000.0
      if (rt > 1.5) {
        s.recoilActive = false
      } else {
        const wobble = 0.15 * Math.exp(-rt * 4.0) * Math.cos(rt * 12.0)
        s.magnetStrength = THREE.MathUtils.lerp(s.magnetStrength, s.targetStrength, 0.08) + wobble
      }
    }

    // Lerp state toward targets (skip magnetStrength lerp if recoil is handling it)
    if (!s.recoilActive) {
      s.magnetStrength = THREE.MathUtils.lerp(s.magnetStrength, s.targetStrength, 0.08)
    }
    s.spikeSharpness = THREE.MathUtils.lerp(s.spikeSharpness, s.targetSharpness, 0.06)
    s.magnetPos.lerp(s.targetMagnetPos, 0.08)

    // Update uniforms
    uniforms.uTime.value = t
    uniforms.uMagnetStrength.value = s.magnetStrength
    uniforms.uSpikeSharpness.value = s.spikeSharpness
    uniforms.uMagnetPos.value.copy(s.magnetPos)
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, detail]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export default function Ferrofluid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const state = useRef<FerroState>({
    magnetStrength: 0,
    targetStrength: 0,
    spikeSharpness: 2.0,
    targetSharpness: 2.0,
    magnetPos: new THREE.Vector3(0, 0, 1),
    targetMagnetPos: new THREE.Vector3(0, 0, 1),
    hovered: false,
    pressed: false,
    hoverStart: 0,
    recoilTime: 0,
    recoilActive: false,
    edgeProximity: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 250)
    return () => clearTimeout(timer)
  }, [])

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    const dist = Math.sqrt(x * x + y * y)
    state.current.edgeProximity = Math.max(0, 1 - dist)

    state.current.targetMagnetPos
      .set(x * 1.5, y * 1.5, 1)
      .normalize()
      .multiplyScalar(2)
  }, [])

  const handlePointerEnter = useCallback(() => {
    state.current.hovered = true
    state.current.hoverStart = performance.now()
  }, [])

  const handlePointerLeave = useCallback(() => {
    state.current.hovered = false
    state.current.pressed = false
  }, [])

  const handlePointerDown = useCallback(() => {
    state.current.pressed = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (state.current.pressed) {
      state.current.pressed = false
      state.current.recoilActive = true
      state.current.recoilTime = performance.now()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="spectral-orb"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 1.1s ease' }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {visible && (
        <Canvas
          camera={{ position: [0, 0, 2.7], fov: 36 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <Float speed={0.72} rotationIntensity={0.04} floatIntensity={0.08}>
            <FerrofluidMesh state={state} />
          </Float>
        </Canvas>
      )}
    </div>
  )
}
