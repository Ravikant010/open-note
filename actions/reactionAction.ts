'use server';

import { db } from '@/db/db';
import { comments, content, likes, contentCategories, categories } from '@/db/schema';
import { getSession } from '@/lib/session';
import { eq, and } from 'drizzle-orm';

/**
 * Like a piece of content.
 * Adds the user's ID to the `likes` table if they haven't already liked it.
 */
export async function likeContent(args: { contentId: string; userId: string }) {
    const { contentId, userId } = args;

    try {
        // Check if the user has already liked the content
        const existingLike = await db.query.likes.findFirst({
            where: and(eq(likes.contentId, contentId), eq(likes.userId, userId)),
        });

        if (existingLike) {
            return { success: false, message: "User has already liked this content." };
        }

        // Add the like to the database
        await db.insert(likes).values({
            id: crypto.randomUUID(),
            contentId,
            userId,
            createdAt: new Date(),
        });

        return { success: true, message: "Content liked successfully." };
    } catch (error) {
        console.error("Error liking content:", error);
        return { success: false, message: "Failed to like content." };
    }
}

/**
 * Unlike a piece of content.
 * Removes the user's ID from the `likes` table if they have already liked it.
 */
export async function unlikeContent(args: { contentId: string; userId: string }) {
    const { contentId, userId } = args;

    try {
        // Check if the user has already liked the content
        const existingLike = await db.query.likes.findFirst({
            where: and(eq(likes.contentId, contentId), eq(likes.userId, userId)),
        });

        if (!existingLike) {
            return { success: false, message: "User has not liked this content." };
        }

        // Remove the like from the database
        await db.delete(likes).where(
            and(eq(likes.contentId, contentId), eq(likes.userId, userId))
        );

        return { success: true, message: "Content unliked successfully." };
    } catch (error) {
        console.error("Error unliking content:", error);
        return { success: false, message: "Failed to unlike content." };
    }
}

/**
 * Add a comment to a piece of content.
 */
export async function addComment(args: { contentId: string; userId: string; commentBody: string }) {
    const { contentId, commentBody } = args;
    const session = await getSession();
    const userId = session?.userId;

    if (!userId) {
        return { success: false, message: "User not authenticated." };
    }
    try {
        // Insert the new comment into the database
        await db.insert(comments).values({
            id: crypto.randomUUID(),
            contentId,
            userId,
            body: commentBody,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return { success: true, message: "Comment added successfully." };
    } catch (error) {
        console.error("Error adding comment:", error);
        return { success: false, message: "Failed to add comment." };
    }
}

/**
 * Share a piece of content.
 * Increments the `shares` counter in the `content` table.
 */
export async function shareContent(args: { contentId: string }) {
    const { contentId } = args;

    try {
        // Fetch the content to check its current shares
        const existingContent = await db.query.content.findFirst({
            where: eq(content.id, contentId),
        });

        if (!existingContent) {
            return { success: false, message: "Content not found." };
        }

        // Increment the shares count
        const updatedShares = (existingContent.shares || 0) + 1;
        await db.update(content).set({ shares: updatedShares }).where(eq(content.id, contentId));

        return { success: true, message: "Content shared successfully." };
    } catch (error) {
        console.error("Error sharing content:", error);
        return { success: false, message: "Failed to share content." };
    }
}

/**
 * Add a category to a piece of content.
 */
export async function addCategoryToContent(args: { contentId: string; categoryName: string }) {
    const { contentId, categoryName } = args;

    try {
        // Check if the category already exists
        let category = await db.query.categories.findFirst({
            where: eq(categories.name, categoryName),
        });

        if (!category) {
            // Create a new category if it doesn't exist
            const insertedCategories = await db.insert(categories).values({
                name: categoryName,
                createdAt: new Date(),
                updatedAt: new Date(),
            }).returning();
            
            category = insertedCategories[0];
        }

 

        return { success: true, message: "Category added to content successfully." };
    } catch (error) {
        console.error("Error adding category to content:", error);
        return { success: false, message: "Failed to add category to content." };
    }
}

/**
 * Get all categories for a piece of content.
 */
export async function getContentCategories(args: { contentId: string }) {
    const { contentId } = args;

    try {
        const categoriesForContent = await db.query.contentCategories.findMany({
            where: eq(contentCategories.contentId, contentId),
            with: {
                category: true, // Fetch details of each category
            },
        });

        return {
            success: true,
            data: categoriesForContent.map((cc) => cc.category),
        };
    } catch (error) {
        console.error("Error fetching content categories:", error);
        return { success: false, message: "Failed to fetch content categories." };
    }
}

export async function getPostStats(postId: string) {
    try {
        // Fetch the content (post) details
        const post = await db.query.content.findFirst({
            where: eq(content.id, postId),
            with: {
                likes: true, // Fetch all likes for this post
                comments: true, // Fetch all comments for this post
            },
        });

        if (!post) {
            return { success: false, message: "Post not found." };
        }

        // Calculate stats
        const likesCount = post.likes?.length || 0;
        const commentsCount = post.comments?.length || 0;
        const sharesCount = post.shares || 0;

        return {
            success: true,
            likes: likesCount,
            comments: commentsCount,
            shares: sharesCount,
        };
    } catch (error) {
        console.error("Error fetching post stats:", error);
        return { success: false, message: "Failed to fetch post stats." };
    }
}