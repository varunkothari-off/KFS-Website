import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Logo />
            <span className="text-xl font-bold text-kfs-dark">Kothari Financial Services</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-kfs-dark hover:text-kfs-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-kfs-dark hover:text-kfs-primary transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-kfs-dark hover:text-kfs-primary transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('blog')} 
              className="text-kfs-dark hover:text-kfs-primary transition-colors"
            >
              Blog
            </button>
            <Link href="/loan-application">
              <Button className="bg-kfs-primary text-white hover:bg-kfs-secondary">
                Get Financed
              </Button>
            </Link>
          </nav>
          
          <button className="md:hidden text-kfs-dark">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
