'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoLightboxProps {
  isOpen: boolean;
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}

export default function PhotoLightbox({ isOpen, src, alt, caption, onClose }: PhotoLightboxProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 border border-cream/20 text-cream flex items-center justify-center text-xl hover:bg-white/20 transition-all z-50 active:scale-95"
          aria-label="Close photo"
        >
          ✕
        </button>

        {/* Photo Container */}
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl max-h-[82vh] w-full flex flex-col items-center cursor-default"
        >
          <div className="relative w-full h-[65vh] sm:h-[72vh] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-cream/10">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {caption && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 font-hand text-lg sm:text-2xl text-cream/90 text-center max-w-xl px-4"
            >
              {caption}
            </motion.p>
          )}

          <p className="mt-2 text-[11px] font-sans text-muted-gold/50 tracking-widest uppercase">
            Tap anywhere to return
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
