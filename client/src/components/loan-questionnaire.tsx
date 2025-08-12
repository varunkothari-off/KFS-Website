import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Send } from "lucide-react";

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
    "Complex documentation requirements",
    "High interest rates from traditional banks",
    "Lack of collateral or guarantees",
    "Poor credit history or low credit score",
    "Long approval and processing times",
    "Insufficient business revenue history",
    "Understanding loan terms and conditions",
    "Finding the right lender for my business type",
    "Other (please specify in additional details)"
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
    <section className="py-12 bg-gradient-to-br from-[#0a0b1e] via-[#141428] to-[#0a0b1e]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            What's Your Biggest Hurdle in Securing a Loan?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Help us understand your challenges so we can provide the most relevant financial solutions for your business.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto bg-[#141428]/90 border-white/10">
          <CardHeader>
            <CardTitle className="text-xl text-white">Quick Assessment</CardTitle>
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

              {/* Main Question */}
              <div>
                <Label className="text-base font-medium">What's your biggest hurdle in securing a loan?*</Label>
                <RadioGroup 
                  value={formData.biggestHurdle} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, biggestHurdle: value }))}
                  className="mt-4 space-y-3"
                >
                  {hurdles.map((hurdle, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                      <RadioGroupItem value={hurdle} id={`hurdle-${index}`} className="border-white/20 text-purple-400" />
                      <Label htmlFor={`hurdle-${index}`} className="text-sm cursor-pointer flex-1 text-gray-300">
                        {hurdle}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
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