'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import OpeningSequence from '@/components/OpeningSequence';
import UnlockExperience from '@/components/UnlockExperience';
import FlowerVortex from '@/components/FlowerVortex';
import SparkleTrail from '@/components/SparkleTrail';
import FirstPhotoReveal from '@/components/FirstPhotoReveal';
import StoryTimeline from '@/components/StoryTimeline';
import LittleThings from '@/components/LittleThings';
import LoveLetter from '@/components/LoveLetter';
import Soundtrack from '@/components/Soundtrack';
import NineMonths from '@/components/NineMonths';
import FinalScene from '@/components/FinalScene';
import StoryProgressBar from '@/components/StoryProgressBar';
import AmbientAudio from '@/components/AmbientAudio';

import { getAssetPath } from '@/data/content';

type Phase = 'loading' | 'opening' | 'unlock' | 'story';

export default function Home() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [showFlowerVortex, setShowFlowerVortex] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setPhase('opening');
  }, []);

  const handleOpeningComplete = useCallback(() => {
    setPhase('unlock');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const handleUnlock = useCallback(() => {
    // 1. Trigger the hundreds of swirling multicolor flowers effect
    setShowFlowerVortex(true);

    // 2. Smoothly switch into story phase while flowers swirl and cover the screen
    setTimeout(() => {
      setPhase('story');
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 1400);

    // 3. Stop flower vortex after full bloom
    setTimeout(() => {
      setShowFlowerVortex(false);
    }, 4500);
  }, []);

  // Preload all critical photographs
  useEffect(() => {
    const imagesToPreload = [
      getAssetPath('/images/01-the-spark.jpg'),
      getAssetPath('/images/07-saree-couple.jpg'),
      getAssetPath('/images/01-canteen-together.jpg'),
      getAssetPath('/images/02-cozy-selfie.jpg'),
      getAssetPath('/images/13-burgundy-restaurant.jpg'),
      getAssetPath('/images/12-rust-anarkali.jpg'),
    ];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <main className="relative min-h-screen bg-midnight text-cream selection:bg-deep-rose/40 selection:text-cream">
      {/* ✨ Interactive Golden Rose Sparkles Trail on Touch/Cursor */}
      <SparkleTrail />

      {/* 🌸 Spectacular Hundreds of Multicolor Swirling Flowers Bloom on Password Unlock */}
      <FlowerVortex active={showFlowerVortex} />

      {/* 1. Cinematic Loading Screen */}
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <motion.div
            key="loading"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <LoadingScreen onComplete={handleLoadingComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Opening Sequence */}
      <AnimatePresence mode="wait">
        {phase === 'opening' && (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <OpeningSequence onScrollToUnlock={handleOpeningComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Intimate Unlock Experience (PIN: 1436) */}
      <AnimatePresence mode="wait">
        {phase === 'unlock' && (
          <motion.div
            key="unlock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <UnlockExperience onUnlock={handleUnlock} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Full Story Experience */}
      {phase === 'story' && (
        <motion.div
          key="story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="w-full flex flex-col"
        >
          {/* Top Milestone Progress Indicator */}
          <StoryProgressBar />

          {/* Ambient Romantic Music Toggle (Autoplays on unlock) */}
          <AmbientAudio autoStart={true} />

          {/* Story Chapters */}
          <FirstPhotoReveal />
          <StoryTimeline />
          <LittleThings />
          <LoveLetter />
          <Soundtrack />
          <NineMonths />
          <FinalScene />
        </motion.div>
      )}
    </main>
  );
}
