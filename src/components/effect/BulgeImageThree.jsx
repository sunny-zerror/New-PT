"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ================= SHADERS ================= */

const vertexShader = `
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

const fragmentShader = `
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

/* ================= COMPONENT ================= */

export default function BulgeImageThree({ imageUrl }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    /* ---------- Scene ---------- */
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    /* ---------- Mesh placeholders ---------- */
    let mesh;
    let imageAspect = 1;

    /* ---------- Uniforms ---------- */
    const uniforms = {
      uTexture: { value: null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uStrength: { value: 0 },
      uTime: { value: 0 },
      uRippleOrigin: { value: new THREE.Vector2(0.5, 0.5) },
      uRippleStart: { value: -10 },
      uBrightness: { value: 1 },
      uResolution: { value: new THREE.Vector2(1, 1) }
    };

    /* ---------- Material ---------- */
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true
    });

    /* ---------- Size calculation ---------- */
    const getPlaneSize = () => {
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || w / imageAspect;

      renderer.setSize(w, h);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const distance = camera.position.z;
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const viewHeight = 2 * Math.tan(vFov / 2) * distance;
      const viewWidth = viewHeight * camera.aspect;

      const planeWidth = viewWidth;
      const planeHeight = planeWidth / imageAspect;

      return { planeWidth, planeHeight };
    };

    /* ---------- Load Texture ---------- */
    const loader = new THREE.TextureLoader();
    loader.load(imageUrl, (texture) => {
      texture.minFilter = THREE.LinearFilter;

      imageAspect = texture.image.width / texture.image.height;
      uniforms.uTexture.value = texture;

      const { planeWidth, planeHeight } = getPlaneSize();
      uniforms.uResolution.value.set(planeWidth, planeHeight);

      const geometry = new THREE.PlaneGeometry(
        planeWidth,
        planeHeight,
        32,
        32
      );

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    /* ---------- Resize ---------- */
    const resize = () => {
      if (!mesh) return;

      const { planeWidth, planeHeight } = getPlaneSize();

      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(
        planeWidth,
        planeHeight,
        32,
        32
      );

      uniforms.uResolution.value.set(planeWidth, planeHeight);
    };

    window.addEventListener("resize", resize);

    /* ---------- Mouse Interaction ---------- */
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const lastMouse = new THREE.Vector2(0.5, 0.5);
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    let targetStrength = 0;

    const onMouseMove = (e) => {
      if (!mesh) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObject(mesh)[0];

      if (hit) {
        const uv = hit.uv;

        const dx = uv.x - lastMouse.x;
        const dy = uv.y - lastMouse.y;
        const speed = Math.sqrt(dx * dx + dy * dy);

        targetStrength = THREE.MathUtils.clamp(speed * 20, 0, 1.5);

        lastMouse.copy(uv);
        targetMouse.copy(uv);

        uniforms.uRippleOrigin.value.copy(uv);
        uniforms.uRippleStart.value = uniforms.uTime.value;
      }
    };

    renderer.domElement.addEventListener("mousemove", onMouseMove);

    /* ---------- Animate ---------- */
    const clock = new THREE.Clock();

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();

      uniforms.uStrength.value = THREE.MathUtils.lerp(
        uniforms.uStrength.value,
        targetStrength,
        0.1
      );

      uniforms.uMouse.value.lerp(targetMouse, 0.1);
      targetStrength = THREE.MathUtils.lerp(targetStrength, 0, 0.05);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    /* ---------- Cleanup ---------- */
    return () => {
      window.removeEventListener("resize", resize);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      material.dispose();
      containerRef.current.innerHTML = "";
    };
  }, [imageUrl]);

  return (
    <div
      ref={containerRef}
      style={{ width: "94.8%", height: "100%" }}
    />
  );
}
