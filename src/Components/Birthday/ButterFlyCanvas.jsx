import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Butterfly = ({ index, mouseX, mouseY }) => {
  const [position, setPosition] = useState({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight
  });

  const springConfig = { damping: 25 + index * 5, stiffness: 100 - index * 10 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  useEffect(() => {
    const offset = {
      x: (index % 3 - 1) * 80 + Math.random() * 40,
      y: Math.floor(index / 3) * 60 + Math.random() * 30
    };
    
    const unsubX = mouseX.on("change", (latest) => {
      x.set(latest + offset.x);
    });
    const unsubY = mouseY.on("change", (latest) => {
      y.set(latest + offset.y - 50);
    });

    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, index]);

  return (
    <motion.div
      style={{ x, y }}
      className="fixed pointer-events-none z-30"
      animate={{
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 0.95, 1]
      }}
      transition={{
        duration: 2 + index * 0.3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <span 
        className="text-2xl md:text-3xl"
        style={{ 
          filter: `drop-shadow(0 0 ${8 + index * 2}px rgba(212, 175, 55, ${0.4 + index * 0.1}))`,
          opacity: 0.7 - index * 0.1
        }}
      >
        🦋
      </span>
    </motion.div>
  );
};

export default function ButterflyCanvas() {
  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsActive(true);
    };

    const handleTouchMove = (e) => {
      mouseX.set(e.touches[0].clientX);
      mouseY.set(e.touches[0].clientY);
      setIsActive(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <Butterfly key={i} index={i} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
}