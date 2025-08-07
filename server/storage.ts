import {
  type User,
  type InsertUser,
  type LoanApplication,
  type InsertLoanApplication,
  type Consultation,
  type InsertConsultation,
  type BlogPost,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByMobile(mobile: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyUser(id: string): Promise<User>;

  // Loan application operations
  createLoanApplication(application: InsertLoanApplication): Promise<LoanApplication>;
  getLoanApplication(id: string): Promise<LoanApplication | undefined>;
  getUserLoanApplications(userId: string): Promise<LoanApplication[]>;
  updateLoanApplicationStatus(id: string, status: string, notes?: string): Promise<LoanApplication>;

  // Consultation operations
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getConsultations(): Promise<Consultation[]>;

  // Blog operations
  getBlogPosts(limit?: number): Promise<BlogPost[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private loanApplications: Map<string, LoanApplication>;
  private consultations: Map<string, Consultation>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.loanApplications = new Map();
    this.consultations = new Map();
    this.blogPosts = new Map();

    // Initialize with some blog posts
    this.initializeBlogPosts();
  }

  private initializeBlogPosts() {
    const posts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "Top 5 Business Financing Trends in 2024",
        content: "Discover the latest trends shaping business financing and how they can benefit your company's growth strategy.",
        excerpt: "Discover the latest trends shaping business financing and how they can benefit your company's growth strategy.",
        category: "BUSINESS FINANCE",
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        published: true,
        createdAt: new Date("2024-01-15"),
      },
      {
        id: randomUUID(),
        title: "How to Improve Your Loan Approval Chances",
        content: "Essential tips and strategies to strengthen your loan application and increase approval rates significantly.",
        excerpt: "Essential tips and strategies to strengthen your loan application and increase approval rates significantly.",
        category: "LOAN TIPS",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        published: true,
        createdAt: new Date("2024-01-12"),
      },
      {
        id: randomUUID(),
        title: "Understanding Working Capital Requirements",
        content: "A comprehensive guide to calculating and managing working capital for sustainable business growth.",
        excerpt: "A comprehensive guide to calculating and managing working capital for sustainable business growth.",
        category: "GROWTH STRATEGY",
        imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        published: true,
        createdAt: new Date("2024-01-10"),
      },
    ];

    posts.forEach(post => {
      this.blogPosts.set(post.id, post);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByMobile(mobile: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.mobile === mobile,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      isVerified: false,
      email: insertUser.email || "",
    };
    this.users.set(id, user);
    return user;
  }

  async verifyUser(id: string): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = { ...user, isVerified: true };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async createLoanApplication(insertApplication: InsertLoanApplication): Promise<LoanApplication> {
    const id = randomUUID();
    const application: LoanApplication = {
      ...insertApplication,
      id,
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
      businessType: insertApplication.businessType || null,
      monthlyIncome: insertApplication.monthlyIncome || null,
      propertyValue: insertApplication.propertyValue || null,
      notes: insertApplication.notes || null,
      existingLoans: insertApplication.existingLoans ?? null,
      documents: insertApplication.documents || null,
    };
    this.loanApplications.set(id, application);
    return application;
  }

  async getLoanApplication(id: string): Promise<LoanApplication | undefined> {
    return this.loanApplications.get(id);
  }

  async getUserLoanApplications(userId: string): Promise<LoanApplication[]> {
    return Array.from(this.loanApplications.values()).filter(
      app => app.userId === userId
    );
  }

  async updateLoanApplicationStatus(id: string, status: string, notes?: string): Promise<LoanApplication> {
    const application = this.loanApplications.get(id);
    if (!application) {
      throw new Error("Application not found");
    }
    const updatedApplication = { 
      ...application, 
      status, 
      notes: notes || application.notes,
      updatedAt: new Date(),
    };
    this.loanApplications.set(id, updatedApplication);
    return updatedApplication;
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = randomUUID();
    const consultation: Consultation = {
      ...insertConsultation,
      id,
      status: "pending",
      createdAt: new Date(),
      requirement: insertConsultation.requirement || null,
    };
    this.consultations.set(id, consultation);
    return consultation;
  }

  async getConsultations(): Promise<Consultation[]> {
    return Array.from(this.consultations.values());
  }

  async getBlogPosts(limit?: number): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    
    return limit ? posts.slice(0, limit) : posts;
  }
}

export const storage = new MemStorage();
