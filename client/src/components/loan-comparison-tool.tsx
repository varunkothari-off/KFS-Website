import { useState } from "react";
import { Check, X, Info } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LoanProduct {
  id: string;
  name: string;
  type: string;
  interestRate: string;
  maxAmount: string;
  tenure: string;
  processingFee: string;
  collateral: boolean;
  features: string[];
  eligibility: string[];
  bestFor: string;
  popular?: boolean;
}

export default function LoanComparisonTool() {
  const loanProducts: LoanProduct[] = [
    {
      id: "working-capital",
      name: "Working Capital Loan",
      type: "Short-term Finance",
      interestRate: "11.5% - 16%",
      maxAmount: "₹5 Cr",
      tenure: "12 - 36 months",
      processingFee: "1% - 2%",
      collateral: false,
      features: [
        "Quick disbursement",
        "Flexible repayment",
        "No collateral up to ₹2 Cr",
        "Overdraft facility available"
      ],
      eligibility: [
        "Min 1 year in business",
        "₹10 Lakh+ turnover",
        "650+ credit score"
      ],
      bestFor: "Daily operations & inventory management"
    },
    {
      id: "term-loan",
      name: "Business Term Loan",
      type: "Long-term Finance",
      interestRate: "10.5% - 14%",
      maxAmount: "₹50 Cr",
      tenure: "12 - 84 months",
      processingFee: "1% - 3%",
      collateral: true,
      features: [
        "Large loan amounts",
        "Lower interest rates",
        "Fixed EMI structure",
        "Tax benefits available"
      ],
      eligibility: [
        "Min 2 years in business",
        "₹25 Lakh+ turnover",
        "Property as collateral"
      ],
      bestFor: "Expansion, machinery purchase, long-term investments",
      popular: true
    },
    {
      id: "lap",
      name: "Loan Against Property",
      type: "Secured Loan",
      interestRate: "9% - 12%",
      maxAmount: "₹10 Cr",
      tenure: "Up to 15 years",
      processingFee: "0.5% - 1%",
      collateral: true,
      features: [
        "Lowest interest rates",
        "Longest tenure",
        "High loan amount",
        "Property remains yours"
      ],
      eligibility: [
        "Property ownership",
        "Clear property title",
        "Regular income proof"
      ],
      bestFor: "Large capital requirements with owned property"
    },
    {
      id: "msme",
      name: "MSME Loan",
      type: "Government Backed",
      interestRate: "8% - 12%",
      maxAmount: "₹1 Cr",
      tenure: "12 - 60 months",
      processingFee: "0.5% - 1%",
      collateral: false,
      features: [
        "Government subsidy",
        "CGTMSE coverage",
        "Priority sector lending",
        "Lower interest rates"
      ],
      eligibility: [
        "MSME registration",
        "₹5 Lakh+ turnover",
        "GST registered"
      ],
      bestFor: "Small businesses and startups with MSME registration"
    }
  ];

  const [selectedLoans, setSelectedLoans] = useState<string[]>(["working-capital", "term-loan"]);

  const toggleLoan = (loanId: string) => {
    if (selectedLoans.includes(loanId)) {
      if (selectedLoans.length > 1) {
        setSelectedLoans(selectedLoans.filter(id => id !== loanId));
      }
    } else {
      if (selectedLoans.length < 3) {
        setSelectedLoans([...selectedLoans, loanId]);
      }
    }
  };

  const selectedProducts = loanProducts.filter(loan => selectedLoans.includes(loan.id));

  return (
    <section className="py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Compare Loan Products
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Select up to 3 loan products to compare side-by-side and find the perfect match for your business needs
          </p>
        </div>

        {/* Loan Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {loanProducts.map((loan) => (
              <button
                key={loan.id}
                onClick={() => toggleLoan(loan.id)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  selectedLoans.includes(loan.id)
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-transparent"
                    : "bg-white/5 text-white/60 border-white/20 hover:bg-white/10"
                } ${selectedLoans.length >= 3 && !selectedLoans.includes(loan.id) ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={selectedLoans.length >= 3 && !selectedLoans.includes(loan.id)}
              >
                {loan.name}
                {loan.popular && (
                  <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="text-center text-white/40 text-sm mt-3">
            {selectedLoans.length}/3 products selected for comparison
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[768px]">
            <div className="grid grid-cols-[200px_repeat(3,1fr)] gap-4">
              {/* Header Row */}
              <div className="sticky left-0 bg-[#0a0b1e] z-10"></div>
              {selectedProducts.map((loan) => (
                <motion.div
                  key={loan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <h3 className="font-bold text-white text-lg mb-2">{loan.name}</h3>
                  <p className="text-purple-400 text-sm">{loan.type}</p>
                  {loan.popular && (
                    <span className="inline-block mt-2 text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                </motion.div>
              ))}

              {/* Comparison Rows */}
              <ComparisonRow label="Interest Rate" icon={<Info />}>
                {selectedProducts.map((loan) => (
                  <div key={loan.id} className="text-white font-semibold">
                    {loan.interestRate}
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Max Loan Amount">
                {selectedProducts.map((loan) => (
                  <div key={loan.id} className="text-cyan-400 font-bold text-lg">
                    {loan.maxAmount}
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Tenure">
                {selectedProducts.map((loan) => (
                  <div key={loan.id} className="text-white/80">
                    {loan.tenure}
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Processing Fee">
                {selectedProducts.map((loan) => (
                  <div key={loan.id} className="text-white/80">
                    {loan.processingFee}
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Collateral Required">
                {selectedProducts.map((loan) => (
                  <div key={loan.id}>
                    {loan.collateral ? (
                      <span className="text-yellow-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Yes
                      </span>
                    ) : (
                      <span className="text-green-400 flex items-center gap-1">
                        <Check className="w-4 h-4" /> No
                      </span>
                    )}
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Key Features">
                {selectedProducts.map((loan) => (
                  <div key={loan.id} className="space-y-2">
                    {loan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Eligibility">
                {selectedProducts.map((loan) => (
                  <div key={loan.id} className="space-y-1">
                    {loan.eligibility.map((item, idx) => (
                      <div key={idx} className="text-white/60 text-sm">
                        • {item}
                      </div>
                    ))}
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Best For">
                {selectedProducts.map((loan) => (
                  <div key={loan.id} className="text-purple-300 text-sm font-medium">
                    {loan.bestFor}
                  </div>
                ))}
              </ComparisonRow>

              {/* CTA Row */}
              <div className="sticky left-0 bg-[#0a0b1e] z-10"></div>
              {selectedProducts.map((loan) => (
                <div key={loan.id} className="pt-4">
                  <a href="/loan-application" className="block">
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform">
                      Apply Now
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View Notice */}
        <div className="md:hidden mt-6 text-center text-white/40 text-sm">
          <p>Scroll horizontally to view all products →</p>
        </div>
      </div>
    </section>
  );
}

function ComparisonRow({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <>
      <div className="sticky left-0 bg-[#0a0b1e] z-10 flex items-center gap-2 text-white/60 font-medium py-4 pr-4">
        {icon && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {icon}
              </TooltipTrigger>
              <TooltipContent>
                <p>Click for more information</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {label}
      </div>
      {children}
    </>
  );
}