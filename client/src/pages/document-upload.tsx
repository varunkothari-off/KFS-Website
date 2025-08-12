import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Upload, FileText, ArrowRight, CheckCircle, Loader2, FileUp, File, X } from "lucide-react";
import Logo from "@/components/logo";
import { useMutation } from "@tanstack/react-query";

interface DocumentFile {
  file: File;
  type: string;
  preview?: string;
}

export default function DocumentUpload() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'upload' | 'review' | 'complete'>('upload');

  const documentTypes = [
    { id: 'aadhaar', label: 'Aadhaar Card', accept: '.pdf,.jpg,.jpeg,.png' },
    { id: 'pan', label: 'PAN Card', accept: '.pdf,.jpg,.jpeg,.png' },
    { id: 'gst', label: 'GST Certificate', accept: '.pdf' },
    { id: 'bank_statement', label: 'Bank Statement', accept: '.pdf' },
    { id: 'business_proof', label: 'Business Registration', accept: '.pdf' },
    { id: 'financial_statement', label: 'Financial Statement', accept: '.pdf,.xlsx' }
  ];

  const handleFileUpload = (type: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const newDoc: DocumentFile = {
      file,
      type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    };
    
    setDocuments(prev => [...prev.filter(d => d.type !== type), newDoc]);
  };

  const removeDocument = (type: string) => {
    setDocuments(prev => prev.filter(d => d.type !== type));
  };

  const processDocuments = async () => {
    setIsProcessing(true);
    
    // Simulate document processing and text extraction
    // In production, this would upload to server and use OCR/text extraction
    setTimeout(() => {
      const mockExtractedData = {
        fullName: documents.find(d => d.type === 'aadhaar') ? 'Rajesh Kumar' : '',
        mobile: documents.find(d => d.type === 'aadhaar') ? '9876543210' : '',
        email: 'rajesh.kumar@example.com',
        pan: documents.find(d => d.type === 'pan') ? 'ABCDE1234F' : '',
        businessName: documents.find(d => d.type === 'gst') ? 'Kumar Enterprises' : '',
        gstNumber: documents.find(d => d.type === 'gst') ? '29ABCDE1234F1Z5' : '',
        businessType: 'Manufacturing',
        annualRevenue: documents.find(d => d.type === 'financial_statement') ? '₹50,00,000' : '',
        address: 'Mumbai, Maharashtra',
        bankName: documents.find(d => d.type === 'bank_statement') ? 'State Bank of India' : '',
        accountNumber: documents.find(d => d.type === 'bank_statement') ? 'XXXX-XXXX-1234' : ''
      };
      
      setExtractedData(mockExtractedData);
      setIsProcessing(false);
      setStep('review');
      
      toast({
        title: "Documents Processed",
        description: "We've extracted your information. Please review and confirm.",
      });
    }, 3000);
  };

  const createProfile = async () => {
    setIsProcessing(true);
    
    // Create user profile with extracted data
    try {
      const formData = new FormData();
      documents.forEach(doc => {
        formData.append(doc.type, doc.file);
      });
      formData.append('extractedData', JSON.stringify(extractedData));
      
      // In production, this would create the actual profile
      setTimeout(() => {
        localStorage.setItem('userProfile', JSON.stringify(extractedData));
        localStorage.setItem('profileCreated', 'true');
        setStep('complete');
        setIsProcessing(false);
        
        toast({
          title: "Profile Created Successfully",
          description: "Your profile has been created with the extracted information.",
        });
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          setLocation('/dashboard');
        }, 2000);
      }, 2000);
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b1e] via-[#141428] to-[#0a0b1e] p-4">
      {/* Header */}
      <header className="mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center space-x-3">
              <Logo className="w-10 h-10" />
              <span className="text-xl font-bold text-white">Kothari Financial Services</span>
            </a>
          </Link>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl">
        {step === 'upload' && (
          <Card className="bg-[#141428]/90 backdrop-blur-xl border-white/10">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-2">
                Quick Profile Setup
              </CardTitle>
              <CardDescription className="text-gray-400">
                Upload your documents and we'll automatically extract your information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 mb-6">
                <p className="text-white text-sm">
                  <strong>Smart Document Processing:</strong> Our AI-powered system extracts information from your documents to create your profile instantly.
                </p>
              </div>

              <div className="grid gap-4">
                {documentTypes.map((docType) => {
                  const uploadedDoc = documents.find(d => d.type === docType.id);
                  
                  return (
                    <div key={docType.id} className="border border-white/10 rounded-lg p-4 hover:border-purple-500/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label className="text-white font-medium">
                            {docType.label}
                          </Label>
                          {uploadedDoc ? (
                            <div className="flex items-center gap-2 mt-2">
                              <File className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-green-400">{uploadedDoc.file.name}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDocument(docType.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 mt-1">
                              Upload {docType.accept.replace(/\./g, '').replace(/,/g, ', ')} files
                            </p>
                          )}
                        </div>
                        {!uploadedDoc && (
                          <div>
                            <Input
                              type="file"
                              accept={docType.accept}
                              onChange={(e) => handleFileUpload(docType.id, e.target.files)}
                              className="hidden"
                              id={`upload-${docType.id}`}
                            />
                            <Label
                              htmlFor={`upload-${docType.id}`}
                              className="cursor-pointer"
                            >
                              <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white/20 bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload
                              </div>
                            </Label>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center mt-8">
                <p className="text-sm text-gray-400">
                  {documents.length} of {documentTypes.length} documents uploaded
                </p>
                <Button
                  onClick={processDocuments}
                  disabled={documents.length === 0 || isProcessing}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Process Documents
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'review' && extractedData && (
          <Card className="bg-[#141428]/90 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Review Extracted Information
              </CardTitle>
              <CardDescription className="text-gray-400">
                Please verify the information we extracted from your documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-400">Full Name</Label>
                  <Input value={extractedData.fullName} className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Mobile</Label>
                  <Input value={extractedData.mobile} className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Email</Label>
                  <Input value={extractedData.email} className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">PAN Number</Label>
                  <Input value={extractedData.pan} className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Business Name</Label>
                  <Input value={extractedData.businessName} className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">GST Number</Label>
                  <Input value={extractedData.gstNumber} className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Annual Revenue</Label>
                  <Input value={extractedData.annualRevenue} className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Bank Name</Label>
                  <Input value={extractedData.bankName} className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep('upload')}
                  className="border-white/20"
                >
                  Back to Documents
                </Button>
                <Button
                  onClick={createProfile}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Profile...
                    </>
                  ) : (
                    <>
                      Create Profile
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'complete' && (
          <Card className="bg-[#141428]/90 backdrop-blur-xl border-white/10">
            <CardContent className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Profile Created Successfully!</h2>
              <p className="text-gray-400">Redirecting to your dashboard...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}