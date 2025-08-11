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
    <section id="services" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3 md:mb-4">Core Services</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Comprehensive financial solutions designed to fuel your business growth and success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-lg hover:border-gray-200 transition-all">
              <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                <service.icon className={`${service.iconColor} w-8 h-8`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
              <ul className="text-slate-600 mb-8 space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="text-green-600 w-5 h-5 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/loan-application">
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 font-medium">
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
