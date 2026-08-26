import React from 'react';
import { 
  User, 
  MapPin, 
  Sparkles,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { soundFx } from '../utils/audioFx';
import { GradientButton } from './ui/gradient-button';
import { BorderGlow } from './ui/BorderGlow';

interface AboutAndExperienceProps {
  onOpenContactModal: () => void;
}

export const AboutAndExperience: React.FC<AboutAndExperienceProps> = ({
  onOpenContactModal
}) => {
  return (
    <section id="about-section" className="py-12 sm:py-20 relative z-10 bg-black text-white border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono-code text-slate-300 uppercase tracking-widest mb-1.5 sm:mb-2 font-semibold">
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>Background & Creative Direction</span>
            </div>
            <h2 className="text-2xl sm:text-5xl font-display font-semibold text-white tracking-tight leading-[1.15]">
              About <em className="font-serif-italic font-normal text-[#9a9a9a] not-italic text-[1.08em] tracking-tight">Jatin</em>
            </h2>
            <p className="text-[#9a9a9a] text-xs sm:text-base max-w-2xl mt-1 sm:mt-2 leading-relaxed">
              3D Artist • VFX & CGI Filmmaker • Real-Time Technical Director
            </p>
          </div>

          <GradientButton
            id="about-contact-btn"
            variant="default"
            onClick={() => {
              soundFx.playClick();
              onOpenContactModal();
            }}
            onMouseEnter={() => soundFx.playHover()}
            className="text-xs font-semibold py-2.5 sm:py-3 px-5 sm:px-6 min-h-[44px] w-full sm:w-auto"
          >
            <MessageSquare className="w-4 h-4 mr-2 text-white shrink-0" />
            <span>Contact Jatin</span>
          </GradientButton>
        </div>

        {/* Unified Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Bio Narrative Card (8 Cols) */}
          <div className="lg:col-span-8">
            <BorderGlow
              borderRadius={20}
              glowRadius={30}
              edgeSensitivity={28}
              glowIntensity={0.9}
              backgroundColor="#0b0b0e"
              colors={['#ffffff', '#38bdf8', '#818cf8']}
              className="shadow-2xl"
            >
              <div className="p-4 sm:p-9 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3.5 sm:space-x-4 pb-4 sm:pb-5 border-b border-white/10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner shrink-0">
                    <span className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">JK</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white">Jatin Kumar</h3>
                    <p className="text-[11px] sm:text-xs font-mono-code text-sky-400 font-semibold">Real-Time 3D Artist & VFX Director</p>
                    <p className="text-[10px] sm:text-xs font-mono-code text-slate-300 flex flex-wrap items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1 font-medium">
                      <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" /> Noida, India</span>
                      <span className="text-slate-600 hidden xs:inline">•</span>
                      <span className="text-emerald-400 font-semibold">Available Worldwide (Remote & Relocation)</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
                  <div className="text-sm sm:text-lg text-white font-semibold">
                    Hi, I’m Jatin 👋
                  </div>

                  <p>
                    a 3D Artist, creative technologist, and that multitalented guy in your organisation who somehow ends up knowing a little bit of everything.
                  </p>

                  <p>
                    My main focus is <span className="text-white font-semibold">Unreal Engine 5, Houdini, and real-time cinematic workflows</span> 🎬✨. I enjoy building environments, creating cinematic experiences, developing procedural assets, and exploring VFX and technical workflows for interactive and cinematic projects.
                  </p>

                  <p>
                    Before moving into 3D, I spent <span className="text-white font-semibold">4+ years in media production</span>, working across live events, photography, videography, editing, podcast production, and live streaming. I’ve had the opportunity to work with teams from <span className="text-sky-300 font-medium">News Nation, Zee News, Doordarshan</span>, and other media organisations, while also working alongside news anchors and production professionals.
                  </p>

                  <p>
                    I’ve contributed to the production and coverage of national-level events attended by distinguished guests, including the <span className="text-white font-medium">former President of India, State Governors, Chief Ministers, Deputy Chief Ministers, Bollywood personalities</span>, and other public figures.
                  </p>

                  <p>
                    I’m also part of a production studio with a combined audience of <span className="text-amber-300 font-medium">1.5M+ followers and subscribers</span> across multiple digital platforms. Working in that environment taught me how to handle tight deadlines, adapt quickly, collaborate across creative and technical teams, and <span className="text-white font-medium">most importantly</span> figure things out when there isn’t a manual.
                  </p>

                  <p>
                    Outside of 3D, I’m comfortable with video production & post-production, PC hardware and software troubleshooting, and basic web development. They may not all be my primary specialisations, but having a broad technical and creative skill set has definitely made me a more versatile problem-solver.
                  </p>

                  <p className="text-slate-200">
                    For anything else feel free to drop me a DM or get in touch with me directly at{' '}
                    <a
                      href="mailto:k.jatinofficial@gmail.com"
                      className="text-sky-400 font-semibold underline underline-offset-4 hover:text-sky-300 transition-colors"
                      onClick={() => soundFx.playClick()}
                    >
                      k.jatinofficial@gmail.com
                    </a>{' '}
                    💌
                  </p>

                  {/* Currently Looking For Box */}
                  <div className="p-3.5 sm:p-5 bg-white/[0.04] rounded-xl sm:rounded-2xl border border-white/10 space-y-1.5 sm:space-y-2">
                    <div className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                      <span>🎯 Currently looking for:</span>
                    </div>
                    <p className="text-[11px] sm:text-sm text-slate-300 leading-relaxed">
                      Opportunities in <span className="text-white font-medium">Real-Time 3D, Unreal Engine, VFX, and cinematic production</span> where I can contribute creatively, solve technical problems, learn from experienced artists, and hopefully become the multitalented guy you’re glad you hired. 🚀
                    </p>
                  </div>

                  {/* Quick Info Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] sm:text-xs font-mono-code">
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-slate-200 flex items-center gap-1.5">
                      <span>📍</span>
                      <span className="font-semibold text-white">Noida, India</span>
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-1.5">
                      <span>💼</span>
                      <span>Open to full-time & freelance</span>
                    </span>
                    <a
                      href="https://www.artstation.com/allaboutjatin"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300 hover:bg-sky-500/20 transition-colors flex items-center gap-1.5"
                    >
                      <span>🎨</span>
                      <span>ArtStation</span>
                    </a>
                  </div>

                  <div className="pt-2 text-xs sm:text-sm text-slate-200 font-medium">
                    If you’re working in Unreal Engine, Houdini, VFX, real-time graphics, or cinematic production, let’s connect! 🤝
                  </div>
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* Right Action & Interview Card (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <BorderGlow
              borderRadius={20}
              glowRadius={30}
              edgeSensitivity={28}
              glowIntensity={1.0}
              backgroundColor="#0b0b0e"
              colors={['#34d399', '#38bdf8', '#818cf8']}
              className="shadow-2xl h-fit"
            >
              <div className="p-5 sm:p-7 space-y-4 sm:space-y-5 flex flex-col">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-mono-code text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold tracking-wider">AVAILABLE FOR PROJECTS & ROLES</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-2xl font-display font-bold text-white leading-snug">
                    Let's bring next-gen cinematics to life.
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Available for full-time studio positions, senior technical freelance contracts, and Unreal Engine direction worldwide.
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-white/10">
                  <GradientButton
                    variant="variant"
                    onClick={() => {
                      soundFx.playClick();
                      onOpenContactModal();
                    }}
                    className="w-full text-xs font-bold uppercase tracking-wider py-3 sm:py-3.5 min-h-[44px]"
                  >
                    <span>Connect with Jatin</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </GradientButton>
                </div>
              </div>
            </BorderGlow>
          </div>

        </div>

      </div>
    </section>
  );
};
