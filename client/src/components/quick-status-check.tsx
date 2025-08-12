import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ApplicationStatus {
  id: string;
  applicationNumber: string;
  name: string;
  loanType: string;
  amount: string;
  status: 'submitted' | 'processing' | 'approved' | 'rejected' | 'documents-pending';
  lastUpdate: string;
  nextStep?: string;
  remarks?: string;
}

export default function QuickStatusCheck() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<'application' | 'mobile'>('application');
  const [isSearching, setIsSearching] = useState(false);
  const [status, setStatus] = useState<ApplicationStatus | null>(null);
  const [error, setError] = useState("");

  // Mock data for demonstration
  const mockStatuses: ApplicationStatus[] = [
    {
      id: '1',
      applicationNumber: 'KFS2024001',
      name: 'Rajesh Kumar',
      loanType: 'Business Term Loan',
      amount: '₹25 Lakhs',
      status: 'processing',
      lastUpdate: '2 hours ago',
      nextStep: 'Bank verification in progress',
      remarks: 'Documents verified successfully'
    },
    {
      id: '2',
      applicationNumber: 'KFS2024002',
      name: 'Priya Sharma',
      loanType: 'Working Capital',
      amount: '₹10 Lakhs',
      status: 'approved',
      lastUpdate: '1 day ago',
      nextStep: 'Disbursement scheduled for tomorrow',
      remarks: 'Congratulations! Your loan is approved'
    },
    {
      id: '3',
      applicationNumber: 'KFS2024003',
      name: 'Amit Patel',
      loanType: 'Property Loan',
      amount: '₹50 Lakhs',
      status: 'documents-pending',
      lastUpdate: '3 hours ago',
      nextStep: 'Please upload property valuation report',
      remarks: 'Waiting for additional documents'
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter application number or mobile number");
      return;
    }

    setIsSearching(true);
    setError("");
    setStatus(null);

    // Simulate API call
    setTimeout(() => {
      const found = mockStatuses.find(s => 
        s.applicationNumber.toLowerCase() === searchQuery.toLowerCase() ||
        (searchType === 'mobile' && searchQuery === '9876543210')
      );

      if (found) {
        setStatus(found);
      } else {
        setError("No application found with this " + (searchType === 'application' ? 'application number' : 'mobile number'));
      }
      setIsSearching(false);
    }, 1500);
  };

  const getStatusIcon = (status: ApplicationStatus['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-6 w-6 text-red-500" />;
      case 'processing':
        return <Clock className="h-6 w-6 text-blue-500" />;
      case 'documents-pending':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: ApplicationStatus['status']) => {
    switch (status) {
      case 'approved':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'rejected':
        return 'from-red-500/20 to-rose-500/20 border-red-500/30';
      case 'processing':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'documents-pending':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      default:
        return 'from-gray-500/20 to-slate-500/20 border-gray-500/30';
    }
  };

  const getStatusText = (status: ApplicationStatus['status']) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'processing':
        return 'In Progress';
      case 'documents-pending':
        return 'Documents Pending';
      case 'submitted':
        return 'Submitted';
      default:
        return 'Unknown';
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-[#141428] to-[#0a0b1e]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Quick Application Status Check
          </h2>
          <p className="text-white/60">
            Track your loan application status instantly
          </p>
        </motion.div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6">
            {/* Search Section */}
            <div className="space-y-4">
              <div className="flex gap-2 justify-center mb-4">
                <Button
                  variant={searchType === 'application' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSearchType('application')}
                  className={searchType === 'application' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
                >
                  Application Number
                </Button>
                <Button
                  variant={searchType === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSearchType('mobile')}
                  className={searchType === 'mobile' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
                >
                  Mobile Number
                </Button>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder={searchType === 'application' 
                    ? "Enter application number (e.g., KFS2024001)" 
                    : "Enter registered mobile number"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isSearching ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Searching...
                    </div>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400"
                >
                  {error}
                </motion.div>
              )}
            </div>

            {/* Status Display */}
            {status && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-6 space-y-4"
              >
                {/* Status Card */}
                <Card className={`bg-gradient-to-r ${getStatusColor(status.status)} border`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        {getStatusIcon(status.status)}
                        {getStatusText(status.status)}
                      </CardTitle>
                      <span className="text-white/60 text-sm">
                        Updated {status.lastUpdate}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-white/60 text-sm">Application Number</p>
                          <p className="text-white font-semibold">{status.applicationNumber}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Applicant Name</p>
                          <p className="text-white font-semibold">{status.name}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Loan Type</p>
                          <p className="text-white font-semibold">{status.loanType}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Loan Amount</p>
                          <p className="text-white font-semibold">{status.amount}</p>
                        </div>
                      </div>

                      {status.remarks && (
                        <div className="pt-3 border-t border-white/10">
                          <p className="text-white/60 text-sm mb-1">Remarks</p>
                          <p className="text-white">{status.remarks}</p>
                        </div>
                      )}

                      {status.nextStep && (
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-white/60 text-sm mb-1">Next Step</p>
                          <p className="text-white font-medium">{status.nextStep}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Progress Timeline */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Application Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Application Submitted', 'Documents Verified', 'Bank Processing', 'Final Approval', 'Disbursement'].map((step, index) => {
                        const isCompleted = status.status === 'approved' || 
                          (status.status === 'processing' && index < 3) ||
                          (status.status === 'documents-pending' && index < 1) ||
                          (status.status === 'submitted' && index < 1);
                        const isCurrent = 
                          (status.status === 'processing' && index === 2) ||
                          (status.status === 'documents-pending' && index === 1) ||
                          (status.status === 'submitted' && index === 0);

                        return (
                          <div key={step} className="flex items-center gap-3">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              isCompleted ? 'bg-green-500' : isCurrent ? 'bg-purple-500' : 'bg-white/10'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-white" />
                              ) : (
                                <span className="text-white text-sm">{index + 1}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`${isCompleted || isCurrent ? 'text-white' : 'text-white/40'} font-medium`}>
                                {step}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Download Documents
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Contact Loan Officer
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Sample Application Numbers */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg">
              <p className="text-white/60 text-sm mb-2">Try these sample application numbers:</p>
              <div className="flex flex-wrap gap-2">
                {['KFS2024001', 'KFS2024002', 'KFS2024003'].map((num) => (
                  <Button
                    key={num}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchType('application');
                      setSearchQuery(num);
                      handleSearch();
                    }}
                    className="text-purple-400 hover:text-purple-300 hover:bg-white/10"
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}