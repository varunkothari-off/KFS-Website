import { Zap, Shield, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FloatingFeatures() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Quick Process",
      description: "24-hour approval",
      gradient: "from-green-500 to-emerald-500",
      delay: 0,
      rotation: 3
    },
    {
      icon: TrendingUp,
      title: "Low Rates",
      description: "Best interest rates",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.1,
      rotation: -3
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "Data protection",
      gradient: "from-orange-500 to-red-500",
      delay: 0.2,
      rotation: -2
    },
    {
      icon: Users,
      title: "Support",
      description: "Dedicated advisors",
      gradient: "from-blue-500 to-indigo-500",
      delay: 0.3,
      rotation: 3
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#0a0b1e] to-[#141428]">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose KFS?
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Experience the difference with our comprehensive financial solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                rotate: 0,
                transition: { duration: 0.3 }
              }}
              animate={{
                y: [0, -10, 0],
                rotateY: mousePosition.x * 3,
                rotateX: -mousePosition.y * 3,
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                transform: `rotate(${feature.rotation}deg)`
              }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-xl border border-purple-400/20 rounded-2xl p-6 h-full hover:border-purple-400/40 transition-all duration-300">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}