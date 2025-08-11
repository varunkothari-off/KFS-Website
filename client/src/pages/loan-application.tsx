import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Upload, CheckCircle, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useRequireAuth, useAuth } from "@/hooks/useAuth";
import type { User, LoanApplication } from "@shared/schema";

// Form validation schemas
const userRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  mobile: z.string().min(10, "Valid mobile number required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
});

const loanDetailsSchema = z.object({
  loanType: z.enum(["property", "business", "cash-credit"]),
  loanAmount: z.string().min(1, "Loan amount is required"),
  businessType: z.string().optional(),
  monthlyIncome: z.string().optional(),
  existingLoans: z.boolean(),
  propertyValue: z.string().optional(),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type UserRegistration = z.infer<typeof userRegistrationSchema>;
type LoanDetails = z.infer<typeof loanDetailsSchema>;
type OTPVerification = z.infer<typeof otpSchema>;

const steps = [
  { id: 1, title: "Select Loan", description: "Choose your loan type" },
  { id: 2, title: "Enter Details", description: "Fill application form" },
  { id: 3, title: "Upload Docs", description: "Submit required documents" },
  { id: 4, title: "Complete", description: "Application submitted" },
];

export default function LoanApplication() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { user: authenticatedUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Loan Details Form
  const loanForm = useForm<LoanDetails>({
    resolver: zodResolver(loanDetailsSchema),
  });



  // Submit loan application mutation
  const loanApplicationMutation = useMutation({
    mutationFn: async (data: LoanDetails) => {
      if (!authenticatedUser) throw new Error("User not authenticated");
      
      const applicationData = {
        userId: authenticatedUser.id,
        loanType: data.loanType,
        loanAmount: data.loanAmount,
        businessType: data.businessType || null,
        monthlyIncome: data.monthlyIncome || null,
        existingLoans: data.existingLoans,
        propertyValue: data.propertyValue || null,
        documents: null,
      };
      
      const response = await apiRequest("POST", "/api/loan-applications", applicationData);
      return response.json();
    },
    onSuccess: (data) => {
      setApplication(data);
      queryClient.invalidateQueries({ queryKey: ["/api/loan-applications"] });
      setCurrentStep(3);
      toast({
        title: "Application Created",
        description: "Your loan application has been created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Application Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleLoanDetails = async (data: LoanDetails) => {
    setCurrentStep(2);
  };

  const handleApplicationSubmit = async (data: LoanDetails) => {
    loanApplicationMutation.mutate(data);
  };

  const getDocumentRequirements = (loanType: string) => {
    const common = ["PAN Card", "Aadhaar Card", "Bank Statements (6 months)"];
    
    switch (loanType) {
      case "property":
        return [...common, "Property Documents", "Property Valuation", "Income Proof"];
      case "business":
        return [...common, "GST Returns", "ITR (2 years)", "Business Registration"];
      case "cash-credit":
        return [...common, "Trade License", "Stock Statements", "Audited Financials"];
      default:
        return common;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b1e]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#141428] to-[#1a1b3a] border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Loan Application</h1>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm
                    ${currentStep >= step.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : currentStep === step.id 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'bg-white/10 text-white/50'
                    }
                  `}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="ml-2 hidden md:block">
                    <div className={`text-sm font-medium ${currentStep >= step.id ? 'text-purple-400' : 'text-white/50'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-white/40">{step.description}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${currentStep > step.id ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/10'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Show loading while checking auth */}
        {authLoading ? (
          <Card className="bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10">
            <CardContent className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
              <span className="ml-2 text-white">Loading...</span>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* Step 1: Loan Type Selection */}
            {currentStep === 1 && (
            <Card className="bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Select Loan Type</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={loanForm.handleSubmit(handleLoanDetails)} className="space-y-6">
                  <div>
                    <Label className="text-white/80">Loan Type *</Label>
                    <Select onValueChange={(value) => loanForm.setValue("loanType", value as any)}>
                      <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select loan type" className="text-white/60" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#141428] border-white/20">
                        <SelectItem value="property" className="text-white hover:bg-white/10">Loan Against Property</SelectItem>
                        <SelectItem value="business" className="text-white hover:bg-white/10">Unsecured Business Loan</SelectItem>
                        <SelectItem value="cash-credit" className="text-white hover:bg-white/10">Cash Credit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="loanAmount" className="text-white/80">Loan Amount Required (₹) *</Label>
                    <Input
                      id="loanAmount"
                      {...loanForm.register("loanAmount")}
                      placeholder="10,00,000"
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

            {/* Step 2: Loan Details */}
            {currentStep === 2 && (
            <Card className="bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Loan Application Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={loanForm.handleSubmit(handleApplicationSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="businessType" className="text-white/80">Business Type</Label>
                    <Select onValueChange={(value) => loanForm.setValue("businessType", value)}>
                      <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select business type" className="text-white/60" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#141428] border-white/20">
                        <SelectItem value="manufacturing" className="text-white hover:bg-white/10">Manufacturing</SelectItem>
                        <SelectItem value="trading" className="text-white hover:bg-white/10">Trading</SelectItem>
                        <SelectItem value="services" className="text-white hover:bg-white/10">Services</SelectItem>
                        <SelectItem value="other" className="text-white hover:bg-white/10">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="monthlyIncome" className="text-white/80">Monthly Income (₹)</Label>
                    <Input
                      id="monthlyIncome"
                      {...loanForm.register("monthlyIncome")}
                      placeholder="2,50,000"
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>

                  {loanForm.watch("loanType") === "property" && (
                    <div>
                      <Label htmlFor="propertyValue" className="text-white/80">Property Value (₹)</Label>
                      <Input
                        id="propertyValue"
                        {...loanForm.register("propertyValue")}
                        placeholder="50,00,000"
                        className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="existingLoans"
                      {...loanForm.register("existingLoans")}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="existingLoans">I have existing loans</Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-kfs-primary hover:bg-kfs-secondary"
                    disabled={loanApplicationMutation.isPending}
                  >
                    {loanApplicationMutation.isPending ? "Creating Application..." : "Create Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && application && (
            <Card>
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Please upload the following documents for your {application.loanType} loan application:
                  </p>
                  
                  <div className="grid gap-4">
                    {getDocumentRequirements(application.loanType).map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium">{doc}</h4>
                          <p className="text-sm text-gray-500">Required document</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Button 
                      onClick={() => setCurrentStep(4)}
                      className="w-full bg-kfs-primary hover:bg-kfs-secondary"
                    >
                      Continue to Status
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

            {/* Step 4: Application Complete */}
            {currentStep === 4 && application && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-green-600">Application Submitted Successfully!</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                
                <div>
                  <p className="text-lg font-medium">Application ID: {application.id}</p>
                  <p className="text-gray-600">We'll contact you within 24 hours for further processing.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button 
                    onClick={() => setLocation(`/application-status/${application.id}`)}
                    className="bg-kfs-primary hover:bg-kfs-secondary"
                  >
                    Track Application Status
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setLocation("/")}
                  >
                    Return to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          </div>
        )}
      </div>
    </div>
  );
}
