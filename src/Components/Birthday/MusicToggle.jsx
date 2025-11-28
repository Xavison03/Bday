import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef(null);
  const autoplayStarted = useRef(false);

  // Hide tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // 🔥 AUTOPLAY after FIRST user interaction
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayStarted.current || !audioRef.current) return;

      autoplayStarted.current = true;

      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        fadeInAudio();
        setIsPlaying(true);
      }).catch(() => {});

      window.removeEventListener("click", startAutoplay);
      window.removeEventListener("touchstart", startAutoplay);
    };

    window.addEventListener("click", startAutoplay);
    window.addEventListener("touchstart", startAutoplay);

    return () => {
      window.removeEventListener("click", startAutoplay);
      window.removeEventListener("touchstart", startAutoplay);
    };
  }, []);

  // 🔥 Beautiful smooth fade-in effect
  const fadeInAudio = () => {
    let vol = 0;
    const interval = setInterval(() => {
      if (!audioRef.current) return;
      vol += 0.05;
      audioRef.current.volume = vol;
      if (vol >= 1) clearInterval(interval);
    }, 120);
  };

  // Toggle music manually
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0;
      audioRef.current.play();
      fadeInAudio();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Audio element */}
      <audio
        ref={audioRef}
        src="./song.mp3"   // Your music file in public/
        loop
        preload="auto"
      />

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white/60 text-sm flex items-center gap-2">
              <Music className="w-4 h-4" />
              <span>음악 자동재생 • Auto Music</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-pink-400/50 transition-all duration-300 group"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}

        {/* Glow hover */}
        <div className="absolute inset-0 rounded-full bg-pink-400/0 group-hover:bg-pink-400/10 transition-colors duration-300" />
      </motion.button>

      {/* Playing indicator */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full"
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-pink-400 rounded-full"
          />
        </motion.div>
      )}
    </div>
  );
}
