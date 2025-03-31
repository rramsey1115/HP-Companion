import { NextResponse } from "next/server";
import { sql } from "../../../lib/connection/db.js";

export const getAllUsers = async () => {
  try {
    const users = await sql`SELECT * FROM users`;
    return NextResponse.json(users);
  } catch (err) {
    console.error("Error fetching users: ", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
};