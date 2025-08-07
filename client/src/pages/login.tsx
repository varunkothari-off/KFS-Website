import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Building2, ArrowRight, Phone, Shield, Briefcase } from "lucide-react";
import { SiGoogle, SiLinkedin } from "react-icons/si";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'social' | 'otp'>('social');
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
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

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

  const handleSocialLogin = async (provider: 'google' | 'linkedin' | 'microsoft') => {
    setSocialLoading(provider);
    
    try {
      // Mock social login for demo - in production, this would redirect to OAuth provider
      const mockCode = `mock_${provider}_code_${Date.now()}`;
      const response = await fetch("/api/auth/social-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          code: mockCode,
          redirectUri: `${window.location.origin}/auth/callback`
        }),
      });
      
      if (!response.ok) {
        throw new Error("Social login failed");
      }
      
      const data = await response.json() as { token: string; user: any; needsProfileCompletion?: boolean };

      // Store the authentication token
      localStorage.setItem("authToken", data.token);
      
      // Invalidate and refetch user query
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });

      toast({
        title: "Login successful!",
        description: `Welcome ${data.user.name || 'to Kothari Financial Services'}`,
      });

      // Check if profile completion is needed
      if (data.needsProfileCompletion) {
        setLocation("/complete-profile");
      } else {
        // Redirect to member dashboard
        setLocation("/dashboard");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setSocialLoading(null);
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
      const response = await fetch("/api/users/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber, otp }),
      });
      
      if (!response.ok) {
        throw new Error("Invalid OTP");
      }
      
      const data = await response.json() as { token: string; needsProfileCompletion?: boolean };

      // Store the authentication token
      localStorage.setItem("authToken", data.token);
      
      // Invalidate and refetch user query
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });

      toast({
        title: "Login successful!",
        description: "Welcome to Kothari Financial Services",
      });

      // Check if profile completion is needed
      if (data.needsProfileCompletion) {
        setLocation("/complete-profile");
      } else {
        // Check if there's a redirect path stored
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin");
          setLocation(redirectPath);
        } else {
          setLocation("/dashboard");
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
            <CardTitle className="text-xl">Choose your login method</CardTitle>
            <CardDescription>
              Quick and secure access to your KFS account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loginMethod === 'social' ? (
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-14 flex items-center justify-start gap-3 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  onClick={() => handleSocialLogin('google')}
                  disabled={socialLoading !== null}
                >
                  {socialLoading === 'google' ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                  ) : (
                    <SiGoogle className="w-5 h-5" />
                  )}
                  <span className="flex-1 text-left">Continue with Google</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full h-14 flex items-center justify-start gap-3 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                  onClick={() => handleSocialLogin('linkedin')}
                  disabled={socialLoading !== null}
                >
                  {socialLoading === 'linkedin' ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                  ) : (
                    <SiLinkedin className="w-5 h-5" />
                  )}
                  <span className="flex-1 text-left">Continue with LinkedIn</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full h-14 flex items-center justify-start gap-3 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                  onClick={() => handleSocialLogin('microsoft')}
                  disabled={socialLoading !== null}
                >
                  {socialLoading === 'microsoft' ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                  ) : (
                    <Briefcase className="w-5 h-5" />
                  )}
                  <span className="flex-1 text-left">Continue with Microsoft</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Button>
                
                <div className="relative my-6">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-gray-500">
                    or
                  </span>
                </div>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => setLoginMethod('otp')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Use Mobile Number
                </Button>
              </div>
            ) : !showOtpInput ? (
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
                
                <Button
                  variant="ghost"
                  className="w-full mt-2"
                  onClick={() => setLoginMethod('social')}
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Back to social login
                </Button>
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