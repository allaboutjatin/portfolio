import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { soundFx } from '../utils/audioFx';
import { GooeyNav, GooeyNavItem } from './GooeyNav';

interface HeaderNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContactModal: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenContactModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    soundFx.setEnabled(next);
  };

  const navItems: GooeyNavItem[] = [
    { id: 'hero-section', label: 'Home', href: '#hero-section' },
    { id: 'showreel-section', label: 'Watch Sequences', href: '#showreel-section' },
    { id: 'projects-section', label: 'All Projects', href: '#projects-section' },
    { id: 'pipeline-section', label: 'Pipelines & Tools', href: '#pipeline-section' },
    { id: 'about-section', label: 'About Jatin', href: '#about-section' },
    { id: 'recruiter-contact', label: 'Contact Hub', href: '#recruiter-contact' }
  ];

  const matchedIndex = navItems.findIndex((item) => item.id === activeSection);
  const currentActiveIndex = matchedIndex >= 0 ? matchedIndex : 0;

  const handleSelectNav = (index: number, item: GooeyNavItem) => {
    soundFx.playClick();
    if (item.id) {
      onNavigate(item.id);
    }
  };

  const handleMobileLinkClick = (id: string) => {
    soundFx.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 py-2.5 shadow-2xl'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Brand Logo & Monogram */}
          <div className="flex items-center space-x-3">
            <button
              id="brand-logo-btn"
              onClick={() => {
                soundFx.playClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-2.5 group text-left cursor-pointer"
              aria-label="Jatin Kumar Portfolio"
            >
              {/* Monogram SVG Icon */}
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-inner">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <g transform="rotate(-30 12 12)">
                    <circle cx="7.3" cy="3.2" r="1.45"/>
                    <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8"/>
                    <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8"/>
                    <circle cx="16.7" cy="20.8" r="1.45"/>
                  </g>
                </svg>
              </div>

              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-sky-300 transition-colors">
                    JATIN KUMAR
                  </span>
                  <span className="text-[10px] font-mono-code text-slate-400">.3D</span>
                </div>
              </div>
            </button>
          </div>

          {/* Center: React Bits GooeyNav Interactive Shelf */}
          <div className="hidden lg:flex items-center justify-center">
            <GooeyNav
              items={navItems}
              activeIndex={currentActiveIndex >= 0 ? currentActiveIndex : 0}
              onSelect={handleSelectNav}
              particleCount={14}
              particleDistances={[80, 12]}
              particleR={90}
              animationTime={500}
              timeVariance={250}
              colors={[1, 2, 3, 1, 2, 4]}
            />
          </div>

          {/* Right: Audio Toggle + Apple Glass Contact CTA */}
          <div className="flex items-center space-x-2.5">
            <button
              id="audio-toggle-btn"
              onClick={toggleAudio}
              className="p-2 rounded-lg bg-white/5 border border-white/15 text-slate-400 hover:text-white hover:border-white/30 transition-all cursor-pointer"
              title={audioEnabled ? 'Mute Interface Sound' : 'Unmute Sound Effects'}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              id="header-contact-btn"
              onClick={() => {
                soundFx.playClick();
                onOpenContactModal();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="btn-metal btn-solid-white hidden sm:inline-flex text-xs font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
              <span>Contact</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/10 border border-white/20 text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl flex flex-col justify-center px-6 py-20 space-y-3 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-widest block font-bold mb-2">
              PORTFOLIO SHELF
            </span>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMobileLinkClick(item.id!)}
                className={`w-full py-3.5 px-4 text-left rounded-xl border transition-all text-sm font-mono-code flex items-center justify-between ${
                  activeSection === item.id 
                    ? 'bg-white text-black font-bold border-white' 
                    : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-50">→</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onOpenContactModal();
              setMobileMenuOpen(false);
            }}
            className="w-full py-4 text-center rounded-xl bg-white text-black font-mono-code font-bold text-sm shadow-xl flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-4 h-4 mr-1.5" />
            <span>Contact Jatin Kumar</span>
          </button>
        </div>
      )}
    </>
  );
};
