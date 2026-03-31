export const vertexShader = /* glsl */ `
uniform float uTime;
uniform vec3 uMagnetPos;
uniform float uMagnetStrength;
uniform float uSpikeSharpness;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

//
// 3D Simplex noise — Stefan Gustavson (webgl-noise)
//
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  // Permutations
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  // Gradients: 7x7 points over a square, mapped onto an octahedron
  float n_ = 0.142857142857; // 1.0/7.0
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// FBM — 4 octaves, frequency multiplier 2.2, amplitude decay 0.45
float fbm(vec3 p, float t) {
  float value = 0.0;
  float amplitude = 1.0;
  float frequency = 1.0;
  for (int i = 0; i < 4; i++) {
    value += amplitude * snoise(p * frequency + t);
    frequency *= 2.2;
    amplitude *= 0.45;
  }
  return value;
}

// Compute displacement for a given normal direction
float computeDisplacement(vec3 n, vec3 magnetDir, float magnetStrength, float spikeSharpness, float time) {
  // Idle breathing
  float breath = snoise(n * 2.0 + time * 0.15) * 0.003;

  // Magnetic facing mask
  float facingMask = smoothstep(-0.1, 0.6, dot(n, magnetDir));

  // Primary spikes — lower frequency for fewer, more distinct spikes
  float rawNoise = fbm(n * 2.8 + magnetDir * 1.8, time * 0.6);
  float remapped = rawNoise * 0.5 + 0.5; // remap to 0-1
  float spikes = pow(remapped, spikeSharpness);
  float spikeHeight = facingMask * magnetStrength * 0.35 * spikes;

  // Base pinch — stronger pull between spikes for defined valleys
  float pinch = facingMask * magnetStrength * (1.0 - spikes) * 0.1;

  // Detail spikes — secondary needles, track cursor like primary spikes
  float detailRaw = snoise(n * 8.0 + magnetDir * 2.4 + time * 0.3) * 0.5 + 0.5;
  float detailSpikes = pow(detailRaw, spikeSharpness * 1.8) * facingMask * magnetStrength * 0.08;

  // Combine
  float displacement = clamp(1.0 + breath + spikeHeight + detailSpikes - pinch, 0.82, 1.5);
  return displacement;
}

void main() {
  vec3 n = normalize(position); // icosahedron vertices on unit sphere: position == normal
  vec3 magnetDir = normalize(uMagnetPos);

  // Compute displacement for this vertex
  float displacement = computeDisplacement(n, magnetDir, uMagnetStrength, uSpikeSharpness, uTime);
  vDisplacement = displacement;

  // Displaced position
  vec3 pos = n * displacement;

  // Recompute normals via finite differences
  float eps = 0.005;

  // Find two tangent vectors
  vec3 up = abs(n.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 tangent1 = normalize(cross(n, up));
  vec3 tangent2 = normalize(cross(n, tangent1));

  // Sample displacement at offset positions
  vec3 n1 = normalize(n + tangent1 * eps);
  vec3 n2 = normalize(n + tangent2 * eps);

  float d1 = computeDisplacement(n1, magnetDir, uMagnetStrength, uSpikeSharpness, uTime);
  float d2 = computeDisplacement(n2, magnetDir, uMagnetStrength, uSpikeSharpness, uTime);

  vec3 pos1 = n1 * d1;
  vec3 pos2 = n2 * d2;

  // Cross product for displaced normal
  vec3 displacedNormal = normalize(cross(pos1 - pos, pos2 - pos));

  // Blend between smooth geometric normal and displaced normal
  // At idle (strength=0), use clean sphere normal for artifact-free surface
  vec3 geometricNormal = normalize(normalMatrix * n);
  vec3 computedNormal = normalize(normalMatrix * displacedNormal);
  float normalBlend = smoothstep(0.0, 0.15, uMagnetStrength);
  vNormal = normalize(mix(geometricNormal, computedNormal, normalBlend));

  // View-space position for fresnel
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewPosition = mvPosition.xyz;

  gl_Position = projectionMatrix * mvPosition;
}
`;
