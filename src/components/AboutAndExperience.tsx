import React from 'react';
import { 
  User, 
  CheckCircle2, 
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
  const competencies = [
    { label: 'Unreal Engine Real-Time Cinematics', accent: 'text-sky-400', bg: 'border-sky-500/20' },
    { label: 'Houdini Procedural VFX & FLIP Dynamics', accent: 'text-amber-400', bg: 'border-amber-500/20' },
    { label: 'Hard-Surface CAD & Sub-D Topology', accent: 'text-teal-400', bg: 'border-teal-500/20' },
    { label: 'ACEScg Color Management & Deep Nuke Comp', accent: 'text-yellow-400', bg: 'border-yellow-500/20' },
    { label: 'Multi-UDIM Texturing & LookDev Shaders', accent: 'text-emerald-400', bg: 'border-emerald-500/20' },
    { label: 'Live Event & National Media Production (4+ Yrs)', accent: 'text-rose-400', bg: 'border-rose-500/20' }
  ];

  return (
    <section id="about-section" className="py-20 relative z-10 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono-code text-slate-300 uppercase tracking-widest mb-2 font-semibold">
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>Background & Creative Direction</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-white tracking-tight leading-[1.15]">
              About <em className="font-serif-italic font-normal text-[#9a9a9a] not-italic text-[1.08em] tracking-tight">Jatin</em>
            </h2>
            <p className="text-[#9a9a9a] text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
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
            className="text-xs font-semibold py-3 px-6"
          >
            <MessageSquare className="w-4 h-4 mr-2 text-black" />
            <span>Contact Jatin</span>
          </GradientButton>
        </div>

        {/* Unified Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Bio Narrative Card (8 Cols) */}
          <div className="lg:col-span-8">
            <BorderGlow
              borderRadius={24}
              glowRadius={35}
              edgeSensitivity={30}
              glowIntensity={0.9}
              backgroundColor="#0b0b0e"
              colors={['#ffffff', '#38bdf8', '#818cf8']}
              className="shadow-2xl"
            >
              <div className="p-6 sm:p-9 space-y-6">
                <div className="flex items-center space-x-4 pb-5 border-b border-white/10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
                    <span className="font-display font-black text-2xl text-white tracking-tight">JK</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-white">Jatin Kumar</h3>
                    <p className="text-xs font-mono-code text-sky-400 font-semibold">Real-Time 3D Artist & VFX Director</p>
                    <p className="text-xs font-mono-code text-slate-300 flex items-center gap-1.5 mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>Noida, India</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-emerald-400 font-semibold">Available Worldwide (Remote & Relocation)</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  <p>
                    I'm a 3D Artist with a primary focus on Unreal Engine, Houdini, and real-time cinematic workflows. I enjoy building environments, creating cinematic experiences, developing procedural assets, and exploring VFX and technical workflows for interactive and cinematic projects.
                  </p>
                  <p>
                    Before moving into 3D, I spent over 4+ years in media production, working across live events, photography, videography, podcast production, editing, and live streaming. During this time, I contributed to the production and coverage of national-level events, collaborating with teams from leading news networks including <span className="text-white font-medium">News Nation, Zee News, Doordarshan</span>, and other media organizations. I also worked alongside well-known news anchors and covered events attended by distinguished guests such as the former President of India, State Governors, Chief Ministers, and several renowned public figures.
                  </p>
                  <p>
                    I'm also part of a production studio with a combined audience of <span className="text-white font-medium">over 1.5 million followers and subscribers</span> across multiple digital platforms, where I gained hands-on experience in production workflows, working under tight deadlines, and collaborating with creative and technical teams.
                  </p>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white font-medium text-xs sm:text-sm">
                    Currently open for roles in Real-Time 3D, CGI simulation, LookDev, and cinematic filmmaking with collaborative, ambitious teams.
                  </div>
                </div>

                {/* Core Competencies */}
                <div className="pt-5 border-t border-white/10">
                  <h4 className="text-xs uppercase tracking-wider text-slate-300 font-mono-code mb-3.5 font-bold">
                    Core Competencies & Technical Skills
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {competencies.map((comp, i) => (
                      <div key={i} className={`flex items-center space-x-2.5 text-xs text-slate-200 font-mono-code bg-white/[0.04] p-3 rounded-xl border ${comp.bg}`}>
                        <CheckCircle2 className={`w-4 h-4 ${comp.accent} shrink-0`} />
                        <span className="truncate font-medium">{comp.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* Right Action & Interview Card (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <BorderGlow
              borderRadius={24}
              glowRadius={35}
              edgeSensitivity={30}
              glowIntensity={1.0}
              backgroundColor="#0b0b0e"
              colors={['#34d399', '#38bdf8', '#818cf8']}
              className="shadow-2xl h-full"
            >
              <div className="p-6 sm:p-7 space-y-5 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-mono-code text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold tracking-wider">AVAILABLE FOR PROJECTS & ROLES</span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                    Let's bring next-gen cinematics to life.
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Available for full-time studio positions, senior technical freelance contracts, and Unreal Engine direction worldwide.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <GradientButton
                    variant="variant"
                    onClick={() => {
                      soundFx.playClick();
                      onOpenContactModal();
                    }}
                    className="w-full text-xs font-bold uppercase tracking-wider py-3.5"
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
