import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      rating: 5,
      content: "KFS made our loan process incredibly smooth. What would have taken months was completed in just 2 weeks. Their team understood our business needs perfectly.",
      author: "Rajesh Agarwal",
      role: "Manufacturing Business Owner",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      rating: 5,
      content: "Exceptional service and competitive rates. The digital platform is user-friendly and the team is always available to help. Highly recommended!",
      author: "Priya Bansal",
      role: "Textile Trading Business",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      rating: 5,
      content: "Professional approach and transparent communication throughout. They helped us secure the best loan terms available in the market.",
      author: "Vikash Gupta",
      role: "IT Services Company",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#141428] to-[#0a0b1e] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-1/3 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Real Success Stories
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            See how we've helped businesses like yours achieve their financial goals with trusted partnerships and expert guidance.
          </p>
        </div>
        
        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-16 bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/50 p-8 md:p-12 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20 pulse-glow">
          <div className="flex justify-center mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 md:w-6 h-5 md:h-6 fill-current" />
              ))}
            </div>
          </div>
          <blockquote className="text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-8">
            "KFS made our loan process incredibly smooth. What would have taken months was completed in just 2 weeks. Their team understood our business needs perfectly."
          </blockquote>
          <div className="flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
              alt="Rajesh Agarwal - Manufacturing Business Owner - 5 star review for Kothari Financial Services loan process" 
              className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-purple-500/30"
              loading="lazy"
              width="64"
              height="64" 
            />
            <div className="text-left">
              <div className="font-bold text-white">Rajesh Agarwal</div>
              <div className="text-gray-400">Manufacturing Business Owner</div>
            </div>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {testimonials.slice(1).map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-[#141428]/50 to-[#1a1b3a]/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8 hover:border-purple-500/30 transition-all">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.author} testimonial`} 
                  className="w-12 h-12 rounded-full mr-4 object-cover border border-purple-500/30" 
                />
                <div>
                  <div className="font-bold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
