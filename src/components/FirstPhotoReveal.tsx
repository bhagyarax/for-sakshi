'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { photos, HER_NAME } from '@/data/content';
import PhotoLightbox from './PhotoLightbox';

export default function FirstPhotoReveal() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center bg-midnight py-16 px-4 sm:px-6 overflow-hidden">
      {/* Background ambient light bloom */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[90vw] h-[90vw] max-w-2xl max-h-2xl rounded-full bg-[radial-gradient(circle,rgba(201,168,124,0.15)_0%,rgba(139,34,82,0.1)_40%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full mx-auto text-center">
        {/* Chapter 01 Label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-xs uppercase tracking-[0.3em] text-muted-gold mb-3"
        >
          ✦ Chapter 01 — The Sparkle
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-2xl sm:text-4xl text-cream mb-8"
        >
          Where It All Began
        </motion.h2>

        {/* The Sparkle Hero Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setIsLightboxOpen(true)}
          className="group relative w-full aspect-[3/4] max-w-sm sm:max-w-md rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-2 border-muted-gold/40 p-2 sm:p-2.5 bg-gradient-to-tr from-deep-rose/30 via-white/10 to-soft-gold/30 cursor-zoom-in active:scale-[0.99] transition-transform"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={photos.theSparkle.src}
              alt={photos.theSparkle.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
              sizes="(max-width: 768px) 90vw, 28rem"
            />
            {/* Cinematic light vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Tap indicator */}
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-sans text-cream/90 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
              Tap to view full 🔍
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 sm:mt-8 space-y-2"
        >
          <p className="font-hand text-2xl sm:text-3xl text-cream italic">
            "The moment everything changed... and you became my favorite person."
          </p>
          <p className="font-serif text-xs text-soft-gold tracking-widest uppercase">
            {HER_NAME} & Bhagyaraj ‧ September 8, 2026
          </p>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        isOpen={isLightboxOpen}
        src={photos.theSparkle.src}
        alt={photos.theSparkle.alt}
        caption="The moment everything changed... and you became my favorite person."
        onClose={() => setIsLightboxOpen(false)}
      />
    </section>
  );
}
