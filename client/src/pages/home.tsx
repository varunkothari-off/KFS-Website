import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import SEOHead from "@/components/seo-head";
import StickyHeader from "@/components/sticky-header";
import HeroSection from "@/components/hero-section";
import FloatingFeatures from "@/components/floating-features";
import AnimatedStatsSection from "@/components/animated-stats-section";
import ModernFeaturesSection from "@/components/modern-features-section";
import TrustBuildingSection from "@/components/trust-building-section";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/testimonials-section";
import EMICalculator from "@/components/emi-calculator";
import FAQSection from "@/components/faq-section";
import BlogPreview from "@/components/blog-preview";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import LoanQuestionnaire from "@/components/loan-questionnaire";
import PageLoader from "@/components/page-loader";
import FloatingParticles from "@/components/floating-particles";
import TrustBadges from "@/components/trust-badges";
import LoanCalculator from "@/components/loan-calculator";
import LiveChatWidget from "@/components/live-chat-widget";
import QuickStatusCheck from "@/components/quick-status-check";
import LoanComparisonTool from "@/components/loan-comparison-tool";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay showing content to allow loader animation
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#0a0b1e] relative overflow-hidden">
        <SEOHead 
          title="Business Loans & Financial Advisory | Get Loans in 24 Hours - Kothari Financial Services"
          description="Apply for business loans up to ₹50 Cr with 24-hour approval. Kothari Financial Services offers property loans, cash credit, working capital at lowest interest rates. 30+ years expertise, 30+ partner banks."
          keywords="business loan, property loan, cash credit, working capital loan, term loan, loan against property, business finance, MSME loan, SME loan, loan consultant India, financial advisor, lowest interest rates, quick loan approval, Kothari Financial Services"
          canonical="https://kotharifinancialservices.com/"
        />
        <PageLoader />
        <FloatingParticles />
      
      {showContent && (
        <div className="relative z-10">
          <StickyHeader />
          
          {/* Hero Section with reduced bottom padding */}
          <div className="relative">
            <HeroSection />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#0a0b1e]" />
          </div>
          
          {/* Trust Badges */}
          <TrustBadges />
          
          {/* Floating Features - Why Choose KFS */}
          <div className="relative">
            <FloatingFeatures />
          </div>
          
          {/* Features Section with clear demarcation */}
          <div className="relative border-t border-white/5">
            <ModernFeaturesSection />
          </div>
          
          {/* Stats Section with visual separator */}
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <AnimatedStatsSection />
          </div>
          
          {/* Trust Building Section */}
          <div className="relative border-t border-white/5">
            <TrustBuildingSection />
          </div>
          
          {/* Loan Questionnaire with spacing */}
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
            <LoanQuestionnaire />
          </div>
          
          {/* Testimonials Section */}
          <div className="relative border-t border-white/5">
            <TestimonialsSection />
          </div>
          
          {/* Services Section */}
          <div className="relative">
            <ServicesSection />
          </div>
          
          {/* Loan Comparison Tool */}
          <div className="relative border-t border-white/5">
            <LoanComparisonTool />
          </div>
          
          {/* Loan Calculator with visual break */}
          <div className="relative border-t border-white/5">
            <LoanCalculator />
          </div>
          
          {/* Quick Status Check */}
          <div className="relative">
            <QuickStatusCheck />
          </div>
          
          {/* FAQ Section */}
          <div className="relative border-t border-white/5">
            <FAQSection />
          </div>
          
          {/* Blog Preview */}
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <BlogPreview />
          </div>
          
          <FloatingWhatsApp />
          <LiveChatWidget />
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#0a0b1e] via-[#141428] to-[#0a0b1e] text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded" />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Kothari Financial Services</span>
              </div>
              <p className="text-gray-400 mb-6">
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
              <h3 className="text-lg font-semibold mb-6 text-purple-400">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-400 hover:text-purple-400 transition-colors">Home</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">Services</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors">About Us</a></li>
                <li><a href="#blog" className="text-gray-400 hover:text-purple-400 transition-colors">Blog</a></li>
                <li><a href="/loan-application" className="text-gray-400 hover:text-purple-400 transition-colors">Apply Now</a></li>
                <li><a href="/consultation" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-purple-400">Our Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Loan Against Property</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Unsecured Business Loan</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Cash Credit</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Working Capital</a></li>
                <li><a href="/consultation" className="text-gray-400 hover:text-purple-400 transition-colors">Financial Consultation</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-purple-400">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-purple-400 mt-1">📍</span>
                  <span className="text-gray-400">14/1 Sir Hariram Goenka Street, Kolkata - 700007</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-400">📞</span>
                  <span className="text-gray-400">+91 70190 56576</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-400">📧</span>
                  <span className="text-gray-400">connect@kotharifinancialservices.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">💬</span>
                  <span className="text-gray-400">WhatsApp: +91 70190 56576</span>
                </div>
                
                {/* Social Media Links */}
                <div className="flex items-center space-x-4 mt-6">
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <span className="text-xl">💼</span> LinkedIn
                  </a>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <span className="text-xl">🔍</span> Google My Business
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400">
                &copy; 2025 Kothari Financial Services. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="/privacy-policy" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a>
                <a href="/terms-of-service" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </HelmetProvider>
  );
}
