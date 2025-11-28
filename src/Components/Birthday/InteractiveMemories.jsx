import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, Moon, Sun, Cloud, Flower2, Music } from 'lucide-react';

const FloatingOrb = ({ children, delay, onClick, isActive, isRevealed }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
        isRevealed 
          ? 'bg-gradient-to-br from-pink-500 to-purple-500 shadow-[0_0_40px_rgba(236,72,153,0.5)]' 
          : 'bg-white/5 backdrop-blur-sm border border-white/20 hover:border-pink-400/50'
      }`}
    >
      <motion.div
        animate={isRevealed ? { rotate: 360 } : { rotate: [0, 10, -10, 0] }}
        transition={isRevealed ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 4, repeat: Infinity }}
      >
        {children}
      </motion.div>
      
      {/* Pulse rings */}
      {!isRevealed && (
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-pink-400/30"
        />
      )}

      {/* Active glow */}
      {isRevealed && (
        <>
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-pink-400"
          />
        </>
      )}
    </motion.button>
  );
};

const ScratchCard = ({ orb, onClose }) => {
  const [scratchProgress, setScratchProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const scratch = (e) => {
    if (!canvasRef.current || revealed || !isDrawing.current) return;
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 50;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    
    lastPos.current = pos;

    // Check progress less frequently
    setScratchProgress(prev => {
      const newProgress = Math.min(prev + 2, 100);
      if (newProgress > 40 && !revealed) {
        setRevealed(true);
      }
      return newProgress;
    });
  };

  const startScratch = (e) => {
    if (revealed) return;
    e.preventDefault();
    isDrawing.current = true;
    const canvas = canvasRef.current;
    lastPos.current = getPos(e, canvas);
  };

  const stopScratch = () => {
    isDrawing.current = false;
  };

  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Create gradient scratch surface
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#4a1a4a');
      gradient.addColorStop(1, '#1a1a4a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add sparkle pattern
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      for (let i = 0; i < 80; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Add text hint
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👆 SCRATCH HERE', canvas.width / 2, canvas.height / 2);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={revealed ? onClose : undefined}
    >
      <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.5, rotateY: -30 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background message */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900 to-purple-900 flex flex-col items-center justify-center p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: revealed ? 1 : 0 }}
            className="text-6xl mb-6"
          >
            {orb.emoji}
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
            className="text-2xl font-light text-pink-200 mb-4 text-center"
          >
            {orb.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-center leading-relaxed italic text-sm"
          >
            "{orb.message}"
          </motion.p>
          
          {revealed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-pink-300/60 text-xs mt-6"
            >
              탭하여 닫기 • Tap to close
            </motion.p>
          )}
        </div>

        {/* Scratch canvas */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            width={400}
            height={533}
            className="absolute inset-0 w-full h-full cursor-pointer"
            style={{ touchAction: 'none' }}
            onMouseDown={startScratch}
            onMouseMove={scratch}
            onMouseUp={stopScratch}
            onMouseLeave={stopScratch}
            onTouchStart={startScratch}
            onTouchMove={scratch}
            onTouchEnd={stopScratch}
          />
        )}

        {/* Progress bar */}
        {!revealed && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
                style={{ width: `${scratchProgress}%` }}
              />
            </div>
            <p className="text-center text-white/50 text-xs mt-2">{Math.round(scratchProgress)}%</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function InteractiveMemories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeOrb, setActiveOrb] = useState(null);
  const [revealedOrbs, setRevealedOrbs] = useState([]);

const orbs = [
  {
    id: 1,
    icon: Star,
    title: "겨울빛 • Winter Radiance",
    message: "Like winter stars that glow in the cold night, your presence brings warmth where the world feels quiet.",
    emoji: "❄️⭐",
    color: "text-blue-200"
  },
  {
    id: 2,
    icon: Flower2,
    title: "봄향기 • Spring Bloom",
    message: "You’re like early spring—soft, hopeful, and bringing life back into places that forgot how to bloom.",
    emoji: "🌸",
    color: "text-pink-300"
  },
  {
    id: 3,
    icon: Sun,
    title: "여름빛 • Summer Warmth",
    message: "Your energy feels like summer sunlight—bright, warm, and impossible to ignore.",
    emoji: "☀️",
    color: "text-yellow-400"
  },
  {
    id: 4,
    icon: Cloud,
    title: "가을바람 • Autumn Breeze",
    message: "There’s a calm autumn breeze in your spirit—gentle, thoughtful, and quietly comforting.",
    emoji: "🍂",
    color: "text-orange-300"
  },
  {
    id: 5,
    icon: Moon,
    title: "겨울밤 • Winter Moon",
    message: "Like the moon on a snowy night, you bring soft light to even the coldest moments.",
    emoji: "🌙❄️",
    color: "text-indigo-300"
  },
  {
    id: 6,
    icon: Music,
    title: "사계멜로디 • Seasons Melody",
    message: "Your presence is like a melody that changes with the seasons—always beautiful, always unforgettable.",
    emoji: "🎵🍃",
    color: "text-green-300"
  }
];


  const handleOrbClick = (orb) => {
    setActiveOrb(orb);
  };

  const handleClose = () => {
    if (activeOrb && !revealedOrbs.includes(activeOrb.id)) {
      setRevealedOrbs([...revealedOrbs, activeOrb.id]);
    }
    setActiveOrb(null);
  };

  return (
    <section ref={ref} className="min-h-screen py-32 px-6 relative">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-pink-300/40 text-xs tracking-[0.5em] uppercase mb-4">
          제 3 장 • Chapter Three
        </p>
        <h2 className="text-2xl md:text-4xl text-white/90 font-light tracking-wide mb-4">
          스크래치 카드 • Scratch Cards
        </h2>
        <p className="text-white/30 text-sm italic max-w-md mx-auto">
          Tap each orb, then scratch to reveal your hidden qualities
        </p>
        
        {/* Progress */}
        <div className="flex justify-center gap-2 mt-6">
          {orbs.map((orb) => (
            <motion.div
              key={orb.id}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                revealedOrbs.includes(orb.id) ? 'bg-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Orbs grid */}
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-3 gap-8 md:gap-12 place-items-center">
          {orbs.map((orb, index) => (
            <FloatingOrb
              key={orb.id}
              delay={index * 0.1}
              onClick={() => handleOrbClick(orb)}
              isRevealed={revealedOrbs.includes(orb.id)}
            >
              <orb.icon className={`w-8 h-8 md:w-10 md:h-10 ${revealedOrbs.includes(orb.id) ? 'text-white' : orb.color}`} />
            </FloatingOrb>
          ))}
        </div>
      </div>

      {/* All revealed message */}
      <AnimatePresence>
        {revealedOrbs.length === orbs.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-16"
          >
            <p className="text-pink-300 text-lg">
              ✨ 모든 카드를 공개했어요! • All cards revealed! ✨
            </p>
            <p className="text-white/40 text-sm mt-2">Keep scrolling for more surprises...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scratch card modal */}
      <AnimatePresence>
        {activeOrb && (
          <ScratchCard orb={activeOrb} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}