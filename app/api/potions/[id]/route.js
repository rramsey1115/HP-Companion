import { db } from "@/lib/connection/db";
import { potions } from "@/lib/definitions";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
    try {
        const {id} = await params;
        if(!id) {
            return NextResponse.json({error: "No id given in params for get potion by id"}, {status: 400});
        }
        const foundPotion = await db.select().from(potions).where(eq(potions.id, id)).limit(1);
        if(foundPotion.length == 0) {
            return NextResponse.json({error: "No potion found with id: ", id}, {status: 404});
        }
        return NextResponse.json(foundPotion[0]);
    } catch(err) {
        return NextResponse.json({error: "Error in Get potion by id", err}, {status: 500});
    }
}