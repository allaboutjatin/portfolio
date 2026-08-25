import { ProjectItem, ShowreelShot, SoftwareSkill } from '../types';
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
    softwareStack: ['Unreal Engine 5.6', 'Autodesk Maya', 'Substance 3D Painter', 'DaVinci Resolve Studio', 'Foundry Nuke'],
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
    softwareStack: ['Unreal Engine 5', 'Quixel Megascans', 'Substance 3D Painter', 'Autodesk Maya', 'DaVinci Resolve'],
    overview: 'A gritty, atmospheric desert gas station automotive cinematic rendered in Unreal Engine 5. Explores dusty arid lighting, weathered neon signage, heat distortion, octane-fueled reflections, and realistic environmental storytelling.',
    technicalHighlights: [
      'Modeled and textured a weathered mid-century desert gas station with layered grunge, peeling paint, and rusted metal trims.',
      'Created dynamic desert wind particle systems with rolling dust motes, dry tumbleweeds, and atmospheric heat haze.',
      'Configured warm sunset directional lighting paired with glowing neon tube emissives bouncing via Lumen real-time GI.',
      'Graded in DaVinci Resolve to achieve a warm 35mm retro cinematic film look with custom optical halation and grain.'
    ],
    supervisorReview: '"Superb environmental mood and lighting contrast. The transition from intense desert sun to the neon shadows of the fuel station tells a compelling cinematic story." – Environment Lead',
    breakdownPipeline: [
      {
        id: 'mex-1',
        name: '01. Desert Environment Blockout & Landscape',
        description: 'Terrain sculpting with slope-based sand, cracked earth, and asphalt materials blended via Runtime Virtual Texturing (RVT).',
        software: ['Unreal Engine 5', 'Gaea'],
        imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'mex-2',
        name: '02. Gas Station Hard-Surface Asset Creation',
        description: 'Modeling vintage fuel pumps, signage, and rusted metal awnings with multi-UDIM procedural rust masks in Substance Painter.',
        software: ['Autodesk Maya', 'Substance Painter'],
        imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'mex-3',
        name: '03. Lighting & Volumetric Atmosphere',
        description: 'Golden hour directional sunlight with volumetric fog inscattering, dusty heat mirage effects, and neon illumination.',
        software: ['Unreal Engine 5', 'Lumen'],
        imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'mex-4',
        name: '04. Cinematic Sequencing & Film Emulation',
        description: 'Camera composition, slow panning shots, motion blur calibration, and 35mm vintage film stock color grade.',
        software: ['UE5 Sequencer', 'DaVinci Resolve'],
        imageUrl: 'https://img.youtube.com/vi/c7j6qtnMbQU/maxresdefault.jpg'
      }
    ]
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
    breakdownPipeline: [
      {
        id: 'f1-1',
        name: '01. F1 Chassis CAD Optimization & Aero Sub-D',
        description: 'Aerodynamic surface modeling in Maya with zero surface distortion across complex compound curvature curves.',
        software: ['Autodesk Maya', 'Sub-D Tools'],
        imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'f1-2',
        name: '02. Carbon Fiber & Livery LookDev',
        description: 'Multi-layer composite material texturing in Substance Painter featuring gloss clearcoat, satin carbon, and heat-resistant alloys.',
        software: ['Substance 3D Painter', 'Substance Designer'],
        imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'f1-3',
        name: '03. Unreal Engine 5.6 Lumen Lighting & Track Setup',
        description: 'High-speed track environment lighting with Lumen hardware ray tracing, asphalt rubber textures, and volumetric tire smoke.',
        software: ['Unreal Engine 5.6', 'Lumen GI'],
        imageUrl: f1SunsetThumbnail
      },
      {
        id: 'f1-4',
        name: '04. Sequencing & Final Post Finishing',
        description: 'Multi-camera track tracking in Sequencer and linear EXR mastering in DaVinci Resolve Studio with ACEScg color science.',
        software: ['UE5 Sequencer', 'DaVinci Resolve'],
        imageUrl: f1SunsetThumbnail
      }
    ],
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
    softwareStack: ['Unreal Engine 5', 'SideFX Houdini', 'Autodesk Maya', 'Substance 3D Painter', 'After Effects', 'Nuke'],
    overview: 'Commercial 3D production for Bharat Petroleum (BPCL). Features high-precision fuel dispensing mechanics, viscous fluid dynamics, sleek corporate brand lighting, and broadcast-ready commercial motion design.',
    technicalHighlights: [
      'High-precision CAD model cleanup and Sub-D optimization for industrial fuel dispensers and pump nozzles.',
      'Simulated fluid fuel flow dynamics in Houdini with viscosity constraints and glass refraction shaders.',
      'Commercial studio look development with clean chrome reflections, branded vibrant decals, and macro depth-of-field closeups.',
      'Final broadcast mastering adhering to broadcast color specifications and dynamic camera choreography.'
    ],
    supervisorReview: '"Clean, crisp commercial execution. The product lighting and polished material finishes meet highest agency broadcast standards." – Commercial VFX Producer',
    breakdownPipeline: [
      {
        id: 'bpcl-1',
        name: '01. Industrial Model Optimization',
        description: 'CAD cleanup and subdivision mesh conversion for high-tolerance mechanical pump components.',
        software: ['Autodesk Maya', 'CAD Converter'],
        imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'bpcl-2',
        name: '02. Fluid Dynamics & Droplet Simulation',
        description: 'Houdini FLIP fluid simulation for fuel droplet flow through transparent delivery nozzles.',
        software: ['SideFX Houdini 20', 'VEX'],
        imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=85'
      },
      {
        id: 'bpcl-3',
        name: '03. Brand Shading & Studio Lighting',
        description: 'Calibrated PBR shaders for BPCL brand colors, brushed aluminum, and optical glass refractions.',
        software: ['Substance 3D Painter', 'Unreal Engine 5'],
        imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'bpcl-4',
        name: '04. Commercial Motion Design & Compositing',
        description: 'Multi-pass compositing in Nuke with optical flares, typography integration, and broadcast audio mix.',
        software: ['Foundry Nuke', 'After Effects'],
        imageUrl: 'https://img.youtube.com/vi/oQ7BbQ32yuE/maxresdefault.jpg'
      }
    ]
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
    softwareStack: ['Unreal Engine 5', 'ZBrush', 'SpeedTree Cinema', 'Substance 3D Designer', 'Maya', 'DaVinci Resolve'],
    overview: 'An epic cinematic journey into an ancient forgotten stone castle perched on mist-shrouded mountain cliffs. Features dense ivy foliage, ancient masonry displacement, volumetric sun shafts, and sweeping aerial camera maneuvers in Unreal Engine.',
    technicalHighlights: [
      'Constructed massive ancient gothic ruins using Nanite geometry for infinite LOD transitions with zero pop-in.',
      'Integrated SpeedTree cinematic wind and ivy growth simulation across ancient stone arches and battlement walls.',
      'Designed volumetric exponential height fog with directional inscattering and dramatic god rays cutting through cloud cover.',
      'Choreographed sweeping aerial drone shots with smooth spline interpolation and cinematic anamorphic lens distortion.'
    ],
    supervisorReview: '"Awe-inspiring architectural scale and atmosphere. The volumetric light shafts cutting through the castle ruins create incredible emotional depth." – Principal Cinematic Artist',
    breakdownPipeline: [
      {
        id: 'castle-1',
        name: '01. Architectural Blockout & Cliff Geometry',
        description: 'Modular castle kitbash pieces sculpted in ZBrush and assembled along dramatic mountain ridges in Maya.',
        software: ['ZBrush', 'Maya'],
        imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'castle-2',
        name: '02. Procedural Stone Masonry & Moss Shaders',
        description: 'Tiling weathered stone materials created in Substance Designer with vertex-painted moss and dirt occlusion.',
        software: ['Substance 3D Designer'],
        imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'castle-3',
        name: '03. Nanite Instancing & Foliage Scattering',
        description: 'Dense procedural ivy, mountain pine trees, and grass clumps scattered using Unreal Engine PCG tools.',
        software: ['Unreal Engine 5 (Nanite & PCG)'],
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85'
      },
      {
        id: 'castle-4',
        name: '04. Volumetric Sun Shafts & Epic Camera Splines',
        description: 'Lumen real-time GI with high-altitude atmospheric fog and cinematic slow-motion drone flythroughs.',
        software: ['UE5 Sequencer', 'DaVinci Resolve'],
        imageUrl: 'https://img.youtube.com/vi/3OX753L0sIg/maxresdefault.jpg'
      }
    ]
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
    softwareStack: ['Unreal Engine 5', 'Houdini Ocean Spectrum', 'Quixel Megascans', 'Substance 3D Painter', 'DaVinci Resolve'],
    overview: 'A photorealistic coastal beach environment cinematic capturing gentle wave breaks, underwater caustic light patterns, wet sand specular transitions, and pristine coastal atmosphere under natural daylight.',
    technicalHighlights: [
      'Implemented Unreal Engine Single Layer Water system with custom Gerstner wave displacement and dynamic foam shorelines.',
      'Authored wet sand shaders using vertex distance blending and specular roughness falloff for realistic tidal moisture.',
      'Engineered underwater caustic light refraction projections dancing on submerged sea floor rocks and coral geometry.',
      'Real-time natural sun and sky daylight lighting using physical atmospheric transmittance and Rayleigh scattering.'
    ],
    supervisorReview: '"Incredible water caustics and shoreline shader transitions. The sense of natural sunlight on coastal water is strikingly photorealistic." – Technical Art Director',
    breakdownPipeline: [
      {
        id: 'beach-1',
        name: '01. Ocean Water Shader & Wave Physics',
        description: 'Single Layer Water shader graph with dual normal spectrums for large rolling swells and high-frequency capillary ripples.',
        software: ['Unreal Engine 5 Material Graph'],
        imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'beach-2',
        name: '02. Underwater Caustics & Optical Absorption',
        description: 'Procedural caustic light projection functions with depth-dependent water light absorption and light scattering.',
        software: ['Unreal Engine 5', 'Houdini'],
        imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'beach-3',
        name: '03. Coastal Foliage & Wet Sand Wetness Masks',
        description: 'Dynamic shoreline wave wash with distance-field wetness masks and wind-blown coastal palm vegetation.',
        software: ['SpeedTree', 'Quixel Megascans'],
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85'
      },
      {
        id: 'beach-4',
        name: '04. Natural Daylight Lighting & ACES Color',
        description: 'Physical Sun & Sky atmospheric lighting, camera depth of field, and DaVinci Resolve ACEScg master grade.',
        software: ['Unreal Engine 5', 'DaVinci Resolve'],
        imageUrl: 'https://img.youtube.com/vi/mwZ8coCUlPI/maxresdefault.jpg'
      }
    ]
  }
];

