'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RELATIONSHIP_START } from '@/data/content';

export default function RelationshipCounter() {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Start date: Dec 8, 2025
    const startDate = new Date(RELATIONSHIP_START).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = Math.max(0, now - startDate);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-xl mx-auto my-8 p-5 sm:p-6 rounded-3xl bg-white/[0.03] border border-muted-gold/25 backdrop-blur-md shadow-xl flex flex-col items-center text-center"
    >
      <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-soft-gold mb-3">
        ✦ Time Spent Loving You ✦
      </span>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full">
        <div className="flex flex-col items-center p-2 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="font-serif text-xl sm:text-3xl font-bold text-cream">
            {timeTogether.days}
          </span>
          <span className="font-sans text-[10px] text-muted-gold/70 uppercase">Days</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="font-serif text-xl sm:text-3xl font-bold text-cream">
            {timeTogether.hours}
          </span>
          <span className="font-sans text-[10px] text-muted-gold/70 uppercase">Hours</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="font-serif text-xl sm:text-3xl font-bold text-cream">
            {timeTogether.minutes}
          </span>
          <span className="font-sans text-[10px] text-muted-gold/70 uppercase">Minutes</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="font-serif text-xl sm:text-3xl font-bold text-soft-gold">
            {timeTogether.seconds}
          </span>
          <span className="font-sans text-[10px] text-muted-gold/70 uppercase">Seconds</span>
        </div>
      </div>

      <p className="font-hand text-sm sm:text-base text-cream/70 mt-3 italic">
        ...and every single second has been worth it.
      </p>
    </motion.div>
  );
}
