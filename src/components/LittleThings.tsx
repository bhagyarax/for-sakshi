'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { littleThings, photos } from '@/data/content';
import PhotoLightbox from './PhotoLightbox';

export default function LittleThings() {
  const [activeLightbox, setActiveLightbox] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const photoCards = [
    {
      photo: photos.flowerPortrait,
      caption: "A flower in your hair... the sweetest smile.",
    },
    {
      photo: photos.intimateSelfie,
      caption: "Just being close to you makes any day perfect.",
    },
    {
      photo: photos.flowersBehindEar,
      caption: "You look effortlessly beautiful every single time.",
    },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-midnight via-wine/20 to-midnight py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-3xl rounded-full bg-deep-rose/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 space-y-2"
        >
          <span className="font-serif text-xs uppercase tracking-[0.3em] text-muted-gold/60">
            ✦ Chapter 03
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream tracking-tight">
            The Little Things I Love
          </h2>
          <p className="font-hand text-xl sm:text-2xl text-muted-gold italic">
            The details you probably don't even realize I notice...
          </p>
        </motion.div>

        {/* 3 Circular Glowing Photo Portals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-4 sm:gap-8 mb-12"
        >
          {photoCards.map((item, idx) => (
            <div
              key={idx}
              onClick={() =>
                setActiveLightbox({
                  src: item.photo.src,
                  alt: item.photo.alt,
                  caption: item.caption,
                })
              }
              className={`group relative w-20 h-20 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-muted-gold via-deep-rose to-soft-gold shadow-[0_0_20px_rgba(201,168,124,0.3)] hover:shadow-[0_0_30px_rgba(201,168,124,0.6)] cursor-zoom-in transition-transform duration-300 hover:scale-110 active:scale-95 ${
                idx === 1 ? '-translate-y-3' : ''
              }`}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={item.photo.src}
                  alt={item.photo.alt}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-midnight/90 border border-muted-gold/30 rounded-full px-2 py-0.5 text-[9px] font-serif text-cream uppercase whitespace-nowrap">
                Memory ✦
              </div>
            </div>
          ))}
        </motion.div>

        {/* The Little Things Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {littleThings.map((thing, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group relative p-5 sm:p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-muted-gold/15 hover:border-muted-gold/40 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-[0_10px_30px_rgba(139,34,82,0.15)] flex items-start space-x-4 cursor-default"
            >
              <span className="font-serif text-xs text-soft-gold/70 mt-1 font-semibold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="font-serif text-base sm:text-lg text-cream/90 group-hover:text-cream leading-relaxed transition-colors">
                {thing}
              </p>
              <span className="text-deep-rose text-sm opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                ❤️
              </span>
            </motion.div>
          ))}
        </div>

        {/* Closing Thought */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16 max-w-lg"
        >
          <p className="font-hand text-2xl sm:text-3xl text-muted-gold italic leading-relaxed">
            "...and a thousand more things I'll spend forever discovering."
          </p>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <PhotoLightbox
          isOpen={true}
          src={activeLightbox.src}
          alt={activeLightbox.alt}
          caption={activeLightbox.caption}
          onClose={() => setActiveLightbox(null)}
        />
      )}
    </section>
  );
}
