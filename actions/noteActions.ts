'use server';

import { db } from '@/db/db';
import { content, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

/**
 * Create a new note.
 */
export async function createNote(args: { title: string; body: string; userId: string }) {
    const { title, body, userId } = args;

    if (!userId) {
        throw new Error("User ID is required to create a note.");
    }

    try {
        const noteData = {
            type: "note" as const,
            title,
            body,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const result = await db.insert(content).values(noteData).returning();
        return { success: true, data: result[0] };
    } catch (error) {
        console.error("Error creating note:", error);
        return { success: false, message: "Failed to create note" };
    }
}

/**
 * Fetch all posts (notes) created by a specific user.
 */
export async function getUserPosts(userId: string) {
    try {
        const cachedPosts = await unstable_cache(
            async () => {
                const posts = await db.select().from(content).where(eq(content.userId, userId));
                return posts;
            },
            [`user-posts-${userId}`], // Cache key based on userId
            { revalidate: 60 } // Revalidate cache every 60 seconds
        )();

        return { success: true, data: cachedPosts };
    } catch (error) {
        console.error("Error fetching user posts:", error);
        return { success: false, message: "Failed to fetch posts" };
    }
}

export async function getPostById(id: string) {
    try {
      // Query the database for the post with the given ID
      const post = await db.query.content.findFirst({
        where: eq(content.id, id), // Match the post ID
      });
  
      if (!post) {
        return { success: false, message: "Post not found." };
      }
  
      return { success: true, post };
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      return { success: false, message: "Failed to fetch post." };
    }
  }