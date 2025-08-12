import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { IndianRupee, ChevronRight, ChevronLeft, CheckCircle, Phone, Mail, User, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  loanAmount: string;
  businessType: string;
  name: string;
  phone: string;
  email: string;
  challenge: string;
  additionalInfo: string;
}

export default function ProgressiveLoanForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    loanAmount: "",
    businessType: "",
    name: "",
    phone: "",
    email: "",
    challenge: "",
    additionalInfo: ""
  });

  // Progressive Disclosure Form (Idea #6)
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Simulate submission
    console.log("Form Data:", formData);
    setIsSubmitted(true);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.loanAmount !== "";
      case 2:
        return formData.businessType !== "" && formData.challenge !== "";
      case 3:
        return formData.name !== "" && formData.phone !== "" && formData.email !== "";
      default:
        return false;
    }
  };

  // Determine context based on loan amount
  const getLoanContext = () => {
    const amount = parseInt(formData.loanAmount);
    if (amount <= 25) {
      return {
        type: "small",
        message: "Perfect! We specialize in small business loans.",
        timeframe: "You could have funds in 3-5 days",
        color: "text-cyan-400"
      };
    } else if (amount <= 100) {
      return {
        type: "medium",
        message: "Great! We'll connect you with the right banks.",
        timeframe: "Typical approval in 5-7 days",
        color: "text-purple-400"
      };
    } else {
      return {
        type: "large",
        message: "Excellent! Our team will structure the best solution.",
        timeframe: "Custom solutions in 7-10 days",
        color: "text-green-400"
      };
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428]">
        <div className="container mx-auto px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto text-center bg-[#141428]/90 border-white/10">
            <CardContent className="p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">Application Received!</h3>
              <p className="text-gray-400 mb-2">
                Thank you, {formData.name}. We've received your request for ₹{formData.loanAmount} lakhs.
              </p>
              <p className="text-purple-400 mb-6">
                Our expert will call you within 2 hours to discuss your requirements.
              </p>
              <div className="bg-[#0a0b1e]/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-400 mb-2">Your reference number:</p>
                <p className="text-xl font-mono text-white">KFS{Date.now().toString().slice(-8)}</p>
              </div>
              <Button 
                onClick={() => window.open('https://wa.me/917019056576', '_blank')}
                className="bg-green-600 hover:bg-green-700"
              >
                Continue on WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-full border border-purple-500/30 mb-6"
          >
            <span className="text-purple-400 text-sm font-medium">Quick Application</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Start Your Loan Journey
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Just 3 simple steps to get started - takes less than 2 minutes
          </motion.p>
        </div>

        <Card className="max-w-2xl mx-auto bg-[#141428]/90 backdrop-blur-xl border-white/10">
          <CardContent className="p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 ${step < 3 ? 'mr-2' : ''}`}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          ${currentStep >= step 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                            : 'bg-[#0a0b1e] text-gray-400 border border-gray-600'
                          }
                        `}
                      >
                        {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`
                            flex-1 h-1 ml-2
                            ${currentStep > step 
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                              : 'bg-gray-700'
                            }
                          `}
                        />
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      {step === 1 && "Loan Amount"}
                      {step === 2 && "Business Info"}
                      {step === 3 && "Contact Details"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Steps */}
            <AnimatePresence mode="wait">
              {/* Step 1: Loan Amount */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <Label className="text-lg text-white mb-4 block">
                      How much funding do you need?
                    </Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="number"
                        placeholder="Enter amount in lakhs (e.g., 5 for ₹5 lakhs)"
                        value={formData.loanAmount}
                        onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                        className="pl-10 h-12 text-lg bg-[#0a0b1e] border-white/20 text-white"
                      />
                    </div>
                    {formData.loanAmount && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4"
                      >
                        <p className={`${getLoanContext().color} text-sm`}>
                          {getLoanContext().message}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          {getLoanContext().timeframe}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 10, 25, 50].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => setFormData({ ...formData, loanAmount: amount.toString() })}
                        className={`
                          ${formData.loanAmount === amount.toString() 
                            ? 'bg-purple-600/20 border-purple-500' 
                            : 'bg-transparent border-white/20'
                          }
                          text-white hover:bg-white/10
                        `}
                      >
                        ₹{amount}L
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Business Information */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <Label className="text-lg text-white mb-4 block">
                      Tell us about your business
                    </Label>
                    <div className="relative mb-4">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Business type (e.g., Retail, Manufacturing, Services)"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="pl-10 h-12 bg-[#0a0b1e] border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white mb-3 block">
                      What's your primary need for this loan?
                    </Label>
                    <RadioGroup
                      value={formData.challenge}
                      onValueChange={(value) => setFormData({ ...formData, challenge: value })}
                    >
                      <div className="space-y-2">
                        {[
                          { value: "expansion", label: "Business Expansion", icon: "🚀" },
                          { value: "equipment", label: "Equipment Purchase", icon: "⚙️" },
                          { value: "working-capital", label: "Working Capital", icon: "💰" },
                          { value: "inventory", label: "Inventory Funding", icon: "📦" },
                          { value: "other", label: "Other Requirements", icon: "📝" }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`
                              flex items-center p-3 rounded-lg cursor-pointer transition-all
                              ${formData.challenge === option.value 
                                ? 'bg-purple-600/20 border border-purple-500' 
                                : 'bg-[#0a0b1e] border border-white/10 hover:border-white/30'
                              }
                            `}
                          >
                            <RadioGroupItem
                              value={option.value}
                              className="text-purple-400"
                            />
                            <span className="ml-3 text-white flex items-center gap-2">
                              <span>{option.icon}</span>
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact Information */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <Label className="text-lg text-white mb-4 block">
                      How can we reach you?
                    </Label>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="pl-10 h-12 bg-[#0a0b1e] border-white/20 text-white"
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          placeholder="Mobile number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="pl-10 h-12 bg-[#0a0b1e] border-white/20 text-white"
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10 h-12 bg-[#0a0b1e] border-white/20 text-white"
                        />
                      </div>

                      <Textarea
                        placeholder="Any additional information? (Optional)"
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                        className="bg-[#0a0b1e] border-white/20 text-white min-h-[80px]"
                      />
                    </div>
                  </div>

                  <div className="bg-green-600/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-green-400 text-sm">
                      ✓ Your information is secure and encrypted
                    </p>
                    <p className="text-green-400 text-sm">
                      ✓ No spam calls - only loan-related communication
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={handleBack}
                variant="outline"
                disabled={currentStep === 1}
                className={`
                  ${currentStep === 1 ? 'invisible' : ''}
                  bg-transparent border-white/20 text-white hover:bg-white/10
                `}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                >
                  Submit Application
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}