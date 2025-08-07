import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useAuth, useRequireAuth } from "@/hooks/useAuth";
import { Building2, Phone, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

const profileSchema = z.object({
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function CompleteProfilePage() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      mobile: user?.mobile || "",
    },
  });

  const handleSubmit = async (data: ProfileFormData) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "Please log in again",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiRequest('POST', '/api/auth/complete-profile', data);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Profile completion failed');
      }

      // Invalidate and refetch user query
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });

      toast({
        title: "Profile completed!",
        description: "You can now proceed with your loan application",
      });

      setLocation("/loan-application");
    } catch (error) {
      console.error('Profile completion error:', error);
      toast({
        title: "Profile completion failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <Building2 className="w-8 h-8 text-kfs-primary" />
            <span className="text-2xl font-bold text-kfs-dark">KFS</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Just one more step to get started</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl">Welcome, {user.fullName}!</CardTitle>
            <CardDescription>
              Please provide your mobile number to complete your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium">
                  Mobile Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    {...form.register("mobile")}
                    id="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="pl-10 h-12"
                  />
                </div>
                {form.formState.errors.mobile && (
                  <p className="text-sm text-red-600">{form.formState.errors.mobile.message}</p>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Why do we need your mobile number?</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Loan application updates and notifications</li>
                      <li>• Secure account verification</li>
                      <li>• Important communication from our team</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-kfs-primary hover:bg-kfs-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Completing Profile...
                  </div>
                ) : (
                  "Complete Profile & Continue"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Your information is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
}