import { HelmetProvider } from "react-helmet-async";
import SEOHead from "@/components/seo-head";
import StickyHeader from "@/components/sticky-header";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function BangalorePage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Kothari Financial Services - Bangalore",
    "description": "Leading business loan advisor in Bangalore for startups, IT companies, and MSMEs. Quick approval for working capital and property loans",
    "url": "https://kotharifinancialservices.com/locations/bangalore",
    "telephone": "+91-70190-56576",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "MG Road",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "12.9716",
      "longitude": "77.5946"
    },
    "openingHours": "Mo-Sa 09:00-18:00",
    "areaServed": {
      "@type": "City",
      "name": "Bangalore"
    },
    "priceRange": "₹₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "520"
    }
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#0a0b1e]">
        <SEOHead
          title="Business Loans in Bangalore | Startup Finance & IT Company Loans - Kothari Financial Services"
          description="Get business loans in Bangalore with instant approval. Best loan consultant for startups, IT companies, MSMEs. Serving Whitefield, Koramangala, Electronic City, Indiranagar."
          keywords="business loan Bangalore, startup loan Bangalore, IT company loan Bangalore, MSME loan Bangalore, working capital Bangalore, property loan Bangalore, loan consultant Bangalore"
          canonical="https://kotharifinancialservices.com/locations/bangalore"
          structuredData={localBusinessSchema}
        />
        
        <StickyHeader />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Business Loans in Bangalore
                </span>
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Fueling Bangalore's innovation ecosystem with smart finance. Specialized loans for startups and tech companies.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-purple-400">₹600 Cr+</div>
                <div className="text-white/60 mt-2">Funded in Bangalore</div>
              </div>
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-cyan-400">800+</div>
                <div className="text-white/60 mt-2">Startups Funded</div>
              </div>
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-orange-400">48 Hrs</div>
                <div className="text-white/60 mt-2">Quick Disbursal</div>
              </div>
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-pink-400">10%</div>
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
                Serving All Tech Hubs in Bangalore
              </span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Whitefield", "Electronic City", "Koramangala", "Indiranagar",
                "HSR Layout", "BTM Layout", "Marathahalli", "Bellandur",
                "JP Nagar", "Jayanagar", "Malleshwaram", "Rajajinagar",
                "Yelahanka", "Hebbal", "Sarjapur Road", "Bannerghatta Road"
              ].map((area) => (
                <div key={area} className="bg-white/[0.02] backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-all">
                  <MapPin className="w-4 h-4 text-purple-400 inline mr-2" />
                  <span className="text-white/80">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bangalore-Specific Services */}
        <section className="py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e]">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Specialized Finance for Bangalore's Tech Economy
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Startup Finance */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Startup & SaaS Finance</h3>
                <p className="text-white/60 mb-4">
                  Revenue-based financing for SaaS companies and tech startups in Bangalore's ecosystem.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>• Unsecured loans up to ₹3 Cr</li>
                  <li>• Revenue-based financing</li>
                  <li>• No equity dilution</li>
                </ul>
              </div>

              {/* IT Services Loans */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">IT Services Company Loans</h3>
                <p className="text-white/60 mb-4">
                  Working capital for IT services companies in tech parks and SEZs.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>• Invoice discounting</li>
                  <li>• Export credit facility</li>
                  <li>• Office expansion loans</li>
                </ul>
              </div>

              {/* E-commerce Finance */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-orange-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">E-commerce & D2C Finance</h3>
                <p className="text-white/60 mb-4">
                  Inventory and marketing finance for e-commerce and D2C brands.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>• Inventory financing</li>
                  <li>• Marketing capital</li>
                  <li>• Marketplace lending</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Bangalore Businesses Choose Us */}
        <section className="py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428]">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Why Bangalore's Tech Companies Choose KFS
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Startup-Friendly Terms</h3>
                  <p className="text-white/60">
                    Flexible repayment, moratorium periods, and milestone-based disbursements for startups.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">💡</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Tech Industry Expertise</h3>
                  <p className="text-white/60">
                    Deep understanding of SaaS metrics, burn rates, and tech business models.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🌐</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Global Banking Partners</h3>
                  <p className="text-white/60">
                    International banks for forex services and overseas expansion funding.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Fast Digital Process</h3>
                  <p className="text-white/60">
                    API-based verification, instant credit decisions, and paperless documentation.
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
                Scale Your Bangalore Business Today
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join 800+ startups and tech companies growing with our financial backing
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
            <h3 className="text-2xl font-bold text-white mb-6">Visit Our Bangalore Office</h3>
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <MapPin className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-white/60">MG Road</p>
                  <p className="text-white/80">Bangalore - 560001</p>
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