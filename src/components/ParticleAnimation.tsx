'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
}

interface Burst {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  char: string;
}

interface ParticleAnimationProps {
  color?: string;
  sequence?: string[];
  onComplete?: () => void;
}

export default function ParticleAnimation({
  color = '#ffee99',
  sequence = ['3', '2', '1', 'YOU', 'ARE', 'MY', 'LOVE', '❤'],
  onComplete
}: ParticleAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const burstsRef = useRef<Burst[]>([]);
  const indexRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const getTextPoints = (text: string, canvas: HTMLCanvasElement) => {
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return [];

    const isMobile = canvas.width < 768;
    tempCanvas.width = isMobile ? 400 : 600;
    tempCanvas.height = isMobile ? 200 : 300;

    ctx.fillStyle = 'white';
    const fontSize = isMobile ? 80 : 140;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add stroke for thicker text
    ctx.strokeStyle = 'white';
    const strokeWidth = isMobile ? 4 : 8;
    ctx.lineWidth = strokeWidth;
    ctx.strokeText(text, tempCanvas.width / 2, tempCanvas.height / 2);
    ctx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2);

    const data = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height).data;
    const points: { x: number; y: number }[] = [];
    const step = 3;

    for (let y = 0; y < tempCanvas.height; y += step) {
      for (let x = 0; x < tempCanvas.width; x += step) {
        if (data[(y * tempCanvas.width + x) * 4 + 3] > 20) {
          points.push({ x, y });
        }
      }
    }

    const sx = canvas.width / tempCanvas.width;
    const sy = canvas.height / tempCanvas.height;

    return points.map(p => ({
      x: p.x * sx,
      y: p.y * sy
    }));
  };

  const getHeartShape = (canvas: HTMLCanvasElement) => {
    const points: { x: number; y: number }[] = [];

    for (let y = -12; y < 12; y += 0.25) {
      for (let x = -12; x < 12; x += 0.25) {
        const eq = Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y;
        if (eq <= 0) {
          points.push({ x, y });
        }
      }
    }

    const scale = Math.min(canvas.width, canvas.height) / 30;

    return points.map(p => ({
      x: canvas.width / 2 + p.x * scale,
      y: canvas.height / 2 - p.y * scale
    }));
  };

  const morphTo = (points: { x: number; y: number }[], canvas: HTMLCanvasElement) => {
    particlesRef.current = points.map(pt => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      tx: pt.x,
      ty: pt.y,
      vx: 0,
      vy: 0
    }));
  };

  const explode = () => {
    particlesRef.current.forEach(p => {
      p.vx = (Math.random() - 0.5) * 25;
      p.vy = (Math.random() - 0.5) * 25;
    });
  };

  const spawnBurst = (canvas: HTMLCanvasElement) => {
    const burstChars = ['❤', '💕', '💖', '✨', '💗', '💘'];
    for (let i = 0; i < 100; i++) {
      burstsRef.current.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 120,
        char: burstChars[Math.floor(Math.random() * burstChars.length)]
      });
    }
  };

  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw particles
    particlesRef.current.forEach(p => {
      p.vx += (p.tx - p.x) * 0.08;
      p.vy += (p.ty - p.y) * 0.08;

      p.vx *= 0.85;
      p.vy *= 0.85;

      p.x += p.vx;
      p.y += p.vy;

      const isMobile = canvas.width < 768;
      const particleSize = isMobile ? 3 : 4.5;
      
      ctx.fillStyle = color;
      // Removed shadow/glow effects
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw bursts
    burstsRef.current = burstsRef.current.filter(h => {
      const opacity = h.life / 120;
      const isMobile = canvas.width < 768;
      const burstSize = isMobile ? 18 : 26;
      ctx.fillStyle = `rgba(255, 100, 150, ${opacity})`;
      // Removed glow effect
      ctx.shadowBlur = 0;
      ctx.font = `${burstSize}px Arial`;
      ctx.fillText(h.char, h.x, h.y);

      h.x += h.vx;
      h.y += h.vy;
      h.life--;

      return h.life > 0;
    });

    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx));
  };

  const nextStep = (canvas: HTMLCanvasElement) => {
    if (indexRef.current >= sequence.length) {
      if (onComplete) onComplete();
      return;
    }

    const currentIndex = indexRef.current;
    
    // Explode effect before morphing (except first one)
    if (currentIndex > 0) {
      explode();
    }

    setTimeout(() => {
      const currentText = sequence[currentIndex];
      
      // Special effect for last word
      if (currentIndex === sequence.length - 1) {
        spawnBurst(canvas);
      }
      
      const target = getTextPoints(currentText, canvas);
      morphTo(target, canvas);
      
      // Increment AFTER we use the current value
      indexRef.current = currentIndex + 1;

      if (indexRef.current < sequence.length) {
        setTimeout(() => nextStep(canvas), 2200);
      } else {
        if (onComplete) {
          setTimeout(onComplete, 2000);
        }
      }
    }, 350);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reset everything to start fresh
    indexRef.current = 0;
    particlesRef.current = [];
    burstsRef.current = [];

    // Start animation loop
    animate(canvas, ctx);
    
    // Delay longer to ensure proper initialization
    const timeoutId = setTimeout(() => {
      nextStep(canvas);
    }, 500);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}
