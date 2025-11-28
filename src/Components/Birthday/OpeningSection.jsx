import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function OpeningSection() {
  const [tapped, setTapped] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipples(prev => [...prev, { id: Date.now(), x, y }]);
    setTapped(true);
    
    setTimeout(() => {
      setRipples(prev => prev.slice(1));
    }, 1000);
  };

  return (
    <motion.section 
      onClick={handleTap}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative cursor-pointer overflow-hidden"
    >
      {/* Click ripples */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute w-20 h-20 rounded-full border-2 border-pink-400/50"
          style={{ left: ripple.x - 40, top: ripple.y - 40 }}
        />
      ))}

      {/* Decorative circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] border border-white/10 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] border border-pink-300/20 rounded-full"
      />

      {/* Korean chapter indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="mb-8"
      >
        <p className="text-pink-300/50 text-xs tracking-[0.4em] uppercase">
          서막 • Prologue
        </p>
      </motion.div>

      {/* Main quote - appears on tap */}
      <div className="max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: tapped ? 1 : 0.3, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-white/60 text-lg md:text-xl font-light italic mb-6 leading-relaxed"
        >
          "When life hands you ordinary days,
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="text-3xl md:text-5xl lg:text-6xl text-white font-light leading-tight tracking-wide"
        >
          some people turn them into
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-wide mt-2"
          style={{
            background: 'linear-gradient(135deg, #f9a8d4 0%, #c084fc 50%, #f9a8d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          seasons of light."
        </motion.h1>
      </div>

      {/* Tap hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: tapped ? 0 : 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-32 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-12 h-12 rounded-full border-2 border-pink-400/30 flex items-center justify-center"
        >
          <span className="text-white/50 text-xs">TAP</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - appears after tap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: tapped ? 1 : 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-20 flex flex-col items-center gap-3"
      >
        <p className="text-white/30 text-xs tracking-widest uppercase">스크롤 • Scroll</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-pink-300/50 to-transparent"
        />
      </motion.div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 left-10 text-4xl opacity-40"
      >
        🌸
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-32 right-16 text-3xl opacity-30"
      >
        🏮
      </motion.div>
    </motion.section>
  );
}