import { db } from "@/lib/connection/db.js";
import { books } from "../../../lib/definitions.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const allBooks = await db.select().from(books);
    return NextResponse.json(allBooks);
  } catch (error) {
    console.error("Error in get books:", error);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
