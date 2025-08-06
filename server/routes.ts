import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertLoanApplicationSchema, insertConsultationSchema } from "@shared/schema";
import { z } from "zod";

const otpVerificationSchema = z.object({
  mobile: z.string().min(10),
  otp: z.string().length(6),
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User registration and OTP verification
  app.post("/api/users/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByMobile(userData.mobile);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this mobile number" });
      }
      
      const user = await storage.createUser(userData);
      
      // In a real app, send OTP via SMS here
      console.log(`OTP for ${userData.mobile}: 123456`);
      
      res.json({ userId: user.id, message: "OTP sent successfully" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ message: "Registration failed" });
    }
  });

  app.post("/api/users/verify-otp", async (req, res) => {
    try {
      const { mobile, otp } = otpVerificationSchema.parse(req.body);
      
      // In a real app, verify OTP from SMS service
      if (otp !== "123456") {
        return res.status(400).json({ message: "Invalid OTP" });
      }
      
      const user = await storage.getUserByMobile(mobile);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const verifiedUser = await storage.verifyUser(user.id);
      res.json({ user: verifiedUser });
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(400).json({ message: "OTP verification failed" });
    }
  });

  // Loan application endpoints
  app.post("/api/loan-applications", async (req, res) => {
    try {
      const applicationData = insertLoanApplicationSchema.parse(req.body);
      const application = await storage.createLoanApplication(applicationData);
      res.json(application);
    } catch (error) {
      console.error("Loan application error:", error);
      res.status(400).json({ message: "Failed to create loan application" });
    }
  });

  app.get("/api/loan-applications/:id", async (req, res) => {
    try {
      const application = await storage.getLoanApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      console.error("Get application error:", error);
      res.status(500).json({ message: "Failed to fetch application" });
    }
  });

  app.get("/api/users/:userId/loan-applications", async (req, res) => {
    try {
      const applications = await storage.getUserLoanApplications(req.params.userId);
      res.json(applications);
    } catch (error) {
      console.error("Get user applications error:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.patch("/api/loan-applications/:id/status", async (req, res) => {
    try {
      const { status, notes } = req.body;
      const application = await storage.updateLoanApplicationStatus(req.params.id, status, notes);
      res.json(application);
    } catch (error) {
      console.error("Update status error:", error);
      res.status(400).json({ message: "Failed to update application status" });
    }
  });

  // Consultation booking
  app.post("/api/consultations", async (req, res) => {
    try {
      const consultationData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(consultationData);
      
      // In a real app, send confirmation email/SMS here
      console.log(`Consultation booked for ${consultationData.fullName} on ${consultationData.preferredDate}`);
      
      res.json(consultation);
    } catch (error) {
      console.error("Consultation booking error:", error);
      res.status(400).json({ message: "Failed to book consultation" });
    }
  });

  // Blog posts
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const posts = await storage.getBlogPosts(limit);
      res.json(posts);
    } catch (error) {
      console.error("Get blog posts error:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // EMI calculator
  app.post("/api/calculate-emi", async (req, res) => {
    try {
      const { loanAmount, interestRate, tenure } = req.body;
      
      const principal = parseFloat(loanAmount);
      const rate = parseFloat(interestRate) / 100 / 12;
      const tenureMonths = parseInt(tenure) * 12;
      
      const emi = (principal * rate * Math.pow(1 + rate, tenureMonths)) / (Math.pow(1 + rate, tenureMonths) - 1);
      const totalPayment = emi * tenureMonths;
      const totalInterest = totalPayment - principal;
      
      res.json({
        monthlyEMI: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        totalAmount: Math.round(totalPayment),
      });
    } catch (error) {
      console.error("EMI calculation error:", error);
      res.status(400).json({ message: "Failed to calculate EMI" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
