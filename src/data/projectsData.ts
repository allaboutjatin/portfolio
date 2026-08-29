import { ProjectItem, SoftwareSkill } from '../types';
import f1SunsetThumbnail from '../assets/images/f1_car_sunset_1787301512500.jpg';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-redline',
    title: 'PROJECT REDLINE',
    subtitle: 'Unreal Engine 5.6 Automotive Cinematic & Full BTS Breakdown',
    category: 'lookdev-lighting',
    categoryLabel: 'Automotive Cinematic & LookDev',
    year: '2025 - 2026',
    duration: '6 Weeks',
    clientOrContext: 'Unreal Engine 5.6 Showcase & Technical Direction Study',
    featured: true,
    heroImage: 'https://img.youtube.com/vi/FTV57q6M0j4/maxresdefault.jpg',
    videoPreviewUrl: 'https://img.youtube.com/vi/FTV57q6M0j4/maxresdefault.jpg',
    youtubeId: 'FTV57q6M0j4',
    youtubeUrl: 'https://youtu.be/FTV57q6M0j4',
    breakdownYoutubeId: 'T4Y2TXVtlW4',
    breakdownYoutubeUrl: 'https://youtu.be/T4Y2TXVtlW4',
    breakdownTitle: 'How I Made Project REDLINE🎬🔥 in Unreal Engine 5.6 — Unreal Engine 5 Breakdown & BTS',
    passes: {
      beauty: 'https://img.youtube.com/vi/FTV57q6M0j4/maxresdefault.jpg',
      clay: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80',
      wireframe: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80',
      normal: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1400&q=80',
      depth: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80',
      ao: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80'
    },
    polycount: '1.85M Polygons (Subdivision Surfaces & Nanite Mesh)',
    renderEngine: 'Unreal Engine 5.6 (Lumen, MRQ & Sub-Surface Paint)',
    softwareStack: [
      'Unreal Engine 5',
      'Autodesk Maya',
      'Adobe Photoshop',
      'Adobe Premiere Pro',
      'Sketchfab',
      'Ableton Live Suite 12',
      'Quixel Megascans'
    ],
    overview: 'High-octane automotive cinematic created in Unreal Engine 5.6 showcasing photorealistic supercar paint shaders, dynamic high-speed camera tracking, custom Lumen bounce lighting, and realistic wheel physics. Includes an extensive step-by-step breakdown and BTS video.',
    technicalHighlights: [
      'Authored multi-coat clearcoat automotive shaders with dynamic anisotropic reflection flakes and heat-tinted carbon fiber textures.',
      'Engineered cinematic camera rigs in UE 5.6 Sequencer with physical sensor lenses, anamorphic bokeh, and motion-matched shutter angles.',
      'Utilized Lumen hardware ray tracing for real-time bounce illumination across aerodynamic body panels and asphalt ground contact.',
      'Rendered in 32-bit linear EXRs via Movie Render Queue and finalized in DaVinci Resolve Studio with ACEScg color science.'
    ],
    supervisorReview: '"Stunning lighting and camera choreography. The paint shader depth, velocity blur, and behind-the-scenes Unreal Engine 5.6 technical breakdown demonstrate professional-grade production mastery." – Senior Automotive CGI Director',
    breakdownPipeline: [
      {
        id: 'redline-1',
        name: '01. CAD Preparation & Quad Sub-D Modeling',
        description: 'Topology optimization in Autodesk Maya ensuring pristine G2 surface curvature continuity with zero reflection pinching.',
        software: ['Autodesk Maya', 'Sub-D Tools'],
        imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'redline-2',
        name: '02. PBR Texturing & Multi-Layer Clearcoat',
        description: 'Multi-layer car paint material graph in Substance 3D Painter featuring micro-flake sparkle, orange peel normal maps, and carbon fiber weave.',
        software: ['Substance 3D Painter', 'Substance Designer'],
        imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'redline-3',
        name: '03. UE 5.6 Lighting, Sequencer & Camera Rigs',
        description: 'Dynamic camera tracking in Unreal Engine 5.6 Sequencer with custom Crane/Rail rigs, Lumen ray tracing, and asphalt wetness shaders.',
        software: ['Unreal Engine 5.6', 'Lumen GI'],
        imageUrl: 'https://img.youtube.com/vi/T4Y2TXVtlW4/maxresdefault.jpg'
      },
      {
        id: 'redline-4',
        name: '04. BTS Breakdown, ACEScg Color & Sound Master',
        description: 'Mastered in DaVinci Resolve Studio with optical motion blur, anamorphic flare highlights, and behind-the-scenes tutorial production.',
        software: ['DaVinci Resolve', 'Nuke 15'],
        imageUrl: 'https://img.youtube.com/vi/FTV57q6M0j4/maxresdefault.jpg'
      }
    ],
    nodeGraphNotes: 'Unreal Engine 5.6 Master Material Graph with Layered Car Paint (Base Coat, Flake Specular, Clearcoat Normal, Dirt Anchor Mask).'
  },
  {
    id: 'mexicana-desert-fuel',
    title: 'MEXICANA',
    subtitle: 'MEXICANA | Unreal Engine 5 Automotive Cinematic | Desert Fuel Station',
    category: 'environments',
    categoryLabel: 'Automotive & Environment Cinematic',
    year: '2025',
    duration: '4 Weeks',
    clientOrContext: 'Automotive Environment & Cinematic Storytelling Study',
    featured: true,
    heroImage: 'https://img.youtube.com/vi/c7j6qtnMbQU/maxresdefault.jpg',
    videoPreviewUrl: 'https://img.youtube.com/vi/c7j6qtnMbQU/maxresdefault.jpg',
    youtubeId: 'c7j6qtnMbQU',
    youtubeUrl: 'https://youtu.be/c7j6qtnMbQU',
    passes: {
      beauty: 'https://img.youtube.com/vi/c7j6qtnMbQU/maxresdefault.jpg',
      clay: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80',
      wireframe: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80',
      normal: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1400&q=80',
      depth: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80'
    },
    polycount: '4.2M Nanite Meshes & Dense Foliage Instances',
    renderEngine: 'Unreal Engine 5 (Lumen + Nanite)',
    softwareStack: [
      'Unreal Engine 5',
      'DaVinci Resolve Studio',
      'Adobe Premiere Pro',
      'Blender',
      'Sketchfab',
      'Autodesk Maya',
      'Adobe Photoshop'
    ],
    overview: 'A gritty, atmospheric desert gas station automotive cinematic rendered in Unreal Engine 5. Explores dusty arid lighting, weathered neon signage, heat distortion, octane-fueled reflections, and realistic environmental storytelling.',
    technicalHighlights: [
      'Modeled and textured a weathered mid-century desert gas station with layered grunge, peeling paint, and rusted metal trims.',
      'Created dynamic desert wind particle systems with rolling dust motes, dry tumbleweeds, and atmospheric heat haze.',
      'Configured warm sunset directional lighting paired with glowing neon tube emissives bouncing via Lumen real-time GI.',
      'Graded in DaVinci Resolve to achieve a warm 35mm retro cinematic film look with custom optical halation and grain.'
    ],
    supervisorReview: '"Superb environmental mood and lighting contrast. The transition from intense desert sun to the neon shadows of the fuel station tells a compelling cinematic story." – Environment Lead'
  },
  {
    id: 'f1-unreal-cinematic',
    title: 'F1 | AN UNREAL ENGINE CINEMATIC',
    subtitle: 'F1 | An Unreal engine cinematic — Formula 1 Track Study',
    category: 'lookdev-lighting',
    categoryLabel: 'Motorsport & Automotive Cinematic',
    year: '2026',
    duration: 'In Production',
    clientOrContext: 'Formula 1 Real-Time Track Cinematic & Technical Direction',
    featured: true,
    isComingSoon: true,
    comingSoonLabel: 'COMING SOON',
    heroImage: f1SunsetThumbnail,
    passes: {
      beauty: f1SunsetThumbnail,
      clay: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80',
      wireframe: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80',
      normal: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1400&q=80'
    },
    polycount: '2.4M Triangles (Class-A Motorsport Surface & Nanite Assets)',
    renderEngine: 'Unreal Engine 5.6 (Lumen, MRQ & Sub-Surface Carbon)',
    softwareStack: ['Unreal Engine 5.6', 'Autodesk Maya', 'Substance 3D Painter', 'SideFX Houdini', 'DaVinci Resolve'],
    overview: 'High-octane Formula 1 cinematic sequence currently in development in Unreal Engine 5.6. Features precision aerodynamic chassis CAD surfaces, thermal brake rotor glow, heat haze distortion, dynamic tire wear physics, and ultra-high-speed camera tracking.',
    technicalHighlights: [
      'Class-A CAD surface conversion and Sub-D topology optimization for aerodynamic F1 winglets and diffuser vanes.',
      'Authored multi-layer raw carbon fiber shaders with custom anisotropic reflection angles and heat-reflective foil.',
      'Dynamic thermal brake glow material responding to deceleration curves with procedural spark particle systems.',
      'Virtual camera sensor matching real-world broadcast trackside telephoto rigs with realistic focal breathing and motion blur.'
    ],
    supervisorReview: '"Currently in active production. Initial lookdev frames and high-speed camera choreographies demonstrate cutting-edge Unreal Engine 5.6 motorsport realism." – Studio Production Lead',
    nodeGraphNotes: 'Unreal Engine 5.6 Master Shader: Dynamic Carbon Fiber Weave with Anisotropic Highlight Rotation and Thermal Brake Glow Emissive Driver.'
  },
  {
    id: 'bharat-petroleum-bpcl',
    title: 'BHARAT PETROLEUM (BPCL)',
    subtitle: 'Bharat petroleum (Commercial project) | BPCL',
    category: 'vfx-simulation',
    categoryLabel: 'Commercial CGI & Brand Film',
    year: '2025',
    duration: '3 Weeks',
    clientOrContext: 'Commercial Project | Bharat Petroleum (BPCL)',
    featured: true,
    heroImage: 'https://img.youtube.com/vi/oQ7BbQ32yuE/maxresdefault.jpg',
    videoPreviewUrl: 'https://img.youtube.com/vi/oQ7BbQ32yuE/maxresdefault.jpg',
    youtubeId: 'oQ7BbQ32yuE',
    youtubeUrl: 'https://youtu.be/oQ7BbQ32yuE',
    passes: {
      beauty: 'https://img.youtube.com/vi/oQ7BbQ32yuE/maxresdefault.jpg',
      clay: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80',
      wireframe: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80',
      normal: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1400&q=80'
    },
    polycount: '620K Quads (Class-A Precision CAD / Sub-D Mesh)',
    renderEngine: 'Unreal Engine 5 & Karma XPU',
    softwareStack: [
      'Unreal Engine 5',
      'Adobe Premiere Pro',
      'Autodesk 3ds Max',
      'Autodesk Maya',
      'Autodesk AutoCAD',
      'Adobe Photoshop',
      'Quixel Megascans'
    ],
    overview: 'Commercial 3D production for Bharat Petroleum (BPCL). Features high-precision fuel dispensing mechanics, viscous fluid dynamics, sleek corporate brand lighting, and broadcast-ready commercial motion design.',
    technicalHighlights: [
      'High-precision CAD model cleanup and Sub-D optimization for industrial fuel dispensers and pump nozzles.',
      'Simulated fluid fuel flow dynamics in Houdini with viscosity constraints and glass refraction shaders.',
      'Commercial studio look development with clean chrome reflections, branded vibrant decals, and macro depth-of-field closeups.',
      'Final broadcast mastering adhering to broadcast color specifications and dynamic camera choreography.'
    ],
    supervisorReview: '"Clean, crisp commercial execution. The product lighting and polished material finishes meet highest agency broadcast standards." – Commercial VFX Producer'
  },
  {
    id: 'the-lost-castle',
    title: 'THE LOST CASTLE',
    subtitle: 'The Lost Castle | Unreal Engine Cinematic',
    category: 'environments',
    categoryLabel: 'Environment Art & Cinematic Level Design',
    year: '2025',
    duration: '5 Weeks',
    clientOrContext: 'The Lost Castle | Unreal Engine Worldbuilding Cinematic',
    featured: true,
    heroImage: 'https://img.youtube.com/vi/3OX753L0sIg/maxresdefault.jpg',
    videoPreviewUrl: 'https://img.youtube.com/vi/3OX753L0sIg/maxresdefault.jpg',
    youtubeId: '3OX753L0sIg',
    youtubeUrl: 'https://youtu.be/3OX753L0sIg',
    passes: {
      beauty: 'https://img.youtube.com/vi/3OX753L0sIg/maxresdefault.jpg',
      clay: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80',
      wireframe: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80',
      normal: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1400&q=80',
      depth: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80'
    },
    polycount: '12.4M Triangles (Nanite Virtualized Geometry)',
    renderEngine: 'Unreal Engine 5 (Lumen + Nanite + Virtual Shadow Maps)',
    softwareStack: [
      'Unreal Engine 5',
      'Adobe Photoshop',
      'Adobe Premiere Pro',
      'Quixel Megascans'
    ],
    overview: 'An epic cinematic journey into an ancient forgotten stone castle perched on mist-shrouded mountain cliffs. Features dense ivy foliage, ancient masonry displacement, volumetric sun shafts, and sweeping aerial camera maneuvers in Unreal Engine.',
    technicalHighlights: [
      'Constructed massive ancient gothic ruins using Nanite geometry for infinite LOD transitions with zero pop-in.',
      'Integrated SpeedTree cinematic wind and ivy growth simulation across ancient stone arches and battlement walls.',
      'Designed volumetric exponential height fog with directional inscattering and dramatic god rays cutting through cloud cover.',
      'Choreographed sweeping aerial drone shots with smooth spline interpolation and cinematic anamorphic lens distortion.'
    ],
    supervisorReview: '"Awe-inspiring architectural scale and atmosphere. The volumetric light shafts cutting through the castle ruins create incredible emotional depth." – Principal Cinematic Artist'
  },
  {
    id: 'the-beach',
    title: 'THE BEACH',
    subtitle: 'Beach | Unreal Engine Cinematic',
    category: 'environments',
    categoryLabel: 'Ocean Dynamics & Photoreal Environment',
    year: '2025',
    duration: '3 Weeks',
    clientOrContext: 'Beach | Unreal Engine Coastal Lighting & Water Study',
    featured: true,
    heroImage: 'https://img.youtube.com/vi/mwZ8coCUlPI/maxresdefault.jpg',
    videoPreviewUrl: 'https://img.youtube.com/vi/mwZ8coCUlPI/maxresdefault.jpg',
    youtubeId: 'mwZ8coCUlPI',
    youtubeUrl: 'https://youtu.be/mwZ8coCUlPI',
    passes: {
      beauty: 'https://img.youtube.com/vi/mwZ8coCUlPI/maxresdefault.jpg',
      clay: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80',
      wireframe: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80',
      normal: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1400&q=80'
    },
    polycount: '8.6M Instanced Foliage & Water Surface Mesh',
    renderEngine: 'Unreal Engine 5 (Lumen + Single Layer Water Shading)',
    softwareStack: [
      'Unreal Engine 5',
      'Adobe Photoshop',
      'Adobe Premiere Pro',
      'Quixel Megascans'
    ],
    overview: 'A photorealistic coastal beach environment cinematic capturing gentle wave breaks, underwater caustic light patterns, wet sand specular transitions, and pristine coastal atmosphere under natural daylight.',
    technicalHighlights: [
      'Implemented Unreal Engine Single Layer Water system with custom Gerstner wave displacement and dynamic foam shorelines.',
      'Authored wet sand shaders using vertex distance blending and specular roughness falloff for realistic tidal moisture.',
      'Engineered underwater caustic light refraction projections dancing on submerged sea floor rocks and coral geometry.',
      'Real-time natural sun and sky daylight lighting using physical atmospheric transmittance and Rayleigh scattering.'
    ],
    supervisorReview: '"Incredible water caustics and shoreline shader transitions. The sense of natural sunlight on coastal water is strikingly photorealistic." – Technical Art Director'
  }
];

