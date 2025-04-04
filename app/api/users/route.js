import { db } from "@/lib/connection/db";
import { users } from "@/lib/definitions.js";
import { NextResponse } from "next/server";


export async function GET(req) {
  try {
    const foundUsers = await db.select().from(users);
    if (foundUsers.length == 0) {
      return NextResponse.json({ error: "No users found" }, { status: 500 })
    }
    return NextResponse.json(foundUsers);
  } catch (err) {
    console.error("Error fetching users: ", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
};