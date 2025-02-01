import { env } from '@/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';
import { sql } from 'drizzle-orm';
export var db: ReturnType<typeof createDatabaseClient>;
// Better type definition for global connection
declare global {
  var dbConnection: postgres.Sql | undefined;
}

const createDatabaseClient = () => {
  if (!env.DB_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  // Use existing connection if available
  if (global.dbConnection) {
    return drizzle(global.dbConnection, { schema });
  }

  // Configure Postgres client
  const queryClient = postgres(env.DB_URL, { 
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
    // Add SSL config if needed
    // ssl: process.env.NODE_ENV === 'production',
  });

  // Store the connection in development
  if (process.env.NODE_ENV !== 'production') {
    global.dbConnection = queryClient;
  }

  return drizzle(queryClient, { 
    schema,
    // Add additional Drizzle config if needed
  });
};

// Handle connection errors
try {
    db = createDatabaseClient();
} catch (error) {
  console.error('Failed to create database client:', error);
  throw error;
}

// Optional: Add connection health check
export async function checkDatabaseConnection() {
  try {
   if (db) {
     db.execute(sql`SELECT 1`);
   } else {
     throw new Error('Database client is not initialized');
   }
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}