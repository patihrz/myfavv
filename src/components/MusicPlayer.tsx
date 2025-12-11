'use client';

import { useRef, useEffect, useState } from 'react';

interface MusicPlayerProps {
  autoPlay?: boolean;
}

export default function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (autoPlay && audioRef.current && !hasInteracted) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          // Autoplay blocked - user needs to interact
          setIsPlaying(false);
        });
    }
  }, [autoPlay, hasInteracted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((error) => {
            console.log('Play failed:', error);
          });
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        {/* Add your music file in public folder as love-music.mp3 */}
        <source src="/love-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Control Button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-20 sm:bottom-24 right-4 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-pink-600/80 hover:bg-pink-600 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-pink-500/50 group"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
        <div className="absolute inset-0 rounded-full bg-pink-400 opacity-0 group-hover:opacity-30 blur-lg transition-opacity" />
      </button>
    </>
  );
}