export const SOFTWARE_SKILLS: SoftwareSkill[] = [
  {
    name: 'Unreal Engine 5.5 / 5.6',
    category: 'Rendering & Realtime',
    level: 96,
    experienceYears: '3+ Years',
    primaryUses: ['Lumen & Nanite architectures', 'Sequencer cinematics & camera rigs', 'Movie Render Queue (MRQ)', 'Single Layer Water & RVT']
  },
  {
    name: 'Autodesk Maya',
    category: '3D & DCC',
    level: 95,
    experienceYears: '4 Years',
    primaryUses: ['Hard-surface Sub-D modeling', 'UV mapping / UDIM layout', 'Clean topology optimization', 'Scene layout & CAD conversion']
  },
  {
    name: 'SideFX Houdini 20',
    category: 'VFX & Dynamics',
    level: 92,
    experienceYears: '3 Years',
    primaryUses: ['FLIP fluid simulation', 'Sparse Pyro combustion', 'RBD Bullet destruction', 'VEX scripting & Solaris USD']
  },
  {
    name: 'Substance 3D Painter & Designer',
    category: 'Texturing & Sculpting',
    level: 94,
    experienceYears: '4 Years',
    primaryUses: ['Multi-UDIM automotive clearcoat shaders', 'Procedural grunge & weathering', 'Custom smart materials', 'Normal & curvature baking']
  },
  {
    name: 'Foundry Nuke / NukeX',
    category: 'Compositing & Code',
    level: 89,
    experienceYears: '3 Years',
    primaryUses: ['Multi-channel EXR comp', 'Cryptomatte relighting', 'Deep compositing', 'Camera projection & lens distortion']
  },
  {
    name: 'DaVinci Resolve Studio',
    category: 'Compositing & Code',
    level: 92,
    experienceYears: '3 Years',
    primaryUses: ['ACEScg color grading', 'Film stock emulation (Halation & Grain)', 'Audio sound design master', 'Commercial delivery exports']
  },
  {
    name: 'ZBrush',
    category: 'Texturing & Sculpting',
    level: 88,
    experienceYears: '3 Years',
    primaryUses: ['High-poly hard-surface booleans', 'Architectural stone detailing', 'Micro-pore alpha texturing']
  },
  {
    name: 'SpeedTree & Quixel Megascans',
    category: 'Rendering & Realtime',
    level: 90,
    experienceYears: '3 Years',
    primaryUses: ['Cinematic wind physics', 'Dynamic foliage generation', 'High-res photogrammetry asset integration']
  }
];

