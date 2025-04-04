import { db } from "@/lib/connection/db";
import { ingredients } from "@/lib/definitions.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const data = await db.select().from(ingredients)
    if(!data) {
      return NextResponse.json({error: "No ingredients found"}, {status: 404});
    }
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch ingredients", err },
      { status: 500 }
    );
  }
};