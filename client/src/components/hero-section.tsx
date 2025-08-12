import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";
import { ArrowRight, ChevronDown, Check, Calendar, CreditCard, Shield, TrendingUp, Zap, Lock, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";

export default function HeroSection() {
  const { isAuthenticated, user } = useAuth();
  const [, setLocation] = useLocation();
  
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

  return (
    <section className="relative h-screen max-h-screen flex items-center justify-center overflow-hidden bg-[#0a0b1e]">
      {/* Dark gradient background - cleaner */}
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
        <div className="max-w-7xl mx-auto relative w-full">
          
          {/* Floating Cards - positioned around the central logo */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            {/* Top Left - Quick Application Card */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-[200px] -translate-y-[180px] xl:block">
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-400/30 rounded-xl p-3 w-44 transform -rotate-6 hover:rotate-0 transition-all duration-500 pointer-events-auto hover:scale-105 hover:border-purple-400/50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Quick Process</span>
                </div>
                <p className="text-white/60 text-xs">Approved within 48 hours</p>
              </div>
            </div>
            
            {/* Top Right - Secure Platform Card */}
            <div className="absolute top-1/2 left-1/2 transform translate-x-[60px] -translate-y-[180px] hidden xl:block">
              <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-xl border border-green-400/30 rounded-xl p-3 w-44 transform rotate-6 hover:rotate-0 transition-all duration-500 pointer-events-auto hover:scale-105 hover:border-green-400/50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Secure</span>
                </div>
                <p className="text-white/60 text-xs">Bank-level protection</p>
              </div>
            </div>
            
            {/* Bottom Left - Analytics Card */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-[200px] translate-y-[100px] hidden xl:block">
              <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-xl border border-orange-400/30 rounded-xl p-3 w-44 transform rotate-3 hover:rotate-0 transition-all duration-500 pointer-events-auto hover:scale-105 hover:border-orange-400/50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Analytics</span>
                </div>
                <p className="text-white/60 text-xs">Track loan progress</p>
              </div>
            </div>
            
            {/* Bottom Right - Support Card */}
            <div className="absolute top-1/2 left-1/2 transform translate-x-[60px] translate-y-[100px] hidden xl:block">
              <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-xl border border-blue-400/30 rounded-xl p-3 w-44 transform -rotate-3 hover:rotate-0 transition-all duration-500 pointer-events-auto hover:scale-105 hover:border-blue-400/50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Support</span>
                </div>
                <p className="text-white/60 text-xs">Dedicated advisors</p>
              </div>
            </div>
          </div>
          
          {/* Central KFS Logo with glow effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
            <div className="relative">
              {/* Glowing background */}
              <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              
              {/* KFS Logo */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="relative transform hover:scale-110 transition-transform duration-700">
                  {/* Outer ring */}
                  <div className="absolute inset-0 w-28 h-28 border-4 border-white/10 rounded-full"></div>
                  
                  {/* Geometric shapes */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-600/30 transform rotate-45 rounded-lg"></div>
                      <div className="absolute w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 transform rotate-45 translate-x-4 translate-y-4 rounded-lg"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-blue-400/40 to-cyan-500/40 transform rotate-45 -translate-x-2 -translate-y-2 rounded-lg flex items-center justify-center">
                        <span className="transform -rotate-45 text-white font-bold text-2xl">KFS</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Orbiting dots */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full -translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-pink-400 rounded-full -translate-x-1/2"></div>
                    <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-400 rounded-full -translate-y-1/2"></div>
                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-cyan-400 rounded-full -translate-y-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center relative">
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