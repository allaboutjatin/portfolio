import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SmoothEntranceProps {
  children?: React.ReactNode;
}

export const SmoothEntrance: React.FC<SmoothEntranceProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start dissolve immediately on first tick
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 40);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Native Children Rendered Cleanly for 100% Fluid Sticky & Scroll Calculations */}
      {children}

      {/* Cinematic Dissolving Curtain with Gaussian Blur & Atmospheric Fade */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            animate={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="fixed inset-0 pointer-events-none z-[99999] bg-[#07080b]/80"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SmoothEntrance;
