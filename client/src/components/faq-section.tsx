import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is the minimum loan amount I can apply for?",
      answer: "The minimum loan amount starts from ₹5 lakhs for unsecured business loans and ₹10 lakhs for property-backed loans. The exact amount depends on your business profile, credit history, and repayment capacity."
    },
    {
      question: "How quickly can I get my business loan approved?",
      answer: "We offer one of the fastest approval processes in the industry. For complete documentation, approval can be received within 24-48 hours. The entire disbursement process typically takes 7-10 working days for secured loans and 3-5 days for unsecured loans."
    },
    {
      question: "What documents are required for a business loan application?",
      answer: "Basic documents include: KYC documents (Aadhaar, PAN), business registration proof, GST returns for last 12 months, bank statements for last 6 months, ITR for last 2 years, and property documents (for secured loans). Additional documents may be required based on loan type."
    },
    {
      question: "What is the maximum loan amount available?",
      answer: "We facilitate business loans up to ₹50 crores depending on your business turnover, profitability, and collateral offered. For unsecured loans, the maximum limit is typically ₹2 crores."
    },
    {
      question: "What are the interest rates for business loans?",
      answer: "Interest rates start from 10.5% per annum for secured loans and 14% for unsecured loans. The exact rate depends on your credit score, business vintage, loan amount, and tenure. We work with 30+ banks to get you the most competitive rates."
    },
    {
      question: "Can startup businesses apply for loans?",
      answer: "Yes, startups with a minimum of 6 months in business can apply. We have special loan products for startups including government-backed schemes like MUDRA loans and Stand-Up India. The eligibility criteria is more flexible for startups."
    },
    {
      question: "What is the loan repayment tenure?",
      answer: "Repayment tenure ranges from 12 months to 15 years depending on the loan type. Working capital loans typically have 12-36 months tenure, while property-backed term loans can extend up to 15 years."
    },
    {
      question: "Do you charge any processing fees?",
      answer: "Yes, there is a nominal processing fee ranging from 1% to 3% of the loan amount, depending on the bank and loan product. This fee is charged by the lending bank and is typically deducted from the disbursed amount."
    },
    {
      question: "Can I prepay my loan without penalties?",
      answer: "Most of our partner banks allow prepayment after 6-12 months with minimal or no prepayment charges. The exact terms depend on your loan agreement. We always negotiate for the most flexible prepayment terms for our clients."
    },
    {
      question: "What happens if my loan application is rejected?",
      answer: "If rejected, we provide detailed feedback on the reasons and work with you to address the issues. We can explore alternative lending options, suggest improvements to your application, or connect you with NBFCs that have different eligibility criteria."
    },
    {
      question: "Is collateral mandatory for all business loans?",
      answer: "No, collateral is not mandatory for all loans. We offer unsecured business loans up to ₹2 crores based on your business cash flows and credit history. However, secured loans typically offer lower interest rates and higher loan amounts."
    },
    {
      question: "How is loan eligibility calculated?",
      answer: "Loan eligibility is calculated based on multiple factors including annual turnover, profit margins, existing EMIs, credit score (minimum 650), business vintage, and industry type. We use advanced algorithms to match you with the most suitable lenders."
    }
  ];

  // Generate FAQ schema structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#0a0b1e] to-[#141428] relative overflow-hidden">
      {/* Insert FAQ Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-white/60 text-lg">
              Everything you need to know about our business loan services
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-xl"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-white font-medium pr-4" itemProp="name">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-purple-400" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <div className="px-6 pb-5 text-white/70 leading-relaxed" itemProp="text">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <p className="text-white/60 mb-6">
              Still have questions? Our experts are here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/consultation"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Book Free Consultation
              </a>
              <a
                href="https://wa.me/917019056576"
                className="px-8 py-3 bg-green-600/20 border border-green-500/50 text-green-400 rounded-full font-semibold hover:bg-green-600/30 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}