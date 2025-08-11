import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import { AuthService, type SocialProfile } from './auth';
import { db } from './db';
import { users } from '@shared/schema';
import { eq } from 'drizzle-orm';

const authService = new AuthService();

// Serialize/Deserialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    done(null, user || null);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const socialProfile: SocialProfile = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || '',
        picture: profile.photos?.[0]?.value,
        provider: 'google'
      };
      
      const user = await authService.createOrUpdateUserFromSocial(socialProfile);
      done(null, user);
    } catch (error) {
      done(error as Error, undefined);
    }
  }));
}

// LinkedIn OAuth Strategy
if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "/api/auth/linkedin/callback",
    scope: ['openid', 'profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const socialProfile: SocialProfile = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || '',
        picture: profile.photos?.[0]?.value,
        provider: 'linkedin'
      };
      
      const user = await authService.createOrUpdateUserFromSocial(socialProfile);
      done(null, user);
    } catch (error) {
      done(error as Error, undefined);
    }
  }));
}

// Microsoft OAuth Strategy
if (process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET) {
  passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: "/api/auth/microsoft/callback",
    scope: ['user.read']
  },
  async (profile: any, done: any) => {
    try {
      const socialProfile: SocialProfile = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || '',
        picture: profile._json?.picture,
        provider: 'microsoft'
      };
      
      const user = await authService.createOrUpdateUserFromSocial(socialProfile);
      done(null, user);
    } catch (error) {
      done(error as Error, undefined);
    }
  }));
}

export default passport;