import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon, Clock, Video, Phone, MessageSquare, ArrowLeft, Check } from "lucide-react";
import { Link, useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";

const consultationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  mobile: z.string().min(10, "Valid mobile number required"),
  email: z.string().email("Valid email required"),
  businessName: z.string().optional(),
  preferredDate: z.date({
    required_error: "Please select a date",
  }),
  preferredTime: z.string().min(1, "Please select a time"),
  consultationType: z.enum(["video", "phone", "in-person"]),
  message: z.string().optional(),
});

type ConsultationData = z.infer<typeof consultationSchema>;

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "2:00 PM", "2:30 PM", "3:00 PM",
  "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
];

export default function Consultation() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ConsultationData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      consultationType: "video",
    },
  });

  const consultationMutation = useMutation({
    mutationFn: async (data: ConsultationData) => {
      return apiRequest("/api/consultations", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          preferredDate: format(data.preferredDate, "yyyy-MM-dd"),
        }),
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Consultation Booked!",
        description: "We'll contact you shortly to confirm your appointment.",
      });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ConsultationData) => {
    consultationMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0a0b1e] flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Consultation Booked!</h2>
            <p className="text-white/60 mb-6">
              Your consultation has been scheduled successfully. Our team will contact you within 24 hours to confirm the details.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => setLocation("/")}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Back to Home
              </Button>
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                Book Another Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b1e]">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b1e] via-[#141428] to-[#1a1b3a]"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-blue-900/5"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gradient-to-r from-[#141428] to-[#1a1b3a] border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Book Consultation
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Consultation Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-[#141428]/60 to-[#1a1b3a]/60 backdrop-blur-sm border-white/10">
              <CardContent className="pt-6 text-center">
                <Video className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Video Call</h3>
                <p className="text-xs text-white/60 mt-1">Meet virtually via Zoom</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-[#141428]/60 to-[#1a1b3a]/60 backdrop-blur-sm border-white/10">
              <CardContent className="pt-6 text-center">
                <Phone className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Phone Call</h3>
                <p className="text-xs text-white/60 mt-1">Discuss over phone</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-[#141428]/60 to-[#1a1b3a]/60 backdrop-blur-sm border-white/10">
              <CardContent className="pt-6 text-center">
                <MessageSquare className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">In-Person</h3>
                <p className="text-xs text-white/60 mt-1">Visit our office</p>
              </CardContent>
            </Card>
          </div>

          {/* Consultation Form */}
          <Card className="bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Schedule Your Consultation</CardTitle>
              <CardDescription className="text-white/60">
                Get expert advice on your business loan needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white/80">Full Name *</Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="Enter your name"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-400 text-xs mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="mobile" className="text-white/80">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      {...form.register("mobile")}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="10-digit mobile number"
                    />
                    {form.formState.errors.mobile && (
                      <p className="text-red-400 text-xs mt-1">{form.formState.errors.mobile.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-white/80">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="your@email.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-xs mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="businessName" className="text-white/80">Business Name</Label>
                    <Input
                      id="businessName"
                      {...form.register("businessName")}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white/80">Consultation Type *</Label>
                  <Select 
                    onValueChange={(value) => form.setValue("consultationType", value as any)}
                    defaultValue="video"
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#141428] border-white/20">
                      <SelectItem value="video" className="text-white hover:bg-white/10">Video Call</SelectItem>
                      <SelectItem value="phone" className="text-white hover:bg-white/10">Phone Call</SelectItem>
                      <SelectItem value="in-person" className="text-white hover:bg-white/10">In-Person Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/80">Preferred Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-white/10 border-white/20",
                            !form.watch("preferredDate") && "text-white/40"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch("preferredDate") ? (
                            format(form.watch("preferredDate"), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-[#141428] border-white/20">
                        <Calendar
                          mode="single"
                          selected={form.watch("preferredDate")}
                          onSelect={(date) => form.setValue("preferredDate", date!)}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          className="bg-[#141428] text-white"
                        />
                      </PopoverContent>
                    </Popover>
                    {form.formState.errors.preferredDate && (
                      <p className="text-red-400 text-xs mt-1">{form.formState.errors.preferredDate.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-white/80">Preferred Time *</Label>
                    <Select onValueChange={(value) => form.setValue("preferredTime", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#141428] border-white/20">
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time} className="text-white hover:bg-white/10">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.preferredTime && (
                      <p className="text-red-400 text-xs mt-1">{form.formState.errors.preferredTime.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white/80">Additional Message</Label>
                  <Textarea
                    id="message"
                    {...form.register("message")}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    placeholder="Tell us briefly about your loan requirements..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={consultationMutation.isPending}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {consultationMutation.isPending ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Book Consultation
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}