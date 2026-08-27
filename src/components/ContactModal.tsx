import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  Send, 
  MapPin, 
  ExternalLink
} from 'lucide-react';
import { soundFx } from '../utils/audioFx';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Close on Escape key press & prevent body scroll when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFx.playClick();
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const email = 'k.jatinofficial@gmail.com';
  const phone = '+91 8130114525';
  const phoneRaw = '918130114525';
  const whatsappUrl = `https://wa.me/${phoneRaw}?text=Hi%20Jatin,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect%20regarding%203D%20%26%20VFX%20projects.`;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          {/* Dynamic Frosted Liquid Glass Backdrop */}
          <motion.div 
            key="contact-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black/75 backdrop-blur-xl"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }} 
          />

          {/* Apple Liquid Glass Modal Container */}
          <motion.div 
            key="contact-modal-content"
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{
              duration: 0.48,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative w-full max-w-lg rounded-[32px] overflow-hidden border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.4)] bg-gradient-to-b from-white/[0.14] via-[#12141a]/95 to-[#08090c]/98 backdrop-blur-3xl text-white p-7 sm:p-9 z-10 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Specular Ambient Glow */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Header & Close Button */}
            <div className="flex items-start justify-between relative z-10 mb-6">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center shadow-inner text-white backdrop-blur-md">
                  <span className="font-display font-extrabold text-xl tracking-tight">JK</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 id="contact-modal-title" className="text-xl font-display font-bold text-white tracking-tight">
                      Jatin Kumar
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-xs font-mono-code text-slate-300">
                    Real-Time 3D Artist & VFX Director
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                aria-label="Close Contact Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Small Intro Biography */}
            <div className="relative z-10 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 font-normal">
              <p>
                Crafting photoreal 3D cinematics, procedural simulations, and high-fidelity CGI in Unreal Engine and Houdini. Available for full-time studio positions, freelance contracts, and commercial productions worldwide.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-slate-400 mt-2.5 pt-2.5 border-t border-white/10">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Noida, India • Remote & Relocation Worldwide</span>
              </div>
            </div>

            {/* Action Direct Channels */}
            <div className="relative z-10 space-y-3.5 mb-6">
              
              {/* WhatsApp Primary Liquid Glass Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="w-full group flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-emerald-600/25 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-400/40 hover:border-emerald-400/60 shadow-[0_4px_20px_rgba(16,185,129,0.15)] transition-all cursor-pointer hover:shadow-[0_6px_28px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-inner group-hover:scale-105 transition-transform">
                    {/* WhatsApp SVG Icon */}
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24h-.18zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                      <span>Chat on WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-[11px] font-mono-code text-emerald-300/80">
                      {phone} • Instant Message
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono-code px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold group-hover:bg-emerald-500/30 transition-colors">
                  Connect →
                </span>
              </a>

              {/* Email Direct Channel */}
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/12 backdrop-blur-md flex items-center justify-between gap-3 transition-colors hover:bg-white/[0.08]">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-sky-300 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider font-semibold">
                      EMAIL ADDRESS
                    </div>
                    <div className="text-xs sm:text-sm font-mono-code text-white font-bold truncate">
                      {email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={`mailto:${email}?subject=Inquiry%20for%20Jatin%20Kumar%20-%203D%20/%20VFX`}
                    onClick={() => soundFx.playClick()}
                    className="p-2 rounded-xl bg-white text-black hover:bg-slate-200 transition-all font-bold cursor-pointer hover:scale-105 active:scale-95"
                    title="Send Email in Client"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Phone Direct Channel */}
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/12 backdrop-blur-md flex items-center justify-between gap-3 transition-colors hover:bg-white/[0.08]">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-amber-300 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider font-semibold">
                      DIRECT PHONE
                    </div>
                    <div className="text-xs sm:text-sm font-mono-code text-white font-bold truncate">
                      {phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                    title="Copy Phone Number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    onClick={() => soundFx.playClick()}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono-code font-bold text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                    title="Call Directly"
                  >
                    Call
                  </a>
                </div>
              </div>

            </div>

            {/* Footer Note */}
            <div className="relative z-10 text-center text-[11px] font-mono-code text-slate-400">
              ⚡ Guaranteed response within 24 business hours
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
