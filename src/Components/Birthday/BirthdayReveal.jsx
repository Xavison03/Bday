import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const ConfettiPiece = ({ delay }) => {
  const colors = ['#f472b6', '#a855f7', '#ec4899', '#ffffff', '#fbbf24', '#34d399'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <motion.div
      initial={{ 
        y: -20,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 500),
        rotate: 0,
        opacity: 1
      }}
      animate={{ 
        y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
        x: `+=${(Math.random() - 0.5) * 200}`,
        rotate: Math.random() * 720,
        opacity: [1, 1, 0]
      }}
      transition={{ 
        duration: 4 + Math.random() * 2,
        delay,
        ease: "linear"
      }}
      className="fixed pointer-events-none z-40"
      style={{
        width: 8 + Math.random() * 8,
        height: 8 + Math.random() * 8,
        background: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '0%'
      }}
    />
  );
};

const InteractiveWish = ({ text, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  const handleInteraction = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    
    setSparkles(prev => [...prev.slice(-5), { id: Date.now(), x, y }]);
  };

  return (
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleInteraction}
      onTouchMove={handleInteraction}
      className="relative text-center leading-relaxed text-base md:text-lg text-white/70 font-light cursor-default transition-all duration-300 py-2"
      style={{
        textShadow: isHovered ? '0 0 20px rgba(244, 114, 182, 0.5)' : 'none'
      }}
    >
      {text}
      
      {/* Sparkles on interaction */}
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.span
            key={sparkle.id}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 1, y: -30 }}
            exit={{ opacity: 0 }}
            className="absolute text-sm pointer-events-none"
            style={{ left: sparkle.x, top: sparkle.y }}
          >
            ✨
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.p>
  );
};

const ClapButton = ({ onClap, clapCount }) => {
  return (
    <motion.button
      onClick={onClap}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative"
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-6xl block"
      >
        👏
      </motion.span>
      
      {/* Flying emojis on clap */}
      <AnimatePresence>
        {[...Array(Math.min(clapCount, 20))].map((_, i) => (
          <motion.span
            key={`${clapCount}-${i}`}
            initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            animate={{ 
              opacity: 0, 
              y: -100 - Math.random() * 50,
              x: (Math.random() - 0.5) * 100,
              scale: 0.5
            }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-1/2 text-2xl pointer-events-none"
          >
            {['🎉', '🎊', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)]}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.button>
  );
};

export default function BirthdayReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showConfetti, setShowConfetti] = useState(true);
  const [clapCount, setClapCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowConfetti(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

 const wishLines = [
  "And just like the seasons turning in quiet rhythm…",
  "today arrives softly, carrying a message touched by time and warmth.",
  "",
  "To someone who brings spring to heavy days,",
  "summer light to tired hearts,",
  "autumn calm to restless moments,",
  "and winter comfort when the world feels cold—",
  "",
  "This day is yours.",
  "",
  "Not for the passing seasons you've lived,",
  "but for the way your presence becomes its own season—",
  "one that makes life gentler, warmer, and beautifully alive.",
  "",
  "So here's to you—another year shaped by your quiet magic.",
  "May your days bloom like spring, shine like summer,",
  "rest like autumn, and heal like winter’s calm."
];

  return (
    <motion.section 
      ref={ref} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-32 px-6 relative flex items-center justify-center"
    >
      {/* Confetti */}
      {showConfetti && [...Array(60)].map((_, i) => (
        <ConfettiPiece key={i} delay={i * 0.1} />
      ))}

      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[800px] h-[800px] bg-gradient-radial from-pink-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-pink-300/60 text-lg md:text-2xl font-light tracking-[0.2em] mb-6"
          >
            생일 축하해요
          </motion.p>
          
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #f472b6 0%, #ffffff 25%, #a855f7 50%, #ffffff 75%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 80px rgba(244, 114, 182, 0.3)'
              }}
            >
             Another Orbit Around The Sun Completed!
            </h1>
          </motion.div>
          
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-[2px] w-48 md:w-64 mx-auto mt-8 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
          />
        </motion.div>

        {/* Interactive wish text */}
        <div className="space-y-4 mb-16">
          {wishLines.map((line, index) => (
            line ? (
              <InteractiveWish 
                key={index}
                text={line}
                delay={1.5 + index * 0.15}
              />
            ) : (
              <div key={index} className="h-4" />
            )
          ))}
        </div>

        {/* Clap button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 5 }}
          className="text-center"
        >
          <p className="text-white/30 text-sm mb-4">박수를 보내세요! • Send your applause!</p>
          <ClapButton 
            onClap={() => setClapCount(prev => prev + 1)} 
            clapCount={clapCount}
          />
          {clapCount > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-pink-300/60 text-sm mt-4"
            >
              {clapCount} clap{clapCount > 1 ? 's' : ''} sent! 🎉
            </motion.p>
          )}
        </motion.div>

        {/* Decorative butterflies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 6 }}
          className="mt-16 flex justify-center gap-4"
        >
          {[...Array(7)].map((_, i) => (
            <motion.span
              key={i}
              animate={{ 
                y: [-5, 5, -5],
                rotate: [-10, 10, -10]
              }}
              transition={{ 
                duration: 2 + i * 0.3,
                delay: i * 0.2,
                repeat: Infinity
              }}
              className="text-2xl md:text-3xl"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(244, 114, 182, 0.5))',
                opacity: 0.5 + i * 0.1
              }}
            >
              🦋
            </motion.span>
          ))}
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 7 }}
          className="mt-12 text-center"
        >
          <p className="text-white/20 text-sm tracking-widest">
            — 항상 함께 • Hopeful for the 2026 💫
          </p>
        </motion.div>
      </div>

      {/* Floating elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [0, -80]
          } : {}}
          transition={{ 
            duration: 3,
            delay: 3 + i * 0.3,
            repeat: Infinity,
            repeatDelay: Math.random() * 2
          }}
          className="absolute text-lg"
          style={{
            left: `${10 + Math.random() * 80}%`,
            bottom: `${10 + Math.random() * 30}%`
          }}
        >
          {['🌸', '✨', '💫', '🏮', '🌙'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </motion.section>
  );
}