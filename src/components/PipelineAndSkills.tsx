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
  themeColor: string;
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
    badgeStyle: 'border-white/30 text-white bg-white/10',
    themeColor: '#ffffff',
    glowColors: ['#ffffff', '#e2e8f0', '#94a3b8'],
    iconFile: 'unreal.svg'
  },
  {
    id: 'houdini',
    name: 'SideFX Houdini',
    category: 'Procedural VFX & Dynamics',
    tagline: 'FLIP Fluids, Pyro Grids, Sparse VDBs & VEX Scripting',
    badge: 'PROCEDURAL SIMULATION',
    badgeStyle: 'border-[#ff5500]/40 text-[#ff7700] bg-[#ff5500]/10',
    themeColor: '#ff5500',
    glowColors: ['#ff5500', '#ff7700', '#d94400'],
    iconFile: 'houdini.svg'
  },
  {
    id: 'nuke',
    name: 'Foundry NukeX',
    category: 'Node Compositing',
    tagline: 'Deep Compositing, Multipass EXR & ACEScg Color Science',
    badge: 'DEEP COMPOSITING',
    badgeStyle: 'border-[#ffd000]/40 text-[#ffd000] bg-[#ffd000]/10',
    themeColor: '#ffd000',
    glowColors: ['#ffd000', '#facc15', '#eab308'],
    iconFile: 'nuke.svg'
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'LookDev & Matte Painting',
    tagline: 'Texture Alphas, Matte Concept Art & Color Plates',
    badge: 'LOOKDEV & MATTE PAINT',
    badgeStyle: 'border-[#31a8ff]/40 text-[#31a8ff] bg-[#31a8ff]/10',
    themeColor: '#31a8ff',
    glowColors: ['#31a8ff', '#00c8ff', '#1d4ed8'],
    iconFile: 'photoshop.svg'
  },
  {
    id: 'premiere',
    name: 'Premiere Pro',
    category: 'Editorial & Sound Sync',
    tagline: 'High-Paced Broadcast & Cinematic Video Assembly',
    badge: 'EDITORIAL & SOUND SYNC',
    badgeStyle: 'border-[#ea77ff]/40 text-[#ea77ff] bg-[#ea77ff]/10',
    themeColor: '#ea77ff',
    glowColors: ['#ea77ff', '#d455f5', '#9999ff'],
    iconFile: 'premiere.svg'
  },
  {
    id: 'ae',
    name: 'Adobe After Effects',
    category: 'Motion & Visual Effects',
    tagline: 'Commercial Motion Graphics, Particles & Optical Flares',
    badge: 'MOTION & COMPOSITING',
    badgeStyle: 'border-[#9999ff]/40 text-[#9999ff] bg-[#9999ff]/10',
    themeColor: '#9999ff',
    glowColors: ['#9999ff', '#7b61ff', '#6366f1'],
    iconFile: 'after-effects.svg'
  },
  {
    id: 'maya',
    name: 'Autodesk Maya',
    category: '3D DCC & Sub-D',
    tagline: 'Hard-Surface Modeling, CAD Topology & Rigging Rigs',
    badge: '3D DCC & SUB-D',
    badgeStyle: 'border-[#00b4b4]/40 text-[#00b4b4] bg-[#00b4b4]/10',
    themeColor: '#00b4b4',
    glowColors: ['#00b4b4', '#2dd4bf', '#0d9488'],
    iconFile: 'maya.svg'
  },
  {
    id: '3dsmax',
    name: 'Autodesk 3ds Max',
    category: '3D Modeling & Environment',
    tagline: 'Architectural, Props & Level Environment Geometry',
    badge: 'ENVIRONMENT & PROPS',
    badgeStyle: 'border-[#0696d7]/40 text-[#0696d7] bg-[#0696d7]/10',
    themeColor: '#0696d7',
    glowColors: ['#0696d7', '#0ea5e9', '#0284c7'],
    iconFile: '3ds-max.svg'
  },
  {
    id: 'substance',
    name: 'Substance 3D Painter',
    category: 'PBR & UDIM Texturing',
    tagline: 'Multi-Tile UDIM Workflows & Custom Smart Shaders',
    badge: 'PBR & UDIM TEXTURING',
    badgeStyle: 'border-[#e63946]/40 text-[#e63946] bg-[#e63946]/10',
    themeColor: '#e63946',
    glowColors: ['#e63946', '#ff4d5a', '#c1121f'],
    iconFile: 'substance-painter.svg'
  },
  {
    id: 'embergen',
    name: 'EmberGen',
    category: 'Real-Time Volumetrics',
    tagline: 'GPU Fluid, Fire, Shockwaves & Pyro Particle Simulation',
    badge: 'REAL-TIME VOLUMETRICS',
    badgeStyle: 'border-[#ff4500]/40 text-[#ff4500] bg-[#ff4500]/10',
    themeColor: '#ff4500',
    glowColors: ['#ff4500', '#ff6b00', '#f97316'],
    iconFile: 'embergen.svg'
  }
];

