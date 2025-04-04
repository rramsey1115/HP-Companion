import { db } from "@/lib/connection/db";
import { beasts } from "@/lib/definitions";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "No id found in params" }, { status: 400 });
        }
        const foundBeast = await db.select().from(beasts).where(eq(beasts.id, id)).limit(1);
        if (foundBeast.length == 0) {
            return NextResponse.json({ error: "No beast found with given id:", id }, { status: 404 });
        }
        return NextResponse.json(foundBeast[0]);
    } catch (err) {
        console.log("Error in GET beasts by id", err);
        return NextResponse.json({ error: "Error in get beasts by id", err }, { status: 500 });
    }
}