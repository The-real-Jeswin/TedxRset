import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Clock, Sparkles, X, Video } from 'lucide-react';

interface Speaker {
  id: string;
  name: string;
  role: string;
  topic: string;
  category: 'Cinema & Art' | 'Tech & AI' | 'Future';
  image: string;
  duration: string;
  timeSlot: string;
  synopsis: string;
  bio: string;
  keyTakeaways: string[];
}

const SPEAKERS: Speaker[] = [
  {
    id: 'dulquer',
    name: 'Dulquer Salmaan',
    role: 'Actor, Producer & Storyteller',
    topic: 'The Evolution of Pan-Indian Cinema & Narrative Identity',
    category: 'Cinema & Art',
    image: '/src/assets/images/speaker_dulquer_salmaan_1791389823423.jpg',
    duration: '18 Minutes',
    timeSlot: '01:45 PM · Session 2',
    synopsis:
      'Exploring how linguistic barriers collapsed in Indian cinema over the past decade. Dulquer dissects why hyper-local cultural roots, authentic vulnerability, and boundary-pushing cinematic production resonate universally across global audiences.',
    bio:
      'One of India’s most versatile leading performers and producers, acclaimed for navigating Malayalam, Hindi, Tamil, and Telugu cinema with nuanced subtlety and boundary-defying storytelling.',
    keyTakeaways: [
      'The death of regional cinema enclaves and the birth of Pan-Indian storytelling',
      'Balancing commercial scale with personal artistic intimacy',
      'Why radical empathy on screen builds lasting cross-cultural resonance',
    ],
  },
  {
    id: 'nivin',
    name: 'Nivin Pauly',
    role: 'Acclaimed Actor & Creative Pioneer',
    topic: 'Embracing Vulnerability in Creative Performance',
    category: 'Cinema & Art',
    image: '/src/assets/images/speaker_nivin_pauly_1791389840039.jpg',
    duration: '18 Minutes',
    timeSlot: '02:30 PM · Session 2',
    synopsis:
      'In a culture obsessed with curated perfection and bravado, Nivin examines how true artistic breakthrough requires surrendering emotional control. A masterclass in leaning into uncertainty, creative risk, and honest self-confrontation.',
    bio:
      'A defining icon of the modern Malayalam New Wave movement, celebrated for bringing ground-level humanity and genre-redefining realism to Indian screens.',
    keyTakeaways: [
      'Transforming fear of failure into an authentic creative catalyst',
      'The quiet power of silence and unscripted instinct in performance',
      'Why modern audiences crave raw honesty over manufactured heroes',
    ],
  },
  {
    id: 'radhakrishnan',
    name: 'Dr. K. Radhakrishnan',
    role: 'Space Scientist & Aerospace Visionary',
    topic: 'Next-Gen Space Tech & Satellite Observability',
    category: 'Future',
    image: '/src/assets/images/speaker_radhakrishnan_1791389909083.jpg',
    duration: '18 Minutes',
    timeSlot: '10:30 AM · Session 1',
    synopsis:
      'From interplanetary exploration to high-resolution microsatellite swarms, Dr. Radhakrishnan discusses how sovereign orbital infrastructure is reshaping climate monitoring, disaster resilience, and human curiosity.',
    bio:
      'Distinguished space engineer and leader in Indian aerospace programs, instrumental in landmark interplanetary missions and national space architecture.',
    keyTakeaways: [
      'The democratization of low-Earth orbit and autonomous constellation networks',
      'Deploying space data for direct humanitarian and agricultural resilience',
      'Engineering interplanetary missions under radical cost and mass constraints',
    ],
  },
  {
    id: 'ananya',
    name: 'Ananya Ramesh',
    role: 'AI Ethics & Systems Researcher',
    topic: 'AI Ethics in Modern Software Systems',
    category: 'Tech & AI',
    image: '/src/assets/images/speaker_ananya_ramesh_1791389870035.jpg',
    duration: '18 Minutes',
    timeSlot: '11:15 AM · Session 1',
    synopsis:
      'As autonomous neural models take on clinical diagnostics, financial lending, and civic infrastructure, how do we enforce transparency? Ananya proposes mathematical frameworks for algorithmic governance and explainable AI.',
    bio:
      'Pioneering software architect and AI ethics researcher advising national standards bodies on verifiable neural system safety and safety-aligned generative architectures.',
    keyTakeaways: [
      'Beyond prompt injection: Real structural vulnerabilities in agentic systems',
      'Mathematically provable bounds on bias and discriminatory drift',
      'The human engineer’s irrevocable moral responsibility at the terminal',
    ],
  },
];

