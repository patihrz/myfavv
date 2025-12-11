'use client';

import { useState } from 'react';

interface VaultLockProps {
  onUnlock: () => void;
}

export default function VaultLock({ onUnlock }: VaultLockProps) {
  const [code, setCode] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [clickSound, setClickSound] = useState(0);
  const correctCode = '191125';

  const handleNumberClick = (num: number) => {
    // Click sound effect (visual feedback)
    setClickSound(prev => prev + 1);
    
    if (code.length >= 6) return;

    const newCode = [...code, num.toString()];
    setCode(newCode);
    setError(false);

    // Check if complete
    if (newCode.length === 6) {
      const enteredCode = newCode.join('');
      if (enteredCode === correctCode) {
        // Unlock animation
        setTimeout(() => onUnlock(), 800);
      } else {
        // Wrong code
        setError(true);
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setCode([]);
        }, 600);
      }
    }
  };

  const handleClear = () => {
    setCode([]);
    setError(false);
  };

  const handleBackspace = () => {
    setCode(prev => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center justify-center">
      {/* Vault Door Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[40px] border-zinc-700 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-[30px] border-zinc-800 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-[20px] border-zinc-700 rounded-full" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg px-4 sm:px-6 lg:px-8">
        {/* Lock Icon */}
        <div className="flex justify-center mb-4 sm:mb-6 lg:mb-4">
          <div className="relative">
            <div className="w-12 h-16 sm:w-16 sm:h-20 lg:w-14 lg:h-18 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-t-full border-3 sm:border-4 border-zinc-600" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-14 sm:h-14 lg:w-12 lg:h-12 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-lg border-3 sm:border-4 border-zinc-700 flex items-center justify-center">
              <div className="w-2.5 h-5 sm:w-3 sm:h-6 lg:w-3 lg:h-6 bg-zinc-900 rounded-full" />
            </div>
          </div>
        </div>

        {/* Title */}
        <p className="text-center text-zinc-400 mb-3 sm:mb-4 lg:mb-4 text-xs sm:text-sm lg:text-sm">
          Click numbers to enter code
        </p>

        {/* Code Display */}
        <div className={`flex gap-1 sm:gap-1.5 lg:gap-2 justify-center mb-4 sm:mb-6 lg:mb-5 ${shake ? 'animate-shake' : ''}`}>
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={`
                w-8 h-11 sm:w-9 sm:h-12 lg:w-10 lg:h-13 
                flex items-center justify-center
                text-lg sm:text-xl lg:text-2xl font-bold
                bg-gradient-to-br from-zinc-800 to-zinc-900
                border-2 ${error ? 'border-red-500' : code[index] ? 'border-pink-500' : 'border-zinc-700'}
                rounded-lg sm:rounded-xl
                transition-all duration-200
                text-zinc-100
                shadow-lg
                ${code[index] ? 'scale-105' : 'scale-100'}
              `}
            >
              {code[index] || ''}
            </div>
          ))}
        </div>

        {/* Number Keypad */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 lg:gap-2 mb-3 sm:mb-4 lg:mb-4 max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              disabled={code.length >= 6}
              className="group relative w-full aspect-square bg-gradient-to-br from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 disabled:from-zinc-800 disabled:to-zinc-900 rounded-lg sm:rounded-xl border-2 border-zinc-600 hover:border-pink-500 disabled:border-zinc-700 transition-all duration-200 active:scale-95 disabled:cursor-not-allowed shadow-lg"
            >
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-zinc-100 group-hover:text-pink-400 transition-colors">
                {num}
              </span>
              <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-pink-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
          ))}
          <button
            onClick={handleClear}
            className="bg-gradient-to-br from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 rounded-lg sm:rounded-xl border-2 border-red-600 transition-all duration-200 active:scale-95 shadow-lg"
          >
            <span className="text-sm sm:text-base lg:text-lg font-bold text-white">CLR</span>
          </button>
          <button
            onClick={() => handleNumberClick(0)}
            disabled={code.length >= 6}
            className="group relative bg-gradient-to-br from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 disabled:from-zinc-800 disabled:to-zinc-900 rounded-lg sm:rounded-xl border-2 border-zinc-600 hover:border-pink-500 disabled:border-zinc-700 transition-all duration-200 active:scale-95 disabled:cursor-not-allowed shadow-lg"
          >
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-zinc-100 group-hover:text-pink-400 transition-colors">
              0
            </span>
            <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-pink-500 opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
          <button
            onClick={handleBackspace}
            className="bg-gradient-to-br from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 rounded-lg sm:rounded-xl border-2 border-zinc-600 hover:border-pink-500 transition-all duration-200 active:scale-95 shadow-lg"
          >
            <span className="text-sm sm:text-base lg:text-lg font-bold text-zinc-100">←</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-400 text-sm mb-4 animate-pulse">
            Invalid code. Try again.
          </p>
        )}

        {/* Hint Section */}
        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-4 border border-zinc-700/50">
          <div className="text-center space-y-1 sm:space-y-2">
            <p className="text-zinc-400 text-xs sm:text-sm lg:text-sm font-medium">
              Need a hint?
            </p>
            <p className="text-pink-400 text-base sm:text-lg lg:text-lg font-semibold">
              Tanggal jadian kita
            </p>
            <p className="text-zinc-500 text-[10px] sm:text-xs lg:text-xs">
              Format: DDMMYY (6 digits)
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
}
