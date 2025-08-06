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
    <div className="text-center">
      <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
        {animatedValue !== undefined ? formatValue(displayValue) : value}
      </div>
      <div className="text-slate-600 text-sm lg:text-base">{label}</div>
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
    { value: "₹500+ Cr", label: "Loans Facilitated", animatedValue: 500 },
    { value: "500+", label: "Happy Clients", animatedValue: 500 },
    { value: "20+", label: "Bank Partners", animatedValue: 20 },
    { value: "98%", label: "Approval Rate", animatedValue: 98 }
  ];
  
  return (
    <section 
      ref={sectionRef}
      className={`py-20 bg-white transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              Discover Our Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Trusted by businesses across India for comprehensive financial solutions and expert guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
                animatedValue={isVisible ? stat.animatedValue : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}