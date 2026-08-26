import React, { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  Globe,
  Linkedin,
  Youtube, 
  Instagram, 
  ExternalLink, 
  Send,
  Share2
} from 'lucide-react';
import { soundFx } from '../utils/audioFx';
import { ARTIST_BIO } from '../data/projectsData';
import { BorderGlow } from './ui/BorderGlow';

export const RecruiterContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const artistEmail = ARTIST_BIO.email;

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(artistEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const artistPortals = [
    {
      name: 'ArtStation',
      handle: '@allaboutjatin',
      desc: 'High-Res CGI Renders & Stills',
      url: 'https://www.artstation.com/allaboutjatin',
      icon: Globe,
      accent: 'text-sky-400',
      iconBg: 'bg-sky-500/10 text-sky-400',
      glowColors: ['#38bdf8', '#0284c7', '#ffffff']
    },
    {
      name: 'LinkedIn',
      handle: 'in/allaboutjatin',
      desc: 'Professional Career & Endorsements',
      url: 'https://www.linkedin.com/in/allaboutjatin/',
      icon: Linkedin,
      accent: 'text-blue-400',
      iconBg: 'bg-blue-500/10 text-blue-400',
      glowColors: ['#3b82f6', '#1d4ed8', '#ffffff']
    },
    {
      name: 'YouTube',
      handle: 'moreaboutjatin',
      desc: '4K Cinematics, VFX & BTS Breakdowns',
      url: 'https://www.youtube.com/channel/UCN50aa6sLd3zwCKyv6Qhvxg',
      icon: Youtube,
      accent: 'text-rose-400',
      iconBg: 'bg-rose-500/10 text-rose-400',
      glowColors: ['#f43f5e', '#e11d48', '#ffffff']
    },
    {
      name: 'Instagram',
      handle: '@moreaboutjatin',
      desc: 'Behind the Scenes & CGI Reels',
      url: 'https://www.instagram.com/moreaboutjatin/',
      icon: Instagram,
      accent: 'text-amber-400',
      iconBg: 'bg-amber-500/10 text-amber-400',
      glowColors: ['#f59e0b', '#ec4899', '#8b5cf6']
    }
  ];

  return (
    <section id="recruiter-contact" className="py-12 sm:py-20 relative z-10 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-code text-slate-300 uppercase tracking-widest px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/15 font-bold">
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="text-2xl sm:text-5xl font-display font-semibold text-white tracking-tight leading-[1.15]">
            Contact <em className="font-serif-italic font-normal text-[#9a9a9a] not-italic text-[1.08em] tracking-tight">Hub</em>
          </h2>
          <p className="text-[#9a9a9a] text-xs sm:text-base leading-relaxed px-2">
            Open to full-time studio roles, freelance opportunities, real-time cinematic productions, and high-end CGI collaborations.
          </p>
        </div>

        {/* Centered Cards Container */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Direct Email Card (5 Cols) */}
          <div className="md:col-span-5">
            <BorderGlow
              borderRadius={20}
              glowRadius={30}
              edgeSensitivity={28}
              glowIntensity={0.9}
              backgroundColor="#0b0b0e"
              colors={['#38bdf8', '#818cf8', '#ffffff']}
              className="shadow-2xl h-full"
            >
              <div className="p-5 sm:p-8 flex flex-col justify-between space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-slate-300 font-mono-code font-bold">
                      DIRECT EMAIL INBOX
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-mono-code text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>ACTIVE</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Feel free to email directly for studio inquiries, shot sequences, or commercial projects.
                  </p>

                  {/* Email Box */}
                  <div className="p-3 sm:p-3.5 bg-black rounded-xl sm:rounded-2xl border border-white/15 flex items-center justify-between gap-2 shadow-inner">
                    <div className="flex items-center space-x-2 sm:space-x-2.5 overflow-hidden">
                      <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                      <span className="text-xs sm:text-sm font-mono-code text-white truncate font-bold">
                        {artistEmail}
                      </span>
                    </div>

                    <button
                      id="copy-email-btn"
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all shrink-0 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {copiedEmail && (
                    <p className="text-xs font-mono-code text-emerald-400 font-bold text-center animate-in fade-in">
                      ✓ Email copied to clipboard!
                    </p>
                  )}

                  {/* Mailto Action Button */}
                  <a
                    href={`mailto:${artistEmail}?subject=Inquiry%20for%20Jatin%20Kumar%20-%203D%20/%20VFX`}
                    onClick={() => soundFx.playClick()}
                    className="w-full btn-metal btn-solid-white text-xs font-bold flex items-center justify-center space-x-2 min-h-[44px]"
                  >
                    <Send className="w-3.5 h-3.5 mr-1" />
                    <span>Compose Email In Client</span>
                  </a>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-white/10 text-[10px] sm:text-[11px] font-mono-code text-slate-400">
                  ⚡ Typical response time: &lt; 24 business hours
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* Socials & Portals (7 Cols) */}
          <div className="md:col-span-7 flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center justify-between px-1 mb-0.5 sm:mb-1">
              <h3 className="text-lg sm:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
                <span>Socials</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1">
              {artistPortals.map((portal) => {
                const Icon = portal.icon;
                return (
                  <BorderGlow
                    key={portal.name}
                    borderRadius={18}
                    glowRadius={28}
                    edgeSensitivity={26}
                    glowIntensity={0.85}
                    backgroundColor="#0b0b0e"
                    colors={portal.glowColors}
                    className="shadow-lg group"
                  >
                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClick()}
                      onMouseEnter={() => soundFx.playHover()}
                      className="p-4 sm:p-5 flex flex-col justify-between h-full group active:scale-[0.98] transition-transform"
                    >
                      <div className="flex items-start justify-between">
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform ${portal.iconBg}`}>
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-white transition-colors" />
                      </div>

                      <div className="mt-3 sm:mt-4">
                        <h4 className="text-sm sm:text-base font-display font-bold text-white group-hover:text-sky-300 transition-colors">
                          {portal.name}
                        </h4>
                        <p className={`text-[11px] sm:text-xs font-mono-code font-semibold mt-0.5 ${portal.accent}`}>
                          {portal.handle}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 sm:mt-2 font-normal">
                          {portal.desc}
                        </p>
                      </div>
                    </a>
                  </BorderGlow>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
