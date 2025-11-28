import React from 'react';
import { motion } from 'framer-motion';

const CherryBlossom = ({ delay, duration, startX }) => (
  <motion.div
    initial={{ 
      x: startX,
      y: -20,
      rotate: 0,
      opacity: 0 
    }}
    animate={{ 
      x: [startX, startX + 80, startX - 40, startX + 60],
      y: ['0vh', '110vh'],
      rotate: [0, 180, 360, 540],
      opacity: [0, 0.7, 0.7, 0]
    }}
    transition={{ 
      duration,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute text-pink-300/60"
    style={{ fontSize: '12px' }}
  >
    🌸
  </motion.div>
);

const Sparkle = ({ delay, x, y }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0]
    }}
    transition={{ 
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3
    }}
    className="absolute w-1 h-1 bg-pink-300"
    style={{ 
      left: `${x}%`, 
      top: `${y}%`,
      boxShadow: '0 0 6px 2px rgba(244, 114, 182, 0.6)'
    }}
  />
);

const FloatingLantern = ({ delay, startX }) => (
  <motion.div
    initial={{ 
      x: startX,
      y: '110vh',
      opacity: 0 
    }}
    animate={{ 
      x: [startX, startX + 30, startX - 20, startX + 10],
      y: [null, '-10vh'],
      opacity: [0, 0.5, 0.5, 0]
    }}
    transition={{ 
      duration: 20,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute text-2xl"
  >
    🏮
  </motion.div>
);

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Cherry blossoms */}
      {[...Array(20)].map((_, i) => (
        <CherryBlossom 
          key={`blossom-${i}`}
          delay={i * 1.2}
          duration={10 + Math.random() * 6}
          startX={Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)}
        />
      ))}

      {/* Sparkles */}
      {[...Array(30)].map((_, i) => (
        <Sparkle 
          key={`sparkle-${i}`}
          delay={i * 0.4}
          x={Math.random() * 100}
          y={Math.random() * 100}
        />
      ))}

      {/* Floating lanterns */}
      {[...Array(6)].map((_, i) => (
        <FloatingLantern 
          key={`lantern-${i}`}
          delay={i * 5}
          startX={Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)}
        />
      ))}

      {/* Ambient glow orbs */}
      <motion.div
        animate={{ 
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ 
          x: [0, -80, 0],
          y: [0, -40, 0],
          scale: [1.2, 1, 1.2]
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px]"
      />
    </div>
  );
}