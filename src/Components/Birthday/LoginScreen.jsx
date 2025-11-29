import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginScreen({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === 'garfield9') {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f1a] overflow-hidden"
    >
      {/* Floating Korean-style lanterns */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50
          }}
          animate={{ 
            y: -100,
            x: `+=${(Math.random() - 0.5) * 200}`
          }}
          transition={{ 
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
          style={{ opacity: 0.4 + Math.random() * 0.3 }}
        >
          🏮
        </motion.div>
      ))}

      {/* Cherry blossom petals */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute w-3 h-3 bg-pink-300/40 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: 0
          }}
          animate={{ 
            y: window.innerHeight + 20,
            x: `+=${(Math.random() - 0.5) * 300}`,
            rotate: 360
          }}
          transition={{ 
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        />
      ))}

      {/* Soft glow orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-20 w-64 h-64 bg-pink-400 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400 rounded-full blur-[120px] opacity-20"
      />

      {/* Main content */}
      <motion.div
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="relative z-10 max-w-md w-full mx-6"
      >
        {/* Korean calligraphy decoration */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="text-center text-4xl mb-8 font-light"
          style={{ fontFamily: 'serif' }}
        >
          이야기
        </motion.p>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-center mb-12"
        >
          <p className="text-pink-300/60 text-sm tracking-[0.3em] uppercase mb-4 font-light">
            제 1 장 • Chapter One
          </p>
          <h1 className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed tracking-wide">
            "Every story begins with
          </h1>
          <h1 className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed tracking-wide italic">
            a quiet secret…"
          </h1>
        </motion.div>

        {/* Login form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          onSubmit={handleSubmit}
          className="relative"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-4 h-4 text-pink-300/70" />
                <span className="text-white/40 text-sm tracking-wider">비밀번호를 입력하세요</span>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="whisper the secret..."
                  className={`w-full bg-white/5 border ${error ? 'border-red-400/50' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-pink-400/50 transition-all duration-300 text-lg tracking-wide`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400/80 text-sm mt-3 text-center"
                >
                  That's not the secret... try again ✨
                </motion.p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-4 bg-gradient-to-r from-pink-500/80 to-purple-500/80 text-white rounded-xl font-light tracking-wider text-lg shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-300"
              >
                시작하기 • Begin
              </motion.button>
            </div>
          </div>
        </motion.form>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center text-white/20 text-xs mt-8 tracking-wider"
        >
          hint: It’s the day your story began, like episode 1 of a K-drama. 💜
        </motion.p>
      </motion.div>
    </motion.div>
  );
}