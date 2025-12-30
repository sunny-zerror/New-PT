import { useEffect, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./BulgeImageShader";

export default function BulgeImageThree({ imageUrl }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.innerWidth < 768) return;

    /* ---------------- SCENE ---------------- */
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance"
    });

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    // 🔑 SAME AS YOUR ORIGINAL PIPELINE
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    containerRef.current.appendChild(renderer.domElement);

    let mesh;
    let imageAspect = 1;
    let animating = false;

    /* ---------------- UNIFORMS ---------------- */
    const uniforms = {
      uTexture: { value: null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uStrength: { value: 0 },
      uTime: { value: 0 },
      uRippleOrigin: { value: new THREE.Vector2(0.5, 0.5) },
      uRippleStart: { value: -10 },
      uBrightness: { value: 1.0 }, // 🔑 ensure not 0
      uResolution: { value: new THREE.Vector2(1, 1) }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true
      // ❌ NO toneMapped
    });

    /* ---------------- SIZE / GEOMETRY ---------------- */
    const updateGeometry = () => {
      if (!mesh) return;

      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || w / imageAspect;

      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const viewH = 2 * Math.tan(vFov / 2) * camera.position.z;
      const viewW = viewH * camera.aspect;

      const planeW = viewW;
      const planeH = planeW / imageAspect;

      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(
        planeW,
        planeH,
        20,
        20
      );

      uniforms.uResolution.value.set(planeW, planeH);
    };

    window.addEventListener("resize", updateGeometry);

    /* ---------------- LOAD ---------------- */
    new THREE.TextureLoader().load(imageUrl, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      imageAspect = texture.image.width / texture.image.height;
      uniforms.uTexture.value = texture;

      mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, 20, 20),
        material
      );
      scene.add(mesh);

      updateGeometry();
      renderer.render(scene, camera);
    });

    /* ---------------- UV MOUSE (NO RAYCAST) ---------------- */
    const mouse = new THREE.Vector2(0.5, 0.5);
    const lastMouse = new THREE.Vector2(0.5, 0.5);
    let targetStrength = 0;

    const onMouseMove = (e) => {
      if (!mesh) return;

      const rect = renderer.domElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;

      const dx = x - lastMouse.x;
      const dy = y - lastMouse.y;

      targetStrength = THREE.MathUtils.clamp(
        Math.sqrt(dx * dx + dy * dy) * 20,
        0,
        1.5
      );

      mouse.set(x, y);
      lastMouse.set(x, y);

      uniforms.uRippleOrigin.value.copy(mouse);
      uniforms.uRippleStart.value = uniforms.uTime.value;

      startAnimation();
    };

    renderer.domElement.addEventListener("mousemove", onMouseMove);

    /* ---------------- ANIMATION ---------------- */
    const clock = new THREE.Clock();

    const animate = () => {
      if (!animating) return;

      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uStrength.value = THREE.MathUtils.lerp(
        uniforms.uStrength.value,
        targetStrength,
        0.1
      );

      targetStrength = THREE.MathUtils.lerp(targetStrength, 0, 0.05);
      uniforms.uMouse.value.lerp(mouse, 0.1);

      renderer.render(scene, camera);

      if (uniforms.uStrength.value < 0.001) {
        animating = false;
        return;
      }

      requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animating) return;
      animating = true;
      clock.start();
      requestAnimationFrame(animate);
    };

    /* ---------------- CLEANUP ---------------- */
    return () => {
      window.removeEventListener("resize", updateGeometry);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);

      renderer.dispose();
      material.dispose();
      if (mesh) mesh.geometry.dispose();

      containerRef.current.innerHTML = "";
    };
  }, [imageUrl]);

  return <div ref={containerRef} style={{ width: "96%", height: "100%" }} />;
}
