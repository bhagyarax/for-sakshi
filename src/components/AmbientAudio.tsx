'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '@/data/content';

const YOUTUBE_VIDEO_ID = 'bP8ATWCvqzw';
const START_SECONDS = 12; // Start from 0:12s as requested

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface AmbientAudioProps {
  autoStart?: boolean;
}

export default function AmbientAudio({ autoStart = true }: AmbientAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const playerRef = useRef<any>(null);
  const fallbackAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    const initPlayer = () => {
      try {
        playerRef.current = new window.YT.Player('yt-bg-audio-player', {
          height: '1',
          width: '1',
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            start: START_SECONDS,
            playlist: YOUTUBE_VIDEO_ID,
          },
          events: {
            onReady: (event: any) => {
              event.target.setVolume(85);
              if (autoStart) {
                tryPlay();
              }
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                setShowPrompt(false);
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                setIsPlaying(false);
              }
            },
          },
        });
      } catch (err) {
        console.error('YT Player error:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch {}
      }
    };
  }, []);

  const tryPlay = useCallback(() => {
    if (playerRef.current && playerRef.current.playVideo) {
      try {
        playerRef.current.seekTo(START_SECONDS, true);
        playerRef.current.playVideo();
        playerRef.current.unMute();
        setIsPlaying(true);
        setShowPrompt(false);
        return;
      } catch (e) {
        console.warn('YouTube play attempt:', e);
      }
    }

    // HTML5 fallback
    if (fallbackAudioRef.current) {
      fallbackAudioRef.current.volume = 0.7;
      fallbackAudioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowPrompt(false);
        })
        .catch(() => {
          setShowPrompt(true);
        });
    }
  }, []);

  const pausePlayback = useCallback(() => {
    if (playerRef.current && playerRef.current.pauseVideo) {
      try {
        playerRef.current.pauseVideo();
      } catch {}
    }
    if (fallbackAudioRef.current) {
      fallbackAudioRef.current.pause();
    }
    setIsPlaying(false);
  }, []);

  const togglePlayback = () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      tryPlay();
    }
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        tryPlay();
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying, tryPlay]);

  return (
    <>
      {/* Invisible YouTube IFrame Container */}
      <div className="fixed -top-96 -left-96 opacity-0 pointer-events-none w-1 h-1 overflow-hidden" aria-hidden="true">
        <div id="yt-bg-audio-player" />
      </div>

      {/* Local HTML5 Audio Fallback */}
      <audio
        ref={fallbackAudioRef}
        loop
        preload="auto"
        playsInline
      >
        <source src={getAssetPath('/audio/dooron-dooron.mp3')} type="audio/mpeg" />
        <source src={getAssetPath('/audio/dooron-dooron.wav')} type="audio/wav" />
      </audio>

      {/* Luxury Glassmorphic Audio Player (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2 select-none">
        {/* Subtle Tap to Play prompt if autoplay is pending */}
        <AnimatePresence>
          {showPrompt && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={tryPlay}
              className="cursor-pointer px-4 py-2 rounded-full bg-gradient-to-r from-deep-rose to-wine text-cream border border-soft-gold/40 shadow-[0_0_20px_rgba(225,29,72,0.4)] flex items-center space-x-2 mb-1 animate-pulse"
            >
              <span className="text-xs">✦</span>
              <span className="font-serif text-xs tracking-wide">
                Tap to Play Music
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimalist Luxury Pill */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={togglePlayback}
          className={`group px-4 py-2.5 rounded-full flex items-center space-x-3.5 backdrop-blur-2xl border transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.6)] ${
            isPlaying
              ? 'bg-wine/80 border-soft-gold/50 shadow-[0_0_25px_rgba(212,165,116,0.25)]'
              : 'bg-midnight/80 border-white/10 hover:border-soft-gold/40'
          }`}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {/* Animated Equalizer Waveform */}
          <div className="flex items-end space-x-1 h-3.5 w-4">
            <div
              className={`w-0.5 bg-soft-gold rounded-full transition-all duration-200 ${
                isPlaying ? 'h-full animate-bounce' : 'h-1 opacity-40'
              }`}
            />
            <div
              className={`w-0.5 bg-soft-gold rounded-full transition-all duration-200 ${
                isPlaying ? 'h-3/4 animate-bounce delay-75' : 'h-2.5 opacity-40'
              }`}
            />
            <div
              className={`w-0.5 bg-soft-gold rounded-full transition-all duration-200 ${
                isPlaying ? 'h-full animate-bounce delay-150' : 'h-1 opacity-40'
              }`}
            />
            <div
              className={`w-0.5 bg-soft-gold rounded-full transition-all duration-200 ${
                isPlaying ? 'h-2/3 animate-bounce delay-100' : 'h-2 opacity-40'
              }`}
            />
          </div>

          {/* Clean Typography */}
          <div className="flex flex-col text-left pr-1">
            <span className="font-serif text-xs text-cream font-medium italic tracking-wide">
              Dooron Dooron
            </span>
            <span className="font-sans text-[9px] text-muted-gold/80 tracking-wider">
              Paresh Pahuja
            </span>
          </div>

          {/* Minimalist Play/Pause Indicator Icon */}
          <div className="w-5 h-5 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-[10px] text-soft-gold">
            {isPlaying ? '⏸' : '▶'}
          </div>
        </motion.button>
      </div>
    </>
  );
}
