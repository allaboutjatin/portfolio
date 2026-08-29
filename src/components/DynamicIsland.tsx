import React from 'react';
import { motion } from 'motion/react';
import { SiriWave } from './ui/siri-wave';

interface DynamicIslandProps {
  visible: boolean;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none select-none">
      <motion.div
        initial={{ y: -60, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -60, opacity: 0, scale: 0.8 }}
        transition={{
          type: 'spring',
          stiffness: 420,
          damping: 30,
          mass: 0.8
        }}
        className="relative bg-black border border-white/20 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.9)] overflow-hidden w-[125px] sm:w-[150px] h-[26px] sm:h-[30px] flex items-center justify-center"
      >
        {/* Subtle camera punch-hole accent on the far left */}
        <div className="absolute left-2 sm:left-3 z-10 w-1.5 h-1.5 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0">
          <div className="w-0.5 h-0.5 rounded-full bg-cyan-950" />
        </div>

        {/* Apple Siri GLSL Waveform Canvas Shader (Compact Size) */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <SiriWave
            variant="wave"
            size={110}
            renderScale={1}
            className="w-full h-[110px] max-w-none bg-transparent rounded-none object-cover pointer-events-none scale-90 sm:scale-100"
          />
        </div>

        {/* Subtle camera sensor dot on the far right */}
        <div className="absolute right-2 sm:right-3 z-10 w-1 h-1 rounded-full bg-zinc-900 border border-white/10" />
      </motion.div>
    </div>
  );
};

export default DynamicIsland;
