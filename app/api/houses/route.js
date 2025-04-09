import { NextResponse } from "next/server";
import { db } from "../../../lib/connection/db.js";
import { houses } from "@/lib/definitions.js";

export async function GET(req) {
  try {
    const allHouses = await db.select().from(houses).orderBy(houses.name);
    return NextResponse.json(allHouses, {status: 200});
  } catch (err) {
    console.log("Error in get all houses:", err);
    return NextResponse.json({error: "Error in get all houses"}, {status: 500});
  }
};