'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { finalScene, photos, HER_NAME, MY_NAME } from '@/data/content';
import PhotoLightbox from './PhotoLightbox';

export default function FinalScene() {
  const [showHidden, setShowHidden] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen bg-midnight py-24 sm:py-32 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(139,34,82,0.2)_0%,rgba(10,6,8,0.95)_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Subtle Section Header */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-xs uppercase tracking-[0.3em] text-muted-gold/60 mb-6"
        >
          ✦ Chapter 07 — Forever
        </motion.span>

        {/* Narrative Words */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-4 mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-5xl text-cream tracking-tight">
            {finalScene.lines[0] || `${HER_NAME}…`}
          </h2>
          <p className="font-serif text-2xl sm:text-4xl text-soft-gold font-medium">
            {finalScene.lines[1] || 'Happy 9 Months.'}
          </p>
          <p className="font-serif text-3xl sm:text-5xl text-cream font-bold text-glow">
            {finalScene.lines[2] || 'I love you.'}
          </p>
          <p className="font-hand text-xl sm:text-2xl text-muted-gold italic pt-2">
            {finalScene.lines[3] || 'More than this little website could ever explain.'}
          </p>
        </motion.div>

        {/* Final Radiant Portrait (Sakshi Laughing - 13) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          onClick={() => setIsLightboxOpen(true)}
          className="group relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-muted-gold/40 p-2 sm:p-2.5 bg-gradient-to-tr from-deep-rose/30 via-white/10 to-soft-gold/30 cursor-zoom-in active:scale-[0.99] transition-transform"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={photos.burgundyRestaurant.src}
              alt={photos.burgundyRestaurant.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 90vw, 24rem"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="font-hand text-lg sm:text-xl text-cream drop-shadow-md">
                Your smile lights up my whole world.
              </span>
            </div>
          </div>
        </motion.div>

        {/* Final Secret Message Interaction */}
        <div className="w-full mt-10 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!showHidden ? (
              <motion.button
                key="reveal-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowHidden(true)}
                className="px-6 py-3 rounded-full bg-wine/60 hover:bg-wine/90 border border-soft-gold/40 text-cream font-serif text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(201,168,124,0.2)] hover:shadow-[0_0_30px_rgba(201,168,124,0.4)] active:scale-95"
              >
                ✦ Tap to Reveal Final Secret ✦
              </motion.button>
            ) : (
              <motion.div
                key="secret-box"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-muted-gold/30 backdrop-blur-md max-w-lg space-y-4"
              >
                <span className="text-2xl text-deep-rose animate-bounce inline-block">
                  ❤️
                </span>
                <p className="font-serif text-base sm:text-lg text-cream/95 leading-relaxed italic">
                  "{finalScene.hiddenMessage}"
                </p>
                <div className="pt-2 border-t border-white/10">
                  <span className="font-hand text-xl text-soft-gold">
                    {finalScene.signature || `— ${MY_NAME}`}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Replay Button & Footer */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/10 flex flex-col items-center space-y-4">
          <button
            onClick={handleReplay}
            className="px-5 py-2 rounded-full border border-white/10 hover:border-muted-gold/40 text-xs font-serif text-cream/70 hover:text-cream tracking-widest uppercase transition-all"
          >
            ↑ Replay From Beginning
          </button>
          <p className="font-hand text-sm text-cream/30">
            handcrafted with infinite love for Sakshi ❤️
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <PhotoLightbox
        isOpen={isLightboxOpen}
        src={photos.burgundyRestaurant.src}
        alt={photos.burgundyRestaurant.alt}
        caption="Your laugh is my favorite sound in the world."
        onClose={() => setIsLightboxOpen(false)}
      />
    </section>
  );
}
