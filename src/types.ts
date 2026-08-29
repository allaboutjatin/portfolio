export type ProjectCategory = 
  | 'all'
  | '3d-modeling'
  | 'vfx-simulation'
  | 'lookdev-lighting'
  | 'animation-rigging'
  | 'environments';

export type RenderPassType = 'beauty' | 'wireframe' | 'clay' | 'normal' | 'depth' | 'ao';

export interface BreakdownStep {
  id: string;
  name: string;
  description: string;
  software: string[];
  imageUrl: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: '3d-modeling' | 'vfx-simulation' | 'lookdev-lighting' | 'animation-rigging' | 'environments';
  categoryLabel: string;
  year: string;
  duration?: string;
  clientOrContext: string; // e.g. "Graduation Capstone / Academy Feature", "Commercial Spec LookDev"
  featured: boolean;
  isComingSoon?: boolean;
  comingSoonLabel?: string;
  heroImage: string;
  videoPreviewUrl?: string;
  youtubeId?: string;
  youtubeUrl?: string;
  breakdownYoutubeId?: string;
  breakdownYoutubeUrl?: string;
  breakdownTitle?: string;
  passes: {
    beauty: string;
    wireframe: string;
    clay: string;
    normal: string;
    depth?: string;
    ao?: string;
  };
  polycount?: string;
  renderEngine: string;
  softwareStack: string[];
  overview: string;
  technicalHighlights: string[];
  supervisorReview?: string;
  breakdownPipeline?: BreakdownStep[];
  nodeGraphNotes?: string;
}

export interface SoftwareSkill {
  name: string;
  category: '3D & DCC' | 'VFX & Dynamics' | 'Rendering & Realtime' | 'Texturing & Sculpting' | 'Compositing & Code';
  level: number; // 0 to 100
  experienceYears: string;
  primaryUses: string[];
  iconSlug?: string;
}

export interface RecruiterInquiry {
  name: string;
  company: string;
  email: string;
  roleType: string;
  projectTimeline: string;
  workArrangement: string; // Remote, On-site, Hybrid, Relocation Ready
  message: string;
}
