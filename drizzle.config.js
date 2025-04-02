import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

dotenv.config();


console.log(process.env.DATABASE_URL);  // Check if the URL is correctly loaded

export default {
  schema: "./lib/definitions.js",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
