'use server';
import { db } from '@/db/db';
import { comments, users } from '@/db/schema';
import { UserInsert } from '@/db/infer';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
export async function handleAction<T>(
    action: () => Promise<T>,
    successMessage: string,
    errorMessage: string
): Promise<{ success: boolean; message: string; data?: T }> {
    try {
        const result = await action();
        return {
            success: true,
            message: successMessage,
            data: result,
        };
    } catch (error) {
        console.error("Error in handleFunction:", error);
        return {
            success: false,
            message: errorMessage,
        };
    }
}
export async function createUser(UserInsert: UserInsert) {
    try {
        const hashedPassword = await bcrypt.hash(UserInsert.password, 10);
        UserInsert.password = hashedPassword
        const [result] = await db!.insert(users).values(UserInsert).returning();
        const session = getSession()
            ;
        (await session).userId = result.id;
        (await session).save()
        return { success: true, user: result };
    } catch (error) {
        console.log(error)
        return { success: false, error: "Failed to create user" };
    }
}
export async function getUsers() {
    try {
        const result = await db.select().from(users);
        return { success: true, users: result };
    } catch (error) {
        return { success: false, error: "Failed to fetch users" };
    }
}
export async function getUserByEmail({ email, password }: {
    email: string;
    password: string;
}) {
    try {
        const [result] = (await db.select().from(users).where(eq(users.email, email)));
        console.log(result)
        if (result) {
            const isMatch = await bcrypt.compare(password, result.password);
            if (!isMatch) {
                throw new Error("Password does not match");
            }
            const session = await getSession()
                ;
            (await session).userId = result.id;
            (await session).save()
        }
        return result
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw new Error("Failed to fetch user");
    }
}
export async function updateUser(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    try {
        const updates = { name, updatedAt: new Date() };
        const result = await db.update(users).set(updates).where(eq(users.id, id)).returning();
        if (result.length === 0) {
            return { success: false, error: "User not found" };
        }
        return { success: true, user: result[0] };
    } catch (error) {
        return { success: false, error: "Failed to update user" };
    }
}
export async function deleteUser(id: string) {
    try {
        await db.delete(users).where(eq(users.id, id));
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete user" };
    }
}
import { content } from '@/db/schema';
import { getSession } from '@/lib/session';
export async function createNote(args: { title: string; body: string;}) {
    const { title, body } = args;
    const {userId} = await getSession()
    if(!userId){    
        return { success: false, message: "User not authenticated." };
    }
    return handleAction(
        async () => {
            const noteData = {
                type: "note" as const,
                title,
                body,
                userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const result = await db.insert(content).values(noteData).returning();
            return result[0];
        },
        "Note created successfully",
        "Failed to create note"
    );
}

// export async function likeNote(args: { contentId: string; userId: string }) {
//     const { contentId, userId } = args;
//     return handleAction(
//         async () => {
//             const reactionData = {
//                 contentId,
//                 userId,
//                 reaction: 'like' as const,
//                 createdAt: new Date(),
//             };
//             const result = await db.insert(reactions).values(reactionData).returning();
//             return result[0];
//         },
//         "Note liked successfully",
//         "Failed to like note"
//     );
// }
export async function addComment(args: { contentId: string; userId: string; commentBody: string }) {
    const { contentId, userId, commentBody } = args;
    return handleAction(
        async () => {
            const commentData = {
                contentId,
                userId,
                body: commentBody,
                createdAt: new Date(),
            };
            const result = await db.insert(comments).values(commentData).returning();
            return result[0];
        },
        "Comment added successfully",
        "Failed to add comment"
    );
}
// export async function shareNote(args: { contentId: string; userId: string }) {
//     const { contentId, userId } = args;
//     return handleAction(
//         async () => {
//             const shareData = {
//                 contentId,
//                 userId,
//                 reaction: 'share' as const,
//                 createdAt: new Date(),
//             }; await (await getSession()).userId
//             const result = await db.insert(reactions).values(shareData).returning();
//             return result[0];
//         },
//         "Note shared successfully",
//         "Failed to share note"
//     );
// }




export async function getUserPosts() {
    try {
        const {userId} = await getSession()
        if(!userId){
            throw new Error("User not authenticated")
        }
        const posts = await db.select().from(content).where(eq(content.userId, userId));
        return { success: true, data: posts };
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return { success: false, message: 'Failed to fetch posts' };
    }
}