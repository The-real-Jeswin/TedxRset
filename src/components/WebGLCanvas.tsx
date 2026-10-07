import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface WebGLCanvasProps {
  currentScene: number;
  entropy: number; // 0 (perfect harmonic order) to 100 (turbulent chaos)
}

export const WebGLCanvas: React.FC<WebGLCanvasProps> = ({ currentScene, entropy }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneState = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    ringMesh: THREE.Points;
    ambientParticles: THREE.Points;
    torusParticles: THREE.Points;
    targetCamZ: number;
  } | null>(null);

  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060608, 0.012);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle texture
    const c = document.createElement('canvas');
    c.width = 32;
    c.height = 32;
    const ctx = c.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(255,30,39,0.8)');
      grad.addColorStop(0.7, 'rgba(226,201,138,0.25)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(c);

    // 1. Ambient Background Dust (1,800 particles)
    const AMBIENT_COUNT = 1800;
    const ambGeo = new THREE.BufferGeometry();
    const ambPos = new Float32Array(AMBIENT_COUNT * 3);
    const ambColors = new Float32Array(AMBIENT_COUNT * 3);

    const crimson = new THREE.Color(0xff1e27);
    const gold = new THREE.Color(0xe2c98a);

    for (let i = 0; i < AMBIENT_COUNT; i++) {
      const i3 = i * 3;
      ambPos[i3] = (Math.random() - 0.5) * 120;
      ambPos[i3 + 1] = (Math.random() - 0.5) * 80;
      ambPos[i3 + 2] = (Math.random() - 0.5) * 100 - 10;

      const col = Math.random() > 0.4 ? crimson : gold;
      ambColors[i3] = col.r;
      ambColors[i3 + 1] = col.g;
      ambColors[i3 + 2] = col.b;
    }

    ambGeo.setAttribute('position', new THREE.BufferAttribute(ambPos, 3));
    ambGeo.setAttribute('color', new THREE.BufferAttribute(ambColors, 3));

    const ambMat = new THREE.PointsMaterial({
      size: 0.9,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const ambientParticles = new THREE.Points(ambGeo, ambMat);
    scene.add(ambientParticles);

    // 2. Central Morphing Crimson Ring (The TED Red Portal Ring)
    const RING_COUNT = 1400;
    const ringGeo = new THREE.BufferGeometry();
    const ringPos = new Float32Array(RING_COUNT * 3);
    const ringColors = new Float32Array(RING_COUNT * 3);
    const ringAngles = new Float32Array(RING_COUNT);
    const ringRadii = new Float32Array(RING_COUNT);

    for (let i = 0; i < RING_COUNT; i++) {
      const i3 = i * 3;
      const angle = (i / RING_COUNT) * Math.PI * 2;
      const radius = 10 + (Math.random() - 0.5) * 1.8;
      ringAngles[i] = angle;
      ringRadii[i] = radius;

      ringPos[i3] = Math.cos(angle) * radius;
      ringPos[i3 + 1] = Math.sin(angle) * radius;
      ringPos[i3 + 2] = (Math.random() - 0.5) * 2.5;

      const col = Math.random() > 0.25 ? crimson : gold;
      ringColors[i3] = col.r;
      ringColors[i3 + 1] = col.g;
      ringColors[i3 + 2] = col.b;
    }

    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
    ringGeo.setAttribute('color', new THREE.BufferAttribute(ringColors, 3));

    const ringMat = new THREE.PointsMaterial({
      size: 1.5,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
      opacity: 0.85,
    });
    const ringMesh = new THREE.Points(ringGeo, ringMat);
    scene.add(ringMesh);

    // 3. Resonance Torus (Scene 03 Theme)
    const TORUS_COUNT = 2400;
    const torusGeo = new THREE.BufferGeometry();
    const torusPos = new Float32Array(TORUS_COUNT * 3);
    const torusColors = new Float32Array(TORUS_COUNT * 3);
    const torusBasePos = new Float32Array(TORUS_COUNT * 3);

    for (let i = 0; i < TORUS_COUNT; i++) {
      const i3 = i * 3;
      // Torus knot formula (p=2, q=3)
      const u = (i / TORUS_COUNT) * Math.PI * 8;
      const r = 8 + 3 * Math.cos(1.5 * u);
      const x = r * Math.cos(u);
      const y = r * Math.sin(u);
      const z = 4 * Math.sin(1.5 * u);

      torusBasePos[i3] = x;
      torusBasePos[i3 + 1] = y;
      torusBasePos[i3 + 2] = z;

      torusPos[i3] = x;
      torusPos[i3 + 1] = y;
      torusPos[i3 + 2] = z;

      const col = Math.random() > 0.5 ? crimson : gold;
      torusColors[i3] = col.r;
      torusColors[i3 + 1] = col.g;
      torusColors[i3 + 2] = col.b;
    }

    torusGeo.setAttribute('position', new THREE.BufferAttribute(torusPos, 3));
    torusGeo.setAttribute('color', new THREE.BufferAttribute(torusColors, 3));

    const torusMat = new THREE.PointsMaterial({
      size: 1.2,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
      opacity: 0,
    });
    const torusParticles = new THREE.Points(torusGeo, torusMat);
    scene.add(torusParticles);

    sceneState.current = {
      scene,
      camera,
      renderer,
      ringMesh,
      ambientParticles,
      torusParticles,
      targetCamZ: 32,
    };

    // Mouse tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      camera.position.x = mousePos.current.x * 2.5;
      camera.position.y = mousePos.current.y * 1.8;
      camera.lookAt(0, 0, 0);

      // Ring deformation & wave
      const ringPositions = ringGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < RING_COUNT; i++) {
        const i3 = i * 3;
        const angle = ringAngles[i] + elapsed * 0.15;
        const baseR = ringRadii[i];
        const wave = Math.sin(angle * 6 + elapsed * 2) * 0.6;
        const r = baseR + wave;

        ringPositions[i3] = Math.cos(angle) * r;
        ringPositions[i3 + 1] = Math.sin(angle) * r;
        ringPositions[i3 + 2] = Math.sin(angle * 4 + elapsed * 3) * 1.2;
      }
      ringGeo.attributes.position.needsUpdate = true;
      ringMesh.rotation.z = elapsed * 0.04;

      // Ambient particle slow drift
      ambientParticles.rotation.y = elapsed * 0.015;
      ambientParticles.rotation.x = Math.sin(elapsed * 0.01) * 0.05;

      // Torus rotation
      torusParticles.rotation.x = elapsed * 0.2;
      torusParticles.rotation.y = elapsed * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      ambGeo.dispose();
      ambMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
    };
  }, []);

  // Respond to Scene Changes with 3D Camera & Object choreographies
  useEffect(() => {
    if (!sceneState.current) return;
    const { camera, ringMesh, torusParticles } = sceneState.current;

    // Camera Z-positions per scene creating true spatial plunge
    // 0: Portal (Z: 32)
    // 1: Countdown (Z: 28, ring expands)
    // 2: Theme (Z: 24, torus appears)
    // 3: Speakers (Z: 34, pushed back for wide carousel)
    // 4: Schedule (Z: 29)
    // 5: Team & Tickets (Z: 26)
    const sceneZMap = [32, 28, 25, 34, 29, 26];
    const targetZ = sceneZMap[currentScene] ?? 32;

    gsap.to(camera.position, {
      z: targetZ,
      duration: 1.2,
      ease: 'power3.inOut',
    });

    // Ring scale & opacity modulation based on active scene
    if (currentScene === 0) {
      // Scene 0: Main vibrant ring
      gsap.to(ringMesh.scale, { x: 1, y: 1, z: 1, duration: 1 });
      gsap.to((ringMesh.material as THREE.PointsMaterial), { opacity: 0.85, duration: 0.8 });
      gsap.to((torusParticles.material as THREE.PointsMaterial), { opacity: 0, duration: 0.6 });
    } else if (currentScene === 1) {
      // Scene 1: Expanded orbital halo
      gsap.to(ringMesh.scale, { x: 1.6, y: 1.6, z: 1.2, duration: 1.2 });
      gsap.to((ringMesh.material as THREE.PointsMaterial), { opacity: 0.45, duration: 0.8 });
      gsap.to((torusParticles.material as THREE.PointsMaterial), { opacity: 0, duration: 0.6 });
    } else if (currentScene === 2) {
      // Scene 2: Resonance in chaos (torus lights up!)
      gsap.to(ringMesh.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 1 });
      gsap.to((ringMesh.material as THREE.PointsMaterial), { opacity: 0.15, duration: 0.8 });
      gsap.to((torusParticles.material as THREE.PointsMaterial), { opacity: 0.75, duration: 1 });
    } else {
      // Other scenes: subtle ambient background ring
      gsap.to(ringMesh.scale, { x: 1.2, y: 1.2, z: 0.8, duration: 1 });
      gsap.to((ringMesh.material as THREE.PointsMaterial), { opacity: 0.35, duration: 0.8 });
      gsap.to((torusParticles.material as THREE.PointsMaterial), { opacity: 0.1, duration: 0.6 });
    }
  }, [currentScene]);

  // Respond to user's interactive Entropy slider (Scene 03)
  useEffect(() => {
    if (!sceneState.current) return;
    const { torusParticles } = sceneState.current;
    const geo = torusParticles.geometry as THREE.BufferGeometry;
    if (!geo.attributes.position) return;

    const pos = geo.attributes.position.array as Float32Array;
    const count = pos.length / 3;

    // entropy: 0 = perfect harmony, 100 = full Brownian chaos
    const chaosFactor = (entropy / 100) * 12;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const u = (i / count) * Math.PI * 8;
      const r = 8 + 3 * Math.cos(1.5 * u);
      const bx = r * Math.cos(u);
      const by = r * Math.sin(u);
      const bz = 4 * Math.sin(1.5 * u);

      // Pseudo-random noise displacement proportional to chaos
      const noiseX = (Math.sin(i * 1.3) * Math.cos(i * 0.7)) * chaosFactor;
      const noiseY = (Math.cos(i * 1.1) * Math.sin(i * 1.4)) * chaosFactor;
      const noiseZ = (Math.sin(i * 0.9) * Math.cos(i * 2.1)) * chaosFactor;

      pos[i3] = bx + noiseX;
      pos[i3 + 1] = by + noiseY;
      pos[i3 + 2] = bz + noiseZ;
    }

    geo.attributes.position.needsUpdate = true;
  }, [entropy]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
