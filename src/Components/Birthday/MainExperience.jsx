import React, { useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import ButterflyCanvas from './ButterflyCanvas';
import ParticleBackground from './ParticleBackground';
import OpeningSection from './OpeningSection';
import PoetrySection from './PoetrySection';
import InteractiveMemories from './InteractiveMemories';
import WishLanterns from './WishLanterns';
import PolaroidGallery from './PolaroidGallery';
import MagicRevealSection from './MagicRevealSection';
import BirthdayReveal from './BirthdayReveal';
import MusicToggle from './MusicToggle';

export default function MainExperience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [showFinalReveal, setShowFinalReveal] = useState(false);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f1a]"
    >
      {/* Fixed background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ParticleBackground />
        <ButterflyCanvas />
      </div>

      {/* Music toggle */}
      <MusicToggle />

      {/* Scroll progress indicator */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 origin-left z-50"
      />

      {/* Content sections */}
      <div className="relative z-10">
        <OpeningSection />
        <PoetrySection />
        <InteractiveMemories />
        <WishLanterns />
        <PolaroidGallery />
        <MagicRevealSection onComplete={() => setShowFinalReveal(true)} />
        {showFinalReveal && <BirthdayReveal />}
      </div>

      {/* Gradient overlays */}
      <div className="fixed inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1a1a2e] to-transparent pointer-events-none z-20" />
      <div className="fixed inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f0f1a] to-transparent pointer-events-none z-20" />
    </motion.div>
  );
}