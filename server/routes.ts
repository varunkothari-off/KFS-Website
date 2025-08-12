import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { AuthService } from "./auth";
import { insertUserSchema, insertLoanApplicationSchema, insertConsultationSchema } from "@shared/schema";
import { z } from "zod";
import passport from "./passport-config";
import session from "express-session";
import { setupDemoAuth } from "./demo-auth";

const authService = new AuthService();

const otpVerificationSchema = z.object({
  mobile: z.string().min(10),
  otp: z.string().length(6),
});

const socialLoginSchema = z.object({
  provider: z.enum(['google', 'linkedin', 'microsoft']),
  code: z.string(),
  redirectUri: z.string(),
});

const profileCompletionSchema = z.object({
  mobile: z.string().min(10).optional(),
});

// Extend Express Request interface
interface AuthRequest extends Request {
  user?: any;
}

// Authentication middleware
async function authenticateUser(req: Request & { user?: any }, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const user = await authService.validateSession(token);
    if (!user) {
      return res.status(401).json({ message: "Invalid session" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Authentication failed" });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || 'kfs-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
  }));

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Setup demo authentication for development
  setupDemoAuth(app);
  
  // User registration and OTP verification
  app.post("/api/users/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists (only for mobile-based registration)
      if (userData.mobile) {
        const existingUser = await storage.getUserByMobile(userData.mobile);
        if (existingUser) {
          // If user exists but not verified, allow re-registration (resend OTP)
          if (!existingUser.isVerified) {
            console.log(`OTP for ${userData.mobile}: 123456`);
            return res.json({ userId: existingUser.id, message: "OTP sent successfully", existingUser: true });
          }
          return res.status(400).json({ message: "User already exists with this mobile number" });
        }
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

  // Login with mobile and OTP
  app.post("/api/users/login", async (req, res) => {
    try {
      const { mobile } = req.body;
      
      if (!mobile) {
        return res.status(400).json({ message: "Mobile number is required" });
      }
      
      const user = await storage.getUserByMobile(mobile);
      if (!user) {
        return res.status(404).json({ message: "User not found. Please register first." });
      }
      
      // Send OTP for login
      console.log(`Login OTP for ${mobile}: 123456`);
      
      res.json({ message: "OTP sent successfully", userId: user.id });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ message: "Login failed" });
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
      const token = await authService.createSession(verifiedUser.id);
      
      res.json({ user: verifiedUser, token });
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(400).json({ message: "OTP verification failed" });
    }
  });

  // OAuth Routes - Google
  app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
      // Successful authentication
      const user = req.user as any;
      const sessionToken = await authService.createSession(user.id);
      
      // Check if profile is complete
      if (!user.mobile || !user.isProfileComplete) {
        res.redirect('/dashboard?complete-profile=true');
      } else {
        res.redirect('/dashboard');
      }
    }
  );

  // OAuth Routes - LinkedIn
  app.get('/api/auth/linkedin', passport.authenticate('linkedin'));
  
  app.get('/api/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    async (req, res) => {
      const user = req.user as any;
      const sessionToken = await authService.createSession(user.id);
      
      if (!user.mobile || !user.isProfileComplete) {
        res.redirect('/dashboard?complete-profile=true');
      } else {
        res.redirect('/dashboard');
      }
    }
  );

  // OAuth Routes - Microsoft
  app.get('/api/auth/microsoft', passport.authenticate('microsoft'));
  
  app.get('/api/auth/microsoft/callback',
    passport.authenticate('microsoft', { failureRedirect: '/login' }),
    async (req, res) => {
      const user = req.user as any;
      const sessionToken = await authService.createSession(user.id);
      
      if (!user.mobile || !user.isProfileComplete) {
        res.redirect('/dashboard?complete-profile=true');
      } else {
        res.redirect('/dashboard');
      }
    }
  );

  // Logout route for OAuth
  app.get('/api/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
      }
      res.redirect('/');
    });
  });

  app.post("/api/auth/complete-profile", authenticateUser, async (req: Request & { user?: any }, res: Response) => {
    try {
      const profileData = profileCompletionSchema.parse(req.body);
      const updatedUser = await authService.completeProfile(req.user.id, profileData);
      
      res.json({ user: updatedUser });
    } catch (error) {
      console.error("Profile completion error:", error);
      res.status(400).json({ message: "Profile completion failed" });
    }
  });

  app.get("/api/auth/user", async (req: Request & { user?: any }, res: Response) => {
    // Check if user is authenticated via passport session
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      // Fall back to token authentication
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      try {
        const user = await authService.validateSession(token);
        if (!user) {
          return res.status(401).json({ message: "Invalid session" });
        }
        res.json({ user });
      } catch (error) {
        return res.status(401).json({ message: "Authentication failed" });
      }
    }
  });

  app.post("/api/auth/logout", authenticateUser, async (req: Request & { user?: any }, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1];
      
      if (token) {
        await authService.deleteSession(token);
      }
      
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(400).json({ message: "Logout failed" });
    }
  });

  // Loan application endpoints - All require authentication
  app.post("/api/loan-applications", authenticateUser, async (req: Request & { user?: any }, res: Response) => {
    try {
      const applicationData = insertLoanApplicationSchema.parse(req.body);
      // Associate application with authenticated user
      const applicationWithUser = {
        ...applicationData,
        userId: req.user.id
      };
      const application = await storage.createLoanApplication(applicationWithUser);
      res.json(application);
    } catch (error) {
      console.error("Loan application error:", error);
      res.status(400).json({ message: "Failed to create loan application" });
    }
  });

  app.get("/api/loan-applications/:id", authenticateUser, async (req: Request & { user?: any }, res: Response) => {
    try {
      const application = await storage.getLoanApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      // Ensure user can only view their own applications
      if (application.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      res.json(application);
    } catch (error) {
      console.error("Get application error:", error);
      res.status(500).json({ message: "Failed to fetch application" });
    }
  });

  app.get("/api/users/:userId/loan-applications", authenticateUser, async (req: Request & { user?: any }, res: Response) => {
    try {
      // Users can only view their own applications
      if (req.params.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      const applications = await storage.getUserLoanApplications(req.params.userId);
      res.json(applications);
    } catch (error) {
      console.error("Get user applications error:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.patch("/api/loan-applications/:id/status", authenticateUser, async (req: Request & { user?: any }, res: Response) => {
    try {
      const { status, notes } = req.body;
      // First check if application belongs to user
      const existingApp = await storage.getLoanApplication(req.params.id);
      if (!existingApp || existingApp.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      const application = await storage.updateLoanApplicationStatus(req.params.id, status, notes);
      res.json(application);
    } catch (error) {
      console.error("Update status error:", error);
      res.status(400).json({ message: "Failed to update application status" });
    }
  });

  // Consultation booking - Requires authentication
  app.post("/api/consultations", authenticateUser, async (req: Request & { user?: any }, res: Response) => {
    try {
      const consultationData = insertConsultationSchema.parse(req.body);
      // Associate consultation with authenticated user
      const consultationWithUser = {
        ...consultationData,
        userId: req.user.id
      };
      const consultation = await storage.createConsultation(consultationWithUser);
      
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
