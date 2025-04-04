import { db } from "@/lib/connection/db";
import { characters } from "@/lib/definitions";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";


export async function GET(req, { params }) {
    try {
        const { id } = await params;
        if(!id) {
            return NextResponse.json({error: "No id given in params"}, {status: 400});
        }
        console.log("character id in Get: ", id);
        const foundCharacter = await db.select().from(characters).where(eq(characters.id, id)).limit(1);
        if (!foundCharacter.length) {
            return NextResponse.json({ error: "No character found with given id" }, { status: 404 })
        }
        return NextResponse.json(foundCharacter[0]);
    } catch (err) {
        console.log("Error in get character by id:", err);
        return NextResponse.json({ error: "Error in GET character by id" }, { status: 500 })
    }
}