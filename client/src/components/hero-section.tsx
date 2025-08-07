import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";
import { ArrowRight, ChevronDown, Check, Calendar } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function HeroSection() {
  const { isAuthenticated, user } = useAuth();
  const [, setLocation] = useLocation();

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
      
      {/* Shooting stars - increased quantity */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-70 shadow-lg" style={{
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="absolute top-3/5 right-1/3 w-0.5 h-0.5 bg-blue-200 rounded-full opacity-60" style={{
          boxShadow: '0 0 6px rgba(191, 219, 254, 0.5)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
        <div className="absolute top-1/3 right-1/5 w-0.5 h-0.5 bg-purple-200 rounded-full opacity-50" style={{
          boxShadow: '0 0 4px rgba(196, 181, 253, 0.4)',
          animation: 'float 10s ease-in-out infinite'
        }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-white/60 rounded-full opacity-40" style={{
          animation: 'float 12s ease-in-out infinite reverse'
        }}></div>
        <div className="absolute top-1/5 right-2/3 w-0.5 h-0.5 bg-white/80 rounded-full opacity-50" style={{
          boxShadow: '0 0 4px rgba(255, 255, 255, 0.4)',
          animation: 'float 7s ease-in-out infinite'
        }}></div>
        <div className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-blue-300 rounded-full opacity-45" style={{
          boxShadow: '0 0 6px rgba(147, 197, 253, 0.3)',
          animation: 'float 9s ease-in-out infinite reverse'
        }}></div>
        <div className="absolute top-2/3 left-1/6 w-0.5 h-0.5 bg-purple-300 rounded-full opacity-35" style={{
          animation: 'float 11s ease-in-out infinite'
        }}></div>
        <div className="absolute top-1/6 left-2/3 w-1 h-1 bg-white/50 rounded-full opacity-60" style={{
          boxShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
          animation: 'float 13s ease-in-out infinite reverse'
        }}></div>
        <div className="absolute bottom-2/5 left-2/5 w-0.5 h-0.5 bg-blue-100 rounded-full opacity-40" style={{
          animation: 'float 14s ease-in-out infinite'
        }}></div>
        <div className="absolute top-3/4 right-2/5 w-1 h-1 bg-purple-100 rounded-full opacity-30" style={{
          animation: 'float 15s ease-in-out infinite reverse'
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Pre-Header: Trust Signal in rounded box */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Trusted by 5000+ Businesses • 40+ Years Experience</span>
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
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-4 text-lg font-semibold rounded-xl transition-all"
                asChild
              >
                <Link href="/consultation">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Free Consultation
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