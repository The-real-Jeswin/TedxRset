import React, { useRef, useState } from 'react';
import { ArrowDown, Sparkles, MapPin, Calendar, Ticket } from 'lucide-react';

interface ScenePortalProps {
  onNextScene: () => void;
  onGoToScene: (index: number) => void;
}

export const ScenePortal: React.FC<ScenePortalProps> = ({ onNextScene, onGoToScene }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Moderate tilt angles for smooth 3D parallax feel
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 pt-16 pb-20 select-none">
      {/* 3D Tilt Hero Vessel */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative max-w-4xl w-full p-8 md:p-14 rounded-3xl glass-panel-elevated border border-white/10 flex flex-col items-center text-center shadow-2xl overflow-hidden group"
      >
        {/* Ambient specular highlight following tilt */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 group-hover:opacity-75"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 - tilt.x * 2}%, rgba(255, 30, 39, 0.25), transparent 70%)`,
          }}
        />

        {/* Top Tagline / Meta */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-[#8A8A93] mb-6">
          <span className="flex items-center gap-1.5 text-[#E2C98A]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INDEPENDENTLY ORGANIZED TED EVENT</span>
          </span>
          <span aria-hidden="true" className="text-white/20">·</span>
          <span>ANNUAL EDITION 2026</span>
        </div>

        {/* Main Display Title */}
        <h1 className="relative z-10 font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight text-white mb-4 leading-none">
          <span className="text-[#FF1E27] drop-shadow-[0_0_35px_rgba(255,30,39,0.5)]">TEDx</span>
          <span className="text-[#F2ECE4]">RSET</span>
        </h1>

        {/* Editorial Subtitle & Theme Anchor */}
        <div className="relative z-10 flex flex-col items-center gap-2 max-w-2xl mb-8">
          <div className="font-mono text-sm sm:text-base tracking-[0.25em] text-[#E2C98A] uppercase font-semibold">
            Resonance In Chaos
          </div>
          <p className="font-body text-sm sm:text-base text-[#8A8A93] leading-relaxed max-w-xl text-balance">
            Where entropic complexity meets sudden geometric order. Join 100 thinkers, scientists, artists, and engineers at Rajagiri for ideas worth spreading.
          </p>
        </div>

        {/* Event Quick Specs (Unboxed Metadata) */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/80 pb-8 border-b border-white/10 w-full">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#FF1E27]" />
            <span>December 5, 2026</span>
          </div>
          <span aria-hidden="true" className="text-white/20">·</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#E2C98A]" />
            <span>Gallery Hall, RSET Kakkanad</span>
          </div>
          <span aria-hidden="true" className="text-white/20">·</span>
          <div className="flex items-center gap-1.5 text-white/60">
            <span>Capacity: ~100 Seats</span>
          </div>
        </div>

        {/* Interactive Action Hub */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-8">
          <button
            onClick={() => onNextScene()}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#FF1E27] hover:bg-[#d9141c] text-white font-mono text-xs font-bold tracking-wider active:scale-95 transition-all shadow-lg shadow-[#FF1E27]/30 cursor-pointer"
          >
            <span>DISCOVER EVENT INTENT</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onGoToScene(5)}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-medium tracking-wider border border-white/10 hover:border-white/20 active:scale-95 transition-all cursor-pointer"
          >
            <Ticket className="w-3.5 h-3.5 text-[#E2C98A]" />
            <span>RESERVE DELEGATE PASS</span>
          </button>

          <button
            onClick={() => onGoToScene(3)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span>VIEW SPEAKERS →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
