import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "917019056576"; // Updated WhatsApp number
    const message = "Hi! I'm interested in learning more about your financial services.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center justify-center transition-all duration-500 hover:scale-105 ${
        isScrolled 
          ? 'w-auto h-12 px-4 rounded-full' 
          : 'w-16 h-16 rounded-full'
      }`}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      {isScrolled && (
        <span className="ml-2 text-sm font-medium whitespace-nowrap animate-in slide-in-from-right-4 duration-300">
          Message us
        </span>
      )}
    </button>
  );
}
