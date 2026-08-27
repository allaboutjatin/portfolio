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
  Film
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
    label: '💼 Availability & Role Suitability',
    question: 'Is Jatin open for full-time or freelance 3D/VFX roles?',
  },
  {
    id: 'background',
    label: '🌟 Background & Studio Experience',
    question: 'What is Jatin’s background before specializing in 3D & real-time graphics?',
  },
  {
    id: 'contact',
    label: '📬 How to Hire or Reach Out',
    question: 'How can I get in touch or schedule an interview with Jatin?',
  },
];

export const GhostAIAssistant: React.FC<GhostAIAssistantProps> = ({
  onOpenContactModal,
  onNavigateToSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [popupBubble, setPopupBubble] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const popupIndexRef = useRef<number>(0);

  const POPUP_MESSAGES = [
    'Hi! I’m Duddu 👻 Ask me anything about Jatin’s 3D work!',
    'Ask me anything, i\'ll repomnd if i know that... ✨',
    'i am watching you mouse where are you clicking 👀',
  ];

  const SECTION_MESSAGES: Record<string, string> = {
    'projects-section': 'These are all the 3D cinematic projects Jatin has created so far! ✨',
    'pipeline-section': 'These are all the powerhouse software and tools Jatin uses in his daily workflow! 💻⚡',
    'experience-section': 'Here is Jatin’s full studio journey and total production experience so far! 🚀',
    'about-section': 'Here is more about Jatin’s background, creative philosophy, and vision! 🎨✨',
    'showreel-section': 'Check out Jatin’s 4K showreel & behind-the-scenes lookdev breakdowns! 🎬',
    'recruiter-contact': 'Ready to collaborate or hire Jatin? You can connect directly right here! 📬',
    'hero-section': 'Hi! I’m Duddu 👻 Ask me anything about Jatin’s 3D work!',
  };

  const currentSectionRef = useRef<string>('hero-section');
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const idleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initial welcome message setup
  useEffect(() => {
    const initialGreeting: ChatMessage = {
      id: 'msg-welcome',
      sender: 'ghost',
      text: `Hi there! 👋 I’m Duddu, Jatin’s AI Assistant.\n\nI know everything about his Unreal Engine cinematics, Houdini VFX pipeline, Years of studio experience, and software skill set.\n\nAsk me anything, i'll repomnd if i know that...`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        {
          label: 'View Showreel 🎬',
          action: () => {
            if (onNavigateToSection) onNavigateToSection('showreel-section');
          },
        },
        {
          label: 'Send Email 💌',
          action: () => onOpenContactModal(),
        },
      ],
    };
    setMessages([initialGreeting]);
  }, [onNavigateToSection, onOpenContactModal]);

  // Track scroll visibility (slide in when hero expands after Jatin Kumar slide)
  useEffect(() => {
    const checkScroll = () => {
      const scrollThreshold = typeof window !== 'undefined' ? Math.min(window.innerHeight * 0.35, 260) : 200;
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setPopupBubble(null);
      }
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

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
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('software') || q.includes('tool') || q.includes('houdini') || q.includes('unreal') || q.includes('maya')) {
      return {
        text: `Jatin’s Core Technical Stack & Proficiency:\n\n• Unreal Engine 5.5 / 5.6 (96%): Lumen ray tracing, Nanite virtualized geometry, Sequencer cinematic choreography, Movie Render Queue (MRQ) 32-bit linear EXR pipelines.\n• Autodesk Maya (95%): High-precision quad Sub-D hard-surface modeling, complex UV/UDIM layout, CAD geometry optimization.\n• SideFX Houdini 20 (92%): FLIP fluid dynamics, VEX procedural scripting, sparse pyro combustion, and Solaris USD pipelines.\n• Substance 3D Painter & Designer (94%): Multi-layer automotive clearcoat shaders, procedural weathering masks, custom PBR graphs.\n• DaVinci Resolve Studio (92%) & Foundry Nuke (89%): ACEScg color science, 35mm optical film stock emulation, Cryptomatte multi-pass compositing.`,
        quickActions: [
          {
            label: 'Explore Skills Pipeline',
            action: () => onNavigateToSection && onNavigateToSection('skills-section'),
          },
        ],
      };
    }

    if (q.includes('project') || q.includes('redline') || q.includes('mexicana') || q.includes('work') || q.includes('castle') || q.includes('beach') || q.includes('f1') || q.includes('bpcl')) {
      return {
        text: `Featured 3D & Cinematic Projects:\n\n1. PROJECT REDLINE: UE 5.6 automotive hypercar cinematic with multi-layer clearcoat shaders and full behind-the-scenes breakdown.\n2. MEXICANA: Atmospheric mid-century desert fuel station featuring volumetric dust particles and retro 35mm film grading.\n3. F1 UNREAL CINEMATIC (In Production): Class-A aerodynamic CAD conversion, thermal brake glow, and high-speed virtual camera tracking.\n4. BHARAT PETROLEUM (BPCL): Commercial product film with Houdini FLIP fluid fuel mechanics and broadcast studio lookdev.\n5. THE LOST CASTLE: Massive Nanite ancient citadel with dynamic SpeedTree wind and volumetric sun god-rays.`,
        quickActions: [
          {
            label: 'View Projects Grid',
            action: () => onNavigateToSection && onNavigateToSection('projects-section'),
          },
        ],
      };
    }

    if (q.includes('availab') || q.includes('hire') || q.includes('job') || q.includes('freelance') || q.includes('full-time') || q.includes('role') || q.includes('location')) {
      return {
        text: `Status: Open to Full-Time & Freelance Opportunities! 💼\n\n• Target Roles: 3D Artist, Real-Time Technical Director, Environment Artist, Automotive CGI Specialist, or Cinematic VFX Artist.\n• Location: Based in Noida, India (Open to Remote, Hybrid, & Relocation opportunities).\n• Why Hire Jatin: Combines deep artistic lookdev instincts with robust technical troubleshooting, tight deadline endurance, and a versatile cross-disciplinary media background.`,
        quickActions: [
          {
            label: 'Contact Jatin Now 💌',
            action: () => onOpenContactModal(),
          },
        ],
      };
    }

    if (q.includes('background') || q.includes('experience') || q.includes('story') || q.includes('who is') || q.includes('bio') || q.includes('about')) {
      return {
        text: `Jatin’s Background & Journey:\n\n• Before transitioning deeply into 3D & real-time engines, Jatin accumulated 4+ years of high-pressure media production experience spanning live broadcast, videography, podcasting, and editing.\n• Collaborated with major Indian news networks (News Nation, Zee News, Doordarshan) covering high-profile events for national dignitaries (former President of India, State Governors, Bollywood personalities).\n• Production Lead in a media studio with over 1.5 Million+ digital followers/subscribers, learning rapid problem-solving when "there isn't a manual".\n• Highly adaptable: also skilled in PC hardware troubleshooting, video editing, and technical problem solving.`,
        quickActions: [
          {
            label: 'Read Full Bio',
            action: () => onNavigateToSection && onNavigateToSection('about-section'),
          },
        ],
      };
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('artstation') || q.includes('message')) {
      return {
        text: `Direct Contact Information:\n\n• Email: k.jatinofficial@gmail.com\n• ArtStation: artstation.com/allaboutjatin\n• Location: Noida, India\n• Response Time: Usually within 24 hours!\n\nClick the button below to open the instant contact dispatch modal:`,
        quickActions: [
          {
            label: 'Open Contact Form 🚀',
            action: () => onOpenContactModal(),
          },
        ],
      };
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('who are you') || q.includes('duddu')) {
      return {
        text: `Hey there! 👻 I'm Duddu, Jatin's 3D AI companion. Ask me anything about his Unreal Engine cinematics, Houdini VFX pipeline, studio experience, and software skills.`,
      };
    }

    // Default intelligent response
    return {
      text: `Jatin specializes in Unreal Engine real-time cinematics, Maya hard-surface Sub-D modeling, and Houdini procedural VFX.\n\nHe has worked across high-impact automotive lookdev (Project REDLINE), commercial product films (BPCL), and large-scale Nanite environments (The Lost Castle).\n\nWould you like to connect directly or inspect his showreel?`,
      quickActions: [
        {
          label: 'Contact Jatin 💌',
          action: () => onOpenContactModal(),
        },
        {
          label: 'Explore Projects 🎬',
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
    }, 650);
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
                      <MeshGradientSVG interactive={false} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white tracking-wide">
                          Duddu • AI Companion
                        </h3>
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[9px] font-mono-code font-bold text-emerald-300 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live
                        </span>
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
                            text: `Chat refreshed! 👻 Ask me anything, i'll repomnd if i know that...`,
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
                                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-400/30 text-[10px] font-mono-code font-semibold transition-colors"
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

                  {/* Ghost Typing Animation */}
                  {isTyping && (
                    <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#12141e]/90 border border-white/10 max-w-[90px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Question Preset Carousel / Suggestions */}
                <div className="px-3 py-2 bg-[#0d0f17] border-t border-white/5 overflow-x-auto custom-scrollbar flex gap-1.5 shrink-0">
                  {QUESTION_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSendMessage(preset.question)}
                      className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 text-[10px] font-mono-code transition-all hover:border-cyan-400/40 flex items-center gap-1"
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
                    placeholder="Ask about Jatin's 3D work, software, projects..."
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
              {/* Mesh Gradient Ghost Avatar with Interactive Mouse Tracking Eyes */}
              <div className="w-full h-full">
                <MeshGradientSVG interactive={true} />
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
