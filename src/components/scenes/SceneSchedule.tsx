import React, { useState } from 'react';
import { Search, Clock, Bookmark, BookmarkCheck, Download, Sparkles, Coffee, Mic, Users, Music } from 'lucide-react';

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  speaker?: string;
  category: 'Keynotes' | 'Networking' | 'Panels' | 'Performances';
  venue: string;
  description: string;
}

const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: 's1',
    time: '09:00 AM – 10:00 AM',
    title: 'Delegate Accreditation & Morning Coffee Lounge',
    category: 'Networking',
    venue: 'Gallery Hall Foyer',
    description: 'Check-in, NFC delegate credential handover, bespoke TEDxRSET swag kits, and morning espresso mixer.',
  },
  {
    id: 's2',
    time: '10:00 AM – 10:30 AM',
    title: 'Opening Ceremony: Igniting the Flame',
    speaker: 'Organizing Leads Athul Raj P R & Malavika D Nair',
    category: 'Performances',
    venue: 'Main Stage',
    description: 'Official inaugural address, curatorial philosophy introduction, and ceremonial lighting of the red TED circle.',
  },
  {
    id: 's3',
    time: '10:30 AM – 11:15 AM',
    title: 'Next-Gen Space Tech & Satellite Observability',
    speaker: 'Dr. K. Radhakrishnan',
    category: 'Keynotes',
    venue: 'Main Stage',
    description: 'Autonomous microsatellite constellations, sovereign space telemetry, and planetary monitoring systems.',
  },
  {
    id: 's4',
    time: '11:15 AM – 12:00 PM',
    title: 'AI Ethics & Systems Governance in Modern Software',
    speaker: 'Ananya Ramesh',
    category: 'Keynotes',
    venue: 'Main Stage',
    description: 'Auditing autonomous neural agents, bias drift containment, and ethical software architectures.',
  },
  {
    id: 's5',
    time: '12:00 PM – 12:45 PM',
    title: 'Panel: Algorithmic Noise vs. Human Coherence',
    speaker: 'Invited Tech Researchers & Engineering Faculty',
    category: 'Panels',
    venue: 'Main Stage',
    description: 'An open dialectic on generative artificial intelligence, workforce evolution, and student research in Kerala.',
  },
  {
    id: 's6',
    time: '12:45 PM – 02:00 PM',
    title: 'Networking Innovation Lunch & Interactive Demos',
    category: 'Networking',
    venue: 'Gallery Hall Terrace & Lounge',
    description: 'Curated lunch spread, student robotics exhibits, and informal delegate conversation circles.',
  },
  {
    id: 's7',
    time: '02:00 PM – 02:45 PM',
    title: 'The Evolution of Pan-Indian Cinema & Narrative Identity',
    speaker: 'Dulquer Salmaan',
    category: 'Keynotes',
    venue: 'Main Stage',
    description: 'How regional Malayalam stories shattered geographical borders to command global streaming audiences.',
  },
  {
    id: 's8',
    time: '02:45 PM – 03:30 PM',
    title: 'Embracing Vulnerability in Creative Performance',
    speaker: 'Nivin Pauly',
    category: 'Keynotes',
    venue: 'Main Stage',
    description: 'Overcoming artistic fear, deconstructing commercial machismo, and the necessity of uncalculated honesty.',
  },
  {
    id: 's9',
    time: '03:30 PM – 04:15 PM',
    title: 'Afternoon Tea & Acoustic Fusion Performance',
    category: 'Performances',
    venue: 'Gallery Foyer & Outdoor Courtyard',
    description: 'Traditional Kerala high-tea savories accompanied by progressive instrumental Carnatic-fusion cello and guitar.',
  },
  {
    id: 's10',
    time: '04:15 PM – 05:00 PM',
    title: 'Dialectic: Sustainable Engineering in Coastal Kerala',
    category: 'Panels',
    venue: 'Main Stage',
    description: 'Architects and ecological engineers debate anti-fragile infrastructure against climate change realities.',
  },
  {
    id: 's11',
    time: '05:00 PM – 05:45 PM',
    title: 'Grand Finale, Core Team Honors & Valedictory',
    category: 'Performances',
    venue: 'Main Stage',
    description: 'Commemorative delegate certificates, acknowledgment of RSET technical crew and volunteers, closing snapshot.',
  },
];

