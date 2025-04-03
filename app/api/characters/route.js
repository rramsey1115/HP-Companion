import { db } from "@/lib/connection/db.js";
import { characters } from "../../../lib/definitions.js";
import { NextResponse } from "next/server";

// get characters endpoint which accomodates for filters which are passed in as numbers
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter");

    //get all characters regarless of filter or not
    const allCharacters = await db.select().from(characters);

    if (filter == 1) {
      // if the filter is 1, sort by last name A-Z
      allCharacters.sort((a, b) => {
        const lastNameA = a.name.split(" ").slice(-1)[0];
        const lastNameB = b.name.split(' ').slice(-1)[0];
        return lastNameA.localeCompare(lastNameB);
      });
      return NextResponse.json(allCharacters, {status: 200});
    } else if (filter == 2) {
      // if the filter is 1, sort by last name A-Z
      allCharacters.sort((a, b) => {
        const lastNameA = a.name.split(" ").slice(-1)[0];
        const lastNameB = b.name.split(' ').slice(-1)[0];
        return lastNameB.localeCompare(lastNameA);
      });
      return NextResponse.json(allCharacters);
    }

    // return characters array regarless of filter or not
    return NextResponse.json(allCharacters, {status: 200});
  } catch (error) {
    // return error from anywhere in endpoint
    console.error("Error in get characters:", error);
    return NextResponse.json({ error: "Failed to fetch characters" }, { status: 500 });
  }
}
