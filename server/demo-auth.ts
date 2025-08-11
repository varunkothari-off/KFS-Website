// Demo authentication for development
// This provides a mock OAuth flow when real OAuth credentials are not configured

import type { Express } from 'express';
import { AuthService } from './auth';

const authService = new AuthService();

export function setupDemoAuth(app: Express) {
  // Demo Google login
  app.get('/api/auth/google', (req, res) => {
    if (!process.env.GOOGLE_CLIENT_ID) {
      // Simulate OAuth flow with demo user
      res.redirect('/api/auth/demo?provider=google');
    }
  });

  // Demo LinkedIn login
  app.get('/api/auth/linkedin', (req, res) => {
    if (!process.env.LINKEDIN_CLIENT_ID) {
      res.redirect('/api/auth/demo?provider=linkedin');
    }
  });

  // Demo Microsoft login
  app.get('/api/auth/microsoft', (req, res) => {
    if (!process.env.MICROSOFT_CLIENT_ID) {
      res.redirect('/api/auth/demo?provider=microsoft');
    }
  });

  // Demo authentication handler
  app.get('/api/auth/demo', async (req, res) => {
    const provider = req.query.provider as string;
    
    try {
      // Create demo user based on provider
      const demoProfile = {
        id: `demo_${provider}_${Date.now()}`,
        name: `Demo User (${provider})`,
        email: `demo@${provider}.example.com`,
        picture: `https://ui-avatars.com/api/?name=Demo+User&background=random`,
        provider: provider as 'google' | 'linkedin' | 'microsoft'
      };

      const user = await authService.createOrUpdateUserFromSocial(demoProfile);
      
      // Set session
      req.login(user, (err) => {
        if (err) {
          console.error('Login error:', err);
          return res.redirect('/login?error=auth_failed');
        }
        
        // Redirect to dashboard
        if (!user.mobile || !user.isProfileComplete) {
          res.redirect('/dashboard?complete-profile=true');
        } else {
          res.redirect('/dashboard');
        }
      });
    } catch (error) {
      console.error('Demo auth error:', error);
      res.redirect('/login?error=auth_failed');
    }
  });
}