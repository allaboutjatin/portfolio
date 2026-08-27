import React, { useState } from 'react';
import { 
  Film, 
  Play, 
  Layers, 
  ExternalLink,
  Sparkles,
  Radio
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectItem } from '../types';
import { soundFx } from '../utils/audioFx';
import { BorderGlow } from './ui/BorderGlow';
import { useMediaPlayback } from '../context/MediaPlaybackContext';

interface ShowreelBreakdownSectionProps {
  onOpenProjectById?: (projectId: string) => void;
}

export const ShowreelBreakdownSection: React.FC<ShowreelBreakdownSectionProps> = ({
  onOpenProjectById
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS_DATA[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { startPlayback, stopPlayback } = useMediaPlayback();

  const selectedProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  const handleSelectProject = (project: ProjectItem) => {
    soundFx.playClick();
    setSelectedProjectId(project.id);
    setIsPlaying(false);
    stopPlayback();
  };

  return (
    <section id="showreel-section" className="py-12 sm:py-24 relative z-10 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-code text-slate-300 uppercase tracking-widest mb-1.5 sm:mb-2 font-semibold">
            <Film className="w-3.5 h-3.5 text-white" />
            <span>Portfolio & Visual Effects Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-5xl font-display font-semibold text-white tracking-tight leading-[1.15]">
            4K <em className="font-serif-italic font-normal text-[#9a9a9a] not-italic text-[1.08em] tracking-tight">Cinematic</em> Showcase
          </h2>
          <p className="text-[#9a9a9a] text-xs sm:text-base max-w-2xl mt-1.5 sm:mt-2 leading-relaxed">
            Select any project from the interactive playlist to immediately stream its 4K cinematic film, production master audio, and breakdown workflow.
          </p>
        </div>

        {/* ONE UNIFIED MASTER CINEMA WORKSTATION DECK */}
        <BorderGlow
          borderRadius={24}
          glowRadius={38}
          edgeSensitivity={30}
          glowIntensity={0.95}
          backgroundColor="#090a0d"
          colors={['#38bdf8', '#818cf8', '#34d399']}
          className="w-full shadow-2xl overflow-hidden border border-white/10"
        >
          {/* Workstation Top Control Bar */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
              </span>
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                <span>4K CINEMATIC PRODUCTION STREAMER</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-code bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-slate-400">
                DCI 4K • 24 FPS • 48kHz PCM
              </span>
            </div>
          </div>

          {/* Unified Middle Area: 4K Cinema Player (Left) + Interactive Project Playlist (Right) */}
          <div className="p-4 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: 4K Cinema Viewport (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              
              {/* Screen Frame */}
              <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
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
                        startPlayback(selectedProject.title, selectedProject.categoryLabel);
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4 sm:p-6">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-black font-mono-code text-[11px] font-bold w-fit mb-1.5 shadow-lg">
                          <Sparkles className="w-3.5 h-3.5 fill-current" />
                          <span>COMING SOON • IN PRODUCTION</span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                          {selectedProject.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-300 max-w-xl mt-0.5 line-clamp-2">
                          Formula 1 Real-time track cinematic currently being developed in Unreal Engine. High-octane teaser & breakdown release coming soon.
                        </p>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center transition-all group-hover:bg-black/30">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-black translate-x-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 pointer-events-none flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-mono-code text-white">
                        {selectedProject.categoryLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono-code text-emerald-300 font-semibold">
                        {selectedProject.renderEngine}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Metadata Strip Under Player */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-extrabold text-white">
                      {selectedProject.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-mono-code mt-0.5">
                      {selectedProject.subtitle || selectedProject.clientOrContext} • {selectedProject.duration || 'Production Master'}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {onOpenProjectById && (
                      <button
                        type="button"
                        onClick={() => onOpenProjectById(selectedProject.id)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono-code flex items-center space-x-1.5 transition-all cursor-pointer"
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
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all flex items-center justify-center"
                        title="Open in YouTube"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedProject.overview}
                </p>

                {/* Software Stack */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedProject.softwareStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono-code text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Playlist (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-2.5">
              <div className="flex items-center justify-between px-1 mb-1">
                <span className="text-xs font-mono-code text-slate-300 uppercase tracking-wider font-bold">
                  PROJECT PLAYLIST ({PROJECTS_DATA.length})
                </span>
                <span className="text-[10px] font-mono-code text-slate-400">
                  CLICK TO STREAM
                </span>
              </div>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {PROJECTS_DATA.map((project) => {
                  const isSelected = project.id === selectedProjectId;
                  return (
                    <div
                      key={project.id}
                      onClick={() => handleSelectProject(project)}
                      className={`group p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer flex items-center space-x-3.5 ${
                        isSelected
                          ? 'bg-white/10 border-sky-400/50 shadow-lg shadow-sky-500/10'
                          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 border border-white/15 bg-black">
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? 'fill-white text-white' : 'text-slate-300'}`} />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-xs sm:text-sm font-sans font-bold tracking-tight truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {project.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {project.categoryLabel} • {project.renderEngine}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </BorderGlow>

      </div>
    </section>
  );
};


