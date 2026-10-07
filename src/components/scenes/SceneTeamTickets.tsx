import React, { useState } from 'react';
import { Ticket, ShieldCheck, QrCode, Instagram, ExternalLink, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PassTier {
  id: string;
  name: string;
  price: string;
  badgeType: string;
  perks: string[];
}

const TIERS: PassTier[] = [
  {
    id: 'student',
    name: 'Student Delegate',
    price: '₹499',
    badgeType: 'ACADEMIC ACCESS',
    perks: ['Full Day Access to all 4 Keynotes', 'Delegate Kit & Notebook', 'Networking Lunch & High-Tea'],
  },
  {
    id: 'general',
    name: 'General Delegate',
    price: '₹999',
    badgeType: 'STANDARD PASS',
    perks: ['Full Access to Keynotes & Panels', 'Exclusive Tech Installation Pass', 'Certificate of Participation', 'Networking Lounge Access'],
  },
  {
    id: 'patron',
    name: 'Patron Delegate',
    price: '₹1,999',
    badgeType: 'VIP PATRON',
    perks: ['Frontline Reserved Seating in Gallery Hall', 'Post-Event Private Dinner with Speakers', 'Commemorative Hardcover Anthology', 'Priority NFC Badge'],
  },
];

const CORE_TEAM = [
  {
    name: 'Athul Raj P R',
    role: 'Lead Organizer',
    institution: 'TEDxRSET & RSET Kakkanad',
    bio: 'Directing the overall curatorial vision, institutional license compliance, and stakeholder partnerships.',
  },
  {
    name: 'Malavika D Nair',
    role: 'Co-Organizer',
    institution: 'TEDxRSET & RSET Kakkanad',
    bio: 'Overseeing delegate experience, hospitality, production aesthetics, and speaker curation.',
  },
  {
    name: 'Jeswin George',
    role: 'Technical Core Lead',
    institution: 'TEDxRSET & RSET Kakkanad',
    bio: 'Leading web infrastructure, 3D WebGL graphics, stage telemetry, and digital experience engineering.',
  },
];

export const SceneTeamTickets: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<PassTier>(TIERS[1]);
  const [delegateName, setDelegateName] = useState('Alex Mathew');
  const [delegateOrg, setDelegateOrg] = useState('Rajagiri School of Engineering');
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGeneratePass = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF1E27', '#E2C98A', '#FFFFFF'],
    });
    setIsGenerated(true);
  };

  const handleDownloadBadge = () => {
    const passDetails = [
      '=====================================',
      'TEDxRSET 2026 DELEGATE PASS CONFIRMATION',
      '=====================================',
      `Name: ${delegateName || 'Delegate'}`,
      `Affiliation: ${delegateOrg || 'Attendee'}`,
      `Tier: ${selectedTier.name} (${selectedTier.badgeType})`,
      `Price: ${selectedTier.price}`,
      'Date: Saturday, December 5, 2026',
      'Venue: Gallery Hall, RSET Campus, Kakkanad, Ernakulam - 682030',
      'Gate Opening: 09:00 AM IST',
      `Pass ID: TEDxRSET-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      'Seat Allotment: Hall Row B - Assigned at Check-in',
      'Official TED Page: https://www.ted.com/tedx/events/70800',
      '=====================================',
    ].join('\n');

    const blob = new Blob([passDetails], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `TEDxRSET-Pass-${(delegateName || 'Delegate').replace(/\s+/g, '_')}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 pt-16 pb-20 select-none overflow-y-auto">
      <div className="max-w-6xl w-full flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#E2C98A] mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2C98A]" />
              <span className="tracking-widest uppercase">Chapter 06 · Core Team & Accreditation</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Registration & <span className="text-gradient-crimson">Leadership</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.ted.com/tedx/events/70800"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#FF1E27]" />
              <span>TED.COM EVENT</span>
            </a>

            <a
              href="https://www.instagram.com/tedxrset/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 hover:text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E2C98A]" />
              <span>@tedxrset</span>
            </a>
          </div>
        </div>

        {/* Two-Column Grid: Left is Pass Customizer / Right is Live Pass Hologram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Pass Customizer & Team Spotlight (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Tier Selectors */}
            <div>
              <span className="text-xs font-mono text-[#8A8A93] uppercase tracking-wider block mb-2.5">
                Select Delegate Tier (100 Seats Total)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => {
                      setSelectedTier(tier);
                    }}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      selectedTier.id === tier.id
                        ? 'bg-[#FF1E27]/15 border-[#FF1E27] shadow-lg shadow-[#FF1E27]/15'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono text-[#E2C98A] tracking-wider uppercase">
                        {tier.badgeType}
                      </div>
                      <div className="font-display font-bold text-sm text-white mt-0.5">
                        {tier.name}
                      </div>
                    </div>
                    <div className="font-mono font-bold text-lg text-white mt-3">
                      {tier.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Personalized Info Inputs */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-3.5">
              <span className="text-xs font-mono text-[#8A8A93] uppercase tracking-wider">
                Personalize Delegate Credential
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-white/60 mb-1">DELEGATE FULL NAME</label>
                  <input
                    type="text"
                    value={delegateName}
                    onChange={(e) => setDelegateName(e.target.value)}
                    placeholder="Alex Mathew"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-[#FF1E27] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-white/60 mb-1">AFFILIATION / INSTITUTION</label>
                  <input
                    type="text"
                    value={delegateOrg}
                    onChange={(e) => setDelegateOrg(e.target.value)}
                    placeholder="RSET Kakkanad"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-[#FF1E27] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleGeneratePass}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF1E27] hover:bg-[#d9141c] text-white font-mono text-xs font-bold tracking-wider active:scale-95 transition-all shadow-lg shadow-[#FF1E27]/30 cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  <span>CLAIM DELEGATE BADGE</span>
                </button>

                {isGenerated && (
                  <button
                    onClick={handleDownloadBadge}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs tracking-wider transition-all cursor-pointer"
                    title="Download Pass Confirmation"
                  >
                    <Download className="w-4 h-4 text-[#E2C98A]" />
                    <span>SAVE</span>
                  </button>
                )}
              </div>
            </div>

            {/* Core Leadership Team Spotlight */}
            <div>
              <span className="text-xs font-mono text-[#8A8A93] uppercase tracking-wider block mb-2.5">
                Organizing Leadership Team
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CORE_TEAM.map((member, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-display font-bold text-sm text-white">
                        {member.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#FF1E27] mt-0.5">
                        {member.role}
                      </div>
                      <p className="text-[11px] font-body text-[#8A8A93] mt-2 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                    <div className="text-[10px] font-mono text-white/40 pt-3 border-t border-white/5 mt-3">
                      {member.institution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Holographic Pass (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm rounded-3xl p-6 glass-panel-elevated border border-[#FF1E27]/30 shadow-2xl relative overflow-hidden group">
              {/* Subtle top lanyard punch-hole */}
              <div className="w-12 h-2.5 rounded-full bg-black/60 border border-white/20 mx-auto mb-6" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl text-[#FF1E27]">TEDx</span>
                  <span className="font-display font-extrabold text-xl text-white">RSET</span>
                </div>
                <span className="text-[10px] font-mono text-[#E2C98A] px-2 py-0.5 rounded bg-[#E2C98A]/10 border border-[#E2C98A]/30">
                  {selectedTier.badgeType}
                </span>
              </div>

              {/* Holographic Body */}
              <div className="py-6 flex flex-col gap-4">
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                    ACCORDED DELEGATE
                  </span>
                  <div className="font-display font-bold text-2xl text-white mt-0.5 truncate">
                    {delegateName || 'Alex Mathew'}
                  </div>
                  <div className="font-mono text-xs text-[#8A8A93] truncate">
                    {delegateOrg || 'Rajagiri School of Engineering & Technology'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-white/40 block">DATE</span>
                    <span className="text-white font-medium">DEC 05, 2026</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">SEAT ID</span>
                    <span className="text-[#FF1E27] font-semibold">HAL-B18</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">VENUE</span>
                    <span className="text-white">Gallery Hall</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">SECURITY</span>
                    <span className="text-emerald-400">VERIFIED</span>
                  </div>
                </div>

                {/* QR Code & Barcode Section */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="flex items-center gap-3">
                    <QrCode className="w-10 h-10 text-white" />
                    <div className="flex flex-col font-mono text-[9px] text-white/50">
                      <span>NFC CREDENTIAL #70800</span>
                      <span>TEDx INDEPENDENT LICENSE</span>
                    </div>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-[#E2C98A]" />
                </div>
              </div>

              {/* Pass Footer */}
              <div className="pt-3 border-t border-white/10 text-center font-mono text-[10px] text-white/40">
                Gallery Hall, RSET Campus, Kakkanad, Ernakulam · 682030
              </div>
            </div>

            {isGenerated && (
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>DELEGATE PASS COMPILED & CONFIRMED</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
