import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ThemeSwitchFlowGlass from './ui/ThemeSwitchFlowGlass';
import { Sparkles, ArrowRight, Sun, Moon, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audioFx';

interface ThemePromptModalProps {
  onDismiss?: () => void;
}

export const ThemePromptModal: React.FC<ThemePromptModalProps> = ({ onDismiss }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContinue = () => {
    soundFx.playClick();
    setIsOpen(false);
    onDismiss?.();
  };

  if (!isOpen || !mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-linear-to-b from-[#18181b]/95 via-[#0e0e11]/95 to-[#050507]/98 p-8 text-white shadow-2xl shadow-cyan-950/40 text-center overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Studio Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono-code tracking-wider text-slate-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>STUDIO PREFERENCES</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white mb-2">
          Choose Your Visual Theme
        </h2>
        <p className="text-sm text-slate-400 max-w-sm mx-auto mb-8 leading-relaxed">
          Customize your viewing atmosphere before exploring 4K VFX breakdowns, look-development reels, and project case studies.
        </p>

        {/* Theme Switch Component Box */}
        <div className="my-6 py-6 px-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-6 w-full">
            <button
              type="button"
              onClick={() => {
                soundFx.playHover();
                setTheme('light');
              }}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                !isDark 
                  ? 'bg-amber-400/20 border border-amber-400/50 text-amber-300 font-semibold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Light</span>
            </button>

            {/* Provided WebGL FlowGlass Switch */}
            <ThemeSwitchFlowGlass intensity={1.2} />

            <button
              type="button"
              onClick={() => {
                soundFx.playHover();
                setTheme('dark');
              }}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isDark 
                  ? 'bg-sky-400/20 border border-sky-400/50 text-sky-300 font-semibold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-4 h-4 text-sky-400" />
              <span>Dark</span>
            </button>
          </div>

          <p className="text-xs font-mono-code text-slate-400 flex items-center gap-1.5 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Currently selected: </span>
            <strong className="text-white uppercase tracking-wider">{isDark ? 'Dark Cinema' : 'Light Studio'}</strong>
          </p>
        </div>

        {/* Confirm / Continue Button */}
        <button
          type="button"
          onClick={handleContinue}
          onMouseEnter={() => soundFx.playHover()}
          className="w-full py-3.5 px-6 rounded-xl bg-white text-black hover:bg-slate-200 font-display font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-white/10 hover:shadow-white/20 cursor-pointer"
        >
          <span>Enter Portfolio</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-slate-500 font-mono-code mt-4">
          You can also switch themes anytime from the navbar.
        </p>

      </div>
    </div>
  );
};
