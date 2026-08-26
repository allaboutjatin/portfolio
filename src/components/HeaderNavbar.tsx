import React, { useState, useEffect } from 'react';
import { StaggeredMenu, StaggeredMenuItem, StaggeredMenuSocialItem } from './StaggeredMenu';
import { soundFx } from '../utils/audioFx';

interface HeaderNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContactModal: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  activeSection: _activeSection,
  onNavigate,
  onOpenContactModal
}) => {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide on the very initial landing screen; smoothly fade, slide, and blur in with delay as user enters hero section
      const scrolled = window.scrollY > 220;
      setHeaderVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: StaggeredMenuItem[] = [
    {
      label: 'Home',
      ariaLabel: 'Go to home section',
      onClick: () => {
        soundFx.playClick();
        onNavigate('hero-section');
      }
    },
    {
      label: (
        <span className="inline-flex items-center gap-2">
          <span>Sequences</span>
          <sup className="sm-tag-sup">Showcase</sup>
        </span>
      ),
      ariaLabel: 'Watch 3D sequence breakdowns',
      onClick: () => {
        soundFx.playClick();
        onNavigate('showreel-section');
      }
    },
    {
      label: (
        <span className="inline-flex items-center gap-2">
          <span>Projects</span>
          <sup className="sm-tag-sup">Created So Far</sup>
        </span>
      ),
      ariaLabel: 'View all portfolio projects created so far',
      onClick: () => {
        soundFx.playClick();
        onNavigate('projects-section');
      }
    },
    {
      label: (
        <span className="inline-flex items-center gap-2">
          <span>Pipelines</span>
          <sup className="sm-tag-sup">Tech & Tools</sup>
        </span>
      ),
      ariaLabel: 'View technical pipelines and software tools',
      onClick: () => {
        soundFx.playClick();
        onNavigate('pipeline-section');
      }
    },
    {
      label: (
        <span className="inline-flex items-center gap-2">
          <span>Experience</span>
          <sup className="sm-tag-sup">Highlights</sup>
        </span>
      ),
      ariaLabel: 'View broadcast, media & leadership experience highlights',
      onClick: () => {
        soundFx.playClick();
        onNavigate('experience-section');
      }
    },
    {
      label: (
        <span className="inline-flex items-center gap-2">
          <span>About</span>
          <sup className="sm-tag-sup">The Genius</sup>
        </span>
      ),
      ariaLabel: 'About Jatin Kumar - The Genius',
      onClick: () => {
        soundFx.playClick();
        onNavigate('about-section');
      }
    },
    {
      label: (
        <span className="inline-flex items-center gap-2">
          <span>Contact</span>
          <sup className="sm-tag-sup">Get In Touch</sup>
        </span>
      ),
      ariaLabel: 'Open contact hub and direct dispatch',
      onClick: () => {
        soundFx.playClick();
        onOpenContactModal();
      }
    }
  ];

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/allaboutjatin/' },
    { label: 'ArtStation', link: 'https://www.artstation.com/allaboutjatin' },
    { label: 'YouTube', link: 'https://www.youtube.com/channel/UCN50aa6sLd3zwCKyv6Qhvxg' },
    { label: 'Instagram', link: 'https://www.instagram.com/moreaboutjatin/' }
  ];

  const customLogo = (
    <button
      id="brand-logo-btn"
      onClick={() => {
        soundFx.playClick();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="flex items-center space-x-2.5 group text-left cursor-pointer focus:outline-none bg-transparent border-0 p-0"
      aria-label="Jatin Kumar Portfolio"
    >
      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-inner">
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)"/>
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-30 12 12)"/>
        </svg>
      </div>
      <div className="flex items-center space-x-1.5">
        <span className="font-sans font-semibold text-sm sm:text-[15px] tracking-tight text-white group-hover:text-zinc-200 transition-colors">
          Jatin Kumar
        </span>
        <span className="text-[11px] font-sans text-zinc-400">.3D</span>
      </div>
    </button>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={false}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#ffffff"
        changeMenuColorOnOpen={true}
        colors={['#B497CF', '#5227FF']}
        customLogo={customLogo}
        accentColor="#ff6b6b"
        isFixed={true}
        headerVisible={headerVisible}
        closeOnClickAway={true}
        onMenuOpen={() => {
          soundFx.playClick();
        }}
        onMenuClose={() => {
          soundFx.playClick();
        }}
      />
    </div>
  );
};