export const SceneSchedule: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['s3', 's7']));

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredItems = SCHEDULE_ITEMS.filter((item) => {
    const matchesFilter = selectedFilter === 'All'
      ? true
      : selectedFilter === 'My Bookmarks'
      ? bookmarkedIds.has(item.id)
      : item.category === selectedFilter;

    const matchesSearch = searchQuery.trim() === ''
      ? true
      : item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.speaker && item.speaker.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getCategoryIcon = (category: ScheduleItem['category']) => {
    switch (category) {
      case 'Keynotes':
        return <Mic className="w-3.5 h-3.5 text-[#FF1E27]" />;
      case 'Networking':
        return <Coffee className="w-3.5 h-3.5 text-[#E2C98A]" />;
      case 'Panels':
        return <Users className="w-3.5 h-3.5 text-blue-400" />;
      case 'Performances':
        return <Music className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const handleDownloadRunSheet = () => {
    const textContent = [
      'TEDxRSET 2026 — OFFICIAL EVENT RUN-SHEET',
      'Date: Saturday, December 5, 2026',
      'Venue: Gallery Hall, RSET Campus, Kakkanad, Ernakulam - 682030',
      'Theme: Resonance in Chaos',
      '-------------------------------------------------------',
      ...SCHEDULE_ITEMS.map(
        (it) => `[${it.time}] ${it.title}\nVenue: ${it.venue} | Track: ${it.category}${it.speaker ? `\nSpeaker: ${it.speaker}` : ''}\n${it.description}\n`
      ),
      '-------------------------------------------------------',
      'Official TED Page: https://www.ted.com/tedx/events/70800',
    ].join('\n');

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'TEDxRSET-2026-RunSheet.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 pt-16 pb-20 select-none overflow-y-auto">
      <div className="max-w-6xl w-full flex flex-col gap-6">
        {/* Top Header & Search Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E27] mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
              <span className="tracking-widest uppercase">Chapter 05 · Master Flow</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Event <span className="text-gradient-crimson">Schedule</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics, speakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-[#FF1E27] focus:outline-none transition-colors"
              />
            </div>

            {/* Download Run-sheet */}
            <button
              onClick={handleDownloadRunSheet}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#E2C98A] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
              title="Download text run-sheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>RUN-SHEET</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
          {['All', 'Keynotes', 'Panels', 'Networking', 'Performances', 'My Bookmarks'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setSelectedFilter(tab);
              }}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedFilter === tab
                  ? 'bg-[#FF1E27] text-white shadow-sm'
                  : 'text-[#8A8A93] hover:text-white'
              }`}
            >
              {tab === 'My Bookmarks' ? `Saved (${bookmarkedIds.size})` : tab}
            </button>
          ))}
        </div>

        {/* Timeline Items List */}
        <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center glass-panel rounded-2xl border border-white/10">
              <p className="font-mono text-xs text-[#8A8A93]">
                No sessions match your search or filter criteria.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isBookmarked = bookmarkedIds.has(item.id);
              return (
                <div
                  key={item.id}
                  className="glass-panel hover:glass-panel-elevated p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-white/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 group"
                >
                  {/* Left: Time & Track */}
                  <div className="flex items-start sm:items-center gap-4 sm:min-w-[240px]">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 shrink-0 mt-0.5 sm:mt-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-mono text-xs font-semibold text-white flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#E2C98A]" />
                        <span>{item.time}</span>
                      </div>
                      <div className="text-[11px] font-mono text-[#8A8A93]">
                        {item.venue} · {item.category}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Title & Speaker / Description */}
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-base text-white group-hover:text-[#E2C98A] transition-colors">
                      {item.title}
                    </h3>
                    {item.speaker && (
                      <div className="text-xs font-mono text-[#FF1E27] mt-0.5">
                        Speaker: {item.speaker}
                      </div>
                    )}
                    <p className="text-xs font-body text-[#8A8A93] mt-1 line-clamp-1 group-hover:line-clamp-none transition-all">
                      {item.description}
                    </p>
                  </div>

                  {/* Right: Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className="p-2 rounded-xl text-white/50 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer shrink-0 self-end sm:self-center"
                    title={isBookmarked ? 'Remove from My Bookmarks' : 'Save to My Schedule'}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-[#FF1E27]" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
