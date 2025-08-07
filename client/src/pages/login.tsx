import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Building2, ArrowRight, Phone, Shield } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const { toast } = useToast();

  const handleSendOtp = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await apiRequest("/api/users/register", {
        method: "POST",
        body: { mobileNumber },
      });

      setShowOtpInput(true);
      toast({
        title: "OTP sent successfully",
        description: `A 6-digit OTP has been sent to +91 ${mobileNumber}`,
      });
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest("/api/users/verify-otp", {
        method: "POST",
        body: { mobileNumber, otp },
      }) as { token: string; needsProfileCompletion?: boolean };

      // Store the authentication token
      localStorage.setItem("authToken", response.token);
      
      // Invalidate and refetch user query
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });

      toast({
        title: "Login successful!",
        description: "Welcome to Kothari Financial Services",
      });

      // Check if profile completion is needed
      if (response.needsProfileCompletion) {
        setLocation("/complete-profile");
      } else {
        // Check if there's a redirect path stored
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin");
          setLocation(redirectPath);
        } else {
          setLocation("/loan-application");
        }
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: error instanceof Error ? error.message : "Invalid OTP. Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
              <Building2 className="w-8 h-8 text-kfs-primary" />
              <span className="text-2xl font-bold text-kfs-dark">KFS</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your loan application</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl">Sign in with your mobile number</CardTitle>
            <CardDescription>
              Quick and secure access to your KFS account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showOtpInput ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 bg-gray-50 rounded-md border">
                      <span className="text-gray-600">+91</span>
                    </div>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="flex-1"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleSendOtp}
                  className="w-full bg-kfs-primary hover:bg-kfs-secondary"
                  disabled={isLoading || !mobileNumber || mobileNumber.length !== 10}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <Phone className="w-4 h-4 mr-2" />
                      Send OTP
                    </>
                  )}
                </Button>
                
                <div className="text-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 inline mr-1 text-green-600" />
                  We'll send you a 6-digit verification code
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-2xl tracking-widest"
                    disabled={isLoading}
                    maxLength={6}
                  />
                  <p className="text-sm text-gray-600">
                    OTP sent to +91 {mobileNumber}
                  </p>
                </div>
                
                <Button 
                  onClick={handleVerifyOtp}
                  className="w-full bg-kfs-primary hover:bg-kfs-secondary"
                  disabled={isLoading || !otp || otp.length !== 6}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Verify & Login
                    </>
                  )}
                </Button>
                
                <div className="flex justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setShowOtpInput(false);
                      setOtp("");
                    }}
                    className="text-kfs-primary hover:underline"
                    disabled={isLoading}
                  >
                    Change Number
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-gray-600 hover:underline"
                    disabled={isLoading}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Demo Mode:</strong> Use OTP <code className="bg-blue-100 px-1 rounded">123456</code> for testing
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>New to KFS? <Link href="/"><span className="text-kfs-primary hover:underline">Go back to home</span></Link></p>
        </div>
      </div>
    </div>
  );
}