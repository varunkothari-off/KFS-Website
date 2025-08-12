import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Clock, Percent, FileText, IndianRupee, TrendingUp, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InfoCard {
  id: string;
  icon: any;
  title: string;
  keyMetric: string;
  metricValue: string;
  expandedContent: {
    details: string[];
    highlight?: string;
  };
  color: string;
}

export default function SmartInfoCards() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [userPreferences, setUserPreferences] = useState<Set<string>>(new Set());

  // Smart Information Cards (Idea #4)
  const infoCards: InfoCard[] = [
    {
      id: "eligibility",
      icon: CheckCircle,
      title: "Am I Eligible?",
      keyMetric: "Basic Requirements",
      metricValue: "2 Years in Business",
      expandedContent: {
        details: [
          "Minimum business vintage: 2 years",
          "Annual turnover: ₹10 lakhs minimum",
          "GST registration (for loans above ₹10 lakhs)",
          "Valid business proof and KYC",
          "No major loan defaults in last 12 months"
        ],
        highlight: "95% of applicants with 2+ years in business get approved"
      },
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "rates",
      icon: Percent,
      title: "Interest Rates",
      keyMetric: "Starting From",
      metricValue: "11% per annum",
      expandedContent: {
        details: [
          "Small Business (₹5-25L): 11-14% p.a.",
          "Growing Business (₹25L-1Cr): 9-12% p.a.",
          "Enterprise (₹1Cr+): 8-10% p.a.",
          "Rates depend on credit score and business health",
          "Reducing balance method - pay less as you repay"
        ],
        highlight: "Average customer saves 2-3% compared to traditional banks"
      },
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "process",
      icon: TrendingUp,
      title: "Application Process",
      keyMetric: "Steps Required",
      metricValue: "Just 3 Steps",
      expandedContent: {
        details: [
          "Step 1: Online application (5 minutes)",
          "Step 2: Document upload (10 minutes)",
          "Step 3: Verification call (15 minutes)",
          "Digital process - no branch visits required",
          "Dedicated relationship manager assigned"
        ],
        highlight: "Most applications completed in under 30 minutes"
      },
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "timeline",
      icon: Clock,
      title: "Approval Timeline",
      keyMetric: "Decision Time",
      metricValue: "24-48 Hours",
      expandedContent: {
        details: [
          "Instant eligibility check: 30 seconds",
          "Preliminary approval: 15 minutes",
          "Document verification: 24 hours",
          "Final approval: 48 hours",
          "Disbursement: Same day after approval"
        ],
        highlight: "70% of loans disbursed within 3 days"
      },
      color: "from-orange-500 to-red-500"
    },
    {
      id: "documents",
      icon: FileText,
      title: "Documents Required",
      keyMetric: "Basic Documents",
      metricValue: "Only 4 Documents",
      expandedContent: {
        details: [
          "KYC: Aadhaar & PAN Card",
          "Business Proof: GST/Shop License",
          "Bank Statements: Last 6 months",
          "ITR: Last 2 years (for loans above ₹25L)",
          "Property papers (only for secured loans)"
        ],
        highlight: "Digital upload - no physical paperwork needed"
      },
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: "fees",
      icon: IndianRupee,
      title: "Fees & Charges",
      keyMetric: "Processing Fee",
      metricValue: "2% of Loan Amount",
      expandedContent: {
        details: [
          "Processing fee: 2% (negotiable for large loans)",
          "Documentation charges: ₹2,000",
          "No hidden charges or surprises",
          "Prepayment allowed after 6 months",
          "No prepayment penalty after 1 year"
        ],
        highlight: "Transparent pricing - all fees disclosed upfront"
      },
      color: "from-teal-500 to-green-500"
    }
  ];

  const toggleCard = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    const newPreferences = new Set(userPreferences);
    
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
      newPreferences.add(cardId); // Track user interest
    }
    
    setExpandedCards(newExpanded);
    setUserPreferences(newPreferences);
  };

  // Sort cards based on user preferences (frequently accessed first)
  const sortedCards = [...infoCards].sort((a, b) => {
    const aPreferred = userPreferences.has(a.id);
    const bPreferred = userPreferences.has(b.id);
    if (aPreferred && !bPreferred) return -1;
    if (!aPreferred && bPreferred) return 1;
    return 0;
  });

  return (
    <section className="py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 rounded-full border border-blue-500/30 mb-6"
          >
            <span className="text-blue-400 text-sm font-medium">Information Hub</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Everything You Need to Know
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Click on any card to explore detailed information
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sortedCards.map((card, index) => {
            const Icon = card.icon;
            const isExpanded = expandedCards.has(card.id);
            const isPreferred = userPreferences.has(card.id);
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${isPreferred ? 'order-first' : ''}`}
              >
                <Card 
                  className={`
                    bg-[#141428]/90 backdrop-blur-xl border-white/10 
                    hover:border-white/30 transition-all duration-300 cursor-pointer
                    ${isExpanded ? 'ring-2 ring-purple-500/50' : ''}
                    ${isPreferred ? 'border-purple-500/30' : ''}
                  `}
                  onClick={() => toggleCard(card.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${card.color} p-0.5`}>
                          <div className="w-full h-full bg-[#141428] rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{card.title}</h3>
                          {isPreferred && (
                            <span className="text-xs text-purple-400">Frequently viewed</span>
                          )}
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-white/50" />
                      </motion.div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Key Metric - Always Visible */}
                    <div className="mb-4 p-3 bg-[#0a0b1e]/50 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">{card.keyMetric}</p>
                      <p className="text-xl font-bold text-white">{card.metricValue}</p>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 pt-4 border-t border-white/10">
                            {card.expandedContent.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-400">{detail}</span>
                              </div>
                            ))}
                            
                            {card.expandedContent.highlight && (
                              <div className="mt-4 p-3 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg border border-purple-500/30">
                                <p className="text-sm text-purple-300">
                                  💡 {card.expandedContent.highlight}
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Helper Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-400">
            💡 Tip: Cards you view frequently will appear first next time
          </p>
        </motion.div>
      </div>
    </section>
  );
}