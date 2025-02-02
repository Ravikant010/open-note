'use server';

import { db } from '@/db/db';
import { comments, content, likes, contentCategories, categories, users } from '@/db/schema';
import { getSession } from '@/lib/session';
import { eq, and, sql } from 'drizzle-orm';

/**
 * Like a piece of content.
 * Adds the user's ID to the `likes` table if they haven't already liked it.
 */
export async function likeContent(args: { contentId: string; userId?: string }) {
    const { contentId } = args;
    const userId = args.userId || (await getSession())?.userId;

    if (!userId) {
        return { success: false, message: "User not authenticated." };
    }

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
export async function addComment(args: { contentId: string; userId?: string; commentBody: string }) {
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
export async function getCategoriesByPostId(postId: string) {
    try {
      // Query the join table (contentCategories) to find category IDs linked to the post
      const categoryRelations = await db.query.contentCategories.findMany({
        where: eq(contentCategories.contentId, postId),
        with: {
          category: true, // Include the related category details
        },
      });
  
      // Extract the category names or other details
      const categoriesList = categoryRelations.map((relation) => relation.category);
  
      return { success: true, data: categoriesList };
    } catch (error) {
      console.error("Error fetching categories by post ID:", error);
      return { success: false, message: "Failed to fetch categories." };
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


/**
 * Fetch comments for a specific post by its ID.
 */
export async function getCommentsByPostId(postId: string) {
    try {
        const result = await db.query.comments.findMany({
            where: eq(comments.contentId, postId),
            with: {
                user: true, // Fetch the user details for each comment
            },
            orderBy: (comment, { desc }) => [desc(comment.createdAt)], // Order by newest first
        });

        if (!result || result.length === 0) {
            return { success: false, message: "No comments found." };
        }

        // Map the comments to a simplified format
        const formattedComments = result.map((comment) => ({
            id: comment.id,
            author: comment.user.name,
            // avatar: comment.user.avatarUrl || `${comment.user.name[0]}`, // Use the first letter of the name as fallback
            content: comment.body,
            createdAt: comment.createdAt.toISOString(),
        }));

        return { success: true, data: formattedComments };
    } catch (error) {
        console.error("Error fetching comments:", error);
        return { success: false, message: "Failed to fetch comments." };
    }
}

export async function getPostStats_profile() {
    try {
      // Get the session and extract the userId
      const session = await getSession();
      if (!session || !session.userId) {
        throw new Error('User not authenticated');
      }
  
      const userId = session.userId;
  
      // Query the database for stats
      const result = await db
        .select({
          posts: sql<number>`COUNT(${content.id})`.mapWith(Number),
          likes: sql<number>`COUNT(${likes.id})`.mapWith(Number),
          comments: sql<number>`COUNT(${comments.id})`.mapWith(Number),
        })
        .from(users)
        .leftJoin(content, eq(content.userId, users.id)) // Join content created by the user
        .leftJoin(likes, eq(likes.contentId, content.id)) // Join likes on the content
        .leftJoin(comments, eq(comments.contentId, content.id)) // Join comments on the content
        .where(eq(users.id, userId)) // Filter by the authenticated user ID
        .groupBy(users.id); // Group by user to aggregate results
  
      if (result.length === 0) {
        return { success: true, posts: 0, likes: 0, comments: 0 };
      }
  
      return {
        success: true,
        posts: result[0].posts,
        likes: result[0].likes,
        comments: result[0].comments,
      };
    } catch (error) {
      console.error('Error fetching post stats:', error);
      return { success: false, error: 'Failed to fetch stats' };
    }
  }