import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, TrendingUp, Building2, ArrowRight, IndianRupee, Clock, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function SmartEntrySelector() {
  const [, setLocation] = useLocation();

  // Smart Entry Point Selector (Idea #4)
  const segments = [
    {
      id: "small",
      title: "Small Business Owner",
      loanRange: "₹5 Lakhs - ₹50 Lakhs",
      icon: Store,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      features: [
        { icon: Clock, text: "15-minute preliminary approval" },
        { icon: FileText, text: "Minimal documentation" },
        { icon: IndianRupee, text: "Competitive rates from 11%" }
      ],
      description: "Perfect for startups, shops, and service businesses",
      action: "/loan-application?segment=small"
    },
    {
      id: "growing",
      title: "Growing Enterprise",
      loanRange: "₹50 Lakhs - ₹5 Crores",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      features: [
        { icon: Clock, text: "24-hour decision" },
        { icon: FileText, text: "Dedicated relationship manager" },
        { icon: IndianRupee, text: "Negotiable terms" }
      ],
      description: "For expanding businesses ready to scale",
      action: "/loan-application?segment=growing"
    },
    {
      id: "enterprise",
      title: "Established Corporation",
      loanRange: "₹5 Crores+",
      icon: Building2,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      features: [
        { icon: Clock, text: "Custom structured solutions" },
        { icon: FileText, text: "Multi-bank coordination" },
        { icon: IndianRupee, text: "Best-in-market rates" }
      ],
      description: "Complex financing for large operations",
      action: "/loan-application?segment=enterprise"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-full border border-purple-500/30 mb-6"
          >
            <span className="text-purple-400 text-sm font-medium">Personalized Solutions</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              I am a...
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Select your business profile to see tailored loan solutions and requirements
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {segments.map((segment, index) => {
            const Icon = segment.icon;
            return (
              <motion.div
                key={segment.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="group"
              >
                <Card 
                  className={`
                    relative overflow-hidden bg-[#141428]/90 backdrop-blur-xl 
                    border ${segment.borderColor} hover:border-opacity-100 border-opacity-50
                    transition-all duration-300 hover:scale-105 hover:shadow-2xl
                    cursor-pointer h-full
                  `}
                  onClick={() => setLocation(segment.action)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${segment.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  <CardContent className="p-6 relative z-10">
                    {/* Icon and Title */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${segment.color} p-0.5`}>
                        <div className="w-full h-full bg-[#141428] rounded-xl flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-all group-hover:translate-x-1" />
                    </div>

                    {/* Title and Range */}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {segment.title}
                    </h3>
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${segment.bgColor} border ${segment.borderColor} mb-4`}>
                      <IndianRupee className="w-3 h-3 text-white/70" />
                      <span className="text-sm font-medium text-white/90">
                        {segment.loanRange}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-6">
                      {segment.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      {segment.features.map((feature, featureIndex) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <FeatureIcon className="w-4 h-4 text-white/50" />
                            <span className="text-sm text-white/70">
                              {feature.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA Button */}
                    <Button 
                      className={`
                        w-full mt-6 bg-gradient-to-r ${segment.color} 
                        text-white font-semibold
                        hover:shadow-lg transition-all
                      `}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            Not sure which category fits your business?{" "}
            <Button
              variant="link"
              className="text-purple-400 hover:text-purple-300 p-0"
              onClick={() => setLocation("/consultation")}
            >
              Talk to our experts
            </Button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}