import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee, Calendar, Percent, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoanCalculator() {
  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState([1000000]);
  const [interestRate, setInterestRate] = useState([12]);
  const [tenure, setTenure] = useState([36]);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  // Business Loan Eligibility State
  const [monthlyRevenue, setMonthlyRevenue] = useState([500000]);
  const [profitMargin, setProfitMargin] = useState([20]);
  const [existingEmi, setExistingEmi] = useState([0]);
  const [eligibleAmount, setEligibleAmount] = useState(0);

  // Calculate EMI
  useEffect(() => {
    const principal = loanAmount[0];
    const rate = interestRate[0] / 12 / 100;
    const time = tenure[0];

    const emiAmount = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalPay = emiAmount * time;
    const totalInt = totalPay - principal;

    setEmi(Math.round(emiAmount));
    setTotalInterest(Math.round(totalInt));
    setTotalPayment(Math.round(totalPay));
  }, [loanAmount, interestRate, tenure]);

  // Calculate Eligibility
  useEffect(() => {
    const monthlyProfit = (monthlyRevenue[0] * profitMargin[0]) / 100;
    const availableForEmi = monthlyProfit * 0.5; // 50% of profit for EMI
    const netAvailable = availableForEmi - existingEmi[0];
    
    if (netAvailable > 0) {
      // Using 12% interest and 48 months tenure for calculation
      const rate = 12 / 12 / 100;
      const time = 48;
      const eligibleLoan = (netAvailable * (Math.pow(1 + rate, time) - 1)) / (rate * Math.pow(1 + rate, time));
      setEligibleAmount(Math.round(eligibleLoan));
    } else {
      setEligibleAmount(0);
    }
  }, [monthlyRevenue, profitMargin, existingEmi]);

  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Financial Calculators
          </h2>
          <p className="text-white/60 text-lg">
            Plan your finances with our smart calculators
          </p>
        </motion.div>

        <Tabs defaultValue="emi" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
            <TabsTrigger value="emi" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
              EMI Calculator
            </TabsTrigger>
            <TabsTrigger value="eligibility" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
              Eligibility Calculator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emi">
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Input Section */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Calculate Your EMI
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-white/80">Loan Amount</Label>
                      <span className="text-white font-semibold">{formatCurrency(loanAmount[0])}</span>
                    </div>
                    <Slider
                      value={loanAmount}
                      onValueChange={setLoanAmount}
                      min={100000}
                      max={50000000}
                      step={100000}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-xs text-white/40">
                      <span>₹1 Lakh</span>
                      <span>₹5 Crore</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-white/80">Interest Rate (% p.a.)</Label>
                      <span className="text-white font-semibold">{interestRate[0]}%</span>
                    </div>
                    <Slider
                      value={interestRate}
                      onValueChange={setInterestRate}
                      min={8}
                      max={24}
                      step={0.5}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-xs text-white/40">
                      <span>8%</span>
                      <span>24%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-white/80">Tenure (Months)</Label>
                      <span className="text-white font-semibold">{tenure[0]} months</span>
                    </div>
                    <Slider
                      value={tenure}
                      onValueChange={setTenure}
                      min={6}
                      max={84}
                      step={6}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-xs text-white/40">
                      <span>6 months</span>
                      <span>84 months</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/60">Monthly EMI</span>
                        <IndianRupee className="h-5 w-5 text-purple-400" />
                      </div>
                      <p className="text-3xl font-bold text-white">{formatCurrency(emi)}</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/60">Total Interest</span>
                        <Percent className="h-5 w-5 text-orange-400" />
                      </div>
                      <p className="text-2xl font-bold text-white">{formatCurrency(totalInterest)}</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/60">Total Payment</span>
                        <TrendingUp className="h-5 w-5 text-green-400" />
                      </div>
                      <p className="text-2xl font-bold text-white">{formatCurrency(totalPayment)}</p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Breakdown Chart */}
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-4">Payment Breakdown</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/60">Principal</span>
                          <span className="text-white">{formatCurrency(loanAmount[0])}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
                            style={{ width: `${(loanAmount[0] / totalPayment) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/60">Interest</span>
                          <span className="text-white">{formatCurrency(totalInterest)}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-pink-500 to-pink-400"
                            style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="eligibility">
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Input Section */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Check Your Eligibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-white/80">Monthly Revenue</Label>
                      <span className="text-white font-semibold">{formatCurrency(monthlyRevenue[0])}</span>
                    </div>
                    <Slider
                      value={monthlyRevenue}
                      onValueChange={setMonthlyRevenue}
                      min={100000}
                      max={10000000}
                      step={50000}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-xs text-white/40">
                      <span>₹1 Lakh</span>
                      <span>₹1 Crore</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-white/80">Profit Margin (%)</Label>
                      <span className="text-white font-semibold">{profitMargin[0]}%</span>
                    </div>
                    <Slider
                      value={profitMargin}
                      onValueChange={setProfitMargin}
                      min={5}
                      max={50}
                      step={5}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-xs text-white/40">
                      <span>5%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-white/80">Existing EMIs</Label>
                      <span className="text-white font-semibold">{formatCurrency(existingEmi[0])}</span>
                    </div>
                    <Slider
                      value={existingEmi}
                      onValueChange={setExistingEmi}
                      min={0}
                      max={500000}
                      step={5000}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-xs text-white/40">
                      <span>₹0</span>
                      <span>₹5 Lakh</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/60">Eligible Loan Amount</span>
                        <IndianRupee className="h-5 w-5 text-green-400" />
                      </div>
                      <p className="text-3xl font-bold text-white">{formatCurrency(eligibleAmount)}</p>
                      <p className="text-sm text-white/60 mt-2">Based on 50% income ratio</p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Financial Summary */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Your Financial Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/60">Monthly Profit</span>
                      <span className="text-white font-semibold">
                        {formatCurrency((monthlyRevenue[0] * profitMargin[0]) / 100)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Available for EMI (50%)</span>
                      <span className="text-white font-semibold">
                        {formatCurrency((monthlyRevenue[0] * profitMargin[0]) / 100 * 0.5)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Current EMIs</span>
                      <span className="text-orange-400 font-semibold">
                        -{formatCurrency(existingEmi[0])}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex justify-between">
                        <span className="text-white/80 font-medium">Net Available</span>
                        <span className="text-green-400 font-bold">
                          {formatCurrency((monthlyRevenue[0] * profitMargin[0]) / 100 * 0.5 - existingEmi[0])}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">💡 Tips to Increase Eligibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        Improve profit margins through cost optimization
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        Clear existing loans to reduce EMI burden
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        Show consistent revenue growth over 6 months
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        Maintain good credit score above 750
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}