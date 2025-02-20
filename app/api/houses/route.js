import { NextResponse } from "next/server";
import { sql } from "../../lib/connection/db";

export const getAllHouses = async () => {
  try {
    const houses = await sql`SELECT * FROM houses`;
    return NextResponse.json(houses);
  } catch (err) {
    console.error("Error fetching houses: ", err);
    return NextResponse.json(
      { error: "Failed to fetch houses" },
      { status: 500 }
    );
  }
};