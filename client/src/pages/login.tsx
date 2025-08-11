import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "wouter";
import { Chrome, Linkedin, Mail, ArrowLeft } from "lucide-react";
import { FaMicrosoft } from "react-icons/fa";

export default function Login() {
  const [location, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [showEmailLogin, setShowEmailLogin] = useState(false);

  const handleSocialLogin = (provider: string) => {
    // Store redirect destination if available
    const redirectTo = sessionStorage.getItem('redirectAfterLogin');
    if (redirectTo) {
      // Store it in a more persistent way for post-OAuth redirect
      localStorage.setItem('postAuthRedirect', redirectTo);
    }
    // Redirect to OAuth endpoint
    window.location.href = `/api/auth/${provider}`;
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just redirect to registration
    // In a full implementation, you'd check if user exists first
    setLocation(`/register?email=${encodeURIComponent(email)}`);
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
            <a className="inline-block mb-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative transform">
                    <div className="absolute w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 transform rotate-45 rounded-lg opacity-80"></div>
                    <div className="absolute w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 transform rotate-45 translate-x-2 translate-y-2 rounded-lg opacity-80"></div>
                    <div className="relative w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 transform rotate-45 -translate-x-1 -translate-y-1 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
          <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
          <CardDescription className="text-white/60">
            Sign in to access your dashboard and loan applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showEmailLogin ? (
            <>
              {/* Social Login Buttons */}
              <Button
                onClick={() => handleSocialLogin('google')}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Continue with Google
              </Button>

              <Button
                onClick={() => handleSocialLogin('linkedin')}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                Continue with LinkedIn
              </Button>

              <Button
                onClick={() => handleSocialLogin('microsoft')}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <FaMicrosoft className="w-5 h-5 mr-2" />
                Continue with Microsoft
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#141428] px-2 text-white/40">Or</span>
                </div>
              </div>

              <Button
                onClick={() => setShowEmailLogin(true)}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Mail className="w-5 h-5 mr-2" />
                Continue with Email
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => setShowEmailLogin(false)}
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to options
              </Button>

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Continue
                </Button>
              </form>
            </>
          )}

          <div className="text-center">
            <p className="text-sm text-white/60">
              Don't have an account?{" "}
              <Link href="/register">
                <a className="text-purple-400 hover:text-purple-300 font-medium">
                  Sign up
                </a>
              </Link>
            </p>
          </div>

          <div className="text-center pt-4 border-t border-white/10">
            <p className="text-xs text-white/40">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}