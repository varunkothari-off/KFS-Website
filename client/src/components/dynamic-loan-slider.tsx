import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { IndianRupee, Clock, FileText, Percent, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

interface LoanSegment {
  min: number;
  max: number;
  label: string;
  processingTime: string;
  interestRange: string;
  documents: string[];
  benefits: string[];
  successStory: {
    name: string;
    business: string;
    amount: string;
    quote: string;
  };
}

export default function DynamicLoanSlider() {
  const [loanAmount, setLoanAmount] = useState([25]); // Default 25 lakhs
  const [, setLocation] = useLocation();

  // Loan segments with dynamic content (Idea #5)
  const segments: LoanSegment[] = [
    {
      min: 5,
      max: 25,
      label: "Small Business Loans",
      processingTime: "3-5 days",
      interestRange: "11% - 14%",
      documents: ["GST Registration", "Bank Statements (6 months)", "Business Proof", "KYC Documents"],
      benefits: ["No collateral required", "Flexible repayment", "Doorstep service"],
      successStory: {
        name: "Anita Verma",
        business: "Verma Handicrafts",
        amount: "₹12 Lakhs",
        quote: "Got funded in just 4 days! The process was so simple."
      }
    },
    {
      min: 25,
      max: 100,
      label: "Growing Business Loans",
      processingTime: "5-7 days",
      interestRange: "9% - 12%",
      documents: ["Financial Statements (2 years)", "ITR (2 years)", "Property Documents", "Business Plan"],
      benefits: ["Competitive rates", "Dedicated manager", "Grace period available"],
      successStory: {
        name: "Rakesh Gupta",
        business: "Gupta Industries",
        amount: "₹65 Lakhs",
        quote: "KFS negotiated amazing terms with multiple banks for us."
      }
    },
    {
      min: 100,
      max: 500,
      label: "Enterprise Financing",
      processingTime: "7-10 days",
      interestRange: "8% - 10%",
      documents: ["Audited Financials (3 years)", "Board Resolution", "Project Report", "Collateral Documents"],
      benefits: ["Lowest rates", "Structured solutions", "Multi-bank options"],
      successStory: {
        name: "Suresh Mehta",
        business: "Mehta Group",
        amount: "₹3.5 Crores",
        quote: "Complex financing made simple. Saved 2% on interest!"
      }
    }
  ];

  // Determine current segment based on loan amount
  const getCurrentSegment = (): LoanSegment => {
    const amount = loanAmount[0];
    if (amount <= 25) return segments[0];
    if (amount <= 100) return segments[1];
    return segments[2];
  };

  const currentSegment = getCurrentSegment();

  // Format amount for display
  const formatAmount = (value: number): string => {
    if (value < 100) {
      return `₹${value} Lakhs`;
    } else {
      return `₹${(value / 100).toFixed(1)} Crores`;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600/20 rounded-full border border-cyan-500/30 mb-6"
          >
            <IndianRupee className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Instant Information</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              How Much Do You Need?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Slide to see requirements, rates, and success stories for your loan amount
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Loan Amount Display */}
          <Card className="bg-[#141428]/90 backdrop-blur-xl border-white/10 mb-8">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-white mb-2">
                  {formatAmount(loanAmount[0])}
                </div>
                <div className="text-purple-400 font-medium">
                  {currentSegment.label}
                </div>
              </div>

              {/* Slider */}
              <div className="px-4">
                <Slider
                  value={loanAmount}
                  onValueChange={setLoanAmount}
                  min={5}
                  max={500}
                  step={5}
                  className="mb-4"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>₹5 Lakhs</span>
                  <span>₹1 Crore</span>
                  <span>₹5 Crores</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Content Based on Amount */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSegment.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Quick Stats */}
              <Card className="bg-[#141428]/90 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-semibold text-white">Processing Time</h3>
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">
                    {currentSegment.processingTime}
                  </p>
                  <p className="text-sm text-gray-400">From application to disbursement</p>
                </CardContent>
              </Card>

              <Card className="bg-[#141428]/90 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Percent className="w-5 h-5 text-green-400" />
                    <h3 className="font-semibold text-white">Interest Rate</h3>
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">
                    {currentSegment.interestRange}
                  </p>
                  <p className="text-sm text-gray-400">Per annum, reducing balance</p>
                </CardContent>
              </Card>

              <Card className="bg-[#141428]/90 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-white">Documents</h3>
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">
                    {currentSegment.documents.length} Required
                  </p>
                  <p className="text-sm text-gray-400">Simple documentation process</p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Documents Required */}
            <Card className="bg-[#141428]/90 backdrop-blur-xl border-white/10">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-4">Documents Needed</h3>
                <ul className="space-y-2">
                  {currentSegment.documents.map((doc, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-400">{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card className="bg-[#141428]/90 backdrop-blur-xl border-white/10">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-4">Key Benefits</h3>
                <ul className="space-y-2">
                  {currentSegment.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-400">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Success Story */}
          <Card className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-purple-500/30 mt-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {currentSegment.successStory.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-white/90 italic mb-3">
                    "{currentSegment.successStory.quote}"
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-white font-semibold">
                      {currentSegment.successStory.name}
                    </span>
                    <span className="text-gray-400">
                      {currentSegment.successStory.business}
                    </span>
                    <span className="text-green-400 font-semibold">
                      {currentSegment.successStory.amount}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mt-8">
            <Button
              onClick={() => setLocation(`/loan-application?amount=${loanAmount[0]}`)}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            >
              Apply for {formatAmount(loanAmount[0])}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-gray-400 text-sm mt-4">
              No commitment required • Get decision in {currentSegment.processingTime}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}