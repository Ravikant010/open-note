"use server"
import { env } from '@/env';
import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

const sessionOptions: SessionOptions = {
  password: env.SESSION_SECRET!, // A strong secret key (at least 32 characters)
  cookieName: "OPEN-NOTE-SESSION", // Name of the session cookie
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week

    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  },
};

// Define the session data structure
declare module 'iron-session' {
  interface IronSessionData {
    userId?: string; // Example: Store the user ID in the session
  }
}

// Generate a fallback secret (only for development)
function generateFallbackSecret() {
    console.warn(
      '⚠️ NO SESSION SECRET FOUND. GENERATING A TEMPORARY SECRET. ' +
      'PLEASE SET SESSION_SECRET IN YOUR .env FILE!'
    );
    return 'fallback-secret-that-is-definitely-32-chars-long-x';
  }
  
  // Helper to get the session
  export async function getSession() {
    const session = await getIronSession<import("iron-session").IronSessionData>(await cookies(), sessionOptions);
    console.log(session);
    return session;
  }
  
  // Helper to check if user is logged in
  export async function isLoggedIn() {
    const session = await getSession(); 
    
    return !!session.userId;
  }

export async function destroySession() {
  const session = await getSession();
  session.destroy();
  await session.save();

}
