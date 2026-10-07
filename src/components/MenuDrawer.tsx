import React, { useState } from 'react';
import { X, ExternalLink, Mail, Send, CheckCircle2, Instagram, ArrowRight } from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentScene: number;
  onSelectScene: (index: number) => void;
}

const SCENES_LIST = [
  { index: 0, title: 'The Portal / Title', subtitle: 'Cosmic Singularity & Vision' },
  { index: 1, title: 'Event Intent & Countdown', subtitle: 'Dec 5, 2026 · Gallery Hall, RSET' },
  { index: 2, title: 'Theme: Resonance in Chaos', subtitle: 'Quantum Signals, Culture & Entropy' },
  { index: 3, title: 'Featured Speakers', subtitle: 'Distinguished Keynote Lineup' },
  { index: 4, title: 'Interactive Schedule', subtitle: 'Full Day Run-Sheet & Master Flow' },
  { index: 5, title: 'Team & Delegate Pass', subtitle: 'Core Organizers & Registration' },
];

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  currentScene,
  onSelectScene,
}) => {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  if (!isOpen) return null;

  const handleSceneClick = (index: number) => {
    onSelectScene(index);
    onClose();
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowInquiryForm(false);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark backdrop blur */}
      <div
        onClick={() => {
          onClose();
        }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-xl h-full bg-[#0B0B0F]/95 border-l border-white/10 flex flex-col justify-between overflow-y-auto p-6 md:p-10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-2xl text-[#FF1E27]">TEDx</span>
            <span className="font-display font-extrabold text-2xl text-white">RSET</span>
            <span className="text-xs font-mono text-[#E2C98A] ml-2 px-2 py-0.5 rounded bg-[#E2C98A]/10 border border-[#E2C98A]/30">
              DEC 05, 2026
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
            }}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Navigation Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body: Scene Links or Inquiry Form */}
        <div className="py-8 flex-1">
          {!showInquiryForm ? (
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8A8A93] mb-1">
                Spatial Chapters / Quick Jump
              </span>

              {SCENES_LIST.map((scene) => (
                <button
                  key={scene.index}
                  onClick={() => handleSceneClick(scene.index)}
                  className={`group w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    currentScene === scene.index
                      ? 'bg-[#FF1E27]/15 border-[#FF1E27]/40 shadow-lg shadow-[#FF1E27]/10'
                      : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm font-semibold text-[#FF1E27]">
                      {String(scene.index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="font-display font-bold text-base text-white group-hover:text-[#E2C98A] transition-colors">
                        {scene.title}
                      </div>
                      <div className="font-body text-xs text-[#8A8A93]">
                        {scene.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-white/40 transition-transform duration-200 group-hover:translate-x-1 ${
                    currentScene === scene.index ? 'text-[#FF1E27]' : ''
                  }`} />
                </button>
              ))}
            </div>
          ) : (
            /* Inquiry / Contact Form */
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Contact TEDxRSET Core</h3>
                  <p className="font-body text-xs text-[#8A8A93]">
                    Send a note directly to our curation and organizing team.
                  </p>
                </div>
                <button
                  onClick={() => setShowInquiryForm(false)}
                  className="text-xs font-mono text-[#E2C98A] hover:underline cursor-pointer"
                >
                  ← Back to Menu
                </button>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-[#FF1E27]/15 border border-[#FF1E27]/40 flex flex-col items-center justify-center gap-3 text-center my-6">
                  <CheckCircle2 className="w-10 h-10 text-[#FF1E27]" />
                  <div className="font-display font-bold text-lg text-white">Message Dispatched</div>
                  <p className="font-body text-xs text-[#8A8A93] max-w-sm">
                    Thank you! Athul Raj P R and the TEDxRSET technical team have received your transmission. We will follow up shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="flex flex-col gap-3.5 mt-2">
                  <div>
                    <label className="block text-xs font-mono text-[#8A8A93] mb-1">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Joseph"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-[#FF1E27] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8A8A93] mb-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      placeholder="maya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-[#FF1E27] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8A8A93] mb-1">TOPIC / INQUIRY TYPE</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#14141A] border border-white/10 text-white text-sm focus:border-[#FF1E27] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="General Inquiry">General Event Inquiry</option>
                      <option value="Speaker Nomination">Speaker Nomination / Proposal</option>
                      <option value="Sponsorship & Partnership">Corporate Sponsorship & Partnership</option>
                      <option value="Press & Media Pass">Press / Media Accreditation</option>
                      <option value="Technical Core">Technical & Volunteer Team Role</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8A8A93] mb-1">MESSAGE TRANSMISSION</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us your thought or query..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-[#FF1E27] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF1E27] hover:bg-[#d9141c] text-white font-mono text-xs font-bold tracking-wider active:scale-98 transition-all shadow-lg shadow-[#FF1E27]/25 cursor-pointer mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>DISPATCH INQUIRY</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer: Leadership Team, Official Links & CTA */}
        <div className="pt-6 border-t border-white/10 flex flex-col gap-5">
          {/* Organizing Leadership Spotlight */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A8A93] block mb-2">
              Organizing Leadership
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="font-semibold text-white">Athul Raj P R</div>
                <div className="text-[11px] text-[#8A8A93]">Lead Organizer</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <div className="font-semibold text-white">Malavika D Nair</div>
                <div className="text-[11px] text-[#8A8A93]">Co-Organizer</div>
              </div>
              <div className="col-span-2 p-2.5 rounded-lg bg-[#FF1E27]/10 border border-[#FF1E27]/20 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#F2ECE4]">Jeswin George</div>
                  <div className="text-[11px] text-[#E2C98A]">Technical Core Lead</div>
                </div>
                <span className="text-[10px] font-mono text-white/50 bg-black/40 px-2 py-0.5 rounded">
                  TECH LEAD
                </span>
              </div>
            </div>
          </div>

          {/* External Links */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="https://www.ted.com/tedx/events/70800"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <span>TED.com Official</span>
              <ExternalLink className="w-3 h-3 text-[#FF1E27]" />
            </a>

            <a
              href="https://www.instagram.com/tedxrset/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Instagram className="w-3 h-3 text-[#E2C98A]" />
              <span>@tedxrset</span>
            </a>

            {!showInquiryForm && (
              <button
                onClick={() => {
                  setShowInquiryForm(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#FF1E27] hover:text-white bg-[#FF1E27]/10 hover:bg-[#FF1E27] border border-[#FF1E27]/30 transition-all cursor-pointer ml-auto"
              >
                <Mail className="w-3 h-3" />
                <span>INQUIRE / CONTACT</span>
              </button>
            )}
          </div>

          {/* RSET Kakkanad notice */}
          <div className="text-[11px] font-mono text-white/30 text-center">
            Gallery Hall, RSET Campus, Rajagiri Valley, Kakkanad, Ernakulam - 682030
          </div>
        </div>
      </div>
    </div>
  );
};
