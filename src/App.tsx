import React, { useState, useEffect, useRef } from 'react';
import { BackgroundVfxCanvas } from './components/BackgroundVfxCanvas';
import { HeaderNavbar } from './components/HeaderNavbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ShowreelBreakdownSection } from './components/ShowreelBreakdownSection';
import { PipelineAndSkills } from './components/PipelineAndSkills';
import { AboutAndExperience } from './components/AboutAndExperience';
import { RecruiterContactSection } from './components/RecruiterContactSection';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { FooterHUD } from './components/FooterHUD';
import { ProjectItem } from './types';
import { PROJECTS_DATA } from './data/projectsData';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero-section');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll handler to target section
  const handleNavigate = (sectionId: string) => {
    isProgrammaticScrollRef.current = true;
    setActiveSection(sectionId);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 950);

    if (sectionId === 'hero-section') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 65;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToTop = () => {
    isProgrammaticScrollRef.current = true;
    setActiveSection('hero-section');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 950);
  };

  // Track active section on scroll with IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      'hero-section',
      'showreel-section',
      'projects-section',
      'pipeline-section',
      'about-section',
      'recruiter-contact'
    ];

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isProgrammaticScrollRef.current) {
              setActiveSection(id);
            }
          });
        },
        { 
          rootMargin: '-15% 0px -45% 0px',
          threshold: 0.1 
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#07080b] text-[#e8ebf0] selection:bg-[#e2b170] selection:text-black font-sans relative">
      
      {/* Dynamic Parallax Background VFX Video & 3D Interactive Canvas */}
      <BackgroundVfxCanvas />

      {/* Main Studio Header with Contact Modal Trigger */}
      <HeaderNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Main App Content Sections in exact shelf order */}
      <main className="relative z-10">
        
        {/* 1. Hero Section */}
        <HeroSection
          onOpenReel={() => handleNavigate('showreel-section')}
          onExploreProjects={() => handleNavigate('projects-section')}
          onOpenRecruiterContact={() => handleNavigate('recruiter-contact')}
        />

        {/* 2. Interactive 2026 Showreel & Shot Breakdown Sheet */}
        <ShowreelBreakdownSection
          onOpenProjectById={(projectId) => {
            const found = PROJECTS_DATA.find((p) => p.id === projectId);
            if (found) setSelectedProject(found);
          }}
        />

        {/* 3. Projects Showcase Bento Grid */}
        <ProjectsGrid
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 4. VFX Pipeline & Software Toolchain (Locked center-to-center scroll) */}
        <PipelineAndSkills />

        {/* 5. About Jatin & Experience */}
        <AboutAndExperience
          onOpenContactModal={() => setIsContactModalOpen(true)}
        />

        {/* 6. Recruiter & Direct Dispatch Hub */}
        <RecruiterContactSection />

      </main>

      {/* Technical HUD Footer */}
      <FooterHUD
        onScrollToTop={handleScrollToTop}
        onNavigate={handleNavigate}
      />

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Apple Liquid Glass Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

    </div>
  );
}
