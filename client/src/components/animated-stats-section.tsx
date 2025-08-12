import { useState, useEffect, useRef } from "react";

interface StatItemProps {
  value: string;
  label: string;
  animatedValue?: number;
}

function StatItem({ value, label, animatedValue }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (animatedValue !== undefined && !hasAnimated) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const increment = animatedValue / steps;
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        setDisplayValue(Math.min(increment * currentStep, animatedValue));
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setHasAnimated(true);
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [animatedValue, hasAnimated]);
  
  const formatValue = (val: number) => {
    if (value.includes('Cr')) {
      return `₹${Math.round(val)}+ Cr`;
    } else if (value.includes('%')) {
      return `${Math.round(val)}%`;
    } else if (value.includes('+')) {
      return `${Math.round(val)}+`;
    }
    return Math.round(val).toString();
  };
  
  return (
    <div className="text-center group">
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {animatedValue !== undefined ? formatValue(displayValue) : value}
      </div>
      <div className="text-gray-400 text-sm lg:text-base">{label}</div>
    </div>
  );
}

export default function AnimatedStatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, [isVisible]);
  
  const stats = [
    { value: "₹8000+ Cr", label: "Loans Disbursed", animatedValue: 8000 },
    { value: "5000+", label: "Happy Clients", animatedValue: 5000 },
    { value: "50+", label: "Bank Partners", animatedValue: 50 },
    { value: "89%", label: "Approval Rate", animatedValue: 89 }
  ];
  
  return (
    <section 
      ref={sectionRef}
      className={`py-16 md:py-20 bg-gradient-to-b from-[#0a0b1e] to-[#141428] relative overflow-hidden transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Discover Our Impact
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              Trusted by businesses across India for comprehensive financial solutions and expert guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-[#141428]/50 to-[#1a1b3a]/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 group"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <StatItem
                  value={stat.value}
                  label={stat.label}
                  animatedValue={isVisible ? stat.animatedValue : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}