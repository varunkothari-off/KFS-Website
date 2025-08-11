import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "wouter";
import { 
  FileText, 
  Calendar, 
  CreditCard, 
  User, 
  LogOut,
  Phone,
  Mail,
  Building,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  Plus
} from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ProfileCompletionData {
  mobile?: string;
}

export default function Dashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [mobile, setMobile] = useState("");

  // Check if profile needs completion on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('complete-profile') === 'true' && user && !user.isProfileComplete) {
      setShowProfileCompletion(true);
    }
  }, [user]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Fetch user's loan applications
  const { data: loanApplications, isLoading: loadingApplications } = useQuery({
    queryKey: [`/api/users/${user?.id}/loan-applications`],
    enabled: !!user?.id,
  });

  // Profile completion mutation
  const completeProfileMutation = useMutation({
    mutationFn: async (data: ProfileCompletionData) => {
      return apiRequest(`/api/auth/complete-profile`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Profile completed",
        description: "Your profile has been successfully updated.",
      });
      setShowProfileCompletion(false);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  const handleProfileCompletion = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length >= 10) {
      completeProfileMutation.mutate({ mobile });
    } else {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0b1e] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { variant: "secondary" as const, icon: FileText },
      submitted: { variant: "default" as const, icon: Clock },
      "under-review": { variant: "default" as const, icon: Clock },
      approved: { variant: "success" as const, icon: CheckCircle },
      rejected: { variant: "destructive" as const, icon: XCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status.replace("-", " ").toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0b1e]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#141428] to-[#1a1b3a] border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <a className="text-2xl font-bold text-white">
                  KFS Dashboard
                </a>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {user.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={user.fullName} 
                    className="w-10 h-10 rounded-full border-2 border-white/20"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-white">
                  <p className="font-medium">{user.fullName}</p>
                  <p className="text-xs text-white/60">{user.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Completion Banner */}
      {showProfileCompletion && !user.isProfileComplete && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
          <div className="container mx-auto">
            <form onSubmit={handleProfileCompletion} className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="mobile" className="text-white mb-1 block">
                  Complete your profile - Add your mobile number
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="max-w-xs bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                  <Button 
                    type="submit" 
                    variant="secondary"
                    disabled={completeProfileMutation.isPending}
                  >
                    {completeProfileMutation.isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-[#141428] border border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">
              Overview
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-white/10">
              Loan Applications
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-white/10">
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-[#141428] to-[#1a1b3a] border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">
                    Total Applications
                  </CardTitle>
                  <FileText className="w-4 h-4 text-white/50" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {loanApplications?.length || 0}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#141428] to-[#1a1b3a] border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">
                    Active Loans
                  </CardTitle>
                  <TrendingUp className="w-4 h-4 text-white/50" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {loanApplications?.filter((app: any) => app.status === 'approved').length || 0}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#141428] to-[#1a1b3a] border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">
                    Profile Status
                  </CardTitle>
                  <User className="w-4 h-4 text-white/50" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {user.isProfileComplete ? "Complete" : "Incomplete"}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-[#141428] to-[#1a1b3a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-white/60">
                  Start a new application or book a consultation
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button
                  onClick={() => setLocation('/loan-application')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Loan Application
                </Button>
                <Button
                  onClick={() => setLocation('/consultation')}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card className="bg-gradient-to-br from-[#141428] to-[#1a1b3a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Your Loan Applications</CardTitle>
                <CardDescription className="text-white/60">
                  Track the status of your loan applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingApplications ? (
                  <div className="text-white/60">Loading applications...</div>
                ) : loanApplications && loanApplications.length > 0 ? (
                  <div className="space-y-4">
                    {loanApplications.map((app: any) => (
                      <div 
                        key={app.id} 
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-white/50" />
                            <span className="font-medium text-white">
                              {app.loanType.replace("-", " ").toUpperCase()} Loan
                            </span>
                          </div>
                          <p className="text-sm text-white/60">
                            Amount: ₹{app.loanAmount} | Applied: {new Date(app.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto text-white/30 mb-4" />
                    <p className="text-white/60 mb-4">No loan applications yet</p>
                    <Button
                      onClick={() => setLocation('/loan-application')}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      Start Your First Application
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gradient-to-br from-[#141428] to-[#1a1b3a] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription className="text-white/60">
                  Your account details and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.fullName} 
                      className="w-20 h-20 rounded-full border-2 border-white/20"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-semibold">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-white">{user.fullName}</h3>
                    <p className="text-white/60">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Email</span>
                    </div>
                    <p className="text-white">{user.email}</p>
                  </div>

                  {user.mobile && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/70">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">Mobile</span>
                      </div>
                      <p className="text-white">{user.mobile}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70">
                      <Building className="w-4 h-4" />
                      <span className="text-sm">Provider</span>
                    </div>
                    <p className="text-white capitalize">{user.provider || 'Email'}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Verification Status</span>
                    </div>
                    <p className="text-white">{user.isVerified ? "Verified" : "Unverified"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}