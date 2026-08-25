import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform,
  useSpring
} from 'motion/react';
import { 
  Cpu, 
  Tv, 
  Users, 
  Landmark, 
  TrendingUp, 
  Award
} from 'lucide-react';
import { soundFx } from '../utils/audioFx';
import { BorderGlow } from './ui/BorderGlow';

interface SoftwareItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  badge: string;
  badgeStyle: string;
  glowColors: [string, string, string];
  iconFile: string;
}

// Software Suites with SVG icon references from /icons/
const SOFTWARE_LIST: SoftwareItem[] = [
  {
    id: 'unreal',
    name: 'Unreal Engine 5',
    category: 'Real-Time & Cinematics',
    tagline: 'Lumen GI, Nanite Geometry, Sequencer & MRQ 32-Bit EXR',
    badge: 'REAL-TIME CINEMATICS',
    badgeStyle: 'border-sky-500/40 text-sky-300 bg-sky-500/10',
    glowColors: ['#38bdf8', '#0284c7', '#818cf8'],
    iconFile: 'unreal.svg'
  },
  {
    id: 'houdini',
    name: 'SideFX Houdini',
    category: 'Procedural VFX & Dynamics',
    tagline: 'FLIP Fluids, Pyro Grids, Sparse VDBs & VEX Scripting',
    badge: 'PROCEDURAL SIMULATION',
    badgeStyle: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    glowColors: ['#fbbf24', '#f59e0b', '#d97706'],
    iconFile: 'houdini.svg'
  },
  {
    id: 'nuke',
    name: 'Foundry NukeX',
    category: 'Node Compositing',
    tagline: 'Deep Compositing, Multipass EXR & ACEScg Color Science',
    badge: 'DEEP COMPOSITING',
    badgeStyle: 'border-yellow-500/40 text-yellow-300 bg-yellow-500/10',
    glowColors: ['#eab308', '#facc15', '#a16207'],
    iconFile: 'nuke.svg'
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'LookDev & Matte Painting',
    tagline: 'Texture Alphas, Matte Concept Art & Color Plates',
    badge: 'LOOKDEV & MATTE PAINT',
    badgeStyle: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
    glowColors: ['#3b82f6', '#60a5fa', '#1d4ed8'],
    iconFile: 'photoshop.svg'
  },
  {
    id: 'premiere',
    name: 'Premiere Pro',
    category: 'Editorial & Sound Sync',
    tagline: 'High-Paced Broadcast & Cinematic Video Assembly',
    badge: 'EDITORIAL & SOUND SYNC',
    badgeStyle: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
    glowColors: ['#f43f5e', '#fb7185', '#be123c'],
    iconFile: 'premiere.svg'
  },
  {
    id: 'ae',
    name: 'Adobe After Effects',
    category: 'Motion & Visual Effects',
    tagline: 'Commercial Motion Graphics, Particles & Optical Flares',
    badge: 'MOTION & COMPOSITING',
    badgeStyle: 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10',
    glowColors: ['#818cf8', '#6366f1', '#a855f7'],
    iconFile: 'after-effects.svg'
  },
  {
    id: 'maya',
    name: 'Autodesk Maya',
    category: '3D DCC & Sub-D',
    tagline: 'Hard-Surface Modeling, CAD Topology & Rigging Rigs',
    badge: '3D DCC & SUB-D',
    badgeStyle: 'border-teal-500/40 text-teal-300 bg-teal-500/10',
    glowColors: ['#14b8a6', '#2dd4bf', '#0d9488'],
    iconFile: 'maya.svg'
  },
  {
    id: '3dsmax',
    name: 'Autodesk 3ds Max',
    category: '3D Modeling & Environment',
    tagline: 'Architectural, Props & Level Environment Geometry',
    badge: 'ENVIRONMENT & PROPS',
    badgeStyle: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
    glowColors: ['#06b6d4', '#0ea5e9', '#3b82f6'],
    iconFile: '3ds-max.svg'
  },
  {
    id: 'substance',
    name: 'Substance 3D Painter',
    category: 'PBR & UDIM Texturing',
    tagline: 'Multi-Tile UDIM Workflows & Custom Smart Shaders',
    badge: 'PBR & UDIM TEXTURING',
    badgeStyle: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    glowColors: ['#10b981', '#34d399', '#059669'],
    iconFile: 'substance-painter.svg'
  },
  {
    id: 'embergen',
    name: 'EmberGen',
    category: 'Real-Time Volumetrics',
    tagline: 'GPU Fluid, Fire, Shockwaves & Pyro Particle Simulation',
    badge: 'REAL-TIME VOLUMETRICS',
    badgeStyle: 'border-orange-500/40 text-orange-300 bg-orange-500/10',
    glowColors: ['#f97316', '#fb923c', '#ef4444'],
    iconFile: 'embergen.svg'
  }
];

