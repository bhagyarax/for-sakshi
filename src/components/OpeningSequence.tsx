'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingParticles from './FloatingParticles';
import { openingLines, HER_NAME, ANNIVERSARY_DATE } from '@/data/content';

interface OpeningSequenceProps {
  onScrollToUnlock: () => void;
}

export default function OpeningSequence({ onScrollToUnlock }: OpeningSequenceProps) {
  const [stage, setStage] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  // Progressive cinematic reveal
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400);   // "Hey, Sakshi."
    const t2 = setTimeout(() => setStage(2), 1600);  // "Before you scroll…"
    const t3 = setTimeout(() => setStage(3), 2800);  // "I made something for you."
    const t4 = setTimeout(() => setStage(4), 4000);  // "Happy 9 Months ❤️"
    const t5 = setTimeout(() => {
      setStage(5);
      setCanProceed(true);
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleProceed = useCallback(() => {
    onScrollToUnlock();
  }, [onScrollToUnlock]);

  // Listen for scroll, touch swipe, click, or keyboard input
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 20) {
        handleProceed();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchStartY - touchEndY > 30) {
        handleProceed();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'Enter', 'ArrowDown', 'PageDown'].includes(e.code)) {
        handleProceed();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleProceed]);

  return (
    <div 
      onClick={handleProceed}
      className="relative min-h-screen w-full bg-midnight flex flex-col items-center justify-center overflow-hidden px-6 py-12 cursor-pointer select-none"
    >
      {/* Ambient background particles */}
      <FloatingParticles intensity={0.5} />

      {/* Subtle radial ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85vw] h-[85vw] max-w-xl max-h-xl rounded-full bg-[radial-gradient(circle,rgba(139,34,82,0.15)_0%,rgba(10,6,8,0)_70%)] blur-2xl" />
      </div>

      {/* Main Content Container */}
      <div className="z-10 flex flex-col items-center text-center max-w-xl mx-auto space-y-6">
        {/* Line 1: Hey, Sakshi. */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream tracking-tight"
            >
              {openingLines[0] || `Hey, ${HER_NAME}.`}
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Line 2: Before you scroll… */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="font-serif text-lg sm:text-xl md:text-2xl text-muted-gold font-normal"
            >
              {openingLines[1] || 'Before you scroll…'}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Line 3: I made something for you. */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="font-serif text-lg sm:text-xl md:text-2xl text-cream/90"
            >
              {openingLines[2] || 'I made something for you.'}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Climax: Happy 9 Months ❤️ */}
        <AnimatePresence>
          {stage >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="pt-6 sm:pt-8 flex flex-col items-center space-y-3"
            >
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream text-glow font-medium leading-tight">
                Happy 9 Months
              </h2>
              <div className="text-deep-rose text-3xl sm:text-4xl animate-pulse-soft">
                ❤️
              </div>
              <p className="font-hand text-muted-gold text-xl sm:text-2xl tracking-wider pt-1">
                {ANNIVERSARY_DATE}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Prompt / Scroll Button */}
        <AnimatePresence>
          {stage >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="pt-10 flex flex-col items-center space-y-4"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleProceed();
                }}
                className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-wine/80 to-dark-mauve/80 border border-muted-gold/40 text-cream font-serif text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(201,168,124,0.2)] hover:shadow-[0_0_30px_rgba(201,168,124,0.4)] hover:border-muted-gold transition-all duration-300 active:scale-95"
              >
                <span className="flex items-center space-x-2">
                  <span>Enter Our Story</span>
                  <span className="text-soft-gold group-hover:translate-x-0.5 transition-transform">✦</span>
                </span>
              </button>

              <div className="flex flex-col items-center space-y-1 opacity-60">
                <span className="font-hand text-xs text-cream/70">or tap anywhere to unlock</span>
                <div className="w-4 h-7 border border-muted-gold/40 rounded-full flex justify-center p-1">
                  <div className="w-1 h-2 bg-muted-gold rounded-full animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
