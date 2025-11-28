import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Note: Add actual audio implementation if needed
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
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
              <span>음악 재생 • Play music</span>
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
        {/* Animated rings when playing */}
        {isPlaying && (
          <>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border border-pink-400/30"
            />
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="absolute inset-0 rounded-full border border-pink-400/20"
            />
          </>
        )}

        {isPlaying ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}

        {/* Glow effect on hover */}
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