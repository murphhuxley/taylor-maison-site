# Ferrofluid Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace SpectralOrb with a physically convincing ferrofluid component using custom GLSL shaders — calm chrome sphere at rest, progressive spike eruption on interaction.

**Architecture:** Custom ShaderMaterial on an IcosahedronGeometry. Vertex shader handles spike displacement via layered simplex noise driven by cursor-derived uniforms. Fragment shader renders black chrome via matcap reflections + fresnel. React Three Fiber canvas with pointer event handlers managing uniform state transitions.

**Tech Stack:** React Three Fiber, drei (Float, useTexture), Three.js ShaderMaterial, GLSL, Next.js 16 dynamic import

---

### Task 1: Matcap Texture

**Files:**
- Create: `public/textures/matcap-chrome.png`

**Step 1: Download a dark chrome matcap texture**

Run:
```bash
cd ~/.openclaw/workspace/projects/taylor-maison-site
mkdir -p public/textures
curl -L "https://raw.githubusercontent.com/emmelleppi/matcaps/master/PAGE-0/0E0E0E_A9A9A9_5C5C5C_818181-512px.png" -o public/textures/matcap-chrome.png
```

Expected: A 512x512 dark chrome matcap PNG in `public/textures/`.

**Step 2: Verify the file**

Run: `file public/textures/matcap-chrome.png`
Expected: `PNG image data, 512 x 512`

**Step 3: Commit**

```bash
git add public/textures/matcap-chrome.png
git commit -m "feat: add dark chrome matcap texture for ferrofluid"
```

---

### Task 2: GLSL Shader Files

**Files:**
- Create: `shaders/ferrofluid.vert.ts`
- Create: `shaders/ferrofluid.frag.ts`

Note: We use `.ts` files exporting template literal strings rather than raw `.glsl` files. This avoids needing webpack/next.config changes for raw file imports and works natively with Next.js/Turbopack.

**Step 1: Create the vertex shader**

Create `shaders/ferrofluid.vert.ts`:

```typescript
export const vertexShader = /* glsl */ `
uniform float uTime;
uniform vec3 uMagnetPos;
uniform float uMagnetStrength;
uniform float uSpikeSharpness;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

//
// 3D Simplex noise (Stefan Gustavson)
//
vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float fbm(vec3 p, float time) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 4; i++) {
    value += amplitude * snoise(p * frequency + time * 0.15);
    frequency *= 2.2;
    amplitude *= 0.45;
  }
  return value;
}

