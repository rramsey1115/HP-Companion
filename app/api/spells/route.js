import { NextResponse } from "next/server";
import { db } from "../../../lib/connection/db.js";
import { spells } from "@/lib/definitions.js";

export async function GET(req) {
  try {
    const allSpells = await db.select().from(spells).orderBy(spells.name);
    return NextResponse.json(allSpells, {status: 200});
  } catch (err) {
    console.error("Error fetching spells: ", err);
    return NextResponse.json(
      { error: "Failed to fetch spells" },
      { status: 500 }
    );
  }
};
