import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, HelpCircle, CheckCircle, Clock, FileText, IndianRupee, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TreeNode {
  id: string;
  question: string;
  icon: any;
  options: {
    label: string;
    value: string;
    nextNode?: string;
    result?: {
      title: string;
      content: string[];
      action?: {
        label: string;
        link: string;
      };
    };
  }[];
}

export default function InteractiveDecisionTree() {
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [history, setHistory] = useState<string[]>(["start"]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Interactive Decision Tree (Idea #5)
  const treeNodes: Record<string, TreeNode> = {
    start: {
      id: "start",
      question: "What information do you need?",
      icon: HelpCircle,
      options: [
        { label: "Check if I'm eligible", value: "eligibility", nextNode: "eligibility" },
        { label: "Know the interest rates", value: "rates", nextNode: "rates" },
        { label: "Understand the process", value: "process", nextNode: "process" },
        { label: "See required documents", value: "documents", nextNode: "documents" },
        { label: "Calculate my EMI", value: "emi", nextNode: "emi" }
      ]
    },
    eligibility: {
      id: "eligibility",
      question: "How long has your business been operating?",
      icon: CheckCircle,
      options: [
        { 
          label: "Less than 2 years", 
          value: "new",
          result: {
            title: "Eligibility for New Businesses",
            content: [
              "Minimum 1 year required for unsecured loans",
              "Consider secured loans (loan against property)",
              "Partner/co-applicant can strengthen application",
              "Show consistent revenue growth (bank statements)",
              "Alternative: Business credit cards for immediate needs"
            ],
            action: { label: "Explore Secured Loans", link: "/loan-application?type=secured" }
          }
        },
        { 
          label: "2-5 years", 
          value: "established",
          result: {
            title: "You're Eligible! Here's What You Qualify For",
            content: [
              "✅ Unsecured business loans up to ₹50 lakhs",
              "✅ Interest rates from 11% per annum",
              "✅ Minimal documentation required",
              "✅ 3-5 day approval process",
              "✅ Flexible repayment options 12-60 months"
            ],
            action: { label: "Apply Now", link: "/loan-application" }
          }
        },
        { 
          label: "More than 5 years", 
          value: "mature",
          result: {
            title: "Premium Eligibility - Best Rates Available",
            content: [
              "⭐ Loans up to ₹5 crores available",
              "⭐ Preferential rates starting 8.5%",
              "⭐ Express approval in 24 hours",
              "⭐ Dedicated relationship manager",
              "⭐ Pre-approved offers available"
            ],
            action: { label: "Get Pre-Approved Offer", link: "/loan-application?type=premium" }
          }
        }
      ]
    },
    rates: {
      id: "rates",
      question: "What's your required loan amount?",
      icon: Percent,
      options: [
        { 
          label: "Under ₹10 lakhs", 
          value: "small",
          result: {
            title: "Interest Rates for Small Loans",
            content: [
              "📊 Interest range: 12-14% per annum",
              "📊 Processing fee: 2-3% of loan amount",
              "📊 Prepayment allowed after 6 months",
              "📊 No collateral required",
              "📊 Reducing balance calculation"
            ],
            action: { label: "Calculate Your EMI", link: "/emi-calculator" }
          }
        },
        { 
          label: "₹10-50 lakhs", 
          value: "medium",
          result: {
            title: "Interest Rates for Medium Loans",
            content: [
              "📊 Interest range: 10-12% per annum",
              "📊 Processing fee: 1.5-2% (negotiable)",
              "📊 Flexible prepayment options",
              "📊 Option for secured/unsecured",
              "📊 Quarterly rest calculation available"
            ],
            action: { label: "Compare Rates", link: "/loan-comparison" }
          }
        },
        { 
          label: "Above ₹50 lakhs", 
          value: "large",
          result: {
            title: "Interest Rates for Large Loans",
            content: [
              "📊 Interest range: 8.5-10% per annum",
              "📊 Processing fee: 0.5-1% (highly negotiable)",
              "📊 No prepayment penalties",
              "📊 Customized repayment structure",
              "📊 Daily reducing balance option"
            ],
            action: { label: "Get Custom Quote", link: "/consultation" }
          }
        }
      ]
    },
    process: {
      id: "process",
      question: "What's your timeline for funds?",
      icon: Clock,
      options: [
        { 
          label: "Urgent (1-3 days)", 
          value: "urgent",
          result: {
            title: "Express Loan Process",
            content: [
              "⚡ Step 1: Online application (5 mins)",
              "⚡ Step 2: Upload basic docs (10 mins)",
              "⚡ Step 3: Video verification (same day)",
              "⚡ Step 4: Approval (within 24 hours)",
              "⚡ Step 5: Disbursement (same day)"
            ],
            action: { label: "Start Express Application", link: "/loan-application?type=express" }
          }
        },
        { 
          label: "Standard (1 week)", 
          value: "standard",
          result: {
            title: "Standard Loan Process",
            content: [
              "📋 Day 1: Submit application online",
              "📋 Day 2: Document verification",
              "📋 Day 3-4: Credit assessment",
              "📋 Day 5: Approval decision",
              "📋 Day 6-7: Agreement & disbursement"
            ],
            action: { label: "Begin Application", link: "/loan-application" }
          }
        },
        { 
          label: "Flexible", 
          value: "flexible",
          result: {
            title: "Relaxed Process Timeline",
            content: [
              "✅ Take your time gathering documents",
              "✅ Pre-approval valid for 30 days",
              "✅ Lock in rates for 15 days",
              "✅ Schedule verification at convenience",
              "✅ Relationship manager support throughout"
            ],
            action: { label: "Get Pre-Approval", link: "/loan-application?type=preapproval" }
          }
        }
      ]
    },
    documents: {
      id: "documents",
      question: "What type of business do you run?",
      icon: FileText,
      options: [
        { 
          label: "Sole Proprietorship", 
          value: "sole",
          result: {
            title: "Documents for Sole Proprietorship",
            content: [
              "📄 Proprietor's Aadhaar & PAN Card",
              "📄 Business registration/Shop license",
              "📄 Bank statements (6 months)",
              "📄 GST returns (if registered)",
              "📄 Rent agreement (if applicable)"
            ],
            action: { label: "Upload Documents", link: "/document-upload" }
          }
        },
        { 
          label: "Partnership/LLP", 
          value: "partnership",
          result: {
            title: "Documents for Partnership/LLP",
            content: [
              "📄 Partnership deed/LLP agreement",
              "📄 Partners' KYC documents",
              "📄 Firm's PAN card",
              "📄 Bank statements (12 months)",
              "📄 ITR & computation (2 years)",
              "📄 GST returns (12 months)"
            ],
            action: { label: "Document Checklist", link: "/document-checklist" }
          }
        },
        { 
          label: "Private Limited", 
          value: "pvtltd",
          result: {
            title: "Documents for Private Limited",
            content: [
              "📄 Certificate of Incorporation",
              "📄 MOA & AOA",
              "📄 Directors' KYC & Board resolution",
              "📄 Audited financials (2 years)",
              "📄 ITR with computation (2 years)",
              "📄 GST returns & bank statements"
            ],
            action: { label: "Start Documentation", link: "/document-upload" }
          }
        }
      ]
    },
    emi: {
      id: "emi",
      question: "Select your loan amount range",
      icon: IndianRupee,
      options: [
        { 
          label: "₹5-15 lakhs", 
          value: "5-15",
          result: {
            title: "EMI Estimates for ₹5-15 Lakhs",
            content: [
              "💰 ₹5L @ 12%: EMI ₹11,122 (5 years)",
              "💰 ₹10L @ 12%: EMI ₹22,244 (5 years)",
              "💰 ₹15L @ 12%: EMI ₹33,366 (5 years)",
              "💰 Shorter tenure = Lower total interest",
              "💰 Prepayment reduces interest burden"
            ],
            action: { label: "Detailed Calculator", link: "/emi-calculator" }
          }
        },
        { 
          label: "₹15-50 lakhs", 
          value: "15-50",
          result: {
            title: "EMI Estimates for ₹15-50 Lakhs",
            content: [
              "💰 ₹20L @ 11%: EMI ₹43,491 (5 years)",
              "💰 ₹30L @ 11%: EMI ₹65,237 (5 years)",
              "💰 ₹50L @ 10%: EMI ₹1,06,235 (5 years)",
              "💰 Part-payment option available",
              "💰 Flexible EMI dates (5th/10th/15th)"
            ],
            action: { label: "Calculate Exact EMI", link: "/emi-calculator" }
          }
        },
        { 
          label: "Above ₹50 lakhs", 
          value: "50+",
          result: {
            title: "EMI Options for Large Loans",
            content: [
              "💰 Customized EMI structures available",
              "💰 Step-up/Step-down EMI options",
              "💰 Moratorium period possible",
              "💰 Balloon payment structures",
              "💰 Speak to expert for best structure"
            ],
            action: { label: "Consult Expert", link: "/consultation" }
          }
        }
      ]
    }
  };

  const currentNode = treeNodes[currentNodeId];

  const handleOptionClick = (option: typeof currentNode.options[0]) => {
    const newAnswers = { ...answers, [currentNodeId]: option.value };
    setAnswers(newAnswers);

    if (option.nextNode) {
      setCurrentNodeId(option.nextNode);
      setHistory([...history, option.nextNode]);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousNode = newHistory[newHistory.length - 1];
      setCurrentNodeId(previousNode);
      setHistory(newHistory);
    }
  };

  const restart = () => {
    setCurrentNodeId("start");
    setHistory(["start"]);
    setAnswers({});
  };

  const selectedOption = currentNode.options.find(opt => opt.value === answers[currentNodeId]);
  const showResult = selectedOption?.result;

  return (
    <section className="py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-full border border-purple-500/30 mb-6"
          >
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Smart Assistant</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Find Exactly What You Need
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Answer a few quick questions to get personalized information
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-[#141428]/90 backdrop-blur-xl border-white/10">
            <CardContent className="p-8">
              {/* Progress Breadcrumb */}
              <div className="flex items-center gap-2 mb-8 text-sm">
                {history.map((nodeId, index) => {
                  const node = treeNodes[nodeId];
                  const Icon = node?.icon || HelpCircle;
                  return (
                    <div key={index} className="flex items-center gap-2">
                      {index > 0 && <span className="text-gray-600">→</span>}
                      <div className="flex items-center gap-1 text-gray-400">
                        <Icon className="w-4 h-4" />
                        <span>{nodeId === "start" ? "Start" : nodeId}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key={currentNodeId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Question */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {currentNode.question}
                      </h3>
                      <p className="text-gray-400">Select the option that best describes your need</p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                      {currentNode.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleOptionClick(option)}
                          className="w-full p-4 text-left bg-[#0a0b1e]/50 hover:bg-[#0a0b1e]/80 border border-white/10 hover:border-purple-500/50 rounded-lg transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white group-hover:text-purple-300 transition-colors">
                              {option.label}
                            </span>
                            <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    {/* Result */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {showResult.title}
                        </h3>
                        <div className="space-y-3">
                          {showResult.content.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <span className="text-green-400">•</span>
                              <span className="text-gray-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {showResult.action && (
                        <Button
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                          onClick={() => window.location.href = showResult.action!.link}
                        >
                          {showResult.action.label}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                <Button
                  onClick={goBack}
                  variant="outline"
                  disabled={history.length <= 1}
                  className="bg-transparent border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <Button
                  onClick={restart}
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}