export const ARTIST_BIO = {
  name: 'Jatin Kumar',
  title: '3D Artist • Creative Technologist • Real-Time Technical Director',
  tagline: 'Unreal Engine 5, Houdini & Real-Time Cinematic Workflows',
  status: 'Open to full-time & freelance opportunities',
  email: 'k.jatinofficial@gmail.com',
  location: 'Noida, India',
  artstation: 'https://www.artstation.com/allaboutjatin',
  degree: '3D Animation, VFX and CGI',
  gradYear: 'Production Ready',
  awards: [
    'Over 4+ Years High-Profile Broadcast & Digital Media Production Experience',
    'Production Lead for Studios with 1.5M+ Digital Audience & Subscribers',
    'Coverage of National-Level Events & Renowned Public Figures'
  ],
  bioText: `Hi, I’m Jatin 👋

a 3D Artist, creative technologist, and that multitalented guy in your organisation who somehow ends up knowing a little bit of everything.

My main focus is Unreal Engine 5, Houdini, and real-time cinematic workflows 🎬✨. I enjoy building environments, creating cinematic experiences, developing procedural assets, and exploring VFX and technical workflows for interactive and cinematic projects.

Before moving into 3D, I spent 4+ years in media production, working across live events, photography, videography, editing, podcast production, and live streaming. I’ve had the opportunity to work with teams from News Nation, Zee News, Doordarshan, and other media organisations, while also working alongside news anchors and production professionals.

I’ve contributed to the production and coverage of national-level events attended by distinguished guests, including the former President of India, State Governors, Chief Ministers, Deputy Chief Ministers, Bollywood personalities, and other public figures.

I’m also part of a production studio with a combined audience of 1.5M+ followers and subscribers across multiple digital platforms. Working in that environment taught me how to handle tight deadlines, adapt quickly, collaborate across creative and technical teams, and ----- most importantly ----- figure things out when there isn’t a manual.

Outside of 3D, I’m comfortable with video production & post-production, PC hardware and software troubleshooting, and basic web development. They may not all be my primary specialisations, but having a broad technical and creative skill set has definitely made me a more versatile problem-solver.

For anything else feel free to drop me a DM or get in touch with me directly at k.jatinofficial@gmail.com 💌

🎯 Currently looking for:
Opportunities in Real-Time 3D, Unreal Engine, VFX, and cinematic production where I can contribute creatively, solve technical problems, learn from experienced artists, and hopefully become the multitalented guy you’re glad you hired. 🚀

📍 Noida, India
💼 Open to full-time & freelance opportunities
🎨 ArtStation: https://www.artstation.com/allaboutjatin

If you’re working in Unreal Engine, Houdini, VFX, real-time graphics, or cinematic production, let’s connect! 🤝`
};
