import { NextResponse } from "next/server";
import { sql } from "../../lib/connection/db";

export const getAllSpells = async () => {
  try {
    const spells = await sql`SELECT * FROM spells`;
    return NextResponse.json(spells);
  } catch (err) {
    console.error("Error fetching spells: ", err);
    return NextResponse.json(
      { error: "Failed to fetch spells" },
      { status: 500 }
    );
  }
};
