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
    <section id="about" className="py-12 md:py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-10 right-40 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-3000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Meet Your Financial Partners Section */}
        <div className="mb-12 md:mb-24">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Meet Your Financial Partners
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              Experienced professionals dedicated to understanding your business and connecting you with the right financial solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 max-w-6xl mx-auto">
            {leadership.map((leader, index) => (
              <div key={index} className="text-center bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 data-highlight">
                <img 
                  src={leader.image} 
                  alt={`${leader.name} - ${leader.role}`} 
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-2 border-purple-500/30" 
                />
                <h3 className="text-xl font-bold text-white mb-2">{leader.name}</h3>
                <p className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium mb-2">{leader.role}</p>
                <p className="text-gray-500 text-sm mb-4">{leader.experience}</p>
                <blockquote className="text-gray-400 text-sm leading-relaxed italic">
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
