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
      accent: 'border-sky-500/30 text-sky-400',
      iconBg: 'bg-sky-500/10 text-sky-400'
    },
    {
      name: 'LinkedIn',
      handle: 'in/allaboutjatin',
      desc: 'Professional Career & Endorsements',
      url: 'https://www.linkedin.com/in/allaboutjatin/',
      icon: Linkedin,
      accent: 'border-blue-500/30 text-blue-400',
      iconBg: 'bg-blue-500/10 text-blue-400'
    },
    {
      name: 'YouTube',
      handle: 'moreaboutjatin',
      desc: '4K Cinematics, VFX & BTS Breakdowns',
      url: 'https://www.youtube.com/channel/UCN50aa6sLd3zwCKyv6Qhvxg',
      icon: Youtube,
      accent: 'border-rose-500/30 text-rose-400',
      iconBg: 'bg-rose-500/10 text-rose-400'
    },
    {
      name: 'Instagram',
      handle: '@moreaboutjatin',
      desc: 'Behind the Scenes & CGI Reels',
      url: 'https://www.instagram.com/moreaboutjatin/',
      icon: Instagram,
      accent: 'border-amber-500/30 text-amber-400',
      iconBg: 'bg-amber-500/10 text-amber-400'
    }
  ];

  return (
    <section id="recruiter-contact" className="py-20 relative z-10 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-code text-slate-300 uppercase tracking-widest px-4 py-1.5 rounded-full bg-white/5 border border-white/15 font-bold">
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-white tracking-tight leading-[1.15]">
            Studios & <em className="font-serif-italic font-normal text-[#9a9a9a] not-italic text-[1.08em] tracking-tight">Contact Hub</em>
          </h2>
          <p className="text-[#9a9a9a] text-sm sm:text-base leading-relaxed">
            Open to full-time studio roles, freelance opportunities, real-time cinematic productions, and high-end CGI collaborations.
          </p>
        </div>

        {/* Centered Cards Container */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Direct Email Card (5 Cols) */}
          <div className="md:col-span-5 bg-[#0b0b0e] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-300 font-mono-code font-bold">
                  DIRECT EMAIL INBOX
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono-code text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ACTIVE</span>
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Feel free to email directly for studio inquiries, shot sequences, or commercial projects.
              </p>

              {/* Email Box */}
              <div className="p-3.5 bg-black rounded-2xl border border-white/15 flex items-center justify-between gap-2 shadow-inner">
                <div className="flex items-center space-x-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono-code text-white truncate font-bold">
                    {artistEmail}
                  </span>
                </div>

                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all shrink-0 cursor-pointer"
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
                className="w-full btn-metal btn-solid-white text-xs font-bold flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5 mr-1" />
                <span>Compose Email In Client</span>
              </a>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] font-mono-code text-slate-400">
              ⚡ Typical response time: &lt; 24 business hours
            </div>
          </div>

          {/* Socials & Portals (7 Cols) */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono-code text-slate-300 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Socials & Portfolios</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {artistPortals.map((portal) => {
                const Icon = portal.icon;
                return (
                  <a
                    key={portal.name}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`p-5 rounded-2xl bg-[#0b0b0e] border border-white/10 hover:${portal.accent} transition-all flex flex-col justify-between group shadow-lg`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform ${portal.iconBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </div>

                    <div className="mt-4">
                      <h4 className="text-base font-display font-bold text-white group-hover:text-sky-300 transition-colors">
                        {portal.name}
                      </h4>
                      <p className={`text-xs font-mono-code font-semibold mt-0.5 ${portal.accent.split(' ')[1]}`}>
                        {portal.handle}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2 font-normal">
                        {portal.desc}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
