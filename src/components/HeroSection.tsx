import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
import { LiquidButton } from './ui/Buttons';
import Prism from './Prism';

interface HeroSectionProps {
  onOpenReel: () => void;
  onExploreProjects: () => void;
  onOpenRecruiterContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReel,
  onExploreProjects,
}) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Responsive start card proportions: compact and sleek on mobile, balanced on desktop
  const startWidth = isMobile ? 54 : isTablet ? 48 : 36;
  const startHeight = isMobile ? 26 : isTablet ? 34 : 36;
  const startRadius = isMobile ? 18 : 24;

  return (
    <section id="hero-section" className="relative w-full bg-black text-white">
      <ScrollExpand
        mediaType="custom"
        customMedia={
          <div className="relative w-full h-full bg-black">
            <Prism
              animationType="rotate"
              timeScale={0.5}
              height={isMobile ? 3.4 : 3.5}
              baseWidth={isMobile ? 5.2 : 5.5}
              scale={isMobile ? 3.5 : 3.6}
              hueShift={0}
              colorFrequency={1}
              noise={0}
              glow={1}
            />
          </div>
        }
        useWindowScroll={true}
        startWidth={startWidth}
        startHeight={startHeight}
        startRadius={startRadius}
        endRadius={0}
        mediaZoom={1.0}
        scrollDistance={isMobile ? 1.0 : 1.3}
        holdDistance={0.2}
        overlayScrim={0.55}
        title={
          <div className="flex flex-col items-center justify-center select-none px-2 w-full max-w-xl">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-1 px-3 sm:px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[9px] sm:text-[11px] font-mono-code text-slate-300 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300 shrink-0" />
              <span className="font-semibold tracking-wider uppercase">3D & VFX Director</span>
            </div>
            
            <div className="w-full h-[115px] sm:h-[150px] md:h-[170px] flex items-center justify-center">
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
                particleSize={isMobile ? 1.9 : 2.0}
                density={isMobile ? 3.3 : 3.2}
                color="#ffffff"
                highlightColor="#ffffff"
                scatter={isMobile ? 40 : 45}
                gatherDuration={1.3}
                enableGather={true}
                trigger="mount"
                pointerRepel={isMobile ? 40 : 50}
                repelRadius={isMobile ? 100 : 120}
                idleDrift={0.5}
                fontSize={isMobile ? "clamp(2.6rem, 11vw, 3.8rem)" : "clamp(2.3rem, 5.5vw, 4.4rem)"}
                glow={true}
                className="w-full h-full"
              />
            </div>
          </div>
        }
        scrollHint={
          <div className="flex flex-col items-center justify-center space-y-1 select-none pointer-events-none animate-bounce">
            <span className="font-mono-code text-[10px] sm:text-xs font-semibold tracking-widest text-slate-300 uppercase">
              Scroll down to explore
            </span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
          </div>
        }
      >
        {/* Full Bleed Content revealed upon scroll */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center text-center mt-4 sm:mt-12 pointer-events-auto">
          
          {/* Liquid Glass Capsule Tab */}
          <div className="mb-3 sm:mb-5 pointer-events-auto flex items-center justify-center">
            <LiquidButton
              onClick={() => soundFx.playClick()}
              className="h-auto py-1 sm:py-2.5 px-3 sm:px-6 rounded-full shadow-2xl backdrop-blur-xl transition-all duration-300 max-w-[95vw]"
            >
              <div className="flex flex-wrap items-center justify-center gap-1.5 xs:gap-2 sm:gap-4 text-[10px] xs:text-[11px] sm:text-sm font-mono-code text-slate-200">
                <span className="inline-flex items-center gap-1 sm:gap-1.5 font-semibold tracking-wider uppercase whitespace-nowrap">
                  <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-white drop-shadow-[0_0_4px_rgba(255,255,255,0.7)] shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z"/>
                  </svg>
                  <span>3D animation</span>
                </span>

                <span className="text-white/30 hidden xs:inline">•</span>

                <span className="inline-flex items-center gap-1 sm:gap-1.5 font-semibold tracking-wider uppercase whitespace-nowrap">
                  <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-white drop-shadow-[0_0_4px_rgba(255,255,255,0.7)] shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z"/>
                  </svg>
                  <span>VFX and CGI</span>
                </span>

                <span className="text-white/30 hidden sm:inline">•</span>

                <span className="inline-flex items-center gap-1 sm:gap-1.5 font-semibold tracking-wider uppercase whitespace-nowrap">
                  <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-white drop-shadow-[0_0_4px_rgba(255,255,255,0.7)] shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z"/>
                  </svg>
                  <span>Procedural simulations</span>
                </span>
              </div>
            </LiquidButton>
          </div>

          {/* Interactive WarpText Headline with WebGL Refraction and Previous Mixed Font Styling */}
          <div className="w-full max-w-5xl h-[145px] sm:h-[190px] md:h-[230px] mx-auto flex items-center justify-center my-1 sm:my-2 pointer-events-auto">
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
              fontSize={isMobile ? "clamp(1.95rem, 8vw, 2.85rem)" : "clamp(2.3rem, 4.8vw, 3.8rem)"}
              letterSpacing="-0.03em"
              lineHeight={isMobile ? 1.14 : 1.18}
              style={{ height: '100%', width: '100%' }}
            />
          </div>

          {/* Subtitle / Lede */}
          <p className="mt-2 sm:mt-4 text-xs sm:text-base md:text-lg text-[#9a9a9a] max-w-2xl mx-auto font-normal leading-relaxed px-2">
            Crafting immersive automotive cinematics, commercial visual effects, procedural simulations, and high-fidelity environments in Unreal Engine and Houdini.
          </p>

          {/* Role tags in 4 separate Apple Liquid Glass Pills */}
          <div className="mt-3 sm:mt-5 pointer-events-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-3">
            <LiquidButton
              size="sm"
              onClick={() => soundFx.playClick()}
              className="h-auto py-1.5 px-3 sm:px-4 rounded-full text-[11px] sm:text-[13px] font-mono-code font-medium tracking-wide text-slate-200 shadow-lg"
            >
              <span>Technical Creative Producer</span>
            </LiquidButton>

            <LiquidButton
              size="sm"
              onClick={() => soundFx.playClick()}
              className="h-auto py-1.5 px-3 sm:px-4 rounded-full text-[11px] sm:text-[13px] font-mono-code font-medium tracking-wide text-slate-200 shadow-lg"
            >
              <span>Real-Time 3D Artist</span>
            </LiquidButton>

            <LiquidButton
              size="sm"
              onClick={() => soundFx.playClick()}
              className="h-auto py-1.5 px-3 sm:px-4 rounded-full text-[11px] sm:text-[13px] font-mono-code font-medium tracking-wide text-slate-200 shadow-lg"
            >
              <span>Multimedia Production Lead</span>
            </LiquidButton>

            <LiquidButton
              size="sm"
              onClick={() => soundFx.playClick()}
              className="h-auto py-1.5 px-3 sm:px-4 rounded-full text-[11px] sm:text-[13px] font-mono-code font-medium tracking-wide text-slate-200 shadow-lg"
            >
              <span>Broadcast Media Professional</span>
            </LiquidButton>
          </div>

          {/* Hero Action Buttons with GradientButton Component */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-7 w-full sm:w-auto">
            <GradientButton
              id="hero-watch-sequence-btn"
              variant="default"
              onClick={() => {
                soundFx.playClick();
                onOpenReel();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="text-xs sm:text-sm tracking-wider uppercase font-mono-code font-bold py-3 sm:py-3.5 px-6 sm:px-7 min-h-[44px] w-full sm:w-auto"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 fill-white text-white shrink-0" />
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
              className="text-xs sm:text-sm tracking-wider uppercase font-mono-code font-bold py-3 sm:py-3.5 px-6 sm:px-7 min-h-[44px] w-full sm:w-auto"
            >
              <span>SHOW ALL PROJECTS</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 text-white shrink-0" />
            </GradientButton>
          </div>

        </div>
      </ScrollExpand>
    </section>
  );
};


