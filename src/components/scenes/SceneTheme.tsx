import React, { useState } from 'react';
import { Cpu, Film, Trees, Sliders, ChevronRight, X, Sparkles } from 'lucide-react';

interface SceneThemeProps {
  entropy: number;
  setEntropy: (val: number) => void;
  onNextScene: () => void;
}

interface PillarDetail {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  summary: string;
  deepDive: string;
  questions: string[];
}

const PILLARS: PillarDetail[] = [
  {
    id: 'quantum',
    title: 'Quantum Signals',
    subtitle: 'AI, Deep Tech & Algorithmic Frontiers',
    icon: <Cpu className="w-5 h-5 text-[#FF1E27]" />,
    summary:
      'Deciphering coherent wisdom from stochastic noise. How autonomous networks, neural computation, and computational biology reveal deep order beneath computational randomness.',
    deepDive:
      'As humanity builds increasingly non-deterministic neural networks and quantum computing architectures, the line between deliberate algorithm and organic emergence blurs. This pillar interrogates whether machine intelligence creates new forms of societal resonance or amplifies our cultural static.',
    questions: [
      'Can synthetic consciousness generate genuine moral resonance?',
      'How do decentralized networks self-stabilize amidst malicious adversarial noise?',
      'Where does software engineering meet philosophical introspection?'
    ],
  },
  {
    id: 'culture',
    title: 'Echoes of Culture',
    subtitle: 'Cinema, Storytelling & Human Memory',
    icon: <Film className="w-5 h-5 text-[#E2C98A]" />,
    summary:
      'The emotional resonance that survives generational disruption. How pan-Indian cinematic narratives, folklore, and performance arts synthesize collective identity amidst modern distractions.',
    deepDive:
      'Kerala and the wider Indian cinematic universe stand at a historical inflection point—where regional vernacular stories command international resonance. We examine how human vulnerability and cinematic craft turn lived sorrow into immortal communal rhythm.',
    questions: [
      'Why do localized regional narratives strike universal global chords?',
      'How does an artist sustain authenticity against the pressure of algorithmic virality?',
      'What remains of human memory when every moment is digitized?'
    ],
  },
  {
    id: 'entropy',
    title: 'Entropy & Growth',
    subtitle: 'Sustainable Systems, Architecture & Engineering',
    icon: <Trees className="w-5 h-5 text-emerald-400" />,
    summary:
      'Thermodynamics of civilizations. Designing resilient civic spaces, renewable microgrids, and circular biomaterials that thrive on environmental unpredictability rather than fearing it.',
    deepDive:
      'Traditional engineering designs rigid structures that break under shock. Modern anti-fragility principles demand systems that absorb entropy to grow stronger. From Western Ghats biodiversity to responsive urban topology in Kochi, we examine regenerative futures.',
    questions: [
      'How can infrastructure mimic natural dissipative structures to achieve net-negative carbon?',
      'What architectural vernacular best withstands climate volatility in coastal ecosystems?',
      'Is perpetual economic expansion compatible with finite entropy constraints?'
    ],
  },
];

export const SceneTheme: React.FC<SceneThemeProps> = ({ entropy, setEntropy, onNextScene }) => {
  const [activePillar, setActivePillar] = useState<PillarDetail | null>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setEntropy(val);
  };

  const openPillar = (p: PillarDetail) => {
    setActivePillar(p);
  };

  const closePillar = () => {
    setActivePillar(null);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 pt-16 pb-20 select-none overflow-y-auto">
      <div className="max-w-6xl w-full flex flex-col gap-8">
        {/* Header section with Theme Concept & Entropy Controller */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E27] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
              <span className="tracking-widest uppercase">Chapter 03 · Core Curatorial Premise</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Resonance In <span className="text-gradient-crimson">Chaos</span>
            </h2>
            <p className="font-body text-xs sm:text-sm text-[#8A8A93] max-w-xl mt-1">
              Complex systems do not succumb to noise—they reorganize around new harmonic frequencies. Three intellectual pillars guide our 2026 inquiry.
            </p>
          </div>

          {/* Interactive Entropy Dial / Synthesizer Slider */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col gap-2 min-w-[280px] w-full md:w-auto">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#E2C98A]">
                <Sliders className="w-3.5 h-3.5" />
                <span>SPATIAL ENTROPY</span>
              </span>
              <span className="text-white font-bold tabular-nums">
                {entropy}% {entropy < 25 ? '· HARMONIC' : entropy > 75 ? '· TURBULENT' : '· TRANSITION'}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={entropy}
              onChange={handleSliderChange}
              className="w-full accent-[#FF1E27] cursor-pointer h-1.5 bg-white/10 rounded-lg"
              title="Drag to dynamically alter WebGL 3D particle coherence"
            />

            <div className="flex justify-between text-[10px] font-mono text-white/40">
              <span>0% ORDER</span>
              <span>DRAG TO DISTORT WEBGL</span>
              <span>100% NOISE</span>
            </div>
          </div>
        </div>

        {/* 3 Interactive 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => openPillar(pillar)}
              className="glass-panel hover:glass-panel-elevated p-6 md:p-8 rounded-3xl border border-white/10 hover:border-[#FF1E27]/40 flex flex-col justify-between transition-all duration-300 group cursor-pointer shadow-xl relative overflow-hidden min-h-[300px]"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#FF1E27] transition-colors" />

              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>

                <div className="text-[11px] font-mono text-[#E2C98A] tracking-wider uppercase mb-1">
                  {pillar.subtitle}
                </div>

                <h3 className="font-display font-bold text-2xl text-white group-hover:text-white transition-colors mb-3">
                  {pillar.title}
                </h3>

                <p className="font-body text-xs sm:text-sm text-[#8A8A93] leading-relaxed">
                  {pillar.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6 text-xs font-mono text-white/60 group-hover:text-white transition-colors">
                <span>INSPECT CURATION</span>
                <ChevronRight className="w-4 h-4 text-[#FF1E27] group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pillar Detail Modal Dialog */}
      {activePillar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-2xl w-full glass-panel-elevated p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  {activePillar.icon}
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#E2C98A] tracking-widest uppercase">
                    Pillar Analysis
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {activePillar.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={closePillar}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 flex flex-col gap-6 text-sm">
              <div>
                <h4 className="text-xs font-mono text-[#8A8A93] uppercase tracking-wider mb-2">
                  Curatorial Premise
                </h4>
                <p className="font-body text-[#F2ECE4] leading-relaxed text-sm md:text-base">
                  {activePillar.deepDive}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-3">
                <h4 className="text-xs font-mono text-[#E2C98A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>KEY DIALECTICS TO BE DEBATED</span>
                </h4>
                <ul className="flex flex-col gap-2 text-xs font-body text-white/80 list-disc list-inside">
                  {activePillar.questions.map((q, i) => (
                    <li key={i} className="leading-relaxed">{q}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={closePillar}
                className="px-6 py-2.5 rounded-xl bg-[#FF1E27] hover:bg-[#d9141c] text-white font-mono text-xs font-bold tracking-wider cursor-pointer"
              >
                CLOSE INSPECTION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
