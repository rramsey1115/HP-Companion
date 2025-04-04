import { db } from "@/lib/connection/db";
import { ingredients } from "@/lib/definitions";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
    try {
        const {id} = await params;
        if(!id) {
            return NextResponse.json({error: "No id given in params for get ingredient by id"}, {status: 400});
        }
        const foundIngredient = await db.select().from(ingredients).where(eq(ingredients.id, id)).limit(1);
        if(foundIngredient.length == 0) {
            return NextResponse.json({error: "No ingredient found with id: ", id}, {status: 404});
        }
        return NextResponse.json(foundIngredient[0]);
    } catch(err) {
        return NextResponse.json({error: "Error in Get ingredient by id", err}, {status: 500});
    }
}