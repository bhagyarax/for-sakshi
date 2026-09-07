'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function StoryProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      {/* Ultra-fine golden progress line */}
      <div className="w-full h-[2px] bg-black/40 backdrop-blur-sm relative">
        <motion.div
          style={{ width: `${scrollProgress}%` }}
          className="h-full bg-gradient-to-r from-deep-rose via-soft-gold to-cream shadow-[0_0_10px_rgba(212,165,116,0.8)]"
        />
      </div>

      {/* Floating milestone pill */}
      {scrollProgress > 3 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-midnight/80 backdrop-blur-xl border border-muted-gold/25 shadow-lg"
        >
          <span className="font-serif text-[10px] sm:text-[11px] text-soft-gold tracking-widest uppercase">
            {scrollProgress < 15
              ? 'The Sparkle'
              : scrollProgress < 38
              ? 'Our Memories'
              : scrollProgress < 56
              ? 'The Little Things'
              : scrollProgress < 72
              ? 'A Letter For You'
              : scrollProgress < 86
              ? 'Our Soundtrack'
              : '9 Months & Forever'}
          </span>
        </motion.div>
      )}
    </div>
  );
}
