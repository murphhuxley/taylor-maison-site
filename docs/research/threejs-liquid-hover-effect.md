# Three.js Liquid Hover Effect — Design Research

*Source: @Star_Knight12 original (1.7K❤️, 146K👁, 28 days ago), reshared by @AliGrids (349❤️, 20.6K👁). March 15, 2026.*

---

## What This Is

@Star_Knight12 (Prasenjit) built an interactive liquid/ripple hover effect using Three.js. When you hover over elements on the page, the background distorts like you're touching the surface of water. The effect is GPU-accelerated and runs in real-time.

AliGrids reshared it with "Three.js experiments like this are always fun to see" — 20K+ views.

## The Technique

**Stack:** Three.js (likely with React Three Fiber / r3f for React integration)

**How it works:**
1. **GPU ping-pong rendering** — Two WebGLRenderTargets alternate frames with a wave-equation fragment shader
2. **The page content is rendered as a texture** on a Three.js plane
3. **Mouse/hover position feeds into the shader** as a distortion point
4. **The wave equation propagates** the ripple outward from the touch point, creating fluid dynamics
5. **The distortion decays over time**, creating the "liquid settling" effect

**Key technical note** (from @0xNotthatsundar in the thread): "CPU canvas for the sim hits a wall on retina because of readback cost" — this needs to be fully GPU-side for performance. No CPU readback.

**Reference implementations:**
- [Codrops — Water-like Distortion Effect with Three.js](https://tympanus.net/codrops/2019/10/08/creating-a-water-like-distortion-effect-with-three-js/) — postprocessing approach
- [Olivier Larose — Ripple Shader with React Three Fiber + Next.js](https://blog.olivierlarose.com/tutorials/ripple-shader) — React/Next.js compatible
- [YouTube — Fluid Simulation with Three.js + Shaders](https://www.youtube.com/watch?v=DncmUVn1Yfg) — Dec 2024 tutorial
- Inspired by: [homunculus.jp](https://homunculus.jp/) and Yuri Artiukh's shader work

## Relevance to Taylor Maison Creative

### Why This Matters

This is the kind of effect that separates a $5K website from a $15K website. It's:
- **Technically impressive** — requires WebGL/shader knowledge most agencies don't have
- **Viscerally engaging** — users literally feel the page respond to their touch
- **Rare in production** — most sites don't have this because it's hard to implement well
- **Compatible with our stack** — Three.js works alongside Next.js + GSAP

### How to Implement

**For Taylor Maison site (eat own dog food):**
1. Use React Three Fiber (`@react-three/fiber`) — fits our Next.js stack
2. Render page sections as textures on a Three.js plane
3. Track mouse position and feed into a ripple distortion shader
4. Use GPU ping-pong (two render targets) for the wave simulation
5. Apply as a full-page background effect or section-specific hover effect

**Performance considerations:**
- Must be GPU-only (no CPU readback for retina displays)
- Need fallback for mobile / low-end devices (disable effect, show static)
- Three.js adds ~150KB to bundle — worth it for hero sections, not for every page

### Competitive Position

| | Framer | Standard Web Agency | Taylor Maison |
|---|---|---|---|
| Liquid hover effects | ❌ Not possible | ❌ Too technically complex | ✅ Three.js + shaders |
| Page transitions | ✅ Built-in presets | ✅ Basic CSS | ✅ Custom GSAP |
| 3D elements | ❌ Limited | ❌ Usually not offered | ✅ Three.js native |
| Performance optimization | ❌ Platform-dependent | ⚠️ Varies | ✅ Full control |

This is our differentiator from Framer. Framer can do smooth page transitions (see framer-page-transitions.md), but it **cannot** do custom WebGL shaders. This is the "wow" factor that justifies Premium tier pricing.

## Action Items

- [ ] Build a proof-of-concept liquid hover effect using React Three Fiber
- [ ] Test performance on mobile (iOS Safari, Android Chrome)
- [ ] Create a reusable `<LiquidHover>` component for the component library
- [ ] Add to Taylor Maison site hero section as a showpiece
- [ ] Research Yuri Artiukh's shader techniques for more effects
- [ ] Follow @Star_Knight12 for Three.js inspiration

---

*Compiled by Murph Huxley, March 15, 2026*
