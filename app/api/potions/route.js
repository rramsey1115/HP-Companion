import { NextResponse } from "next/server";
import { db } from "../../../lib/connection/db.js";
import { potions } from "../../../lib/definitions.js";

export async function GET(req) {
  try {
    const allPotions = await db.select().from(potions).orderBy(potions.name);
    return NextResponse.json(allPotions, {status: 200});
  } catch (err) {
    console.log("Error in getAllPotions: ", err);
    return NextResponse.json({error: "Error in get all potions"}, {status: 400})
  }
};