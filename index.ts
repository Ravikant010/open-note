import { db } from './db/db';
import { users } from './db/schema';
import { UserInsert } from './db/types';
import { eq, inArray } from 'drizzle-orm';

// Types
type UserResponse = {
    success: boolean;
    user?: any;
    error?: string;
    message?: string;
    deletedCount?: number;
};

// CREATE
async function insertUser(userData: Omit<UserInsert, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserResponse> {
    try {
        const result = await db!.insert(users).values({
            ...userData,
        }).returning();
        return { success: true, user: result[0] };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}

// READ
async function getUserByEmail(email: string) {
    try {
        return await db!.query.users.findFirst({
            where: eq(users.email, email)
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

// Helper Functions
function generateRandomUser(): Omit<UserInsert, 'id' | 'createdAt' | 'updatedAt'> {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva'];
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    
    return {
        name: randomName,
        email: `${randomName.toLowerCase()}${randomNumber}@${randomDomain}`,
        password: Math.random().toString(36).slice(-8),
    };
}

async function insertRandomUsers(count: number = 5): Promise<UserResponse[]> {
    const results = [];
    for (let i = 0; i < count; i++) {
        results.push(await insertUser(generateRandomUser()));
    }
    return results;
}

// DELETE
async function deleteAllUsers(confirmation: boolean = false): Promise<UserResponse> {
    if (!confirmation) {
        return {
            success: false,
            error: 'Confirmation required to delete all users'
        };
    }
    
    try {
        const result = await db!.delete(users).returning();
        return {
            success: true,
            deletedCount: result.length,
            message: `All users deleted successfully (${result.length} users)`
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete all users'
        };
    }
}

// Main execution
async function main() {
    try {
        // Insert random users
        console.log('Inserting random users...');
        const insertResults = await insertRandomUsers(3);
        console.log('Insertion results:', JSON.stringify(insertResults, null, 2));

        // Verify a random user
        if (insertResults[0].success && insertResults[0].user) {
            const verifiedUser = await getUserByEmail(insertResults[0].user.email);
            console.log('Verified user:', verifiedUser);
        }

        // Delete all users with confirmation
        const deleteResult = await deleteAllUsers(true);
        console.log('Delete result:', deleteResult);

    } catch (error) {
        console.error('Error in main execution:', error);
    }
}

// Execute main function
main().catch(console.error);