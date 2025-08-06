import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, Calendar, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-kfs-primary via-kfs-secondary to-kfs-accent flex items-center overflow-hidden">
      {/* Enhanced Background with geometric patterns */}
      <div className="absolute inset-0 bg-black/10">
        {/* Geometric overlay patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="absolute top-20 left-10" width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="2" fill="white" />
            <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.3" fill="none" />
          </svg>
          <svg className="absolute top-40 right-20" width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path d="M40 10 L60 30 L40 50 L20 30 Z" stroke="white" strokeWidth="0.5" fill="none" />
          </svg>
          <svg className="absolute bottom-20 left-1/4" width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M20 60 L60 20 L100 60 L60 100 Z" stroke="white" strokeWidth="0.3" fill="none" />
          </svg>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-yellow-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/6 w-3 h-3 bg-white rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/6 w-2 h-2 bg-yellow-400 rounded-full opacity-50 animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Content - spans 3 columns */}
          <div className="lg:col-span-3 text-white">
            <div className="inline-block bg-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              ✨ Trusted by 500+ Businesses
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Your Trusted Partner in{' '}
              <span className="block text-yellow-300 relative">
                Business Finance
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow-300/30" viewBox="0 0 300 12" fill="none">
                  <path d="M0 8 Q150 0 300 8" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed max-w-2xl">
              Streamline your loan applications with India's most advanced financial advisory platform. 
              <span className="text-yellow-200 font-medium"> Trusted by businesses across Kolkata and beyond.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/loan-application">
                <Button size="lg" className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-kfs-dark hover:from-yellow-300 hover:to-yellow-400 text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Start Your Application
                </Button>
              </Link>
              <Link href="/consultation">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group border-2 border-white text-white hover:bg-white hover:text-kfs-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Book Consultation
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
              <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-yellow-300">₹500+ Cr</div>
                <div className="text-blue-200 text-sm">Loans Facilitated</div>
              </div>
              <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-yellow-300">500+</div>
                <div className="text-blue-200 text-sm">Happy Clients</div>
              </div>
              <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-yellow-300">20+</div>
                <div className="text-blue-200 text-sm">Bank Partners</div>
              </div>
              <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-yellow-300">98%</div>
                <div className="text-blue-200 text-sm">Approval Rate</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Enhanced Features Card - spans 2 columns */}
          <div className="lg:col-span-2 relative">
            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl mb-4">
                  <svg className="w-8 h-8 text-kfs-dark" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Why Choose KFS?</h3>
                <p className="text-blue-100">Excellence in financial services</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-kfs-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Expert Advisory</h4>
                    <p className="text-blue-100 text-sm">Personalized financial guidance from industry experts</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-kfs-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Quick Approval</h4>
                    <p className="text-blue-100 text-sm">Fast processing with minimal documentation</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-kfs-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Competitive Rates</h4>
                    <p className="text-blue-100 text-sm">Best-in-market interest rates and flexible terms</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white rounded-full opacity-40 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button 
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hover:text-yellow-300 transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
