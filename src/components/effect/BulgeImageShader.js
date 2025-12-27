export const vertexShader = `
varying vec2 vUv;

uniform vec2 uMouse;
uniform float uStrength;
uniform float uTime;
uniform vec2 uRippleOrigin;
uniform float uRippleStart;
uniform vec2 uResolution;

void main() {
  vUv = uv;

  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 dir = (uv - uMouse) * aspect;
  float dist = length(dir);

  vec3 displaced = position;

  if (uStrength > 0.001) {
    float bulge = smoothstep(0.4, 0.0, dist) * uStrength;
    displaced += normalize(vec3(dir, 0.0)) * bulge * 0.2;
  }

  float rippleAge = uTime - uRippleStart;
  if (rippleAge > 0.0 && rippleAge < 1.5) {
    float rippleRadius = rippleAge * 0.4;
    float d = length((uv - uRippleOrigin) * aspect);
    float wave = sin(35.0 * (d - rippleRadius)) * 0.02;
    float fade = 1.0 - smoothstep(0.0, 1.5, rippleAge);
    float mask = smoothstep(rippleRadius + 0.1, rippleRadius, d);
    displaced.z += wave * mask * fade;
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

export const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uStrength;
uniform float uTime;
uniform vec2 uRippleOrigin;
uniform float uRippleStart;
uniform float uBrightness;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 dir = (vUv - uMouse) * aspect;
  float dist = length(dir);

  vec2 distorted = vUv;

  if (uStrength > 0.001) {
    float bulge = smoothstep(0.4, 0.0, dist) * uStrength;
    distorted -= normalize(dir) * bulge * 0.05 / aspect;
  }

  float rippleAge = uTime - uRippleStart;
  if (rippleAge > 0.0 && rippleAge < 1.0) {
    float rippleRadius = rippleAge * 0.4;
    float d = length((vUv - uRippleOrigin) * aspect);
    float wave = sin(35.0 * (d - rippleRadius)) * 0.02;
    float fade = 1.0 - smoothstep(0.0, 1.0, rippleAge);
    float mask = smoothstep(rippleRadius + 0.1, rippleRadius, d);
    distorted += normalize(dir) * wave * mask * fade / aspect;
  }

  vec4 color = texture2D(uTexture, distorted);
  if (color.a < 0.01) discard;

  color.rgb *= uBrightness;
  gl_FragColor = color;
}
`;