import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Phone, User, Mail, Building, Chrome, Linkedin } from "lucide-react";
import { FaMicrosoft } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Logo from "@/components/logo";

export default function Register() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [showEmailForm, setShowEmailForm] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    businessName: "",
    otp: ""
  });

  const handleSocialSignUp = (provider: string) => {
    // Store redirect destination for post-auth redirect
    localStorage.setItem('postAuthRedirect', '/dashboard');
    // Redirect to OAuth endpoint
    window.location.href = `/api/auth/${provider}`;
  };

  const registerMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("/api/users/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      toast({
        title: "OTP Sent",
        description: "Please check your mobile for the verification code.",
      });
      setStep('otp');
    },
    onError: () => {
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (otp: string) => {
      return apiRequest("/api/users/verify-otp", {
        method: "POST",
        body: JSON.stringify({ mobile: formData.mobile, otp }),
      });
    },
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      toast({
        title: "Registration Successful",
        description: "Welcome to Kothari Financial Services!",
      });
      // Redirect to dashboard after a short delay to show the success message
      setTimeout(() => {
        setLocation("/dashboard");
      }, 1000);
    },
    onError: () => {
      toast({
        title: "Invalid OTP",
        description: "Please check the code and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      registerMutation.mutate(formData);
    } else {
      verifyOtpMutation.mutate(formData.otp);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b1e] flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b1e] via-[#141428] to-[#1a1b3a]"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-blue-900/5"></div>
      </div>

      <Card className="w-full max-w-md bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10 relative z-10">
        <CardHeader className="text-center">
          <Link href="/">
            <div className="inline-block mb-4">
              <Logo className="w-16 h-16 mx-auto" />
            </div>
          </Link>
          <CardTitle className="text-2xl font-bold text-white">
            {step === 'details' ? 'Create Account' : 'Verify Mobile'}
          </CardTitle>
          <CardDescription className="text-white/60">
            {step === 'details' 
              ? 'Join thousands of businesses who trust KFS' 
              : 'Enter the 6-digit code sent to your mobile'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showEmailForm && step === 'details' ? (
            <>
              {/* Social Sign Up Options */}
              <div className="space-y-4">
                <Button
                  onClick={() => handleSocialSignUp('google')}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Sign up with Google
                </Button>

                <Button
                  onClick={() => handleSocialSignUp('linkedin')}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  Sign up with LinkedIn
                </Button>

                <Button
                  onClick={() => handleSocialSignUp('microsoft')}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <FaMicrosoft className="w-5 h-5 mr-2" />
                  Sign up with Microsoft
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#141428] px-2 text-white/40">Or sign up with email</span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowEmailForm(true)}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Continue with Email
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-white/60 text-sm">
                  Already have an account?{" "}
                  <Link href="/login">
                    <a className="text-purple-400 hover:text-purple-300 underline">
                      Sign in instead
                    </a>
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <Button
                onClick={() => showEmailForm ? setShowEmailForm(false) : setLocation('/login')}
                variant="ghost"
                size="sm"
                className="mb-4 text-white/60 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {showEmailForm ? 'Back to options' : 'Back to login'}
              </Button>

              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 'details' ? (
                  <>
                    <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white/80">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-white/80">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Mobile Number
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    required
                    minLength={10}
                    maxLength={10}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-white/80">
                    <Building className="w-4 h-4 inline mr-2" />
                    Business Name (Optional)
                  </Label>
                  <Input
                    id="businessName"
                    type="text"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>
                  </>
                ) : (
                  <div className="space-y-2">
                <Label htmlFor="otp" className="text-white/80">
                  Verification Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={(e) => setFormData({...formData, otp: e.target.value})}
                  required
                  maxLength={6}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-center text-2xl tracking-widest"
                />
                <p className="text-xs text-white/40 text-center mt-2">
                  Didn't receive the code? Check your SMS or wait a moment.
                </p>
                  </div>
                )}

                <Button
              type="submit"
              disabled={registerMutation.isPending || verifyOtpMutation.isPending}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {step === 'details' 
                ? (registerMutation.isPending ? "Sending OTP..." : "Continue") 
                : (verifyOtpMutation.isPending ? "Verifying..." : "Verify & Continue")}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-white/60">
              Already have an account?{" "}
              <Link href="/login">
                <a className="text-purple-400 hover:text-purple-300 font-medium">
                  Sign in
                </a>
              </Link>
            </p>
          </div>

          <div className="text-center pt-4 border-t border-white/10 mt-4">
            <p className="text-xs text-white/40">
              By creating an account, you agree to our{" "}
              <Link href="/terms-of-service" className="text-purple-400 hover:text-purple-300 underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="text-purple-400 hover:text-purple-300 underline">
                Privacy Policy
              </Link>
            </p>
          </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}