import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./logo";

export default function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Loan Application', href: '/loan-application' },
    { name: 'Consultation', href: '/consultation' },
    { name: 'Status Check', href: '/application-status' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 translate-y-0 opacity-100' 
        : 'bg-transparent -translate-y-full opacity-0'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Logo className="w-10 h-10" />
            <div className="flex flex-col">
              <span className={`font-bold text-lg leading-tight ${
                isScrolled ? 'text-kfs-dark' : 'text-white'
              }`}>
                KFS
              </span>
              <span className={`text-xs ${
                isScrolled ? 'text-gray-600' : 'text-blue-200'
              }`}>
                Financial Services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={`font-medium transition-colors ${
                  location === item.href
                    ? (isScrolled ? 'text-kfs-primary' : 'text-yellow-300')
                    : (isScrolled ? 'text-gray-700 hover:text-kfs-primary' : 'text-white hover:text-yellow-300')
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-4 text-sm">
              <a 
                href="tel:+919876543210" 
                className={`flex items-center space-x-1 ${
                  isScrolled ? 'text-gray-600 hover:text-kfs-primary' : 'text-blue-200 hover:text-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </a>
              <a 
                href="mailto:info@kfs.com" 
                className={`flex items-center space-x-1 ${
                  isScrolled ? 'text-gray-600 hover:text-kfs-primary' : 'text-blue-200 hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>info@kfs.com</span>
              </a>
            </div>
            <Link href="/loan-application">
              <Button 
                size="sm" 
                className={isScrolled 
                  ? "bg-kfs-primary hover:bg-kfs-secondary text-white"
                  : "bg-yellow-400 hover:bg-yellow-300 text-kfs-dark"
                }
              >
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? 'text-gray-700 hover:text-kfs-primary' : 'text-white hover:text-yellow-300'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t ${
            isScrolled ? 'bg-white border-gray-200' : 'bg-kfs-primary/90 backdrop-blur-md border-white/20'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span 
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location === item.href
                        ? (isScrolled ? 'bg-kfs-primary text-white' : 'bg-white/20 text-yellow-300')
                        : (isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10')
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              
              {/* Mobile Contact */}
              <div className="px-3 py-2 space-y-2 border-t border-gray-200/20 mt-2">
                <a 
                  href="tel:+919876543210" 
                  className={`flex items-center space-x-2 text-sm ${
                    isScrolled ? 'text-gray-600' : 'text-blue-200'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </a>
                <a 
                  href="mailto:info@kfs.com" 
                  className={`flex items-center space-x-2 text-sm ${
                    isScrolled ? 'text-gray-600' : 'text-blue-200'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>info@kfs.com</span>
                </a>
                <Link href="/loan-application">
                  <Button 
                    className={`w-full mt-2 ${
                      isScrolled 
                        ? "bg-kfs-primary hover:bg-kfs-secondary text-white"
                        : "bg-yellow-400 hover:bg-yellow-300 text-kfs-dark"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Apply for Loan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}