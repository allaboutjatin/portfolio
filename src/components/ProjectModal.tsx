import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Film, 
  Play, 
  ExternalLink, 
  Tv, 
  CheckCircle2, 
  Sliders
} from 'lucide-react';
import { ProjectItem } from '../types';
import { soundFx } from '../utils/audioFx';
import { useMediaPlayback } from '../context/MediaPlaybackContext';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'video' | 'breakdownVideo'>('video');
  const { startPlayback, stopPlayback } = useMediaPlayback();

  // Prevent background scroll, sync audio playback, and support Escape key
  useEffect(() => {
    if (!project) {
      stopPlayback();
      return;
    }

    if (project.youtubeId || project.breakdownYoutubeId) {
      startPlayback(project.title, project.categoryLabel);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFx.playClick();
        stopPlayback();
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      stopPlayback();
    };
  }, [project, onClose, startPlayback, stopPlayback]);

  // Reset tab when project changes
  useEffect(() => {
    setActiveTab('video');
  }, [project?.id]);

  const hasBreakdownVideo = Boolean(project?.breakdownYoutubeId || project?.breakdownYoutubeUrl);

  return (
    <AnimatePresence>
      {project && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* Dynamic Frosted Liquid Glass Backdrop */}
          <motion.div 
            key="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black/80 backdrop-blur-2xl"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
          />

          {/* Modal Card with Dark Luxury Surface */}
          <motion.div 
            key="project-modal-dialog"
            initial={{ opacity: 0, scale: 0.92, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{
              duration: 0.48,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative bg-[#0b0b0e] w-full max-w-5xl rounded-[28px] sm:rounded-[32px] border border-white/20 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col max-h-[92vh] z-10 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Top Header Bar */}
            <div className="px-4 py-3.5 sm:px-6 sm:py-4 bg-[#111115]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2.5 sm:space-x-3 overflow-hidden">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                  <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h3 id="project-modal-title" className="font-sans font-bold text-sm sm:text-lg text-white tracking-tight truncate">
                      {project.title}
                    </h3>
                    <span className="px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono-code bg-white/10 text-white border border-white/15 rounded-full font-semibold">
                      {project.categoryLabel}
                    </span>
                    {project.isComingSoon ? (
                      <span className="px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono-code bg-amber-400 text-black font-bold rounded-md">
                        COMING SOON
                      </span>
                    ) : (
                      <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-mono-code bg-white/5 text-slate-400 rounded-md">
                        {project.year}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-mono-code mt-0.5 truncate">{project.subtitle || project.clientOrContext}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {project.youtubeUrl && (
                  <a
                    href={project.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-mono-code transition-all duration-300 min-h-[36px] hover:scale-105 active:scale-95"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3 h-3 text-sky-400" />
                  </a>
                )}

                <button
                  id="close-project-modal-btn"
                  onClick={() => {
                    soundFx.playClick();
                    onClose();
                  }}
                  className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/15 transition-all duration-300 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center hover:scale-105 active:scale-95"
                  aria-label="Close Project Modal"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-4 sm:p-7 space-y-4 sm:space-y-6">
              
              {/* Main Visual Showcase (Cinematic Video / BTS Breakdown) */}
              <div className="space-y-3">
                
                {/* View Mode Navigation Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                  <div className="flex flex-wrap gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/10 text-xs font-mono-code">
                    
                    {/* Main Video Tab */}
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setActiveTab('video');
                      }}
                      className={`px-3.5 py-1.5 rounded-xl transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                        activeTab === 'video'
                          ? 'bg-white text-black font-bold shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{project.isComingSoon ? 'Cinematic Preview' : 'Cinematic Film'}</span>
                    </button>

                    {/* BTS Breakdown Video Tab (if available) */}
                    {hasBreakdownVideo && (
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setActiveTab('breakdownVideo');
                        }}
                        className={`px-3.5 py-1.5 rounded-xl transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                          activeTab === 'breakdownVideo'
                            ? 'bg-sky-500 text-white font-bold shadow-md'
                            : 'text-sky-300 hover:text-white bg-sky-950/40 hover:bg-sky-900/60'
                        }`}
                      >
                        <Tv className="w-3.5 h-3.5" />
                        <span>🔥 BTS & Breakdown Video</span>
                      </button>
                    )}
                  </div>

                  <div className="hidden sm:flex items-center space-x-2 text-xs font-mono-code text-slate-400">
                    <Sliders className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-semibold text-white">{project.renderEngine}</span>
                  </div>
                </div>

                {/* Viewport Frame */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                  {activeTab === 'video' && project.youtubeId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
                      title={`${project.title} Video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : activeTab === 'breakdownVideo' && project.breakdownYoutubeId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${project.breakdownYoutubeId}?autoplay=1&rel=0`}
                      title={`${project.title} Breakdown Video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Description & Technical Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left: Overview & Narrative (7 Cols) */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono-code font-bold mb-2">
                      PROJECT NARRATIVE & CHALLENGE
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.overview}
                    </p>
                  </div>

                  {project.supervisorReview && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1">
                      <span className="text-[10px] font-mono-code uppercase font-bold text-sky-400 block">
                        SUPERVISOR & CLIENT EVALUATION
                      </span>
                      <p>{project.supervisorReview}</p>
                    </div>
                  )}

                  {/* Key Technical Highlights */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono-code font-bold mb-2.5">
                      TECHNICAL DELIVERABLES
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {project.technicalHighlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 font-mono-code bg-white/5 p-2.5 rounded-xl border border-white/10">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Technical Specs & Toolchain (5 Cols) */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono-code font-bold">
                      PRODUCTION METADATA
                    </h4>
                    
                    <div className="space-y-3 text-xs font-mono-code">
                      <div className="flex justify-between pb-2 border-b border-white/10">
                        <span className="text-slate-400">Context:</span>
                        <span className="text-white font-bold">{project.clientOrContext}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-white/10">
                        <span className="text-slate-400">Render Engine:</span>
                        <span className="text-emerald-400 font-bold">{project.renderEngine}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-white/10">
                        <span className="text-slate-400">Polycount / Mesh:</span>
                        <span className="text-sky-400 font-bold">{project.polycount || 'Nanite Geometry'}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-white/10">
                        <span className="text-slate-400">Duration / Scope:</span>
                        <span className="text-slate-300 font-bold">{project.duration || 'Full Production'}</span>
                      </div>
                    </div>

                    {/* Software Stack */}
                    <div className="pt-2">
                      <span className="text-[10px] text-slate-400 font-mono-code uppercase block mb-2 font-bold">
                        SOFTWARE SUITE
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.softwareStack.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono-code text-white">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
