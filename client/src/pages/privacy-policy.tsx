import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
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
              Privacy Policy
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
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                  <p className="mb-6 text-white/80">
                    At Kothari Financial Services (KFS), we collect information to provide you with the best financial advisory services. This includes:
                  </p>
                  <ul className="list-disc pl-6 mb-6 space-y-2 text-white/70">
                    <li>Personal identification information (name, email, phone number)</li>
                    <li>Financial information relevant to loan applications</li>
                    <li>Business information and documentation</li>
                    <li>Communication records and service interactions</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                  <p className="mb-6 text-white/80">We use your information to:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2 text-white/70">
                    <li>Process loan applications and provide financial advisory services</li>
                    <li>Communicate with you about your applications and services</li>
                    <li>Comply with legal and regulatory requirements</li>
                    <li>Improve our services and customer experience</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
                  <p className="mb-6 text-white/80">
                    We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 mb-6 space-y-2 text-white/70">
                    <li>Partner banks and financial institutions for loan processing</li>
                    <li>Regulatory authorities as required by law</li>
                    <li>Service providers who assist in our operations (with strict confidentiality agreements)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
                  <p className="mb-6 text-white/80">
                    We implement industry-standard security measures to protect your personal and financial information. This includes encryption, secure servers, and regular security audits.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
                  <p className="mb-6 text-white/80">You have the right to:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2 text-white/70">
                    <li>Access and review your personal information</li>
                    <li>Request corrections to inaccurate information</li>
                    <li>Request deletion of your information (subject to legal requirements)</li>
                    <li>Opt-out of non-essential communications</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies and Tracking</h2>
                  <p className="mb-6 text-white/80">
                    We use cookies and similar technologies to improve your browsing experience and analyze website usage. You can control cookie settings through your browser preferences.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
                  <p className="mb-6 text-white/80">
                    If you have questions about this Privacy Policy or your data, please contact us:
                  </p>
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <p className="text-white/70"><strong className="text-white">Email:</strong> connect@kotharifinancialservices.com</p>
                    <p className="text-white/70"><strong className="text-white">Phone:</strong> +91 70190 56576</p>
                    <p className="text-white/70"><strong className="text-white">Address:</strong> [Business Address]</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to This Policy</h2>
                  <p className="mb-6 text-white/80">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}