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
    <section className="relative min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9FAFB' }}>
      {/* Professional abstract background with geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base background */}
        <div className="absolute inset-0" style={{ backgroundColor: '#F9FAFB' }}></div>
        
        {/* Soft geometric shapes using KFS logo colors */}
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-8" style={{ 
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.03) 100%)',
          filter: 'blur(60px)'
        }}></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 rounded-full opacity-6" style={{ 
          background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.06) 0%, rgba(29, 78, 216, 0.02) 100%)',
          filter: 'blur(50px)'
        }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full opacity-4" style={{ 
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.04) 0%, rgba(59, 130, 246, 0.01) 100%)',
          filter: 'blur(40px)'
        }}></div>
        
        {/* Subtle geometric overlay pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.02'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='17' cy='17' r='1'/%3E%3Ccircle cx='37' cy='17' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='17' cy='37' r='1'/%3E%3Ccircle cx='37' cy='37' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Pre-Header: Trust Signal */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Check className="w-4 h-4 text-green-600" />
                <span>Trusted by 500+ Businesses Across India</span>
              </div>
            </div>
            
            {/* Main headline - Visual hierarchy priority #1 */}
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-8 tracking-tight">
              Get Your Business Financed Today
            </h1>
            
            {/* Supporting text */}
            <p className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-normal">
              From property loans to working capital, we connect you with the right financial solutions. 
              <span className="text-slate-900 font-medium"> Fast approvals, competitive rates, expert guidance.</span>
            </p>
            
            {/* Two-Button CTA Structure */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                onClick={handleStartApplication}
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start Your Application
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-10 py-4 text-lg font-semibold rounded-xl transition-all"
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