import { NextResponse } from "next/server";
import { sql } from "../../../lib/connection/db.js";

export const getAllPotions = async () => {
  try {
    const potions = await sql`SELECT * FROM potions`;
    return NextResponse.json(potions);
  } catch (err) {
    console.error("Error fetching potions: ", err);
    return NextResponse.json(
      { error: "Failed to fetch potions" },
      { status: 500 }
    );
  }
};