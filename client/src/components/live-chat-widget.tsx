import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! 👋 I'm your loan advisor. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Auto-show chat widget after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  const quickResponses = [
    "Check loan eligibility",
    "Interest rates",
    "Required documents",
    "Talk to expert"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('eligibility') || lowerMessage.includes('eligible')) {
      return "To check your loan eligibility, I need to know: 1) Your business type 2) Annual turnover 3) Years in business. Would you like to use our instant eligibility checker?";
    }
    if (lowerMessage.includes('interest') || lowerMessage.includes('rate')) {
      return "Our interest rates start from 10.5% per annum. The exact rate depends on your business profile, loan amount, and tenure. Would you like to speak with our expert for personalized rates?";
    }
    if (lowerMessage.includes('document')) {
      return "Basic documents required: PAN Card, Aadhaar, Bank Statements (6 months), GST Returns, and ITR. The exact list varies by loan type. Would you like a detailed checklist?";
    }
    if (lowerMessage.includes('talk') || lowerMessage.includes('expert') || lowerMessage.includes('call')) {
      return "I'll connect you with our expert! Please share your mobile number, and we'll call you within 30 minutes. You can also call us directly at +91 98765 43210.";
    }
    
    return "I understand you need help with loans. You can: 1) Check eligibility instantly 2) View interest rates 3) Get document checklist 4) Talk to our expert. What would you prefer?";
  };

  const handleQuickResponse = (response: string) => {
    setInputMessage(response);
    handleSendMessage();
  };

  return (
    <>
      {/* Chat Button - Positioned above WhatsApp button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-28 right-6 z-[60]"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-ping" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window - Higher z-index than WhatsApp */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 right-6 z-[60] w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="bg-[#141428] border-white/10 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Loan Advisor</h3>
                    <p className="text-xs text-white/80">Online • Typically replies instantly</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' ? 'bg-purple-500' : 'bg-white/10'
                      }`}>
                        {message.sender === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                      </div>
                      <div className={`px-4 py-2 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'bg-white/10 text-white'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white/10 px-4 py-2 rounded-2xl">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="h-2 w-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="h-2 w-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quick Responses */}
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickResponses.map((response) => (
                    <Button
                      key={response}
                      onClick={() => handleQuickResponse(response)}
                      variant="outline"
                      size="sm"
                      className="text-xs bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>

              {/* Contact Options */}
              <div className="px-4 pb-4 flex justify-center gap-4 text-xs">
                <a href="tel:+919876543210" className="flex items-center gap-1 text-white/60 hover:text-white">
                  <Phone className="h-3 w-3" />
                  Call Now
                </a>
                <a href="mailto:support@kfs.com" className="flex items-center gap-1 text-white/60 hover:text-white">
                  <Mail className="h-3 w-3" />
                  Email Us
                </a>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}