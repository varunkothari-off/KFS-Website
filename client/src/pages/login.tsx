import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { useAuthStore } from "@/hooks/useAuth";
import { SiGoogle, SiLinkedin } from "react-icons/si";
import { Building2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const { login } = useAuthStore();

  const handleSocialLogin = async (provider: 'google' | 'linkedin' | 'microsoft') => {
    setIsLoading(provider);
    
    try {
      // Mock social login for demo - in production, this would redirect to OAuth provider
      const mockCode = `mock_${provider}_code_${Date.now()}`;
      const response = await fetch('/api/auth/social-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider,
          code: mockCode,
          redirectUri: `${window.location.origin}/auth/callback`
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      await login(data.token, data.user);

      toast({
        title: "Login successful!",
        description: "Welcome to Kothari Financial Services",
      });

      // Check if profile completion is needed
      if (data.needsProfileCompletion) {
        setLocation("/complete-profile");
      } else {
        setLocation("/loan-application");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const getSocialIcon = (provider: string) => {
    switch (provider) {
      case 'google':
        return <SiGoogle className="w-5 h-5" />;
      case 'linkedin':
        return <SiLinkedin className="w-5 h-5" />;
      case 'microsoft':
        return <Building2 className="w-5 h-5" />; // Using Building2 as placeholder for Microsoft
      default:
        return null;
    }
  };

  const getSocialColor = (provider: string) => {
    switch (provider) {
      case 'google':
        return "hover:bg-red-50 hover:text-red-600 hover:border-red-200";
      case 'linkedin':
        return "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200";
      case 'microsoft':
        return "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200";
      default:
        return "";
    }
  };

  const providers = [
    { id: 'google' as const, name: 'Google', description: 'Continue with Google account' },
    { id: 'linkedin' as const, name: 'LinkedIn', description: 'Continue with LinkedIn profile' },
    { id: 'microsoft' as const, name: 'Microsoft', description: 'Continue with Microsoft account' }
  ];

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
            <CardTitle className="text-xl">Choose your preferred login method</CardTitle>
            <CardDescription>
              Quick and secure access to your KFS account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {providers.map((provider) => (
              <Button
                key={provider.id}
                variant="outline"
                className={`w-full h-14 flex items-center justify-between p-4 text-left border-2 transition-all duration-200 ${getSocialColor(provider.id)}`}
                onClick={() => handleSocialLogin(provider.id)}
                disabled={isLoading !== null}
              >
                <div className="flex items-center gap-4">
                  {getSocialIcon(provider.id)}
                  <div>
                    <div className="font-semibold">{provider.name}</div>
                    <div className="text-sm text-gray-500">{provider.description}</div>
                  </div>
                </div>
                {isLoading === provider.id ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                ) : (
                  <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                )}
              </Button>
            ))}

            <div className="relative my-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-gray-500">
                or
              </span>
            </div>

            <Link href="/phone-login">
              <Button variant="outline" className="w-full h-12" disabled={isLoading !== null}>
                Continue with Phone Number
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>New to KFS? <Link href="/"><span className="text-kfs-primary hover:underline">Go back to home</span></Link></p>
        </div>
      </div>
    </div>
  );
}