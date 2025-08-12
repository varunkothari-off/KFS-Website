import { HelmetProvider } from "react-helmet-async";
import SEOHead from "@/components/seo-head";
import StickyHeader from "@/components/sticky-header";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function MumbaiPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Kothari Financial Services - Mumbai",
    "description": "Leading business loan consultant in Mumbai offering property loans, working capital, and MSME loans with quick approval",
    "url": "https://kotharifinancialservices.com/locations/mumbai",
    "telephone": "+91-70190-56576",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nariman Point",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400021",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.9255",
      "longitude": "72.8242"
    },
    "openingHours": "Mo-Sa 09:00-18:00",
    "areaServed": {
      "@type": "City",
      "name": "Mumbai"
    },
    "priceRange": "₹₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "450"
    }
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#0a0b1e]">
        <SEOHead
          title="Business Loans in Mumbai | Property Loans & MSME Finance - Kothari Financial Services"
          description="Get business loans in Mumbai with 24-hour approval. Top loan consultant for property loans, working capital, MSME loans. Serving Andheri, Bandra, BKC, Lower Parel. Lowest rates."
          keywords="business loan Mumbai, property loan Mumbai, MSME loan Mumbai, loan consultant Mumbai, working capital Mumbai, business finance Mumbai, loan against property Mumbai"
          canonical="https://kotharifinancialservices.com/locations/mumbai"
          structuredData={localBusinessSchema}
        />
        
        <StickyHeader />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Business Loans in Mumbai
                </span>
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Your trusted financial partner in Mumbai's commercial capital. Get instant business loans up to ₹50 Cr with lowest interest rates.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-purple-400">₹500 Cr+</div>
                <div className="text-white/60 mt-2">Loans in Mumbai</div>
              </div>
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-cyan-400">1500+</div>
                <div className="text-white/60 mt-2">Mumbai Businesses</div>
              </div>
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-orange-400">24 Hrs</div>
                <div className="text-white/60 mt-2">Quick Approval</div>
              </div>
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-pink-400">10.5%</div>
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
                Serving All Areas in Mumbai
              </span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Andheri", "Bandra", "BKC", "Lower Parel",
                "Worli", "Fort", "Nariman Point", "Goregaon",
                "Malad", "Kandivali", "Borivali", "Powai",
                "Kurla", "Ghatkopar", "Mulund", "Thane"
              ].map((area) => (
                <div key={area} className="bg-white/[0.02] backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-all">
                  <MapPin className="w-4 h-4 text-purple-400 inline mr-2" />
                  <span className="text-white/80">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mumbai-Specific Services */}
        <section className="py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e]">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Specialized Loans for Mumbai Businesses
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Retail Business Loans */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Retail & Trading Loans</h3>
                <p className="text-white/60 mb-4">
                  Special financing for Mumbai's retail businesses in Crawford Market, Linking Road, and major shopping districts.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>• Stock financing up to ₹5 Cr</li>
                  <li>• Shop purchase loans</li>
                  <li>• Working capital for traders</li>
                </ul>
              </div>

              {/* Real Estate Developer Loans */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Real Estate Developer Finance</h3>
                <p className="text-white/60 mb-4">
                  Construction finance and project loans for Mumbai's booming real estate sector.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>• Project finance up to ₹50 Cr</li>
                  <li>• Land purchase funding</li>
                  <li>• Construction finance</li>
                </ul>
              </div>

              {/* Import Export Finance */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-orange-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">Import-Export Finance</h3>
                <p className="text-white/60 mb-4">
                  Trade finance solutions for Mumbai port businesses and international traders.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>• LC backed loans</li>
                  <li>• Export credit</li>
                  <li>• Bill discounting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Mumbai Businesses Choose Us */}
        <section className="py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428]">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Why Mumbai Businesses Choose KFS
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🏢</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Local Market Understanding</h3>
                  <p className="text-white/60">
                    Deep knowledge of Mumbai's business ecosystem from Dharavi's small industries to BKC's corporate giants.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🏦</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">All Major Banks</h3>
                  <p className="text-white/60">
                    Partnerships with HDFC, ICICI, Axis, SBI, and 30+ banks with Mumbai branches.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Same Day Processing</h3>
                  <p className="text-white/60">
                    Quick documentation and approval process designed for Mumbai's fast-paced business environment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📍</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Doorstep Service</h3>
                  <p className="text-white/60">
                    Our executives visit your office anywhere in Mumbai & MMR region for document collection.
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
                Get Your Business Loan in Mumbai Today
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join 1500+ Mumbai businesses who have grown with our financial support
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
            <h3 className="text-2xl font-bold text-white mb-6">Visit Our Mumbai Office</h3>
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <MapPin className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-white/60">Nariman Point</p>
                  <p className="text-white/80">Mumbai - 400021</p>
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