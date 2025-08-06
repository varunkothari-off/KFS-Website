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
      color: "text-kfs-primary"
    },
    {
      icon: Briefcase,
      title: "Unsecured Business Loan",
      description: "Quick financing for your business needs without collateral requirements.",
      features: ["Up to ₹75 Lakhs", "Quick approval", "No collateral"],
      color: "text-kfs-primary"
    },
    {
      icon: CreditCard,
      title: "Cash Credit",
      description: "Working capital solution with flexible repayment options for smooth operations.",
      features: ["Revolving credit", "Pay only for usage", "Instant access"],
      color: "text-kfs-primary"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-kfs-dark mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Comprehensive financial solutions for your business growth</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-kfs-light rounded-lg flex items-center justify-center mb-6">
                <service.icon className={`${service.color} text-2xl w-8 h-8`} />
              </div>
              <h3 className="text-2xl font-bold text-kfs-dark mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="text-gray-600 mb-6 space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="text-green-500 w-4 h-4 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/loan-application">
                <Button className="w-full bg-kfs-primary text-white hover:bg-kfs-secondary">
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
