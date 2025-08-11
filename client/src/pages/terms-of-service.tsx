import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsOfService() {
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
              Terms of Service
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10">
            <CardContent className="p-8">
              <p className="text-white/60 mb-8">Last updated: January 2025</p>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                  <p className="mb-6 text-white/80">
                    By accessing and using the services of Kothari Financial Services (KFS), you agree to be bound by these Terms of Service and all applicable laws and regulations.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Services</h2>
                  <p className="mb-6 text-white/80">
                    KFS provides financial advisory services, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 mb-6 space-y-2 text-white/70">
                    <li>Loan application assistance and processing</li>
                    <li>Financial consultation and advisory services</li>
                    <li>Connection with partner banks and financial institutions</li>
                    <li>Business financial planning guidance</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
                  <p className="mb-6 text-white/80">As a user of our services, you agree to:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2 text-white/70">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the confidentiality of your account information</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Not misuse our services or interfere with their operation</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Service Availability</h2>
                  <p className="mb-6 text-white/80">
                    While we strive to maintain continuous service availability, we do not guarantee uninterrupted access to our services. We may temporarily suspend services for maintenance or updates.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Fees and Payments</h2>
                  <p className="mb-6 text-white/80">
                    Our fee structure will be clearly communicated before engaging our services. Payment terms and conditions will be outlined in separate service agreements.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
                  <p className="mb-6 text-white/80">
                    KFS acts as an intermediary and advisor. We are not responsible for:
                  </p>
                  <ul className="list-disc pl-6 mb-6 space-y-2 text-white/70">
                    <li>Loan approval or rejection decisions by financial institutions</li>
                    <li>Changes in market conditions or interest rates</li>
                    <li>Delays in processing by third-party institutions</li>
                    <li>Any consequential or indirect damages</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Confidentiality</h2>
                  <p className="mb-6 text-white/80">
                    We maintain strict confidentiality of all client information and financial data in accordance with industry standards and regulatory requirements.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Intellectual Property</h2>
                  <p className="mb-6 text-white/80">
                    All content, trademarks, and intellectual property on our website and services remain the property of KFS or our licensors.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">9. Termination</h2>
                  <p className="mb-6 text-white/80">
                    Either party may terminate the service agreement with appropriate notice. Upon termination, your obligations under these terms continue for provisions that by their nature should survive.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">10. Governing Law</h2>
                  <p className="mb-6 text-white/80">
                    These terms are governed by the laws of India. Any disputes will be resolved through appropriate legal channels in the jurisdiction where KFS is registered.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Information</h2>
                  <p className="mb-6 text-white/80">
                    For questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <p className="text-white/70"><strong className="text-white">Email:</strong> connect@kotharifinancialservices.com</p>
                    <p className="text-white/70"><strong className="text-white">Phone:</strong> +91 70190 56576</p>
                    <p className="text-white/70"><strong className="text-white">Business Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}