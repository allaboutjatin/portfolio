import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MeshGradientSVG } from './ui/shader-svg';
import { soundFx } from '../utils/audioFx';
import { PROJECTS_DATA, SOFTWARE_SKILLS, ARTIST_BIO } from '../data/projectsData';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Volume2,
  RefreshCw,
  Mail,
  Film,
  Phone,
  GraduationCap,
  Briefcase
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ghost' | 'user';
  text: string;
  timestamp: string;
  quickActions?: {
    label: string;
    action: () => void;
  }[];
}

interface GhostAIAssistantProps {
  onOpenContactModal: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

const QUESTION_PRESETS = [
  {
    id: 'who-is-jatin',
    label: '👤 Who is Jatin?',
    question: 'Who is Jatin Kumar and what is his background?',
  },
  {
    id: 'education-bca',
    label: '🎓 Education & BCA Journey',
    question: 'Tell me about Jatin’s education, BCA background, and how he transitioned into 3D.',
  },
  {
    id: 'contact-whatsapp',
    label: '📬 Contact & WhatsApp',
    question: 'How can I contact Jatin or reach him on WhatsApp/Email?',
  },
  {
    id: 'skills',
    label: '⚡ Core 3D & VFX Toolchain',
    question: 'What are Jatin’s primary 3D software and technical skills?',
  },
  {
    id: 'projects',
    label: '🎬 Unreal Engine 5 Projects',
    question: 'Tell me about Jatin’s featured Unreal Engine 5 cinematic projects.',
  },
  {
    id: 'availability',
    label: '💼 Hiring & Availability',
    question: 'Is Jatin open for full-time or freelance 3D/VFX roles?',
  },
];

export const GhostAIAssistant: React.FC<GhostAIAssistantProps> = ({
  onOpenContactModal,
  onNavigateToSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [popupBubble, setPopupBubble] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const popupIndexRef = useRef<number>(0);

  // Stable callback refs to prevent unnecessary resets
  const navRef = useRef(onNavigateToSection);
  const modalRef = useRef(onOpenContactModal);

  useEffect(() => {
    navRef.current = onNavigateToSection;
    modalRef.current = onOpenContactModal;
  }, [onNavigateToSection, onOpenContactModal]);

  // Persistent messages state with initial greeting
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      sender: 'ghost',
      text: `Hi there! 👋 I’m Duddu, Jatin’s AI Assistant.\n\nI know everything about his Unreal Engine cinematics, Houdini VFX pipeline, studio production experience, education journey, and software skills.\n\nAsk me anything, I’ll respond if I know that... ✨`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        {
          label: 'View Cinematics 🎬',
          action: () => {
            if (navRef.current) navRef.current('showreel-section');
          },
        },
        {
          label: 'Contact Jatin 💌',
          action: () => {
            if (modalRef.current) modalRef.current();
          },
        },
      ],
    },
  ]);

  const POPUP_MESSAGES = [
    'Hi! I’m Duddu 👻 Ask me anything about Jatin’s 3D work!',
    'Ask me anything, I’ll respond if I know that... ✨',
    'I am watching your mouse, where are you clicking? 👀',
  ];

  const SECTION_MESSAGES: Record<string, string> = {
    'projects-section': 'These are all the 3D cinematic projects Jatin has created so far! ✨',
    'pipeline-section': 'These are all the powerhouse software and tools Jatin uses in his daily workflow! 💻⚡',
    'experience-section': 'Here is Jatin’s full studio journey and total production experience so far! 🚀',
    'about-section': 'Here is more about Jatin’s background, creative philosophy, and vision! 🎨✨',
    'showreel-section': 'Check out Jatin’s 4K cinematic showcase & behind-the-scenes Unreal Engine footage! 🎬',
    'recruiter-contact': 'Ready to collaborate or hire Jatin? You can connect directly right here! 📬',
    'hero-section': 'Hi! I’m Duddu 👻 Ask me anything about Jatin’s 3D work!',
  };

  const currentSectionRef = useRef<string>('hero-section');
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const idleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const openScrollYRef = useRef<number>(0);

  // Store window scroll position whenever the chatbox opens
  useEffect(() => {
    if (isOpen) {
      openScrollYRef.current = window.scrollY;
    }
  }, [isOpen]);

  // Track scroll visibility and minimize chatbox when user scrolls the site
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = typeof window !== 'undefined' ? Math.min(window.innerHeight * 0.35, 260) : 200;

      // Minimize the chatbox when the user starts scrolling the site again
      if (isOpen && Math.abs(currentScrollY - openScrollYRef.current) > 25) {
        setIsOpen(false);
      }

      if (currentScrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setPopupBubble(null);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Section Observer & Idle Pause Shuffling Logic
  useEffect(() => {
    if (!isVisible) return;

    // Helper to start the idle interval when user pauses scrolling
    const startIdleCycle = () => {
      if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
      
      idleIntervalRef.current = setInterval(() => {
        popupIndexRef.current = (popupIndexRef.current + 1) % POPUP_MESSAGES.length;
        setPopupBubble(POPUP_MESSAGES[popupIndexRef.current]);
      }, 5000);
    };

    // Helper when user scrolls: clear idle rotation and schedule resume on pause
    const handleScrollActivity = () => {
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
        idleIntervalRef.current = null;
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // If user pauses scrolling at one place, resume the playful question shuffle after 4 seconds
      scrollTimeoutRef.current = setTimeout(() => {
        startIdleCycle();
      }, 4000);
    };

    window.addEventListener('scroll', handleScrollActivity, { passive: true });

    // Observe each section to trigger tailored contextual messages on arrival
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
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (currentSectionRef.current !== id) {
                currentSectionRef.current = id;
                const tailoredMsg = SECTION_MESSAGES[id];
                if (tailoredMsg) {
                  setPopupBubble(tailoredMsg);
                  // Reset idle timer when entering a new section
                  handleScrollActivity();
                }
              }
            }
          });
        },
        {
          rootMargin: '-10% 0px -40% 0px',
          threshold: 0.15,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Initial greeting trigger
    const initialTimer = setTimeout(() => {
      if (currentSectionRef.current === 'hero-section' || !currentSectionRef.current) {
        setPopupBubble(POPUP_MESSAGES[0]);
      }
      handleScrollActivity();
    }, 450);

    return () => {
      clearTimeout(initialTimer);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
      window.removeEventListener('scroll', handleScrollActivity);
      observers.forEach((obs) => obs.disconnect());
    };
  }, [isVisible]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleToggle = () => {
    soundFx.playClick();
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
      setPopupBubble(null);
    }
  };

  const generateAnswer = (query: string): { text: string; quickActions?: { label: string; action: () => void }[] } => {
    const q = query.toLowerCase().trim();

    // 1. Identity of Duddu / Who are you
    if (
      q.includes('who are you') ||
      q.includes('what is duddu') ||
      q.includes('who is duddu') ||
      q.includes('your name') ||
      q.includes('tell me about yourself') ||
      q.includes('what are you') ||
      q.includes('are you ai') ||
      q.includes('who created you') ||
      q.includes('who made you') ||
      q.includes('what can you do')
    ) {
      return {
        text: `Hey there! 👻 I'm Duddu, Jatin Kumar’s interactive AI companion and 3D portfolio guide!\n\nI was created to help you explore Jatin's creative universe and answer your questions about:\n• Unreal Engine 5.6 real-time cinematics & lighting\n• SideFX Houdini procedural VFX & Maya Sub-D modeling\n• Education, BCA journey, and how he transitioned into 3D\n• 4+ Years of broadcast media production experience\n• Direct contact, WhatsApp, email, and hiring availability\n\nAsk me anything, I’ll respond if I know that... ✨`,
        quickActions: [
          {
            label: 'Who is Jatin? 👤',
            action: () => handleSendMessage('Who is Jatin Kumar?'),
          },
          {
            label: 'Education & BCA 🎓',
            action: () => handleSendMessage('Tell me about Jatin’s education and BCA journey'),
          },
          {
            label: 'Contact & WhatsApp 📬',
            action: () => handleSendMessage('How can I contact Jatin or get his WhatsApp?'),
          },
          {
            label: 'View Cinematics 🎬',
            action: () => onNavigateToSection && onNavigateToSection('showreel-section'),
          },
        ],
      };
    }

    // 2. Identity of Jatin Kumar / Who is Jatin
    if (
      q.includes('who is jatin') ||
      q.includes('about jatin') ||
      q.includes('tell me about jatin') ||
      q.includes('who are jatin') ||
      q.includes('who is he') ||
      q.includes('what does jatin do') ||
      q.includes('jatin kumar') ||
      q.includes('profile') ||
      q.includes('background')
    ) {
      return {
        text: `Jatin Kumar is a 3D Artist, Real-Time Technical Director, and Creative Technologist based in Noida (Delhi NCR), India 🇮🇳.\n\nKey Highlights:\n• Core Specialization: Unreal Engine 5 real-time cinematics, SideFX Houdini procedural VFX, and Autodesk Maya Sub-D hard-surface modeling.\n• Studio Background: Over 4+ years of high-pressure media production spanning broadcast journalism, high-profile dignitaries coverage, and video editing for a studio with 1.5M+ subscribers.\n• Philosophy: Combining photorealistic cinematic lookdev with deep technical problem-solving.\n\nHe is currently open to full-time studio roles, remote contracts, and freelance projects!`,
        quickActions: [
          {
            label: 'Read Full Bio 📖',
            action: () => onNavigateToSection && onNavigateToSection('about-section'),
          },
          {
            label: 'Contact Jatin 💌',
            action: () => onOpenContactModal(),
          },
          {
            label: 'View Projects 🎨',
            action: () => onNavigateToSection && onNavigateToSection('projects-section'),
          },
        ],
      };
    }

    // 3. When Jatin started BCA / Enrolled in College
    if (
      q.includes('when jatin started studying bca') ||
      q.includes('when did jatin start bca') ||
      q.includes('start bca') ||
      q.includes('started bca') ||
      q.includes('joined college') ||
      q.includes('join college') ||
      q.includes('when he joined college') ||
      q.includes('when did he join college') ||
      q.includes('college join') ||
      q.includes('enrolled in college') ||
      q.includes('which college') ||
      q.includes('admission')
    ) {
      return {
        text: `When Jatin Started College & BCA 🎓:\n\n• Initial Path: Jatin originally enrolled in college to study BCA (Bachelor of Computer Applications) with the goal of building strong computational fundamentals, coding skills, and software logic.\n\n• The Turning Point: During his BCA coursework, he discovered a profound calling for 3D Computer Graphics, CGI, procedural simulations, and cinematic storytelling. He realized that while computer science logic was invaluable, his true destiny lay in the world of 3D visual arts.\n\n• Technical Synergy: The foundational computer science and algorithmic thinking he acquired during his BCA period became a superpower for writing Houdini VEX expressions, Unreal Engine Blueprints, and real-time shader pipelines!`,
        quickActions: [
          {
            label: 'Why did he drop out? 🚀',
            action: () => handleSendMessage('Why did Jatin drop out from BCA?'),
          },
          {
            label: 'View Skills Pipeline ⚡',
            action: () => onNavigateToSection && onNavigateToSection('pipeline-section'),
          },
        ],
      };
    }

    // 4. When & Why Jatin dropped out from BCA
    if (
      q.includes('droped out') ||
      q.includes('dropped out') ||
      q.includes('drop out') ||
      q.includes('dropout') ||
      q.includes('why did he drop out') ||
      q.includes('why drop out') ||
      q.includes('why did jatin drop out') ||
      q.includes('left college') ||
      q.includes('leave college') ||
      q.includes('quit college')
    ) {
      return {
        text: `Why Jatin Dropped Out from BCA 💡:\n\n• A Decisive Pivot: While studying BCA (Bachelor of Computer Applications), Jatin realized that standard software programming alone did not fulfill his creative drive for cinematic visual storytelling and photorealistic CGI.\n\n• 100% Immersion in 3D: Rather than continuing on a path he wasn't passionate about, Jatin made the bold, intentional decision to drop out of BCA and dedicate 100% of his daily hours to mastering professional 3D Animation, VFX, and Real-Time graphics.\n\n• The Outcome: He transitioned directly into comprehensive specialization in 3D & VFX, mastering Unreal Engine 5, SideFX Houdini, Autodesk Maya, and Substance 3D Painter. His CS background still gives him an exceptional technical edge in procedural workflows and real-time optimization!`,
        quickActions: [
          {
            label: 'Did he complete graduation? 🎓',
            action: () => handleSendMessage('When did Jatin complete his graduation?'),
          },
          {
            label: 'Explore Projects 🎬',
            action: () => onNavigateToSection && onNavigateToSection('projects-section'),
          },
        ],
      };
    }

    // 5. Graduation / Degree / Educational Qualification
    if (
      q.includes('completed his graduation') ||
      q.includes('complete graduation') ||
      q.includes('completed graduation') ||
      q.includes('when he completed his graduation') ||
      q.includes('when did he complete graduation') ||
      q.includes('did he graduate') ||
      q.includes('graduation') ||
      q.includes('degree') ||
      q.includes('qualification') ||
      q.includes('education') ||
      q.includes('study') ||
      q.includes('school') ||
      q.includes('university')
    ) {
      return {
        text: `Jatin’s Graduation & Educational Background 🎓:\n\n• Professional Specialization: Jatin completed comprehensive, intensive professional training in 3D Animation, VFX and CGI.\n\n• Complete Pipeline Mastery: His curriculum and hands-on production specialization covered Sub-D hard-surface modeling (Maya), procedural dynamics & fluids (Houdini), real-time rendering & cinematic lookdev (Unreal Engine 5), PBR texturing (Substance), and high-end color finishing (DaVinci Resolve / Nuke).\n\n• Industry-Ready Expertise: He graduated fully production-ready, combining 4+ years of broadcast media leadership with cutting-edge 3D technical direction.`,
        quickActions: [
          {
            label: 'View Experience Highlights 📜',
            action: () => onNavigateToSection && onNavigateToSection('experience-section'),
          },
          {
            label: 'Explore Skills Pipeline ⚡',
            action: () => onNavigateToSection && onNavigateToSection('pipeline-section'),
          },
        ],
      };
    }

    // 6. WhatsApp Number / What is Jatin's WhatsApp
    if (
      q.includes('whatsapp') ||
      q.includes('whats app') ||
      q.includes('what is jatin\'s whatsapp') ||
      q.includes('what is jatin whatsapp') ||
      q.includes('whatsapp number')
    ) {
      return {
        text: `Jatin’s WhatsApp Contact 💬:\n\n• Anti-Scraper Policy: To protect his personal direct line from automated web crawlers and spam bots, Jatin does not publish his raw WhatsApp number openly in plain text.\n• Immediate WhatsApp Dispatch: Jatin shares his direct WhatsApp number instantly upon receiving an inquiry via email (k.jatinofficial@gmail.com) or through the instant contact modal!\n\nClick below to open the contact form or send an email, and he’ll connect with you on WhatsApp right away!`,
        quickActions: [
          {
            label: 'Open Contact Form 🚀',
            action: () => onOpenContactModal(),
          },
          {
            label: 'Email Jatin Directly ✉️',
            action: () => {
              window.location.href = 'mailto:k.jatinofficial@gmail.com?subject=WhatsApp%20Contact%20Request%20from%20Portfolio';
            },
          },
        ],
      };
    }

    // 7. Phone Number / Call / Mobile
    if (
      q.includes('number') ||
      q.includes('phone') ||
      q.includes('mobile') ||
      q.includes('call') ||
      q.includes('what is jatin\'s number') ||
      q.includes('what is jatin number') ||
      q.includes('telephone')
    ) {
      return {
        text: `Jatin’s Phone & Direct Calling 📞:\n\n• For privacy and spam prevention, Jatin provides his direct mobile number immediately upon reviewing project inquiries or recruiter messages.\n• Official Email: k.jatinofficial@gmail.com\n• Quick Dispatch: Send a brief note through the contact modal or email with your number/project details, and Jatin will call or message you promptly!`,
        quickActions: [
          {
            label: 'Open Contact Form 🚀',
            action: () => onOpenContactModal(),
          },
          {
            label: 'Send Email ✉️',
            action: () => {
              window.location.href = 'mailto:k.jatinofficial@gmail.com?subject=Call%20Request%20from%20Portfolio';
            },
          },
        ],
      };
    }

    // 8. Contact Jatin / How to talk to Jatin / How to talk to you / Email
    if (
      q.includes('contact') ||
      q.includes('how to talk') ||
      q.includes('talk to jatin') ||
      q.includes('talk to you') ||
      q.includes('reach') ||
      q.includes('email') ||
      q.includes('message') ||
      q.includes('connect') ||
      q.includes('hire') ||
      q.includes('get in touch') ||
      q.includes('how to reach')
    ) {
      return {
        text: `How to Contact Jatin Directly 📬:\n\n• Email: k.jatinofficial@gmail.com\n• ArtStation: artstation.com/allaboutjatin\n• Location: Noida (Delhi NCR), India\n• Response Time: Usually within 24 hours!\n• Direct Chat/Call: Share your inquiry via the contact form or email, and Jatin will gladly provide his direct WhatsApp / Phone number for immediate discussion.`,
        quickActions: [
          {
            label: 'Open Contact Form 🚀',
            action: () => onOpenContactModal(),
          },
          {
            label: 'Send Email Directly ✉️',
            action: () => {
              window.location.href = 'mailto:k.jatinofficial@gmail.com?subject=Project%20Inquiry%20from%20Portfolio';
            },
          },
        ],
      };
    }

    // 9. Software, Skills, Tools, Pipeline
    if (
      q.includes('skill') ||
      q.includes('software') ||
      q.includes('tool') ||
      q.includes('houdini') ||
      q.includes('unreal') ||
      q.includes('ue5') ||
      q.includes('maya') ||
      q.includes('substance') ||
      q.includes('nuke') ||
      q.includes('davinci') ||
      q.includes('speedtree') ||
      q.includes('zbrush') ||
      q.includes('blender') ||
      q.includes('tech stack')
    ) {
      return {
        text: `Jatin’s Core Technical Stack & Proficiency 💻⚡:\n\n• Unreal Engine 5.5 / 5.6 (96%): Lumen ray-traced global illumination, Nanite geometry, Sequencer cinematic director, Movie Render Queue (MRQ) 32-bit linear EXR pipelines.\n• Autodesk Maya (95%): High-precision quad Sub-D hard-surface modeling, complex UDIM UV layout, CAD optimization.\n• SideFX Houdini 20 (92%): FLIP fluid simulations, procedural VEX nodes, sparse pyro combustion, Solaris USD pipelines.\n• Substance 3D Painter & Designer (94%): Multi-layer automotive clearcoat shaders, procedural weathering masks, custom PBR graphs.\n• DaVinci Resolve Studio (92%) & Foundry Nuke (89%): ACEScg color management, 35mm optical film stock emulation, Cryptomatte multi-pass compositing.\n• SpeedTree & ZBrush: Dynamic wind physics foliage and high-poly surface sculpting.`,
        quickActions: [
          {
            label: 'Explore Skills Pipeline ⚡',
            action: () => onNavigateToSection && onNavigateToSection('pipeline-section'),
          },
        ],
      };
    }

    // 10. Projects & Showcase
    if (
      q.includes('project') ||
      q.includes('redline') ||
      q.includes('mexicana') ||
      q.includes('f1') ||
      q.includes('bpcl') ||
      q.includes('castle') ||
      q.includes('work') ||
      q.includes('cinematic') ||
      q.includes('car') ||
      q.includes('environment') ||
      q.includes('all projects')
    ) {
      return {
        text: `Featured 3D & Cinematic Projects 🎬:\n\n1. PROJECT REDLINE: Hypercar cinematic in Unreal Engine 5.6 featuring multi-layer clearcoat shaders, high-speed camera tracking, and full LookDev breakdown.\n2. MEXICANA: Atmospheric mid-century desert fuel station with dynamic sun god-rays, volumetric dust, and retro 35mm film grading.\n3. F1 UNREAL CINEMATIC: Class-A CAD conversion, aerodynamic CFD visualizer, and glowing carbon ceramic brake lookdev.\n4. BHARAT PETROLEUM (BPCL): Commercial product film with Houdini FLIP fluid fuel mechanics and broadcast studio lookdev.\n5. THE LOST CASTLE: Massive Nanite ancient citadel with dynamic SpeedTree wind and volumetric atmosphere.`,
        quickActions: [
          {
            label: 'View Projects Grid 🎨',
            action: () => onNavigateToSection && onNavigateToSection('projects-section'),
          },
          {
            label: 'Watch 4K Cinematics 🍿',
            action: () => onNavigateToSection && onNavigateToSection('showreel-section'),
          },
        ],
      };
    }

    // 11. Studio Experience, News Channels, Dignitaries
    if (
      q.includes('experience') ||
      q.includes('news') ||
      q.includes('zee') ||
      q.includes('doordarshan') ||
      q.includes('president') ||
      q.includes('governor') ||
      q.includes('broadcast') ||
      q.includes('studio') ||
      q.includes('history') ||
      q.includes('past') ||
      q.includes('subscribers')
    ) {
      return {
        text: `Jatin’s Studio & Broadcast Experience 🚀:\n\n• 4+ Years High-Pressure Media Production: Spanning live broadcast, photography, videography, post-production editing, podcasting, and multi-cam streaming.\n• National Dignitaries Coverage: Contributed to the media coverage of events attended by the former President of India, State Governors, Chief Ministers, and Bollywood personalities.\n• High-Scale Studio Leadership: Production Lead in a media production studio with 1.5M+ combined digital followers and subscribers.\n• Broadcast Networks Collaboration: Worked alongside teams from News Nation, Zee News, and Doordarshan.`,
        quickActions: [
          {
            label: 'View Experience Timeline 📜',
            action: () => onNavigateToSection && onNavigateToSection('experience-section'),
          },
          {
            label: 'Contact Jatin 💌',
            action: () => onOpenContactModal(),
          },
        ],
      };
    }

    // 12. Availability, Roles, Location, Salary, Freelance
    if (
      q.includes('availab') ||
      q.includes('job') ||
      q.includes('role') ||
      q.includes('freelance') ||
      q.includes('full-time') ||
      q.includes('full time') ||
      q.includes('contract') ||
      q.includes('remote') ||
      q.includes('relocat') ||
      q.includes('open to work') ||
      q.includes('location') ||
      q.includes('where is jatin') ||
      q.includes('noida') ||
      q.includes('delhi') ||
      q.includes('india')
    ) {
      return {
        text: `Status: Open for Full-Time & Freelance Opportunities! 💼\n\n• Target Roles: 3D Artist, Real-Time Technical Director, Unreal Engine Generalist, Environment Artist, Automotive CGI Specialist, or Cinematic VFX Artist.\n• Current Location: Noida, Uttar Pradesh, India (Delhi NCR).\n• Relocation & Remote: 100% open to Remote worldwide, Hybrid, or On-site Relocation.\n• Availability: Immediate / Short notice.\n\nLet’s build something extraordinary together!`,
        quickActions: [
          {
            label: 'Hire Jatin 🚀',
            action: () => onOpenContactModal(),
          },
        ],
      };
    }

    // 13. Hardware & PC troubleshooting
    if (
      q.includes('pc') ||
      q.includes('hardware') ||
      q.includes('spec') ||
      q.includes('troubleshoot') ||
      q.includes('gpu') ||
      q.includes('rig')
    ) {
      return {
        text: `Technical & Hardware Proficiency 🖥️:\n\n• In addition to creative 3D artistry, Jatin has extensive hands-on experience with PC hardware assembly, BIOS tuning, thermal management, GPU driver optimization for real-time rendering, and diagnosing complex Windows / software crashes.\n• He ensures high-efficiency frame pacing and asset optimization for smooth 60fps+ real-time playback in Unreal Engine!`,
      };
    }

    // 14. Rates & Pricing
    if (
      q.includes('price') ||
      q.includes('pricing') ||
      q.includes('rate') ||
      q.includes('cost') ||
      q.includes('charge') ||
      q.includes('fee') ||
      q.includes('budget')
    ) {
      return {
        text: `Pricing & Project Quotations 💰:\n\n• Jatin provides tailored, competitive pricing depending on project scope, duration, complexity (Unreal cinematics, Houdini simulations, modeling), and deliverables.\n• Reach out with your brief to receive a customized estimate within 24 hours!`,
        quickActions: [
          {
            label: 'Request a Quote 💌',
            action: () => onOpenContactModal(),
          },
        ],
      };
    }

    // 15. Greetings & Friendly banter
    if (
      q === 'hi' ||
      q === 'hello' ||
      q === 'hey' ||
      q === 'namaste' ||
      q === 'hola' ||
      q.startsWith('hi ') ||
      q.startsWith('hello ') ||
      q.includes('how are you') ||
      q.includes('whats up') ||
      q.includes('what\'s up')
    ) {
      return {
        text: `Hey there! 👻 What would you like to know about Jatin? I can tell you about his 3D projects, education journey & BCA transition, software skills, or how to get in touch with him!`,
        quickActions: [
          {
            label: 'Who is Jatin? 👤',
            action: () => handleSendMessage('Who is Jatin Kumar?'),
          },
          {
            label: 'Education & BCA 🎓',
            action: () => handleSendMessage('Tell me about Jatin’s education and BCA journey'),
          },
          {
            label: 'Contact Jatin 📬',
            action: () => onOpenContactModal(),
          },
        ],
      };
    }

    // 16. Polite Closing
    if (
      q.includes('thank') ||
      q.includes('thanks') ||
      q.includes('bye') ||
      q.includes('goodbye') ||
      q.includes('great') ||
      q.includes('awesome') ||
      q.includes('cool')
    ) {
      return {
        text: `You're very welcome! ✨ Don't hesitate to reach out if you need anything else, or connect directly with Jatin at k.jatinofficial@gmail.com. Have a fantastic day! 🚀`,
        quickActions: [
          {
            label: 'Contact Jatin 💌',
            action: () => onOpenContactModal(),
          },
        ],
      };
    }

    // 17. Graceful Intelligent Fallback (Exact phrasing requested)
    return {
      text: `I don't know much about this context, but surely Jatin will! Feel free to reach out to him directly at k.jatinofficial@gmail.com or send a quick message through the contact modal. 💌\n\nIn the meantime, feel free to explore his projects, software toolchain, or 4K cinematics!`,
      quickActions: [
        {
          label: 'Contact Jatin Directly 💌',
          action: () => onOpenContactModal(),
        },
        {
          label: 'Watch Cinematics 🎬',
          action: () => onNavigateToSection && onNavigateToSection('showreel-section'),
        },
        {
          label: 'Explore Projects 🚀',
          action: () => onNavigateToSection && onNavigateToSection('projects-section'),
        },
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    soundFx.playClick();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Thinking effect delay to let Duddu's thinking animations play
    setTimeout(() => {
      const { text: replyText, quickActions } = generateAnswer(text);
      const ghostMsg: ChatMessage = {
        id: `ghost-${Date.now()}`,
        sender: 'ghost',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions,
      };

      setMessages((prev) => [...prev, ghostMsg]);
      setIsTyping(false);
      soundFx.playChirp(750, 0.06, 0.02);
    }, 750);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 24 }}
          className="fixed bottom-5 right-5 z-50 pointer-events-auto flex flex-col items-end"
        >
          {/* Floating Popup Speech Bubble (when chat is closed) */}
          <AnimatePresence>
            {!isOpen && popupBubble && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                onClick={handleToggle}
                className="mb-2.5 max-w-[220px] sm:max-w-[260px] p-3 rounded-2xl bg-[#090b10]/95 backdrop-blur-xl border border-cyan-400/40 shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.3)] cursor-pointer group hover:border-cyan-400 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className="text-sm">👻</span>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed">
                    {popupBubble}
                  </p>
                </div>
                <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] font-mono-code text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Chat with me</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
                {/* Bubble Tail */}
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#090b10] border-r border-b border-cyan-400/40 transform rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanded Ghost AI Chat Window */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9, transformOrigin: 'bottom right' }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 25, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="mb-3 w-[calc(100vw-32px)] sm:w-[380px] md:w-[420px] max-h-[560px] h-[82vh] sm:h-[560px] rounded-3xl bg-[#08090e]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(124,58,237,0.35)] flex flex-col overflow-hidden"
              >
                {/* Chat Header */}
                <div className="p-3.5 sm:p-4 bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-cyan-950/40 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Mini Ghost Character in Header */}
                    <div className="w-10 h-12 relative shrink-0">
                      <MeshGradientSVG interactive={false} thinking={isTyping} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white tracking-wide">
                          Duddu • AI Companion
                        </h3>
                        {isTyping ? (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[9px] font-mono-code font-bold text-cyan-300 uppercase animate-pulse">
                            <Sparkles className="w-2.5 h-2.5 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
                            Thinking...
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[9px] font-mono-code font-bold text-emerald-300 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans truncate">
                        Knowledge Base: Jatin Kumar • 3D & VFX
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setMessages([
                          {
                            id: `msg-reset-${Date.now()}`,
                            sender: 'ghost',
                            text: `Chat refreshed! 👻 Ask me anything, I’ll respond if I know that... ✨`,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          },
                        ]);
                      }}
                      title="Reset conversation"
                      className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleToggle}
                      title="Minimize chat"
                      className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Chat Body (Messages List) */}
                <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 text-xs custom-scrollbar">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[88%] p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-br-xs shadow-md'
                            : 'bg-[#12141e]/90 text-slate-200 border border-white/10 rounded-bl-xs shadow-sm font-sans'
                        }`}
                      >
                        {msg.text}

                        {/* Quick Action Pills if available */}
                        {msg.quickActions && msg.quickActions.length > 0 && (
                          <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                            {msg.quickActions.map((qa, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  soundFx.playClick();
                                  qa.action();
                                }}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-400/30 text-[10px] font-mono-code font-semibold transition-colors cursor-pointer"
                              >
                                <span>{qa.label}</span>
                                <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] font-mono-code text-slate-500 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </motion.div>
                  ))}

                  {/* Duddu Thinking Animation & Status */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2.5 p-2.5 px-3 rounded-2xl bg-[#12141e]/95 border border-cyan-500/30 max-w-[200px] shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    >
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce shadow-[0_0_8px_#22d3ee]" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce shadow-[0_0_8px_#c084fc]" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce shadow-[0_0_8px_#f472b6]" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-[11px] font-mono-code text-cyan-300 font-medium tracking-wide">
                        Duddu is thinking...
                      </span>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Question Preset Carousel / Suggestions */}
                <div className="px-3 py-2 bg-[#0d0f17] border-t border-white/5 overflow-x-auto custom-scrollbar flex gap-1.5 shrink-0">
                  {QUESTION_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSendMessage(preset.question)}
                      className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 text-[10px] font-mono-code transition-all hover:border-cyan-400/40 flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-2.5 sm:p-3 bg-[#08090e] border-t border-white/10 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask about Jatin's 3D work, BCA background, WhatsApp, skills..."
                    className="flex-1 bg-white/5 border border-white/15 focus:border-cyan-400 rounded-full px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 disabled:opacity-40 disabled:hover:from-purple-600 disabled:hover:to-cyan-500 text-white shadow-md transition-all shrink-0 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Ghost Avatar Button (Duddu - Bottom Right) */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleToggle}
            title="Chat with Duddu AI Agent"
            className="group relative cursor-pointer select-none flex items-center justify-center"
          >
            {/* Ambient Pulsing Aura Glow Behind Duddu */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/40 via-cyan-500/35 to-pink-500/35 blur-xl group-hover:blur-2xl transition-all duration-300 animate-pulse pointer-events-none" />

            {/* Outer Circular Ring Badge Container - Larger Size */}
            <div className="relative w-20 sm:w-24 md:w-28 h-26 sm:h-30 md:h-34 p-1 flex items-center justify-center drop-shadow-2xl">
              {/* Mesh Gradient Ghost Avatar with Interactive Mouse Tracking Eyes & Thinking Effects */}
              <div className="w-full h-full">
                <MeshGradientSVG interactive={true} thinking={isTyping} />
              </div>

              {/* Name Tag Pill - Larger and Prominent */}
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-[#090b12]/95 border border-cyan-400/60 text-xs sm:text-sm font-mono-code font-bold text-cyan-300 tracking-wider shadow-[0_4px_16px_rgba(0,0,0,0.9),0_0_12px_rgba(6,182,212,0.35)] flex items-center gap-1.5 whitespace-nowrap backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                Duddu
              </span>

              {/* Unread Message / Status Notification Badge */}
              {unreadCount > 0 && !isOpen && (
                <span className="absolute top-0 right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-black text-[9px] font-bold text-black items-center justify-center">
                    1
                  </span>
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

