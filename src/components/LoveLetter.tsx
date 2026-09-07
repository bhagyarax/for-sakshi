'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveLetter, MY_NAME, HER_NAME } from '@/data/content';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

export default function LoveLetter() {
  const [isSealBroken, setIsSealBroken] = useState(true);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [heartCount, setHeartCount] = useState(0);

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: rect.left + rect.width / 2,
      y: rect.top,
    };
    setHearts((prev) => [...prev, newHeart]);
    setHeartCount((c) => c + 1);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2000);
  };

  return (
    <section className="relative w-full bg-[#170812] py-20 sm:py-28 px-4 sm:px-6 flex flex-col items-center overflow-hidden">
      {/* Background ambient texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,34,82,0.15)_0%,rgba(10,6,8,0.95)_80%)] pointer-events-none" />

      {/* Floating hearts container */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: h.y, x: h.x - 12, scale: 0.8 }}
            animate={{
              opacity: 0,
              y: h.y - 180 - Math.random() * 80,
              x: h.x - 12 + (Math.random() - 0.5) * 80,
              scale: 1.5,
            }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="fixed text-2xl text-deep-rose"
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Section Label */}
        <span className="font-serif text-xs uppercase tracking-[0.3em] text-muted-gold/60 mb-6">
          ✦ Chapter 04 — Private Letter
        </span>

        {/* The Letter Parchment Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full bg-[#1f0b18] border border-muted-gold/30 rounded-3xl p-6 sm:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.8)] paper-texture"
        >
          {/* Top Wax Seal Stamp Detail */}
          <div className="flex justify-center -mt-12 sm:-mt-16 mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#7a132c] via-[#9e1b38] to-[#c92a4b] shadow-[0_4px_25px_rgba(158,27,56,0.6)] border-2 border-muted-gold/50 flex items-center justify-center text-cream font-serif text-xs sm:text-sm font-bold tracking-widest text-center uppercase p-1">
              <span>✦ S & B ✦</span>
            </div>
          </div>

          {/* Letter Heading */}
          <h3 className="font-serif text-2xl sm:text-4xl text-cream italic mb-8 sm:mb-10 text-center sm:text-left">
            {loveLetter.greeting || `My Dearest ${HER_NAME},`}
          </h3>

          {/* Paragraphs */}
          <div className="space-y-6 sm:space-y-8 font-serif text-base sm:text-lg text-cream/85 leading-relaxed">
            {loveLetter.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="first-letter:text-2xl first-letter:text-soft-gold">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Handwritten Signature */}
          <div className="mt-10 sm:mt-14 pt-6 border-t border-muted-gold/20 flex flex-col items-end text-right">
            <p className="font-hand text-2xl sm:text-3xl text-soft-gold italic">
              Forever yours,
            </p>
            <p className="font-serif text-lg sm:text-xl text-cream font-medium tracking-wide">
              {MY_NAME}
            </p>
          </div>

          {/* P.S. Section & Interactive Heart */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-dashed border-muted-gold/20 flex flex-col items-center text-center space-y-4">
            <p className="font-hand text-base sm:text-xl text-cream/75 italic max-w-md">
              {loveLetter.ps}
            </p>

            <div className="flex flex-col items-center pt-2">
              <button
                type="button"
                onClick={handleHeartClick}
                className="group relative px-6 py-3 rounded-full bg-deep-rose/20 hover:bg-deep-rose/40 border border-deep-rose/40 text-cream flex items-center space-x-2 transition-all duration-300 active:scale-90 shadow-md"
                aria-label="Send a hug"
              >
                <span className="text-xl animate-bounce">❤️</span>
                <span className="font-serif text-xs uppercase tracking-wider text-cream/90">
                  {heartCount > 0 ? `Sent ${heartCount} Hugs!` : 'Tap for Hugs'}
                </span>
              </button>
              <span className="text-[10px] font-sans text-muted-gold/40 mt-1">
                (you can tap as many times as you want)
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
