import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Clean, minimal background with subtle texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50"></div>
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.02'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='17' cy='17' r='1'/%3E%3Ccircle cx='37' cy='17' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='17' cy='37' r='1'/%3E%3Ccircle cx='37' cy='37' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `
        }}></div>
        
        {/* Gentle gradient accents */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Trust badge */}
            <div className="inline-flex items-center bg-blue-50 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-blue-200">
              ✓ Trusted by 500+ Businesses Across India
            </div>
            
            {/* Main headline - Visual hierarchy priority #1 */}
            <h1 className="text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-8 tracking-tight">
              Get Your Business{' '}
              <span className="block text-blue-600 relative">
                Financed Today
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-blue-600 rounded-full"></div>
              </span>
            </h1>
            
            {/* Supporting text */}
            <p className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-normal">
              From property loans to working capital, we connect you with the right financial solutions. 
              <span className="text-slate-900 font-medium"> Fast approvals, competitive rates, expert guidance.</span>
            </p>
            
            {/* Primary CTA - Highest contrast on the page */}
            <div className="mb-16">
              <Button 
                onClick={handleStartApplication}
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-12 py-6 rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                Get Financed
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Trust indicators - Clean, aligned grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">₹500+ Cr</div>
                <div className="text-slate-600 text-sm">Loans Facilitated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">500+</div>
                <div className="text-slate-600 text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">20+</div>
                <div className="text-slate-600 text-sm">Bank Partners</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">98%</div>
                <div className="text-slate-600 text-sm">Approval Rate</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToServices}
            className="inline-flex flex-col items-center text-slate-500 hover:text-slate-700 transition-colors group"
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