import React from 'react';
import { ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

interface NavigationDockProps {
  currentScene: number;
  totalScenes: number;
  sceneTitle: string;
  onPrev: () => void;
  onNext: () => void;
  onSelectScene: (index: number) => void;
  onReplayPreloader: () => void;
  isTransitioning: boolean;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  currentScene,
  totalScenes,
  sceneTitle,
  onPrev,
  onNext,
  onSelectScene,
  onReplayPreloader,
  isTransitioning,
}) => {
  const padNum = (num: number) => String(num + 1).padStart(2, '0');
  const progressRatio = (currentScene + 1) / totalScenes;
  const strokeDashoffset = 100 - progressRatio * 100;

  return (
    <>
      {/* Lower-Left Indicator: Monospace Counter & Circular Progress Ring */}
      <div className="fixed bottom-6 left-6 md:left-10 z-30 flex items-center gap-4 glass-panel px-4 py-2.5 rounded-xl border border-white/10 select-none">
        {/* SVG Circular Progress Ring */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          <svg className="w-8 h-8 -rotate-90">
            <circle
              cx="16"
              cy="16"
              r="13"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="2.5"
              fill="transparent"
            />
            <circle
              cx="16"
              cy="16"
              r="13"
              stroke="#FF1E27"
              strokeWidth="2.5"
              strokeDasharray="100"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <span className="absolute font-mono text-[10px] font-bold text-white">
            {currentScene + 1}
          </span>
        </div>

        {/* Text information */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#FF1E27] font-semibold">{padNum(currentScene)}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/60">{padNum(totalScenes - 1)}</span>
          </div>
          <span className="text-[11px] font-mono text-[#8A8A93] tracking-wider truncate max-w-[140px] md:max-w-none">
            {sceneTitle}
          </span>
        </div>
      </div>

      {/* Lower-Right Floating Navigation Dock */}
      <div className="fixed bottom-6 right-6 md:right-10 z-30 flex items-center gap-2 select-none">
        {/* Replay Cosmic Preloader Action */}
        <button
          onClick={() => {
            onReplayPreloader();
          }}
          className="hidden lg:flex items-center gap-1.5 px-3 py-2 glass-panel hover:bg-white/10 rounded-xl border border-white/10 text-xs font-mono text-[#E2C98A] hover:text-white transition-all cursor-pointer"
          title="Replay The Cosmic Fusion Preloader Intro"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E2C98A]" />
          <span>REPLAY INTRO</span>
        </button>

        {/* Scene Dot Indicators */}
        <div className="hidden sm:flex items-center gap-1.5 glass-panel px-3 py-2.5 rounded-xl border border-white/10">
          {Array.from({ length: totalScenes }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i !== currentScene) {
                  onSelectScene(i);
                }
              }}
              disabled={isTransitioning}
              aria-label={`Go to scene ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentScene
                  ? 'w-6 bg-[#FF1E27] shadow-[0_0_10px_rgba(255,30,39,0.7)]'
                  : 'w-2 bg-white/20 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Up/Down Arrow Navigation Buttons */}
        <div className="flex items-center gap-1 glass-panel p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              if (currentScene > 0 && !isTransitioning) {
                onPrev();
              }
            }}
            disabled={currentScene === 0 || isTransitioning}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Previous Scene (or Press Up Arrow)"
            aria-label="Previous Scene"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (currentScene < totalScenes - 1 && !isTransitioning) {
                onNext();
              }
            }}
            disabled={currentScene === totalScenes - 1 || isTransitioning}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Next Scene (or Press Down Arrow / Scroll)"
            aria-label="Next Scene"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Keyboard hint */}
        <div className="hidden xl:flex items-center px-2 py-1 font-mono text-[10px] text-white/40 tracking-widest">
          [SCROLL / ARROWS]
        </div>
      </div>
    </>
  );
};
