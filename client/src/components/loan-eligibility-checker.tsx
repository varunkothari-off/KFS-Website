import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface EligibilityResult {
  eligible: boolean;
  loanAmount: string;
  reasons: string[];
  suggestions: string[];
}

export default function LoanEligibilityChecker() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    businessAge: "",
    annualTurnover: [0],
    creditScore: "",
  });
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      calculateEligibility();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const calculateEligibility = () => {
    const { businessAge, annualTurnover, creditScore } = answers;
    
    let eligible = true;
    const reasons: string[] = [];
    const suggestions: string[] = [];
    let maxLoanAmount = 0;

    // Business age check
    if (businessAge === "less-6") {
      eligible = false;
      reasons.push("Business needs to be at least 6 months old");
      suggestions.push("Consider MUDRA loans for new businesses");
    } else if (businessAge === "6-12") {
      maxLoanAmount = Math.min(annualTurnover[0] * 0.3, 1000000); // Max 10 lakhs
      suggestions.push("Eligible for startup business loans");
    } else if (businessAge === "1-3") {
      maxLoanAmount = annualTurnover[0] * 0.5;
    } else {
      maxLoanAmount = annualTurnover[0] * 0.75;
    }

    // Credit score check
    if (creditScore === "below-600") {
      eligible = false;
      reasons.push("Credit score needs improvement");
      suggestions.push("Work on improving credit score above 650");
    } else if (creditScore === "600-700") {
      maxLoanAmount *= 0.7;
      suggestions.push("Higher interest rates may apply");
    } else if (creditScore === "700-750") {
      suggestions.push("Good credit score - competitive rates available");
    } else {
      maxLoanAmount *= 1.1;
      suggestions.push("Excellent credit score - best rates available");
    }

    // Turnover check
    if (annualTurnover[0] < 500000) {
      if (eligible) {
        suggestions.push("Consider micro-finance options");
      }
      maxLoanAmount = Math.min(maxLoanAmount, 500000);
    }

    setResult({
      eligible,
      loanAmount: maxLoanAmount > 0 ? `₹${(maxLoanAmount / 100000).toFixed(1)} Lakhs` : "₹0",
      reasons,
      suggestions,
    });
  };

  const resetChecker = () => {
    setStep(1);
    setAnswers({
      businessAge: "",
      annualTurnover: [0],
      creditScore: "",
    });
    setResult(null);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Quick Eligibility Check
              </span>
            </h2>
            <p className="text-white/60 text-lg">
              Find out your loan eligibility in just 3 simple questions
            </p>
          </div>

          {!result ? (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-white/60">Step {step} of 3</span>
                  <span className="text-sm text-white/60">{Math.round((step / 3) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question Cards */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-6">
                        How old is your business?
                      </h3>
                      <RadioGroup
                        value={answers.businessAge}
                        onValueChange={(value) => setAnswers({ ...answers, businessAge: value })}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <RadioGroupItem value="less-6" id="less-6" />
                            <Label htmlFor="less-6" className="cursor-pointer text-white/80">
                              Less than 6 months
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <RadioGroupItem value="6-12" id="6-12" />
                            <Label htmlFor="6-12" className="cursor-pointer text-white/80">
                              6 months - 1 year
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <RadioGroupItem value="1-3" id="1-3" />
                            <Label htmlFor="1-3" className="cursor-pointer text-white/80">
                              1 - 3 years
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <RadioGroupItem value="3plus" id="3plus" />
                            <Label htmlFor="3plus" className="cursor-pointer text-white/80">
                              More than 3 years
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-6">
                        What's your annual business turnover?
                      </h3>
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-400 mb-2">
                            ₹{(answers.annualTurnover[0] / 100000).toFixed(1)} Lakhs
                          </div>
                          <div className="text-sm text-white/60">
                            {answers.annualTurnover[0] >= 10000000 ? "₹" + (answers.annualTurnover[0] / 10000000).toFixed(2) + " Cr" : ""}
                          </div>
                        </div>
                        <Slider
                          value={answers.annualTurnover}
                          onValueChange={(value) => setAnswers({ ...answers, annualTurnover: value })}
                          min={0}
                          max={50000000}
                          step={100000}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-white/40">
                          <span>₹0</span>
                          <span>₹5 Cr</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-6">
                        What's your credit score range?
                      </h3>
                      <RadioGroup
                        value={answers.creditScore}
                        onValueChange={(value) => setAnswers({ ...answers, creditScore: value })}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <RadioGroupItem value="below-600" id="below-600" />
                            <Label htmlFor="below-600" className="cursor-pointer text-white/80">
                              Below 600
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <RadioGroupItem value="600-700" id="600-700" />
                            <Label htmlFor="600-700" className="cursor-pointer text-white/80">
                              600 - 700
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <RadioGroupItem value="700-750" id="700-750" />
                            <Label htmlFor="700-750" className="cursor-pointer text-white/80">
                              700 - 750
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <RadioGroupItem value="above-750" id="above-750" />
                            <Label htmlFor="above-750" className="cursor-pointer text-white/80">
                              Above 750
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <RadioGroupItem value="dont-know" id="dont-know" />
                            <Label htmlFor="dont-know" className="cursor-pointer text-white/80">
                              I don't know my score
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={step === 1}
                    className="border-white/20 text-white/60 hover:bg-white/10"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={
                      (step === 1 && !answers.businessAge) ||
                      (step === 2 && answers.annualTurnover[0] === 0) ||
                      (step === 3 && !answers.creditScore)
                    }
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:scale-105 transition-transform"
                  >
                    {step === 3 ? "Check Eligibility" : "Next"}
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Results */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="text-center mb-8">
                  {result.eligible ? (
                    <>
                      <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Congratulations! You're Eligible
                      </h3>
                      <p className="text-xl text-purple-400 font-semibold">
                        Estimated Loan Amount: {result.loanAmount}
                      </p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Limited Eligibility
                      </h3>
                      <p className="text-white/60">
                        You may need to improve certain criteria
                      </p>
                    </>
                  )}
                </div>

                {result.reasons.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Areas to Improve:</h4>
                    <ul className="space-y-2">
                      {result.reasons.map((reason, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/70">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.suggestions.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-3">Recommendations:</h4>
                    <ul className="space-y-2">
                      {result.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/70">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={resetChecker}
                    variant="outline"
                    className="flex-1 border-white/20 text-white/60 hover:bg-white/10"
                  >
                    Check Again
                  </Button>
                  {result.eligible && (
                    <a href="/loan-application" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:scale-105 transition-transform">
                        Apply Now
                      </Button>
                    </a>
                  )}
                  <a href="/consultation" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:scale-105 transition-transform">
                      Get Expert Advice
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}