import { db } from "@/lib/connection/db.js";
import { characters } from "../../../lib/definitions.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const allCharacters = await db.select().from(characters);
    return NextResponse.json(allCharacters);
  } catch (error) {
    console.error("Error in get characters:", error);
    return NextResponse.json({ error: "Failed to fetch characters" }, { status: 500 });
  }
}
