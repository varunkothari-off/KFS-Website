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
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Modern Abstract Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Large abstract shapes */}
        <div className="absolute inset-0">
          {/* Primary accent shape */}
          <div className="absolute top-0 right-0 w-1/2 h-full">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-400/20 to-orange-500/10 rounded-full blur-3xl transform translate-x-24 -translate-y-24"></div>
            <div className="absolute top-32 right-32 w-64 h-64 bg-gradient-to-bl from-blue-400/30 to-cyan-500/20 rounded-full blur-2xl"></div>
          </div>
          
          {/* Secondary accent shape */}
          <div className="absolute bottom-0 left-0 w-1/2 h-full">
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/15 to-pink-500/10 rounded-full blur-3xl transform -translate-x-20 translate-y-20"></div>
            <div className="absolute bottom-40 left-40 w-48 h-48 bg-gradient-to-tr from-green-400/20 to-teal-500/15 rounded-full blur-2xl"></div>
          </div>
          
          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
        </div>
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)
          `,
          backgroundSize: '20px 20px'
        }}></div>
        
        {/* Diagonal texture lines */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.03) 2px,
              rgba(255,255,255,0.03) 4px
            )
          `
        }}></div>
        
        {/* Enhanced geometric grid with texture */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
                radial-gradient(circle at 40px 40px, rgba(255,255,255,0.02) 2px, transparent 2px)
              `,
              backgroundSize: '80px 80px, 80px 80px, 80px 80px'
            }}
          />
        </div>
        
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-25 mix-blend-soft-light" style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0),
            radial-gradient(circle at 8px 8px, rgba(255,255,255,0.03) 1px, transparent 0)
          `,
          backgroundSize: '16px 16px, 32px 32px'
        }}></div>
        
        {/* Enhanced floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full opacity-60 animate-ping animation-delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-ping animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-50 animate-ping animation-delay-3000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-green-300 rounded-full opacity-30 animate-ping animation-delay-4000"></div>
        <div className="absolute top-3/4 left-1/5 w-1 h-1 bg-cyan-300 rounded-full opacity-45 animate-ping animation-delay-5000"></div>
        <div className="absolute top-1/5 right-1/5 w-1.5 h-1.5 bg-orange-300 rounded-full opacity-35 animate-ping animation-delay-6000"></div>
        <div className="absolute bottom-1/5 left-2/3 w-1 h-1 bg-pink-300 rounded-full opacity-40 animate-ping animation-delay-7000"></div>
        <div className="absolute top-2/3 right-2/3 w-2 h-2 bg-teal-300 rounded-full opacity-25 animate-ping animation-delay-8000"></div>
        
        {/* Enhanced light rays with texture */}
        <div className="absolute top-20 right-20 w-px h-32 bg-gradient-to-b from-yellow-300/50 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-32 left-32 w-px h-24 bg-gradient-to-t from-blue-300/40 to-transparent transform -rotate-45"></div>
        <div className="absolute top-40 left-20 w-px h-28 bg-gradient-to-b from-purple-300/30 to-transparent transform rotate-12"></div>
        <div className="absolute bottom-20 right-32 w-px h-20 bg-gradient-to-t from-cyan-300/35 to-transparent transform -rotate-12"></div>
        
        {/* Organic texture patterns */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            radial-gradient(ellipse at top left, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(255,255,255,0.05) 0%, transparent 50%)
          `
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Content - spans 3 columns */}
          <div className="lg:col-span-3 text-white">
            <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-200 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-yellow-400/30 backdrop-blur-sm">
              ✨ Trusted by 500+ Businesses Across India
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
              Your Trusted Partner in{' '}
              <span className="block bg-gradient-to-r from-yellow-300 via-yellow-200 to-orange-300 bg-clip-text text-transparent relative">
                Business Finance
                <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-yellow-400/60 via-yellow-300/40 to-orange-400/60 rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed max-w-2xl font-light">
              Streamline your loan applications with India's most advanced financial advisory platform. 
              <span className="text-yellow-200 font-medium"> Empowering businesses across Kolkata and beyond.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Link href="/loan-application">
                <Button size="lg" className="group bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 text-slate-900 hover:from-yellow-300 hover:via-yellow-400 hover:to-orange-300 text-lg px-10 py-5 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300 font-semibold rounded-xl">
                  <Rocket className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform" />
                  Start Your Application
                </Button>
              </Link>
              <Link href="/consultation">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900 text-lg px-10 py-5 shadow-xl hover:shadow-white/25 transform hover:-translate-y-1 transition-all duration-300 font-semibold rounded-xl"
                >
                  <Calendar className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Free Consultation
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
              <div className="text-center bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-6 backdrop-blur-md border border-white/20 hover:border-yellow-400/50 transition-all duration-300 group">
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">₹500+ Cr</div>
                <div className="text-gray-300 text-sm font-medium mt-1">Loans Facilitated</div>
              </div>
              <div className="text-center bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-6 backdrop-blur-md border border-white/20 hover:border-blue-400/50 transition-all duration-300 group">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">500+</div>
                <div className="text-gray-300 text-sm font-medium mt-1">Happy Clients</div>
              </div>
              <div className="text-center bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-6 backdrop-blur-md border border-white/20 hover:border-purple-400/50 transition-all duration-300 group">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">20+</div>
                <div className="text-gray-300 text-sm font-medium mt-1">Bank Partners</div>
              </div>
              <div className="text-center bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-6 backdrop-blur-md border border-white/20 hover:border-green-400/50 transition-all duration-300 group">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-300 to-teal-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">98%</div>
                <div className="text-gray-300 text-sm font-medium mt-1">Approval Rate</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Enhanced Features Card - spans 2 columns */}
          <div className="lg:col-span-2 relative">
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-white/10 transition-all duration-500">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl mb-6 shadow-xl">
                  <svg className="w-10 h-10 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Why Choose KFS?</h3>
                <p className="text-gray-300 text-lg">Excellence in financial services</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-5 p-5 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-yellow-400/30 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-6 h-6 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2 text-lg">Expert Advisory</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">Personalized financial guidance from industry experts with 20+ years experience</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 p-5 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-blue-400/30 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-6 h-6 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2 text-lg">Quick Approval</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">Fast processing with minimal documentation and same-day approvals</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 p-5 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-6 h-6 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2 text-lg">Competitive Rates</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">Best-in-market interest rates and flexible repayment terms</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-70 animate-float blur-sm"></div>
            <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-50 animate-float-delay blur-sm"></div>
            <div className="absolute top-1/2 -right-3 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-60 animate-ping"></div>
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
