import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Building, IndianRupee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  business: string;
  category: string;
  loanAmount: string;
  testimonial: string;
  rating: number;
  image?: string;
  location: string;
}

export default function CategorizedTestimonials() {
  const [selectedCategory, setSelectedCategory] = useState("small");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Categorized testimonials with relatable small business stories (Idea #3)
  const testimonials: Testimonial[] = [
    // Small Business Success Stories (Under ₹25 Lakhs)
    {
      id: "1",
      name: "Priya Sharma",
      business: "Priya's Catering Kitchen",
      category: "small",
      loanAmount: "₹5 Lakhs",
      testimonial: "As a first-time loan applicant, I was nervous. KFS made the process incredibly simple. Got my ₹5 lakh loan approved in just 3 days for my kitchen equipment upgrade!",
      rating: 5,
      location: "Kolkata"
    },
    {
      id: "2",
      name: "Rajesh Kumar",
      business: "Kumar Electronics",
      category: "small",
      loanAmount: "₹10 Lakhs",
      testimonial: "My small electronics shop needed inventory funding. KFS understood my cash flow challenges and structured the loan perfectly. The documentation was minimal!",
      rating: 5,
      location: "Delhi"
    },
    {
      id: "3",
      name: "Meera Patel",
      business: "Meera's Boutique",
      category: "small",
      loanAmount: "₹8 Lakhs",
      testimonial: "Starting my boutique seemed impossible until KFS believed in my vision. They guided me through every step. Today, I have two stores!",
      rating: 5,
      location: "Mumbai"
    },
    // Growing Business Stories (₹25 Lakhs - ₹1 Crore)
    {
      id: "4",
      name: "Amit Agarwal",
      business: "AgarwalTextiles Pvt Ltd",
      category: "medium",
      loanAmount: "₹50 Lakhs",
      testimonial: "Expanding from local to regional markets required significant capital. KFS arranged ₹50 lakhs at competitive rates, helping us grow 3x in one year.",
      rating: 5,
      location: "Surat"
    },
    {
      id: "5",
      name: "Sunita Reddy",
      business: "Reddy Logistics",
      category: "medium",
      loanAmount: "₹75 Lakhs",
      testimonial: "Fleet expansion was critical for our growth. KFS structured a perfect loan against property solution. Their expertise saved us lakhs in interest.",
      rating: 5,
      location: "Hyderabad"
    },
    // Enterprise Solutions (Above ₹1 Crore)
    {
      id: "6",
      name: "Vikram Singh",
      business: "Singh Manufacturing",
      category: "large",
      loanAmount: "₹3 Crores",
      testimonial: "Setting up our new manufacturing unit required substantial funding. KFS coordinated with multiple banks to secure the best terms for our ₹3 crore requirement.",
      rating: 5,
      location: "Pune"
    }
  ];

  const categories = [
    { id: "small", label: "Small Business", range: "Under ₹25 Lakhs", icon: "🏪" },
    { id: "medium", label: "Growing Business", range: "₹25L - ₹1Cr", icon: "🏢" },
    { id: "large", label: "Enterprise", range: "Above ₹1 Crore", icon: "🏭" }
  ];

  const filteredTestimonials = testimonials.filter(t => t.category === selectedCategory);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 rounded-full border border-green-500/30 mb-6">
            <Star className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Success Stories</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Real Businesses, Real Success
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            From small startups to large enterprises, see how we've helped businesses at every stage
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentIndex(0);
              }}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className={`
                ${selectedCategory === cat.id 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0' 
                  : 'bg-transparent text-white/70 border-white/20 hover:bg-white/10'
                }
                transition-all duration-300
              `}
            >
              <span className="mr-2 text-lg">{cat.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{cat.label}</div>
                <div className="text-xs opacity-80">{cat.range}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Testimonial Display */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={filteredTestimonials[currentIndex].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-[#141428]/90 backdrop-blur-xl border-white/10">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                        {filteredTestimonials[currentIndex].name.charAt(0)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < filteredTestimonials[currentIndex].rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>

                      <blockquote className="text-white/90 text-lg mb-6 italic">
                        "{filteredTestimonials[currentIndex].testimonial}"
                      </blockquote>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div>
                          <div className="text-white font-semibold">
                            {filteredTestimonials[currentIndex].name}
                          </div>
                          <div className="text-gray-400">
                            {filteredTestimonials[currentIndex].business}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-600/20 rounded-full">
                          <IndianRupee className="w-3 h-3 text-green-400" />
                          <span className="text-green-400 font-semibold">
                            {filteredTestimonials[currentIndex].loanAmount}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-400">
                          <Building className="w-3 h-3" />
                          <span>{filteredTestimonials[currentIndex].location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              onClick={prevTestimonial}
              size="icon"
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextTestimonial}
              size="icon"
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}