'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundtrack } from '@/data/content';

export default function Soundtrack() {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  const toggleSong = (idx: number) => {
    setPlayingIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="relative w-full bg-midnight py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-2xl bg-wine/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 space-y-2"
        >
          <span className="font-serif text-xs uppercase tracking-[0.3em] text-muted-gold/60">
            ✦ Chapter 05
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream tracking-tight">
            {soundtrack.title}
          </h2>
          <p className="font-hand text-xl sm:text-2xl text-muted-gold italic">
            {soundtrack.subtitle}
          </p>
        </motion.div>

        {/* Song Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
          {soundtrack.songs.map((song, idx) => {
            const isSelected = playingIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group relative rounded-3xl p-6 overflow-hidden border transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-br from-wine/80 via-dark-mauve/70 to-midnight border-soft-gold/60 shadow-[0_0_30px_rgba(212,165,116,0.25)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-muted-gold/30 shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between">
                  {/* Song Info */}
                  <div className="space-y-1 max-w-[70%]">
                    <span className="font-sans text-[10px] text-muted-gold/60 uppercase tracking-widest">
                      Track 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-cream font-medium">
                      {song.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-cream/60">
                      {song.artist}
                    </p>
                  </div>

                  {/* Vinyl Record Visual */}
                  <div
                    onClick={() => toggleSong(idx)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-black via-zinc-900 to-zinc-800 border border-white/20 flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-500 ${
                      isSelected ? 'animate-spin' : 'group-hover:rotate-45'
                    }`}
                    style={{ animationDuration: '4s' }}
                    title="Tap to spin record"
                  >
                    <div className="w-5 h-5 rounded-full bg-deep-rose/80 border border-muted-gold flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>
                </div>

                {/* Personal Reason Note */}
                <p className="font-hand text-base sm:text-lg text-soft-gold/90 italic mt-4 min-h-[2.5rem]">
                  "{song.reason}"
                </p>

                {/* Animated Equalizer Bars */}
                <div className="flex items-end space-x-1 h-5 mt-4 pt-1">
                  {[40, 80, 55, 100, 70, 30, 90, 60].map((h, barIdx) => (
                    <div
                      key={barIdx}
                      className="w-1 bg-soft-gold/60 rounded-full transition-all duration-300"
                      style={{
                        height: isSelected ? `${h}%` : '20%',
                        opacity: isSelected ? 1 : 0.3,
                      }}
                    />
                  ))}
                </div>

                {/* Listen Links */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
                  <a
                    href={song.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-full bg-[#1DB954]/10 hover:bg-[#1DB954]/25 border border-[#1DB954]/30 text-cream text-xs font-sans text-center transition-all duration-200 flex items-center justify-center space-x-1.5"
                  >
                    <span>Listen on Spotify</span>
                    <span>↗</span>
                  </a>
                  <a
                    href={song.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-full bg-[#FF0000]/10 hover:bg-[#FF0000]/25 border border-[#FF0000]/30 text-cream text-xs font-sans text-center transition-all duration-200 flex items-center justify-center space-x-1.5"
                  >
                    <span>YouTube</span>
                    <span>↗</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
