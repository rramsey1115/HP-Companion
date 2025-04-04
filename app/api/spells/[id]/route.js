import { db } from "@/lib/connection/db";
import { spells } from "@/lib/definitions";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
    try {
        const {id} = await params;
        if(!id) {
            return NextResponse.json({error: "No id given in params for get spell by id"}, {status: 400});
        }
        const foundSpell = await db.select().from(spells).where(eq(spells.id, id)).limit(1);
        if(foundSpell.length == 0) {
            return NextResponse.json({error: "No spell found with id: ", id}, {status: 404});
        }
        return NextResponse.json(foundSpell[0]);
    } catch(err) {
        return NextResponse.json({error: "Error in Get spell by id", err}, {status: 500});
    }
}