'use client';

import { useState } from 'react';

interface ControlPanelProps {
  onColorChange?: (color: string) => void;
  onSpeedChange?: (speed: number) => void;
  onReset?: () => void;
}

export default function ControlPanel({
  onColorChange,
  onSpeedChange,
  onReset
}: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [matrixColor, setMatrixColor] = useState('#ff4d88');
  const [speed, setSpeed] = useState(50);

  const colorPresets = [
    { name: 'Pink Love', matrix: '#ff4d88', particle: '#ffee99' },
    { name: 'Blue Dream', matrix: '#4d88ff', particle: '#99eeff' },
    { name: 'Purple Magic', matrix: '#b84dff', particle: '#ff99ee' },
    { name: 'Green Matrix', matrix: '#00ff00', particle: '#99ff99' },
    { name: 'Red Passion', matrix: '#ff0000', particle: '#ff9999' },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
        aria-label="Toggle Control Panel"
      >
        <span>⚙️</span>
        <span className="hidden sm:inline">Settings</span>
      </button>

      {/* Control Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-black/90 backdrop-blur-md border-l border-pink-500/30 shadow-2xl transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full sm:w-80`}
      >
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          <h2 className="text-2xl font-bold text-pink-400 mb-6">🎨 Pengaturan</h2>

          {/* Color Presets */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-pink-300">Tema Warna</h3>
            <div className="grid grid-cols-1 gap-2">
              {colorPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMatrixColor(preset.matrix);
                    if (onColorChange) onColorChange(preset.matrix);
                  }}
                  className="bg-pink-900/30 hover:bg-pink-800/50 text-white px-4 py-2 rounded-lg transition-all text-sm flex items-center justify-between"
                >
                  <span>{preset.name}</span>
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset.matrix }}
                    />
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset.particle }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Matrix Color */}
          <div className="space-y-2">
            <label className="text-pink-300 text-sm font-semibold">
              Warna Matrix
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={matrixColor}
                onChange={(e) => {
                  setMatrixColor(e.target.value);
                  if (onColorChange) onColorChange(e.target.value);
                }}
                className="w-12 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={matrixColor}
                onChange={(e) => {
                  setMatrixColor(e.target.value);
                  if (onColorChange) onColorChange(e.target.value);
                }}
                className="flex-1 bg-pink-900/30 text-white px-3 rounded border border-pink-500/30 focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          {/* Speed Control */}
          <div className="space-y-2">
            <label className="text-pink-300 text-sm font-semibold">
              Kecepatan Matrix: {speed}ms
            </label>
            <input
              type="range"
              min="20"
              max="100"
              value={speed}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setSpeed(val);
                if (onSpeedChange) onSpeedChange(val);
              }}
              className="w-full accent-pink-500"
            />
            <div className="flex justify-between text-xs text-pink-400">
              <span>Cepat</span>
              <span>Lambat</span>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              if (onReset) onReset();
              window.location.reload();
            }}
            className="w-full bg-pink-900/50 hover:bg-pink-800/70 text-pink-300 px-4 py-3 rounded-lg transition-all font-semibold"
          >
            🔄 Reset Animasi
          </button>

          {/* Info */}
          <div className="mt-8 p-4 bg-pink-900/20 rounded-lg border border-pink-500/20">
            <p className="text-xs text-pink-300 leading-relaxed">
              💡 <strong>Tips:</strong> Klik tema warna untuk mengubah tampilan secara instant!
            </p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
        />
      )}
    </>
  );
}
