import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";
import { ArrowRight, ChevronDown, Check, Calendar, CreditCard, Shield, TrendingUp, Zap, Lock, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMemo, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import kfsLogo from '@assets/logo_1754958364982.png';

export default function HeroSection() {
  const { isAuthenticated, user } = useAuth();
  const [, setLocation] = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [colorTheme, setColorTheme] = useState('default');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Generate very rare comets as easter egg
  const comets = useMemo(() => {
    const cometList = [];
    const cometCount = 1; // Just one comet for extreme subtlety
    
    for (let i = 0; i < cometCount; i++) {
      const isReverse = Math.random() > 0.5;
      const randomTop = 20 + Math.random() * 40; // Middle area only
      const randomDelay = Math.random() * 30 + 15; // Very long delays 15-45 seconds
      const randomDuration = 3 + Math.random() * 2; // Slower movement 3-5 seconds
      const trailLength = 20 + Math.random() * 30; // Very short trails
      
      cometList.push({
        id: i,
        top: `${randomTop}%`,
        animationDelay: `${randomDelay}s`,
        animationDuration: `${randomDuration}s`,
        isReverse,
        opacity: 0.03 + Math.random() * 0.05, // Extremely low opacity 0.03-0.08
        trailLength: `${trailLength}px`,
      });
    }
    
    return cometList;
  }, []);

  // Keep default theme
  useEffect(() => {
    setColorTheme('default');
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

  // Use default purple/pink theme colors
  const themeColors = {
    bg: 'from-[#0a0b1e] via-[#0f1020] to-[#141428]',
    cards: 'from-purple-600/20 to-pink-600/20',
    cardBorder: 'border-purple-400/30',
    logo: 'from-purple-500/30 to-pink-500/30',
    glow: 'from-purple-500/20 via-pink-500/20 to-blue-500/20'
  };

  return (
    <section ref={sectionRef} className="relative h-screen max-h-screen flex items-center justify-center overflow-hidden bg-[#0a0b1e]">
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ zIndex: 1 }}
      />
      
      {/* Original gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b1e] via-[#0f1020] to-[#141428]"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-blue-900/5"></div>
        
        {/* Very subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
      </div>
      
      {/* Very subtle comet easter egg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {comets.map((comet) => (
          <div
            key={comet.id}
            className={`comet ${comet.isReverse ? 'comet-reverse' : ''}`}
            style={{
              top: comet.top,
              [comet.isReverse ? 'right' : 'left']: '-5%',
              animationDelay: comet.animationDelay,
              animationDuration: comet.animationDuration,
              opacity: comet.opacity,
              '--trail-length': comet.trailLength,
            } as React.CSSProperties}
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
          
          {/* Floating Cards around KFS Logo with 3D perspective */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block" style={{ transformStyle: 'preserve-3d' }}>
            {/* Top Left - Quick Application Card */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-[280px] -translate-y-[150px] xl:block"
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
              className="absolute top-1/2 left-1/2 transform translate-x-[100px] -translate-y-[150px] hidden xl:block"
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
              className="absolute top-1/2 left-1/2 transform -translate-x-[280px] translate-y-[120px] hidden xl:block"
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
              className="absolute top-1/2 left-1/2 transform translate-x-[100px] translate-y-[120px] hidden xl:block"
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
                  
                  {/* KFS Logo in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-20 h-20 bg-white/10 backdrop-blur-sm rounded-xl p-2">
                      <img src={kfsLogo} alt="KFS" className="w-full h-full object-contain" />
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
            
            {/* SWAGATAM - Welcome message in Sanskrit */}
            <h2 className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-2 md:mb-3 tracking-wider" style={{ fontFamily: "'Noto Sans Devanagari', serif", fontWeight: 600 }}>
              स्वागतम्
            </h2>
            <p className="text-xs md:text-sm text-white/60 mb-3" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.15em' }}>
              SWAGATAM - WELCOME
            </p>
            
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