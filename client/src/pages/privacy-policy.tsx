import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Shield, Lock, Eye, Database, Users, Globe, Bell } from "lucide-react";

export default function PrivacyPolicy() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Your privacy is our priority. Learn how we collect, use, and protect your information.
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
                <Lock className="h-6 w-6 text-cyan-400" />
                1. Introduction
              </h2>
              <p className="text-white/80 leading-relaxed">
                Kothari Financial Services ("KFS," "we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile applications, and services.
              </p>
              <p className="text-white/80 mt-4">
                By using our Services, you consent to the data practices described in this policy. If you do not agree with this policy, please do not use our Services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Database className="h-6 w-6 text-cyan-400" />
                2. Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-cyan-300">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                    <li>Full name and contact details (email, phone number, address)</li>
                    <li>Date of birth and gender</li>
                    <li>PAN card, Aadhaar card, and other government-issued IDs</li>
                    <li>Photographs and signatures</li>
                    <li>Educational and professional qualifications</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-cyan-300">Financial Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                    <li>Income details and employment information</li>
                    <li>Bank account statements and transaction history</li>
                    <li>Tax returns and GST information</li>
                    <li>Credit history and CIBIL score</li>
                    <li>Business financial statements (if applicable)</li>
                    <li>Asset and liability details</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-cyan-300">Technical Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                    <li>IP address and device information</li>
                    <li>Browser type and operating system</li>
                    <li>Cookies and usage data</li>
                    <li>Location data (with your permission)</li>
                    <li>Login and access times</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Eye className="h-6 w-6 text-cyan-400" />
                3. How We Use Your Information
              </h2>
              <p className="text-white/80 mb-4">We use the collected information for:</p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                <li>Processing loan applications and financial service requests</li>
                <li>Verifying your identity and conducting KYC procedures</li>
                <li>Assessing creditworthiness and loan eligibility</li>
                <li>Communicating with you about your applications and services</li>
                <li>Providing customer support and responding to inquiries</li>
                <li>Improving our services and developing new features</li>
                <li>Complying with legal and regulatory requirements</li>
                <li>Preventing fraud and ensuring security</li>
                <li>Marketing and promotional activities (with your consent)</li>
                <li>Analytics and research to enhance user experience</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Users className="h-6 w-6 text-cyan-400" />
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-white/80 mb-4">We may share your information with:</p>
              
              <div className="space-y-4">
                <div className="pl-4 border-l-2 border-cyan-500/50">
                  <h4 className="font-semibold text-white mb-2">Financial Institutions</h4>
                  <p className="text-white/70">Partner banks, NBFCs, and lending institutions for loan processing and approval</p>
                </div>
                
                <div className="pl-4 border-l-2 border-cyan-500/50">
                  <h4 className="font-semibold text-white mb-2">Service Providers</h4>
                  <p className="text-white/70">Third-party vendors who assist in providing our services (e.g., payment processors, cloud storage)</p>
                </div>
                
                <div className="pl-4 border-l-2 border-cyan-500/50">
                  <h4 className="font-semibold text-white mb-2">Credit Bureaus</h4>
                  <p className="text-white/70">For credit checks and reporting as required by regulations</p>
                </div>
                
                <div className="pl-4 border-l-2 border-cyan-500/50">
                  <h4 className="font-semibold text-white mb-2">Legal Authorities</h4>
                  <p className="text-white/70">When required by law, court order, or government regulations</p>
                </div>
                
                <div className="pl-4 border-l-2 border-cyan-500/50">
                  <h4 className="font-semibold text-white mb-2">Business Transfers</h4>
                  <p className="text-white/70">In case of merger, acquisition, or sale of assets</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <p className="text-cyan-400 text-sm">
                  We never sell your personal information to third parties for marketing purposes.
                </p>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Lock className="h-6 w-6 text-cyan-400" />
                5. Data Security
              </h2>
              <p className="text-white/80 mb-4">
                We implement robust security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                <li>256-bit SSL encryption for data transmission</li>
                <li>Secure servers with firewall protection</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection</li>
                <li>Compliance with industry standards (ISO 27001)</li>
                <li>Regular data backups and disaster recovery procedures</li>
              </ul>
              <p className="text-white/80 mt-4">
                Despite our efforts, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your information.
              </p>
            </div>

            {/* Data Retention */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
              <p className="text-white/80 mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                <li>Provide our services and maintain your account</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Maintain business records as per applicable laws</li>
              </ul>
              <p className="text-white/80 mt-4">
                Financial records are typically retained for 7 years as per regulatory requirements. You may request deletion of your data, subject to legal obligations.
              </p>
            </div>

            {/* Your Rights */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
              <p className="text-white/80 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                <li><strong className="text-white">Access:</strong> Request copies of your personal information</li>
                <li><strong className="text-white">Correction:</strong> Update or correct inaccurate information</li>
                <li><strong className="text-white">Deletion:</strong> Request removal of your data (subject to legal requirements)</li>
                <li><strong className="text-white">Portability:</strong> Receive your data in a structured format</li>
                <li><strong className="text-white">Objection:</strong> Object to certain processing activities</li>
                <li><strong className="text-white">Consent Withdrawal:</strong> Withdraw consent for marketing communications</li>
              </ul>
              <p className="text-white/80 mt-4">
                To exercise these rights, contact us at privacy@kotharifinancial.com
              </p>
            </div>

            {/* Cookies Policy */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Globe className="h-6 w-6 text-cyan-400" />
                8. Cookies and Tracking Technologies
              </h2>
              <p className="text-white/80 mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Authenticate and maintain your session</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Improve website performance and user experience</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
              <p className="text-white/80 mt-4">
                You can control cookies through your browser settings. Disabling cookies may affect some features of our Services.
              </p>
            </div>

            {/* Third-Party Links */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">9. Third-Party Links and Services</h2>
              <p className="text-white/80">
                Our Services may contain links to third-party websites and services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
              <p className="text-white/80">
                Our Services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware of such collection, we will delete the information immediately.
              </p>
            </div>

            {/* Updates to Policy */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Bell className="h-6 w-6 text-cyan-400" />
                11. Updates to This Policy
              </h2>
              <p className="text-white/80">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 ml-4 mt-4">
                <li>Email notifications to registered users</li>
                <li>Prominent notices on our website</li>
                <li>In-app notifications</li>
              </ul>
              <p className="text-white/80 mt-4">
                The "Last Updated" date at the top indicates the latest revision. Continued use after changes constitutes acceptance.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
              <p className="text-white/80 mb-4">
                For questions, concerns, or requests regarding this Privacy Policy or your personal information:
              </p>
              <div className="space-y-2 text-white/70">
                <p><strong className="text-white">Data Protection Officer</strong></p>
                <p>Kothari Financial Services</p>
                <p>Email: privacy@kotharifinancial.com</p>
                <p>Phone: +91 70190 56576</p>
                <p>Address: Bangalore, Karnataka, India</p>
              </div>
              <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <p className="text-purple-400 text-sm">
                  We aim to respond to all privacy-related inquiries within 48 hours.
                </p>
              </div>
            </div>

            {/* Acceptance */}
            <div className="text-center py-8">
              <p className="text-white/60 text-sm mb-4">
                By using our Services, you acknowledge that you have read and understood this Privacy Policy.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/terms-of-service">
                  <a className="text-cyan-400 hover:text-cyan-300 underline">
                    View Terms of Service
                  </a>
                </Link>
                <Link href="/">
                  <a className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:from-cyan-600 hover:to-purple-600 transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                    Return to Home
                  </a>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}