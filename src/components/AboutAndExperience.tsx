import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  MapPin, 
  Sparkles,
  ArrowRight,
  Cpu,
  Layers,
  Activity
} from 'lucide-react';
import { soundFx } from '../utils/audioFx';
import { GradientButton } from './ui/gradient-button';
import { BorderGlow } from './ui/BorderGlow';
import { GradientOrb } from './ui/gradient-orb';

interface AboutAndExperienceProps {
  onOpenContactModal: () => void;
}

const ORB_PRESETS = [
  { name: 'Cosmic', hue: 0, speed: 0.3, label: '01' },
  { name: 'Cyber', hue: 140, speed: 0.45, label: '02' },
  { name: 'Solar', hue: 45, speed: 0.35, label: '03' },
  { name: 'Violet', hue: 270, speed: 0.25, label: '04' },
];

interface LavenderHighlightProps {
  children: React.ReactNode;
  active: boolean;
  delay?: number;
}

const LavenderHighlight: React.FC<LavenderHighlightProps> = ({ children, active, delay = 0 }) => {
  return (
    <motion.span
      initial={{ backgroundSize: '0% 100%', color: '#f8fafc' }}
      animate={
        active
          ? { backgroundSize: '100% 100%', color: '#09090b' }
          : { backgroundSize: '0% 100%', color: '#f8fafc' }
      }
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="inline font-bold px-1.5 py-0.5 rounded-[4px] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] bg-no-repeat bg-left transition-colors duration-300"
      style={{
        backgroundImage: 'linear-gradient(to right, #d8b4fe, #c4b5fd)',
      }}
    >
      {children}
    </motion.span>
  );
};

export const AboutAndExperience: React.FC<AboutAndExperienceProps> = ({
  onOpenContactModal
}) => {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const activePreset = ORB_PRESETS[activePresetIndex];
  
  const bioRef = useRef<HTMLDivElement>(null);
  const isBioInView = useInView(bioRef, { once: true, margin: '-60px' });

  return (
    <section id="about-section" className="py-12 sm:py-20 relative z-10 bg-black text-white border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-5xl font-display font-semibold text-white tracking-tight leading-[1.15]">
              About <em className="font-serif-italic font-normal text-[#9a9a9a] not-italic text-[1.08em] tracking-tight">Jatin</em>
            </h2>
            <p className="text-[#9a9a9a] text-xs sm:text-base max-w-2xl mt-1 sm:mt-2 leading-relaxed">
              3D Artist • VFX & CGI Filmmaker • Real-Time Technical Director
            </p>
          </div>
        </div>

        {/* Unified Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Bio Narrative Card (8 Cols) */}
          <div className="lg:col-span-8" ref={bioRef}>
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
                    My main focus is{' '}
                    <LavenderHighlight active={isBioInView} delay={0.15}>
                      Unreal Engine 5, Houdini, and real-time cinematic workflows
                    </LavenderHighlight>{' '}
                    🎬✨. I enjoy building environments, creating cinematic experiences, developing procedural assets, and exploring VFX and technical workflows for interactive and cinematic projects.
                  </p>

                  <p>
                    Before moving into 3D, I spent{' '}
                    <LavenderHighlight active={isBioInView} delay={0.4}>
                      4+ years in media production
                    </LavenderHighlight>
                    , working across live events, photography, videography, editing, podcast production, and live streaming. I’ve had the opportunity to work with teams from{' '}
                    <LavenderHighlight active={isBioInView} delay={0.65}>
                      News Nation, Zee News, Doordarshan
                    </LavenderHighlight>
                    , and other media organisations, while also working alongside news anchors and production professionals.
                  </p>

                  <p>
                    I’ve contributed to the production and coverage of national-level events attended by distinguished guests, including the{' '}
                    <LavenderHighlight active={isBioInView} delay={0.9}>
                      former President of India, State Governors, Chief Ministers, Deputy Chief Ministers, Bollywood personalities
                    </LavenderHighlight>
                    , and other public figures.
                  </p>

                  <p>
                    I’m also part of a production studio with a combined audience of{' '}
                    <LavenderHighlight active={isBioInView} delay={1.15}>
                      1.5M+ followers and subscribers
                    </LavenderHighlight>{' '}
                    across multiple digital platforms. Working in that environment taught me how to handle tight deadlines, adapt quickly, collaborate across creative and technical teams, and{' '}
                    <LavenderHighlight active={isBioInView} delay={1.35}>
                      most importantly
                    </LavenderHighlight>{' '}
                    figure things out when there isn’t a manual.
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

          {/* Right Column: Look-Dev Shader Lab + Action Card (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8 justify-start">
            
            {/* Real-Time Shader Core Card - Desktop Only */}
            <BorderGlow
              borderRadius={20}
              glowRadius={30}
              edgeSensitivity={28}
              glowIntensity={0.9}
              backgroundColor="#0b0b0e"
              colors={['#818cf8', '#c084fc', '#38bdf8']}
              className="hidden lg:block shadow-2xl overflow-hidden"
            >
              <div className="p-4 sm:p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[11px] font-mono-code uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Look-Dev Shader Core</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-code text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                    WebGL 2.0
                  </span>
                </div>

                {/* Orb Viewport */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-inner group">
                  <GradientOrb
                    config={{
                      background: "#0a0a0a",
                      hue: activePreset.hue,
                      rotationSpeed: activePreset.speed,
                      noiseScale: 0.65,
                      innerRadius: 0.1
                    }}
                    className="w-full h-full"
                  />

                  {/* HUD Overlay elements */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono-code text-slate-300 flex items-center gap-1 pointer-events-none">
                    <Activity className="w-3 h-3 text-emerald-400" />
                    <span>60 FPS • GPU LIVE</span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono-code text-slate-300 flex items-center gap-1 pointer-events-none">
                    <Layers className="w-3 h-3 text-purple-400" />
                    <span>GLSL SIMPLEX</span>
                  </div>
                </div>

                {/* Interactive Preset Buttons */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400">
                    <span>SHADER SPECTRUM PRESETS</span>
                    <span className="text-white font-semibold">{activePreset.name}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {ORB_PRESETS.map((preset, idx) => {
                      const isActive = activePresetIndex === idx;
                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            soundFx.playClick();
                            setActivePresetIndex(idx);
                          }}
                          onMouseEnter={() => soundFx.playHover()}
                          className={`py-1.5 px-2 rounded-lg text-[10px] font-mono-code font-bold transition-all duration-200 cursor-pointer border text-center ${
                            isActive
                              ? 'bg-white text-black border-white shadow-md shadow-white/10 scale-[1.02]'
                              : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {preset.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </BorderGlow>

            {/* Action & Availability Card */}
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
                    <span>CONNECT</span>
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
