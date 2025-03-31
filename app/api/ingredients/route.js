import { NextResponse } from "next/server";
import { sql } from "../../../lib/connection/db.js";

export const getAllIngredients = async () => {
  try {
    const ingredients = await sql`SELECT * FROM ingredients`;
    return NextResponse.json(ingredients);
  } catch (err) {
    console.error("Error fetching ingredients: ", err);
    return NextResponse.json(
      { error: "Failed to fetch ingredients" },
      { status: 500 }
    );
  }
};