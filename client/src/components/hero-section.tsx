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

  const handleStartApplication = () => {
    if (!isAuthenticated) {
      setLocation('/login');
    } else if (user && !user.isProfileComplete) {
      setLocation('/complete-profile');
    } else {
      setLocation('/loan-application');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0b1e]">
      {/* Dark gradient background inspired by Open Finance */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b1e] via-[#141428] to-[#1a1b3a]"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/20 via-transparent to-blue-900/10"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
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
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto relative">
          
          {/* Floating Cards - inspired by Open Finance design */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top Left - Quick Application Card */}
            <div className="absolute top-10 left-0 lg:left-10 hidden lg:block">
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-56 transform -rotate-6 hover:rotate-0 transition-transform duration-500 pointer-events-auto">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold">Quick Process</span>
                </div>
                <p className="text-white/60 text-sm">Get approved within 48 hours</p>
              </div>
            </div>
            
            {/* Top Right - Secure Platform Card */}
            <div className="absolute top-10 right-0 lg:right-10 hidden lg:block">
              <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-56 transform rotate-6 hover:rotate-0 transition-transform duration-500 pointer-events-auto">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold">Bank-Level Security</span>
                </div>
                <p className="text-white/60 text-sm">Your data is always protected</p>
              </div>
            </div>
            
            {/* Bottom Left - Analytics Card */}
            <div className="absolute bottom-32 left-0 lg:left-20 hidden lg:block">
              <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-56 transform rotate-3 hover:rotate-0 transition-transform duration-500 pointer-events-auto">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold">Smart Analytics</span>
                </div>
                <p className="text-white/60 text-sm">Track your loan progress</p>
              </div>
            </div>
            
            {/* Bottom Right - Support Card */}
            <div className="absolute bottom-32 right-0 lg:right-20 hidden lg:block">
              <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-56 transform -rotate-3 hover:rotate-0 transition-transform duration-500 pointer-events-auto">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold">Expert Support</span>
                </div>
                <p className="text-white/60 text-sm">Dedicated advisors for you</p>
              </div>
            </div>
          </div>
          
          {/* Central Gradient Pill - inspired by Open Finance */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative">
              {/* Large gradient pill shape */}
              <div className="w-64 h-96 lg:w-80 lg:h-[480px] bg-gradient-to-b from-purple-500/30 via-pink-500/20 to-blue-500/30 rounded-full blur-3xl opacity-60"></div>
              {/* Inner glow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-72 lg:w-60 lg:h-96 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-2xl"></div>
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
            <h2 className="text-2xl lg:text-3xl text-white/90 mb-2 font-light tracking-widest">
              SWAGATAM!
            </h2>
            
            {/* Main headline with gradient text effect */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 tracking-tight">
              <span className="text-white">Welcome to the home of</span>
            </h1>
            
            {/* Company Name with Gradient */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Kothari Financial
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-pink-200 to-white bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            
            {/* Geometric Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative w-24 h-24 lg:w-32 lg:h-32">
                {/* Animated geometric logo inspired by the original */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative transform hover:scale-110 transition-transform duration-500">
                    <div className="absolute w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-purple-600 transform rotate-45 rounded-lg opacity-80"></div>
                    <div className="absolute w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-pink-500 transform rotate-45 translate-x-4 translate-y-4 rounded-lg opacity-80"></div>
                    <div className="relative w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-400 to-cyan-500 transform rotate-45 -translate-x-2 -translate-y-2 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Supporting text */}
            <p className="text-lg lg:text-xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              With over thirty years of experience providing loans from partner nationalised and 
              private banks, NBFCs and Investors, KFS is here to solve all your financial worries
            </p>
            
            {/* Two-Button CTA Structure */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                onClick={handleStartApplication}
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 text-lg px-10 py-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Consult Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/30 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm px-10 py-6 text-lg font-medium rounded-lg transition-all"
                asChild
              >
                <Link href="/loan-application">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Apply for Loan
                </Link>
              </Button>
            </div>

          </div>
        </div>
        
        {/* Scroll indicator - moved to absolute bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToServices}
            className="inline-flex flex-col items-center text-white/70 hover:text-white transition-colors group"
            aria-label="Scroll to services"
          >
            <span className="text-sm font-medium mb-2">Discover Our Services</span>
            <ChevronDown className="w-6 h-6 animate-bounce group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}