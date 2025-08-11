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
import { Progress } from "@/components/ui/progress";
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
  Plus,
  DollarSign,
  PieChart,
  BarChart3,
  Target,
  Briefcase,
  Home,
  Car,
  Wallet,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  Calculator
} from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface LoanData {
  id: string;
  amount: number;
  tenure: number;
  interestRate: number;
  emi: number;
  status: string;
  bankName: string;
  type: string;
  disbursedDate?: string;
  outstandingAmount?: number;
}

interface BusinessMetrics {
  revenue: number;
  expenses: number;
  profit: number;
  growth: number;
  cashFlow: number;
}

interface Holdings {
  properties: { value: number; type: string; location: string }[];
  vehicles: { value: number; model: string }[];
  investments: { value: number; type: string }[];
  otherAssets: { value: number; description: string }[];
}

export default function ComprehensiveDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get tab from URL params and handle post-login redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
    
    // Check for post-auth redirect
    const postAuthRedirect = localStorage.getItem('postAuthRedirect');
    if (postAuthRedirect) {
      localStorage.removeItem('postAuthRedirect');
      sessionStorage.removeItem('redirectAfterLogin');
      const redirectUrl = new URL(postAuthRedirect, window.location.origin);
      const redirectTab = redirectUrl.searchParams.get('tab');
      if (redirectTab) {
        setActiveTab(redirectTab);
      }
    }
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Mock data for demonstration - would be fetched from API
  const mockBusinessMetrics: BusinessMetrics = {
    revenue: 2500000,
    expenses: 1800000,
    profit: 700000,
    growth: 15.5,
    cashFlow: 450000
  };

  const mockLoans: LoanData[] = [
    {
      id: "1",
      amount: 5000000,
      tenure: 60,
      interestRate: 9.5,
      emi: 105000,
      status: "active",
      bankName: "HDFC Bank",
      type: "Business Loan",
      disbursedDate: "2024-01-15",
      outstandingAmount: 4200000
    },
    {
      id: "2",
      amount: 10000000,
      tenure: 120,
      interestRate: 8.5,
      emi: 124000,
      status: "active",
      bankName: "ICICI Bank",
      type: "Loan Against Property",
      disbursedDate: "2023-06-20",
      outstandingAmount: 8500000
    }
  ];

  const mockHoldings: Holdings = {
    properties: [
      { value: 25000000, type: "Commercial", location: "Mumbai" },
      { value: 15000000, type: "Residential", location: "Delhi" }
    ],
    vehicles: [
      { value: 2500000, model: "BMW X5" },
      { value: 800000, model: "Honda City" }
    ],
    investments: [
      { value: 5000000, type: "Mutual Funds" },
      { value: 3000000, type: "Fixed Deposits" },
      { value: 2000000, type: "Stocks" }
    ],
    otherAssets: [
      { value: 1000000, description: "Gold & Jewelry" },
      { value: 500000, description: "Equipment & Machinery" }
    ]
  };

  // Calculate net worth
  const calculateNetWorth = () => {
    const totalAssets = 
      mockHoldings.properties.reduce((sum, p) => sum + p.value, 0) +
      mockHoldings.vehicles.reduce((sum, v) => sum + v.value, 0) +
      mockHoldings.investments.reduce((sum, i) => sum + i.value, 0) +
      mockHoldings.otherAssets.reduce((sum, o) => sum + o.value, 0);
    
    const totalLiabilities = mockLoans.reduce((sum, l) => sum + (l.outstandingAmount || 0), 0);
    
    return {
      assets: totalAssets,
      liabilities: totalLiabilities,
      netWorth: totalAssets - totalLiabilities
    };
  };

  const netWorthData = calculateNetWorth();

  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b1e] via-[#141428] to-[#0a0b1e]">
      {/* Header */}
      <header className="bg-[#0a0b1e]/95 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <a className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
                <span className="text-xl font-bold text-white">KFS Dashboard</span>
              </a>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Welcome, {user.firstName || user.email}</span>
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                className="text-gray-400 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Net Worth Summary Card */}
        <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Your Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Total Assets</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(netWorthData.assets)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Total Liabilities</p>
                <p className="text-2xl font-bold text-red-400">{formatCurrency(netWorthData.liabilities)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Net Worth</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {formatCurrency(netWorthData.netWorth)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#141428]/90 border border-white/10 grid grid-cols-5 w-full">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              <PieChart className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:bg-purple-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Business
            </TabsTrigger>
            <TabsTrigger value="loans" className="data-[state=active]:bg-purple-600">
              <CreditCard className="w-4 h-4 mr-2" />
              Loans
            </TabsTrigger>
            <TabsTrigger value="holdings" className="data-[state=active]:bg-purple-600">
              <Wallet className="w-4 h-4 mr-2" />
              Holdings
            </TabsTrigger>
            <TabsTrigger value="consultation" className="data-[state=active]:bg-purple-600">
              <Calendar className="w-4 h-4 mr-2" />
              Consultation
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-[#141428]/90 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">{formatCurrency(mockBusinessMetrics.revenue)}</p>
                  <p className="text-xs text-green-400 mt-1">
                    <ArrowUp className="w-3 h-3 inline" /> 15.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#141428]/90 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400">Active Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">{mockLoans.length}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Total EMI: {formatCurrency(mockLoans.reduce((sum, l) => sum + l.emi, 0))}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#141428]/90 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400">Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">{mockHoldings.properties.length}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Value: {formatCurrency(mockHoldings.properties.reduce((sum, p) => sum + p.value, 0))}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#141428]/90 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400">Investments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(mockHoldings.investments.reduce((sum, i) => sum + i.value, 0))}
                  </p>
                  <p className="text-xs text-green-400 mt-1">
                    <ArrowUp className="w-3 h-3 inline" /> 8.2% returns YTD
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-[#141428]/90 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => setLocation('/loan-application')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Loan
                </Button>
                <Button 
                  variant="outline" 
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  onClick={() => setLocation('/consultation')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
                <Button 
                  variant="outline" 
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  onClick={() => setActiveTab('holdings')}
                >
                  <Building className="w-4 h-4 mr-2" />
                  Update Holdings
                </Button>
                <Button 
                  variant="outline" 
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  onClick={() => setActiveTab('business')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Metrics Tab */}
          <TabsContent value="business" className="space-y-6">
            <Card className="bg-[#141428]/90 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Business Performance</CardTitle>
                <CardDescription className="text-gray-400">
                  Track your business metrics and growth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Monthly Revenue</span>
                      <span className="text-white font-bold">{formatCurrency(mockBusinessMetrics.revenue)}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Monthly Expenses</span>
                      <span className="text-white font-bold">{formatCurrency(mockBusinessMetrics.expenses)}</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Net Profit</span>
                      <span className="text-green-400 font-bold">{formatCurrency(mockBusinessMetrics.profit)}</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Cash Flow</span>
                      <span className="text-white font-bold">{formatCurrency(mockBusinessMetrics.cashFlow)}</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Year-over-Year Growth</p>
                      <p className="text-2xl font-bold text-green-400">
                        <ArrowUp className="w-5 h-5 inline" /> {mockBusinessMetrics.growth}%
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                      <Calculator className="w-4 h-4 mr-2" />
                      Financial Calculator
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loans Tab */}
          <TabsContent value="loans" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Your Loans</h2>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500"
                onClick={() => setLocation('/loan-application')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Apply for New Loan
              </Button>
            </div>

            <div className="grid gap-4">
              {mockLoans.map((loan) => (
                <Card key={loan.id} className="bg-[#141428]/90 border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3">
                        <div>
                          <Badge className="bg-green-500/20 text-green-400 mb-2">
                            {loan.status.toUpperCase()}
                          </Badge>
                          <h3 className="text-lg font-bold text-white">{loan.type}</h3>
                          <p className="text-gray-400">{loan.bankName}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-gray-400">Loan Amount</p>
                            <p className="text-white font-semibold">{formatCurrency(loan.amount)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Outstanding</p>
                            <p className="text-white font-semibold">{formatCurrency(loan.outstandingAmount || 0)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">EMI</p>
                            <p className="text-white font-semibold">{formatCurrency(loan.emi)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Interest Rate</p>
                            <p className="text-white font-semibold">{loan.interestRate}%</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="border-purple-500/30 text-purple-400">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Holdings Tab */}
          <TabsContent value="holdings" className="space-y-6">
            <Card className="bg-[#141428]/90 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Your Holdings & Assets</CardTitle>
                <CardDescription className="text-gray-400">
                  Complete overview of your assets and investments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Properties */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Home className="w-5 h-5 mr-2 text-purple-400" />
                    Properties
                  </h3>
                  <div className="grid gap-3">
                    {mockHoldings.properties.map((property, index) => (
                      <div key={index} className="bg-[#0a0b1e]/50 rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">{property.type} Property</p>
                          <p className="text-gray-400 text-sm">{property.location}</p>
                        </div>
                        <p className="text-green-400 font-bold">{formatCurrency(property.value)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vehicles */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Car className="w-5 h-5 mr-2 text-purple-400" />
                    Vehicles
                  </h3>
                  <div className="grid gap-3">
                    {mockHoldings.vehicles.map((vehicle, index) => (
                      <div key={index} className="bg-[#0a0b1e]/50 rounded-lg p-3 flex justify-between items-center">
                        <p className="text-white font-medium">{vehicle.model}</p>
                        <p className="text-green-400 font-bold">{formatCurrency(vehicle.value)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Investments */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                    Investments
                  </h3>
                  <div className="grid gap-3">
                    {mockHoldings.investments.map((investment, index) => (
                      <div key={index} className="bg-[#0a0b1e]/50 rounded-lg p-3 flex justify-between items-center">
                        <p className="text-white font-medium">{investment.type}</p>
                        <p className="text-green-400 font-bold">{formatCurrency(investment.value)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Assets */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-purple-400" />
                    Other Assets
                  </h3>
                  <div className="grid gap-3">
                    {mockHoldings.otherAssets.map((asset, index) => (
                      <div key={index} className="bg-[#0a0b1e]/50 rounded-lg p-3 flex justify-between items-center">
                        <p className="text-white font-medium">{asset.description}</p>
                        <p className="text-green-400 font-bold">{formatCurrency(asset.value)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Asset
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consultation Tab */}
          <TabsContent value="consultation" className="space-y-6">
            <Card className="bg-[#141428]/90 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Financial Consultation</CardTitle>
                <CardDescription className="text-gray-400">
                  Book a consultation with our financial experts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Get Expert Advice</h3>
                    <p className="text-gray-400 mb-4">
                      Our financial experts are ready to help you make informed decisions about loans, investments, and business growth.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-white font-medium">Goal Planning</p>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-white font-medium">Growth Strategy</p>
                      </div>
                      <div className="text-center">
                        <Calculator className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-white font-medium">Financial Analysis</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                      onClick={() => setLocation('/consultation')}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Free Consultation
                    </Button>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-white font-semibold mb-3">Why Consult With Us?</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                        <span className="text-gray-400">30+ years of experience in financial services</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                        <span className="text-gray-400">Access to 50+ partner banks and NBFCs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                        <span className="text-gray-400">Personalized solutions for your business</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                        <span className="text-gray-400">End-to-end support from application to disbursement</span>
                      </li>
                    </ul>
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