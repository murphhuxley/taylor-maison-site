'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js'

interface InteractionState {
  x: number
  y: number
  energy: number
  targetEnergy: number
  press: number
  targetPress: number
  recoil: number
  targetRecoil: number
  pressX: number
  pressY: number
  pressZ: number
  escapeX: number
  escapeY: number
  escapeZ: number
  hovered: boolean
}

function MilkyBlackOrb({ interaction }: { interaction: React.RefObject<InteractionState> }) {
  const groupRef = useRef<THREE.Group>(null)
  const shellRef = useRef<THREE.Mesh>(null)
  const shellMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const innerMaterialRef = useRef<THREE.MeshStandardMaterial>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const haloMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
  const geometryRef = useRef<THREE.SphereGeometry>(null)
  const basePositionsRef = useRef<Float32Array | null>(null)
  const simplexRef = useRef<SimplexNoise | null>(null)

  useEffect(() => {
    simplexRef.current = new SimplexNoise()
  }, [])

  useEffect(() => {
    if (!geometryRef.current) return

    const positions = geometryRef.current.attributes.position.array as Float32Array
    basePositionsRef.current = positions.slice()
  }, [])

  useFrame((state) => {
    const current = interaction.current

    if (!current || !geometryRef.current || !basePositionsRef.current || !simplexRef.current) {
      return
    }

    const t = state.clock.elapsedTime

    current.energy = THREE.MathUtils.lerp(current.energy, current.targetEnergy, 0.12)
    current.press = THREE.MathUtils.lerp(current.press, current.targetPress, 0.18)
    current.recoil = THREE.MathUtils.lerp(current.recoil, current.targetRecoil, 0.14)
    current.targetEnergy = THREE.MathUtils.lerp(current.targetEnergy, current.hovered ? 0.24 : 0, 0.05)
    current.targetRecoil = THREE.MathUtils.lerp(current.targetRecoil, current.hovered ? 0.08 : 0, 0.035)

    const pointerVector = new THREE.Vector3(current.x * 0.74, current.y * 0.74, 1).normalize()
    const pressVector = new THREE.Vector3(current.pressX, current.pressY, current.pressZ).normalize()
    const escapeBaseVector = new THREE.Vector3(current.escapeX, current.escapeY, current.escapeZ).normalize()
    const escapeVector = escapeBaseVector
      .clone()
      .applyAxisAngle(pressVector, Math.sin(t * 2.8) * current.press * 0.34)
      .normalize()
    const oppositePressVector = pressVector.clone().multiplyScalar(-1)
    const swirlAxis = new THREE.Vector3().crossVectors(pressVector, escapeVector)

    if (swirlAxis.lengthSq() < 0.001) {
      swirlAxis.set(0, 1, 0)
    } else {
      swirlAxis.normalize()
    }

    if (groupRef.current) {
      const driftX = (current.y * 0.05) + Math.sin(t * 0.42) * (0.012 + current.energy * 0.014)
      const driftY = (current.x * 0.07) + Math.sin(t * 0.24) * 0.02

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, driftX, 0.045)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, driftY, 0.045)
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, current.x * 0.012, 0.03)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, current.y * 0.01, 0.03)
    }

    const geometry = geometryRef.current
    const positions = geometry.attributes.position.array as Float32Array
    const basePositions = basePositionsRef.current
    const simplex = simplexRef.current
    const energy = current.energy
    const press = current.press
    const recoil = current.recoil

    for (let i = 0; i < positions.length; i += 3) {
      const ox = basePositions[i]
      const oy = basePositions[i + 1]
      const oz = basePositions[i + 2]

      const length = Math.sqrt((ox * ox) + (oy * oy) + (oz * oz)) || 1
      const nx = ox / length
      const ny = oy / length
      const nz = oz / length

      const pointerDot = (nx * pointerVector.x) + (ny * pointerVector.y) + (nz * pointerVector.z)
      const pressDot = (nx * pressVector.x) + (ny * pressVector.y) + (nz * pressVector.z)
      const escapeDot = (nx * escapeVector.x) + (ny * escapeVector.y) + (nz * escapeVector.z)
      const oppositeDot = (nx * oppositePressVector.x) + (ny * oppositePressVector.y) + (nz * oppositePressVector.z)
      const swirlDot = (nx * swirlAxis.x) + (ny * swirlAxis.y) + (nz * swirlAxis.z)

      const facing = Math.max(0, pointerDot)
      const pressFacing = Math.max(0, pressDot)
      const escapeFacing = Math.max(0, escapeDot)
      const oppositeFacing = Math.max(0, oppositeDot)

      const hoverCore = Math.pow(facing, 30)
      const hoverField = Math.pow(facing, 12)
      const pressCore = Math.pow(pressFacing, 32)
      const pressField = Math.pow(pressFacing, 13)
      const escapeCore = Math.pow(escapeFacing, 24)
      const escapeField = Math.pow(escapeFacing, 10)
      const oppositeField = Math.pow(oppositeFacing, 10)

      const flow =
        simplex.noise4d(nx * 2.3 + t * 0.16, ny * 2.3 - t * 0.12, nz * 2.3, t * 0.32) * 0.018
      const detail =
        simplex.noise4d(nx * 4.8 - t * 0.18, ny * 4.8 + t * 0.12, nz * 4.8, t * 0.5) * 0.012

      const hoverNoise =
        simplex.noise4d(
          nx * 8.2 + pointerVector.x * 2.8,
          ny * 8.2 + pointerVector.y * 2.8,
          nz * 8.2 + pointerVector.z * 2.8,
          t * 0.94
        ) *
        0.5 +
        0.7
      const pressNoise =
        simplex.noise4d(
          nx * 11.6 + pressVector.x * 4,
          ny * 11.6 + pressVector.y * 4,
          nz * 11.6 + pressVector.z * 4,
          t * 1.22
        ) *
        0.6 +
        0.78
      const escapeNoise =
        simplex.noise4d(
          nx * 10.2 + escapeVector.x * 3.6,
          ny * 10.2 + escapeVector.y * 3.6,
          nz * 10.2 + escapeVector.z * 3.6,
          t * 1.34
        ) *
        0.55 +
        0.72

      const hoverRidged =
        Math.pow(
          THREE.MathUtils.clamp(
            1 - Math.abs(
              simplex.noise4d(
                nx * 15.6 + pointerVector.x * 5.4,
                ny * 15.6 + pointerVector.y * 5.4,
                nz * 15.6 + pointerVector.z * 5.4,
                t * 1.22
              )
            ),
            0,
            1
          ),
          4.4
        )
      const pressRidged =
        Math.pow(
          THREE.MathUtils.clamp(
            1 - Math.abs(
              simplex.noise4d(
                nx * 17.4 + pressVector.x * 6.2,
                ny * 17.4 + pressVector.y * 6.2,
                nz * 17.4 + pressVector.z * 6.2,
                t * 1.54
              )
            ),
            0,
            1
          ),
          5
        )
      const escapeRidged =
        Math.pow(
          THREE.MathUtils.clamp(
            1 - Math.abs(
              simplex.noise4d(
                nx * 16.2 + escapeVector.x * 5.6,
                ny * 16.2 + escapeVector.y * 5.6,
                nz * 16.2 + escapeVector.z * 5.6,
                t * 1.48
              )
            ),
            0,
            1
          ),
          4.4
        )

      const hoverSpikes = hoverCore * (0.1 + energy * 0.32) * hoverNoise
      const hoverNeedles = hoverField * hoverRidged * (0.004 + energy * 0.05)
      const hoverLift = hoverField * (0.035 + energy * 0.09)
      const hoverCollar = hoverField * (1 - hoverCore) * (0.05 + energy * 0.11)

      const pressSpikes = pressCore * press * (0.34 + (pressNoise * 0.42))
      const pressNeedles = pressField * pressRidged * press * 0.11
      const pressLift = pressField * press * 0.24
      const pressCollar = pressField * (1 - pressCore) * press * 0.2

      const escapeSpikes = escapeCore * press * (0.26 + (escapeNoise * 0.34))
      const escapeNeedles = escapeField * escapeRidged * press * 0.06
      const escapeLift = escapeField * press * 0.11
      const escapeWake = escapeField * (1 - escapeCore) * press * 0.08
      const oppositeSink = oppositeField * press * 0.05

      const magneticPulse =
        Math.sin((swirlDot * 12) + (t * (2.6 + press * 1.4))) * (0.004 + energy * 0.006 + press * 0.008)

      const rippleDistance = 1 - THREE.MathUtils.clamp(pressDot, -1, 1)
      const escapeDistance = 1 - THREE.MathUtils.clamp(escapeDot, -1, 1)
      const recoilRipple =
        Math.sin(((1.08 - rippleDistance) * 18) - (t * (6.4 + press * 2.1))) *
        Math.exp(-rippleDistance * 6.4) *
        recoil *
        0.072
      const escapeRipple =
        Math.sin(((1.16 - escapeDistance) * 16) - (t * 7.1) + (swirlDot * 4)) *
        Math.exp(-escapeDistance * 5.4) *
        (press * 0.048)

      const breath = Math.sin((t * 1.4) + (swirlDot * 3.4)) * (0.006 + energy * 0.006 + recoil * 0.008)

      const displacement = THREE.MathUtils.clamp(
        1 +
          flow +
          detail +
          hoverSpikes +
          hoverNeedles +
          hoverLift +
          pressSpikes +
          pressNeedles +
          pressLift +
          escapeSpikes +
          escapeNeedles +
          escapeLift +
          recoilRipple +
          escapeRipple +
          magneticPulse +
          breath -
          hoverCollar -
          pressCollar -
          escapeWake -
          oppositeSink,
        0.76,
        1.82
      )

      positions[i] = ox * displacement
      positions[i + 1] = oy * displacement
      positions[i + 2] = oz * displacement
    }

    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()

    if (shellRef.current) {
      const shellScale = 1 + (Math.sin(t * 1.18) * 0.004) + (energy * 0.018) + (press * 0.032) + (recoil * 0.014)
      shellRef.current.scale.setScalar(shellScale)
    }

    if (innerRef.current) {
      const innerScale = 0.75 + (Math.sin(t * 1.86) * 0.012) + (energy * 0.018) + (press * 0.04) + (recoil * 0.02)
      innerRef.current.scale.setScalar(innerScale)
    }

    if (haloRef.current) {
      const haloScale = 1.58 + (Math.sin(t * 0.82) * 0.016) + (energy * 0.024) + (press * 0.08) + (recoil * 0.04)
      haloRef.current.scale.setScalar(haloScale)
    }

    if (shellMaterialRef.current) {
      shellMaterialRef.current.clearcoat = 0.56 + (energy * 0.2) + (press * 0.26)
      shellMaterialRef.current.clearcoatRoughness = 0.48 - (energy * 0.08) - (press * 0.14)
      shellMaterialRef.current.roughness = 0.32 + (energy * 0.04) + (press * 0.03)
      shellMaterialRef.current.reflectivity = 0.3 + (energy * 0.04) + (press * 0.08)
    }

    if (innerMaterialRef.current) {
      innerMaterialRef.current.emissiveIntensity = 0.22 + (energy * 0.22) + (press * 0.75) + (recoil * 0.18)
      innerMaterialRef.current.opacity = 0.54 + (energy * 0.04) + (press * 0.12)
    }

    if (haloMaterialRef.current) {
      haloMaterialRef.current.opacity = 0.08 + (energy * 0.08) + (press * 0.14) + (recoil * 0.05)
    }
  })

  return (
    <Float speed={0.72} rotationIntensity={0.04} floatIntensity={0.08}>
      <group ref={groupRef}>
        <mesh ref={haloRef} renderOrder={0}>
          <sphereGeometry args={[1.23, 64, 64]} />
          <meshBasicMaterial
            ref={haloMaterialRef}
            color="#d9e1ea"
            transparent
            opacity={0.1}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>

        <mesh ref={shellRef} renderOrder={2}>
          <sphereGeometry ref={geometryRef} args={[1.02, 96, 96]} />
          <meshPhysicalMaterial
            ref={shellMaterialRef}
            color="#252a31"
            roughness={0.32}
            metalness={0.05}
            clearcoat={0.62}
            clearcoatRoughness={0.46}
            transparent
            opacity={0.96}
            reflectivity={0.32}
          />
        </mesh>

        <mesh ref={innerRef} renderOrder={1}>
          <sphereGeometry args={[0.75, 64, 64]} />
          <meshStandardMaterial
            ref={innerMaterialRef}
            color="#95a0ad"
            emissive="#f5f8ff"
            emissiveIntensity={0.24}
            roughness={0.6}
            metalness={0.04}
            transparent
            opacity={0.56}
          />
        </mesh>
      </group>
    </Float>
  )
}

