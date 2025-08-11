import { CreditCard, Shield, TrendingUp, Wallet, Lock, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function ModernFeaturesSection() {
  const features = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payments",
      description: "Real-time card issuing and payment processing solutions",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analytics",
      description: "Track loan performance and business metrics in real-time",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security",
      description: "Bank-level security with encrypted data protection",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Cash Management",
      description: "Optimize working capital and cash flow management",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "100% Mobile",
      description: "Apply and manage loans from anywhere, anytime",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Automated Docs",
      description: "Smart document processing with AI verification",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Financial Future for
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Disruptors & Innovators
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get full-stack bank accounts, automated cash management, and instant loan approvals 
            in one powerful platform designed for modern businesses.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 h-full">
                {/* Icon with gradient background */}
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Card Showcase Section - inspired by the second website */}
        <div className="mt-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
            }}></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Get Full-Stack Bank Accounts
              </h3>
              <p className="text-gray-300 text-lg mb-8">
                Open OTC capital accounts that scale with your business. 
                Track 99% mobile money flow, manage employee cards, and more.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500"></div>
                  <span className="text-white">Instant account opening</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500"></div>
                  <span className="text-white">Virtual & physical cards</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500"></div>
                  <span className="text-white">Real-time transaction monitoring</span>
                </div>
              </div>
              
              <button className="mt-8 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Get a Demo →
              </button>
            </div>
            
            {/* Card Visual */}
            <div className="relative">
              <div className="relative transform rotate-6 hover:rotate-3 transition-transform duration-500">
                {/* Black Card */}
                <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-8 shadow-2xl">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded"></div>
                    <span className="text-gray-400 text-sm">VISA</span>
                  </div>
                  <div className="space-y-2 mb-8">
                    <div className="flex gap-2">
                      <span className="text-gray-400">•••• •••• ••••</span>
                      <span className="text-white">1234</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-400 text-xs">CARD HOLDER</p>
                      <p className="text-white">John Business</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">EXPIRES</p>
                      <p className="text-white">12/29</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Silver Card (behind) */}
              <div className="absolute top-8 left-8 transform -rotate-6 opacity-70">
                <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl p-8 shadow-xl w-full h-full">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded"></div>
                    <span className="text-gray-600 text-sm">VISA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}