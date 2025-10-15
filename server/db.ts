import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

// Allow running without a database (uses MockStorage)
const hasDatabase = !!process.env.DATABASE_URL;

if (!hasDatabase) {
  console.warn('⚠️  Running without database - persistence disabled');
}

export const pool = hasDatabase ? new Pool({ connectionString: process.env.DATABASE_URL }) : null;
export const db = hasDatabase && pool ? drizzle(pool) : null;
export const isDatabaseAvailable = hasDatabase;