export const PipelineAndSkills: React.FC = () => {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Card dimensions: 350px width + 24px gap = 374px per card step
  const cardWidth = windowWidth < 640 ? 300 : 350;
  const cardGap = 24;
  const cardStep = cardWidth + cardGap;
  const totalTravelDistance = (SOFTWARE_LIST.length - 1) * cardStep;

  // Center-to-Center calculation: 
  // Initial X (start): 50vw - (cardWidth / 2)
  // Final X (end): 50vw - (cardWidth / 2) - totalTravelDistance
  const startX = windowWidth / 2 - cardWidth / 2;
  const endX = startX - totalTravelDistance;

  const { scrollYProgress } = useScroll({
    target: pinContainerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 38,
    restDelta: 0.001
  });

  const xTransform = useTransform(smoothProgress, [0, 1], [startX, endX]);

  // Track active center card index for HUD indicator
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const idx = Math.min(
        SOFTWARE_LIST.length - 1,
        Math.max(0, Math.round(latest * (SOFTWARE_LIST.length - 1)))
      );
      setActiveCardIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const experienceHighlights = [
    {
      id: 'celebrities',
      badge: 'CELEBRITY & BROADCAST TALENT',
      icon: Users,
      title: 'Celebrities & Renowned Public Figures',
      desc: 'Collaborated with distinguished news anchors and celebrities including Ashutosh Rana, Manoj Joshi, Aalok Shrivastav, Ashmita Singh Rajput, Shalini Kapoor Tiwari, Rana Yashwant and many more.',
      accent: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
      glowColors: ['#fbbf24', '#f59e0b', '#d97706'] as [string, string, string]
    },
    {
      id: 'news-channels',
      badge: 'NATIONAL BROADCAST TEAMS',
      icon: Tv,
      title: 'Leading News Network Productions',
      desc: 'Collaborated and executed high-pressure live broadcasting, production shoots, and editing pipelines alongside teams from Zee News, Bharat Express, News Nation, Doordarshan, and more.',
      accent: 'border-sky-500/40 text-sky-300 bg-sky-500/10',
      glowColors: ['#38bdf8', '#0284c7', '#2563eb'] as [string, string, string]
    },
    {
      id: 'rashtrapati-bhavan',
      badge: 'GOVERNMENT & NATIONAL EVENT',
      icon: Landmark,
      title: 'Rashtrapati Bhavan (Amrit Udyan)',
      desc: "Partnered with the Ministry of Social Justice and Empowerment for a large-scale event held at Rashtrapati Bhavan's Amrit Udyan, contributing to the successful execution and comprehensive coverage of an event attended by over 11,550 visitors.",
      accent: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
      glowColors: ['#10b981', '#34d399', '#059669'] as [string, string, string]
    },
    {
      id: 'digital-audience',
      badge: 'DIGITAL MEDIA LEADERSHIP',
      icon: TrendingUp,
      title: 'High-Growth Digital Media Channels',
      desc: 'Scaled and directed multi-platform media pipelines resulting in 600K+ YouTube Audience and 300K+ Instagram Community engagement with strict episodic deadlines.',
      stats: [
        { label: 'YouTube Audience', val: '600K+' },
        { label: 'Instagram Community', val: '300K+' }
      ],
      accent: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
      glowColors: ['#f43f5e', '#fb7185', '#be123c'] as [string, string, string]
    }
  ];

  return (
    <div id="pipeline-section" className="relative z-10 bg-black text-white">
      
      {/* 1. PINNED VERTICAL-TO-HORIZONTAL SCROLL TRACK */}
      <div 
        ref={pinContainerRef} 
        className="relative h-[280vh]"
      >
        {/* Sticky Viewport Frame - Centered in view */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden border-t border-white/10">
          
          {/* Header directly within the locked view */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 text-xs font-mono-code text-slate-300 uppercase tracking-widest mb-1.5 font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" />
                  <span>Production Toolchain (Scroll to Glide)</span>
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-semibold text-white tracking-tight leading-[1.15]">
                  Pipelines & <em className="font-serif-italic font-normal text-[#9a9a9a] not-italic text-[1.08em] tracking-tight">Software Toolchain</em>
                </h2>
                <p className="text-[#9a9a9a] text-xs sm:text-sm max-w-2xl mt-1.5 leading-relaxed">
                  Scroll down to traverse the real-time, simulation, topology, and compositing toolset.
                </p>
              </div>

              {/* Real-Time Center Card Counter */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-mono-code text-slate-200 shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="font-bold text-white tracking-wider">{String(activeCardIndex + 1).padStart(2, '0')}</span>
                  <span className="text-slate-500">/</span>
                  <span className="text-slate-400">{String(SOFTWARE_LIST.length).padStart(2, '0')}</span>
                  <span className="text-slate-500 text-[10px] hidden sm:inline ml-1 uppercase font-semibold">
                    {SOFTWARE_LIST[activeCardIndex]?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Gliding Strip with Center-to-Center Positioning */}
          <div className="w-full relative py-4">
            <motion.div
              style={{ x: xTransform }}
              className="flex gap-6 will-change-transform"
            >
              {SOFTWARE_LIST.map((item, idx) => {
                const isCentered = activeCardIndex === idx;
                const iconSrc = `${import.meta.env.BASE_URL}icons/${item.iconFile}`;
                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      scale: isCentered ? 1.02 : 0.96,
                      opacity: isCentered ? 1 : 0.85
                    }}
                    transition={{ duration: 0.25 }}
                    style={{ width: `${cardWidth}px` }}
                    className="shrink-0"
                  >
                    <BorderGlow
                      borderRadius={24}
                      glowRadius={35}
                      edgeSensitivity={30}
                      glowIntensity={isCentered ? 1.2 : 0.7}
                      backgroundColor="#0b0b0e"
                      colors={item.glowColors}
                      onMouseEnter={() => soundFx.playHover()}
                      className="group relative overflow-hidden shadow-2xl transition-all duration-300"
                    >
                      <div className="p-6 sm:p-7 flex flex-col justify-between h-full min-h-[250px]">
                        <div className="absolute top-0 right-0 p-4 font-mono-code text-3xl font-bold text-white/5 group-hover:text-white/15 transition-colors pointer-events-none">
                          {String(idx + 1).padStart(2, '0')}
                        </div>

                        <div>
                          {/* Top Accent Pill Badge */}
                          <div className="mb-4">
                            <span className={`text-[10px] font-mono-code font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.badgeStyle}`}>
                              {item.badge}
                            </span>
                          </div>

                          {/* Logo and Name */}
                          <div className="flex items-center space-x-3.5 mb-2">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner p-2.5">
                              <img 
                                src={iconSrc} 
                                alt={item.name} 
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <span className="text-base sm:text-lg font-display font-bold text-white group-hover:text-sky-300 transition-colors block leading-tight">
                                {item.name}
                              </span>
                              <p className="text-xs font-mono-code text-slate-400 font-medium mt-0.5">
                                {item.category}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 mt-3">
                          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                            {item.tagline}
                          </p>
                        </div>
                      </div>
                    </BorderGlow>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom subtle scroll helper indicator */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4 text-center">
            <span className="text-[11px] font-mono-code text-slate-500 uppercase tracking-widest">
              ↓ Scroll to glide through toolchain • Pinned in center
            </span>
          </div>

        </div>
      </div>

      {/* 2. EXPERIENCE HIGHLIGHTS */}
      <div className="relative z-10 bg-black max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/10">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono-code text-slate-300 uppercase tracking-widest mb-1.5 font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Broadcast, Media & Leadership</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Experience <em className="font-serif-italic font-normal text-[#9a9a9a] not-italic text-[1.08em] tracking-tight">Highlights</em>
            </h3>
          </div>
        </div>

        {/* 4 Cards Grid with subtle vibrant accent colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experienceHighlights.map((exp) => {
            const IconComponent = exp.icon;
            return (
              <BorderGlow
                key={exp.id}
                borderRadius={24}
                glowRadius={35}
                edgeSensitivity={30}
                glowIntensity={1.0}
                backgroundColor="#0b0b0e"
                colors={exp.glowColors}
                onMouseEnter={() => soundFx.playHover()}
                className="shadow-2xl group transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] font-mono-code font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${exp.accent}`}>
                        {exp.badge}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <h4 className="text-lg sm:text-xl font-display font-bold text-white mb-3">
                      {exp.title}
                    </h4>

                    <p className="text-sm text-slate-300 leading-relaxed font-normal">
                      {exp.desc}
                    </p>
                  </div>

                  {exp.stats && (
                    <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-white/10">
                      {exp.stats.map((s, idx) => (
                        <div key={idx} className="bg-white/5 p-3 rounded-2xl border border-white/10">
                          <span className="text-xl sm:text-2xl font-display font-black text-white block">
                            {s.val}
                          </span>
                          <span className="text-[11px] font-mono-code text-slate-300">
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </BorderGlow>
            );
          })}
        </div>

      </div>

    </div>
  );
};
