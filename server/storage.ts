import {
  users,
  loanApplications,
  consultations,
  blogPosts,
  type User,
  type InsertUser,
  type LoanApplication,
  type InsertLoanApplication,
  type Consultation,
  type InsertConsultation,
  type BlogPost,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByMobile(mobile: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<InsertUser>): Promise<User>;
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

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByMobile(mobile: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.mobile, mobile));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        isVerified: insertUser.isVerified ?? false,
        isProfileComplete: insertUser.isProfileComplete ?? false,
      })
      .returning();
    return user;
  }

  async updateUser(id: string, data: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async verifyUser(id: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        isVerified: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async createLoanApplication(insertApplication: InsertLoanApplication): Promise<LoanApplication> {
    const [application] = await db
      .insert(loanApplications)
      .values(insertApplication)
      .returning();
    return application;
  }

  async getLoanApplication(id: string): Promise<LoanApplication | undefined> {
    const [application] = await db
      .select()
      .from(loanApplications)
      .where(eq(loanApplications.id, id));
    return application || undefined;
  }

  async getUserLoanApplications(userId: string): Promise<LoanApplication[]> {
    return await db
      .select()
      .from(loanApplications)
      .where(eq(loanApplications.userId, userId))
      .orderBy(desc(loanApplications.createdAt));
  }

  async updateLoanApplicationStatus(id: string, status: string, notes?: string): Promise<LoanApplication> {
    const [application] = await db
      .update(loanApplications)
      .set({
        status,
        notes: notes || undefined,
        updatedAt: new Date(),
      })
      .where(eq(loanApplications.id, id))
      .returning();
    return application;
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const [consultation] = await db
      .insert(consultations)
      .values(insertConsultation)
      .returning();
    return consultation;
  }

  async getConsultations(): Promise<Consultation[]> {
    return await db
      .select()
      .from(consultations)
      .orderBy(desc(consultations.createdAt));
  }

  async getBlogPosts(limit?: number): Promise<BlogPost[]> {
    const query = db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt));
    
    return limit ? await query.limit(limit) : await query;
  }
}

// Keep MemStorage for backward compatibility but use DatabaseStorage
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
    
    // Initialize with a test user for development
    this.initializeTestUser();
  }

  private initializeTestUser() {
    const testUser: User = {
      id: "test-user-001",
      fullName: "Test User",
      mobile: "9876543210",
      email: "test@example.com",
      profilePicture: null,
      provider: null,
      providerId: null,
      isVerified: true,
      isProfileComplete: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(testUser.id, testUser);
    console.log("Test user initialized:", testUser.mobile);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
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
      id,
      fullName: insertUser.fullName,
      mobile: insertUser.mobile || null,
      email: insertUser.email,
      profilePicture: insertUser.profilePicture || null,
      provider: insertUser.provider || null,
      providerId: insertUser.providerId || null,
      isVerified: insertUser.isVerified ?? false,
      isProfileComplete: insertUser.isProfileComplete ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async verifyUser(id: string): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = { ...user, isVerified: true, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async updateUser(id: string, data: Partial<InsertUser>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = { ...user, ...data, updatedAt: new Date() };
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

// Use DatabaseStorage for production, with real data persistence
export const storage = new DatabaseStorage();
