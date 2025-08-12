import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Check, ChevronDown, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Document {
  name: string;
  description: string;
  mandatory: boolean;
  category: string;
}

export default function DocumentChecklist() {
  const [loanType, setLoanType] = useState<string>("");
  const [businessType, setBusinessType] = useState<string>("");
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set());

  const documentsByLoanType: Record<string, Document[]> = {
    "working-capital": [
      { name: "PAN Card", description: "Company/Proprietor PAN", mandatory: true, category: "KYC" },
      { name: "Aadhaar Card", description: "All directors/partners", mandatory: true, category: "KYC" },
      { name: "Business Registration", description: "GST/Shop Act/MSME certificate", mandatory: true, category: "Business" },
      { name: "Bank Statements", description: "Last 6 months", mandatory: true, category: "Financial" },
      { name: "GST Returns", description: "Last 12 months GSTR-1 & GSTR-3B", mandatory: true, category: "Financial" },
      { name: "ITR", description: "Last 2 years with computation", mandatory: true, category: "Financial" },
      { name: "Financial Statements", description: "P&L, Balance Sheet for 2 years", mandatory: true, category: "Financial" },
      { name: "Business Proof", description: "Utility bills, rent agreement", mandatory: false, category: "Business" },
    ],
    "term-loan": [
      { name: "PAN Card", description: "Company/Proprietor PAN", mandatory: true, category: "KYC" },
      { name: "Aadhaar Card", description: "All directors/partners", mandatory: true, category: "KYC" },
      { name: "Business Registration", description: "Incorporation certificate, MOA, AOA", mandatory: true, category: "Business" },
      { name: "Bank Statements", description: "Last 12 months", mandatory: true, category: "Financial" },
      { name: "GST Returns", description: "Last 24 months GSTR-1 & GSTR-3B", mandatory: true, category: "Financial" },
      { name: "ITR", description: "Last 3 years with audit reports", mandatory: true, category: "Financial" },
      { name: "Financial Statements", description: "Audited financials for 3 years", mandatory: true, category: "Financial" },
      { name: "Project Report", description: "Detailed project plan with financials", mandatory: true, category: "Business" },
      { name: "Collateral Documents", description: "Property papers if secured", mandatory: false, category: "Collateral" },
      { name: "Board Resolution", description: "For company borrowing", mandatory: false, category: "Business" },
    ],
    "property-loan": [
      { name: "PAN Card", description: "All applicants", mandatory: true, category: "KYC" },
      { name: "Aadhaar Card", description: "All applicants", mandatory: true, category: "KYC" },
      { name: "Property Documents", description: "Sale deed, chain documents", mandatory: true, category: "Property" },
      { name: "Property Tax Receipts", description: "Last 3 years", mandatory: true, category: "Property" },
      { name: "Encumbrance Certificate", description: "Last 13 years", mandatory: true, category: "Property" },
      { name: "Approved Building Plan", description: "Municipality approved", mandatory: true, category: "Property" },
      { name: "Bank Statements", description: "Last 6 months", mandatory: true, category: "Financial" },
      { name: "ITR", description: "Last 2 years", mandatory: true, category: "Financial" },
      { name: "Valuation Report", description: "From bank approved valuer", mandatory: false, category: "Property" },
      { name: "Legal Opinion", description: "From bank panel lawyer", mandatory: false, category: "Property" },
    ],
    "msme": [
      { name: "MSME Certificate", description: "Udyam Registration", mandatory: true, category: "Business" },
      { name: "PAN Card", description: "Business PAN", mandatory: true, category: "KYC" },
      { name: "Aadhaar Card", description: "Proprietor/Partners", mandatory: true, category: "KYC" },
      { name: "GST Certificate", description: "If turnover > 40 lakhs", mandatory: false, category: "Business" },
      { name: "Bank Statements", description: "Last 6 months", mandatory: true, category: "Financial" },
      { name: "Business Vintage Proof", description: "ITR/GST for 1 year", mandatory: true, category: "Financial" },
      { name: "Financial Statements", description: "If available", mandatory: false, category: "Financial" },
      { name: "Business Plan", description: "For startups", mandatory: false, category: "Business" },
    ],
  };

  const additionalDocsByBusiness: Record<string, Document[]> = {
    "manufacturing": [
      { name: "Factory License", description: "Valid factory license", mandatory: true, category: "License" },
      { name: "Pollution Certificate", description: "PCB NOC", mandatory: true, category: "License" },
      { name: "BIS Certificate", description: "If applicable", mandatory: false, category: "License" },
    ],
    "trading": [
      { name: "Trade License", description: "Municipal trade license", mandatory: true, category: "License" },
      { name: "Stock Statement", description: "Current inventory", mandatory: false, category: "Business" },
    ],
    "services": [
      { name: "Service Tax Registration", description: "If applicable", mandatory: false, category: "License" },
      { name: "Professional Certificate", description: "CA/Doctor/Engineer etc.", mandatory: false, category: "License" },
    ],
    "export": [
      { name: "IEC Code", description: "Import Export Code", mandatory: true, category: "License" },
      { name: "Export Orders", description: "Current order book", mandatory: true, category: "Business" },
      { name: "Foreign Currency Account", description: "EEFC account details", mandatory: false, category: "Financial" },
    ],
  };

  const getDocuments = (): Document[] => {
    let docs: Document[] = [];
    if (loanType && documentsByLoanType[loanType]) {
      docs = [...documentsByLoanType[loanType]];
    }
    if (businessType && additionalDocsByBusiness[businessType]) {
      docs = [...docs, ...additionalDocsByBusiness[businessType]];
    }
    return docs;
  };

  const toggleDocument = (docName: string) => {
    const newChecked = new Set(checkedDocs);
    if (newChecked.has(docName)) {
      newChecked.delete(docName);
    } else {
      newChecked.add(docName);
    }
    setCheckedDocs(newChecked);
  };

  const downloadChecklist = () => {
    const docs = getDocuments();
    let content = `DOCUMENT CHECKLIST\n`;
    content += `Loan Type: ${loanType.replace("-", " ").toUpperCase()}\n`;
    if (businessType) {
      content += `Business Type: ${businessType.toUpperCase()}\n`;
    }
    content += `\n${"=".repeat(50)}\n\n`;

    const categories = [...new Set(docs.map(d => d.category))];
    categories.forEach(category => {
      content += `${category.toUpperCase()}\n${"-".repeat(category.length)}\n`;
      docs.filter(d => d.category === category).forEach(doc => {
        const status = checkedDocs.has(doc.name) ? "[✓]" : "[ ]";
        const mandatory = doc.mandatory ? " *" : "";
        content += `${status} ${doc.name}${mandatory}\n`;
        content += `    ${doc.description}\n\n`;
      });
    });

    content += `\n* Mandatory documents\n`;
    content += `Generated on: ${new Date().toLocaleDateString()}\n`;

    // Create and download file
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "loan-document-checklist.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const documents = getDocuments();
  const categories = [...new Set(documents.map(d => d.category))];
  const progress = documents.length > 0 
    ? Math.round((checkedDocs.size / documents.filter(d => d.mandatory).length) * 100)
    : 0;

  return (
    <section className="py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Document Checklist Generator
              </span>
            </h2>
            <p className="text-white/60 text-lg">
              Get a personalized list of documents required for your loan application
            </p>
          </div>

          {/* Selectors */}
          <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">Select Loan Type *</label>
                <Select value={loanType} onValueChange={setLoanType}>
                  <SelectTrigger className="w-full bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Choose loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="working-capital">Working Capital Loan</SelectItem>
                    <SelectItem value="term-loan">Business Term Loan</SelectItem>
                    <SelectItem value="property-loan">Loan Against Property</SelectItem>
                    <SelectItem value="msme">MSME Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Business Type (Optional)</label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger className="w-full bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="trading">Trading/Retail</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="export">Export/Import</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Document List */}
          <AnimatePresence>
            {documents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-white/60 mb-2">
                    <span>Mandatory Documents Progress</span>
                    <span>{progress}% Complete</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Documents by Category */}
                <div className="space-y-6">
                  {categories.map((category) => (
                    <div key={category} className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-400" />
                        {category} Documents
                      </h3>
                      <div className="space-y-3">
                        {documents
                          .filter(doc => doc.category === category)
                          .map((doc) => (
                            <label
                              key={doc.name}
                              className="flex items-start gap-3 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={checkedDocs.has(doc.name)}
                                onChange={() => toggleDocument(doc.name)}
                                className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-purple-600 focus:ring-purple-500"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-medium">{doc.name}</span>
                                  {doc.mandatory && (
                                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                                      Required
                                    </span>
                                  )}
                                </div>
                                <p className="text-white/60 text-sm mt-1">{doc.description}</p>
                              </div>
                            </label>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button
                    onClick={downloadChecklist}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 transition-transform"
                  >
                    <Download className="mr-2 w-4 h-4" />
                    Download Checklist
                  </Button>
                  <Button
                    onClick={() => window.print()}
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    <Printer className="mr-2 w-4 h-4" />
                    Print Checklist
                  </Button>
                </div>

                {/* Help Text */}
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400 text-sm">
                    💡 <strong>Pro Tip:</strong> Keep digital copies of all documents ready. Most banks now accept scanned copies for initial verification.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {documents.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg">
                Select a loan type to see required documents
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}