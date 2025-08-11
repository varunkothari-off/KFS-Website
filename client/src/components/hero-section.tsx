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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0b1e] py-20">
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto relative">
          
          {/* Floating Cards - smaller and better positioned - hide on mobile */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            {/* Top Left - Quick Application Card */}
            <div className="absolute top-20 left-0 lg:left-10 xl:block">
              <div className="bg-gradient-to-br from-purple-600/15 to-blue-600/15 backdrop-blur-xl border border-white/10 rounded-xl p-3 w-48 transform -rotate-6 hover:rotate-0 transition-transform duration-500 pointer-events-auto">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Quick Process</span>
                </div>
                <p className="text-white/50 text-xs">Approved within 48 hours</p>
              </div>
            </div>
            
            {/* Top Right - Secure Platform Card */}
            <div className="absolute top-20 right-0 lg:right-10 hidden xl:block">
              <div className="bg-gradient-to-br from-green-600/15 to-teal-600/15 backdrop-blur-xl border border-white/10 rounded-xl p-3 w-48 transform rotate-6 hover:rotate-0 transition-transform duration-500 pointer-events-auto">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Secure</span>
                </div>
                <p className="text-white/50 text-xs">Bank-level protection</p>
              </div>
            </div>
            
            {/* Bottom Left - Analytics Card */}
            <div className="absolute bottom-40 left-0 lg:left-20 hidden xl:block">
              <div className="bg-gradient-to-br from-orange-600/15 to-red-600/15 backdrop-blur-xl border border-white/10 rounded-xl p-3 w-48 transform rotate-3 hover:rotate-0 transition-transform duration-500 pointer-events-auto">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Analytics</span>
                </div>
                <p className="text-white/50 text-xs">Track loan progress</p>
              </div>
            </div>
            
            {/* Bottom Right - Support Card */}
            <div className="absolute bottom-40 right-0 lg:right-20 hidden xl:block">
              <div className="bg-gradient-to-br from-blue-600/15 to-indigo-600/15 backdrop-blur-xl border border-white/10 rounded-xl p-3 w-48 transform -rotate-3 hover:rotate-0 transition-transform duration-500 pointer-events-auto">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">Support</span>
                </div>
                <p className="text-white/50 text-xs">Dedicated advisors</p>
              </div>
            </div>
          </div>
          
          {/* Central Gradient Pill - more subtle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative">
              {/* Subtle gradient pill shape */}
              <div className="w-56 h-80 lg:w-64 lg:h-96 bg-gradient-to-b from-purple-500/10 via-pink-500/5 to-blue-500/10 rounded-full blur-3xl opacity-50"></div>
              {/* Inner glow - very subtle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-60 lg:w-48 lg:h-72 bg-gradient-to-b from-white/5 to-transparent rounded-full blur-2xl"></div>
            </div>
          </div>
          
          <div className="text-center relative">
            {/* Pre-Header: Trust Signal */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 shadow-lg">
                <div className="flex items-center gap-3 text-white/90 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Trusted by 5000+ Businesses</span>
                </div>
              </div>
            </div>
            
            {/* SWAGATAM - Welcome message */}
            <h2 className="text-lg md:text-xl lg:text-2xl text-white/70 mb-4 md:mb-6 font-light tracking-[0.2em] md:tracking-[0.3em] uppercase">
              SWAGATAM!
            </h2>
            
            {/* Main headline with better spacing */}
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-medium mb-4 md:mb-6 text-white/90">
              Welcome to the home of
            </h1>
            
            {/* Company Name with Gradient - reduced size */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-8 md:mb-12 tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Kothari Financial
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-pink-200 to-white bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            
            {/* Geometric Logo - smaller and cleaner */}
            <div className="flex justify-center mb-12">
              <div className="relative w-20 h-20 lg:w-24 lg:h-24">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative transform hover:scale-110 transition-transform duration-500">
                    <div className="absolute w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-600 transform rotate-45 rounded-lg opacity-80"></div>
                    <div className="absolute w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-pink-500 transform rotate-45 translate-x-3 translate-y-3 rounded-lg opacity-80"></div>
                    <div className="relative w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-cyan-500 transform rotate-45 -translate-x-1.5 -translate-y-1.5 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Supporting text - more concise */}
            <p className="text-sm sm:text-base lg:text-lg text-white/70 mb-8 md:mb-16 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              With over thirty years of experience providing loans from partner nationalised and 
              private banks, NBFCs and Investors, KFS is here to solve all your financial worries
            </p>
            
            {/* Two-Button CTA Structure with more spacing */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 md:mb-32">
              <Button 
                onClick={handleConsultNow}
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Consult Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              
              <Button 
                onClick={handleApplyForLoan}
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-2 border-white/20 text-white/80 bg-transparent hover:bg-white/10 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-lg transition-all"
              >
                <CreditCard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Apply for Loan
              </Button>
            </div>

          </div>
        </div>
        
        {/* Scroll indicator - separated with more space */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
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