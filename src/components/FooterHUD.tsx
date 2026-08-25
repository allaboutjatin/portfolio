import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundFx } from '../utils/audioFx';

interface FooterHUDProps {
  onScrollToTop: () => void;
  onNavigate: (sectionId: string) => void;
}

export const FooterHUD: React.FC<FooterHUDProps> = ({ onScrollToTop, onNavigate }) => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          
          {/* Brand & Identity */}
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-display font-black text-sm text-white">
              JK
            </div>
            <div>
              <span className="font-display font-semibold text-white text-sm tracking-wide">
                JATIN KUMAR • <em className="font-serif-italic font-normal text-[#9a9a9a] not-italic text-[1.08em]">3D Animation & Real-Time CGI</em>
              </span>
              <p className="text-[11px] font-mono-code text-slate-400">
                Technical Creative Producer & Real-Time 3D Artist
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono-code text-slate-400 font-medium">
            <button
              onClick={() => onNavigate('hero-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('showreel-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Watch Sequences
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('projects-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              All Projects
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('pipeline-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Pipelines & Tools
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('about-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About the Genius
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('recruiter-contact')}
              className="text-white font-bold hover:underline cursor-pointer"
            >
              Contact Hub
            </button>
          </div>

          {/* Scroll to Top */}
          <button
            id="footer-scroll-top-btn"
            onClick={() => {
              soundFx.playClick();
              onScrollToTop();
            }}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white border border-white/10 transition-colors flex items-center space-x-1.5 text-xs font-mono-code cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Bottom Studio Info */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-code text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Jatin Kumar. All 3D models, VFX shots & breakdowns protected.</p>
          <p className="flex items-center gap-1.5">
            <span>Direct Email:</span>
            <a href="mailto:k.jatinofficial@gmail.com" className="text-white font-semibold hover:underline">
              k.jatinofficial@gmail.com
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};
