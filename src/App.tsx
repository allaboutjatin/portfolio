import React, { useState, useEffect, useRef } from 'react';
import { SmoothEntrance } from './components/ui/SmoothEntrance';
import { BackgroundVfxCanvas } from './components/BackgroundVfxCanvas';
import { HeaderNavbar } from './components/HeaderNavbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsGrid } from './components/ProjectsGrid';
import { CinematicShowcaseSection } from './components/CinematicShowcaseSection';
import { PipelineAndSkills } from './components/PipelineAndSkills';
import { AboutAndExperience } from './components/AboutAndExperience';
import { RecruiterContactSection } from './components/RecruiterContactSection';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { FooterHUD } from './components/FooterHUD';
import { SideRays } from './components/SideRays';
import { GhostAIAssistant } from './components/GhostAIAssistant';
import { ProjectItem } from './types';
import { PROJECTS_DATA } from './data/projectsData';
import { MediaPlaybackProvider } from './context/MediaPlaybackContext';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero-section');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [raysOpacity, setRaysOpacity] = useState(0);
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

  // Force reset scroll to top on initial page load / refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    // Secondary safety check in case layout/canvas causes layout shift
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Track active section on scroll with IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      'hero-section',
      'showreel-section',
      'projects-section',
      'pipeline-section',
      'experience-section',
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

  // Track when hero section/prism leaves sight to fade in SideRays on the right
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero-section');
      if (!heroEl) return;

      const rect = heroEl.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;
      
      // Start fading in as the hero section scrolls up (when top half is scrolled past)
      const fadeStart = heroHeight * 0.6;
      const fadeEnd = 0;

      if (rect.bottom >= fadeStart) {
        setRaysOpacity(0);
      } else if (rect.bottom <= fadeEnd) {
        setRaysOpacity(1);
      } else {
        const progress = (fadeStart - rect.bottom) / (fadeStart - fadeEnd);
        setRaysOpacity(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MediaPlaybackProvider>
      <SmoothEntrance>
        <div className="min-h-screen bg-[#07080b] text-[#e8ebf0] selection:bg-[#e2b170] selection:text-black font-sans relative">
          
          {/* Dynamic Parallax Background VFX Video & 3D Interactive Canvas */}
          <BackgroundVfxCanvas />

          {/* Right-Side Volumetric Light Rays (fades in as Hero Prism scrolls away - Desktop only for performance) */}
          <div
            className="hidden md:block fixed top-0 right-0 w-full sm:w-[650px] md:w-[800px] lg:w-[950px] h-screen pointer-events-none z-20 mix-blend-screen transition-opacity duration-500 ease-out"
            style={{
              opacity: raysOpacity
            }}
            aria-hidden="true"
          >
            <SideRays
              speed={2.5}
              rayColor1="#EAB308"
              rayColor2="#96c8ff"
              intensity={2}
              spread={2}
              origin="top-right"
              tilt={0}
              saturation={1.5}
              blend={0.75}
              falloff={1.6}
              opacity={1.0}
            />
          </div>

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
              onOpenContactModal={() => setIsContactModalOpen(true)}
            />

            {/* 2. 4K Cinematic Sequence Showcase */}
            <CinematicShowcaseSection
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

          {/* Bottom-Right Floating Interactive Ghost AI Client Agent */}
          <GhostAIAssistant
            onOpenContactModal={() => setIsContactModalOpen(true)}
            onNavigateToSection={handleNavigate}
          />

        </div>
      </SmoothEntrance>
    </MediaPlaybackProvider>
  );
}
