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
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">Real Success Stories</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See how we've helped businesses like yours achieve their financial goals with trusted partnerships and expert guidance.
          </p>
        </div>
        
        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
          </div>
          <blockquote className="text-2xl lg:text-3xl text-slate-900 font-medium leading-relaxed mb-8">
            "KFS made our loan process incredibly smooth. What would have taken months was completed in just 2 weeks. Their team understood our business needs perfectly."
          </blockquote>
          <div className="flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
              alt="Rajesh Agarwal testimonial" 
              className="w-16 h-16 rounded-full mr-4 object-cover" 
            />
            <div className="text-left">
              <div className="font-bold text-slate-900">Rajesh Agarwal</div>
              <div className="text-slate-600">Manufacturing Business Owner</div>
            </div>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.slice(1).map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex text-yellow-500 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.author} testimonial`} 
                  className="w-12 h-12 rounded-full mr-4 object-cover" 
                />
                <div>
                  <div className="font-bold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