export const PipelineAndSkills: React.FC = () => {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activePercent, setActivePercent] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive card dimensions: 280px width on mobile, 350px on desktop
  const isMobile = windowWidth < 640;
  const cardWidth = isMobile ? Math.min(300, Math.max(260, windowWidth - 52)) : 350;
  const cardGap = isMobile ? 16 : 24;
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
    stiffness: 300,
    damping: 35,
    restDelta: 0.001
  });

  // End horizontal scroll early (at 78% on mobile, 88% on desktop)
  // so the last software card (EmberGen) comfortably rests in the center before vertical scroll resumes.
  const endThreshold = isMobile ? 0.78 : 0.88;

  const xTransform = useTransform(smoothProgress, [0, endThreshold], [startX, endX], { clamp: true });
  const progressWidth = useTransform(smoothProgress, [0, endThreshold], ['0%', '100%'], { clamp: true });

  // Track active center card index & percentage for HUD indicator
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const normalized = Math.min(1, Math.max(0, latest / endThreshold));
      const idx = Math.min(
        SOFTWARE_LIST.length - 1,
        Math.max(0, Math.round(normalized * (SOFTWARE_LIST.length - 1)))
      );
      setActiveCardIndex(idx);
      setActivePercent(Math.round(normalized * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress, endThreshold]);

  const experienceHighlights = [
    {
      id: 'celebrities',
      badge: 'CELEBRITY & BROADCAST TALENT',
      icon: Users,
      title: 'Celebrities & Renowned Public Figures',
      desc: 'Contributed to the production and coverage of national-level events attended by distinguished guests, including the former President of India, Governors of states, Chief Ministers, Deputy Chief Ministers, Bollywood personalities, and other notable public figures. Additionally, collaborated with distinguished news anchors and celebrities across various professional projects, including Ashutosh Rana, Manoj Joshi, Aalok Shrivastav, Ashmita Singh Rajput, Shalini Kapoor Tiwari, Rana Yashwant, and many more.',
      accent: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
      glowColors: ['#fbbf24', '#f59e0b', '#d97706'] as [string, string, string],
      colSpan: 'col-span-1 lg:col-span-7',
      borderRadius: 20,
      paddingClass: 'p-4.5 sm:p-8'
    },
    {
      id: 'news-channels',
      badge: 'NATIONAL BROADCAST TEAMS',
      icon: Tv,
      title: 'Leading News Network Productions',
      desc: 'Collaborated with prominent broadcast media organizations to support the execution of high-pressure live broadcasts, production shoots, and end-to-end post-production workflows. Worked alongside teams from Zee News, Bharat Express, News Nation, Doordarshan, and other established media networks, contributing to the seamless delivery of time-sensitive, high-profile, and large-scale productions.',
      accent: 'border-sky-500/40 text-sky-300 bg-sky-500/10',
      glowColors: ['#38bdf8', '#0284c7', '#2563eb'] as [string, string, string],
      colSpan: 'col-span-1 lg:col-span-5',
      borderRadius: 18,
      paddingClass: 'p-4 sm:p-7'
    },
    {
      id: 'rashtrapati-bhavan',
      badge: 'GOVERNMENT & NATIONAL EVENT',
      icon: Landmark,
      title: 'Major Event Production & Coverage',
      desc: 'Contributed to the production and comprehensive media coverage of major events held at prestigious venues, including Rashtrapati Bhavan, Vigyan Bhavan, and other prominent locations. Partnered with the Ministry of Social Justice and Empowerment for a large-scale event at Rashtrapati Bhavan’s Amrit Udyan, attended by over 11,550 visitors.',
      accent: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
      glowColors: ['#10b981', '#34d399', '#059669'] as [string, string, string],
      colSpan: 'col-span-1 lg:col-span-5',
      borderRadius: 18,
      paddingClass: 'p-4 sm:p-7'
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
      glowColors: ['#f43f5e', '#fb7185', '#be123c'] as [string, string, string],
      colSpan: 'col-span-1 lg:col-span-7',
      borderRadius: 20,
      paddingClass: 'p-4.5 sm:p-8'
    }
  ];

  return (
    <div id="pipeline-section" className="relative z-10 bg-black text-white">
      
      {/* 1. PINNED VERTICAL-TO-HORIZONTAL SCROLL TRACK */}
      <div 
        ref={pinContainerRef} 
        className="relative h-[340vh] sm:h-[280vh]"
      >
        {/* Sticky Viewport Frame - Centered in view */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden border-t border-white/10">
          
          {/* Header directly within the locked view */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-2 sm:mb-6 shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-mono-code text-slate-300 uppercase tracking-widest mb-1 font-semibold">
                  <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
                  <span>Production Toolchain (Scroll to Glide)</span>
                </div>
                <h2 className="text-xl sm:text-4xl lg:text-5xl font-display font-semibold text-white tracking-tight leading-[1.15]">
                  Pipelines & <em className="font-serif-italic font-normal text-[#9a9a9a] not-italic text-[1.08em] tracking-tight">Software Toolchain</em>
                </h2>
                <p className="text-[#9a9a9a] text-[11px] sm:text-sm max-w-2xl mt-1 leading-relaxed hidden xs:block">
                  Scroll down to traverse the real-time, simulation, topology, and compositing toolset.
                </p>
              </div>

              {/* Real-Time Center Card Counter */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/15 text-[11px] sm:text-xs font-mono-code text-slate-200 shadow-inner">
                  <span 
                    className="w-2 h-2 rounded-full animate-pulse transition-colors"
                    style={{ 
                      backgroundColor: SOFTWARE_LIST[activeCardIndex]?.themeColor || '#ffffff',
                      boxShadow: `0 0 8px ${SOFTWARE_LIST[activeCardIndex]?.themeColor || '#ffffff'}`
                    }}
                  />
                  <span className="font-bold text-white tracking-wider">{String(activeCardIndex + 1).padStart(2, '0')}</span>
                  <span className="text-slate-500">/</span>
                  <span className="text-slate-400">{String(SOFTWARE_LIST.length).padStart(2, '0')}</span>
                  <span 
                    className="text-[11px] hidden sm:inline ml-1 font-semibold transition-colors"
                    style={{ color: SOFTWARE_LIST[activeCardIndex]?.themeColor || '#ffffff' }}
                  >
                    {SOFTWARE_LIST[activeCardIndex]?.name}
                  </span>
                </div>
              </div>
            </div>

            {/* GRADIENT PROGRESS BAR - Fills from 1st Card (Unreal) to Last Card (EmberGen) */}
            <div className="mt-2.5 sm:mt-5 w-full bg-white/[0.03] p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono-code text-slate-400 mb-1.5 sm:mb-2">
                <div className="flex items-center gap-1.5">
                  <span 
                    className="w-2 h-2 rounded-full border border-white/50 shadow-sm"
                    style={{ backgroundColor: SOFTWARE_LIST[0].themeColor }}
                  />
                  <span className="font-bold" style={{ color: SOFTWARE_LIST[0].themeColor }}>01</span>
                  <span className="text-slate-300 font-medium hidden xs:inline">{SOFTWARE_LIST[0].name}</span>
                </div>
                
                <div className="flex items-center gap-1.5 sm:gap-2 font-semibold">
                  <span className="text-slate-400 tracking-wider text-[9px] sm:text-[11px] uppercase">TOOLCHAIN PROGRESS</span>
                  <span className="text-amber-300 font-mono-code bg-amber-400/10 border border-amber-400/20 px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-xs">
                    {activePercent}%
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-300 font-medium hidden xs:inline">{SOFTWARE_LIST[SOFTWARE_LIST.length - 1].name}</span>
                  <span className="font-bold" style={{ color: SOFTWARE_LIST[SOFTWARE_LIST.length - 1].themeColor }}>10</span>
                  <span 
                    className="w-2 h-2 rounded-full shadow-sm"
                    style={{ backgroundColor: SOFTWARE_LIST[SOFTWARE_LIST.length - 1].themeColor }}
                  />
                </div>
              </div>

              {/* Progress Bar Track */}
              <div className="relative w-full h-2 sm:h-3 rounded-full bg-black/60 p-[2px] border border-white/15 overflow-hidden shadow-inner">
                {/* Subtle track background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-amber-500/10 to-orange-500/10" />

                {/* Animated Gradient Active Fill */}
                <motion.div
                  style={{ width: progressWidth }}
                  className="relative h-full rounded-full overflow-hidden will-change-transform"
                >
                  {/* High-fidelity vivid multi-stop cinema VFX gradient */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      background: 'linear-gradient(90deg, #38bdf8 0%, #fbbf24 12%, #eab308 24%, #3b82f6 36%, #f43f5e 48%, #818cf8 60%, #14b8a6 72%, #06b6d4 84%, #10b981 92%, #f97316 100%)',
                      boxShadow: '0 0 16px rgba(56, 189, 248, 0.7), 0 0 25px rgba(249, 115, 22, 0.5)'
                    }}
                  />
                  {/* High-speed gloss highlight */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[pulse_2s_infinite]" />
                </motion.div>
              </div>

              {/* Interactive Software Milestone Markers */}
              <div className="flex justify-between items-center px-0.5 sm:px-1 mt-1.5 sm:mt-2.5">
                {SOFTWARE_LIST.map((sw, i) => {
                  const isReached = activeCardIndex >= i;
                  const isCurrent = activeCardIndex === i;
                  return (
                    <button
                      key={sw.id}
                      onClick={() => {
                        if (pinContainerRef.current) {
                          const top = pinContainerRef.current.offsetTop;
                          const height = pinContainerRef.current.offsetHeight - window.innerHeight;
                          const targetY = top + (i / (SOFTWARE_LIST.length - 1)) * height;
                          window.scrollTo({ top: targetY, behavior: 'smooth' });
                        }
                      }}
                      className="group/tick flex flex-col items-center justify-center focus:outline-none transition-transform hover:scale-125 cursor-pointer py-1 min-w-[24px] sm:min-w-[32px] min-h-[28px] sm:min-h-[32px]"
                      title={`${String(i + 1).padStart(2, '0')}: ${sw.name}`}
                    >
                      <div 
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                          isCurrent 
                            ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-black' 
                            : isReached 
                              ? 'scale-105 ring-1 ring-white/40' 
                              : 'opacity-40 hover:opacity-90'
                        }`}
                        style={{
                          backgroundColor: sw.themeColor,
                          boxShadow: isCurrent 
                            ? `0 0 12px ${sw.themeColor}, 0 0 4px #ffffff` 
                            : isReached 
                              ? `0 0 6px ${sw.themeColor}90` 
                              : undefined
                        }}
                      />
                      <span 
                        className={`text-[8px] sm:text-[9px] font-mono-code mt-1 transition-colors hidden sm:block font-bold ${
                          isCurrent 
                            ? 'scale-110 drop-shadow' 
                            : isReached 
                              ? 'text-slate-300' 
                              : 'text-slate-600'
                        }`}
                        style={isCurrent ? { color: sw.themeColor } : undefined}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Horizontal Gliding Strip with Center-to-Center Positioning */}
          <div className="w-full relative py-2 sm:py-4">
            <motion.div
              style={{ x: xTransform }}
              className="flex gap-4 sm:gap-6 will-change-transform"
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
                      borderRadius={20}
                      glowRadius={30}
                      edgeSensitivity={28}
                      glowIntensity={isCentered ? 1.2 : 0.7}
                      backgroundColor="#0b0b0e"
                      colors={item.glowColors}
                      onMouseEnter={() => soundFx.playHover()}
                      className="group relative overflow-hidden shadow-2xl transition-all duration-300"
                    >
                      <div className="p-4 sm:p-7 flex flex-col justify-between h-full min-h-[190px] sm:min-h-[250px]">
                        <div className="absolute top-0 right-0 p-3 sm:p-4 font-mono-code text-2xl sm:text-3xl font-bold text-white/5 group-hover:text-white/15 transition-colors pointer-events-none">
                          {String(idx + 1).padStart(2, '0')}
                        </div>

                        <div>
                          {/* Top Accent Pill Badge */}
                          <div className="mb-2.5 sm:mb-4">
                            <span className={`text-[9px] sm:text-[10px] font-mono-code font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border ${item.badgeStyle}`}>
                              {item.badge}
                            </span>
                          </div>

                          {/* Logo and Name */}
                          <div className="flex items-center space-x-2.5 sm:space-x-3.5 mb-1.5 sm:mb-2">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner p-2 sm:p-2.5">
                              <img 
                                src={iconSrc} 
                                alt={item.name} 
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <span className="text-sm sm:text-lg font-display font-bold text-white group-hover:text-sky-300 transition-colors block leading-tight">
                                {item.name}
                              </span>
                              <p className="text-[11px] sm:text-xs font-mono-code text-slate-400 font-medium mt-0.5">
                                {item.category}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2.5 sm:pt-4 border-t border-white/10 mt-2 sm:mt-3">
                          <p className="text-[11px] sm:text-sm text-slate-300 font-normal leading-relaxed">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-2 sm:mt-4 text-center">
            <span className="text-[10px] sm:text-[11px] font-mono-code text-slate-500 uppercase tracking-widest">
              ↓ Scroll to glide through toolchain • Pinned in center
            </span>
          </div>

        </div>
      </div>

      {/* 2. EXPERIENCE HIGHLIGHTS */}
      <div id="experience-section" className="relative z-10 bg-black max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 border-t border-white/10 scroll-mt-16">
        
        <div className="flex items-center justify-between mb-6 sm:mb-8">
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

        {/* Uneven, Asymmetrical Bento Grid sized to content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {experienceHighlights.map((exp) => {
            const IconComponent = exp.icon;
            return (
              <div key={exp.id} className={`${exp.colSpan} flex flex-col`}>
                <BorderGlow
                  borderRadius={exp.borderRadius || 20}
                  glowRadius={32}
                  edgeSensitivity={28}
                  glowIntensity={1.0}
                  backgroundColor="#0b0b0e"
                  colors={exp.glowColors}
                  onMouseEnter={() => soundFx.playHover()}
                  className="shadow-2xl group transition-transform duration-300 hover:-translate-y-0.5 h-full"
                >
                  <div className={`${exp.paddingClass || 'p-5 sm:p-8'} flex flex-col justify-between h-full`}>
                    <div>
                      <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                        <span className={`text-[8.5px] sm:text-[10px] font-mono-code font-bold uppercase tracking-wider px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border ${exp.accent}`}>
                          {exp.badge}
                        </span>
                        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <IconComponent className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                        </div>
                      </div>

                      <h4 className="text-sm sm:text-xl lg:text-2xl font-display font-bold text-white mb-1.5 sm:mb-3">
                        {exp.title}
                      </h4>

                      <p className="text-[11.5px] sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {exp.desc}
                      </p>
                    </div>

                    {exp.stats && (
                      <div className="grid grid-cols-2 gap-2 sm:gap-3.5 mt-3.5 sm:mt-5 pt-3 sm:pt-5 border-t border-white/10">
                        {exp.stats.map((s, idx) => (
                          <div key={idx} className="bg-white/5 p-2.5 sm:p-4 rounded-lg sm:rounded-2xl border border-white/10">
                            <span className="text-lg sm:text-2xl font-display font-black text-white block">
                              {s.val}
                            </span>
                            <span className="text-[9px] sm:text-[11px] font-mono-code text-slate-300">
                              {s.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </BorderGlow>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
