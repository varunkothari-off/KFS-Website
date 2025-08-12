import { HelmetProvider } from "react-helmet-async";
import SEOHead from "@/components/seo-head";
import StickyHeader from "@/components/sticky-header";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function DelhiPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Kothari Financial Services - Delhi NCR",
    "description": "Top business loan consultant in Delhi NCR offering MSME loans, property finance, and working capital with instant approval",
    "url": "https://kotharifinancialservices.com/locations/delhi",
    "telephone": "+91-70190-56576",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Connaught Place",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.6139",
      "longitude": "77.2090"
    },
    "openingHours": "Mo-Sa 09:00-18:00",
    "areaServed": {
      "@type": "City",
      "name": "Delhi NCR"
    },
    "priceRange": "₹₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "380"
    }
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#0a0b1e]">
        <SEOHead
          title="Business Loans in Delhi NCR | MSME Loans & Working Capital - Kothari Financial Services"
          description="Get business loans in Delhi NCR with same-day approval. Leading loan consultant for MSME finance, property loans, cash credit. Serving CP, Nehru Place, Karol Bagh, Gurgaon, Noida."
          keywords="business loan Delhi, MSME loan Delhi, property loan Delhi NCR, loan consultant Delhi, working capital Delhi, business finance Delhi, loan against property Delhi"
          canonical="https://kotharifinancialservices.com/locations/delhi"
          structuredData={localBusinessSchema}
        />
        
        <StickyHeader />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Business Loans in Delhi NCR
                </span>
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Empowering Delhi's businesses with quick finance solutions. Get MSME loans up to ₹50 Cr with competitive rates.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-purple-400">₹400 Cr+</div>
                <div className="text-white/60 mt-2">Loans in Delhi NCR</div>
              </div>
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-cyan-400">1200+</div>
                <div className="text-white/60 mt-2">Delhi Businesses</div>
              </div>
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-orange-400">Same Day</div>
                <div className="text-white/60 mt-2">Approval</div>
              </div>
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-pink-400">11%</div>
                <div className="text-white/60 mt-2">Starting Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas We Serve */}
        <section className="py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428]">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Serving All Areas in Delhi NCR
              </span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Connaught Place", "Nehru Place", "Karol Bagh", "Lajpat Nagar",
                "Saket", "Janakpuri", "Rajouri Garden", "Pitampura",
                "Rohini", "Dwarka", "Gurgaon", "Noida",
                "Faridabad", "Ghaziabad", "Greater Noida", "Manesar"
              ].map((area) => (
                <div key={area} className="bg-white/[0.02] backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-all">
                  <MapPin className="w-4 h-4 text-purple-400 inline mr-2" />
                  <span className="text-white/80">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delhi-Specific Services */}
        <section className="py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e]">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Specialized Loans for Delhi NCR Businesses
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Manufacturing MSME Loans */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Manufacturing MSME Loans</h3>
                <p className="text-white/60 mb-4">
                  Special schemes for manufacturing units in Okhla, Mayapuri, Bawana industrial areas.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>• Machinery finance up to ₹10 Cr</li>
                  <li>• Working capital loans</li>
                  <li>• CGTMSE coverage available</li>
                </ul>
              </div>

              {/* IT & Startup Loans */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">IT & Startup Finance</h3>
                <p className="text-white/60 mb-4">
                  Tailored solutions for tech companies in Gurgaon, Noida, and Nehru Place.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>• Unsecured loans up to ₹2 Cr</li>
                  <li>• Revenue-based financing</li>
                  <li>• Startup India benefits</li>
                </ul>
              </div>

              {/* Wholesale & Trading */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-orange-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Wholesale Trading Finance</h3>
                <p className="text-white/60 mb-4">
                  Cash credit for wholesale markets - Sadar Bazaar, Chandni Chowk, Azadpur Mandi.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>• Cash credit up to ₹5 Cr</li>
                  <li>• Inventory funding</li>
                  <li>• Bill discounting facility</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Delhi Businesses Choose Us */}
        <section className="py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428]">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Why Delhi NCR Businesses Trust KFS
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🏛️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Government Scheme Experts</h3>
                  <p className="text-white/60">
                    Specialized in MUDRA, Stand-Up India, PMEGP, and other government schemes for Delhi businesses.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🤝</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">NCR-Wide Network</h3>
                  <p className="text-white/60">
                    Strong presence across Delhi, Gurgaon, Noida, Faridabad with all major banks and NBFCs.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📱</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Digital Documentation</h3>
                  <p className="text-white/60">
                    Complete online process with e-sign, digital KYC, and paperless approval.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🏢</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Industry Expertise</h3>
                  <p className="text-white/60">
                    Deep understanding of Delhi's diverse industries from manufacturing to services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e]">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Get Your Business Loan in Delhi NCR Today
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join 1200+ Delhi NCR businesses growing with our financial support
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/loan-application">
                <a className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:scale-105 transition-transform inline-flex items-center">
                  Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Link>
              <a
                href="tel:+917019056576"
                className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-colors inline-flex items-center"
              >
                <Phone className="mr-2 w-5 h-5" /> Call Now: +91 70190 56576
              </a>
            </div>
            
            <div className="mt-8 inline-flex items-center text-white/60">
              <Clock className="w-5 h-5 mr-2" />
              <span>Office Hours: Monday - Saturday, 9:00 AM - 6:00 PM</span>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 bg-[#0a0b1e] border-t border-white/10">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Visit Our Delhi Office</h3>
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <MapPin className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-white/60">Connaught Place</p>
                  <p className="text-white/80">New Delhi - 110001</p>
                </div>
                <div>
                  <Phone className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <p className="text-white/60">Call Us</p>
                  <p className="text-white/80">+91 70190 56576</p>
                </div>
                <div>
                  <Clock className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <p className="text-white/60">Working Hours</p>
                  <p className="text-white/80">Mon-Sat: 9AM-6PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </HelmetProvider>
  );
}