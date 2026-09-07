'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { storySections } from '@/data/content';
import PhotoLightbox from './PhotoLightbox';

export default function StoryTimeline() {
  const [activeLightbox, setActiveLightbox] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  return (
    <div className="w-full flex flex-col bg-midnight relative">
      {/* Golden Timeline Thread running down the center */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-muted-gold/20 to-transparent hidden md:block" />

      {storySections.map((section, idx) => (
        <section
          key={section.id}
          className="relative w-full py-16 sm:py-24 flex flex-col justify-center max-w-4xl mx-auto px-4 sm:px-6 overflow-hidden"
        >
          {/* Chapter Header */}
          <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-muted-gold/60 mb-2">
              ✦ Chapter {section.number}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream tracking-tight">
              {section.title}
            </h2>
          </div>

          {/* Section Style 1: Polaroid (The Beginning) */}
          {section.style === 'polaroid' && (
            <div className="relative w-full max-w-md mx-auto">
              {/* Washi tape visual detail at top of polaroid */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-cream/30 backdrop-blur-sm -rotate-2 z-20 shadow-sm border-dashed border-t border-b border-black/10" />

              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
                viewport={{ once: true }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                onClick={() =>
                  setActiveLightbox({
                    src: section.photo!.src,
                    alt: section.photo!.alt,
                    caption: section.caption,
                  })
                }
                className="relative w-full bg-stone-100 p-4 pb-14 rounded-md shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-zoom-in"
              >
                <div className="relative w-full aspect-[4/5] rounded overflow-hidden">
                  <Image
                    src={section.photo!.src}
                    alt={section.photo!.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 24rem"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
                <p className="absolute bottom-4 left-0 w-full text-center font-hand text-warm-black text-xl sm:text-2xl px-4">
                  {section.caption}
                </p>
              </motion.div>
            </div>
          )}

          {/* Section Style 2: Fullbleed / Magazine Cover (Getting Closer) */}
          {section.style === 'fullbleed' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              onClick={() =>
                setActiveLightbox({
                  src: section.photo!.src,
                  alt: section.photo!.alt,
                  caption: section.caption,
                })
              }
              className="group relative w-full max-w-2xl mx-auto h-[70vh] sm:h-[78vh] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 cursor-zoom-in"
            >
              <Image
                src={section.photo!.src}
                alt={section.photo!.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 95vw, 42rem"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-center flex flex-col items-center">
                <span className="font-serif text-xs text-soft-gold tracking-widest uppercase mb-2">
                  Memories In Focus
                </span>
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-cream max-w-lg leading-relaxed drop-shadow-lg">
                  "{section.caption}"
                </p>
              </div>
            </motion.div>
          )}

          {/* Section Style 3: Editorial Dual Collage (The Memories) */}
          {section.style === 'collage' && (
            <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
                {/* Photo 1: Scenic Viewpoint */}
                <motion.div
                  initial={{ opacity: 0, x: -30, rotate: -2 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
                  viewport={{ once: true }}
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  transition={{ duration: 0.8 }}
                  onClick={() =>
                    setActiveLightbox({
                      src: section.photos![0].src,
                      alt: section.photos![0].alt,
                      caption: "High up with the views — but looking at you.",
                    })
                  }
                  className="group relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-zoom-in p-2 bg-white/5"
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={section.photos![0].src}
                      alt={section.photos![0].alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 90vw, 20rem"
                    />
                  </div>
                </motion.div>

                {/* Photo 2: Horse Outing */}
                <motion.div
                  initial={{ opacity: 0, x: 30, rotate: 2 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
                  viewport={{ once: true }}
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  onClick={() =>
                    setActiveLightbox({
                      src: section.photos![1].src,
                      alt: section.photos![1].alt,
                      caption: "Every adventure with you is my favorite memory.",
                    })
                  }
                  className="group relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-zoom-in p-2 bg-white/5 sm:translate-y-8"
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={section.photos![1].src}
                      alt={section.photos![1].alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 90vw, 20rem"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-cream/90 text-lg sm:text-xl text-center mt-12 sm:mt-16 max-w-md px-4 leading-relaxed"
              >
                {section.caption}
              </motion.p>
            </div>
          )}

          {/* Section Style 4: The Chaos & Secret Photo */}
          {section.style === 'scattered' && (
            <ScatteredSection
              section={section}
              onOpenLightbox={(src, alt, caption) =>
                setActiveLightbox({ src, alt, caption })
              }
            />
          )}
        </section>
      ))}

      {/* Global Lightbox for Story Timeline */}
      {activeLightbox && (
        <PhotoLightbox
          isOpen={true}
          src={activeLightbox.src}
          alt={activeLightbox.alt}
          caption={activeLightbox.caption}
          onClose={() => setActiveLightbox(null)}
        />
      )}
    </div>
  );
}

function ScatteredSection({
  section,
  onOpenLightbox,
}: {
  section: any;
  onOpenLightbox: (src: string, alt: string, caption: string) => void;
}) {
  const [showHidden, setShowHidden] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col items-center">
      {/* Main Kiss Marks Polaroid */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 1 }}
        viewport={{ once: true }}
        whileHover={{ rotate: 0 }}
        className="relative w-full bg-stone-100 p-4 pb-14 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
      >
        <div
          onClick={() =>
            onOpenLightbox(
              section.photo!.src,
              section.photo!.alt,
              "The filter was cute... but you were cuter."
            )
          }
          className="relative w-full aspect-[4/5] rounded overflow-hidden cursor-zoom-in"
        >
          <Image
            src={section.photo!.src}
            alt={section.photo!.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 24rem"
          />
        </div>

        {/* Secret Button 🤫 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowHidden((prev) => !prev);
          }}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-wine/80 hover:bg-wine text-white text-sm flex items-center space-x-1.5 shadow-md border border-soft-gold/30 hover:scale-105 active:scale-95 transition-all z-30"
          title="Click for a surprise"
        >
          <span>🤫</span>
          <span className="font-serif text-[11px] text-cream">Secret</span>
        </button>

        {/* Hidden Funny Face Polaroid Drop */}
        <AnimatePresence>
          {showHidden && (
            <motion.div
              initial={{ opacity: 0, y: -80, rotate: -15, scale: 0.8 }}
              animate={{ opacity: 1, y: 20, rotate: -6, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.8 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              onClick={() =>
                onOpenLightbox(
                  section.hiddenPhoto!.src,
                  section.hiddenPhoto!.alt,
                  "Yes, I saved this one too 😂 (My favorite)"
                )
              }
              className="absolute -bottom-16 -left-6 sm:-left-10 w-[75%] aspect-[4/5] bg-stone-50 p-2.5 pb-10 rounded-md shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-deep-rose/30 z-40 cursor-zoom-in"
            >
              <div className="relative w-full h-full rounded overflow-hidden">
                <Image
                  src={section.hiddenPhoto!.src}
                  alt={section.hiddenPhoto!.alt}
                  fill
                  className="object-cover"
                  sizes="18rem"
                />
              </div>
              <p className="absolute bottom-2 left-0 w-full text-center font-hand text-deep-rose text-sm font-semibold">
                yes, I saved this one too 😂 ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <p className="font-hand text-cream/90 text-2xl sm:text-3xl text-center mt-14 sm:mt-16 px-4 leading-relaxed">
        {section.caption}
      </p>
    </div>
  );
}
