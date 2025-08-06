import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, Clock, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { insertConsultationSchema } from "@shared/schema";
import { useState } from "react";

type ConsultationForm = z.infer<typeof insertConsultationSchema>;

const timeSlots = [
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
];

export default function Consultation() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [consultationId, setConsultationId] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<ConsultationForm>({
    resolver: zodResolver(insertConsultationSchema),
  });

  const consultationMutation = useMutation({
    mutationFn: async (data: ConsultationForm) => {
      const response = await apiRequest("POST", "/api/consultations", data);
      return response.json();
    },
    onSuccess: (data) => {
      setConsultationId(data.id);
      setIsSubmitted(true);
      toast({
        title: "Consultation Booked!",
        description: "We'll confirm your appointment within 2 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (data: ConsultationForm) => {
    consultationMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 text-kfs-primary">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <h1 className="text-2xl font-bold text-kfs-dark">Consultation Booked</h1>
              <div className="w-24" />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-green-600">Consultation Booked Successfully!</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                
                <div>
                  <p className="text-lg font-medium">Booking ID: {consultationId}</p>
                  <p className="text-gray-600">We'll confirm your appointment within 2 hours and send you the meeting details.</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Our team will contact you on your provided mobile number to confirm the consultation time and provide the meeting link or office address.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link href="/loan-application">
                    <Button className="bg-kfs-primary hover:bg-kfs-secondary">
                      Apply for Loan
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline">
                      Return to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-kfs-primary">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-kfs-dark">Book a Free Consultation</h1>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <Calendar className="w-12 h-12 text-kfs-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-kfs-dark mb-4">Get Expert Financial Advice</h2>
            <p className="text-lg text-gray-600">
              Schedule a free consultation with our financial experts to discuss your business financing needs and get personalized loan recommendations.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-kfs-light rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-kfs-primary font-bold">1</span>
              </div>
              <h3 className="font-semibold text-kfs-dark mb-2">Free Consultation</h3>
              <p className="text-sm text-gray-600">No charges for initial consultation and loan advice</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-kfs-light rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-kfs-primary font-bold">2</span>
              </div>
              <h3 className="font-semibold text-kfs-dark mb-2">Expert Guidance</h3>
              <p className="text-sm text-gray-600">Get advice from experienced financial consultants</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-kfs-light rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-kfs-primary font-bold">3</span>
              </div>
              <h3 className="font-semibold text-kfs-dark mb-2">Personalized Solutions</h3>
              <p className="text-sm text-gray-600">Tailored loan recommendations for your business</p>
            </div>
          </div>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Book Your Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...form.register("fullName")}
                      placeholder="Your full name"
                      className="mt-1"
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      {...form.register("companyName")}
                      placeholder="Company name"
                      className="mt-1"
                    />
                    {form.formState.errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.companyName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mobile">Contact Number *</Label>
                    <Input
                      id="mobile"
                      {...form.register("mobile")}
                      placeholder="+91 98765 43210"
                      className="mt-1"
                    />
                    {form.formState.errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.mobile.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preferredDate">Preferred Date *</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      {...form.register("preferredDate")}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1"
                    />
                    {form.formState.errors.preferredDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.preferredDate.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Preferred Time *</Label>
                    <Select onValueChange={(value) => form.setValue("preferredTime", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.preferredTime && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.preferredTime.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="requirement">Brief Description of Requirement</Label>
                  <Textarea
                    id="requirement"
                    {...form.register("requirement")}
                    placeholder="Tell us about your financing needs..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-kfs-primary hover:bg-kfs-secondary text-lg py-4"
                  disabled={consultationMutation.isPending}
                >
                  {consultationMutation.isPending ? (
                    "Booking Consultation..."
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Free Consultation
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-600 text-center mt-4">
                  <Clock className="w-4 h-4 inline mr-1" />
                  We'll confirm your appointment within 2 hours
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
