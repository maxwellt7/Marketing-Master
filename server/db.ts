import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;
let isDatabaseAvailable = false;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool);
  isDatabaseAvailable = true;
} else {
  console.warn(
    "DATABASE_URL not set. Running with in-memory storage. Data will not persist across restarts.",
  );
}

export { pool, db, isDatabaseAvailable };
