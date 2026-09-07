'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingParticles from './FloatingParticles';
import { UNLOCK_PIN, wrongPinMessages, unlockPrompt, HER_NAME } from '@/data/content';

interface UnlockExperienceProps {
  onUnlock: () => void;
}

// Gentle Web Audio API tone generator
function playChime(freq = 440, type: OscillatorType = 'sine', duration = 0.25) {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Harmless if audio is blocked
  }
}

function playSuccessChord() {
  const notes = [440, 554.37, 659.25, 880, 1108.73]; // A Major romantic chime
  notes.forEach((freq, idx) => {
    setTimeout(() => playChime(freq, 'sine', 0.8), idx * 100);
  });
}

export default function UnlockExperience({ onUnlock }: UnlockExperienceProps) {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const pinLength = UNLOCK_PIN.length; // 4 digits for '1436'

  const validatePin = useCallback(
    (inputPin: string) => {
      if (inputPin === UNLOCK_PIN) {
        setStatus('success');
        setIsUnlocked(true);
        playSuccessChord();
        setTimeout(() => {
          onUnlock();
        }, 1100);
      } else {
        setStatus('error');
        playChime(220, 'triangle', 0.25);
        const randomMsg = wrongPinMessages[Math.floor(Math.random() * wrongPinMessages.length)];
        setErrorMessage(randomMsg);
        setTimeout(() => {
          setPin('');
          setStatus('idle');
        }, 1200);
      }
    },
    [onUnlock]
  );

  const handleKeyPress = useCallback(
    (val: string) => {
      if (status !== 'idle' || isUnlocked) return;

      if (val === 'back' || val === 'Backspace') {
        playChime(330, 'sine', 0.08);
        setPin((prev) => prev.slice(0, -1));
      } else if (/^[0-9]$/.test(val)) {
        if (pin.length < pinLength) {
          playChime(440 + pin.length * 80, 'sine', 0.12);
          const nextPin = pin + val;
          setPin(nextPin);
          if (nextPin.length === pinLength) {
            validatePin(nextPin);
          }
        }
      }
    },
    [pin, status, isUnlocked, pinLength, validatePin]
  );

  // Keyboard listener for desktop typing
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (status !== 'idle' || isUnlocked) return;
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleKeyPress('back');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyPress, status, isUnlocked]);

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'];

  return (
    <div className="relative min-h-screen w-full bg-midnight flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      {/* Ambient background particles */}
      <FloatingParticles intensity={0.5} />

      {/* Success glow bloom */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 30, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeIn' }}
            className="absolute inset-0 z-20 origin-center bg-[radial-gradient(circle,rgba(212,165,116,0.45)_0%,rgba(139,34,82,0.35)_40%,rgba(10,6,8,0)_70%)] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="z-10 flex flex-col items-center w-full max-w-sm mx-auto">
        {/* Intimate Story Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isUnlocked ? 0 : 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-3 mb-8"
        >
          <span className="font-serif text-xs uppercase tracking-[0.3em] text-muted-gold/60">
            ✦ Secret Access
          </span>
          <p className="font-serif text-2xl sm:text-3xl text-cream tracking-wide">
            {unlockPrompt.line1}
          </p>
          <p className="font-hand text-xl sm:text-2xl text-muted-gold italic">
            {unlockPrompt.line2}
          </p>
        </motion.div>

        {/* Dynamic PIN Dots (4 dots for 1436) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isUnlocked ? 0 : 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex gap-5 mb-6"
        >
          {Array.from({ length: pinLength }).map((_, i) => {
            const isFilled = i < pin.length;
            return (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  status === 'error'
                    ? 'border-deep-rose bg-deep-rose/90 animate-shake scale-110 shadow-[0_0_15px_rgba(139,34,82,0.9)]'
                    : status === 'success'
                    ? 'border-cream bg-cream shadow-[0_0_20px_rgba(253,246,236,1)] scale-125'
                    : isFilled
                    ? 'border-soft-gold bg-soft-gold shadow-[0_0_12px_rgba(212,165,116,0.7)] scale-110'
                    : 'border-muted-gold/40 bg-transparent'
                }`}
              />
            );
          })}
        </motion.div>

        {/* Error message slot */}
        <div className="h-8 flex items-center justify-center mb-4">
          <AnimatePresence mode="wait">
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-hand text-deep-rose text-lg sm:text-xl font-medium"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Keypad Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isUnlocked ? 0 : 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-[280px]"
        >
          {keys.map((key, i) => (
            <div key={i} className="flex items-center justify-center">
              {key === '' ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20" />
              ) : (
                <button
                  type="button"
                  disabled={status !== 'idle' || isUnlocked}
                  onClick={() => handleKeyPress(key)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl font-sans font-light text-cream bg-white/[0.04] border border-muted-gold/20 hover:bg-white/[0.08] hover:border-muted-gold/50 active:scale-95 transition-all duration-200 outline-none select-none shadow-sm"
                  aria-label={key === 'back' ? 'Backspace' : `Number ${key}`}
                >
                  {key === 'back' ? '⌫' : key}
                </button>
              )}
            </div>
          ))}
        </motion.div>

        {/* Subtle desktop keyboard hint */}
        <p className="mt-8 text-xs font-hand text-muted-gold/50 tracking-wider text-center">
          (hint: 4 digits • you can type on your keyboard)
        </p>
      </div>
    </div>
  );
}
