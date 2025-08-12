import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-[#0a0b1e] via-[#141428] to-[#0a0b1e] flex flex-col items-center justify-center"
        >
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 20,
                }}
                animate={{
                  y: -20,
                  x: Math.random() * window.innerWidth,
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-12"
          >
            <div className="relative w-24 h-24">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative transform">
                    <motion.div 
                      className="absolute w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 transform rotate-45 rounded-lg opacity-80"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div 
                      className="absolute w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 transform rotate-45 translate-x-3 translate-y-3 rounded-lg opacity-80"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="relative w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 transform rotate-45 -translate-x-2 -translate-y-2 rounded-lg"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Company Name */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8"
          >
            Kothari Financial Services
          </motion.h1>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-gray-400 text-sm"
          >
            Loading financial solutions...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}