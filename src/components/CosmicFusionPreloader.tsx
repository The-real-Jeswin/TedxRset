import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface CosmicFusionPreloaderProps {
  onComplete: () => void;
}

export const CosmicFusionPreloader: React.FC<CosmicFusionPreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flashOverlayRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('CALIBRATING GRAVITATIONAL SINGULARITY');
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Three.js Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060608, 0.015);

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle texture generator (luminous soft-edge circle)
    const createParticleTexture = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.25, 'rgba(255,220,180,0.85)');
        grad.addColorStop(0.6, 'rgba(255,40,50,0.4)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(c);
    };

    const particleTexture = createParticleTexture();

    // 1. Swirling Particles
    const PARTICLE_COUNT = 3200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const initialPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const particleSpeeds = new Float32Array(PARTICLE_COUNT);
    const particleRadii = new Float32Array(PARTICLE_COUNT);
    const angles = new Float32Array(PARTICLE_COUNT);

    const crimsonColor = new THREE.Color(0xff1e27);
    const goldColor = new THREE.Color(0xe2c98a);
    const whiteHot = new THREE.Color(0xffffff);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Spherical distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 55 + 5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      initialPositions[i3] = x;
      initialPositions[i3 + 1] = y;
      initialPositions[i3 + 2] = z;

      particleRadii[i] = Math.sqrt(x * x + y * y + z * z);
      angles[i] = Math.atan2(y, x);
      particleSpeeds[i] = 0.5 + Math.random() * 1.5;

      // Color variation: 65% Crimson, 30% Gold, 5% White hot core
      const pick = Math.random();
      const c = pick > 0.35 ? crimsonColor : pick > 0.08 ? goldColor : whiteHot;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.6,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 2. Central Glowing Plasma Sphere (Miniature Crimson Sun)
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Core sphere
    const coreGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff1e27,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sphereGroup.add(coreMesh);

    // Corona halo sphere
    const haloGeo = new THREE.SphereGeometry(3.8, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xe2c98a,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      wireframe: true,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    sphereGroup.add(haloMesh);

    // Shockwave ring
    const ringGeo = new THREE.RingGeometry(0.1, 0.4, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff3b43,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const shockwaveRing = new THREE.Mesh(ringGeo, ringMat);
    shockwaveRing.rotation.x = Math.PI / 2;
    scene.add(shockwaveRing);

    // Ambient point light
    const pointLight = new THREE.PointLight(0xff1e27, 0, 100);
    scene.add(pointLight);

    // Timeline control states
    const state = {
      convergence: 0, // 0 = chaotic, 1 = fully collapsed in core
      burst: 0,       // 0 = none, 1 = exploding
      spinSpeed: 0.005,
      corePulse: 1,
      camZ: 45,
    };

    // GSAP Sequence
    const tl = gsap.timeline({
      onComplete: () => {
        // Camera plunge forward through the void
        gsap.to(camera.position, {
          z: -45,
          duration: 0.9,
          ease: 'power4.in',
        });

        // Blinding flash burst
        if (flashOverlayRef.current) {
          gsap.timeline()
            .to(flashOverlayRef.current, {
              opacity: 1,
              duration: 0.25,
              ease: 'power2.in',
            })
            .to(flashOverlayRef.current, {
              opacity: 0,
              duration: 0.65,
              ease: 'power3.out',
              onComplete: () => {
                onComplete();
              },
            });
        } else {
          onComplete();
        }
      },
    });

    // Step 1: Initial chaos + begin convergence
    tl.to(state, {
      convergence: 0.5,
      spinSpeed: 0.03,
      duration: 1.2,
      ease: 'power1.inOut',
      onUpdate: () => {
        const val = Math.floor(state.convergence * 60);
        setProgress(val);
        setStatusText('CAPTURING ENTROPIC BITS');
      },
    });

    // Step 2: High gravity vortex collapse & ignition
    tl.to(state, {
      convergence: 1,
      spinSpeed: 0.08,
      duration: 1.3,
      ease: 'power2.in',
      onUpdate: () => {
        const val = 60 + Math.floor((state.convergence - 0.5) * 70);
        setProgress(Math.min(96, val));
        setStatusText('FUSING PLASMA CORE // CRITICAL DENSITY');
        coreMat.opacity = state.convergence * 0.95;
        haloMat.opacity = state.convergence * 0.45;
        pointLight.intensity = state.convergence * 6;
      },
    });

    // Step 3: Peak super-compression and burst trigger
    tl.to(sphereGroup.scale, {
      x: 2.4,
      y: 2.4,
      z: 2.4,
      duration: 0.35,
      ease: 'back.out(2)',
      onStart: () => {
        setProgress(100);
        setStatusText('SINGULARITY DETONATION // ENTERING TEDxRSET');
      },
    });

    tl.to(state, {
      burst: 1,
      duration: 0.5,
      ease: 'power4.out',
      onStart: () => {
        // Shockwave expansion
        gsap.to(shockwaveRing.scale, {
          x: 90,
          y: 90,
          z: 90,
          duration: 0.8,
          ease: 'power3.out',
        });
        gsap.to(ringMat, {
          opacity: 1,
          duration: 0.1,
          onComplete: () => {
            gsap.to(ringMat, { opacity: 0, duration: 0.6 });
          },
        });
      },
    });

    // Render loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Sphere rotation & pulse
      sphereGroup.rotation.y += state.spinSpeed;
      sphereGroup.rotation.x = Math.sin(elapsed * 2) * 0.2;
      haloMesh.rotation.z += 0.02;

      // Particles dynamic physics
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      const conv = state.convergence;
      const isBursting = state.burst > 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        if (isBursting) {
          // Radial explosive thrust outward
          const nx = posArr[i3];
          const ny = posArr[i3 + 1];
          const nz = posArr[i3 + 2];
          const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
          const speed = (particleSpeeds[i] + 4) * 1.8;
          posArr[i3] += (nx / len) * speed;
          posArr[i3 + 1] += (ny / len) * speed;
          posArr[i3 + 2] += (nz / len) * speed;
        } else {
          // Orbit and convergence
          angles[i] += state.spinSpeed * particleSpeeds[i];
          const targetR = particleRadii[i] * (1 - conv * 0.94) + 1.8;

          const initX = initialPositions[i3];
          const initY = initialPositions[i3 + 1];
          const initZ = initialPositions[i3 + 2];

          // Gravitational pull lerp
          const currentR = Math.sqrt(initX * initX + initY * initY + initZ * initZ);
          const factor = (targetR / currentR);

          const curAngle = angles[i];
          posArr[i3] = (initX * factor) * Math.cos(curAngle) - (initY * factor) * Math.sin(curAngle);
          posArr[i3 + 1] = (initX * factor) * Math.sin(curAngle) + (initY * factor) * Math.cos(curAngle);
          posArr[i3 + 2] = initZ * factor + Math.sin(elapsed * 3 + i) * (1 - conv) * 2;
        }
      }

      posAttr.needsUpdate = true;
      particles.rotation.y = elapsed * 0.15;

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
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      tl.kill();
      renderer.dispose();
      geometry.dispose();
      particleMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (flashOverlayRef.current) {
      gsap.to(flashOverlayRef.current, {
        opacity: 1,
        duration: 0.2,
        onComplete: () => {
          onComplete();
        },
      });
    } else {
      onComplete();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#060608] select-none overflow-hidden"
    >
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Radial vignette backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,6,8,0.7)_80%,#060608_100%)] pointer-events-none" />

      {/* Flash overlay for detonation */}
      <div
        ref={flashOverlayRef}
        className="absolute inset-0 bg-[#FF1E27] pointer-events-none opacity-0 z-50 mix-blend-screen"
      />

      {/* Top Header info */}
      <div className="relative z-10 w-full max-w-7xl px-8 py-6 flex items-center justify-between text-xs font-mono text-[#8A8A93]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse" />
          <span className="text-[#F2ECE4] font-semibold tracking-wider">TEDxRSET 2026</span>
          <span className="text-white/30">·</span>
          <span>INITIALIZING SPATIAL CORE</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-white/50 tracking-widest text-[11px]">
          <span>RASET CAMPUS KAKKANAD</span>
          <span>·</span>
          <span>DEC 05, 2026</span>
        </div>
      </div>

      {/* Center Plasma Title Overlay (Subtle) */}
      <div className="relative z-10 text-center pointer-events-none flex flex-col items-center">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E2C98A] mb-2 opacity-90">
          The Cosmic Fusion
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-2">
          <span className="text-[#FF1E27]">TEDx</span>RSET
        </h1>
        <p className="text-xs md:text-sm font-body text-[#8A8A93] tracking-wider max-w-md">
          Harmonizing entropic ideas into singular resonance.
        </p>
      </div>

      {/* Bottom Telemetry & Progress Controls */}
      <div className="relative z-10 w-full max-w-4xl px-8 py-8 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[#E2C98A]">
            <span className="inline-block w-1.5 h-1.5 bg-[#E2C98A]" />
            <span className="tracking-wider">{statusText}</span>
          </div>
          <span className="text-white font-bold tabular-nums tracking-widest">
            {progress}%
          </span>
        </div>

        {/* Progress bar line */}
        <div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#FF1E27] via-[#E2C98A] to-white transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between pt-1">
          <div className="text-[11px] font-mono text-white/40">
            WEBGL GRAPHICS ENGINE · 60FPS
          </div>
          <button
            onClick={handleSkip}
            className="group px-4 py-1.5 text-xs font-mono tracking-wider text-white/80 hover:text-white bg-white/5 hover:bg-[#FF1E27]/20 border border-white/10 hover:border-[#FF1E27]/50 rounded transition-all duration-200 cursor-pointer"
          >
            SKIP SEQUENCE <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
