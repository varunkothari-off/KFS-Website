import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";
import { ArrowRight, ChevronDown, Check, Calendar, CreditCard, Shield, TrendingUp, Zap, Lock, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMemo, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { isAuthenticated, user } = useAuth();
  const [, setLocation] = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [colorTheme, setColorTheme] = useState('default');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Generate random shooting stars with varying trail lengths
  const shootingStars = useMemo(() => {
    const stars = [];
    const starCount = 20; // Increased count for more stars
    
    for (let i = 0; i < starCount; i++) {
      const isReverse = Math.random() > 0.5;
      const randomTop = Math.random() * 60; // Random position from 0% to 60% of screen height
      const randomDelay = Math.random() * 6; // Random delay from 0 to 6 seconds
      const randomDuration = 1.5 + Math.random() * 2.5; // Duration between 1.5-4 seconds
      const trailLength = 40 + Math.random() * 160; // Trail length between 40px and 200px
      
      stars.push({
        id: i,
        top: `${randomTop}%`,
        animationDelay: `${randomDelay}s`,
        animationDuration: `${randomDuration}s`,
        isReverse,
        opacity: 0.4 + Math.random() * 0.6, // Random opacity between 0.4 and 1
        trailLength: `${trailLength}px`,
      });
    }
    
    return stars;
  }, []);

  // Dynamic color themes based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      setColorTheme('morning'); // Warm orange/yellow
    } else if (hour >= 12 && hour < 17) {
      setColorTheme('day'); // Purple/pink (default)
    } else if (hour >= 17 && hour < 20) {
      setColorTheme('evening'); // Deep blues/purples
    } else {
      setColorTheme('night'); // Darker with more glow
    }
  }, []);

  // Parallax effect for mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle flow system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: ['#a855f7', '#ec4899', '#3b82f6', '#06b6d4'][Math.floor(Math.random() * 4)]
      });
    }
    
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Draw connections to nearby particles
        particles.forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100 && distance > 0) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 100) * 0.2;
            ctx.stroke();
          }
        });
      });
      
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultNow = () => {
    if (!isAuthenticated) {
      // Store intended destination for post-login redirect
      sessionStorage.setItem('redirectAfterLogin', '/dashboard?tab=consultation');
      setLocation('/login');
    } else {
      setLocation('/dashboard?tab=consultation');
    }
  };

  const handleApplyForLoan = () => {
    if (!isAuthenticated) {
      // Store intended destination for post-login redirect
      sessionStorage.setItem('redirectAfterLogin', '/dashboard?tab=loans');
      setLocation('/login');
    } else {
      setLocation('/dashboard?tab=loans');
    }
  };

  // Get color scheme based on theme
  const getThemeColors = () => {
    switch(colorTheme) {
      case 'morning':
        return {
          bg: 'from-[#1a0f0a] via-[#2d1810] to-[#3d2820]',
          cards: 'from-orange-600/20 to-yellow-600/20',
          cardBorder: 'border-orange-400/30',
          logo: 'from-orange-500/30 to-yellow-500/30',
          glow: 'from-orange-500/20 via-yellow-500/20 to-amber-500/20'
        };
      case 'evening':
        return {
          bg: 'from-[#0a0a1e] via-[#10102d] to-[#1a1a3e]',
          cards: 'from-indigo-600/20 to-purple-800/20',
          cardBorder: 'border-indigo-400/30',
          logo: 'from-indigo-500/30 to-purple-700/30',
          glow: 'from-indigo-500/20 via-purple-500/20 to-violet-500/20'
        };
      case 'night':
        return {
          bg: 'from-[#050510] via-[#0a0a18] to-[#0f0f20]',
          cards: 'from-blue-900/20 to-indigo-900/20',
          cardBorder: 'border-blue-600/30',
          logo: 'from-blue-700/30 to-indigo-800/30',
          glow: 'from-blue-600/30 via-indigo-600/30 to-purple-600/30'
        };
      default: // day
        return {
          bg: 'from-[#0a0b1e] via-[#0f1020] to-[#141428]',
          cards: 'from-purple-600/20 to-pink-600/20',
          cardBorder: 'border-purple-400/30',
          logo: 'from-purple-500/30 to-pink-500/30',
          glow: 'from-purple-500/20 via-pink-500/20 to-blue-500/20'
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <section ref={sectionRef} className="relative h-screen max-h-screen flex items-center justify-center overflow-hidden bg-[#0a0b1e]">
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ zIndex: 1 }}
      />
      
      {/* Dynamic gradient background based on time */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${themeColors.bg} transition-all duration-3000`}></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-blue-900/5"></div>
        
        {/* Very subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
      </div>
      
      {/* Randomized shooting stars */}
      <div className="absolute inset-0 overflow-hidden">
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className={`shooting-star ${star.isReverse ? 'shooting-star-reverse' : ''}`}
            style={{
              top: star.top,
              [star.isReverse ? 'right' : 'left']: '-10%',
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
              opacity: star.opacity,
              '--trail-length': star.trailLength,
            } as React.CSSProperties}
          />
        ))}
        
        {/* Additional random twinkling stars for depth */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`twinkle-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 90 + 5}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              opacity: Math.random() * 0.7 + 0.3,
              boxShadow: `0 0 ${Math.random() * 6 + 2}px rgba(255, 255, 255, ${Math.random() * 0.6 + 0.4})`,
              animation: `pulse ${Math.random() * 2 + 1.5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto relative w-full" style={{ perspective: '1000px' }}>
          
          {/* Constellation SVG Lines */}
          <svg className="absolute inset-0 pointer-events-none hidden lg:block" style={{ zIndex: 2 }}>
            <defs>
              <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Lines connecting cards to center - will be animated */}
            <line x1="50%" y1="50%" x2="30%" y2="20%" stroke="url(#constellation-gradient)" strokeWidth="1" className="constellation-line" />
            <line x1="50%" y1="50%" x2="70%" y2="20%" stroke="url(#constellation-gradient)" strokeWidth="1" className="constellation-line" />
            <line x1="50%" y1="50%" x2="30%" y2="80%" stroke="url(#constellation-gradient)" strokeWidth="1" className="constellation-line" />
            <line x1="50%" y1="50%" x2="70%" y2="80%" stroke="url(#constellation-gradient)" strokeWidth="1" className="constellation-line" />
          </svg>
          
          {/* Floating Cards with 3D perspective */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block" style={{ transformStyle: 'preserve-3d' }}>
            {/* Top Left - Quick Application Card */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-[200px] -translate-y-[180px] xl:block"
              animate={{
                rotateY: mousePosition.x * 10,
                rotateX: -mousePosition.y * 10,
                x: mousePosition.x * 20,
                y: mousePosition.y * 20
              }}
              transition={{ type: "spring", stiffness: 100 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`bg-gradient-to-br ${themeColors.cards} backdrop-blur-xl border ${themeColors.cardBorder} rounded-xl p-3 w-44 transform -rotate-6 hover:rotate-0 transition-all duration-500 pointer-events-auto hover:scale-105 card-3d`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Quick Process</span>
                </div>
                <p className="text-white/60 text-xs">Approved within 48 hours</p>
              </div>
            </motion.div>
            
            {/* Top Right - Secure Platform Card */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform translate-x-[60px] -translate-y-[180px] hidden xl:block"
              animate={{
                rotateY: mousePosition.x * 10,
                rotateX: -mousePosition.y * 10,
                x: mousePosition.x * 20,
                y: mousePosition.y * 20
              }}
              transition={{ type: "spring", stiffness: 100 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`bg-gradient-to-br ${themeColors.cards} backdrop-blur-xl border ${themeColors.cardBorder} rounded-xl p-3 w-44 transform rotate-6 hover:rotate-0 transition-all duration-500 pointer-events-auto hover:scale-105 card-3d`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Secure</span>
                </div>
                <p className="text-white/60 text-xs">Bank-level protection</p>
              </div>
            </motion.div>
            
            {/* Bottom Left - Analytics Card */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-[200px] translate-y-[100px] hidden xl:block"
              animate={{
                rotateY: mousePosition.x * 10,
                rotateX: -mousePosition.y * 10,
                x: mousePosition.x * 20,
                y: mousePosition.y * 20
              }}
              transition={{ type: "spring", stiffness: 100 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`bg-gradient-to-br ${themeColors.cards} backdrop-blur-xl border ${themeColors.cardBorder} rounded-xl p-3 w-44 transform rotate-3 hover:rotate-0 transition-all duration-500 pointer-events-auto hover:scale-105 card-3d`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Analytics</span>
                </div>
                <p className="text-white/60 text-xs">Track loan progress</p>
              </div>
            </motion.div>
            
            {/* Bottom Right - Support Card */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform translate-x-[60px] translate-y-[100px] hidden xl:block"
              animate={{
                rotateY: mousePosition.x * 10,
                rotateX: -mousePosition.y * 10,
                x: mousePosition.x * 20,
                y: mousePosition.y * 20
              }}
              transition={{ type: "spring", stiffness: 100 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`bg-gradient-to-br ${themeColors.cards} backdrop-blur-xl border ${themeColors.cardBorder} rounded-xl p-3 w-44 transform -rotate-3 hover:rotate-0 transition-all duration-500 pointer-events-auto hover:scale-105 card-3d`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Support</span>
                </div>
                <p className="text-white/60 text-xs">Dedicated advisors</p>
              </div>
            </motion.div>
          </div>
          
          {/* Central KFS Logo with parallax effect */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block"
            animate={{
              x: mousePosition.x * 30,
              y: mousePosition.y * 30,
              rotateY: mousePosition.x * 5,
              rotateX: -mousePosition.y * 5
            }}
            transition={{ type: "spring", stiffness: 50 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative">
              {/* Glowing background */}
              <div className={`absolute inset-0 w-32 h-32 bg-gradient-to-r ${themeColors.glow} rounded-full blur-3xl animate-pulse`}></div>
              
              {/* KFS Logo */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="relative transform hover:scale-110 transition-transform duration-700">
                  {/* Outer ring */}
                  <div className="absolute inset-0 w-28 h-28 border-4 border-white/20 rounded-full"></div>
                  
                  {/* Geometric shapes */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className={`absolute w-16 h-16 bg-gradient-to-br ${themeColors.logo} transform rotate-45 rounded-lg`}></div>
                      <div className={`absolute w-16 h-16 bg-gradient-to-br ${themeColors.logo} transform rotate-45 translate-x-4 translate-y-4 rounded-lg`}></div>
                      <div className={`relative w-16 h-16 bg-gradient-to-br from-blue-400/50 to-cyan-500/50 transform rotate-45 -translate-x-2 -translate-y-2 rounded-lg flex items-center justify-center`}>
                        <span className="transform -rotate-45 text-white font-bold text-2xl drop-shadow-lg">KFS</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Orbiting dots */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full -translate-x-1/2 shadow-lg shadow-purple-400/50"></div>
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-pink-400 rounded-full -translate-x-1/2 shadow-lg shadow-pink-400/50"></div>
                    <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-400 rounded-full -translate-y-1/2 shadow-lg shadow-blue-400/50"></div>
                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-cyan-400 rounded-full -translate-y-1/2 shadow-lg shadow-cyan-400/50"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center relative">
            {/* Theme Indicator - subtle display of current theme */}
            <div className="absolute top-0 right-0 hidden lg:block">
              <div className="text-xs text-white/30 uppercase tracking-wider">
                {colorTheme === 'morning' && '🌅 Morning Theme'}
                {colorTheme === 'day' && '☀️ Day Theme'}
                {colorTheme === 'evening' && '🌆 Evening Theme'}
                {colorTheme === 'night' && '🌙 Night Theme'}
              </div>
            </div>
            
            {/* Pre-Header: Trust Signal */}
            <div className="flex items-center justify-center mb-3 md:mb-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 md:px-6 py-1.5 md:py-2 shadow-lg">
                <div className="flex items-center gap-2 md:gap-3 text-white/90 text-xs md:text-sm">
                  <Check className="w-3 md:w-4 h-3 md:h-4 text-green-400" />
                  <span>Trusted by 5000+ Businesses</span>
                </div>
              </div>
            </div>
            
            {/* SWAGATAM - Welcome message */}
            <h2 className="text-base md:text-lg lg:text-xl text-white/70 mb-2 md:mb-3 font-light tracking-[0.2em] md:tracking-[0.3em] uppercase">
              SWAGATAM!
            </h2>
            
            {/* Main headline with better spacing */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium mb-2 md:mb-3 text-white/90">
              Welcome to the home of
            </h1>
            
            {/* Company Name with Gradient - reduced size */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Kothari Financial
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-pink-200 to-white bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            
            {/* Geometric Logo - smaller and cleaner */}
            <div className="flex justify-center mb-3 md:mb-4">
              <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative transform hover:scale-110 transition-transform duration-500">
                    <div className="absolute w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-600 transform rotate-45 rounded-lg opacity-80"></div>
                    <div className="absolute w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-pink-500 transform rotate-45 translate-x-2 translate-y-2 md:translate-x-2.5 md:translate-y-2.5 rounded-lg opacity-80"></div>
                    <div className="relative w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-cyan-500 transform rotate-45 -translate-x-1 -translate-y-1 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Supporting text - more concise */}
            <p className="text-xs sm:text-sm lg:text-base text-white/70 mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              With over thirty years of experience providing loans from partner nationalised and 
              private banks, NBFCs and Investors, KFS is here to solve all your financial worries
            </p>
            
            {/* Two-Button CTA Structure with more spacing */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4 md:mb-8">
              <Button 
                onClick={handleConsultNow}
                size="default" 
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 text-sm px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Consult Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                onClick={handleApplyForLoan}
                variant="outline" 
                size="default"
                className="w-full sm:w-auto border-2 border-white/20 text-white/80 bg-transparent hover:bg-white/10 backdrop-blur-sm px-6 py-2.5 text-sm font-medium rounded-lg transition-all"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Apply for Loan
              </Button>
            </div>

          </div>
        </div>
        
        {/* Scroll indicator - separated with more space */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToServices}
            className="inline-flex flex-col items-center text-white/50 hover:text-white/70 transition-colors group"
            aria-label="Scroll to services"
          >
            <span className="text-xs font-light tracking-wider uppercase mb-1">Discover Our Services</span>
            <ChevronDown className="w-5 h-5 animate-bounce group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}