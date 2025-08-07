# Overview

This is a modern financial services web application built for Kothari Financial Services (KFS), a loan advisory platform. The application provides an end-to-end digital experience for business loan applications, consultations, and financial tools. It features a multi-step loan application process with OTP verification, consultation booking, application status tracking, and financial calculators.

The system is designed to serve entrepreneurs and businesses looking for various types of loans including property loans, business loans, and cash credit facilities. The platform emphasizes trust-building through partner bank displays, client testimonials, and professional service presentation.

# Recent Changes

## Latest Updates (August 07, 2025)
- **Fixed All TypeScript Issues**: Verified no compilation errors, all imports and exports are correct
- **Enhanced Shooting Stars Animation**: Improved visibility with larger glowing stars and prominent trails
- **Fixed Favicon Serving**: Moved favicon files to client/public directory for proper Vite serving
- **Consultation Button Fix**: Transparent background with white text and border
- **Dual Authentication System**: Supports both OTP and social login (Google, LinkedIn, Microsoft)
- **Member Dashboard**: Created personalized dashboard page for logged-in users with profile info and quick actions

## UI/UX Improvements (August 07, 2025)
- **Shooting Stars Animation**: Added 20+ randomized shooting stars with varying trail lengths, positions, speeds, and opacity
- **Enhanced Consultation Button**: Made more visible with white border and background 
- **Removed Bank Logos Section**: Completely removed "Trusted By Leading Financial Institutions" section per user request
- **Improved Trust Signal Spacing**: Better responsive layout for trust indicators in hero section

## Deployment Infrastructure (August 07, 2025)
- **Health Check Endpoints**: Added `/health` and `/ready` endpoints for deployment monitoring
- **Error Handling**: Enhanced server startup error handling with proper logging and graceful shutdown
- **Static File Serving**: Fixed static file path resolution for production deployment
- **Deployment Status**: ✅ READY - All deployment requirements addressed

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React 18 with TypeScript, utilizing Vite as the build tool for fast development and optimized production builds. The application follows a component-based architecture with a clean separation of concerns.

**Key Design Patterns:**
- **Component Library:** Uses shadcn/ui components built on top of Radix UI primitives for consistent, accessible UI components
- **Routing:** Implements client-side routing with wouter for lightweight navigation
- **State Management:** Uses React Query (TanStack Query) for server state management and React Hook Form for form state
- **Styling:** Tailwind CSS with custom CSS variables for theming and design consistency

**Directory Structure:**
- `/client/src/components/` - Reusable UI components and business logic components
- `/client/src/pages/` - Route-based page components
- `/client/src/hooks/` - Custom React hooks for shared logic
- `/client/src/lib/` - Utility functions and configurations

## Backend Architecture
The backend follows a RESTful API design using Express.js with TypeScript. It implements a clean separation between routes, storage, and business logic.

**Key Design Patterns:**
- **Route-based Architecture:** API endpoints organized in `/server/routes.ts` with clear HTTP method handling
- **Storage Abstraction:** Interface-based storage pattern (`IStorage`) allowing for multiple implementations (currently includes in-memory storage for development)
- **Middleware Pattern:** Express middleware for request logging, error handling, and CORS

**API Structure:**
- `/api/users/*` - User registration and OTP verification
- `/api/loan-applications/*` - Loan application CRUD operations
- `/api/consultations/*` - Consultation booking system
- `/api/blog-posts/*` - Content management for blog posts

## Data Storage Solutions
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations.

**Database Design:**
- **users** - User profiles with mobile verification
- **loanApplications** - Multi-step loan application data with document storage
- **consultations** - Appointment booking system
- **blogPosts** - Content management for educational content

**Key Features:**
- Uses Neon Database (serverless PostgreSQL) for cloud deployment
- Drizzle migrations for schema management
- Type-safe queries with full TypeScript integration

## Authentication and Authorization
Implements a mobile-based OTP verification system for user registration and login.

**Security Approach:**
- Mobile number as primary identifier
- 6-digit OTP verification (currently mocked for development)
- Session-based authentication for subsequent requests
- No complex password management required

## File Upload and Document Management
The application includes infrastructure for document uploads using Uppy with support for multiple storage backends.

**Implementation:**
- Uppy dashboard for drag-and-drop file uploads
- AWS S3 integration for cloud storage
- Google Cloud Storage as alternative backend
- File type validation and size limits

## Form Handling and Validation
Uses a comprehensive form management system with multi-step workflows.

**Key Features:**
- React Hook Form for performant form state management
- Zod schema validation for type-safe form validation
- Multi-step form wizard for loan applications
- Real-time validation feedback

## Development and Build System
Modern development setup with hot reloading and optimized production builds.

**Tools:**
- Vite for fast development server and production builds
- TypeScript for type safety across frontend and backend
- ESBuild for backend bundling
- PostCSS with Tailwind CSS for styling

# External Dependencies

## Database Services
- **Neon Database** - Serverless PostgreSQL database for production
- **Drizzle ORM** - Type-safe database toolkit and query builder

## Cloud Storage Services
- **Google Cloud Storage** - Primary file storage backend for document uploads
- **AWS S3** - Alternative cloud storage option through Uppy integration

## Communication Services
- **WhatsApp Business API** - Integrated contact system for customer support
- **SMS Gateway** - OTP delivery system (integration ready for production)

## UI and Component Libraries
- **Radix UI** - Accessible component primitives for form controls, dialogs, and navigation
- **Lucide React** - Icon library for consistent iconography
- **Tailwind CSS** - Utility-first CSS framework for responsive design

## Development and Deployment
- **Replit** - Development environment with integrated deployment pipeline
- **Vite** - Build tool with development server and production optimization

## Analytics and Monitoring
- Ready for integration with analytics platforms
- Error boundary components for production error handling
- Request logging middleware for API monitoring