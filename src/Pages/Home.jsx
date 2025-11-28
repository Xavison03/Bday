import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginScreen from '@/components/birthday/LoginScreen';
import MainExperience from '@/components/birthday/MainExperience';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleSuccessfulLogin = () => {
    setShowTransition(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setShowTransition(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isAuthenticated && !showTransition && (
          <LoginScreen key="login" onSuccess={handleSuccessfulLogin} />
        )}
        
        {showTransition && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a]"
          >
            {/* Cherry blossom burst */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: 0,
                  y: 0
                }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1.5, 1],
                  x: Math.cos(i * 18 * Math.PI / 180) * 300,
                  y: Math.sin(i * 18 * Math.PI / 180) * 300
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
                className="absolute text-3xl"
              >
                🌸
              </motion.div>
            ))}
            
            {/* Butterflies */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`butterfly-${i}`}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: 0,
                  y: 0
                }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.2, 1],
                  x: Math.cos((i * 45 + 22.5) * Math.PI / 180) * 200,
                  y: Math.sin((i * 45 + 22.5) * Math.PI / 180) * 200 - 50
                }}
                transition={{ 
                  duration: 2.2,
                  delay: 0.3 + i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute text-4xl"
                style={{ filter: 'drop-shadow(0 0 15px rgba(244, 114, 182, 0.8))' }}
              >
                🦋
              </motion.div>
            ))}
            
            {/* Light flash */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0.5, 2, 3]
              }}
              transition={{ duration: 1.8, delay: 0.3 }}
              className="absolute w-96 h-96 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(244,114,182,0.4) 0%, rgba(168,85,247,0.2) 50%, transparent 100%)'
              }}
            />
            
            {/* Korean text reveal */}
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 1.2] }}
              transition={{ duration: 2.5, delay: 0.5 }}
              className="absolute text-3xl md:text-5xl font-light text-pink-200"
            >
              시작합니다...
            </motion.p>
          </motion.div>
        )}
        
        {isAuthenticated && !showTransition && (
          <MainExperience key="main" />
        )}
      </AnimatePresence>
    </div>
  );
}