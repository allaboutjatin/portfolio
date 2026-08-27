import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

export interface MediaPlaybackState {
  isPlaying: boolean;
  title: string;
  category: string;
  audioLevel: number;
  frequencyBands: number[];
  startPlayback: (title: string, category?: string) => void;
  stopPlayback: () => void;
}

const MediaPlaybackContext = createContext<MediaPlaybackState | undefined>(undefined);

export const MediaPlaybackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [audioLevel, setAudioLevel] = useState(0.15);
  const [frequencyBands, setFrequencyBands] = useState([0.1, 0.15, 0.12, 0.08]);

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const startPlayback = (mediaTitle: string, mediaCategory = '3D Cinematic') => {
    setTitle(mediaTitle);
    setCategory(mediaCategory);
    setIsPlaying(true);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    let animId: number;
    let t = 0;

    const updateAudioReactivity = () => {
      t += 0.05;

      if (isPlayingRef.current) {
        const beat1 = Math.pow(Math.max(0, Math.sin(t * 2.8)), 3);
        const beat2 = Math.pow(Math.max(0, Math.sin(t * 1.4 + 1.2)), 2);
        const vocalFlurry = Math.sin(t * 5.4) * 0.2 + Math.cos(t * 3.8) * 0.15;
        const noise = (Math.sin(t * 11.5) * 0.5 + 0.5) * 0.15;

        const currentEnergy = Math.min(1.0, Math.max(0.25, 0.35 + beat1 * 0.45 + beat2 * 0.25 + vocalFlurry + noise));
        
        const b1 = Math.min(1.0, Math.max(0.15, beat1 * 0.85 + 0.15));
        const b2 = Math.min(1.0, Math.max(0.1, beat2 * 0.75 + noise * 0.5 + 0.2));
        const b3 = Math.min(1.0, Math.max(0.1, (Math.sin(t * 4.2) * 0.5 + 0.5) * 0.7 + 0.15));
        const b4 = Math.min(1.0, Math.max(0.08, (Math.cos(t * 6.8) * 0.5 + 0.5) * 0.65 + 0.1));

        setAudioLevel(currentEnergy);
        setFrequencyBands([b1, b2, b3, b4]);
      } else {
        const idleWave = (Math.sin(t * 0.8) * 0.5 + 0.5) * 0.12 + 0.08;
        setAudioLevel((prev) => prev * 0.9 + idleWave * 0.1);
        setFrequencyBands([0.1, 0.12, 0.1, 0.06]);
      }

      animId = requestAnimationFrame(updateAudioReactivity);
    };

    animId = requestAnimationFrame(updateAudioReactivity);

    const handleNativePlay = () => setIsPlaying(true);
    const handleNativePause = () => setIsPlaying(false);

    window.addEventListener('play', handleNativePlay, true);
    window.addEventListener('pause', handleNativePause, true);
    window.addEventListener('ended', handleNativePause, true);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('play', handleNativePlay, true);
      window.removeEventListener('pause', handleNativePause, true);
      window.removeEventListener('ended', handleNativePause, true);
    };
  }, []);

  return (
    <MediaPlaybackContext.Provider
      value={{
        isPlaying,
        title,
        category,
        audioLevel,
        frequencyBands,
        startPlayback,
        stopPlayback,
      }}
    >
      {children}
    </MediaPlaybackContext.Provider>
  );
};

export const useMediaPlayback = (): MediaPlaybackState => {
  const context = useContext(MediaPlaybackContext);
  if (!context) {
    throw new Error('useMediaPlayback must be used within a MediaPlaybackProvider');
  }
  return context;
};
