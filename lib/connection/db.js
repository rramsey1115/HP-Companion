import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in env variables...")
}

console.log("Connecting to Postgres...", process.env.DATABASE_URL);


export const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });