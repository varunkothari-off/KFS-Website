import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Search, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  CreditCard,
  User,
  Phone,
  Mail,
  Loader2
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function ApplicationStatus() {
  const params = useParams();
  const [searchId, setSearchId] = useState("");
  const [applicationId, setApplicationId] = useState(params.id || "");

  const { data: application, isLoading, error } = useQuery({
    queryKey: [`/api/loan-applications/${applicationId}`],
    enabled: !!applicationId,
    queryFn: async () => {
      const response = await apiRequest(`/api/loan-applications/${applicationId}`, {
        method: "GET",
      });
      return response;
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      setApplicationId(searchId.trim());
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <FileText className="w-5 h-5" />;
      case "submitted":
      case "under-review":
        return <Clock className="w-5 h-5" />;
      case "approved":
        return <CheckCircle className="w-5 h-5" />;
      case "rejected":
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-500";
      case "submitted":
        return "bg-blue-500";
      case "under-review":
        return "bg-yellow-500";
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "draft":
        return "Your application is saved as a draft. Please complete and submit it.";
      case "submitted":
        return "Your application has been successfully submitted and is awaiting review.";
      case "under-review":
        return "Our team is currently reviewing your application. This typically takes 2-3 business days.";
      case "approved":
        return "Congratulations! Your loan application has been approved. Our team will contact you with the next steps.";
      case "rejected":
        return "Unfortunately, your application was not approved at this time. Please contact us for more information.";
      default:
        return "Unable to determine the status of your application.";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b1e]">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b1e] via-[#141428] to-[#1a1b3a]"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-blue-900/5"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gradient-to-r from-[#141428] to-[#1a1b3a] border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Application Status
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Search Form */}
          {!applicationId && (
            <Card className="bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Check Application Status</CardTitle>
                <CardDescription className="text-white/60">
                  Enter your application ID to track your loan application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div>
                    <Label htmlFor="applicationId" className="text-white/80">Application ID</Label>
                    <Input
                      id="applicationId"
                      type="text"
                      placeholder="Enter your application ID"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Check Status
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {isLoading && (
            <Card className="bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10">
              <CardContent className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400 mr-2" />
                <span className="text-white">Loading application details...</span>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <Card className="bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10">
              <CardContent className="py-12 text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Application Not Found</h3>
                <p className="text-white/60 mb-6">
                  We couldn't find an application with that ID. Please check and try again.
                </p>
                <Button 
                  onClick={() => {
                    setApplicationId("");
                    setSearchId("");
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Try Another ID
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Application Details */}
          {application && !isLoading && (
            <>
              {/* Status Overview */}
              <Card className="bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10 mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Application Status</CardTitle>
                    <Badge className={`${getStatusColor(application.status)} text-white`}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(application.status)}
                        {application.status.replace("-", " ").toUpperCase()}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-white/80">{getStatusMessage(application.status)}</p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-white/60">
                        <span>Progress</span>
                        <span>{application.status === "approved" ? "100%" : application.status === "under-review" ? "75%" : application.status === "submitted" ? "50%" : "25%"}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getStatusColor(application.status)} transition-all duration-500`}
                          style={{ 
                            width: application.status === "approved" ? "100%" : 
                                   application.status === "under-review" ? "75%" : 
                                   application.status === "submitted" ? "50%" : "25%"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Application Details */}
              <Card className="bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10 mb-6">
                <CardHeader>
                  <CardTitle className="text-white">Application Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/60">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">Application ID</span>
                      </div>
                      <p className="text-white font-mono">{application.id}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/60">
                        <CreditCard className="w-4 h-4" />
                        <span className="text-sm">Loan Type</span>
                      </div>
                      <p className="text-white capitalize">{application.loanType.replace("-", " ")}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/60">
                        <CreditCard className="w-4 h-4" />
                        <span className="text-sm">Loan Amount</span>
                      </div>
                      <p className="text-white">₹{application.loanAmount}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/60">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Submitted On</span>
                      </div>
                      <p className="text-white">{new Date(application.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {application.businessType && (
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-2 text-white/60">
                        <User className="w-4 h-4" />
                        <span className="text-sm">Business Type</span>
                      </div>
                      <p className="text-white capitalize">{application.businessType}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/60">
                    If you have questions about your application or need to provide additional documents, please contact us:
                  </p>
                  <div className="space-y-3">
                    <a href="tel:+919876543210" className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors">
                      <Phone className="w-5 h-5" />
                      <span>+91 98765 43210</span>
                    </a>
                    <a href="mailto:support@kfs.com" className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors">
                      <Mail className="w-5 h-5" />
                      <span>support@kfs.com</span>
                    </a>
                  </div>
                  <div className="pt-4 flex gap-3">
                    <Button 
                      onClick={() => {
                        setApplicationId("");
                        setSearchId("");
                      }}
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      Check Another Application
                    </Button>
                    <Link href="/consultation">
                      <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        Book Consultation
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}