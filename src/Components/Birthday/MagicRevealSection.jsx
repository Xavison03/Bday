import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';




const DrawingCanvas = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [strokeCount, setStrokeCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw hint text
    ctx.font = '20px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.textAlign = 'center';
    ctx.fillText('Draw anything!', canvas.width / 2, canvas.height / 2);
    ctx.font = '14px sans-serif';
    ctx.fillText('아무거나 그려보세요', canvas.width / 2, canvas.height / 2 + 25);
  }, []);

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = `hsl(${(progress * 3) % 360}, 80%, 70%)`;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();

    setProgress(prev => {
      const newProgress = Math.min(prev + 0.5, 100);
      if (newProgress >= 100) onComplete();
      return newProgress;
    });
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setStrokeCount(prev => prev + 1);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={350}
        height={350}
        className="rounded-3xl border-2 border-white/20 touch-none cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      
      {/* Progress ring around canvas */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <circle
          cx="50%"
          cy="50%"
          r="48%"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="3"
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="48%"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 168}`}
          strokeDashoffset={2 * Math.PI * 168 * (1 - progress / 100)}
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      <p className="text-center text-white/60 mt-4">
        {Math.round(progress)}% magic created ✨
      </p>
    </div>
  );
};

const GrandExplosion = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 400, height: 700 });

  useEffect(() => {
    // Get dimensions once on mount
    setDimensions({
      width: window.innerWidth || 400,
      height: window.innerHeight || 700
    });

    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => onComplete(), 4500)
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-hidden bg-black"
    >
      {/* Central light explosion */}
      {phase >= 1 && (
        <motion.div
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: [0, 3, 5], opacity: [0.8, 0.4, 0] }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, white 0%, #f472b6 40%, transparent 70%)'
          }}
        />
      )}

      {/* Butterflies - reduced count */}
      {phase >= 1 && [...Array(12)].map((_, i) => (
        <motion.div
          key={`butterfly-${i}`}
          initial={{ 
            left: '50%',
            top: '50%',
            scale: 0,
            opacity: 0
          }}
          animate={{ 
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            scale: 1,
            opacity: 1
          }}
          transition={{ 
            duration: 2,
            delay: i * 0.1,
            ease: "easeOut"
          }}
          className="absolute text-2xl md:text-4xl"
        >
          🦋
        </motion.div>
      ))}

      {/* HUGE Birthday text */}
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
        >
          <motion.p
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-pink-300 text-xl md:text-3xl font-light tracking-[0.2em] mb-4"
          >
            생일 축하해요
          </motion.p>
          
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-8xl font-light text-center"
            style={{
              background: 'linear-gradient(135deg, #f472b6 0%, #ffffff 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Happiest Birth Day
          </motion.h1>
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-5xl md:text-8xl font-light text-center"
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #ffffff 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
           Girl!
          </motion.h1>

          {/* Sparkles - reduced */}
          {[...Array(15)].map((_, i) => (
            <motion.span
              key={`spark-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.5,
                delay: 0.6 + i * 0.1
              }}
              className="absolute text-xl md:text-2xl"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`
              }}
            >
              ✨
            </motion.span>
          ))}
        </motion.div>
      )}

      {/* Cherry blossoms - reduced */}
      {phase >= 3 && [...Array(20)].map((_, i) => (
        <motion.div
          key={`blossom-${i}`}
          initial={{ 
            y: -20,
            opacity: 0
          }}
          animate={{ 
            y: dimensions.height + 20,
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 3,
            delay: i * 0.1,
            ease: "linear"
          }}
          className="absolute text-xl"
          style={{ left: `${Math.random() * 100}%` }}
        >
          🌸
        </motion.div>
      ))}

      {/* Lanterns - reduced */}
      {phase >= 3 && [...Array(6)].map((_, i) => (
        <motion.div
          key={`lantern-${i}`}
          initial={{ 
            bottom: -50,
            opacity: 0
          }}
          animate={{ 
            bottom: dimensions.height + 50,
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{ 
            duration: 4,
            delay: i * 0.3,
            ease: "linear"
          }}
          className="absolute text-3xl"
          style={{ left: `${10 + i * 15}%` }}
        >
          🏮
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function MagicRevealSection({ onComplete }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [drawingComplete, setDrawingComplete] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  const handleDrawingComplete = () => {
    setDrawingComplete(true);
    setTimeout(() => setShowExplosion(true), 500);
  };

  return (
    <section ref={ref} className="min-h-screen py-32 px-6 relative flex flex-col items-center justify-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-pink-300/40 text-xs tracking-[0.5em] uppercase mb-4">
          마지막 • The Grand Finale
        </p>
        <h2 className="text-2xl md:text-4xl text-white/90 font-light tracking-wide mb-4">
          마법의 캔버스 • Magic Canvas
        </h2>
        <p className="text-white/30 text-sm italic">
          Draw on the canvas to unlock the ultimate surprise!
        </p>
      </motion.div>

      {/* Drawing canvas */}
      {!drawingComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <DrawingCanvas onComplete={handleDrawingComplete} />
        </motion.div>
      )}

      {/* Completion message before explosion */}
      {drawingComplete && !showExplosion && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            ✨
          </motion.div>
          <p className="text-pink-300 text-xl">Magic unlocked!</p>
        </motion.div>
      )}

      {/* Grand explosion */}
      <AnimatePresence>
        {showExplosion && (
          <GrandExplosion onComplete={() => {
            setShowExplosion(false);
            onComplete?.();
          }} />
        )}
      </AnimatePresence>
    </section>
  );
}