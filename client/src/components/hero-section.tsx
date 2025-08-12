import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight, ChevronDown, Zap, Shield, TrendingUp, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMemo, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import kfsLogo from '@assets/logo_1754958364982.png';

export default function HeroSection() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  // Mouse-controlled constellation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Stars array
    const stars: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];
    
    // Create stars
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      stars.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        color: ['#8B5CF6', '#06B6D4', '#FB923C', '#8B5CF6'][Math.floor(Math.random() * 4)]
      });
    }
    
    // Mouse tracking
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update star positions based on mouse
      stars.forEach(star => {
        const dx = mouseX - star.baseX;
        const dy = mouseY - star.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 30;
          star.x = star.baseX + (dx / distance) * force;
          star.y = star.baseY + (dy / distance) * force;
        } else {
          star.x += (star.baseX - star.x) * 0.1;
          star.y += (star.baseY - star.y) * 0.1;
        }
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.fill();
        
        // Draw connections to nearby stars
        stars.forEach(other => {
          const dx = star.x - other.x;
          const dy = star.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120 && distance > 0) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = star.color;
            ctx.globalAlpha = (1 - distance / 120) * 0.3;
            ctx.lineWidth = 0.5;
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
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
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
      sessionStorage.setItem('redirectAfterLogin', '/dashboard?tab=consultation');
      setLocation('/login');
    } else {
      setLocation('/dashboard?tab=consultation');
    }
  };

  const handleApplyForLoan = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', '/dashboard?tab=loans');
      setLocation('/login');
    } else {
      setLocation('/dashboard?tab=loans');
    }
  };

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0b1e]">
      {/* Mouse-controlled constellation stars */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* Background gradients - using triadic colors */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b1e] via-[#0f1020] to-[#141428]"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/10 via-cyan-600/5 to-orange-600/5"></div>
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
      
      {/* Main Content - Minimalist with Negative Space */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Side - KFS Logo */}
            <motion.div 
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="relative"
                animate={{
                  y: [0, -10, 0],
                  rotateY: mousePosition.x * 5,
                  rotateX: -mousePosition.y * 5,
                }}
                transition={{
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotateY: {
                    type: "spring",
                    stiffness: 50
                  },
                  rotateX: {
                    type: "spring", 
                    stiffness: 50
                  }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Subtle glow - using primary and secondary colors */}
                <div className="absolute inset-0 w-56 h-56 md:w-72 md:h-72 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>
                
                {/* Logo Container */}
                <div className="relative w-56 h-56 md:w-72 md:h-72 bg-white/[0.02] backdrop-blur-sm rounded-3xl p-10 border border-white/5">
                  <img 
                    src={kfsLogo} 
                    alt="Kothari Financial Services Logo - Business Loan Advisory Since 1994" 
                    className="w-full h-full object-contain filter brightness-110 drop-shadow-2xl"
                    loading="eager"
                    width="288"
                    height="288"
                  />
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right Side - Clean Typography */}
            <div className="text-center lg:text-left space-y-6 lg:space-y-8">
              
              {/* Sanskrit Welcome */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl text-white/95 font-bold" 
                  style={{ fontFamily: "'Noto Sans Devanagari', serif" }}
                >
                  स्वागतम्
                </h2>
              </motion.div>
              
              {/* Company Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-1"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  <span className="block bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                    Kothari
                  </span>
                  <span className="block text-white/70 text-2xl md:text-3xl lg:text-4xl font-light mt-2">
                    Financial Services
                  </span>
                </h1>
              </motion.div>
              
              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-md"
              >
                30+ years of trust.
                <br/>
                Your financial journey starts here.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <Button 
                  onClick={handleConsultNow}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 transition-all px-8 py-6 text-base rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Start Consultation
                </Button>
                
                <Button 
                  onClick={handleApplyForLoan}
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10 border border-white/20 transition-all px-8 py-6 text-base rounded-xl"
                >
                  Apply for Loan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator - Discover Our Services */}
        <motion.div 
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <button
            onClick={scrollToServices}
            className="flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-all group"
            aria-label="Scroll to discover our services"
          >
            <span className="text-sm sm:text-base md:text-lg font-light tracking-wider group-hover:text-purple-400 transition-colors">
              Discover Our Services
            </span>
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:text-purple-400 transition-colors" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}