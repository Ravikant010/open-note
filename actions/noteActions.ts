'use server';

import { db } from '@/db/db';
import { Category, content, users, categories, contentCategories, likes } from '@/db/schema';
import { getSession } from '@/lib/session';
import { desc, eq, sql } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';


// export async function createNote(args: { title: string; body: string; userId: string, category: string }) {
//     const { title, body, userId, category } = args;

//     if (!userId) {
//         throw new Error("User ID is required to create a note.");
//     }

//     try {
//         const noteData = {
//             type: "note" as const,
//             title,
//             body,
//             userId,
//             category,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//         };
//         const result = await db.insert(content).values(noteData).returning();
//         return { success: true, data: result[0] };
//     } catch (error) {
//         console.error("Error creating note:", error);
//         return { success: false, message: "Failed to create note" };
//     }
// }

/**
 * Create a new note/post and associate it with a single category.
 */
export async function createNote({
  userId,
  title,
  body,
  type,
  categoryName
}: {
  userId?: string,
  title: string,
  body: string,
  type: 'note' | 'post' | 'article',
  categoryName: string
}) {
  try {
    // Step 1: Insert the content (note/post/article)
    const {userId} = await getSession();
    if (!userId) {
      return { success: false, message: "User not authenticated." };
    }
    const [newContent] = await db.insert(content).values({
      type,
      title,
      body,
      userId,
    }).returning();

    if (!newContent) {
      throw new Error("Failed to create content.");
    }

    // Step 2: Find or create the category
    let categoryId: string;

    // Check if the category already exists
    const existingCategory = await db.query.categories.findFirst({
      where: eq(categories.name, categoryName),
    });

    if (existingCategory) {
      // Use the existing category ID
      categoryId = existingCategory.id;
    } else {
      // Create a new category
      const [newCategory] = await db.insert(categories).values({
        name: categoryName,
      }).returning();

      if (!newCategory) {
        throw new Error(`Failed to create category: ${categoryName}`);
      }

      categoryId = newCategory.id;
    }

    // Step 3: Associate the content with the category
    await db.insert(contentCategories).values({
      contentId: newContent.id,
      categoryId,
    });

    return { success: true, message: "Note created successfully." };
  } catch (error) {
    console.error("Error creating note:", error);
    return { success: false, message: "Failed to create note." };
  }
}


export async function getUserPosts({userId}:{
    userId?:string
}) {
     const session = await getSession();
     if (!session.userId) {
         throw new Error("User ID is required.");
     }
     userId = session.userId;
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
export async function getUserPostsByUserName(username: string) {
  try {
    const cachedPosts = await unstable_cache(
      async () => {
        // Fetch the user by username
        const user = await db.query.users.findFirst({
          where: eq(users.name, username),
        });

        if (!user) {
          throw new Error("User not found.");
        }

        // Fetch posts by user ID
        const posts = await db.select().from(content).where(eq(content.userId, user.id));
        return posts;
      },
      [`user-posts-${username}`], // Cache key based on username
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


type Post = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  likeCount?: number; // Optional field for trending posts
};

// Fetch latest posts
export async function getLatestPosts(limit: number = 10): Promise<Post[]> {
  try {
    const posts = await db
      .select({
        id: content.id,
        title: content.title,
        body: content.body,
        createdAt: content.createdAt,
      })
      .from(content)
      .orderBy(desc(content.createdAt)) // Sort by creation date in descending order
      .limit(limit);

    return posts;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    throw new Error('Failed to fetch latest posts');
  }
}

// Fetch trending posts (based on like count)
export async function getTrendingPosts(limit: number = 10): Promise<Post[]> {
  try {
    const posts = await db
      .select({
        id: content.id,
        title: content.title,
        body: content.body,
        createdAt: content.createdAt,
        likeCount: sql<number>`COUNT(${likes.id})`.mapWith(Number), // Count the number of likes
      })
      .from(content)
      .leftJoin(likes, eq(likes.contentId, content.id)) // Join with likes table
      .groupBy(content.id) // Group by post ID to aggregate likes
      .orderBy(desc(sql<number>`COUNT(${likes.id})`)) // Sort by like count in descending order
      .limit(limit);

    return posts;
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    throw new Error('Failed to fetch trending posts');
  }
}

export async function fetchAllPosts(): Promise<{ success: boolean; posts?: Post[]; error?: string }> {
  try {
    const posts = await db
      .select({
        id: content.id,
        title: content.title,
        body: content.body,
        createdAt: content.createdAt,
      })
      .from(content)
      .orderBy(content.createdAt); // Optional: Sort by creation date

    return { success: true, posts };
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return { success: false, error: 'Failed to fetch posts' };
  }
}