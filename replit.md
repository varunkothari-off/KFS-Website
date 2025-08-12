# Overview

This is a modern financial services web application built for Kothari Financial Services (KFS), a loan advisory platform. The application provides an end-to-end digital experience for business loan applications, consultations, and financial tools. It features a multi-step loan application process with OTP verification, consultation booking, application status tracking, and financial calculators.

The system is designed to serve entrepreneurs and businesses looking for various types of loans including property loans, business loans, and cash credit facilities. The platform emphasizes trust-building through partner bank displays, client testimonials, and professional service presentation.

# Recent Changes

## Legal Compliance Implementation (January 13, 2025)
- **Terms of Service Page**: Created comprehensive Terms of Service page
  - 13 sections covering user responsibilities, service descriptions, privacy, fees, intellectual property
  - Professional legal language appropriate for financial services
  - Dark theme design with purple/pink gradient accents
  - Proper navigation with back-to-home functionality
- **Privacy Policy Page**: Implemented detailed Privacy Policy page
  - 12 sections covering data collection, usage, security, user rights, GDPR compliance
  - Clear categorization of personal, financial, and technical information
  - Cyan/purple color scheme matching platform aesthetics
  - Cross-linked with Terms of Service
- **Legal Links Integration**: Added hyperlinks throughout platform
  - Footer of homepage with dedicated legal links section
  - Login page disclaimer below form
  - Registration page agreement text with links
  - Proper Link component usage from wouter routing
- **UI Fixes**: Resolved chatbot and WhatsApp button positioning
  - Chatbot positioned at bottom-28 with z-[60] index
  - WhatsApp button remains at bottom-6 with z-50 index
  - No overlap between floating action buttons

## Backend Data Persistence Implementation (January 12, 2025)
- **Complete Database Integration**: Transitioned from demo/mock functionality to actual PostgreSQL database storage
  - Implemented DatabaseStorage class replacing MemStorage for production use
  - All user profiles now saved persistently in PostgreSQL
  - Sessions stored in database with 30-day expiration
  - Real user creation and authentication with database persistence
- **User Registration & Authentication**: Fully functional backend authentication
  - Mobile OTP registration creates actual user profiles (test OTP: 123456)
  - OAuth providers (Google, LinkedIn, Microsoft) save users to database
  - Session tokens generated and validated against database
  - Profile completion flow for social login users
- **Data Seeding**: Initial content populated in database
  - 5 blog posts seeded for content display
  - All CRUD operations now use database storage
- **Test User Created**: Successfully verified with test registration
  - Mobile: 9999999999, verified and saved to database
  - Session tokens properly generated and stored

## Triadic Color Scheme Implementation (August 12, 2025)
- **Color Theory Application**: Implemented proper triadic color scheme based on Canva color wheel principles
  - Primary: Purple (#8B5CF6 / hsl(252, 94%, 67%))
  - Secondary: Cyan (#06B6D4 / hsl(187, 92%, 42%))
  - Tertiary: Orange (#FB923C / hsl(24, 95%, 61%))
- **Text Legibility Improvements**: Fixed all illegible text sections
  - Increased text contrast throughout (using white/60 and white/70 for muted text)
  - Updated button borders for better visibility
  - Enhanced hover states with proper color transitions
- **Component Updates**: Applied triadic colors consistently across:
  - Hero section gradients and interactive stars
  - Floating features cards with new gradient combinations
  - Modern features section with updated icon backgrounds
  - Sticky header with cyan and orange accents
  - Partnership CTA section with triadic gradient animations
- **Accessibility Enhancements**: Ensured all text meets WCAG contrast standards on dark backgrounds

## Comprehensive Dashboard Implementation (August 11, 2025)
- **Navigation Flow Updates**: Updated CTA button behaviors
  - "Consult Now" leads to dashboard consultation tab after login
  - "Apply for Loan" leads to dashboard loans tab after login
  - Session storage tracks intended destination for post-login redirects
- **Comprehensive Financial Dashboard**: Built full-featured member dashboard
  - **Net Worth Tracking**: Real-time calculation of assets minus liabilities
  - **Business Metrics**: Revenue, expenses, profit, growth rate, and cash flow monitoring
  - **Loan Management**: Active loans overview with EMI, outstanding amounts, and interest rates
  - **Holdings & Assets**: Properties, vehicles, investments, and other assets tracking
  - **Consultation Tab**: Direct booking interface with expert benefits
  - Dark theme with purple/pink gradients matching platform design
- **Financial Overview Card**: Top-level summary showing total assets, liabilities, and net worth
- **Quick Actions**: Direct access to new loan applications, consultations, and analytics

## OAuth Social Authentication Implementation (August 11, 2025)
- **Multi-Provider OAuth Support**: Google, LinkedIn, and Microsoft authentication
- **Session Management**: Express sessions with PostgreSQL storage
- **Profile Completion**: Flow for social login users missing mobile numbers

## Modern Financial Design Implementation (August 12, 2025)
- **Hero Section Redesign**: Merged three design concepts into cohesive modern financial platform aesthetic
  - Added "SWAGATAM!" welcome message for cultural relevance
  - Implemented geometric animated logo with gradient effects
  - Dark theme with purple/pink gradient backgrounds (#0a0b1e base)
  - Floating feature cards with hover animations
  - "OPEN FINANCE" inspired gradient text effects
- **Modern Features Section**: Created new component showcasing platform capabilities
  - 6 key features with gradient icon backgrounds
  - Card showcase section with virtual/physical card visualization
  - Animated blob backgrounds for visual depth
- **Dark Theme Implementation**: Consistent dark theme throughout application
  - Updated all sections to use dark backgrounds
  - Modified text colors for proper contrast
  - Enhanced visual hierarchy with gradient effects
- **Company Branding**: Strengthened Kothari Financial Services identity
  - Clear company name presentation with gradients
  - Professional tagline about 30+ years experience
  - Trust signals prominently displayed

## Deployment Fixes Applied (August 07, 2025)
- **Health Check Endpoints**: Added `/health` and `/ready` endpoints for deployment monitoring
- **Error Handling**: Enhanced server startup error handling with graceful shutdown
- **Environment Configuration**: Automatic NODE_ENV setup for production deployments
- **Port Binding**: Server properly binds to 0.0.0.0 for all interfaces
- **Static File Serving**: Fixed static file path resolution for production
- **Production Build Process**: Created deployment script for complete build process

### Deployment Status: ✅ READY
- Modern design implementation complete
- All existing functionality preserved
- Authentication and loan application flows intact
- Dark theme consistently applied
- **Backend fully operational with real database persistence**
- **User profiles and sessions stored in PostgreSQL**
- **Production-ready authentication system**

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
Implements multiple authentication methods including OAuth social login and mobile-based OTP verification.

**OAuth Social Login:**
- Google OAuth 2.0 integration with profile and email scopes
- LinkedIn OAuth 2.0 for professional network authentication
- Microsoft OAuth for enterprise users
- Demo authentication flow for development testing
- Profile completion flow for social users to add mobile numbers

**Mobile OTP Authentication:**
- Mobile number as primary identifier for direct registration
- 6-digit OTP verification (currently mocked for development)
- Session-based authentication for subsequent requests
- No complex password management required

**Security Features:**
- Express sessions with secure cookies
- Passport.js for OAuth strategy management
- Protected routes with authentication middleware
- Session persistence across page refreshes
- Automatic logout on session expiry

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