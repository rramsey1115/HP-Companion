
import { NextResponse } from "next/server";
import { sql } from "../../../lib/connection/db.js";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    // fetch one character if id provided
    if (id) {
      const foundCharacter =
        await sql`SELECT * FROM characters WHERE id = ${id}`;
      if (foundCharacter.length === 0) {
        return NextResponse.json(
          { error: `No character found with id: ${id}` },
          { status: 404 }
        );
      }
      return NextResponse.json(foundCharacter[0]);
    }

    // Fetch all characters if no id provided
    const characters = await sql`SELECT * FROM characters`;
    return NextResponse.json(characters);
  } catch (err) {
    console.error("Error fetching characters: ", err);
    return NextResponse.json(
      { error: "Failed to fetch characters" },
      { status: 500 }
    );
  }
}
