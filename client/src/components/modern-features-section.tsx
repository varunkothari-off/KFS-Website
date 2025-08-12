import { CreditCard, Shield, TrendingUp, Wallet, Lock, FileCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function ModernFeaturesSection() {
  const features = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payments",
      description: "Real-time card issuing and payment processing solutions",
      gradient: "from-purple-600 to-purple-500",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analytics",
      description: "Track loan performance and business metrics in real-time",
      gradient: "from-cyan-600 to-cyan-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security",
      description: "Bank-level security with encrypted data protection",
      gradient: "from-orange-600 to-orange-500",
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Cash Management",
      description: "Optimize working capital and cash flow management",
      gradient: "from-purple-600 to-cyan-600",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "100% Mobile",
      description: "Apply and manage loans from anywhere, anytime",
      gradient: "from-cyan-600 to-purple-600",
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Automated Docs",
      description: "Smart document processing with AI verification",
      gradient: "from-orange-600 to-purple-600",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-[#141428] to-[#0a0b1e] relative overflow-hidden">
      {/* Background decoration - triadic colors */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-64 h-64 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" aria-label="Financial Future for Disruptors and Innovators">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Financial Future for
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Disruptors & Innovators
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto px-4">
            Partner with us to unlock your business potential. We help you navigate financial challenges 
            and achieve your goals with personalized loan solutions and expert guidance.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-white/10 hover:border-purple-500/50 h-full hover:scale-105 data-highlight">
                {/* Icon with gradient background */}
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership Call-to-Action Section */}
        <div className="mt-16 md:mt-20 bg-gradient-to-br from-purple-600/10 to-cyan-600/10 rounded-2xl md:rounded-3xl p-6 md:p-12 relative overflow-hidden border border-white/20">
          {/* Animated gradient background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-orange-600/20 animate-gradient-x"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
                Partner With Us Today
              </h3>
              <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8">
                Let us help you achieve your financial goals. With 30+ years of expertise, 
                we're here to guide you through every step of your business loan journey.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 animate-pulse"></div>
                  <span className="text-white text-sm md:text-base">Personalized financial consultation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 animate-pulse"></div>
                  <span className="text-white text-sm md:text-base">Access to 30+ partner banks</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-purple-400 animate-pulse"></div>
                  <span className="text-white text-sm md:text-base">End-to-end loan support</span>
                </div>
              </div>
              
              <button className="mt-6 md:mt-8 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all transform hover:scale-105 w-full md:w-auto">
                Start Your Journey →
              </button>
            </div>
            
            {/* Partnership Visual */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-sm mx-auto">
                {/* Animated circles representing partnership */}
                <div className="relative h-64 md:h-80">
                  {/* Central partnership icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                      <Users className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>
                  </div>
                  
                  {/* Orbiting elements */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                        <Shield className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <CreditCard className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                        <Lock className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="60" fill="none" stroke="url(#gradient)" strokeWidth="1" strokeDasharray="5,5" className="animate-rotate-reverse opacity-30" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="url(#gradient)" strokeWidth="1" strokeDasharray="3,7" className="animate-rotate opacity-20" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}