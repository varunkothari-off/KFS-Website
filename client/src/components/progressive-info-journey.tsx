import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, ArrowLeft, CheckCircle, IndianRupee, 
  Percent, Clock, FileText, TrendingUp, Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface JourneyStep {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  content: {
    type: "selection" | "info" | "calculator" | "checklist";
    data: any;
  };
}

export default function ProgressiveInfoJourney() {
  const [currentStep, setCurrentStep] = useState(0);
  const [journeyData, setJourneyData] = useState<Record<string, any>>({});
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Progressive Information Journey (Idea #9)
  const journeySteps: JourneyStep[] = [
    {
      id: "amount",
      title: "Let's Start with Your Needs",
      subtitle: "Select your loan amount to see personalized information",
      icon: IndianRupee,
      content: {
        type: "selection",
        data: {
          question: "How much funding do you need?",
          options: [
            { value: 5, label: "₹5 Lakhs", description: "Perfect for small businesses" },
            { value: 10, label: "₹10 Lakhs", description: "Growing business needs" },
            { value: 25, label: "₹25 Lakhs", description: "Expansion funding" },
            { value: 50, label: "₹50 Lakhs", description: "Major growth capital" },
            { value: 100, label: "₹1 Crore", description: "Enterprise funding" },
            { value: 200, label: "₹2+ Crores", description: "Large-scale financing" }
          ]
        }
      }
    },
    {
      id: "rates",
      title: "Your Personalized Rates",
      subtitle: "Based on your loan amount, here are your rates",
      icon: Percent,
      content: {
        type: "info",
        data: {
          getDynamicContent: (data: Record<string, any>) => {
            const amount = data.amount || 10;
            if (amount <= 10) {
              return {
                title: "Small Business Rates",
                metrics: [
                  { label: "Interest Rate", value: "12-14% p.a.", highlight: true },
                  { label: "Processing Fee", value: "2-3%", highlight: false },
                  { label: "Best Rate Available", value: "11.5% p.a.", highlight: true }
                ],
                details: [
                  "Rates depend on your credit score (650+ preferred)",
                  "Lower rates for secured loans",
                  "Special rates for women entrepreneurs (-0.5%)",
                  "Seasonal offers may apply"
                ]
              };
            } else if (amount <= 50) {
              return {
                title: "Growing Business Rates",
                metrics: [
                  { label: "Interest Rate", value: "10-12% p.a.", highlight: true },
                  { label: "Processing Fee", value: "1.5-2%", highlight: false },
                  { label: "Best Rate Available", value: "9.5% p.a.", highlight: true }
                ],
                details: [
                  "Competitive rates for established businesses",
                  "Negotiable processing fees",
                  "Relationship pricing available",
                  "Bulk loan discounts"
                ]
              };
            } else {
              return {
                title: "Enterprise Rates",
                metrics: [
                  { label: "Interest Rate", value: "8-10% p.a.", highlight: true },
                  { label: "Processing Fee", value: "0.5-1%", highlight: false },
                  { label: "Best Rate Available", value: "7.5% p.a.", highlight: true }
                ],
                details: [
                  "Premium rates for large loans",
                  "Highly negotiable terms",
                  "Custom structuring available",
                  "Multi-bank syndication possible"
                ]
              };
            }
          }
        }
      }
    },
    {
      id: "process",
      title: "Your Application Process",
      subtitle: "Simple steps tailored to your loan amount",
      icon: TrendingUp,
      content: {
        type: "info",
        data: {
          getDynamicContent: (data: Record<string, any>) => {
            const amount = data.amount || 10;
            const isSmall = amount <= 25;
            
            return {
              title: isSmall ? "Quick 3-Step Process" : "Comprehensive 5-Step Process",
              metrics: [
                { label: "Total Time", value: isSmall ? "3-5 days" : "5-10 days", highlight: true },
                { label: "Document Upload", value: "100% Digital", highlight: false },
                { label: "Approval Time", value: isSmall ? "24 hours" : "48-72 hours", highlight: true }
              ],
              details: isSmall ? [
                "Step 1: Online application (5 minutes)",
                "Step 2: Upload documents digitally",
                "Step 3: Get approval & disbursement",
                "Dedicated support throughout"
              ] : [
                "Step 1: Initial application & screening",
                "Step 2: Detailed documentation",
                "Step 3: Credit & business assessment",
                "Step 4: Approval & agreement",
                "Step 5: Disbursement to account"
              ]
            };
          }
        }
      }
    },
    {
      id: "eligibility",
      title: "Check Your Eligibility",
      subtitle: "Quick checklist to confirm you qualify",
      icon: CheckCircle,
      content: {
        type: "checklist",
        data: {
          title: "Eligibility Checklist",
          items: [
            { id: "vintage", label: "Business operating for 2+ years", required: true },
            { id: "turnover", label: "Annual turnover ₹10 lakhs+", required: true },
            { id: "credit", label: "Credit score 650+", required: false },
            { id: "gst", label: "GST registered", required: false },
            { id: "itr", label: "Filed ITR for last 2 years", required: true }
          ],
          getDynamicMessage: (checked: Set<string>) => {
            const required = ["vintage", "turnover", "itr"];
            const hasRequired = required.every(id => checked.has(id));
            
            if (hasRequired) {
              return {
                type: "success",
                message: "Great! You meet the basic eligibility criteria. You can proceed with the application."
              };
            } else {
              return {
                type: "warning",
                message: "You may need additional documentation or a co-applicant. Our experts can help find alternatives."
              };
            }
          }
        }
      }
    },
    {
      id: "documents",
      title: "Required Documents",
      subtitle: "Everything you need to prepare",
      icon: FileText,
      content: {
        type: "info",
        data: {
          getDynamicContent: (data: Record<string, any>) => {
            const amount = data.amount || 10;
            const eligibility = data.eligibility || {};
            
            const basicDocs = [
              "Aadhaar & PAN Card",
              "Business registration proof",
              "Bank statements (6 months)",
              "Business premises proof"
            ];
            
            const additionalDocs = amount > 25 ? [
              "ITR with computation (2 years)",
              "Audited financials",
              "GST returns",
              "Property documents (if secured)"
            ] : [];
            
            return {
              title: "Document Checklist",
              metrics: [
                { label: "Total Documents", value: `${basicDocs.length + additionalDocs.length}`, highlight: true },
                { label: "Upload Time", value: "15 minutes", highlight: false },
                { label: "Format", value: "PDF/JPG", highlight: false }
              ],
              details: [...basicDocs, ...additionalDocs]
            };
          }
        }
      }
    },
    {
      id: "timeline",
      title: "Your Timeline",
      subtitle: "When you'll receive your funds",
      icon: Clock,
      content: {
        type: "info",
        data: {
          getDynamicContent: (data: Record<string, any>) => {
            const amount = data.amount || 10;
            const hasAllDocs = data.eligibility && Object.keys(data.eligibility).length >= 3;
            
            const fastTrack = amount <= 25 && hasAllDocs;
            
            return {
              title: fastTrack ? "Fast-Track Timeline" : "Standard Timeline",
              metrics: [
                { label: "Application Review", value: fastTrack ? "2 hours" : "24 hours", highlight: true },
                { label: "Final Approval", value: fastTrack ? "24 hours" : "48 hours", highlight: true },
                { label: "Funds in Account", value: fastTrack ? "Day 3" : "Day 5-7", highlight: true }
              ],
              details: [
                `Day 1: Submit application & documents`,
                `Day ${fastTrack ? "1-2" : "2-3"}: Verification & assessment`,
                `Day ${fastTrack ? "2-3" : "4-5"}: Approval & agreement`,
                `Day ${fastTrack ? "3" : "5-7"}: Funds credited to account`
              ]
            };
          }
        }
      }
    }
  ];

  const currentStepData = journeySteps[currentStep];
  const progress = ((currentStep + 1) / journeySteps.length) * 100;

  const handleSelection = (value: any) => {
    setJourneyData({ ...journeyData, [currentStepData.id]: value });
    setCompletedSteps(new Set([...completedSteps, currentStep]));
    if (currentStep < journeySteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleNext = () => {
    setCompletedSteps(new Set([...completedSteps, currentStep]));
    if (currentStep < journeySteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderContent = () => {
    const { content } = currentStepData;
    
    switch (content.type) {
      case "selection":
        return (
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white mb-4">{content.data.question}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.data.options.map((option: any) => (
                <button
                  key={option.value}
                  onClick={() => handleSelection(option.value)}
                  className="p-4 text-left bg-[#0a0b1e]/50 hover:bg-[#0a0b1e]/80 border border-white/10 hover:border-purple-500/50 rounded-lg transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-semibold text-white group-hover:text-purple-300">
                        {option.label}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">{option.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case "info":
        const dynamicContent = content.data.getDynamicContent(journeyData);
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">{dynamicContent.title}</h3>
            
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dynamicContent.metrics.map((metric: any, index: number) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    metric.highlight 
                      ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30' 
                      : 'bg-[#0a0b1e]/50 border border-white/10'
                  }`}
                >
                  <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                  <p className={`text-xl font-bold ${metric.highlight ? 'text-purple-300' : 'text-white'}`}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Details */}
            <div className="space-y-2">
              {dynamicContent.details.map((detail: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "checklist":
        const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
        const dynamicMessage = content.data.getDynamicMessage(checkedItems);
        
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">{content.data.title}</h3>
            
            <div className="space-y-3">
              {content.data.items.map((item: any) => (
                <label
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-[#0a0b1e]/50 hover:bg-[#0a0b1e]/70 rounded-lg cursor-pointer transition-all"
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.has(item.id)}
                    onChange={(e) => {
                      const newChecked = new Set(checkedItems);
                      if (e.target.checked) {
                        newChecked.add(item.id);
                      } else {
                        newChecked.delete(item.id);
                      }
                      setCheckedItems(newChecked);
                      setJourneyData({ ...journeyData, eligibility: Object.fromEntries(newChecked.entries()) });
                    }}
                    className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-white flex-1">{item.label}</span>
                  {item.required && (
                    <span className="text-xs text-orange-400 px-2 py-1 bg-orange-600/20 rounded">Required</span>
                  )}
                </label>
              ))}
            </div>
            
            {checkedItems.size > 0 && (
              <div className={`p-4 rounded-lg border ${
                dynamicMessage.type === 'success' 
                  ? 'bg-green-600/10 border-green-500/30' 
                  : 'bg-yellow-600/10 border-yellow-500/30'
              }`}>
                <p className={`text-sm ${
                  dynamicMessage.type === 'success' ? 'text-green-300' : 'text-yellow-300'
                }`}>
                  {dynamicMessage.message}
                </p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  const isLastStep = currentStep === journeySteps.length - 1;
  const Icon = currentStepData.icon;

  return (
    <section className="py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 mb-6"
          >
            <Lock className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Guided Experience</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Your Personalized Loan Journey
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            We'll guide you step-by-step with information tailored to your needs
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                Step {currentStep + 1} of {journeySteps.length}
              </span>
              <span className="text-sm text-purple-400">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-[#0a0b1e]" />
            
            {/* Step Indicators */}
            <div className="flex justify-between mt-4">
              {journeySteps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = completedSteps.has(index);
                
                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center cursor-pointer transition-all ${
                      isActive ? 'scale-110' : ''
                    }`}
                    onClick={() => {
                      if (isCompleted || index < currentStep) {
                        setCurrentStep(index);
                      }
                    }}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                          : isCompleted 
                            ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                            : 'bg-[#0a0b1e] text-gray-600 border border-gray-700'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-xs mt-1 hidden md:block ${
                      isActive ? 'text-purple-400' : 'text-gray-600'
                    }`}>
                      {step.id}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Card */}
          <Card className="bg-[#141428]/90 backdrop-blur-xl border-white/10">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-0.5">
                      <div className="w-full h-full bg-[#141428] rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{currentStepData.title}</h2>
                      <p className="text-gray-400">{currentStepData.subtitle}</p>
                    </div>
                  </div>

                  {/* Dynamic Content */}
                  {renderContent()}

                  {/* Navigation */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      disabled={currentStep === 0}
                      className="bg-transparent border-white/20 text-white hover:bg-white/10"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    {currentStepData.content.type === "info" || currentStepData.content.type === "checklist" ? (
                      isLastStep ? (
                        <Button
                          onClick={() => window.location.href = '/loan-application'}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                        >
                          Start Application
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNext}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )
                    ) : null}
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Summary Panel */}
          {Object.keys(journeyData).length > 0 && (
            <Card className="mt-6 bg-[#0a0b1e]/50 border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Your Selections</h3>
                <div className="space-y-2">
                  {journeyData.amount && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Loan Amount:</span>
                      <span className="text-white font-medium">₹{journeyData.amount} Lakhs</span>
                    </div>
                  )}
                  {journeyData.eligibility && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Eligibility Checks:</span>
                      <span className="text-green-400 font-medium">
                        {Object.keys(journeyData.eligibility).length} completed
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}