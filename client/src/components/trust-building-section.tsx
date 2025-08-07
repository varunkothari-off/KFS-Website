export default function TrustBuildingSection() {

  const leadership = [
    {
      name: "Shree Arun Kothari",
      role: "Founder & Chief Financial Advisor",
      experience: "40+ years in financial services",
      statement: "Four decades of experience in guiding businesses through complex financial landscapes. My commitment is to ensure every entrepreneur finds the right financial solution for their vision.",
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
    <section id="about" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Meet Your Financial Partners Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              Meet Your Financial Partners
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to understanding your business and connecting you with the right financial solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {leadership.map((leader, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <img 
                  src={leader.image} 
                  alt={`${leader.name} - ${leader.role}`} 
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover" 
                />
                <h3 className="text-xl font-bold text-slate-900 mb-2">{leader.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{leader.role}</p>
                <p className="text-slate-600 text-sm mb-4">{leader.experience}</p>
                <blockquote className="text-slate-700 text-sm leading-relaxed">
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
