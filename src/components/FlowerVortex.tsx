'use client';

import React, { useEffect, useRef } from 'react';

interface FlowerVortexProps {
  active: boolean;
  onComplete?: () => void;
}

interface Petal {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  petalType: number;
  rotation: number;
  rotationSpeed: number;
  angle: number;
  radius: number;
  angularSpeed: number;
  radialSpeed: number;
  opacity: number;
  targetOpacity: number;
  scaleY: number;
}

const PETAL_COLORS = [
  // Deep Velvet Rose
  '#be123c',
  '#e11d48',
  '#fda4af',
  // Crimson & Wine
  '#881337',
  '#9f1239',
  '#701a75',
  // Warm Gold & Champagne
  '#f59e0b',
  '#fbbf24',
  '#d97706',
  '#fde68a',
  // Plumeria & Blush Pink
  '#f472b6',
  '#ec4899',
  '#db2777',
  '#fff1f2',
  // Coral & Sunset Peach
  '#fb923c',
  '#f97316',
  '#fdba74',
  // Orchid & Violet
  '#a855f7',
  '#c084fc',
];

export default function FlowerVortex({ active, onComplete }: FlowerVortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate 220 rich petals
    const petalCount = Math.min(240, Math.floor((width * height) / 3800));
    const petals: Petal[] = [];
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < petalCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const initialRadius = Math.random() * Math.max(width, height) * 0.9 + 50;
      petals.push({
        x: centerX + Math.cos(angle) * initialRadius,
        y: centerY + Math.sin(angle) * initialRadius,
        z: Math.random() * 200 + 50,
        size: Math.random() * 16 + 10,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        petalType: Math.floor(Math.random() * 3), // 0: oval petal, 1: curved rose, 2: heart blossom
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        angle: angle,
        radius: initialRadius,
        angularSpeed: (Math.random() * 0.03 + 0.02) * (Math.random() > 0.5 ? 1 : -1),
        radialSpeed: Math.random() * 4 + 3,
        opacity: 0,
        targetOpacity: Math.random() * 0.4 + 0.6,
        scaleY: Math.random() * 0.6 + 0.4,
      });
    }

    let animationFrameId: number;
    let startTime = performance.now();
    let phase = 'swirling'; // swirling -> covering -> dispersing

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(1, p.scaleY);

      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      if (p.petalType === 0) {
        // Smooth oval petal
        ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
      } else if (p.petalType === 1) {
        // Curved rose petal
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.9, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.8, -p.size * 0.6, 0, -p.size);
      } else {
        // Heart-shaped flower petal
        ctx.moveTo(0, p.size * 0.3);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.9, -p.size, 0, -p.size * 0.3);
        ctx.bezierCurveTo(-p.size * 0.9, -p.size, -p.size * 0.8, -p.size * 0.5, 0, p.size * 0.3);
      }
      ctx.fill();

      // Soft center vein highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.lineTo(0, p.size * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;

      // Dark translucent trail for motion blur effect
      ctx.fillStyle = 'rgba(10, 6, 8, 0.15)';
      ctx.fillRect(0, 0, width, height);

      let allDispersed = true;

      petals.forEach((p, idx) => {
        // Fade in rapidly
        if (p.opacity < p.targetOpacity && elapsed < 2.5) {
          p.opacity += 0.03;
        }

        if (elapsed < 1.8) {
          // Phase 1: Swirl rapidly inwards towards center creating a vortex
          p.angle += p.angularSpeed * 1.5;
          p.radius -= p.radialSpeed * 1.2;
          if (p.radius < 20) p.radius = Math.random() * 80 + 20;
          p.x = centerX + Math.cos(p.angle) * p.radius;
          p.y = centerY + Math.sin(p.angle) * p.radius;
        } else if (elapsed < 3.2) {
          // Phase 2: Blossom explosion covering the entire screen
          p.angle += p.angularSpeed * 0.8;
          p.radius += p.radialSpeed * 3.5;
          p.x = centerX + Math.cos(p.angle) * p.radius;
          p.y = centerY + Math.sin(p.angle) * p.radius;
          p.size = Math.min(32, p.size * 1.01);
        } else {
          // Phase 3: Gentle dispersal with drifting wind
          p.x += Math.cos(p.angle) * 3 + Math.sin(elapsed * 2 + idx) * 1.5;
          p.y += Math.sin(p.angle) * 3 + 2; // drift downwards gently
          p.opacity -= 0.012;
          if (p.opacity > 0) allDispersed = false;
        }

        p.rotation += p.rotationSpeed;
        p.scaleY = 0.4 + Math.sin(elapsed * 4 + idx) * 0.4;

        if (p.opacity > 0) {
          drawPetal(p);
        }
      });

      // Ambient golden flash at peak
      if (elapsed > 1.6 && elapsed < 2.4) {
        const flashAlpha = Math.sin((elapsed - 1.6) * Math.PI * 1.25) * 0.35;
        ctx.fillStyle = `rgba(253, 246, 236, ${flashAlpha})`;
        ctx.fillRect(0, 0, width, height);
      }

      if (elapsed < 4.5 && !allDispersed) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        if (onComplete) onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none w-full h-full"
    />
  );
}
