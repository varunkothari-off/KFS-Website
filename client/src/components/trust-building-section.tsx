export default function TrustBuildingSection() {
  const bankPartners = [
    "HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak", "Yes Bank"
  ];

  const leadership = [
    {
      name: "Shree Arun Kothari",
      role: "Founder, CEO & CFO",
      experience: "25+ years in financial services",
      statement: "Building trust through transparency and delivering exceptional financial solutions for every entrepreneur's growth journey.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Smt. Padma Kothari",
      role: "Chief Human Resources Officer",
      experience: "20+ years in organizational development",
      statement: "Our people are our greatest asset. We nurture talent that understands and serves our clients with genuine care and expertise.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Shree Varun Kothari",
      role: "Chief Technology Officer",
      experience: "15+ years in fintech innovation",
      statement: "Technology should simplify, not complicate. We build platforms that make financial services accessible and secure for all.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Partner Banks Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-kfs-dark mb-4">
            Trusted by Leading Financial Institutions
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            We work with 20+ banks and NBFCs to get you the best rates
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {bankPartners.map((bank, index) => (
              <div key={index} className="h-16 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                <span className="text-gray-600 font-semibold text-sm">{bank}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-kfs-dark mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600">Experienced professionals committed to your success</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {leadership.map((leader, index) => (
              <div key={index} className="text-center group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={leader.image} 
                  alt={`${leader.name} - ${leader.role}`} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg group-hover:shadow-xl transition-shadow" 
                />
                <h3 className="text-xl font-bold text-kfs-dark">{leader.name}</h3>
                <p className="text-kfs-primary font-medium mb-2">{leader.role}</p>
                <p className="text-gray-600 text-sm mb-3">{leader.experience}</p>
                <blockquote className="text-gray-700 italic text-sm leading-relaxed">
                  "{leader.statement}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
