import { HelmetProvider } from "react-helmet-async";
import SEOHead from "@/components/seo-head";
import StickyHeader from "@/components/sticky-header";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function KolkataPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Kothari Financial Services - Kolkata Headquarters",
    "description": "Premier business loan consultant in Kolkata. Specialized in MSME loans, working capital, and property finance for Eastern India businesses",
    "url": "https://kotharifinancialservices.com/locations/kolkata",
    "telephone": "+91-70190-56576",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "14/1 Sir Hariram Goenka Street",
      "addressLocality": "Kolkata",
      "addressRegion": "West Bengal",
      "postalCode": "700007",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.5726",
      "longitude": "88.3639"
    },
    "openingHours": "Mo-Sa 09:00-18:00",
    "areaServed": {
      "@type": "City",
      "name": "Kolkata"
    },
    "priceRange": "₹₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "650"
    }
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#0a0b1e]">
        <SEOHead
          title="Business Loans in Kolkata | MSME Finance & Working Capital - Kothari Financial Services HQ"
          description="Get business loans in Kolkata from KFS headquarters. 30+ years serving Bengal businesses. MSME loans, property finance, cash credit. Park Street, Salt Lake, Burrabazar coverage."
          keywords="business loan Kolkata, MSME loan Kolkata, property loan Kolkata, working capital Kolkata, loan consultant Kolkata, business finance Kolkata, cash credit Kolkata"
          canonical="https://kotharifinancialservices.com/locations/kolkata"
          structuredData={localBusinessSchema}
        />
        
        <StickyHeader />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Business Loans in Kolkata
                </span>
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Headquarters of Kothari Financial Services - Empowering Bengal's businesses since 1994 with trusted financial solutions.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-purple-400">₹1000 Cr+</div>
                <div className="text-white/60 mt-2">Loans in Bengal</div>
              </div>
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-cyan-400">2000+</div>
                <div className="text-white/60 mt-2">Bengal Businesses</div>
              </div>
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-orange-400">30+ Years</div>
                <div className="text-white/60 mt-2">Local Expertise</div>
              </div>
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-pink-400">9.5%</div>
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
                Serving All Areas in Kolkata & Suburbs
              </span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Park Street", "Salt Lake", "New Town", "Burrabazar",
                "Esplanade", "Ballygunge", "Gariahat", "Bhowanipore",
                "Alipore", "Jadavpur", "Tollygunge", "Dum Dum",
                "Howrah", "Sealdah", "Rajarhat", "Kasba"
              ].map((area) => (
                <div key={area} className="bg-white/[0.02] backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-all">
                  <MapPin className="w-4 h-4 text-purple-400 inline mr-2" />
                  <span className="text-white/80">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kolkata-Specific Services */}
        <section className="py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e]">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Specialized Finance for Kolkata's Traditional & Modern Businesses
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Trading & Wholesale */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Trading & Wholesale Finance</h3>
                <p className="text-white/60 mb-4">
                  Specialized loans for Burrabazar traders, wholesale markets, and commodity businesses.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>• Cash credit up to ₹10 Cr</li>
                  <li>• Stock hypothecation loans</li>
                  <li>• Trade finance solutions</li>
                </ul>
              </div>

              {/* Manufacturing MSME */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Manufacturing MSME Loans</h3>
                <p className="text-white/60 mb-4">
                  Support for jute mills, textile units, and small manufacturers across Bengal.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>• Term loans up to ₹25 Cr</li>
                  <li>• Machinery finance</li>
                  <li>• WBSIDC scheme benefits</li>
                </ul>
              </div>

              {/* Service Sector */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-orange-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Service Sector Finance</h3>
                <p className="text-white/60 mb-4">
                  Loans for healthcare, education, hospitality, and IT services in Kolkata.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>• Unsecured loans up to ₹2 Cr</li>
                  <li>• Equipment finance</li>
                  <li>• Expansion capital</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Kolkata Businesses Choose Us */}
        <section className="py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428]">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Why Kolkata Businesses Trust KFS Since 1994
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🏛️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Local Heritage & Trust</h3>
                  <p className="text-white/60">
                    Three generations of Bengal businesses have grown with our financial guidance and support.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🤝</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Bengal Banking Network</h3>
                  <p className="text-white/60">
                    Strong relationships with UCO Bank, United Bank, Allahabad Bank, and all major banks.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📜</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">State Scheme Experts</h3>
                  <p className="text-white/60">
                    Specialized in West Bengal government schemes, WBSIDC loans, and state subsidies.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🌟</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Personal Touch</h3>
                  <p className="text-white/60">
                    Bengali-speaking experts who understand local business culture and requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Note - Headquarters */}
        <section className="py-12 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-y border-white/10">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                🏢 Our Headquarters - Your Financial Partner
              </h3>
              <p className="text-white/70 mb-4">
                Visit our main office in Kolkata for personalized consultation with our senior management team.
                Direct access to decision makers ensures faster loan approvals and better terms.
              </p>
              <p className="text-purple-400 font-semibold">
                Walk-ins welcome at our Sir Hariram Goenka Street office
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e]">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Get Your Business Loan in Kolkata Today
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join 2000+ Bengal businesses thriving with our financial partnership
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
            <h3 className="text-2xl font-bold text-white mb-6">Visit Our Kolkata Headquarters</h3>
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <MapPin className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-white/60">14/1 Sir Hariram Goenka Street</p>
                  <p className="text-white/80">Kolkata - 700007</p>
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