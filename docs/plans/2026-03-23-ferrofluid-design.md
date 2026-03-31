# Ferrofluid Redesign — Design Document

*2026-03-23*

## Summary

Replace the current SpectralOrb (CPU-displaced simplex noise sphere with milky material) with a physically convincing ferrofluid simulation using custom GLSL shaders. The ferrofluid lives in the hero section, responds only to direct cursor interaction over the orb, and progresses from calm liquid mercury at rest to full spike eruption on click.

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Placement | Hero section (unchanged) | Centerpiece visual next to copy |
| Idle state | Calm reflective sphere | Spikes only on interaction — creates discovery moment |
| Interaction model | Progressive (hover → sustained → click) | Builds tension; click payoff hits harder |
| Material | True ferrofluid black chrome | Near-black base, white/grey reflections only. Physically accurate |
| Interaction scope | Orb-only | Cursor must be over the orb. Feels like a physical object |
| Technical approach | Full custom GLSL shader (Approach A) | Maximum control over spike geometry + reflections. GPU-only. No onBeforeCompile fragility |
| OrbitalRings | Drop | Ferrofluid is visually strong enough alone; rings would clutter |

## Geometry & Vertex Shader

**Base mesh:** `IcosahedronGeometry(1, 128)` — ~160K tris, evenly distributed vertices (no polar clustering like SphereGeometry).

**Spike displacement algorithm:**
- Multiple octaves of 3D simplex noise sampled along vertex normal
- `pow(noise, exponent)` for sharp needle-like peaks
- `uMagnetPos` (vec3) — cursor position in world space via raycast
- Spike height scales with `dot(vertexNormal, magnetDirection)` — cursor-facing hemisphere spikes, opposite stays calm
- `uMagnetStrength` drives intensity: 0 (idle) to 1.0 (click)

**Idle:** Near-perfect sphere with barely perceptible surface ripple.

**Progression:**
1. Hover entry → strength 0.3, soft spikes emerge (~8-12 visible)
2. Sustained hover (~400ms) → strength 0.5, denser spike field
3. Click → strength 1.0, full eruption with base pinch effect
4. Release → damped sine recoil: `strength * exp(-t * 4.0) * cos(t * 12.0)`
5. Leave → smooth decay to idle

## Fragment Shader (Material)

**Base color:** `vec3(0.02, 0.02, 0.025)` — near-black.

**Reflections:** Matcap texture (512x512 studio-lighting PNG, ~30KB). Reflection lookup keyed to surface normal — steep spike normals catch bright highlights, valleys go dark.

**Fresnel:** `pow(1.0 - dot(viewDir, normal), 3.0)` — edges and spike tips get brighter reflections.

**Spike shading:**
- Tips: brighter specular
- Valleys: darker, subtle ambient occlusion
- No color — monochrome light/dark only

## Interaction Model

**Cursor mapping:** Raycast from camera through cursor onto invisible plane behind orb → proper vec3 world-space position. `uMagnetPos` lerps at ~0.08 factor for organic lag.

**Uniforms updated per frame (JS side):**

| Uniform | Type | Purpose |
|---|---|---|
| `uTime` | float | Animation time |
| `uMagnetPos` | vec3 | Cursor world position |
| `uMagnetStrength` | float | 0-1 interaction intensity |
| `uSpikeSharpness` | float | Noise exponent (2-10) |

**State transitions:**

| State | Strength | Sharpness | Noise Speed | Trigger |
|---|---|---|---|---|
| Idle | 0.0 | 2.0 | 0.15 | Default |
| Hover entry | 0.3 | 4.0 | 0.4 | pointerenter |
| Hover sustained | 0.5 | 6.0 | 0.5 | ~400ms hover |
| Click | 1.0 | 10.0 | 0.8 | pointerdown |
| Release recoil | 0.6 -> 0.0 | 8.0 -> 2.0 | 1.2 -> 0.15 | pointerup |
| Leave | 0.0 | 2.0 | 0.15 | pointerleave |

## Performance

- **GPU-only:** JS updates 4 uniforms per frame. No CPU vertex work.
- **Mobile:** Reduce subdivisions to 64 (~40K tris). Shader runs identically.
- **Matcap:** Single static PNG, loaded once.
- **Float wrapper:** drei `<Float>` kept for ambient bob.

## File Structure

| File | Purpose |
|---|---|
| `components/Ferrofluid.tsx` | Canvas, interaction handlers, uniform management. Replaces SpectralOrb. |
| `shaders/ferrofluid.vert` | Vertex displacement — noise + spike math |
| `shaders/ferrofluid.frag` | Matcap reflections, fresnel, AO |
| `public/textures/matcap-chrome.png` | 512x512 matcap texture |

## Integration

- `Hero.tsx`: swap `SpectralOrb` dynamic import to `Ferrofluid`
- `SpectralOrb.tsx`: keep in repo but unused (can remove later)
- `OrbitalRings.tsx`: drop (remove from Hero if referenced)
- No changes to other components or CSS layout
