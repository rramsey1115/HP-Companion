import { NextResponse } from "next/server";
import { sql } from "../../../lib/connection/db.js";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // if there's a given id in the url
    if (id) {
      const foundBeast = await sql`SELECT * FROM beasts WHERE id = ${id}`;
      if (foundBeast.length == 0) {
        return NextResponse.json(
          { error: "No beast found with given id" },
          { status: 404 }
        );
      }
      console.log(`Beast found with id: ${id}`, foundBeast);
      return NextResponse.json(foundBeast[0]);
    }

    // if no given id, get all beasts
    const allBeasts = await sql`SELECT * FROM beasts`;
    return NextResponse.json(allBeasts);
  } catch (err) {
    console.log(`Error fetching beats`, err);
    return NextResponse.json(
      { error: "Failed to fetch beasts" },
      { status: 500 }
    );
  }
};

