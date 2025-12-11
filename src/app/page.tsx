'use client';

import { useState } from 'react';
import MatrixRain from '@/components/MatrixRain';
import ParticleAnimation from '@/components/ParticleAnimation';
import ControlPanel from '@/components/ControlPanel';
import MusicPlayer from '@/components/MusicPlayer';
import VaultLock from '@/components/VaultLock';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [matrixColor, setMatrixColor] = useState('#ff4d88');
  const [matrixSpeed, setMatrixSpeed] = useState(50);
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey(prev => prev + 1);
  };

  if (!isUnlocked) {
    return <VaultLock onUnlock={() => setIsUnlocked(true)} />;
  }

  if (!isStarted) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
        <button
          onClick={() => setIsStarted(true)}
          className="group relative px-12 py-6 bg-gradient-to-br from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 rounded-full text-white font-bold text-2xl transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-pink-500/50"
        >
          <span className="flex items-center gap-4">
            <span className="text-4xl">▶</span>
            <span>PLAY</span>
          </span>
          <div className="absolute inset-0 rounded-full bg-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Matrix Background */}
      <MatrixRain key={`matrix-${key}-${isStarted}`} color={matrixColor} speed={matrixSpeed} />

      {/* Particle Animation - Only render when started */}
      {isStarted && (
        <ParticleAnimation
          key={`particle-${key}-${isStarted}`}
          sequence={['3', '2', '1', 'FADILA', 'YOU', 'ARE', 'MY', 'LOVE']}
        />
      )}

      {/* Control Panel */}
      <ControlPanel
        onColorChange={setMatrixColor}
        onSpeedChange={setMatrixSpeed}
        onReset={handleReset}
      />

      {/* Music Player */}
      <MusicPlayer autoPlay={true} />

      {/* Credit Footer */}
      <div className="fixed bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-50 text-pink-300 text-xs sm:text-sm font-light tracking-wide">
        <div className="flex items-center gap-1 sm:gap-2 bg-black/50 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-pink-500/20">
          <span>crafted with love</span>
          <span className="font-semibold text-pink-400">-Patih</span>
        </div>
      </div>
    </div>
  );
}
