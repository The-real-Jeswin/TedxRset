import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentScene: number;
  totalScenes: number;
  sceneTitle: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  onSceneSelect: (index: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScene,
  totalScenes,
  sceneTitle,
  isMenuOpen,
  setIsMenuOpen,
  onSceneSelect,
}) => {
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const padNum = (num: number) => String(num + 1).padStart(2, '0');

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-18 px-6 md:px-10 flex items-center justify-between glass-panel border-b border-white/10 select-none">
      {/* Zone 1: Brand Wordmark (Single Text Element) */}
      <button
        onClick={() => onSceneSelect(0)}
        className="flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF1E27] cursor-pointer group"
        aria-label="TEDxRSET Home"
      >
        <span className="font-display font-extrabold text-2xl tracking-tight text-[#FF1E27] group-hover:scale-105 transition-transform">
          TEDx
        </span>
        <span className="font-display font-extrabold text-2xl tracking-tight text-[#F2ECE4] group-hover:text-[#E2C98A] transition-colors">
          RSET
        </span>
      </button>

      {/* Zone 2: Monospace Scene Indicator & Micro Quick-Jump */}
      <div className="hidden md:flex items-center gap-3 font-mono text-xs text-[#8A8A93] tracking-widest">
        <span className="text-[#FF1E27] font-semibold">
          {padNum(currentScene)}
        </span>
        <span className="text-white/20">/</span>
        <span className="text-white/50">{padNum(totalScenes - 1)}</span>
        <span className="text-white/30">·</span>
        <span className="text-[#F2ECE4] font-medium tracking-wider">
          {sceneTitle.toUpperCase()}
        </span>
      </div>

      {/* Zone 3: Menu / Contact Trigger */}
      <div className="flex items-center gap-3">
        {/* Menu / Contact Toggle */}
        <button
          onClick={handleToggleMenu}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-wider text-white bg-[#FF1E27] hover:bg-[#d9141c] active:scale-95 transition-all shadow-lg shadow-[#FF1E27]/25 cursor-pointer whitespace-nowrap"
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu & Contact'}
        >
          {isMenuOpen ? (
            <>
              <X className="w-3.5 h-3.5" />
              <span>CLOSE</span>
            </>
          ) : (
            <>
              <Menu className="w-3.5 h-3.5" />
              <span>MENU / CONTACT</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

