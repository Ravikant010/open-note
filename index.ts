
import { createNote } from './actions/action';
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
// async function main() {
//     try {
//         // Insert random users
//         console.log('Inserting random users...');
//         const insertResults = await insertRandomUsers(3);
//         console.log('Insertion results:', JSON.stringify(insertResults, null, 2));

//         // Verify a random user
//         if (insertResults[0].success && insertResults[0].user) {
//             const verifiedUser = await getUserByEmail(insertResults[0].user.email);
//             console.log('Verified user:', verifiedUser);
//         }

//         // Delete all users with confirmation
//         const deleteResult = await deleteAllUsers(true);
//         console.log('Delete result:', deleteResult);

//     } catch (error) {
//         console.error('Error in main execution:', error);
//     }
// }

function generateRandomPost(): { title: string; body: string } {
    const titles = [
        'Exploring the Beauty of Nature',
        'The Future of Artificial Intelligence',
        'A Guide to Healthy Living',
        'Top 10 Travel Destinations',
        'How to Master Productivity',
        'The Art of Storytelling',
        'Understanding Blockchain Technology',
        'Cooking Made Easy',
        'The Science of Happiness',
        'Building a Successful Career'
    ];
    const bodies = [
        'Discover the wonders of the natural world through stunning photography and stories.',
        'Learn about the advancements in AI and its potential impact on various industries.',
        'Tips and tricks to maintain a healthy lifestyle and improve your well-being.',
        'Explore the most beautiful places around the world with our travel guide.',
        'Boost your productivity with these simple yet effective strategies.',
        'Learn how to craft compelling stories that captivate your audience.',
        'Demystify blockchain technology and its applications in modern industries.',
        'Simple recipes and cooking techniques for beginners and experts alike.',
        'Understand the psychology behind happiness and how to cultivate it in your life.',
        'Practical advice for achieving success in your professional journey.'
    ];

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomBody = bodies[Math.floor(Math.random() * bodies.length)];

    return {
        title: randomTitle,
        body: randomBody,
    };
}



export async function insertRandomPosts(userId:string, count: number = 10): Promise<void> {
    try {
        for (let i = 0; i < count; i++) {
            const postData = generateRandomPost();
            await createNote({ title: postData.title, body: postData.body , userId: userId});
            console.log(`Inserted post ${i + 1}:`, postData.title);
        }
        console.log('All posts inserted successfully.');
    } catch (error) {
        console.error('Error inserting posts:', error);
    }
}

async function main() {
    try {
        console.log('Seeding posts...');
          const userId = 'a9266fbe-cb95-4e9e-9c23-bf3a1494bb3d'
        await insertRandomPosts(userId, 10); // Insert 10 random posts
        console.log('Posts seeded successfully.');
    } catch (error) {
        console.error('Error seeding posts:', error);
    }
}


// Execute main function
main().catch(console.error);