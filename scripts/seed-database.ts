import { db } from "../server/db";
import { blogPosts } from "../shared/schema";
import { eq } from "drizzle-orm";

async function seedDatabase() {
  console.log("Starting database seeding...");

  // Check if blog posts already exist
  const existingPosts = await db.select().from(blogPosts);
  
  if (existingPosts.length === 0) {
    console.log("Seeding blog posts...");
    
    const posts = [
      {
        title: "Top 5 Business Financing Trends in 2024",
        content: "Discover the latest trends shaping business financing and how they can benefit your company's growth strategy. From digital lending platforms to alternative financing options, learn what's driving the future of business loans.",
        excerpt: "Discover the latest trends shaping business financing and how they can benefit your company's growth strategy.",
        category: "BUSINESS FINANCE",
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        published: true,
      },
      {
        title: "How to Improve Your Loan Approval Chances",
        content: "Essential tips and strategies to strengthen your loan application and increase approval rates significantly. Learn about credit score improvement, documentation requirements, and how to present your business case effectively.",
        excerpt: "Essential tips and strategies to strengthen your loan application and increase approval rates significantly.",
        category: "LOAN TIPS",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        published: true,
      },
      {
        title: "Understanding Working Capital Requirements",
        content: "A comprehensive guide to calculating and managing working capital for sustainable business growth. Master the fundamentals of cash flow management and learn how to optimize your working capital cycle.",
        excerpt: "A comprehensive guide to calculating and managing working capital for sustainable business growth.",
        category: "GROWTH STRATEGY",
        imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        published: true,
      },
      {
        title: "MSME Loan Schemes: Government Support for Small Businesses",
        content: "Explore various government-backed MSME loan schemes designed to support small and medium enterprises. Learn about eligibility criteria, application process, and benefits of different schemes.",
        excerpt: "Explore government-backed MSME loan schemes and unlock funding opportunities for your small business.",
        category: "MSME",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        published: true,
      },
      {
        title: "Digital Documentation: Streamlining Your Loan Application",
        content: "Learn how digital documentation can speed up your loan approval process. Discover the essential documents needed and how to prepare them digitally for faster processing.",
        excerpt: "Discover how digital documentation can accelerate your loan approval process.",
        category: "TECHNOLOGY",
        imageUrl: "https://images.unsplash.com/photo-1568234928966-359c2f5bd45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        published: true,
      }
    ];

    await db.insert(blogPosts).values(posts);
    console.log(`Seeded ${posts.length} blog posts`);
  } else {
    console.log(`Blog posts already exist (${existingPosts.length} found)`);
  }

  console.log("Database seeding completed!");
  process.exit(0);
}

seedDatabase().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});