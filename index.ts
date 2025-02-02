// Imports
import { db } from './db/db';
import { users, content, UserInsert, ContentInsert } from './db/schema';

import { eq } from 'drizzle-orm';
import { createNote } from './actions/action';

// Types
type UserResponse = {
  success: boolean;
  user?: any;
  error?: string;
  message?: string;
  deletedCount?: number;
};

// CREATE USER
async function insertUser(userData: Omit<UserInsert, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserResponse> {
  try {
    const result = await db.insert(users).values(userData).returning();
    return { success: true, user: result[0] };
  } catch (error) {
    console.error('Error inserting user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// READ USER
async function getUserByEmail(email: string) {
  try {
    return await db.query.users.findFirst({
      where: eq(users.email, email),
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// DELETE ALL USERS
async function deleteAllUsers(confirmation: boolean = false): Promise<UserResponse> {
  if (!confirmation) {
    return {
      success: false,
      error: 'Confirmation required to delete all users',
    };
  }

  try {
    const result = await db.delete(users).returning();
    return {
      success: true,
      deletedCount: result.length,
      message: `All users deleted successfully (${result.length} users). Associated content, likes, and comments were also deleted due to cascading.`,
    };
  } catch (error) {
    console.error('Error deleting all users:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete all users',
    };
  }
}

// Helper Functions for Users
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
  const results: UserResponse[] = [];
  for (let i = 0; i < count; i++) {
    const userData = generateRandomUser();
    const result = await insertUser(userData);
    results.push(result);
  }
  return results;
}

// Helper Functions for Posts
function generateRandomPost(): Pick<ContentInsert, 'title' | 'body'> {
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
    'Building a Successful Career',
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
    'Practical advice for achieving success in your professional journey.',
  ];

  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  const randomBody = bodies[Math.floor(Math.random() * bodies.length)];

  return {
    title: randomTitle,
    body: randomBody,
  };
}

export async function insertRandomPosts(userId: string, count: number = 10): Promise<void> {
  try {
    for (let i = 0; i < count; i++) {
      const postData = generateRandomPost();
      await createNote({ ...postData });
      console.log(`Inserted post ${i + 1}:`, postData.title);
    }
    console.log('All posts inserted successfully.');
  } catch (error) {
    console.error('Error inserting posts:', error);
  }
}

// Main Execution
async function main() {
  try {
    // Insert random users
    // console.log('Inserting random users...');
    // const insertResults = await insertRandomUsers(3);
    // console.log('Insertion results:', JSON.stringify(insertResults, null, 2));

    // // Verify a random user
    // if (insertResults[0].success && insertResults[0].user) {
    //   const verifiedUser = await getUserByEmail(insertResults[0].user.email);
    //   console.log('Verified user:', verifiedUser);
    // }

    // // Seed posts for a specific user
    // console.log('Seeding posts...');
    // const userId = 'a9266fbe-cb95-4e9e-9c23-bf3a1494bb3d'; // Replace with an actual user ID
    // await insertRandomPosts(userId, 10); // Insert 10 random posts
    // console.log('Posts seeded successfully.');

    // Delete all users (optional)
    const deleteResult = await deleteAllUsers(true);
    console.log('Delete result:', deleteResult);
  } catch (error) {
    console.error('Error in main execution:', error);
  }
}

// Execute main function
main().catch(console.error);