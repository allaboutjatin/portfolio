import React, { useState } from 'react';
import { 
  Film, 
  Play, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Sliders,
  Tv
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectItem } from '../types';
import { soundFx } from '../utils/audioFx';
import { BorderGlow } from './ui/BorderGlow';

interface ShowreelBreakdownSectionProps {
  onOpenProjectById?: (projectId: string) => void;
}

export const ShowreelBreakdownSection: React.FC<ShowreelBreakdownSectionProps> = ({
  onOpenProjectById
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS_DATA[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const selectedProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  const handleSelectProject = (project: ProjectItem) => {
    soundFx.playClick();
    setSelectedProjectId(project.id);
    setIsPlaying(true);
  };

  return (
    <section id="showreel-section" className="py-24 relative z-10 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-code text-slate-300 uppercase tracking-widest mb-2 font-semibold">
            <Film className="w-3.5 h-3.5 text-white" />
            <span>Portfolio & Visual Effects Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-white tracking-tight leading-[1.15]">
            4K <em className="font-serif-italic font-normal text-[#9a9a9a] not-italic text-[1.08em] tracking-tight">Cinematic</em> Showcase
          </h2>
          <p className="text-[#9a9a9a] text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
            Select any project from the interactive list to immediately load and stream its 4K cinematic film and technical workflow details.
          </p>
        </div>

        {/* Video Player + Selectable Project List Synchronizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Viewport (7 Cols) */}
          <div className="lg:col-span-7">
            <BorderGlow
              borderRadius={24}
              glowRadius={40}
              edgeSensitivity={30}
              glowIntensity={1.0}
              backgroundColor="#0b0b0e"
              colors={['#38bdf8', '#c084fc', '#34d399']}
              className="w-full shadow-2xl overflow-hidden"
            >
              {/* Viewport Frame */}
              <div className="relative aspect-video w-full bg-black overflow-hidden group rounded-t-[23px]">
                {selectedProject.youtubeId && isPlaying ? (
                  <iframe
                    key={selectedProject.youtubeId}
                    src={`https://www.youtube-nocookie.com/embed/${selectedProject.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={`${selectedProject.title} Video Player`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div 
                    className="relative w-full h-full cursor-pointer" 
                    onClick={() => {
                      if (selectedProject.youtubeId) {
                        setIsPlaying(true);
                      } else if (onOpenProjectById) {
                        onOpenProjectById(selectedProject.id);
                      }
                    }}
                  >
                    <img
                      src={selectedProject.heroImage}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    
                    {/* Play / Coming Soon Overlay */}
                    {selectedProject.isComingSoon ? (
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-6 sm:p-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-black font-mono-code text-xs font-bold w-fit mb-2 shadow-lg">
                          <Sparkles className="w-3.5 h-3.5 fill-current" />
                          <span>COMING SOON • IN PRODUCTION</span>
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                          {selectedProject.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
                          Formula 1 Real-time track cinematic currently being developed in Unreal Engine. High-octane teaser & breakdown release coming soon.
                        </p>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center transition-all group-hover:bg-black/30">
                        <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                          <Play className="w-7 h-7 fill-black translate-x-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 pointer-events-none flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono-code text-white">
                        {selectedProject.categoryLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono-code text-emerald-300 font-semibold">
                        {selectedProject.renderEngine}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Control Bar & Specs Under Player */}
              <div className="p-6 bg-gradient-to-b from-[#0b0b0e] to-black border-t border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-white">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono-code mt-0.5">
                      {selectedProject.subtitle || selectedProject.clientOrContext} • {selectedProject.duration || 'Production Master'}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {onOpenProjectById && (
                      <button
                        onClick={() => onOpenProjectById(selectedProject.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono-code flex items-center space-x-1.5 transition-all cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5 text-sky-400" />
                        <span>Breakdown Specs</span>
                      </button>
                    )}
                    {selectedProject.youtubeUrl && (
                      <a
                        href={selectedProject.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
                        title="Open in YouTube"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {selectedProject.overview}
                </p>

                {/* Software Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedProject.softwareStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono-code text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* Selectable Projects List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider font-semibold">
                SELECT PROJECT STREAM ({PROJECTS_DATA.length})
              </span>
              <span className="text-xs font-mono-code text-slate-500">
                CLICK TO SWITCH
              </span>
            </div>

            {PROJECTS_DATA.map((project) => {
              const isSelected = project.id === selectedProjectId;
              return (
                <BorderGlow
                  key={project.id}
                  id={`project-stream-item-${project.id}`}
                  borderRadius={18}
                  glowRadius={25}
                  edgeSensitivity={35}
                  glowIntensity={0.9}
                  backgroundColor={isSelected ? '#14141a' : '#0b0b0e'}
                  colors={isSelected ? ['#38bdf8', '#c084fc', '#34d399'] : ['#808080', '#38bdf8', '#a855f7']}
                  onClick={() => handleSelectProject(project)}
                  className={`cursor-pointer transition-all ${
                    isSelected ? 'ring-1 ring-sky-400/40 shadow-lg' : ''
                  }`}
                >
                  <div className="p-3.5 flex items-center space-x-4">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border border-white/15 bg-black">
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play className={`w-4 h-4 ${isSelected ? 'fill-white text-white' : 'text-slate-300'}`} />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-display font-bold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {project.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5 font-normal">
                        {project.categoryLabel} • {project.renderEngine}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] shrink-0" />
                    )}
                  </div>
                </BorderGlow>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

