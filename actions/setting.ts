'use server';

import { db } from '@/db/db';
import { and, eq } from 'drizzle-orm';
import { content, users } from '../db/schema';
import { getSession } from '@/lib/session';

// Delete a post by ID (only the owner can delete)
export async function deletePost(postId: string): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return { success: false, error: 'User not authenticated' };
    }

    const userId = session.userId;

    // Check if the post exists and belongs to the user
    const post = await db.query.content.findFirst({
      where: and(eq(content.id, postId), eq(content.userId, userId)),
    });

    if (!post) {
      return { success: false, error: 'You are not authorized to delete this post or the post does not exist' };
    }

    // Delete the post
    await db.delete(content).where(eq(content.id, postId));

    return { success: true, message: 'Post deleted successfully' };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, error: 'Failed to delete post' };
  }
}

// // Delete the user's account
// export async function deleteAccount(): Promise<{ success: boolean; message?: string; error?: string }> {
//   try {
//     const session = await getSession();
//     if (!session || !session.userId) {
//       return { success: false, error: 'User not authenticated' };
//     }

//     const userId = session.userId;

//     // Delete the user and all related data (cascading deletes should handle this)
//     await db.delete(users).where(eq(users.id, userId));

//     return { success: true, message: 'Account deleted successfully' };
//   } catch (error) {
//     console.error('Error deleting account:', error);
//     return { success: false, error: 'Failed to delete account' };
//   }
// }

// Delete the user's account
export async function deleteAccount(): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return { success: false, error: 'User not authenticated' };
    }

    const userId = session.userId;

    // Delete the user and all related data (cascading deletes should handle this)
    await db.delete(users).where(eq(users.id, userId));

    return { success: true, message: 'Account deleted successfully' };
  } catch (error) {
    console.error('Error deleting account:', error);
    return { success: false, error: 'Failed to delete account' };
  }
}