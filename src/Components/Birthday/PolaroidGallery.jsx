import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const Polaroid = ({ item, index, onFlip, isFlipped }) => {
  const [rotation] = useState(() => (Math.random() - 0.5) * 20);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: rotation - 10 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring" }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      onClick={onFlip}
      className="cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-40 h-52 md:w-48 md:h-64"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front - Image */}
        <div 
          className="absolute inset-0 bg-white p-2 pb-8 rounded shadow-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`w-full h-full ${item.gradient} rounded flex items-center justify-center`}>
            <span className="text-5xl">{item.emoji}</span>
          </div>
          <p className="absolute bottom-2 left-0 right-0 text-center text-gray-600 text-xs font-handwriting">
            {item.caption}
          </p>
        </div>

        {/* Back - Message */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 p-4 rounded shadow-xl flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-gray-700 text-sm text-center italic leading-relaxed">
            {item.message}
          </p>
          <p className="text-pink-400 text-xs mt-4">
            {item.korean}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ShakeToReveal = ({ onShake }) => {
  const [shakeCount, setShakeCount] = useState(0);
  const [lastAccel, setLastAccel] = useState({ x: 0, y: 0, z: 0 });
  const [isShaking, setIsShaking] = useState(false);

  React.useEffect(() => {
    const handleMotion = (e) => {
      const { x, y, z } = e.accelerationIncludingGravity || { x: 0, y: 0, z: 0 };
      const deltaX = Math.abs(x - lastAccel.x);
      const deltaY = Math.abs(y - lastAccel.y);
      const deltaZ = Math.abs(z - lastAccel.z);

      if (deltaX + deltaY + deltaZ > 30) {
        setIsShaking(true);
        setShakeCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 5) {
            onShake();
          }
          return newCount;
        });
        setTimeout(() => setIsShaking(false), 200);
      }

      setLastAccel({ x, y, z });
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [lastAccel, onShake]);

  // Fallback for desktop - click rapidly
  const handleClick = () => {
    setIsShaking(true);
    setShakeCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        onShake();
      }
      return newCount;
    });
    setTimeout(() => setIsShaking(false), 200);
  };

  return (
    <motion.div
      animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
        className="w-40 h-52 md:w-48 md:h-64 bg-white p-2 pb-8 rounded shadow-xl flex items-center justify-center"
      >
        <div className="text-center">
          <motion.p
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-4xl mb-4"
          >
            📸
          </motion.p>
          <p className="text-gray-500 text-sm">흔들어서 공개!</p>
          <p className="text-gray-400 text-xs">Shake or tap to reveal</p>
          <div className="flex justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i < shakeCount ? 'bg-pink-400' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function PolaroidGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [flippedCards, setFlippedCards] = useState([]);
  const [hiddenRevealed, setHiddenRevealed] = useState(false);

const items = [
  { 
    id: 1, 
    emoji: "🌅", 
    gradient: "bg-gradient-to-br from-orange-200 to-pink-300", 
    caption: "Sunset Vibes", 
    message: "Sunsets are nicer when I think about you being around", 
    korean: "따뜻함"
  },
  { 
    id: 2, 
    emoji: "🎭", 
    gradient: "bg-gradient-to-br from-purple-200 to-blue-300", 
    caption: "Drama Queen", 
    message: "A little drama is fun, but it’s better when we laugh about it together", 
    korean: "재미"
  },
  { 
    id: 3, 
    emoji: "🍵", 
    gradient: "bg-gradient-to-br from-green-200 to-teal-300", 
    caption: "Tea Time", 
    message: "Good talks over tea are even better when you’re there", 
    korean: "평온"
  },
  { 
    id: 4, 
    emoji: "🌙", 
    gradient: "bg-gradient-to-br from-indigo-200 to-purple-300", 
    caption: "Night Owl", 
    message: "Late-night talks are the best, especially with you", 
    korean: "밤"
  },
  { 
    id: 5, 
    emoji: "🎵", 
    gradient: "bg-gradient-to-br from-pink-200 to-red-300", 
    caption: "Music Mood", 
    message: "Some songs just remind me of you and make me smile", 
    korean: "음악"
  },
];


  const hiddenItem = { 
    id: 'hidden', 
    emoji: "🎂", 
    gradient: "bg-gradient-to-br from-pink-300 to-purple-400", 
    caption: "Special day!", 
    message: "This day belongs to you and only you",
    korean: "특별한 날"
  };

  const handleFlip = (id) => {
    setFlippedCards(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <section ref={ref} className="min-h-screen py-32 px-6 relative">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-pink-300/40 text-xs tracking-[0.5em] uppercase mb-4">
          제 5 장 • Chapter Five
        </p>
        <h2 className="text-2xl md:text-4xl text-white/90 font-light tracking-wide mb-4">
          추억 앨범 • Memory Album
        </h2>
        <p className="text-white/30 text-sm italic max-w-md mx-auto">
          Tap each polaroid to flip and reveal the message behind
        </p>
      </motion.div>

      {/* Polaroid gallery */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {items.map((item, index) => (
            <Polaroid
              key={item.id}
              item={item}
              index={index}
              isFlipped={flippedCards.includes(item.id)}
              onFlip={() => handleFlip(item.id)}
            />
          ))}
          
          {/* Hidden polaroid - shake to reveal */}
          {!hiddenRevealed ? (
            <ShakeToReveal onShake={() => setHiddenRevealed(true)} />
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: (Math.random() - 0.5) * 20 }}
              transition={{ type: "spring" }}
            >
              <Polaroid
                item={hiddenItem}
                index={5}
                isFlipped={flippedCards.includes('hidden')}
                onFlip={() => handleFlip('hidden')}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Progress */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-white/30 text-sm mt-12"
      >
        {flippedCards.length} / {hiddenRevealed ? 6 : 5} messages revealed
      </motion.p>
    </section>
  );
}