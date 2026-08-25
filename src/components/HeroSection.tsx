import React from 'react';
import { 
  Play, 
  ArrowRight,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { soundFx } from '../utils/audioFx';
import { GradientButton } from './ui/gradient-button';
import { ScrollExpand } from './ui/ScrollExpand';
import { ParticleText } from './ui/ParticleText';
import { WarpText } from './ui/WarpText';

interface HeroSectionProps {
  onOpenReel: () => void;
  onExploreProjects: () => void;
  onOpenRecruiterContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReel,
  onExploreProjects,
}) => {
  return (
    <section id="hero-section" className="relative w-full bg-black text-white">
      <ScrollExpand
        mediaType="video"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4"
        useWindowScroll={true}
        startWidth={36}
        startHeight={36}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.35}
        scrollDistance={1.3}
        holdDistance={0.2}
        overlayScrim={0.55}
        title={
          <div className="flex flex-col items-center justify-center select-none px-2 w-full max-w-xl">
            <div className="inline-flex items-center gap-2 mb-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] sm:text-[11px] font-mono-code text-slate-300 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span className="font-semibold tracking-wider uppercase">3D & VFX Director</span>
            </div>
            
            <div className="w-full h-[120px] sm:h-[150px] md:h-[170px] flex items-center justify-center">
              <ParticleText
                parts={[
                  {
                    text: 'JATIN',
                    fontSizeMultiplier: 1.0,
                    fontWeight: 700,
                    fontStyle: 'normal',
                    fontFamily: "'Outfit', 'Space Grotesk', sans-serif"
                  },
                  {
                    text: 'Kumar',
                    fontSizeMultiplier: 1.0,
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontFamily: "'Instrument Serif', serif"
                  }
                ]}
                particleSize={2.0}
                density={3.2}
                color="#ffffff"
                highlightColor="#ffffff"
                pointerRepel={50}
                repelRadius={120}
                idleDrift={0.5}
                fontSize="clamp(2.2rem, 5.5vw, 4.4rem)"
                glow={true}
                className="w-full h-full"
              />
            </div>
          </div>
        }
        scrollHint={
          <div className="flex flex-col items-center justify-center space-y-1.5 select-none pointer-events-none animate-bounce">
            <span className="font-mono-code text-[11px] sm:text-xs font-semibold tracking-widest text-slate-300 uppercase">
              Scroll down to explore
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        }
      >
        {/* Full Bleed Content revealed upon scroll */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center text-center mt-8 sm:mt-12 pointer-events-auto">
          
          {/* Badge with star bullet before each specialty */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-4 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#505050]/80 via-[#202020]/90 to-[#0a0a0a]/95 border border-white/20 text-xs sm:text-sm font-mono-code text-slate-200 backdrop-blur-xl shadow-lg">
            <span className="inline-flex items-center gap-1.5 font-semibold tracking-wider uppercase">
              <svg className="w-3.5 h-3.5 fill-white drop-shadow-[0_0_4px_rgba(255,255,255,0.6)] shrink-0" viewBox="0 0 24 24">
                <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z"/>
              </svg>
              <span>3D animation</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold tracking-wider uppercase">
              <svg className="w-3.5 h-3.5 fill-white drop-shadow-[0_0_4px_rgba(255,255,255,0.6)] shrink-0" viewBox="0 0 24 24">
                <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z"/>
              </svg>
              <span>VFX and CGI</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold tracking-wider uppercase">
              <svg className="w-3.5 h-3.5 fill-white drop-shadow-[0_0_4px_rgba(255,255,255,0.6)] shrink-0" viewBox="0 0 24 24">
                <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z"/>
              </svg>
              <span>Procedural simulations</span>
            </span>
          </div>

          {/* Interactive WarpText Headline with WebGL Refraction and Previous Mixed Font Styling */}
          <div className="w-full max-w-5xl h-[160px] sm:h-[190px] md:h-[230px] mx-auto flex items-center justify-center my-2 pointer-events-auto">
            <WarpText
              parts={[
                [
                  {
                    text: 'Creating ',
                    fontWeight: 700,
                    fontStyle: 'normal',
                    fontFamily: "'Syne', 'Outfit', sans-serif",
                    color: '#ffffff',
                    fontSizeMultiplier: 1.0
                  },
                  {
                    text: 'photoreal 3D cinematics',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontFamily: "'Instrument Serif', serif",
                    color: '#b5b5b5',
                    fontSizeMultiplier: 1.08
                  }
                ],
                [
                  {
                    text: 'and high-end CGI.',
                    fontWeight: 700,
                    fontStyle: 'normal',
                    fontFamily: "'Syne', 'Outfit', sans-serif",
                    color: '#ffffff',
                    fontSizeMultiplier: 1.0
                  }
                ]
              ]}
              color="#ffffff"
              warpStrength={0.08}
              warpScale={1.7}
              speed={0.55}
              pointerInfluence={0.42}
              pointerStrength={0.38}
              refraction={0.018}
              ripple={true}
              fontSize="clamp(1.75rem, 4.4vw, 3.6rem)"
              letterSpacing="-0.03em"
              lineHeight={1.18}
              style={{ height: '100%', width: '100%' }}
            />
          </div>

          {/* Subtitle / Lede */}
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#9a9a9a] max-w-2xl mx-auto font-normal leading-relaxed">
            Crafting immersive automotive cinematics, commercial visual effects, procedural simulations, and high-fidelity environments in Unreal Engine and Houdini.
          </p>

          {/* Role tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs sm:text-[13px] font-mono-code text-slate-200">
            <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 font-medium">Technical Creative Producer</span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 font-medium">Real-Time 3D Artist</span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 font-medium">Multimedia Production Lead</span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 font-medium">Broadcast Media Professional</span>
          </div>

          {/* Hero Action Buttons with GradientButton Component */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-7">
            <GradientButton
              id="hero-watch-sequence-btn"
              variant="default"
              onClick={() => {
                soundFx.playClick();
                onOpenReel();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="text-xs sm:text-sm tracking-wider uppercase font-mono-code font-bold py-3.5 px-7"
            >
              <Play className="w-4 h-4 mr-1 fill-black text-black" />
              <span>WATCH IN SEQUENCE</span>
            </GradientButton>

            <GradientButton
              id="hero-show-all-btn"
              variant="variant"
              onClick={() => {
                soundFx.playClick();
                onExploreProjects();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="text-xs sm:text-sm tracking-wider uppercase font-mono-code font-bold py-3.5 px-7"
            >
              <span>SHOW ALL PROJECTS</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </GradientButton>
          </div>

        </div>
      </ScrollExpand>
    </section>
  );
};


