import StickyHeader from "@/components/sticky-header";
import HeroSection from "@/components/hero-section";
import AnimatedStatsSection from "@/components/animated-stats-section";
import PartnerBanksSection from "@/components/partner-banks-section";
import TrustBuildingSection from "@/components/trust-building-section";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/testimonials-section";
import EMICalculator from "@/components/emi-calculator";
import BlogPreview from "@/components/blog-preview";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import LoanQuestionnaire from "@/components/loan-questionnaire";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StickyHeader />
      <HeroSection />
      <AnimatedStatsSection />
      <PartnerBanksSection />
      <TrustBuildingSection />
      <LoanQuestionnaire />
      <TestimonialsSection />
      <ServicesSection />
      <EMICalculator />
      <BlogPreview />
      <FloatingWhatsApp />
      
      {/* Footer */}
      <footer className="bg-kfs-dark text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-kfs-primary to-kfs-secondary rounded" />
                <span className="text-xl font-bold">Kothari Financial Services</span>
              </div>
              <p className="text-gray-300 mb-6">
                Your trusted partner in business finance, helping entrepreneurs achieve their growth aspirations with expert guidance and competitive loan solutions.
              </p>
              
              {/* Security Badges */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">🛡️</span>
                  <span className="text-sm">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">🔒</span>
                  <span className="text-sm">Data Privacy Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">📜</span>
                  <span className="text-sm">ISO 27001 Certified</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="/loan-application" className="text-gray-300 hover:text-white transition-colors">Apply Now</a></li>
                <li><a href="/consultation" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Our Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Loan Against Property</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Unsecured Business Loan</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cash Credit</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Working Capital</a></li>
                <li><a href="/consultation" className="text-gray-300 hover:text-white transition-colors">Financial Consultation</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-kfs-accent mt-1">📍</span>
                  <span className="text-gray-300">123 Business District, Kolkata, West Bengal 700001</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-kfs-accent">📞</span>
                  <span className="text-gray-300">+91 70190 56576</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-kfs-accent">📧</span>
                  <span className="text-gray-300">connect@kotharifinancialservices.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">💬</span>
                  <span className="text-gray-300">WhatsApp: +91 70190 56576</span>
                </div>
                
                {/* Social Media Links */}
                <div className="flex items-center space-x-4 mt-6">
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                    <span className="text-xl">💼</span> LinkedIn
                  </a>
                  <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                    <span className="text-xl">🔍</span> Google My Business
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-300">
                &copy; 2025 Kothari Financial Services. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
