'use server';

import { db } from '@/db/db';
import { content, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

/**
 * Fetch a user by email.
 */
export async function getUserByEmail(email: string) {
    try {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });
        return { success: true, data: user };
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return { success: false, message: "Failed to fetch user" };
    }
}

/**
 * Create a new user.
 */
export async function createUser(userData: { name: string; email: string; password: string }) {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const result = await db.insert(users).values({ ...userData, password: hashedPassword }).returning();
        return { success: true, data: result[0] };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, message: "Failed to create user" };
    }
}

/**
 * Verify user credentials during login.
 */
export async function verifyUserCredentials(email: string, password: string) {
    try {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (!user) {
            return { success: false, message: "Invalid email or password" };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: "Invalid email or password" };
        }

        return { success: true, data: user };
    } catch (error) {
        console.error("Error verifying user credentials:", error);
        return { success: false, message: "Failed to verify credentials" };
    }
}

export async function getAuthorByPostId(postId: string) {
    try {
      // Query the database to find the post and its associated user
      const post = await db.query.content.findFirst({
        where: eq(content.id, postId),
        with: {
          author: true, // Fetch the author details using the relationship
        },
      });
  
      if (!post || !post.author) {
        return { success: false, message: "Post or author not found." };
      }
  
      // Return the author's details
      return {
        success: true,
        data: {
          name: post.author.name,
          username: post.author.email.split('@')[0], // Extract username from email
        //   bio: post.author.bio || "No bio available.",
        //   avatarUrl: post.author.avatarUrl || "/default-avatar.png",
          joinedDate: post.author.createdAt.toISOString(),
        //   location: post.author.location || "Unknown",
        //   website: post.author.website || null,
        },
      };
    } catch (error) {
      console.error("Error fetching author by post ID:", error);
      return { success: false, message: "Failed to fetch author." };
    }
  }