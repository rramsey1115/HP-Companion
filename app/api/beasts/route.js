import { db } from "@/lib/connection/db.js";
import { beasts } from "@/lib/definitions";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const allBeasts = await db.select().from(beasts);
    return NextResponse.json(allBeasts, {status: 200});
  } catch (error) {
    console.error("Error in get beasts:", error);
    return NextResponse.json({ error: "Failed to fetch beasts" }, { status: 500 });
  }
}
