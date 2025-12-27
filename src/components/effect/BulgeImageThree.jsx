import { useEffect, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from './BulgeImageShader';

export default function BulgeImageThree({ imageUrl }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    let mesh;
    let imageAspect = 1;

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

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true
    });

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
      style={{ width: "96%", height: "100%" }}
    />
  );
}
