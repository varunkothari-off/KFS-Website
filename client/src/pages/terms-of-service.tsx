import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Scale, Shield, FileText, AlertCircle } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0a0b1e] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0b1e]/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <ArrowLeft className="h-5 w-5" />
                Back to Home
              </a>
            </Link>
            <div className="text-sm text-white/60">
              Last Updated: January 2025
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
              <Scale className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Please read these terms carefully before using our services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Introduction */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <FileText className="h-6 w-6 text-purple-400" />
                1. Introduction
              </h2>
              <p className="text-white/80 leading-relaxed">
                Welcome to Kothari Financial Services ("KFS," "we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website, mobile applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
              </p>
            </div>

            {/* Eligibility */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">2. Eligibility</h2>
              <p className="text-white/80 mb-4">To use our Services, you must:</p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Be a resident of India</li>
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the security of your account credentials</li>
              </ul>
            </div>

            {/* Services Description */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">3. Services Description</h2>
              <p className="text-white/80 mb-4">KFS provides financial advisory and loan facilitation services, including:</p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                <li>Business loan consultation and application assistance</li>
                <li>Property loan advisory services</li>
                <li>Working capital and cash credit facility guidance</li>
                <li>Financial planning and consultation</li>
                <li>Document preparation and verification assistance</li>
                <li>Connection with partner banks and financial institutions</li>
              </ul>
              <div className="mt-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <p className="text-orange-400 text-sm flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>KFS acts as a facilitator and advisor. Final loan approval decisions rest with the lending institutions.</span>
                </p>
              </div>
            </div>

            {/* User Responsibilities */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">4. User Responsibilities</h2>
              <p className="text-white/80 mb-4">As a user of our Services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Update your information promptly when changes occur</li>
                <li>Maintain the confidentiality of your account</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Use the Services only for lawful purposes</li>
                <li>Not misrepresent your identity or affiliation</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>

            {/* Privacy and Data Protection */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Shield className="h-6 w-6 text-purple-400" />
                5. Privacy and Data Protection
              </h2>
              <p className="text-white/80 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy. By using our Services, you consent to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                <li>Collection of personal and financial information necessary for our Services</li>
                <li>Sharing of your information with partner financial institutions</li>
                <li>Use of your data for service improvement and communication</li>
                <li>Storage and processing of your data in accordance with applicable laws</li>
              </ul>
              <p className="mt-4 text-white/80">
                For detailed information, please review our <Link href="/privacy-policy"><a className="text-purple-400 hover:text-purple-300 underline">Privacy Policy</a></Link>.
              </p>
            </div>

            {/* Fees and Payments */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">6. Fees and Payments</h2>
              <p className="text-white/80 mb-4">Our fee structure includes:</p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                <li>Consultation fees (if applicable)</li>
                <li>Processing fees for loan applications</li>
                <li>Documentation charges</li>
                <li>Service fees as communicated during engagement</li>
              </ul>
              <p className="mt-4 text-white/80">
                All fees are non-refundable unless otherwise specified. Payment terms will be clearly communicated before service delivery.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p className="text-white/80">
                All content on our platform, including text, graphics, logos, images, and software, is the property of KFS or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
              </p>
            </div>

            {/* Disclaimers */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">8. Disclaimers</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  <strong className="text-white">No Guarantee of Approval:</strong> KFS does not guarantee loan approval. All applications are subject to the lending institution's criteria and policies.
                </p>
                <p>
                  <strong className="text-white">Information Accuracy:</strong> While we strive for accuracy, information about loan products, interest rates, and terms may change without notice.
                </p>
                <p>
                  <strong className="text-white">Third-Party Services:</strong> We are not responsible for services provided by partner banks or financial institutions.
                </p>
                <p>
                  <strong className="text-white">Financial Advice:</strong> Our services are advisory in nature. Please consult with qualified professionals for specific financial decisions.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
              <p className="text-white/80">
                To the maximum extent permitted by law, KFS shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
            </div>

            {/* Indemnification */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
              <p className="text-white/80">
                You agree to indemnify and hold KFS, its affiliates, officers, directors, employees, and agents harmless from any claims, losses, damages, liabilities, and expenses arising from your use of our Services or violation of these Terms.
              </p>
            </div>

            {/* Governing Law */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
              <p className="text-white/80">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of our Services shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
              <p className="text-white/80">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our Services after any changes indicates your acceptance of the modified Terms.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
              <p className="text-white/80 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="space-y-2 text-white/70">
                <p><strong className="text-white">Kothari Financial Services</strong></p>
                <p>Email: legal@kotharifinancial.com</p>
                <p>Phone: +91 70190 56576</p>
                <p>Address: Bangalore, Karnataka, India</p>
              </div>
            </div>

            {/* Acceptance */}
            <div className="text-center py-8">
              <p className="text-white/60 text-sm">
                By using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <Link href="/">
                <a className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  Return to Home
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}