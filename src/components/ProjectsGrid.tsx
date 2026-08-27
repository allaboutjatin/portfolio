import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  ArrowUpRight, 
  Eye
} from 'lucide-react';
import { ProjectItem } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { soundFx } from '../utils/audioFx';
import { BorderGlow } from './ui/BorderGlow';

interface ProjectsGridProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onSelectProject }) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <section id="projects-section" className="py-12 sm:py-24 relative z-10 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <h2 className="text-2xl sm:text-5xl font-display font-semibold text-white tracking-tight leading-[1.15]">
              Featured <em className="font-serif-italic font-normal text-[#9a9a9a] not-italic text-[1.08em] tracking-tight">3D & VFX</em> Projects
            </h2>
            <p className="text-[#9a9a9a] text-xs sm:text-base max-w-2xl mt-1.5 sm:mt-2 leading-relaxed">
              Have a look at all the projects created so far, featuring photoreal 3D cinematics, technical breakdowns, procedural simulations, and high-end visual productions.
            </p>
          </div>

          <div className="font-mono-code text-[11px] sm:text-xs text-slate-300 bg-white/5 border border-white/15 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl w-fit">
            <span className="text-white font-bold">{PROJECTS_DATA.length}</span> PROJECTS AVAILABLE
          </div>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {PROJECTS_DATA.map((project) => {
            return (
              <BorderGlow
                key={project.id}
                id={`project-card-${project.id}`}
                borderRadius={20}
                glowRadius={30}
                edgeSensitivity={28}
                glowIntensity={1.0}
                backgroundColor="#0b0b0e"
                colors={['#38bdf8', '#c084fc', '#34d399']}
                onMouseEnter={() => {
                  setHoveredProjectId(project.id);
                  soundFx.playHover();
                }}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => {
                  soundFx.playClick();
                  onSelectProject(project);
                }}
                className="group cursor-pointer hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
              >
                <div className="flex flex-col justify-between h-full">
                  {/* Visual Preview Frame */}
                  <div className="relative h-48 sm:h-72 w-full overflow-hidden bg-black rounded-t-[19px]">
                    
                    {/* Primary Beauty / Thumbnail Image */}
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
                    />

                    {project.isComingSoon && (
                      <div className="absolute top-3 right-3 pointer-events-none">
                        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-amber-400 text-[9px] sm:text-[10px] font-mono-code text-black font-extrabold tracking-wider shadow-sm animate-pulse">
                          COMING SOON
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Information */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg sm:text-xl font-sans font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                      </div>
                      
                      <p className="text-[11px] sm:text-xs font-mono-code text-slate-400 mt-0.5 sm:mt-1">
                        {project.subtitle || project.clientOrContext} • <span className="text-emerald-400">{project.renderEngine}</span>
                      </p>

                      <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 mt-2 leading-relaxed">
                        {project.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            );
          })}
        </div>

      </div>
    </section>
  );
};
