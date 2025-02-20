import { NextResponse } from "next/server";
import { sql } from "../../lib/connection/db";

export const getAllFavorites = async () => {
  try {
    const favorites = await sql`SELECT * FROM favorites`;
    return NextResponse.json(favorites);
  } catch (err) {
    console.error("Error fetching favorites: ", err);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
};