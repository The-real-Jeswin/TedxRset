/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CosmicFusionPreloader } from './components/CosmicFusionPreloader';
import { WebGLCanvas } from './components/WebGLCanvas';
import { Header } from './components/Header';
import { NavigationDock } from './components/NavigationDock';
import { MenuDrawer } from './components/MenuDrawer';
import { ScenePortal } from './components/scenes/ScenePortal';
import { SceneCountdownVenue } from './components/scenes/SceneCountdownVenue';
import { SceneTheme } from './components/scenes/SceneTheme';
import { SceneSpeakers } from './components/scenes/SceneSpeakers';
import { SceneSchedule } from './components/scenes/SceneSchedule';
import { SceneTeamTickets } from './components/scenes/SceneTeamTickets';

const SCENE_TITLES = [
  'The Portal',
  'Intent & Countdown',
  'Resonance in Chaos',
  'Featured Speakers',
  'Event Schedule',
  'Team & Registration',
];

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [currentScene, setCurrentScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [entropy, setEntropy] = useState(15); // 0 to 100 for Scene 03 Theme

  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  // Transition to specific scene with 3D camera depth plunge
  const goToScene = useCallback((index: number) => {
    if (index === currentScene || isTransitioning) return;
    if (index < 0 || index >= SCENE_TITLES.length) return;

    setIsTransitioning(true);
    setCurrentScene(index);

    // Lock user scroll for 1.1s for smooth cinematic settling
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1100);
  }, [currentScene, isTransitioning]);

  const handleNext = useCallback(() => {
    if (currentScene < SCENE_TITLES.length - 1) {
      goToScene(currentScene + 1);
    }
  }, [currentScene, goToScene]);

  const handlePrev = useCallback(() => {
    if (currentScene > 0) {
      goToScene(currentScene - 1);
    }
  }, [currentScene, goToScene]);

  // Handle Wheel / Trackpad zoom-scroll
  useEffect(() => {
    if (showPreloader || isMenuOpen) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 1100) return; // Debounce lock

      // Threshold to prevent minor accidental gestures
      if (Math.abs(e.deltaY) > 28) {
        lastScrollTime.current = now;
        if (e.deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 1100) return;

      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 45) {
        lastScrollTime.current = now;
        if (deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [showPreloader, isMenuOpen, handleNext, handlePrev]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const handleReplayPreloader = () => {
    setShowPreloader(true);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#060608] text-[#F2ECE4]">
      {/* 1. INITIAL INTRO EXPERIENCE: COSMIC FUSION PRELOADER */}
      {showPreloader && (
        <CosmicFusionPreloader onComplete={handlePreloaderComplete} />
      )}

      {/* 2. PERSISTENT 3D WEBGL CANVAS BACKGROUND */}
      <WebGLCanvas currentScene={currentScene} entropy={entropy} />

      {/* 3. FIXED GLASSMORPHIC HEADER */}
      <Header
        currentScene={currentScene}
        totalScenes={SCENE_TITLES.length}
        sceneTitle={SCENE_TITLES[currentScene]}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onSceneSelect={goToScene}
      />

      {/* 4. SLIDE-OUT MENU OVERLAY */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentScene={currentScene}
        onSelectScene={goToScene}
      />

      {/* 5. FULL VIEWPORT SCENE CONTAINERS (3D Z-AXIS ZOOM TRANSITION) */}
      <main className="relative z-10 w-full h-full">
        {/* Scene 01: The Portal */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            currentScene === 0
              ? 'opacity-100 scale-100 pointer-events-auto z-20'
              : 'opacity-0 scale-90 pointer-events-none z-10'
          }`}
        >
          <ScenePortal onNextScene={handleNext} onGoToScene={goToScene} />
        </div>

        {/* Scene 02: Event Intent & Dynamic Countdown */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            currentScene === 1
              ? 'opacity-100 scale-100 pointer-events-auto z-20'
              : 'opacity-0 scale-90 pointer-events-none z-10'
          }`}
        >
          <SceneCountdownVenue onNextScene={handleNext} onGoToScene={goToScene} />
        </div>

        {/* Scene 03: Theme Reveal — Resonance in Chaos */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            currentScene === 2
              ? 'opacity-100 scale-100 pointer-events-auto z-20'
              : 'opacity-0 scale-90 pointer-events-none z-10'
          }`}
        >
          <SceneTheme
            entropy={entropy}
            setEntropy={setEntropy}
            onNextScene={handleNext}
          />
        </div>

        {/* Scene 04: Featured Speakers */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            currentScene === 3
              ? 'opacity-100 scale-100 pointer-events-auto z-20'
              : 'opacity-0 scale-90 pointer-events-none z-10'
          }`}
        >
          <SceneSpeakers />
        </div>

        {/* Scene 05: Interactive Schedule & Event Flow */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            currentScene === 4
              ? 'opacity-100 scale-100 pointer-events-auto z-20'
              : 'opacity-0 scale-90 pointer-events-none z-10'
          }`}
        >
          <SceneSchedule />
        </div>

        {/* Scene 06: Core Team & Tickets */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            currentScene === 5
              ? 'opacity-100 scale-100 pointer-events-auto z-20'
              : 'opacity-0 scale-90 pointer-events-none z-10'
          }`}
        >
          <SceneTeamTickets />
        </div>
      </main>

      {/* 6. FLOATING DOCK & MONOSPACE PROGRESS RING */}
      <NavigationDock
        currentScene={currentScene}
        totalScenes={SCENE_TITLES.length}
        sceneTitle={SCENE_TITLES[currentScene]}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelectScene={goToScene}
        onReplayPreloader={handleReplayPreloader}
        isTransitioning={isTransitioning}
      />
    </div>
  );
}
