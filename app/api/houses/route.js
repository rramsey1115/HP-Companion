import { NextResponse } from "next/server";
import { db } from "../../../lib/connection/db.js";

export const getAllHouses = async () => {
  try {
    const houses = db.select().from(houses);
    return NextResponse.json(houses, {status: 200});
  } catch (err) {
    console.log("Error in get all houses:", err);
    return NextResponse.json({error: "Error in get all houses"}, {status: 500});
  }
};