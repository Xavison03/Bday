import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const Lantern = ({ wish, index, onRelease, isReleased }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const startY = useRef(0);

  const handleDragStart = (e) => {
    if (isReleased) return;
    setIsDragging(true);
    startY.current = e.clientY || e.touches?.[0]?.clientY;
  };

  const handleDrag = (e) => {
    if (!isDragging || isReleased) return;
    const currentY = e.clientY || e.touches?.[0]?.clientY;
    const deltaY = startY.current - currentY;
    setPosition({ x: (Math.random() - 0.5) * 20, y: Math.max(-100, -deltaY) });
  };

  const handleDragEnd = () => {
    if (isReleased) return;
    setIsDragging(false);
    if (position.y < -50) {
      onRelease();
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="relative"
    >
      <motion.div
        animate={isReleased ? {
          y: -800,
          x: (Math.random() - 0.5) * 200,
          opacity: [1, 1, 0],
          scale: [1, 0.5]
        } : {
          x: position.x,
          y: position.y
        }}
        transition={isReleased ? { duration: 4, ease: "easeOut" } : { type: "spring" }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
        className={`relative cursor-grab active:cursor-grabbing ${isReleased ? 'pointer-events-none' : ''}`}
      >
        {/* Lantern glow */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-orange-400 rounded-full blur-xl"
        />

        {/* Lantern body */}
        <div className="relative w-28 h-36 md:w-32 md:h-40">
          {/* Top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-3 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-lg" />
          
          {/* Main body */}
          <div className="absolute top-2 inset-x-0 bottom-4 bg-gradient-to-b from-orange-300/90 via-amber-400/90 to-orange-500/90 rounded-[40%] flex items-center justify-center p-4 shadow-[inset_0_0_30px_rgba(255,200,100,0.5)]">
            <p className="text-amber-900/80 text-xs text-center font-medium leading-tight">
              {wish.korean}
            </p>
          </div>

          {/* Bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-4 bg-gradient-to-b from-amber-800 to-amber-900 rounded-b-lg" />

          {/* Inner glow */}
          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-200 rounded-full blur-lg"
          />
        </div>

        {/* Release hint */}
        {!isReleased && (
          <motion.div className="text-center mt-4">
            <motion.div
              animate={{ y: [-5, -15, -5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-pink-400 text-xl mb-1"
            >
              ↑
            </motion.div>
            <motion.p
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/40 text-xs"
            >
              Drag up
            </motion.p>
          </motion.div>
        )}
      </motion.div>

      {/* English translation below */}
      {!isReleased && (
        <p className="text-center text-white/30 text-xs mt-2 italic">
          {wish.english}
        </p>
      )}
    </motion.div>
  );
};

export default function WishLanterns() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [releasedLanterns, setReleasedLanterns] = useState([]);

  const wishes = [
    { id: 1, korean: "행복", english: "Happiness" },
    { id: 2, korean: "건강", english: "Health" },
    { id: 3, korean: "성공", english: "Success" },
    { id: 4, korean: "평화", english: "Peace & JOy" },
    { id: 5, korean: "기쁨", english: "TVK conquer" },
    { id: 6, korean: "희망", english: "Mumbai Glory" },
  ];

  const handleRelease = (id) => {
    setReleasedLanterns(prev => [...prev, id]);
  };

  return (
    <section ref={ref} className="min-h-screen py-32 px-6 relative overflow-hidden">
      {/* Background stars */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-pink-300/40 text-xs tracking-[0.5em] uppercase mb-4">
          제 4 장 • Chapter Four
        </p>
        <h2 className="text-2xl md:text-4xl text-white/90 font-light tracking-wide mb-4">
          소원 등불 • Wish Lanterns
        </h2>
        <p className="text-white/30 text-sm italic max-w-md mx-auto">
          Drag each lantern upward to release your wishes into the sky
        </p>
        
        {/* Progress */}
        <p className="text-pink-300/60 text-sm mt-6">
          {releasedLanterns.length} / {wishes.length} wishes released ✨
        </p>
      </motion.div>

      {/* Lanterns grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 place-items-center">
          {wishes.map((wish, index) => (
            <Lantern
              key={wish.id}
              wish={wish}
              index={index}
              isReleased={releasedLanterns.includes(wish.id)}
              onRelease={() => handleRelease(wish.id)}
            />
          ))}
        </div>
      </div>

      {/* All released message */}
      <AnimatePresence>
        {releasedLanterns.length === wishes.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-16"
          >
            <p className="text-pink-300 text-lg">
              🏮 모든 소원이 하늘로 올라갔어요! 🏮
            </p>
            <p className="text-white/40 text-sm mt-2">All wishes have risen to the sky!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}