import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import * as schema from "../definitions.js"; // Schema will be created in the next step

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in env variables...");
}

const {Pool} = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
