import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const TypewriterQuote = ({ poem, index, onComplete }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [completed, setCompleted] = useState(false);
  const fullText = `${poem.text} ${poem.subtext}`;

  const startTyping = () => {
    if (isTyping || completed) return;
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setCompleted(true);
        onComplete?.();
      }
    }, 40);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.2 }}
      onClick={startTyping}
      className="relative text-center py-12 px-8 cursor-pointer group"
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-pink-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Korean label */}
      <motion.p
        className="text-pink-300/30 text-xs tracking-widest mb-6"
      >
        {poem.korean}
      </motion.p>

      {/* Quote display */}
      <div className="min-h-[120px] flex items-center justify-center">
        {!isTyping && !completed ? (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center"
          >
            <p className="text-white/30 text-sm mb-2">탭하여 공개 • Tap to reveal</p>
            <span className="text-4xl">{poem.emoji}</span>
          </motion.div>
        ) : (
          <div className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed">
            <span>{displayText}</span>
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-[3px] h-8 bg-pink-400 ml-1"
              />
            )}
          </div>
        )}
      </div>

      {/* Completion sparkles */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 100
                }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="absolute left-1/2 top-1/2 text-xl"
              >
                ✨
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function PoetrySection() {
  const [completedCount, setCompletedCount] = useState(0);

 const poems = [
  {
    text: '"In the hush of winter nights,',
    subtext: 'may warmth find you like a gentle falling snow."',
    korean: "겨울 • Winter",
    emoji: "❄️"
  },
  {
    text: '"As spring returns with soft blossoms,',
    subtext: 'may your days bloom with new hope and gentle beginnings."',
    korean: "봄 • Spring",
    emoji: "🌸"
  },
  {
    text: '"When summer sunlight fills the sky,',
    subtext: 'may joy shine on you as brightly as the warm golden days."',
    korean: "여름 • Summer",
    emoji: "☀️"
  },
  {
    text: '"As autumn leaves drift softly down,',
    subtext: 'may peace settle into your life like a quiet golden breeze."',
    korean: "가을 • Autumn",
    emoji: "🍁"
  }
];

  return (
    <section className="min-h-screen py-32 px-6 relative">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-pink-300/40 text-xs tracking-[0.5em] uppercase mb-4">
          제 2 장 • Chapter Two
        </p>
        <h2 className="text-xl md:text-2xl text-white/40 font-light italic">
          마음의 속삭임 • Whispers of the Heart
        </h2>
      </motion.div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2 mb-12">
        {poems.map((_, i) => (
          <motion.div
            key={i}
            className={`w-8 h-1 rounded-full transition-all duration-500 ${
              i < completedCount ? 'bg-pink-400' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      {/* Poetry lines */}
      <div className="max-w-4xl mx-auto space-y-4">
        {poems.map((poem, index) => (
          <TypewriterQuote 
            key={index} 
            poem={poem} 
            index={index}
            onComplete={() => setCompletedCount(prev => prev + 1)}
          />
        ))}
      </div>

      {/* All completed message */}
      <AnimatePresence>
        {completedCount === poems.length && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-pink-300/60 mt-8"
          >
            아름다워요 ✨ Beautiful
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}