void main() {
  vec3 pos = position;
  vec3 norm = normalize(normal);

  // Direction from orb center toward magnet (cursor)
  vec3 magnetDir = normalize(uMagnetPos);
  float facing = dot(norm, magnetDir);

  // ── Idle breathing ──
  float breath = snoise(norm * 2.0 + uTime * 0.15) * 0.008;

  // ── Magnetic spike field ──
  // facing > 0 = hemisphere toward cursor
  float facingMask = smoothstep(-0.1, 0.6, facing);

  // Noise for spike positions — high frequency for needle density
  float spikeNoise = fbm(norm * 3.5 + magnetDir * 2.0, uTime * 0.8);

  // Sharpen into spikes: pow() with dynamic exponent
  float spikes = pow(max(spikeNoise * 0.5 + 0.5, 0.0), uSpikeSharpness);

  // Scale spikes by facing (only toward cursor) and strength
  float spikeHeight = spikes * facingMask * uMagnetStrength * 0.45;

  // ── Pinch at spike bases ──
  // Vertices facing the cursor but NOT at spike peaks get pulled inward
  float pinch = facingMask * uMagnetStrength * (1.0 - spikes) * 0.06;

  // ── Secondary detail spikes ──
  float detail = snoise(norm * 12.0 + uTime * 0.4) * 0.5 + 0.5;
  float detailSpikes = pow(detail, uSpikeSharpness * 1.5) * facingMask * uMagnetStrength * 0.12;

  // ── Combine displacement ──
  float displacement = 1.0 + breath + spikeHeight + detailSpikes - pinch;
  displacement = clamp(displacement, 0.85, 1.6);

  pos = norm * displacement;

  // Recompute normal via finite differences
  // Offset samples for numerical normal
  float eps = 0.005;
  vec3 tangent1 = normalize(cross(norm, norm.yzx + vec3(0.1)));
  vec3 tangent2 = normalize(cross(norm, tangent1));

  vec3 normA = normalize(norm + tangent1 * eps);
  vec3 normB = normalize(norm + tangent2 * eps);

  float dispA = 1.0 + snoise(normA * 2.0 + uTime * 0.15) * 0.008
    + pow(max(fbm(normA * 3.5 + magnetDir * 2.0, uTime * 0.8) * 0.5 + 0.5, 0.0), uSpikeSharpness)
      * smoothstep(-0.1, 0.6, dot(normA, magnetDir)) * uMagnetStrength * 0.45
    + pow(snoise(normA * 12.0 + uTime * 0.4) * 0.5 + 0.5, uSpikeSharpness * 1.5)
      * smoothstep(-0.1, 0.6, dot(normA, magnetDir)) * uMagnetStrength * 0.12
    - smoothstep(-0.1, 0.6, dot(normA, magnetDir)) * uMagnetStrength
      * (1.0 - pow(max(fbm(normA * 3.5 + magnetDir * 2.0, uTime * 0.8) * 0.5 + 0.5, 0.0), uSpikeSharpness)) * 0.06;

  float dispB = 1.0 + snoise(normB * 2.0 + uTime * 0.15) * 0.008
    + pow(max(fbm(normB * 3.5 + magnetDir * 2.0, uTime * 0.8) * 0.5 + 0.5, 0.0), uSpikeSharpness)
      * smoothstep(-0.1, 0.6, dot(normB, magnetDir)) * uMagnetStrength * 0.45
    + pow(snoise(normB * 12.0 + uTime * 0.4) * 0.5 + 0.5, uSpikeSharpness * 1.5)
      * smoothstep(-0.1, 0.6, dot(normB, magnetDir)) * uMagnetStrength * 0.12
    - smoothstep(-0.1, 0.6, dot(normB, magnetDir)) * uMagnetStrength
      * (1.0 - pow(max(fbm(normB * 3.5 + magnetDir * 2.0, uTime * 0.8) * 0.5 + 0.5, 0.0), uSpikeSharpness)) * 0.06;

  vec3 posA = normA * clamp(dispA, 0.85, 1.6);
  vec3 posB = normB * clamp(dispB, 0.85, 1.6);

  vec3 computedNormal = normalize(cross(posA - pos, posB - pos));

  vNormal = normalize(normalMatrix * computedNormal);
  vViewPosition = -(modelViewMatrix * vec4(pos, 1.0)).xyz;
  vDisplacement = displacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`
```

**Step 2: Create the fragment shader**

Create `shaders/ferrofluid.frag.ts`:

```typescript
export const fragmentShader = /* glsl */ `
uniform sampler2D uMatcap;
uniform float uMagnetStrength;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 normal = normalize(vNormal);

  // ── Matcap UV lookup ──
  // Transform normal to view space for matcap sampling
  vec3 viewNormal = normalize(normal);
  vec2 matcapUV = viewNormal.xy * 0.5 + 0.5;

  vec3 matcapColor = texture2D(uMatcap, matcapUV).rgb;

  // ── Base color: near-black ──
  vec3 baseColor = vec3(0.02, 0.02, 0.025);

  // ── Fresnel: edges and spike tips catch more light ──
  float fresnel = pow(1.0 - abs(dot(viewDir, normal)), 3.0);

  // ── Spike tip brightness ──
  // Higher displacement = spike tip = brighter specular
  float tipBrightness = smoothstep(1.1, 1.45, vDisplacement) * uMagnetStrength;

  // ── Valley darkening (ambient occlusion) ──
  float valleyDark = smoothstep(1.0, 0.88, vDisplacement) * uMagnetStrength * 0.3;

  // ── Compose final color ──
  // Matcap provides the reflection shape, modulated by fresnel
  vec3 reflection = matcapColor * (0.6 + fresnel * 1.4);

  // Mix base black with reflections
  vec3 color = baseColor + reflection * (0.25 + fresnel * 0.5 + tipBrightness * 0.4);

  // Darken valleys
  color *= (1.0 - valleyDark);

  // Subtle overall fresnel rim
  color += vec3(0.08, 0.08, 0.1) * fresnel * 0.5;

  gl_FragColor = vec4(color, 1.0);
}
`
```

**Step 3: Verify files created**

Run: `ls -la ~/.openclaw/workspace/projects/taylor-maison-site/shaders/`
Expected: `ferrofluid.vert.ts` and `ferrofluid.frag.ts`

**Step 4: Commit**

```bash
git add shaders/
git commit -m "feat: add GLSL vertex and fragment shaders for ferrofluid"
```

---

### Task 3: Ferrofluid React Component

**Files:**
- Create: `components/Ferrofluid.tsx`

**Step 1: Create the Ferrofluid component**

Create `components/Ferrofluid.tsx`:

