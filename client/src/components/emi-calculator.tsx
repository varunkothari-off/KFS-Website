import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { Link } from "wouter";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(5);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 100 / 12;
    const tenureMonths = tenure * 12;
    
    const emi = (principal * rate * Math.pow(1 + rate, tenureMonths)) / (Math.pow(1 + rate, tenureMonths) - 1);
    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - principal;
    
    return {
      monthlyEMI: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalPayment),
    };
  };

  const emiData = calculateEMI();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-kfs-dark mb-4">Free Financial Tools</h2>
            <p className="text-xl text-gray-600">Calculate your loan requirements and plan your finances</p>
          </div>
          
          {/* EMI Calculator */}
          <div className="bg-gradient-to-br from-kfs-light to-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-kfs-dark mb-6 text-center flex items-center justify-center">
              <Calculator className="mr-2" />
              Loan EMI Calculator
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount (₹)
                  </label>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>₹1L</span>
                    <span className="font-semibold text-kfs-primary">
                      ₹{(loanAmount / 100000).toFixed(0)}L
                    </span>
                    <span>₹1Cr</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (% per annum)
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="18"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>8%</span>
                    <span className="font-semibold text-kfs-primary">{interestRate}%</span>
                    <span>18%</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>1 Year</span>
                    <span className="font-semibold text-kfs-primary">{tenure} Years</span>
                    <span>20 Years</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h4 className="text-xl font-bold text-kfs-dark mb-4">Loan Summary</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly EMI:</span>
                    <span className="font-bold text-2xl text-kfs-primary">
                      {formatAmount(emiData.monthlyEMI)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold text-lg">
                      {formatAmount(emiData.totalInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold text-lg">
                      {formatAmount(emiData.totalAmount)}
                    </span>
                  </div>
                </div>
                
                <Link href="/loan-application">
                  <Button className="w-full bg-kfs-primary text-white hover:bg-kfs-secondary mt-6 font-semibold">
                    Apply for this Loan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