export default function SpectralOrb() {
  const containerRef = useRef<HTMLDivElement>(null)
  const interaction = useRef<InteractionState>({
    x: 0,
    y: 0,
    energy: 0,
    targetEnergy: 0,
    press: 0,
    targetPress: 0,
    recoil: 0,
    targetRecoil: 0,
    pressX: 0,
    pressY: 0,
    pressZ: 1,
    escapeX: 0,
    escapeY: 0,
    escapeZ: -1,
    hovered: false,
  })
  const lastSampleRef = useRef({ x: 0, y: 0, time: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 250)
    const element = containerRef.current

    if (!element) {
      return () => clearTimeout(timer)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      const nextX = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const nextY = -((event.clientY - rect.top) / rect.height) * 2 + 1

      const now = performance.now()
      const dt = Math.max(now - lastSampleRef.current.time, 16)
      const dx = nextX - lastSampleRef.current.x
      const dy = nextY - lastSampleRef.current.y
      const velocity = Math.min(Math.sqrt((dx * dx) + (dy * dy)) / (dt / 16), 1.8)

      interaction.current.x = nextX
      interaction.current.y = nextY
      interaction.current.hovered = true
      interaction.current.targetEnergy = Math.max(interaction.current.targetEnergy, 0.24 + (velocity * 0.55))
      interaction.current.targetRecoil = Math.max(interaction.current.targetRecoil, 0.12 + (velocity * 0.18))

      lastSampleRef.current = {
        x: nextX,
        y: nextY,
        time: now,
      }
    }

    const handlePointerEnter = () => {
      interaction.current.hovered = true
      interaction.current.targetEnergy = Math.max(interaction.current.targetEnergy, 0.24)
      interaction.current.targetRecoil = Math.max(interaction.current.targetRecoil, 0.1)
    }

    const handlePointerDown = () => {
      const pressVector = new THREE.Vector3(
        interaction.current.x * 0.74,
        interaction.current.y * 0.74,
        1
      ).normalize()
      const up = Math.abs(pressVector.y) > 0.92
        ? new THREE.Vector3(1, 0, 0)
        : new THREE.Vector3(0, 1, 0)
      const tangentA = new THREE.Vector3().crossVectors(pressVector, up).normalize()
      const tangentB = new THREE.Vector3().crossVectors(pressVector, tangentA).normalize()
      const bend = Math.sign(interaction.current.x || 1)
      const escapeVector = pressVector
        .clone()
        .multiplyScalar(-0.9)
        .add(tangentA.multiplyScalar(0.48 * bend))
        .add(tangentB.multiplyScalar(-0.22))
        .normalize()

      interaction.current.hovered = true
      interaction.current.pressX = pressVector.x
      interaction.current.pressY = pressVector.y
      interaction.current.pressZ = pressVector.z
      interaction.current.escapeX = escapeVector.x
      interaction.current.escapeY = escapeVector.y
      interaction.current.escapeZ = escapeVector.z
      interaction.current.targetPress = 1.22
      interaction.current.targetEnergy = Math.max(interaction.current.targetEnergy, 0.74)
      interaction.current.targetRecoil = Math.max(interaction.current.targetRecoil, 1.1)
    }

    const handlePointerUp = () => {
      interaction.current.targetPress = 0.24
      interaction.current.targetEnergy = Math.max(interaction.current.targetEnergy, 0.34)
      interaction.current.targetRecoil = Math.max(interaction.current.targetRecoil, 0.82)
    }

    const handlePointerLeave = () => {
      interaction.current.hovered = false
      interaction.current.targetEnergy = 0
      interaction.current.targetPress = 0
      interaction.current.targetRecoil = Math.max(interaction.current.targetRecoil, 0.16)
    }

    element.addEventListener('pointermove', handlePointerMove)
    element.addEventListener('pointerenter', handlePointerEnter)
    element.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    element.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      clearTimeout(timer)
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('pointerenter', handlePointerEnter)
      element.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      element.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="spectral-orb"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 1.1s ease' }}
    >
      {visible && (
        <Canvas
          camera={{ position: [0, 0, 4.1], fov: 36 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.42} />
          <directionalLight position={[3.6, 4.2, 5]} intensity={0.72} />
          <pointLight position={[2.2, 1.8, 3.8]} intensity={13.6} distance={10} color="#ffffff" />
          <pointLight position={[-2.4, -1.6, 2.8]} intensity={5.8} distance={9} color="#d5deeb" />
          <pointLight position={[0.1, -2.1, 3]} intensity={3.8} distance={8} color="#f5f9ff" />
          <MilkyBlackOrb interaction={interaction} />
        </Canvas>
      )}
    </div>
  )
}
