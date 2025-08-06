export default function PartnerBanksSection() {
  // Professional bank partners with placeholder logos
  const partners = [
    { name: "State Bank of India", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/State_Bank_of_India_logo.svg/200px-State_Bank_of_India_logo.svg.png" },
    { name: "HDFC Bank", logo: "https://logos-world.net/wp-content/uploads/2020/09/HDFC-Bank-Logo.png" },
    { name: "ICICI Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/200px-ICICI_Bank_Logo.svg.png" },
    { name: "Axis Bank", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Axis_Bank_logo.svg/200px-Axis_Bank_logo.svg.png" },
    { name: "Kotak Mahindra", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Kotak_Mahindra_Bank_logo.svg/200px-Kotak_Mahindra_Bank_logo.svg.png" },
    { name: "Yes Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Yes_Bank_SVG_Logo.svg/200px-Yes_Bank_SVG_Logo.svg.png" },
    { name: "IndusInd Bank", logo: "https://logos-world.net/wp-content/uploads/2021/03/IndusInd-Bank-Logo.png" },
    { name: "Punjab National Bank", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Punjab_National_Bank_logo.png/200px-Punjab_National_Bank_logo.png" }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              Partnered With India's Most Trusted Lenders
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We work with leading financial institutions to secure the best loan terms and rates for your business needs.
            </p>
          </div>
          
          {/* Partner logos grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 lg:gap-12 items-center">
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" 
                />
              </div>
            ))}
          </div>
          
          {/* Trust statement */}
          <div className="text-center mt-12">
            <p className="text-slate-600 text-lg">
              <span className="font-semibold text-slate-900">20+ Banking Partners</span> • 
              <span className="font-semibold text-slate-900"> ₹500+ Crores Facilitated</span> • 
              <span className="font-semibold text-slate-900"> 98% Success Rate</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}