```tsx
'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, useTexture } from '@react-three/drei'
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
}

function FerrofluidMesh({ state }: { state: React.RefObject<FerroState> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matcap = useTexture('/textures/matcap-chrome.png')

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const detail = isMobile ? 64 : 128

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMagnetPos: { value: new THREE.Vector3(0, 0, 1) },
    uMagnetStrength: { value: 0 },
    uSpikeSharpness: { value: 2.0 },
    uMatcap: { value: matcap },
  }), [matcap])

  useFrame((_, delta) => {
    const s = state.current
    if (!s) return

    const now = performance.now() / 1000

    // ── State transitions ──
    if (s.pressed) {
      s.targetStrength = 1.0
      s.targetSharpness = 10.0
    } else if (s.hovered) {
      const hoverDuration = now - s.hoverStart
      if (hoverDuration > 0.4) {
        s.targetStrength = 0.5
        s.targetSharpness = 6.0
      } else {
        s.targetStrength = 0.3
        s.targetSharpness = 4.0
      }
    } else {
      s.targetStrength = 0.0
      s.targetSharpness = 2.0
    }

    // ── Recoil overshoot ──
    if (s.recoilActive) {
      const rt = now - s.recoilTime
      const recoilWobble = 0.15 * Math.exp(-rt * 4.0) * Math.cos(rt * 12.0)
      s.magnetStrength = THREE.MathUtils.lerp(s.magnetStrength, s.targetStrength, 0.08) + recoilWobble
      if (rt > 1.5) s.recoilActive = false
    } else {
      s.magnetStrength = THREE.MathUtils.lerp(s.magnetStrength, s.targetStrength, 0.08)
    }

    s.spikeSharpness = THREE.MathUtils.lerp(s.spikeSharpness, s.targetSharpness, 0.06)
    s.magnetPos.lerp(s.targetMagnetPos, 0.08)

    // ── Update uniforms ──
    uniforms.uTime.value += delta
    uniforms.uMagnetPos.value.copy(s.magnetPos)
    uniforms.uMagnetStrength.value = Math.max(0, s.magnetStrength)
    uniforms.uSpikeSharpness.value = s.spikeSharpness
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
  })

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 250)
    return () => clearTimeout(timer)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    // Map 2D cursor to 3D position on a sphere around the orb
    state.current.targetMagnetPos.set(x * 1.5, y * 1.5, 1).normalize().multiplyScalar(2)
  }, [])

  const handlePointerEnter = useCallback(() => {
    state.current.hovered = true
    state.current.hoverStart = performance.now() / 1000
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
      state.current.recoilTime = performance.now() / 1000
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
          camera={{ position: [0, 0, 4.1], fov: 36 }}
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
```

**Step 2: Verify file created**

Run: `ls -la ~/.openclaw/workspace/projects/taylor-maison-site/components/Ferrofluid.tsx`
Expected: File exists

**Step 3: Commit**

```bash
git add components/Ferrofluid.tsx
git commit -m "feat: add Ferrofluid component with custom GLSL shader material"
```

---

### Task 4: Wire Into Hero

**Files:**
- Modify: `components/Hero.tsx:7` (dynamic import)
- Modify: `components/Hero.tsx:97-99` (visual section)

**Step 1: Update Hero.tsx**

Change line 7 from:
```tsx
const SpectralOrb = dynamic(() => import('./SpectralOrb'), { ssr: false })
```
to:
```tsx
const Ferrofluid = dynamic(() => import('./Ferrofluid'), { ssr: false })
```

Change lines 97-99 from:
```tsx
<div className="hero__visual">
  <SpectralOrb />
</div>
```
to:
```tsx
<div className="hero__visual">
  <Ferrofluid />
</div>
```

Remove the OrbitalRings visual layer if present (check for `hero__visual-layer--rings` or `OrbitalRings` import).

**Step 2: Verify dev server renders**

Run: Open `http://localhost:3335` in browser. The hero should show the ferrofluid orb. Check browser console for shader compilation errors.

**Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: swap SpectralOrb for Ferrofluid in hero section"
```

---

### Task 5: Visual Tuning Pass

This task is hands-on with the browser. No predetermined code — it's about iterating on the shader values until the ferrofluid looks right.

**Tuning checklist:**
- [ ] Idle state: smooth chrome sphere with barely visible breathing
- [ ] Matcap reflections: bright highlights on edges, dark body
- [ ] Hover entry: spikes emerge within ~300ms, needle-like (not blobby)
- [ ] Sustained hover: denser spike field, 8-12 visible spikes
- [ ] Click: full eruption, pinch at bases, tall sharp peaks
- [ ] Release: recoil wobble, smooth settle back to sphere
- [ ] Leave: clean decay, no popping
- [ ] Spike sharpness: needles, not smooth bumps (may need higher exponent)
- [ ] Reflection contrast: spikes should be high-contrast (bright tips, dark valleys)
- [ ] Float bob: subtle, doesn't fight interaction

**Likely adjustments:**
- `uSpikeSharpness` exponent range
- Noise frequency/octaves in vertex shader
- Matcap mix intensity in fragment shader
- Fresnel exponent
- Lerp speeds for state transitions
- Displacement clamp range
- Geometry subdivision level (if spikes look faceted)

**Step 1: Tune and iterate**

Adjust shader values and component uniforms until the above checklist passes visual inspection.

**Step 2: Commit**

```bash
git add shaders/ components/Ferrofluid.tsx
git commit -m "fix: tune ferrofluid shader values for realistic appearance"
```

---

### Task 6: CSS Cleanup

**Files:**
- Modify: `app/globals.css:451-506` (hero visual styles)

**Step 1: Update CSS**

- Remove `.hero__visual-layer`, `.hero__visual-layer--rings`, `.hero__visual-layer--orb` rules (no longer needed without OrbitalRings layer structure)
- Keep `.spectral-orb` class name and its rules (Ferrofluid reuses it)
- Consider removing the `filter: saturate(0.82) contrast(1.08) brightness(0.97)` on `.spectral-orb` — the custom shader handles its own look. Test with and without.

**Step 2: Verify layout unchanged**

The hero visual area should be identical in size/position. Only the content changed.

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "chore: clean up hero visual CSS for ferrofluid (remove ring layers)"
```
