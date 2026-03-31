export const fragmentShader = /* glsl */ `
uniform float uMagnetStrength;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

// Analytical studio environment — simulates reflection strips on chrome
vec3 studioEnv(vec3 rd) {
  float y = rd.y;

  // Base: near-black with slight cool tone
  vec3 env = vec3(0.012, 0.013, 0.018);

  // Primary light strip — broad horizontal band across top
  float strip1 = smoothstep(0.35, 0.65, y) * smoothstep(0.9, 0.7, y);
  env += vec3(0.45, 0.47, 0.52) * strip1;

  // Hot crown — tight top highlight
  float crown = pow(max(0.0, y), 24.0);
  env += vec3(0.8, 0.82, 0.88) * crown;

  // Right key strip — angled
  float rKey = pow(max(0.0, dot(rd, normalize(vec3(0.7, 0.35, 0.5)))), 20.0);
  env += vec3(0.35, 0.36, 0.4) * rKey;

  // Left fill strip — softer
  float lFill = pow(max(0.0, dot(rd, normalize(vec3(-0.6, 0.45, 0.35)))), 14.0);
  env += vec3(0.18, 0.19, 0.22) * lFill;

  // Subtle warm ground bounce
  float ground = smoothstep(0.0, -0.5, y);
  env += vec3(0.04, 0.035, 0.03) * ground;

  return env;
}

void main() {
  vec3 viewNormal = normalize(vNormal);
  vec3 viewDir = normalize(-vViewPosition);

  // Reflection vector for environment sampling
  vec3 reflectDir = reflect(-viewDir, viewNormal);

  // Sample studio environment
  vec3 envColor = studioEnv(reflectDir);

  // Schlick fresnel — metallic (chrome-like)
  float cosTheta = max(0.0, dot(viewDir, viewNormal));
  float F0 = 0.55;
  float fresnel = F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);

  // Base color — deep black
  vec3 baseColor = vec3(0.005, 0.005, 0.008);

  // Sharp specular highlights
  float keyDot = max(0.0, dot(viewNormal, normalize(vec3(0.5, 0.8, 0.3))));
  float keySpec = pow(keyDot, 40.0) * 1.4;

  float key2Dot = max(0.0, dot(viewNormal, normalize(vec3(-0.6, 0.4, 0.4))));
  float key2Spec = pow(key2Dot, 28.0) * 0.5;

  float topDot = max(0.0, dot(viewNormal, normalize(vec3(0.0, 1.0, 0.15))));
  float topSpec = pow(topDot, 56.0) * 1.8;

  vec3 specular = vec3(keySpec + key2Spec + topSpec);

  // Spike tip brightness — catches light
  float tipBrightness = smoothstep(1.08, 1.4, vDisplacement) * uMagnetStrength;

  // Valley darkening (AO)
  float valleyDarken = smoothstep(1.0, 0.88, vDisplacement) * uMagnetStrength * 0.6;

  // Compose — environment reflections dominate via fresnel
  vec3 color = mix(baseColor, envColor, fresnel);
  color += specular * 0.25;
  color += vec3(tipBrightness * 0.3);
  color *= (1.0 - valleyDarken);

  gl_FragColor = vec4(color, 1.0);
}
`;
