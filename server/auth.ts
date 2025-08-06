import crypto from 'crypto';
import { users, sessions, type User, type InsertUser, type Session } from '@shared/schema';
import { db } from './db';
import { eq, and, gt } from 'drizzle-orm';

export interface SocialProfile {
  id: string;
  name: string;
  email: string;
  picture?: string;
  provider: 'google' | 'linkedin' | 'microsoft';
}

export class AuthService {
  // Generate a secure session token
  private generateSessionToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  // Create or update user from social login
  async createOrUpdateUserFromSocial(profile: SocialProfile): Promise<User> {
    const existingUser = await db.select().from(users)
      .where(eq(users.email, profile.email))
      .limit(1);

    if (existingUser.length > 0) {
      // Update existing user with new profile info
      const [updatedUser] = await db.update(users)
        .set({
          fullName: profile.name,
          profilePicture: profile.picture,
          provider: profile.provider,
          providerId: profile.id,
          isVerified: true,
          updatedAt: new Date(),
        })
        .where(eq(users.id, existingUser[0].id))
        .returning();
      
      return updatedUser;
    } else {
      // Create new user
      const [newUser] = await db.insert(users)
        .values({
          fullName: profile.name,
          email: profile.email,
          profilePicture: profile.picture,
          provider: profile.provider,
          providerId: profile.id,
          isVerified: true,
          isProfileComplete: false,
        })
        .returning();

      return newUser;
    }
  }

  // Create session for user
  async createSession(userId: string): Promise<string> {
    const token = this.generateSessionToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    await db.insert(sessions)
      .values({
        userId,
        token,
        expiresAt,
      });

    return token;
  }

  // Validate session token
  async validateSession(token: string): Promise<User | null> {
    const session = await db.select()
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(and(
        eq(sessions.token, token),
        gt(sessions.expiresAt, new Date())
      ))
      .limit(1);

    if (session.length > 0) {
      return session[0].users;
    }

    return null;
  }

  // Delete session (logout)
  async deleteSession(token: string): Promise<void> {
    await db.delete(sessions)
      .where(eq(sessions.token, token));
  }

  // Complete user profile
  async completeProfile(userId: string, profileData: { mobile?: string }): Promise<User> {
    const [updatedUser] = await db.update(users)
      .set({
        mobile: profileData.mobile,
        isProfileComplete: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    return updatedUser;
  }

  // Check if user needs profile completion
  needsProfileCompletion(user: User): boolean {
    return !user.isProfileComplete || !user.mobile;
  }
}

export const authService = new AuthService();