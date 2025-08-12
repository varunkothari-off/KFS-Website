import { Shield, Award, CheckCircle, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "RBI Compliant",
      description: "Following all RBI guidelines",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Lock,
      title: "256-bit SSL Secured",
      description: "Bank-grade encryption",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "ISO 27001 Certified",
      description: "Information security certified",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: CheckCircle,
      title: "GDPR Compliant",
      description: "Data privacy protected",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-8 bg-gradient-to-b from-[#0a0b1e] to-[#141428] border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${badge.color} p-0.5`}>
                  <div className="w-full h-full bg-[#0a0b1e] rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-white text-sm md:text-base mb-1">{badge.title}</h3>
                <p className="text-white/50 text-xs md:text-sm">{badge.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}