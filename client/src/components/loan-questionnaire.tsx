import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Send, Check } from "lucide-react";

interface QuestionnaireData {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  loanAmount: string;
  biggestHurdle: string;
  additionalDetails: string;
}

export default function LoanQuestionnaire() {
  const [formData, setFormData] = useState<QuestionnaireData>({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    loanAmount: "",
    biggestHurdle: "",
    additionalDetails: ""
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hurdles = [
    { id: "documentation", label: "Complex Documentation", description: "Struggling with paperwork requirements" },
    { id: "interest", label: "High Interest Rates", description: "Need competitive rates for sustainability" },
    { id: "collateral", label: "Collateral Shortage", description: "Limited assets for loan security" },
    { id: "credit", label: "Credit Score Issues", description: "Working to improve credit history" },
    { id: "approval", label: "Slow Processing", description: "Need faster approval times" },
    { id: "revenue", label: "Revenue History", description: "New business with limited track record" },
    { id: "terms", label: "Complex Terms", description: "Need clarity on loan conditions" },
    { id: "lender", label: "Finding Right Lender", description: "Matching with suitable financial partners" },
    { id: "other", label: "Other Challenges", description: "Different hurdle (please specify)" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send data to your backend/Excel integration
      console.log('Questionnaire Data:', formData);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-[#0a0b1e] via-[#141428] to-[#0a0b1e]">
        <div className="container mx-auto px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto text-center bg-[#141428]/90 border-white/10">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
              <p className="text-gray-400 mb-6">
                Your response has been recorded. Our financial experts will analyze your requirements and get back to you within 24 hours with personalized loan solutions.
              </p>
              <Button 
                onClick={() => window.open('https://wa.me/917019056576?text=Hi! I just submitted the questionnaire and would like to discuss my loan requirements.', '_blank')}
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
    <section className="py-16 bg-gradient-to-br from-[#0a0b1e] via-[#141428] to-[#0a0b1e] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-full border border-purple-500/30 mb-6">
            <span className="text-purple-400 text-sm font-medium">Personalized Solutions</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Overcome Your Loan Challenges
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Every business faces unique hurdles when seeking financing. Share your primary challenge, 
            and our expert advisors will craft a tailored solution to help you secure the funding you need.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto bg-[#141428]/90 backdrop-blur-xl border-white/10">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-white">
              Personalized Business Assessment
            </CardTitle>
            <CardDescription className="text-gray-400 mt-2">
              Complete this quick assessment to receive tailored financial solutions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name">Full Name*</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone*</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              {/* Business Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessType">Business Type*</Label>
                  <Input
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                    required
                    placeholder="e.g., Manufacturing, Retail, Services"
                  />
                </div>
                <div>
                  <Label htmlFor="loanAmount">Loan Amount Needed*</Label>
                  <Input
                    id="loanAmount"
                    value={formData.loanAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, loanAmount: e.target.value }))}
                    required
                    placeholder="e.g., ₹10 Lakhs"
                  />
                </div>
              </div>

              {/* Biggest Hurdle - Professional Grid Layout */}
              <div>
                <Label className="text-base font-semibold text-white mb-4 block">
                  Select Your Primary Challenge*
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {hurdles.map((hurdle) => (
                    <div 
                      key={hurdle.id}
                      onClick={() => setFormData(prev => ({ ...prev, biggestHurdle: hurdle.label }))}
                      className={`
                        relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${formData.biggestHurdle === hurdle.label 
                          ? 'border-purple-500 bg-purple-500/10' 
                          : 'border-white/10 bg-[#1a1b3a]/30 hover:border-purple-500/50 hover:bg-purple-500/5'
                        }
                      `}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`
                          w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center
                          ${formData.biggestHurdle === hurdle.label 
                            ? 'border-purple-500 bg-purple-500' 
                            : 'border-white/30'
                          }
                        `}>
                          {formData.biggestHurdle === hurdle.label && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm mb-1">{hurdle.label}</h4>
                          <p className="text-gray-400 text-xs">{hurdle.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <Label htmlFor="additionalDetails">Additional Details (Optional)</Label>
                <Textarea
                  id="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalDetails: e.target.value }))}
                  placeholder="Any specific requirements or challenges you'd like to mention..."
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.businessType || !formData.loanAmount || !formData.biggestHurdle}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Assessment
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}