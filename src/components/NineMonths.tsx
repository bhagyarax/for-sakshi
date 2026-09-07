'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { nineReasons, photos, monthlyDates } from '@/data/content';
import PhotoLightbox from './PhotoLightbox';
import RelationshipCounter from './RelationshipCounter';

export default function NineMonths() {
  const [revealedStars, setRevealedStars] = useState<number[]>([]);
  const [activeLightbox, setActiveLightbox] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  const handleStarClick = (index: number) => {
    if (!revealedStars.includes(index)) {
      setRevealedStars((prev) => [...prev, index]);
    }
  };

  const handleRevealAllStars = () => {
    setRevealedStars(monthlyDates.map((_, i) => i));
  };

  const allRevealed = revealedStars.length === monthlyDates.length;

  return (
    <section className="relative w-full bg-midnight py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background ambient radial aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[95vw] h-[95vw] max-w-4xl bg-[radial-gradient(circle,rgba(212,165,116,0.1)_0%,rgba(139,34,82,0.05)_50%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Part A: The Big 9 Cinematic Moment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mb-16 sm:mb-24"
        >
          <span className="font-serif text-xs uppercase tracking-[0.3em] text-muted-gold/60 mb-2">
            ✦ Chapter 06 — The Milestone
          </span>

          <div className="relative">
            <span className="font-serif text-[7rem] sm:text-[10rem] md:text-[12rem] font-bold leading-none bg-gradient-to-b from-cream via-soft-gold to-deep-rose bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(201,168,124,0.3)]">
              9
            </span>
            <span className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 font-serif text-2xl sm:text-4xl text-cream tracking-widest uppercase">
              Months
            </span>
          </div>

          <div className="mt-8 sm:mt-12 space-y-2">
            <p className="font-hand text-2xl sm:text-3xl text-muted-gold italic">
              and somehow…
            </p>
            <p className="font-serif text-xl sm:text-3xl text-cream max-w-lg leading-relaxed">
              it still feels like the beautiful beginning of our forever.
            </p>
          </div>

          {/* Live Relationship Counter */}
          <div className="w-full mt-6">
            <RelationshipCounter />
          </div>
        </motion.div>

        {/* Part B: Crown Jewel Featured Portraits */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mb-20 sm:mb-28">
          {/* Main Crown Jewel Photo (Saree Couple - 07) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            onClick={() =>
              setActiveLightbox({
                src: photos.sareCouple.src,
                alt: photos.sareCouple.alt,
                caption: "Together in our traditional best — my favorite photo with you.",
              })
            }
            className="md:col-span-8 group relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-muted-gold/30 p-2 sm:p-3 bg-gradient-to-tr from-deep-rose/20 via-white/5 to-soft-gold/20 cursor-zoom-in"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={photos.sareCouple.src}
                alt={photos.sareCouple.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 45rem"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <span className="font-serif text-xs uppercase tracking-widest text-soft-gold">
                  Our Crown Jewel Moment
                </span>
                <p className="font-hand text-xl sm:text-2xl text-cream mt-1">
                  Holding your hand, always.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Secondary Featured Photo (Rust Anarkali - 12) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            onClick={() =>
              setActiveLightbox({
                src: photos.rustAnarkali.src,
                alt: photos.rustAnarkali.alt,
                caption: "Pure elegance, grace, and unmatched beauty.",
              })
            }
            className="md:col-span-4 group relative aspect-[3/4] md:aspect-auto rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/10 p-2 sm:p-3 bg-white/5 cursor-zoom-in"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={photos.rustAnarkali.src}
                alt={photos.rustAnarkali.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 25rem"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <p className="font-hand text-xl text-cream">
                  Every version of you is my favorite.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Part C: 9 Reasons Grid */}
        <div className="w-full max-w-3xl flex flex-col items-center mb-20 sm:mb-28">
          <h3 className="font-serif text-2xl sm:text-4xl text-cream text-center mb-10 sm:mb-12">
            9 Things I Need You To Know
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {nineReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-soft-gold/40 hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xs font-bold text-soft-gold">
                    Reason 0{index + 1}
                  </span>
                  <span className="text-deep-rose text-xs">✦</span>
                </div>
                <p className="font-serif text-base sm:text-lg text-cream/90 leading-relaxed">
                  {reason}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Part D: The 9-Month Star Constellation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-2xl bg-gradient-to-b from-wine/30 via-midnight to-midnight p-8 sm:p-12 rounded-3xl border border-muted-gold/25 shadow-2xl flex flex-col items-center text-center"
        >
          <span className="font-serif text-xs uppercase tracking-[0.3em] text-muted-gold/70 mb-2">
            ✦ Interactive Surprise
          </span>
          <h4 className="font-serif text-2xl sm:text-3xl text-cream mb-2">
            Our 9 Months in the Stars
          </h4>
          <p className="font-hand text-lg text-muted-gold italic mb-8">
            Tap each star to light up our journey month by month...
          </p>

          {/* Starfield Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-md my-4">
            {monthlyDates.map((date, idx) => {
              const isLit = revealedStars.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => handleStarClick(idx)}
                  className={`p-3 sm:p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center space-y-1 ${
                    isLit
                      ? 'bg-soft-gold/20 border-soft-gold shadow-[0_0_20px_rgba(212,165,116,0.4)] scale-105'
                      : 'bg-white/5 border-white/10 hover:border-soft-gold/50 active:scale-95'
                  }`}
                >
                  <span
                    className={`text-xl transition-transform ${
                      isLit ? 'text-soft-gold scale-125' : 'text-cream/40'
                    }`}
                  >
                    ✦
                  </span>
                  <span className="font-serif text-xs font-semibold text-cream">
                    {date.label}
                  </span>
                  <span className="font-sans text-[10px] text-muted-gold/80">
                    {date.month} 8
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 min-h-[3rem] flex items-center justify-center">
            {allRevealed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-1"
              >
                <p className="font-serif text-lg sm:text-xl text-soft-gold font-medium">
                  Every single month. Every single day. Yours. ❤️
                </p>
                <p className="font-hand text-sm text-cream/70">
                  9 months complete — a lifetime to go.
                </p>
              </motion.div>
            ) : (
              <button
                onClick={handleRevealAllStars}
                className="font-hand text-sm text-muted-gold/60 hover:text-muted-gold underline underline-offset-4"
              >
                (tap to light up all 9 months together)
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
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