export const SHOWREEL_SHOTS: ShowreelShot[] = [
  {
    timestamp: '00:00 - 00:08',
    timeInSeconds: 0,
    shotTitle: 'Project REDLINE - UE 5.6 Hypercar Speed Run',
    projectRefId: 'project-redline',
    disciplines: ['Unreal Engine 5.6', 'Automotive CGI', 'Lumen LookDev'],
    software: ['Unreal Engine 5.6', 'Maya', 'Substance Painter', 'DaVinci Resolve'],
    description: 'High-speed hypercar cinematic tracking shot featuring clearcoat flake dispersion, dynamic wheel physics, and asphalt reflections.',
    thumbnail: 'https://img.youtube.com/vi/FTV57q6M0j4/maxresdefault.jpg'
  },
  {
    timestamp: '00:08 - 00:15',
    timeInSeconds: 8,
    shotTitle: 'Mexicana - Desert Fuel Station & Classic Muscle',
    projectRefId: 'mexicana-desert-fuel',
    disciplines: ['Environment Art', 'Lighting', 'Retro Film Grade'],
    software: ['Unreal Engine 5', 'Quixel Megascans', 'Maya', 'DaVinci Resolve'],
    description: 'Atmospheric golden hour pan across a weathered mid-century desert gas station with dusty wind particles and neon glow.',
    thumbnail: 'https://img.youtube.com/vi/c7j6qtnMbQU/maxresdefault.jpg'
  },
  {
    timestamp: '00:15 - 00:23',
    timeInSeconds: 15,
    shotTitle: 'Bharat Petroleum (BPCL) - Commercial Product CGI',
    projectRefId: 'bharat-petroleum-bpcl',
    disciplines: ['Commercial VFX', 'Houdini Fluid Sim', 'Product LookDev'],
    software: ['Unreal Engine 5', 'Houdini 20', 'Maya', 'Nuke 15'],
    description: 'Broadcast commercial shot featuring precision fuel dispenser mechanics, fluid flow dynamics, and sleek studio lighting.',
    thumbnail: 'https://img.youtube.com/vi/oQ7BbQ32yuE/maxresdefault.jpg'
  },
  {
    timestamp: '00:23 - 00:31',
    timeInSeconds: 23,
    shotTitle: 'The Lost Castle - Ancient Citadel Ruins & Fog',
    projectRefId: 'the-lost-castle',
    disciplines: ['Nanite Virtualized Geo', 'Volumetric Lighting', 'Sequencer'],
    software: ['Unreal Engine 5', 'ZBrush', 'SpeedTree', 'Maya'],
    description: 'Sweeping aerial crane shot past towering moss-covered gothic fortress walls with volumetric sunlight rays piercing cloud cover.',
    thumbnail: 'https://img.youtube.com/vi/3OX753L0sIg/maxresdefault.jpg'
  },
  {
    timestamp: '00:31 - 00:38',
    timeInSeconds: 31,
    shotTitle: 'The Beach - Photoreal Ocean Waves & Caustics',
    projectRefId: 'the-beach',
    disciplines: ['Single Layer Water', 'Caustic Optics', 'Atmospheric Daylight'],
    software: ['Unreal Engine 5', 'Houdini', 'SpeedTree', 'DaVinci Resolve'],
    description: 'Coastal shoreline cinematic with dynamic wave foam breaks, underwater caustic refractions, and wet sand specular transitions.',
    thumbnail: 'https://img.youtube.com/vi/mwZ8coCUlPI/maxresdefault.jpg'
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
  title: 'Real-Time 3D Artist • Technical Creative Producer • Multimedia Lead',
  tagline: 'Unreal Engine 5, Houdini & Real-Time Cinematic Workflows',
  status: 'Open to full-time and freelance opportunities',
  email: 'k.jatinofficial@gmail.com',
  location: 'Noida, India',
  degree: '3D Animation, VFX and CGI',
  gradYear: 'Production Ready',
  awards: [
    'Over 4+ Years High-Profile Broadcast & Digital Media Production Experience',
    'Production Lead for Studios with 1.5M+ Digital Audience & Subscribers',
    'Coverage of National-Level Events & Renowned Public Figures'
  ],
  bioText: `I'm a 3D Artist with a primary focus on Unreal Engine 5, Houdini, and real-time cinematic workflows. I enjoy building environments, creating cinematic experiences, developing procedural assets, and exploring VFX and technical workflows for interactive and cinematic projects.

Before moving into 3D, I spent over 4+ years in media production, working across live events, photography, videography, podcast production, editing, and live streaming. During this time, I contributed to the production and coverage of national-level events, collaborating with teams from leading news networks, including News Nation, Zee News, Doordarshan, and other media organizations. I also worked alongside well-known news anchors and covered events attended by distinguished guests such as the former President of India, State Governors, Chief Ministers, Deputy Chief Ministers, and several renowned public figures and Bollywood personalities.

I'm also part of a production studio with a combined audience of over 1.5 million followers and subscribers across multiple digital platforms, where I gained hands-on experience in production workflows, working under tight deadlines, and collaborating with creative and technical teams.

Outside of 3D, I'm also comfortable with video post & pre-production, PC hardware and software troubleshooting, and have basic knowledge with web development. While these aren't my primary focus, they've helped me become a more versatile creative professional.

Currently looking for opportunities where I can continue growing as a Real-Time 3D Artist, contribute to meaningful projects, and keep learning from experienced teams.`
};
