import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  IndianRupee, Clock, FileText, Percent, CheckCircle, 
  ArrowRight, Building, TrendingUp, Store, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UserProfile {
  loanAmount: number;
  businessType: string;
  segment: "small" | "medium" | "large";
}

export default function PersonalizedInfoDashboard() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Personalized Information Dashboard (Idea #6)
  const segments = {
    small: {
      icon: Store,
      label: "Small Business",
      range: "₹5L - ₹25L",
      color: "bg-blue-500"
    },
    medium: {
      icon: TrendingUp,
      label: "Growing Business",
      range: "₹25L - ₹1Cr",
      color: "bg-purple-500"
    },
    large: {
      icon: Building,
      label: "Enterprise",
      range: "Above ₹1Cr",
      color: "bg-green-500"
    }
  };

  // Set initial profile (in real app, this would come from form/URL params)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const amount = parseInt(params.get("amount") || "10");
    const type = params.get("type") || "retail";
    
    let segment: "small" | "medium" | "large" = "small";
    if (amount > 100) segment = "large";
    else if (amount > 25) segment = "medium";
    
    setUserProfile({
      loanAmount: amount,
      businessType: type,
      segment
    });
  }, []);

  if (!userProfile) {
    // Profile Selection
    return (
      <section className="py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Let's Personalize Your Experience
            </h2>
            <p className="text-lg text-gray-400">
              Tell us about your loan requirement for customized information
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["small", "medium", "large"] as const).map((segment) => {
              const segmentInfo = segments[segment];
              const Icon = segmentInfo.icon;
              
              return (
                <Card
                  key={segment}
                  className="bg-[#141428]/90 border-white/10 hover:border-white/30 cursor-pointer transition-all"
                  onClick={() => {
                    const amounts = { small: 10, medium: 50, large: 200 };
                    setUserProfile({
                      loanAmount: amounts[segment],
                      businessType: "retail",
                      segment
                    });
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <Icon className="w-12 h-12 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{segmentInfo.label}</h3>
                    <p className="text-gray-400">{segmentInfo.range}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  const segmentInfo = segments[userProfile.segment];
  const Icon = segmentInfo.icon;

  // Contextual Information Snippets (Idea #3)
  const contextualHelp = {
    interestRate: "Your rate depends on loan amount, business vintage, and credit score. Rates shown are indicative.",
    processingFee: "One-time fee charged at loan approval. Often negotiable for larger amounts.",
    emi: "Equated Monthly Installment - fixed amount you pay every month including principal and interest.",
    tenure: "Loan repayment period. Longer tenure means lower EMI but higher total interest.",
    documents: "Digital copies accepted. Physical verification only if required by bank."
  };

  // Progressive Disclosure Labels (Idea #2)
  const getProgressiveLabel = (section: string) => {
    switch (section) {
      case "rates":
        return `See rates for ₹${userProfile.loanAmount} lakh loan`;
      case "process":
        return `View 3-step process for ${segmentInfo.label.toLowerCase()}`;
      case "eligibility":
        return "Check eligibility in 30 seconds";
      case "documents":
        return `Documents needed for ₹${userProfile.loanAmount}L loan`;
      default:
        return "Learn more";
    }
  };

  // Personalized content based on profile
  const personalizedContent = {
    rates: {
      small: { range: "11-14%", best: "11%", average: "12.5%" },
      medium: { range: "9-12%", best: "9%", average: "10.5%" },
      large: { range: "8-10%", best: "8%", average: "9%" }
    },
    timeline: {
      small: { approval: "24 hours", disbursement: "3 days", total: "3-5 days" },
      medium: { approval: "48 hours", disbursement: "5 days", total: "5-7 days" },
      large: { approval: "72 hours", disbursement: "7 days", total: "7-10 days" }
    },
    documents: {
      small: ["Aadhaar & PAN", "6 months bank statements", "Business proof", "GST (if applicable)"],
      medium: ["KYC documents", "12 months bank statements", "2 years ITR", "Business financials", "Property papers (if secured)"],
      large: ["Complete KYC", "3 years audited financials", "3 years ITR", "Board resolution", "Collateral documents"]
    }
  };

  const content = {
    rates: personalizedContent.rates[userProfile.segment],
    timeline: personalizedContent.timeline[userProfile.segment],
    documents: personalizedContent.documents[userProfile.segment]
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428] relative overflow-hidden">
      <TooltipProvider>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Header with Profile Badge */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 mb-6"
            >
              <Icon className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-medium">
                Personalized for {segmentInfo.label}
              </span>
              <Badge className={`${segmentInfo.color} text-white`}>
                ₹{userProfile.loanAmount}L
              </Badge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                Your Personalized Loan Information
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400 max-w-2xl mx-auto"
            >
              Everything you need to know for your ₹{userProfile.loanAmount} lakh loan application
            </motion.p>
          </div>

          {/* Quick Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border-blue-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Interest Rate</p>
                    <p className="text-2xl font-bold text-white">{content.rates.best}</p>
                    <p className="text-xs text-blue-400">Starting from</p>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{contextualHelp.interestRate}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600/10 to-emerald-600/10 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Approval Time</p>
                    <p className="text-2xl font-bold text-white">{content.timeline.approval}</p>
                    <p className="text-xs text-green-400">Fast-track available</p>
                  </div>
                  <Clock className="w-8 h-8 text-green-400/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Documents</p>
                    <p className="text-2xl font-bold text-white">{content.documents.length}</p>
                    <p className="text-xs text-purple-400">Required docs</p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-400/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-600/10 to-red-600/10 border-orange-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Processing Fee</p>
                    <p className="text-2xl font-bold text-white">2%</p>
                    <p className="text-xs text-orange-400">Negotiable</p>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{contextualHelp.processingFee}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information Tabs */}
          <Card className="bg-[#141428]/90 backdrop-blur-xl border-white/10">
            <CardContent className="p-6">
              <Tabs defaultValue="eligibility" className="w-full">
                <TabsList className="grid grid-cols-4 w-full bg-[#0a0b1e]">
                  <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                  <TabsTrigger value="rates">Rates & Fees</TabsTrigger>
                  <TabsTrigger value="process">Process</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="eligibility" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Eligibility for ₹{userProfile.loanAmount}L Loan
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: "Business Vintage", value: "Minimum 2 years", met: true },
                        { label: "Annual Turnover", value: `₹${userProfile.loanAmount * 2}L minimum`, met: true },
                        { label: "Credit Score", value: "650+", met: true },
                        { label: "GST Registration", value: userProfile.segment === "small" ? "Optional" : "Required", met: true }
                      ].map((criterion, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-[#0a0b1e]/50 rounded-lg">
                          <CheckCircle className={`w-5 h-5 ${criterion.met ? 'text-green-400' : 'text-gray-400'}`} />
                          <div className="flex-1">
                            <p className="text-sm text-gray-400">{criterion.label}</p>
                            <p className="text-white font-medium">{criterion.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      {getProgressiveLabel("eligibility")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="rates" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Interest Rates for {segmentInfo.label}
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-[#0a0b1e]/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Interest Rate Range</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{contextualHelp.interestRate}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-2xl font-bold text-white">{content.rates.range} p.a.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-green-600/10 border border-green-500/30 rounded-lg">
                          <p className="text-xs text-green-400 mb-1">Best Rate</p>
                          <p className="text-xl font-bold text-white">{content.rates.best}</p>
                        </div>
                        <div className="p-3 bg-blue-600/10 border border-blue-500/30 rounded-lg">
                          <p className="text-xs text-blue-400 mb-1">Average Rate</p>
                          <p className="text-xl font-bold text-white">{content.rates.average}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-purple-600/10 border border-purple-500/30 rounded-lg">
                        <p className="text-sm text-purple-300">
                          💡 Tip: Your final rate depends on credit score, business financials, and loan tenure
                        </p>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      {getProgressiveLabel("rates")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="process" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Simple {userProfile.segment === "small" ? "3" : "5"}-Step Process
                    </h3>
                    <div className="space-y-3">
                      {[
                        { step: 1, title: "Apply Online", time: "5 minutes", description: "Fill basic details" },
                        { step: 2, title: "Upload Documents", time: "10 minutes", description: "Digital upload" },
                        { step: 3, title: "Verification", time: content.timeline.approval, description: "Credit assessment" },
                        ...(userProfile.segment !== "small" ? [
                          { step: 4, title: "Approval", time: "Same day", description: "Final decision" },
                          { step: 5, title: "Disbursement", time: content.timeline.disbursement, description: "Funds transfer" }
                        ] : [])
                      ].map((step) => (
                        <div key={step.step} className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-white font-semibold">{step.title}</h4>
                                <p className="text-sm text-gray-400">{step.description}</p>
                              </div>
                              <span className="text-sm text-purple-400">{step.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-green-600/10 border border-green-500/30 rounded-lg">
                      <p className="text-sm text-green-300">
                        ✓ Total time: {content.timeline.total} from application to funds
                      </p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      {getProgressiveLabel("process")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Documents for ₹{userProfile.loanAmount}L Loan
                    </h3>
                    <div className="space-y-2">
                      {content.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-[#0a0b1e]/50 rounded-lg">
                          <FileText className="w-5 h-5 text-purple-400" />
                          <span className="text-white">{doc}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-blue-600/10 border border-blue-500/30 rounded-lg">
                      <p className="text-sm text-blue-300 flex items-start gap-2">
                        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {contextualHelp.documents}
                      </p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      {getProgressiveLabel("documents")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Change Profile Option */}
          <div className="text-center mt-8">
            <Button
              variant="ghost"
              onClick={() => setUserProfile(null)}
              className="text-gray-400 hover:text-white"
            >
              Not looking for ₹{userProfile.loanAmount}L loan? Change amount
            </Button>
          </div>
        </div>
      </TooltipProvider>
    </section>
  );
}