import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL in env variables...")
}

console.log("Connecting to Postgres...", process.env.POSTGRES_URL);


export const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });