import { env } from '@/env';
import { SessionOptions } from 'iron-session';

export const sessionOptions: SessionOptions = {
  password: env.SESSION_SECRET!, // A strong secret key (at least 32 characters)
  cookieName: "OPEN-NOTE-SESSION", // Name of the session cookie
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  },
};

// Define the session data structure
declare module 'iron-session' {
  interface IronSessionData {
    userId?: string; // Example: Store the user ID in the session
  }
}