import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";
import { ArrowRight, ChevronDown, Check, Calendar } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/30 via-transparent to-blue-500/20"></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-70">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 via-purple-600/30 to-blue-800/40 animate-pulse"></div>
        </div>
      </div>
      
      {/* Randomized shooting stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Pre-Header: Trust Signal in rounded box with better spacing */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 shadow-lg">
                <div className="flex items-center gap-3 text-white/90 text-sm md:text-base">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="whitespace-nowrap">Trusted by 5000+ Businesses</span>
                  <span className="text-white/60">•</span>
                  <span className="whitespace-nowrap">40+ Years Experience</span>
                </div>
              </div>
            </div>
            
            {/* Main headline - Visual hierarchy priority #1 */}
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 tracking-tight">
              Get Your Business Financed Today
            </h1>
            
            {/* Supporting text */}
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-normal">
              From property loans to working capital, we connect you with the right financial solutions. 
              <span className="text-white font-medium"> Fast approvals, competitive rates, expert guidance.</span>
            </p>
            
            {/* Two-Button CTA Structure */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-32">
              <Button 
                onClick={handleStartApplication}
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start Your Application
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white bg-white/15 hover:bg-white hover:text-blue-700 backdrop-blur-sm px-10 py-4 text-lg font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="/consultation">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Your Consultation
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