import { Button } from "@/components/ui/button";
import { Home, Briefcase, CreditCard, Check } from "lucide-react";
import { Link } from "wouter";

export default function ServicesSection() {
  const services = [
    {
      icon: Home,
      title: "Loan Against Property",
      description: "Unlock the value of your property with competitive rates starting from 8.5% per annum.",
      features: ["Up to ₹5 Crores", "Flexible tenure", "Minimal documentation"],
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: Briefcase,
      title: "Unsecured Business Loan",
      description: "Quick financing for your business needs without collateral requirements.",
      features: ["Up to ₹75 Lakhs", "Quick approval", "No collateral"],
      iconBg: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: CreditCard,
      title: "Cash Credit",
      description: "Working capital solution with flexible repayment options for smooth operations.",
      features: ["Revolving credit", "Pay only for usage", "Instant access"],
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <section id="services" className="py-12 md:py-24 bg-gradient-to-b from-[#0a0b1e] to-[#141428] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Core Services
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Comprehensive financial solutions designed to fuel your business growth and success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 hover:border-purple-500/30 transition-all group">
              <div className={`w-16 h-16 bg-gradient-to-br ${
                index === 0 ? 'from-blue-500 to-cyan-500' :
                index === 1 ? 'from-green-500 to-emerald-500' :
                'from-purple-500 to-pink-500'
              } rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
              <ul className="text-gray-400 mb-8 space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="text-green-400 w-5 h-5 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/loan-application">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-medium">
                  Apply Now
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