export const SceneSpeakers: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const filteredSpeakers = selectedCategory === 'All'
    ? SPEAKERS
    : SPEAKERS.filter((s) => s.category === selectedCategory);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredSpeakers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredSpeakers.length) % filteredSpeakers.length);
  };

  const handleCardClick = (speaker: Speaker) => {
    setActiveSpeaker(speaker);
    setIsPlayingPreview(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 pt-16 pb-20 select-none overflow-y-auto">
      <div className="max-w-6xl w-full flex flex-col gap-6">
        {/* Top Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#E2C98A] mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2C98A]" />
              <span className="tracking-widest uppercase">Chapter 04 · Keynote Voices</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Featured <span className="text-gradient-crimson">Speakers</span>
            </h2>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
            {['All', 'Cinema & Art', 'Tech & AI', 'Future'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#FF1E27] text-white shadow-sm'
                    : 'text-[#8A8A93] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid with Carousel Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSpeakers.map((speaker, idx) => (
            <div
              key={speaker.id}
              onClick={() => handleCardClick(speaker)}
              className="glass-panel hover:glass-panel-elevated rounded-3xl border border-white/10 hover:border-[#FF1E27]/50 p-4 flex flex-col justify-between group cursor-pointer transition-all duration-300 shadow-xl overflow-hidden min-h-[380px]"
            >
              {/* Speaker Portrait Vessel */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#14141A] border border-white/10 mb-4">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Styled graceful fallback container
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Floating duration badge */}
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-[#E2C98A]" />
                  <span>{speaker.duration}</span>
                </div>

                {/* Bottom name overlay on image */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-col">
                  <span className="font-display font-bold text-lg text-white group-hover:text-[#E2C98A] transition-colors drop-shadow">
                    {speaker.name}
                  </span>
                  <span className="font-mono text-[11px] text-[#8A8A93] truncate drop-shadow">
                    {speaker.role}
                  </span>
                </div>
              </div>

              {/* Talk title & preview action */}
              <div className="flex flex-col gap-2 flex-1 justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#FF1E27] uppercase tracking-wider mb-1">
                    {speaker.category}
                  </div>
                  <h3 className="font-body font-semibold text-xs text-[#F2ECE4] line-clamp-2 leading-snug group-hover:text-white">
                    "{speaker.topic}"
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-mono text-[#8A8A93] group-hover:text-white transition-colors">
                  <span>EXPAND SYNOPSIS</span>
                  <span className="text-[#FF1E27]">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speaker Detail Slide-out Sheet / Modal */}
      {activeSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-3xl w-full glass-panel-elevated p-6 md:p-10 rounded-3xl border border-white/20 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#14141A] border border-white/10 shrink-0">
                  <img
                    src={activeSpeaker.image}
                    alt={activeSpeaker.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E2C98A]">
                    <span>{activeSpeaker.category}</span>
                    <span>·</span>
                    <span>{activeSpeaker.timeSlot}</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {activeSpeaker.name}
                  </h3>
                  <div className="text-xs font-body text-[#8A8A93]">
                    {activeSpeaker.role}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveSpeaker(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 flex flex-col gap-6 text-sm">
              {/* Keynote Topic & Abstract */}
              <div>
                <span className="text-xs font-mono text-[#FF1E27] uppercase tracking-wider block mb-1">
                  Keynote Subject
                </span>
                <h4 className="font-display font-bold text-xl text-white mb-2">
                  "{activeSpeaker.topic}"
                </h4>
                <p className="font-body text-[#F2ECE4] text-xs sm:text-sm leading-relaxed">
                  {activeSpeaker.synopsis}
                </p>
              </div>

              {/* Video Preview Simulation Player */}
              <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A8A93]">
                  <span className="flex items-center gap-1.5 text-white">
                    <Video className="w-3.5 h-3.5 text-[#FF1E27]" />
                    <span>TEDx Keynote Preview Teaser</span>
                  </span>
                  <span>{activeSpeaker.duration}</span>
                </div>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center border border-white/5 group">
                  <img
                    src={activeSpeaker.image}
                    alt={activeSpeaker.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-40 blur-xs"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

                  {isPlayingPreview ? (
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[40, 70, 95, 60, 80, 50, 90, 65, 45, 85].map((h, i) => (
                          <div
                            key={i}
                            className="w-1 bg-[#FF1E27] rounded-full animate-pulse"
                            style={{ height: `${h * 0.4}px`, animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-xs text-white">
                        Streaming Keynote Excerpt (Preview Active)
                      </span>
                      <button
                        onClick={() => setIsPlayingPreview(false)}
                        className="text-xs font-mono text-[#E2C98A] hover:underline cursor-pointer"
                      >
                        PAUSE
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsPlayingPreview(true);
                      }}
                      className="relative z-10 w-14 h-14 rounded-full bg-[#FF1E27] hover:bg-[#d9141c] flex items-center justify-center text-white shadow-xl shadow-[#FF1E27]/40 active:scale-95 transition-all cursor-pointer"
                      title="Play Preview Teaser"
                    >
                      <Play className="w-6 h-6 ml-0.5 fill-white" />
                    </button>
                  )}
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
                <span className="text-xs font-mono text-[#E2C98A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>KEY TAKEAWAYS FOR DELEGATES</span>
                </span>
                <ul className="flex flex-col gap-1.5 text-xs font-body text-white/80 list-disc list-inside">
                  {activeSpeaker.keyTakeaways.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-[#8A8A93]">
                Gallery Hall Stage · RSET Kakkanad
              </span>
              <button
                onClick={() => setActiveSpeaker(null)}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold tracking-wider cursor-pointer"
              >
                CLOSE PROFILE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
