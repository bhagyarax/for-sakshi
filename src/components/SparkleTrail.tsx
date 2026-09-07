'use client';

import React, { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
  isHeart: boolean;
}

export default function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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

    const sparkles: Sparkle[] = [];
    const colors = [
      '#f59e0b', // Gold
      '#fbbf24', // Soft Gold
      '#fb7185', // Rose Pink
      '#f43f5e', // Crimson
      '#fdf6ec', // Warm Cream
    ];

    const addSparkle = (x: number, y: number, count = 2) => {
      for (let i = 0; i < count; i++) {
        sparkles.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          size: Math.random() * 3.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5 - 0.5,
          opacity: 1,
          life: 0,
          maxLife: Math.random() * 25 + 20,
          isHeart: Math.random() < 0.25,
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      addSparkle(e.clientX, e.clientY, 2);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        addSparkle(e.touches[0].clientX, e.touches[0].clientY, 3);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life++;
        s.x += s.speedX;
        s.y += s.speedY;
        s.opacity = 1 - s.life / s.maxLife;

        if (s.life >= s.maxLife) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.globalAlpha = Math.max(0, s.opacity);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;

        if (s.isHeart) {
          // Draw tiny glowing heart
          const hSize = s.size * 1.2;
          ctx.beginPath();
          ctx.moveTo(0, hSize * 0.3);
          ctx.bezierCurveTo(hSize * 0.5, -hSize * 0.5, hSize * 0.8, -hSize * 0.2, 0, hSize);
          ctx.bezierCurveTo(-hSize * 0.8, -hSize * 0.2, -hSize * 0.5, -hSize * 0.5, 0, hSize * 0.3);
          ctx.fill();
        } else {
          // 4-point star sparkle
          ctx.beginPath();
          ctx.arc(0, 0, s.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      aria-hidden="true"
    />
  );
}
