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
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-kfs-primary via-kfs-secondary to-kfs-accent flex items-center">
      {/* Hero background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Trusted Partner in{' '}
            <span className="text-yellow-300">Business Finance</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl">
            Streamline your loan applications with India's most advanced financial advisory platform. 
            Trusted by 500+ businesses across Kolkata and beyond.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/loan-application">
              <Button size="lg" className="bg-white text-kfs-primary hover:bg-gray-100 text-lg px-8 py-4">
                <Rocket className="w-5 h-5 mr-2" />
                Start Your Application
              </Button>
            </Link>
            <Link href="/consultation">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-kfs-primary text-lg px-8 py-4"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold">₹500+ Cr</div>
              <div className="text-blue-200">Loans Facilitated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-blue-200">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">20+</div>
              <div className="text-blue-200">Bank Partners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-blue-200">Approval Rate</div>
            </div>
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
