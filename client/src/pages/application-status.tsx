import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, CheckCircle, XCircle, FileText } from "lucide-react";
import { Link, useParams } from "wouter";
import type { LoanApplication } from "@shared/schema";

const statusConfig = {
  draft: { 
    label: "Draft", 
    color: "bg-gray-500", 
    icon: FileText,
    description: "Application is being prepared" 
  },
  submitted: { 
    label: "Submitted", 
    color: "bg-blue-500", 
    icon: Clock,
    description: "Application has been submitted and is under initial review" 
  },
  "under-review": { 
    label: "Under Review", 
    color: "bg-yellow-500", 
    icon: Clock,
    description: "Our team is reviewing your application and documents" 
  },
  approved: { 
    label: "Approved", 
    color: "bg-green-500", 
    icon: CheckCircle,
    description: "Congratulations! Your loan has been approved" 
  },
  rejected: { 
    label: "Rejected", 
    color: "bg-red-500", 
    icon: XCircle,
    description: "Unfortunately, your application was not approved" 
  },
};

export default function ApplicationStatus() {
  const params = useParams();
  const applicationId = params.id;

  const { data: application, isLoading, error } = useQuery<LoanApplication>({
    queryKey: ["/api/loan-applications", applicationId],
    enabled: !!applicationId,
    queryFn: async () => {
      const response = await fetch(`/api/loan-applications/${applicationId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch application");
      }
      return response.json();
    },
  });

  if (!applicationId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Application ID Required</h2>
              <p className="text-gray-600 mb-4">Please provide a valid application ID to check status.</p>
              <Link href="/loan-application">
                <Button className="bg-kfs-primary hover:bg-kfs-secondary">
                  Apply for Loan
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 text-kfs-primary">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <h1 className="text-2xl font-bold text-kfs-dark">Application Status</h1>
              <div className="w-24" />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Application Not Found</h2>
              <p className="text-gray-600 mb-4">
                The application with ID {applicationId} could not be found.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/loan-application">
                  <Button className="bg-kfs-primary hover:bg-kfs-secondary">
                    Apply for Loan
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const status = statusConfig[application.status as keyof typeof statusConfig] || statusConfig.draft;
  const StatusIcon = status.icon;

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const getLoanTypeLabel = (type: string) => {
    switch (type) {
      case "property": return "Loan Against Property";
      case "business": return "Unsecured Business Loan";
      case "cash-credit": return "Cash Credit";
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-kfs-primary">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-kfs-dark">Application Status</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Application Overview</span>
                <Badge className={`${status.color} text-white`}>
                  <StatusIcon className="w-4 h-4 mr-1" />
                  {status.label}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Application ID</p>
                    <p className="font-semibold">{application.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Loan Type</p>
                    <p className="font-semibold">{getLoanTypeLabel(application.loanType)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Loan Amount</p>
                    <p className="font-semibold">{formatAmount(application.loanAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Applied On</p>
                    <p className="font-semibold">
                      {application.createdAt ? new Date(application.createdAt).toLocaleDateString('en-IN') : 'Unknown date'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Current Status</p>
                  <p className="text-gray-800">{status.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Details */}
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.businessType && (
                  <div>
                    <p className="text-sm text-gray-600">Business Type</p>
                    <p className="font-medium capitalize">{application.businessType}</p>
                  </div>
                )}
                
                {application.monthlyIncome && (
                  <div>
                    <p className="text-sm text-gray-600">Monthly Income</p>
                    <p className="font-medium">{formatAmount(application.monthlyIncome)}</p>
                  </div>
                )}
                
                {application.propertyValue && (
                  <div>
                    <p className="text-sm text-gray-600">Property Value</p>
                    <p className="font-medium">{formatAmount(application.propertyValue)}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-600">Existing Loans</p>
                  <p className="font-medium">{application.existingLoans ? "Yes" : "No"}</p>
                </div>

                {application.notes && (
                  <div>
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="font-medium">{application.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {application.status === "draft" && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-kfs-primary rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Complete Your Application</p>
                      <p className="text-sm text-gray-600">Upload required documents to submit your application for review.</p>
                    </div>
                  </div>
                )}
                
                {application.status === "submitted" && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-kfs-primary rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Initial Review in Progress</p>
                      <p className="text-sm text-gray-600">Our team will review your application within 24-48 hours.</p>
                    </div>
                  </div>
                )}
                
                {application.status === "under-review" && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-kfs-primary rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Detailed Review in Progress</p>
                      <p className="text-sm text-gray-600">We may contact you for additional documents or clarification.</p>
                    </div>
                  </div>
                )}
                
                {application.status === "approved" && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Congratulations!</p>
                      <p className="text-sm text-gray-600">Our representative will contact you within 24 hours to discuss loan terms and disbursal process.</p>
                    </div>
                  </div>
                )}
                
                {application.status === "rejected" && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Application Not Approved</p>
                      <p className="text-sm text-gray-600">You can apply again after addressing the concerns or try a different loan product.</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-kfs-secondary rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Need Help?</p>
                    <p className="text-sm text-gray-600">Contact our support team at +91 98765 43210 for any questions.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {application.status === "rejected" && (
              <Link href="/loan-application">
                <Button className="bg-kfs-primary hover:bg-kfs-secondary">
                  Apply Again
                </Button>
              </Link>
            )}
            
            <Link href="/consultation">
              <Button variant="outline">
                Book Consultation
              </Button>
            </Link>
            
            <Button 
              variant="outline"
              onClick={() => window.print()}
            >
              Print Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
