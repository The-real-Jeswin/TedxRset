import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, ExternalLink, Download, Compass, ShieldCheck } from 'lucide-react';
import { downloadCalendarEvent } from '../../utils/calendar';

interface SceneCountdownVenueProps {
  onNextScene: () => void;
  onGoToScene: (index: number) => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const SceneCountdownVenue: React.FC<SceneCountdownVenueProps> = ({ onNextScene, onGoToScene }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [imgError, setImgError] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Event Date: December 5, 2026, 09:00:00 IST
    const targetDate = new Date('2026-12-05T09:00:00+05:30').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadCalendar = () => {
    downloadCalendarEvent();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://www.ted.com/tedx/events/70800');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 pt-16 pb-20 select-none overflow-y-auto">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Live Countdown & Intent Statement (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#E2C98A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2C98A]" />
            <span className="tracking-widest uppercase">Chapter 02 · Synchronizing Real-Time</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            The Gathering <br />
            <span className="text-gradient-crimson">December 05, 2026</span>
          </h2>

          <p className="font-body text-sm sm:text-base text-[#8A8A93] leading-relaxed max-w-xl">
            TEDxRSET converges thinkers, makers, and innovators to dismantle inertia. With an exclusive capacity of approximately 100 delegates, every seat is an active participant in intellectual combustion.
          </p>

          {/* Countdown Blocks */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg">
            {[
              { label: 'DAYS', value: pad(timeLeft.days) },
              { label: 'HOURS', value: pad(timeLeft.hours) },
              { label: 'MINUTES', value: pad(timeLeft.minutes) },
              { label: 'SECONDS', value: pad(timeLeft.seconds) },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="glass-panel p-3 sm:p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-[#FF1E27]/40 transition-colors"
              >
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-mono tabular-nums font-bold text-2xl sm:text-4xl text-white tracking-tight">
                  {unit.value}
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-[#8A8A93] tracking-widest mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleDownloadCalendar}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF1E27] hover:bg-[#d9141c] text-white font-mono text-xs font-bold tracking-wider active:scale-95 transition-all shadow-lg shadow-[#FF1E27]/30 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>ADD TO CALENDAR (.ICS)</span>
              <Download className="w-3.5 h-3.5 opacity-70" />
            </button>

            <a
              href="https://www.ted.com/tedx/events/70800"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-mono text-xs tracking-wider transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#E2C98A]" />
              <span>TED.COM EVENT #70800</span>
            </a>

            <button
              onClick={handleCopyLink}
              className="px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#8A8A93] hover:text-white transition-colors cursor-pointer"
              title="Copy official TED URL"
            >
              {copiedLink ? 'COPIED!' : 'SHARE'}
            </button>
          </div>
        </div>

        {/* Right Column: Venue Architecture & Access Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col gap-5 relative overflow-hidden shadow-2xl">
            {/* Venue Image Spotlight */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#14141A] border border-white/10">
              {!imgError ? (
                <img
                  src="/src/assets/images/venue_gallery_hall_1791389892482.jpg"
                  alt="Gallery Hall at RSET Kakkanad"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-neutral-900 to-black text-center">
                  <MapPin className="w-8 h-8 text-[#FF1E27] mb-2" />
                  <span className="font-display font-bold text-white text-base">Gallery Hall, RSET</span>
                  <span className="font-mono text-xs text-[#8A8A93]">Auditorium & Keynote Stage</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Tag overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                <span className="text-white font-semibold drop-shadow">Gallery Hall Stage</span>
                <span className="text-[#E2C98A] drop-shadow">Kakkanad, Kerala</span>
              </div>
            </div>

            {/* Venue Details */}
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF1E27] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Rajagiri School of Engineering & Technology</div>
                  <div className="text-xs font-mono text-[#8A8A93] leading-relaxed mt-0.5">
                    Rajagiri Valley Road, Kakkanad, Ernakulam, Kerala - 682030
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-[#8A8A93] pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-white/90">
                  <Users className="w-3.5 h-3.5 text-[#E2C98A]" />
                  <span>~100 Capacity</span>
                </div>
                <span className="text-white/20">·</span>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Open to Public</span>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Navigation */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://maps.google.com/?q=Rajagiri+School+of+Engineering+%26+Technology+Kakkanad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs hover:border-[#E2C98A]/40 transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-[#E2C98A]" />
                <span>OPEN DIRECTIONS IN MAPS</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
